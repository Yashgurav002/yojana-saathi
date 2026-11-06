// Deterministic eligibility engine. The AI agent collects facts; this decides.
// Shared by the browser (renders cards) and the API (agent tool results).
import { SCHEMES } from './schemes.js';

export const OCCUPATIONS = ['farmer', 'street_vendor', 'artisan', 'construction_worker', 'domestic_worker', 'other_unorganised',
  'small_business', 'homemaker', 'salaried_private', 'govt_employee', 'student', 'unemployed', 'retired'];

// Every fact the agent may record. Order = order questions are asked in when equally useful.
export const FIELDS = {
  age: { type: 'number', d: 'Age in years' },
  gender: { enum: ['female', 'male', 'other'], d: 'Infer from verb endings: करती हूँ / की हूँ / करते / वर्षांची / आहे (with husband) → female; करता हूँ / का हूँ / करतो / वर्षांचा → male' },
  state: { type: 'string', d: 'Indian state they live in, English name. Any Maharashtra city or district (Pune, Mumbai, Nagpur, Nashik, Satara…) → Maharashtra' },
  occupation: { enum: OCCUPATIONS, d: 'Main work. domestic_worker = works in other people\'s homes: maid, cook, cleaning, घरकाम, घरों में काम, धुणी-भांडी. artisan = tailor (शिवणकाम, सिलाई), carpenter, potter, cobbler, barber, washerman, mason, goldsmith, basket maker. street_vendor = sells on street / cart (भाजी विकतो, ठेला, फेरीवाला). farmer = own or tenant farming (शेती, खेती) only. construction_worker = building sites (बांधकाम). other_unorganised = daily wage / labour (मजदूरी, हमाली). homemaker = runs own home, no paid work (गृहिणी)' },
  annualFamilyIncome: { type: 'number', d: 'Total family income per YEAR in rupees (monthly income x 12)' },
  hasBankAccount: { type: 'boolean', d: 'Has their own bank or post office savings account' },
  maritalStatus: { enum: ['unmarried', 'married', 'widowed', 'divorced', 'abandoned'] },
  incomeTaxPayerSelf: { type: 'boolean', d: 'The person pays income tax' },
  incomeTaxPayerFamily: { type: 'boolean', d: 'Anyone in the family, including the person, pays income tax' },
  govtEmployeeInFamily: { type: 'boolean', d: 'Anyone in the family has a permanent government job' },
  inEpfoEsicNps: { type: 'boolean', d: 'Member of EPFO (PF), ESIC or NPS through a job' },
  ownsFarmland: { type: 'boolean', d: 'Family owns farm land in their name' },
  bplCard: { type: 'boolean', d: 'Family has a BPL, Antyodaya or yellow ration card' },
  hasLpgConnection: { type: 'boolean', d: 'Household already has an LPG gas connection' },
  hasGirlChildUnder10: { type: 'boolean', d: 'Has a daughter younger than 10 years' },
  hasDisability: { type: 'boolean', d: 'Has a disability of 40% or more' },
  ownsFourWheeler: { type: 'boolean', d: 'Family owns a car or other four-wheeler (a tractor does not count)' },
};

// Trust boundary: the LLM's tool arguments and the browser's stored profile both pass through here.
export function clean(input = {}) {
  const out = {};
  for (const [k, spec] of Object.entries(FIELDS)) {
    let v = input?.[k];
    if (v === undefined || v === null || v === '') continue;
    if (k === 'state' && typeof v === 'string') v = /^\s*(maha|महा)/i.test(v) ? 'Maharashtra' : v.trim().slice(0, 40);
    const ok = spec.enum ? spec.enum.includes(v)
      : spec.type === 'number' ? Number.isFinite(v) && v >= 0 && v < 1e9
      : typeof v === spec.type;
    if (ok) out[k] = v;
  }
  return out;
}

// Facts that follow from other facts, so the agent never asks something already answered.
export function withImplied(p) {
  const q = { ...p };
  if (q.incomeTaxPayerFamily === false) q.incomeTaxPayerSelf ??= false; // nobody at home pays → neither do you
  if (q.incomeTaxPayerSelf === true) q.incomeTaxPayerFamily = true;
  if (q.occupation === 'govt_employee') q.govtEmployeeInFamily = true;
  return q;
}

// One condition → true (passes), false (fails), null (fact not known yet).
function check(c, p) {
  if (c.any) {
    const r = c.any.map((x) => check(x, p));
    return r.includes(true) ? true : r.includes(null) ? null : false;
  }
  if (c.all) {
    const r = c.all.map((x) => check(x, p));
    return r.includes(false) ? false : r.includes(null) ? null : true;
  }
  const v = p[c.f];
  if (v === undefined || v === null) return null;
  if ('eq' in c) return v === c.eq;
  if (c.in) return c.in.includes(v);
  return (c.min === undefined || v >= c.min) && (c.max === undefined || v <= c.max);
}

export const fieldsOf = (c) => (c.any || c.all ? (c.any || c.all).flatMap(fieldsOf) : [c.f]);

// likely = every rule passes, maybe = nothing fails but facts are missing, no = a rule fails.
export function evaluate(profile, schemes = SCHEMES) {
  return schemes.map((s) => {
    const r = s.rules.map((c) => check(c, profile));
    const status = r.includes(false) ? 'no' : r.includes(null) ? 'maybe' : 'likely';
    const missing = status !== 'maybe' ? [] : [...new Set(
      s.rules.filter((_, i) => r[i] === null).flatMap(fieldsOf).filter((f) => profile[f] === undefined),
    )];
    return { scheme: s, status, missing };
  });
}

// Rules older than this are shown with a "may have changed" warning and re-checked by the Scout agent.
export const STALE_DAYS = 90;
export const isStale = (s, today = new Date()) => (today - new Date(s.checked)) / 864e5 > STALE_DAYS;

// Data-quality gate shared by test.mjs and the Scout agent: [] means the entry is safe to publish.
export function problems(s) {
  const out = [];
  if (!/^[a-z0-9-]+$/.test(s?.id || '')) out.push('id must be kebab-case');
  if (!['central', 'maharashtra'].includes(s?.level)) out.push('level must be central or maharashtra');
  for (const k of ['name', 'benefit', 'apply', ...(s?.note ? ['note'] : [])])
    for (const l of ['en', 'hi', 'mr']) if (typeof s?.[k]?.[l] !== 'string' || !s[k][l].trim()) out.push(`${k}.${l} missing`);
  for (const l of ['en', 'hi', 'mr']) if (!Array.isArray(s?.documents?.[l]) || !s.documents[l].length) out.push(`documents.${l} missing`);
  for (const k of ['url', 'source']) if (!/^https:\/\/\S+$/.test(s?.[k] || '')) out.push(`${k} must be an https URL`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s?.checked || '')) out.push('checked must be YYYY-MM-DD');
  if (!Array.isArray(s?.rules) || !s.rules.length) out.push('rules missing');
  const walk = (c) => {
    if (c?.any || c?.all) return Array.isArray(c.any || c.all) ? (c.any || c.all).forEach(walk) : out.push('any/all must be a list');
    const spec = FIELDS[c?.f];
    if (!spec) return out.push(`unknown field ${c?.f}`);
    for (const v of c.in || []) if (!spec.enum?.includes(v)) out.push(`bad value ${v} for ${c.f}`);
    if ('eq' in c && !(spec.enum ? spec.enum.includes(c.eq) : typeof c.eq === spec.type)) out.push(`bad eq for ${c.f}`);
    for (const b of ['min', 'max']) if (b in c && (spec.type !== 'number' || typeof c[b] !== 'number')) out.push(`bad ${b} for ${c.f}`);
    if (!c.in && !('eq' in c) && !('min' in c) && !('max' in c)) out.push(`empty condition on ${c.f}`);
  };
  (Array.isArray(s?.rules) ? s.rules : []).forEach(walk);
  return out;
}

// The facts that would settle the most "maybe" schemes, most useful first.
export function askNext(results) {
  const n = {};
  for (const r of results) for (const f of r.missing) n[f] = (n[f] || 0) + 1;
  const order = Object.keys(FIELDS);
  return Object.keys(n).sort((a, b) => n[b] - n[a] || order.indexOf(a) - order.indexOf(b));
}
