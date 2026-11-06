// POST /api/agent — the Yojana Saathi agent loop.
// The LLM runs the conversation and calls tools; eligibility always comes from lib/engine.js, never from the model.
import { SCHEMES } from '../lib/schemes.js';
import { FIELDS, clean, evaluate, askNext, isStale, withImplied } from '../lib/engine.js';

// Tried in order when a model is overloaded, slow or retired. A turn sticks to one model, because Gemini's
// thought signatures (echoed back during tool calls) are only valid for the model that produced them.
// Measured on 2026-11-07 with a free key: 3.5-flash ~2-5s per tool call with the best extraction; 3.5-flash-lite
// ~1.5-3s but once mixed a Telugu word into Marathi, so it is the fallback for per-minute quota bursts (429).
// 3.7 / 3.8 were overloaded that night.
const MODELS = [...new Set([process.env.GEMINI_MODEL, 'gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-3.6-flash'].filter(Boolean))];
const RETRYABLE = new Set([404, 408, 429, 500, 503, 504]);
const CALL_TIMEOUT_MS = 12000;
const MAX_STEPS = 6;
const LANGS = { mr: 'Marathi', hi: 'Hindi', en: 'English' };
const FALLBACK = {
  mr: 'माफ करा, मला नीट समजलं नाही. पुन्हा एकदा सांगाल का?',
  hi: 'माफ कीजिए, मैं ठीक से समझ नहीं पाया। एक बार फिर बताएँगे?',
  en: "Sorry, I didn't quite get that. Could you say it again?",
};

const TOOLS = [{
  functionDeclarations: [
    {
      name: 'update_profile',
      description: 'Save every fact the person has stated about themselves or their family. Returns the schemes they are now likely eligible for, how many are still undecided, and which facts to ask about next.',
      parameters: {
        type: 'object',
        properties: Object.fromEntries(Object.entries(FIELDS).map(([k, s]) => [k, {
          type: s.enum ? 'string' : s.type, ...(s.enum && { enum: s.enum }), ...(s.d && { description: s.d }),
        }])),
      },
    },
    {
      name: 'get_scheme_details',
      description: 'Get the official benefit, documents to carry, how to apply and caveats for one scheme.',
      parameters: { type: 'object', properties: { id: { type: 'string', enum: SCHEMES.map((s) => s.id) } }, required: ['id'] },
    },
    {
      name: 'scheme_not_in_list',
      description: 'Call when the person asks about a scheme that is NOT in the known list, e.g. a newly announced yojana. Records the request so the Scheme Scout agent researches it, and returns safe next steps.',
      parameters: { type: 'object', properties: { name: { type: 'string', description: 'The scheme name as the person said it' } }, required: ['name'] },
    },
  ],
}];

function summary(profile, lang) {
  const results = evaluate(profile);
  return {
    likelyEligible: results.filter((r) => r.status === 'likely').map(({ scheme: s }) => ({ id: s.id, name: s.name[lang], benefit: s.benefit[lang], ...(isStale(s) && { possiblyOutdated: true }) })),
    stillUndecided: results.filter((r) => r.status === 'maybe').length,
    ruledOut: results.filter((r) => r.status === 'no').length,
    askNext: askNext(results).slice(0, 3).map((f) => ({ field: f, meaning: FIELDS[f].d || f })),
  };
}

const systemPrompt = (profile, lang) => `You are Yojana Saathi ("scheme friend"), a patient helper for people in India who find government paperwork hard: homemakers, farmers, street vendors, artisans, daily-wage workers, elderly people. You help them find government schemes they are likely eligible for.

LANGUAGE: Reply ONLY in ${LANGS[lang]}${lang === 'en' ? '' : ' (Devanagari script only, never any other Indian script; simple everyday spoken words, not formal or Sanskritized)'}. Plain text only: no markdown, no bullet lists, no emojis. At most 3 short sentences. The person may be listening to your reply read aloud.

HOW TO WORK:
1. Whenever the person states any fact about themselves or their family, call update_profile with ALL facts you can take from it. Convert naturally: "I stitch blouses at home" → occupation "artisan"; "my husband passed away" → maritalStatus "widowed"; "we earn 12 thousand a month" → annualFamilyIncome 144000; "I live in Pune" → state "Maharashtra"; feminine verb forms ("मी 42 वर्षांची आहे", "मैं 42 साल की हूँ") or "my husband" → gender "female", masculine forms → "male". Never invent facts they did not say.
2. Then ask ONE simple question, chosen from askNext in the tool result. Turn the field into a friendly, concrete everyday question (for bplCard: "What colour is your ration card?").
3. Never decide eligibility yourself. Only repeat what the tools return. Say "likely eligible", never "you will get".
4. When askNext is empty, or the person asks for results, tell them how many schemes they are likely eligible for, name the top two or three with their benefit, and say the cards on screen list the documents. Remind them to confirm at the Setu Kendra / CSC before applying.
5. For questions about documents or how to apply, call get_scheme_details and answer from it. If a scheme is possiblyOutdated, say its rules may have changed.
5b. If they ask about a scheme that is not in the known list below (for example a new yojana they heard about), call scheme_not_in_list and follow its advice. Never describe an unknown scheme's rules or amounts from memory.
6. NEVER ask for an Aadhaar number, bank account number, OTP, PIN or password. If the person offers one, tell them kindly not to share it with anyone, including you.
7. If asked about something unrelated, say gently that you only help with government schemes.

Known schemes: ${SCHEMES.map((s) => s.name.en).join("; ")}.
The app already greeted them and asked about their age, work and family.
Facts already saved: ${JSON.stringify(profile)}
Current status: ${JSON.stringify(summary(profile, lang))}
Today is ${new Date().toISOString().slice(0, 10)}.`;

// Optional (Upstash Redis REST, free tier): counts requests for unknown schemes so the Scout researches them first.
async function recordRequest(name) {
  const { UPSTASH_REDIS_REST_URL: url, UPSTASH_REDIS_REST_TOKEN: token } = process.env;
  const key = String(name || '').toLowerCase().replace(/[^\p{L}\p{N} -]/gu, '').replace(/\s+/g, ' ').trim().slice(0, 60);
  if (!url || !token || !key) return false;
  const r = await fetch(`${url}/zincrby/requested_schemes/1/${encodeURIComponent(key)}`, { headers: { authorization: `Bearer ${token}` } }).catch(() => null);
  return Boolean(r?.ok);
}

async function gemini(model, contents, system) {
  let r;
  try {
    r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents, tools: TOOLS, generationConfig: { temperature: 0.3 } }),
      signal: AbortSignal.timeout(CALL_TIMEOUT_MS),
    });
  } catch (e) {
    throw Object.assign(new Error(`${model}: ${e.name}`), { status: e.name === 'TimeoutError' ? 504 : 503 });
  }
  if (!r.ok) throw Object.assign(new Error(`${model} ${r.status}: ${(await r.text()).slice(0, 200)}`), { status: r.status });
  return r.json();
}

// First call of a turn walks the fallback list; later calls retry the same model once.
async function generate(contents, system, sticky) {
  const tries = sticky ? [sticky, sticky] : MODELS;
  for (const [i, model] of tries.entries()) {
    try {
      return { model, data: await gemini(model, contents, system) };
    } catch (e) {
      if (!RETRYABLE.has(e.status) || i === tries.length - 1) throw e;
      console.warn(`${e.message} → trying ${tries[i + 1]}`);
      if (sticky) await new Promise((ok) => setTimeout(ok, 1500));
    }
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: 'not_configured' });

  // Trust boundary: everything from the browser is re-validated.
  const body = req.body || {};
  const lang = LANGS[body.lang] ? body.lang : 'mr';
  let profile = clean(body.profile);
  const history = (Array.isArray(body.messages) ? body.messages : [])
    .filter((m) => m && typeof m.text === 'string' && m.text.trim())
    .slice(-24)
    .map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.text.slice(0, 800) }] }));
  while (history.length && history[0].role !== 'user') history.shift();
  if (!history.length) return res.status(400).json({ error: 'empty' });
  // ponytail: no global rate limit — the free-tier key's own quota is the ceiling; add Upstash/Vercel KV limits if traffic grows.

  const trace = [];
  let model;
  try {
    for (let step = 0; step < MAX_STEPS; step++) {
      const out = await generate(history, systemPrompt(profile, lang), model);
      model = out.model;
      const data = out.data;
      const content = data.candidates?.[0]?.content;
      const calls = (content?.parts || []).filter((p) => p.functionCall);
      if (!calls.length) {
        const reply = (content?.parts || []).filter((p) => p.text && !p.thought).map((p) => p.text).join('').replace(/[*#_`]/g, '').trim();
        return res.status(200).json({ reply: reply || FALLBACK[lang], profile, trace });
      }
      history.push(content); // keep the model's turn verbatim (thought signatures must round-trip)
      const responses = await Promise.all(calls.map(async ({ functionCall: c }) => {
        let response;
        if (c.name === 'update_profile') {
          const saved = clean(c.args);
          profile = withImplied({ ...profile, ...saved });
          response = { saved, ...summary(profile, lang) };
          trace.push({ tool: c.name, args: saved, result: `${response.likelyEligible.length} likely · ${response.stillUndecided} undecided · next: ${response.askNext.map((a) => a.field).join(', ') || 'none'}` });
        } else if (c.name === 'get_scheme_details') {
          const s = SCHEMES.find((x) => x.id === c.args?.id);
          response = s ? { name: s.name[lang], benefit: s.benefit[lang], caveat: s.note?.[lang], documents: s.documents[lang], howToApply: s.apply[lang], officialSite: s.url, rulesLastChecked: s.checked, ...(isStale(s) && { possiblyOutdated: true }) } : { error: 'unknown scheme id' };
          trace.push({ tool: c.name, args: { id: c.args?.id }, result: s ? `${s.documents[lang].length} documents` : 'unknown id' });
        } else if (c.name === 'scheme_not_in_list') {
          const recorded = await recordRequest(c.args?.name);
          response = {
            inSaathiCheckedList: false, recorded,
            officialSearch: 'https://www.myscheme.gov.in/search',
            advice: "Say plainly that this scheme is not in Saathi's checked list yet, so you cannot tell whether they qualify. Do not describe its rules or amounts. Suggest asking at the Setu Kendra / CSC, or searching it on myScheme, the official government site (give the link). If recorded is true, say Saathi will look into adding it.",
          };
          trace.push({ tool: c.name, args: { name: String(c.args?.name || '').slice(0, 60) }, result: recorded ? 'not in list · request recorded' : 'not in list' });
        } else {
          response = { error: 'unknown tool' };
        }
        return { functionResponse: { name: c.name, ...(c.id && { id: c.id }), response } };
      }));
      history.push({ role: 'user', parts: responses });
    }
    return res.status(200).json({ reply: FALLBACK[lang], profile, trace });
  } catch (e) {
    console.error(e.message);
    const busy = RETRYABLE.has(e.status);
    return res.status(busy ? 429 : 502).json({ error: busy ? 'busy' : 'failed', profile, trace });
  }
}
