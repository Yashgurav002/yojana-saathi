// Scheme Scout: the research agent that keeps Yojana Saathi's rules current.
//
//   node scout/scout.mjs            daily run (GitHub Actions): watch, draft, validate, re-check stale rules
//   node scout/scout.mjs --format   rewrite lib/schemes.js in canonical form (no network)
//
// It never publishes by itself. It edits lib/schemes.js and writes scout/report.md; the workflow turns that into a
// pull request that a human reviews against the linked official sources before merging.
import fs from 'node:fs/promises';
import { SCHEMES } from '../lib/schemes.js';
import { FIELDS, OCCUPATIONS, problems, isStale } from '../lib/engine.js';

const FEEDS = ['https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=3']; // Press Information Bureau, Govt of India
const WELFARE = /yojana|scheme|pension|insurance|subsid|beneficiar|welfare|loan|ration|योजना|पेंशन|बीमा|सब्सिडी|लाभार्थ|ऋण|कल्याण|राशन/i;
const MAX_RELEASES = 8; // ponytail: per-run cap keeps us inside the Gemini free tier; raise with a paid key
const MAX_RECHECKS = 2;
// Names itself honestly; PIB's firewall rejects user-agents that contain a URL, so the repo link is left out.
const HEADERS = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) YojanaSaathiScout/1.0', accept: 'text/html, application/rss+xml, application/xml;q=0.9, */*;q=0.8', 'accept-language': 'en-IN,en;q=0.9' };
const FILE = new URL('../lib/schemes.js', import.meta.url);
const SEEN = new URL('./seen.json', import.meta.url);
const REPORT = new URL('./report.md', import.meta.url);
const today = new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10); // India date (IST)

const HEADER = `// Scheme database. Compiled 2026-11-07 from official scheme portals and notices; a few amounts come from news
// reports of state cabinet decisions. Each entry links its source and the date its rules were last checked.
// Kept current by Scheme Scout (scout/scout.mjs) through human-reviewed pull requests. Verify at the office before applying.
`;
const save = (list) => fs.writeFile(FILE, `${HEADER}export const SCHEMES = ${JSON.stringify(list, null, 2)};\n`);

if (process.argv.includes('--format')) {
  await save(SCHEMES.map((s) => ({ ...s, checked: s.checked || '2026-11-07' })));
  console.log(`formatted ${SCHEMES.length} schemes`);
  process.exit(0);
}
if (!process.env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY is not set');

// ---------- helpers ----------
const decode = (s) => s.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").trim();
const tag = (xml, t) => decode((xml.match(new RegExp(`<${t}>([\\s\\S]*?)</${t}>`)) || [])[1] || '');

async function get(url) {
  const r = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(25000) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.text();
}
async function pageText(url) {
  return (await get(url)).replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim().slice(0, 20000);
}

// Nobody is waiting on the Scout, so it prefers the stronger models and falls back when one is busy or out of quota.
const MODELS = [...new Set([process.env.GEMINI_MODEL, 'gemini-3.5-flash', 'gemini-3.6-flash', 'gemini-3.5-flash-lite'].filter(Boolean))];
async function askGemini(prompt) {
  let last;
  for (const model of MODELS) {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { temperature: 0.1, responseMimeType: 'application/json' } }),
      signal: AbortSignal.timeout(90000),
    }).catch((e) => ({ ok: false, status: e.name, text: async () => e.message }));
    if (r.ok) return JSON.parse((await r.json()).candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') || '{}');
    last = `${model} ${r.status}: ${(await r.text()).slice(0, 120).replace(/\s+/g, ' ')}`;
    if (![404, 429, 500, 503, 504, 'TimeoutError'].includes(r.status)) break;
    await new Promise((ok) => setTimeout(ok, 5000));
  }
  throw new Error(last);
}

const SCHEMA_HELP = `Scheme entry format (JSON):
{"id": "kebab-case", "level": "central" | "maharashtra",
 "name": {"en","hi","mr"}, "benefit": {"en","hi","mr"} (one short line with concrete amounts),
 "rules": [conditions], "note": {"en","hi","mr"} (optional: exclusions the rules cannot express),
 "documents": {"en": [...], "hi": [...], "mr": [...]} (3-6 items), "apply": {"en","hi","mr"} (one line: where / how),
 "url": "official portal", "source": "page these facts came from", "checked": "${today}"}
Conditions use ONLY these fields: ${JSON.stringify(Object.fromEntries(Object.entries(FIELDS).map(([k, v]) => [k, v.enum || v.type])))}
(occupation values: ${OCCUPATIONS.join(', ')}).
Condition forms: {"f":"age","min":18,"max":40} · {"f":"occupation","in":["artisan"]} · {"f":"hasBankAccount","eq":true} · {"any":[...]} · {"all":[...]}.
All top-level conditions must pass. Hindi and Marathi must be simple everyday spoken words.`;

// Requests users made for schemes Saathi doesn't know (recorded by api/agent.js when Upstash is configured).
async function requestedSchemes() {
  const { UPSTASH_REDIS_REST_URL: url, UPSTASH_REDIS_REST_TOKEN: token } = process.env;
  if (!url || !token) return [];
  const r = await fetch(`${url}/zrevrange/requested_schemes/0/9`, { headers: { authorization: `Bearer ${token}` } }).catch(() => null);
  return r?.ok ? (await r.json()).result || [] : [];
}

// ---------- run ----------
const list = structuredClone(SCHEMES);
const report = { changes: [], review: [], skipped: 0, scanned: 0 };
let seen = [];
try { seen = JSON.parse(await fs.readFile(SEEN, 'utf8')); } catch { /* first run */ }

const requested = await requestedSchemes();
const wanted = (title) => WELFARE.test(title) || requested.some((q) => q && title.toLowerCase().includes(q));

// 1. Watch: new official press releases that look like welfare news (or one given by hand: --release <url>).
const manual = process.argv[process.argv.indexOf('--release') + 1];
const releases = process.argv.includes('--release') ? [{ title: '(given by hand)', link: manual }] : [];
for (const feed of releases.length ? [] : FEEDS) {
  try {
    const xml = await get(feed);
    for (const [, item] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
      const r = { title: tag(item, 'title'), link: tag(item, 'link') };
      if (!r.link || seen.includes(r.link)) continue;
      report.scanned++;
      seen.push(r.link);
      if (wanted(r.title)) releases.push(r); else report.skipped++;
    }
  } catch (e) { report.review.push(`Feed unreachable: ${feed} (${e.message})`); }
}

// 2. Draft: let the model decide whether each release adds or changes a scheme, in our exact format.
for (const rel of releases.slice(0, MAX_RELEASES)) {
  try {
    const text = await pageText(rel.link);
    const out = await askGemini(`You maintain the scheme database of Yojana Saathi, an app that helps low-income people in India (mainly Maharashtra) find welfare schemes they can apply for themselves.
Read this official press release and decide whether the database must change.

Return JSON: {"kind": "new" | "update" | "none", "reason": "one sentence", "entry": <full scheme entry> | null}
- "new": a central or Maharashtra scheme that individuals or families apply for directly, and that is NOT in the database.
- "update": the release changes eligibility, amounts or how to apply for a scheme that IS in the database. Return its FULL updated entry with the same id.
- "none": anything else (events, speeches, schemes for companies, states or institutions, infrastructure).
Use ONLY facts stated in the release. If a criterion is unclear, leave it out of the rules and mention it in note. Set "source" to ${rel.link}.

${SCHEMA_HELP}

Current database:
${JSON.stringify(list)}

Press release (${rel.link}):
${rel.title}
${text}`);
    if (out.kind !== 'new' && out.kind !== 'update') { report.skipped++; continue; }
    const entry = { ...out.entry, source: rel.link, checked: today };
    const bad = problems(entry);
    if (bad.length) { report.review.push(`Draft rejected for "${rel.title}" (${rel.link}): ${bad.slice(0, 5).join('; ')}`); continue; }
    const i = list.findIndex((s) => s.id === entry.id);
    if (i >= 0) list[i] = entry; else list.push(entry);
    report.changes.push(`${i >= 0 ? '✏️ **Updated**' : '🆕 **New**'} \`${entry.id}\`: ${entry.name.en}. ${out.reason} [source](${rel.link})`);
  } catch (e) { report.review.push(`Could not process "${rel.title}" (${rel.link}): ${e.message}`); }
}
if (releases.length > MAX_RELEASES) report.review.push(`${releases.length - MAX_RELEASES} matching releases left for the next run.`);

// 3. Re-check: the stalest rules against their own source page.
const stale = list.filter((s) => isStale(s)).sort((a, b) => a.checked.localeCompare(b.checked)).slice(0, MAX_RECHECKS);
for (const s of stale) {
  try {
    const text = await pageText(s.source);
    const out = await askGemini(`Compare our scheme entry with its official source page.
Return JSON: {"status": "confirmed" | "changed" | "unclear", "reason": "one sentence", "entry": <full corrected entry, only if changed> | null}
"confirmed" only if the page clearly still supports the benefit amounts and eligibility rules. Use only facts on the page.

${SCHEMA_HELP}

Our entry:
${JSON.stringify(s)}

Source page (${s.source}):
${text}`);
    const i = list.findIndex((x) => x.id === s.id);
    const fixed = out.entry && { ...out.entry, id: s.id, source: s.source, checked: today };
    if (out.status === 'confirmed') {
      list[i] = { ...s, checked: today };
      report.changes.push(`✅ **Re-confirmed** \`${s.id}\` against [its source](${s.source}). ${out.reason}`);
    } else if (out.status === 'changed' && fixed && !problems(fixed).length) {
      list[i] = fixed;
      report.changes.push(`✏️ **Rules changed** \`${s.id}\`: ${out.reason} [source](${s.source})`);
    } else {
      report.review.push(`Could not confirm \`${s.id}\` from [its source](${s.source}): ${out.reason || 'unclear'}. Please check by hand.`);
    }
  } catch (e) { report.review.push(`Source for \`${s.id}\` unreadable (${e.message}). Please check by hand: ${s.source}`); }
}

// 4. Hand over to a human.
if (report.changes.length) await save(list);
await fs.writeFile(SEEN, JSON.stringify(seen.slice(-500)));
const md = `## Scheme Scout report: ${today}

Scanned **${report.scanned}** new official press releases · **${releases.length}** looked like welfare news · ${report.skipped} not relevant${requested.length ? ` · users asked about: ${requested.join(', ')}` : ''}

### Proposed changes
${report.changes.map((c) => `- ${c}`).join('\n') || '- None today.'}

### Needs a human look
${report.review.map((c) => `- ${c}`).join('\n') || '- Nothing.'}

> Review every change against its linked official source before merging. Merging deploys it to everyone.
`;
await fs.writeFile(REPORT, md);
console.log(md);
