// node test.mjs — checks the rules engine and that every scheme's data is well-formed.
import assert from 'node:assert/strict';
import { SCHEMES } from './lib/schemes.js';
import { FIELDS, clean, evaluate, askNext, fieldsOf, problems, isStale, withImplied } from './lib/engine.js';

// 1. Engine logic on a synthetic scheme
const toy = [{ id: 't', rules: [{ f: 'age', min: 18, max: 40 }, { any: [{ f: 'bplCard', eq: true }, { all: [{ f: 'gender', in: ['female'] }, { f: 'maritalStatus', in: ['widowed'] }] }] }] }];
const st = (p) => evaluate(p, toy)[0];
assert.equal(st({}).status, 'maybe');
assert.deepEqual(st({}).missing, ['age', 'bplCard', 'gender', 'maritalStatus']);
assert.equal(st({ age: 50 }).status, 'no');                                  // a failed rule beats unknowns
assert.equal(st({ age: 30, bplCard: true }).status, 'likely');
assert.equal(st({ age: 30, bplCard: false, gender: 'male' }).status, 'no');   // all[] fails → any[] fails
assert.deepEqual(st({ age: 30, bplCard: false, gender: 'female' }).missing, ['maritalStatus']);
assert.equal(st({ age: 40, bplCard: false, gender: 'female', maritalStatus: 'widowed' }).status, 'likely'); // bounds inclusive

// 2. Trust boundary: junk from the LLM is dropped, state is normalised
assert.deepEqual(clean({ age: '42', gender: 'woman', occupation: 'artisan', state: 'महाराष्ट्र', hack: 1, annualFamilyIncome: -5 }),
  { occupation: 'artisan', state: 'Maharashtra' });

// 3. Every published scheme passes the same quality gate the Scout agent's drafts must pass
assert.equal(new Set(SCHEMES.map((s) => s.id)).size, SCHEMES.length, 'duplicate scheme id');
for (const s of SCHEMES) assert.deepEqual(problems(s), [], `${s.id} has problems`);
// ...and the gate actually rejects a bad draft (the kind an LLM might produce)
const bad = { ...SCHEMES[0], id: 'Bad Id', rules: [{ f: 'caste', eq: 'x' }, { f: 'gender', in: ['woman'] }, { f: 'age', min: '18' }], benefit: { en: 'x' } };
assert.deepEqual(problems(bad).sort(), ['bad min for age', 'bad value woman for gender', 'benefit.hi missing', 'benefit.mr missing', 'id must be kebab-case', 'unknown field caste'].sort());

// Stale rules are flagged after 90 days
assert.equal(isStale({ checked: '2026-11-07' }, new Date('2027-01-01')), false);
assert.equal(isStale({ checked: '2026-11-07' }, new Date('2027-03-01')), true);

// 4. Real personas get sensible answers
const byId = (p) => Object.fromEntries(evaluate(p).map((r) => [r.scheme.id, r.status]));
const tailor = { age: 42, gender: 'female', state: 'Maharashtra', occupation: 'artisan', annualFamilyIncome: 144000, hasBankAccount: true,
  maritalStatus: 'married', incomeTaxPayerSelf: false, incomeTaxPayerFamily: false, govtEmployeeInFamily: false, ownsFourWheeler: false };
assert.equal(byId(tailor)['pm-vishwakarma'], 'likely');
assert.equal(byId(tailor)['ladki-bahin'], 'likely');
assert.equal(byId(tailor)['pm-kisan'], 'maybe');                 // farmland not asked yet
assert.equal(byId(tailor)['shravanbal-seva'], 'no');
const techie = { age: 30, gender: 'male', state: 'Karnataka', occupation: 'salaried_private', incomeTaxPayerSelf: true, inEpfoEsicNps: true, hasBankAccount: true };
assert.equal(byId(techie)['atal-pension-yojana'], 'no');
assert.equal(byId(techie)['ladki-bahin'], 'no');
assert.equal(byId(techie)['pmsby'], 'likely');
assert.ok(SCHEMES.flatMap((s) => s.rules).flatMap(fieldsOf).every((f) => f in FIELDS));

// 5. askNext ranks the most useful question first
assert.equal(askNext(evaluate({}))[0], 'age');

console.log(`ok: engine + ${SCHEMES.length} schemes`);

// 6. Implied facts: "nobody at home pays income tax" answers the personal question too
assert.equal(withImplied({ incomeTaxPayerFamily: false }).incomeTaxPayerSelf, false);
assert.equal(withImplied({ incomeTaxPayerSelf: true }).incomeTaxPayerFamily, true);
assert.equal(withImplied({ occupation: 'govt_employee' }).govtEmployeeInFamily, true);
console.log('ok: implied facts');
