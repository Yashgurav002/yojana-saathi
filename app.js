import { SCHEMES } from './lib/schemes.js';
import { evaluate, clean, isStale } from './lib/engine.js';

// ---------- Copy ----------
const T = {
  en: {
    tagline: 'Find the government schemes meant for you, just by talking.',
    sub: 'Answer a few simple questions by voice or text. Saathi checks 15 central and Maharashtra schemes against their official rules.',
    p1: 'Speak in your language', p2: 'No login, no Aadhaar, no OTP', p3: 'Answers from official rules',
    tryLabel: 'Try an example', placeholder: 'Type here, or tap the mic and speak…',
    greeting: 'Namaste! Tell me a little about yourself: your age, the work you do, and who is in your family.',
    understood: 'Saathi understood:', remove: 'Remove', listening: 'Listening… speak now', mic: 'Tap to speak', micStop: 'Stop listening', send: 'Send',
    noMic: 'Voice input works in Chrome and Edge. You can type instead.', micBlocked: 'Microphone is blocked. Allow it in your browser, or type instead.',
    resultsTitle: 'Schemes for you', likely: 'Likely eligible', maybe: 'Need a little more info', no: 'Not for you right now',
    empty: 'Tell Saathi about yourself and matching schemes will appear here, with the documents to carry.',
    covered: 'Saathi checks these {n} schemes:', needs: 'Saathi still needs to know:',
    docs: 'Documents to carry', apply: 'How to apply', site: 'Official website', share: 'Share', shareAll: 'Send list on WhatsApp',
    shareIntro: 'My government scheme checklist (from Yojana Saathi)', shareFoot: 'Please confirm at your Setu Kendra / CSC before applying.',
    jump: '{n} likely schemes found. See the list ↓', restart: 'Start over', trace: 'What Saathi checked', speak: 'Listen',
    central: 'Central govt', maharashtra: 'Maharashtra govt', yes: 'Yes', nope: 'No',
    busy: 'Saathi is busy right now. Please try again in a minute.', error: 'Something went wrong. Please try again.',
    disclaimer: 'Not a government website. Eligibility comes from rules taken from official scheme pages (compiled 7 Nov 2026), and Saathi only says "likely eligible". Always confirm at your Setu Kendra / CSC or the official website before applying.',
    credits: 'Open-source project by Yash ·',
    checked: 'Rules checked {d}', stale: 'Rules last checked {d}. They may have changed, so confirm before applying.',
  },
  mr: {
    tagline: 'तुमच्यासाठी कोणत्या सरकारी योजना आहेत, ते फक्त बोलून शोधा.',
    sub: 'आवाजाने किंवा लिहून काही सोप्या प्रश्नांची उत्तरं द्या. साथी केंद्र आणि महाराष्ट्राच्या 15 योजना अधिकृत नियमांनुसार तपासतो.',
    p1: 'तुमच्या भाषेत बोला', p2: 'लॉगिन, आधार, OTP काहीच नको', p3: 'उत्तरं अधिकृत नियमांवरून',
    tryLabel: 'उदाहरण वापरून पहा', placeholder: 'इथे लिहा, किंवा माईक दाबून बोला…',
    greeting: 'नमस्कार! तुमच्याबद्दल थोडं सांगा: तुमचं वय, तुम्ही काय काम करता, आणि घरात कोण कोण आहे.',
    understood: 'साथीला समजलं:', remove: 'काढा', listening: 'ऐकत आहे… बोला', mic: 'बोलण्यासाठी दाबा', micStop: 'थांबा', send: 'पाठवा',
    noMic: 'आवाजाने बोलण्यासाठी Chrome किंवा Edge वापरा. तुम्ही लिहूही शकता.', micBlocked: 'माईकची परवानगी बंद आहे. ब्राउझरमध्ये परवानगी द्या, किंवा लिहा.',
    resultsTitle: 'तुमच्यासाठी योजना', likely: 'बहुधा पात्र', maybe: 'अजून थोडी माहिती हवी', no: 'सध्या तुमच्यासाठी नाही',
    empty: 'साथीला तुमच्याबद्दल सांगा. जुळणाऱ्या योजना आणि लागणारी कागदपत्रं इथे दिसतील.',
    covered: 'साथी या {n} योजना तपासतो:', needs: 'साथीला अजून माहिती हवी:',
    docs: 'सोबत न्यायची कागदपत्रं', apply: 'अर्ज कसा करायचा', site: 'अधिकृत वेबसाइट', share: 'पाठवा', shareAll: 'यादी WhatsApp वर पाठवा',
    shareIntro: 'माझी सरकारी योजनांची यादी (योजना साथीकडून)', shareFoot: 'अर्ज करण्याआधी सेतू केंद्र / CSC वर खात्री करा.',
    jump: '{n} योजनांसाठी बहुधा पात्र. यादी पहा ↓', restart: 'पुन्हा सुरू करा', trace: 'साथीने काय तपासलं', speak: 'ऐका',
    central: 'केंद्र सरकार', maharashtra: 'महाराष्ट्र सरकार', yes: 'हो', nope: 'नाही',
    busy: 'साथी सध्या व्यस्त आहे. एका मिनिटाने पुन्हा प्रयत्न करा.', error: 'काहीतरी चुकलं. पुन्हा प्रयत्न करा.',
    disclaimer: 'ही सरकारी वेबसाइट नाही. पात्रता अधिकृत योजना पानांवरून घेतलेल्या नियमांवरून ठरते (7 नोव्हेंबर 2026), आणि साथी फक्त "बहुधा पात्र" असं सांगतो. अर्ज करण्याआधी सेतू केंद्र / CSC किंवा अधिकृत वेबसाइटवर खात्री करा.',
    credits: 'यशचा ओपन-सोर्स प्रकल्प ·',
    checked: 'नियम तपासले: {d}', stale: 'नियम शेवटचे तपासले: {d}. ते बदललेले असू शकतात, अर्जाआधी खात्री करा.',
  },
  hi: {
    tagline: 'बोलकर जानिए, आपके लिए कौन-सी सरकारी योजनाएँ हैं।',
    sub: 'बोलकर या लिखकर कुछ आसान सवालों के जवाब दीजिए। साथी केंद्र और महाराष्ट्र की 15 योजनाएँ आधिकारिक नियमों से जाँचता है।',
    p1: 'अपनी भाषा में बोलिए', p2: 'लॉगिन, आधार, OTP कुछ नहीं', p3: 'जवाब आधिकारिक नियमों से',
    tryLabel: 'उदाहरण आज़माएँ', placeholder: 'यहाँ लिखें, या माइक दबाकर बोलें…',
    greeting: 'नमस्ते! अपने बारे में थोड़ा बताइए: आपकी उम्र, आप क्या काम करते हैं, और घर में कौन-कौन है।',
    understood: 'साथी ने समझा:', remove: 'हटाएँ', listening: 'सुन रहा है… बोलिए', mic: 'बोलने के लिए दबाएँ', micStop: 'रुकें', send: 'भेजें',
    noMic: 'बोलकर लिखने के लिए Chrome या Edge इस्तेमाल करें। आप टाइप भी कर सकते हैं।', micBlocked: 'माइक की अनुमति बंद है। ब्राउज़र में अनुमति दें, या टाइप करें।',
    resultsTitle: 'आपके लिए योजनाएँ', likely: 'पात्र हो सकते हैं', maybe: 'थोड़ी और जानकारी चाहिए', no: 'अभी आपके लिए नहीं',
    empty: 'साथी को अपने बारे में बताइए। मिलती-जुलती योजनाएँ और ज़रूरी कागज़ यहाँ दिखेंगे।',
    covered: 'साथी ये {n} योजनाएँ जाँचता है:', needs: 'साथी को अभी जानना है:',
    docs: 'साथ ले जाने वाले कागज़', apply: 'आवेदन कैसे करें', site: 'आधिकारिक वेबसाइट', share: 'भेजें', shareAll: 'सूची WhatsApp पर भेजें',
    shareIntro: 'मेरी सरकारी योजनाओं की सूची (योजना साथी से)', shareFoot: 'आवेदन से पहले सेतु केंद्र / CSC पर पक्का करें।',
    jump: '{n} योजनाओं के लिए पात्र हो सकते हैं। सूची देखें ↓', restart: 'फिर से शुरू करें', trace: 'साथी ने क्या जाँचा', speak: 'सुनें',
    central: 'केंद्र सरकार', maharashtra: 'महाराष्ट्र सरकार', yes: 'हाँ', nope: 'नहीं',
    busy: 'साथी अभी व्यस्त है। एक मिनट बाद फिर कोशिश करें।', error: 'कुछ गड़बड़ हुई। फिर कोशिश करें।',
    disclaimer: 'यह सरकारी वेबसाइट नहीं है। पात्रता आधिकारिक योजना पेजों से लिए गए नियमों से तय होती है (7 नवंबर 2026), और साथी सिर्फ "पात्र हो सकते हैं" कहता है। आवेदन से पहले सेतु केंद्र / CSC या आधिकारिक वेबसाइट पर पक्का करें।',
    credits: 'यश का ओपन-सोर्स प्रोजेक्ट ·',
    checked: 'नियम जाँचे: {d}', stale: 'नियम आख़िरी बार जाँचे: {d}. ये बदल गए हो सकते हैं, आवेदन से पहले पक्का करें।',
  },
};

const FIELD = {
  age: { en: 'Age', hi: 'उम्र', mr: 'वय' },
  gender: { en: 'Gender', hi: 'लिंग', mr: 'लिंग' },
  state: { en: 'State', hi: 'राज्य', mr: 'राज्य' },
  occupation: { en: 'Work', hi: 'काम', mr: 'काम' },
  annualFamilyIncome: { en: 'Family income / year', hi: 'परिवार की सालाना आय', mr: 'कुटुंबाचं वार्षिक उत्पन्न' },
  hasBankAccount: { en: 'Bank account', hi: 'बैंक खाता', mr: 'बँक खाते' },
  maritalStatus: { en: 'Marital status', hi: 'वैवाहिक स्थिति', mr: 'वैवाहिक स्थिती' },
  incomeTaxPayerSelf: { en: 'Pays income tax', hi: 'इनकम टैक्स भरते हैं', mr: 'इन्कम टॅक्स भरता' },
  incomeTaxPayerFamily: { en: 'Income tax in family', hi: 'परिवार में इनकम टैक्स', mr: 'घरात इन्कम टॅक्स' },
  govtEmployeeInFamily: { en: 'Govt job in family', hi: 'परिवार में सरकारी नौकरी', mr: 'घरात सरकारी नोकरी' },
  inEpfoEsicNps: { en: 'PF / ESIC / NPS', hi: 'PF / ESIC / NPS', mr: 'PF / ESIC / NPS' },
  ownsFarmland: { en: 'Own farm land', hi: 'अपनी खेती की ज़मीन', mr: 'स्वतःची शेतजमीन' },
  bplCard: { en: 'BPL / yellow ration card', hi: 'BPL / पीला राशन कार्ड', mr: 'BPL / पिवळं रेशन कार्ड' },
  hasLpgConnection: { en: 'LPG gas connection', hi: 'LPG गैस कनेक्शन', mr: 'LPG गॅस कनेक्शन' },
  hasGirlChildUnder10: { en: 'Daughter under 10', hi: '10 साल से छोटी बेटी', mr: '10 वर्षांखालील मुलगी' },
  hasDisability: { en: 'Disability (40%+)', hi: 'दिव्यांगता (40%+)', mr: 'दिव्यांगत्व (40%+)' },
  ownsFourWheeler: { en: 'Car in family', hi: 'परिवार में कार', mr: 'घरात चारचाकी' },
};
const VALUE = {
  gender: { female: { en: 'Woman', hi: 'महिला', mr: 'महिला' }, male: { en: 'Man', hi: 'पुरुष', mr: 'पुरुष' }, other: { en: 'Other gender', hi: 'अन्य', mr: 'इतर' } },
  occupation: {
    farmer: { en: 'Farmer', hi: 'किसान', mr: 'शेतकरी' }, street_vendor: { en: 'Street vendor', hi: 'रेहड़ी-पटरी विक्रेता', mr: 'फेरीवाला' },
    artisan: { en: 'Artisan / craftsperson', hi: 'कारीगर', mr: 'कारागीर' }, construction_worker: { en: 'Construction worker', hi: 'निर्माण मज़दूर', mr: 'बांधकाम कामगार' },
    domestic_worker: { en: 'Domestic worker', hi: 'घरेलू कामगार', mr: 'घरकाम कामगार' }, other_unorganised: { en: 'Daily-wage work', hi: 'दिहाड़ी काम', mr: 'रोजंदारी काम' },
    small_business: { en: 'Small business', hi: 'छोटा व्यापार', mr: 'छोटा व्यवसाय' }, homemaker: { en: 'Homemaker', hi: 'गृहिणी', mr: 'गृहिणी' },
    salaried_private: { en: 'Private job', hi: 'प्राइवेट नौकरी', mr: 'खाजगी नोकरी' }, govt_employee: { en: 'Government job', hi: 'सरकारी नौकरी', mr: 'सरकारी नोकरी' },
    student: { en: 'Student', hi: 'छात्र', mr: 'विद्यार्थी' }, unemployed: { en: 'No work now', hi: 'अभी काम नहीं', mr: 'सध्या काम नाही' }, retired: { en: 'Retired', hi: 'सेवानिवृत्त', mr: 'निवृत्त' },
  },
  maritalStatus: {
    unmarried: { en: 'Unmarried', hi: 'अविवाहित', mr: 'अविवाहित' }, married: { en: 'Married', hi: 'विवाहित', mr: 'विवाहित' },
    widowed: { en: 'Widowed', hi: 'विधवा / विधुर', mr: 'विधवा / विधुर' }, divorced: { en: 'Divorced', hi: 'तलाकशुदा', mr: 'घटस्फोटित' }, abandoned: { en: 'Abandoned', hi: 'परित्यक्ता', mr: 'परित्यक्ता' },
  },
};
const EXAMPLES = {
  mr: [
    ['🧵', 'शिवणकाम करणारी महिला', '42 वर्षे · पुणे', 'मी 42 वर्षांची आहे, पुण्यात राहते, घरी शिवणकाम करते. नवरा रिक्षा चालवतो. घरचं उत्पन्न महिन्याला 12 हजार आहे.'],
    ['🌾', 'शेतकरी आजोबा', '68 वर्षे · सातारा', 'मी 68 वर्षांचा शेतकरी आहे, साताऱ्याजवळ माझ्या नावावर 2 एकर शेती आहे. पिवळं रेशन कार्ड आहे.'],
    ['🥬', 'भाजीवाला', '30 वर्षे · मुंबई', 'मी 30 वर्षांचा आहे, मुंबईत रस्त्यावर भाजी विकतो. बँकेत खातं आहे. महिन्याला 15 हजार कमावतो.'],
    ['🙏', 'विधवा आजी', '67 वर्षे · नाशिक', 'मी 67 वर्षांची आहे, नवरा वारला आहे. नाशिकमध्ये राहते, पिवळं रेशन कार्ड आहे, उत्पन्न जवळजवळ नाही.'],
  ],
  hi: [
    ['🧵', 'सिलाई करने वाली महिला', '42 साल · पुणे', 'मैं 42 साल की हूँ, पुणे में रहती हूँ, घर पर सिलाई का काम करती हूँ। पति ऑटो चलाते हैं। घर की आमदनी महीने की 12 हज़ार है।'],
    ['🌾', 'किसान दादा', '68 साल · सातारा', 'मैं 68 साल का किसान हूँ, सातारा के पास मेरे नाम पर 2 एकड़ खेत है। पीला राशन कार्ड है।'],
    ['🥬', 'सब्ज़ी वाला', '30 साल · मुंबई', 'मैं 30 साल का हूँ, मुंबई में सड़क पर सब्ज़ी बेचता हूँ। बैंक में खाता है। महीने के 15 हज़ार कमाता हूँ।'],
    ['🙏', 'विधवा दादी', '67 साल · नासिक', 'मैं 67 साल की हूँ, पति गुज़र गए हैं। नासिक में रहती हूँ, पीला राशन कार्ड है, आमदनी लगभग नहीं है।'],
  ],
  en: [
    ['🧵', 'Home tailor', '42 · Pune', "I'm a 42-year-old woman in Pune. I do tailoring from home and my husband drives an auto. Our family earns about ₹12,000 a month."],
    ['🌾', 'Farmer', '68 · Satara', "I'm a 68-year-old farmer near Satara with 2 acres of land in my name. We have a yellow ration card."],
    ['🥬', 'Vegetable seller', '30 · Mumbai', "I'm 30 and sell vegetables on the street in Mumbai. I have a bank account and earn about ₹15,000 a month."],
    ['🙏', 'Widow', '67 · Nashik', "I'm 67 and my husband passed away. I live in Nashik, we have a yellow ration card and almost no income."],
  ],
};
const LOCALE = { mr: 'mr-IN', hi: 'hi-IN', en: 'en-IN' };

// ---------- State (per-viewer convenience only; the app works without storage) ----------
const KEY = 'yojana-saathi:v1';
const urlLang = new URLSearchParams(location.search).get('lang');
const browserLang = (navigator.language || 'en').slice(0, 2);
let state = { lang: T[urlLang] ? urlLang : T[browserLang] ? browserLang : 'en', messages: [], profile: {}, checked: {} };
try {
  const s = JSON.parse(localStorage.getItem(KEY));
  if (s) state = { lang: T[urlLang] ? urlLang : T[s.lang] ? s.lang : state.lang, messages: Array.isArray(s.messages) ? s.messages : [], profile: clean(s.profile), checked: s.checked || {} };
} catch { /* private mode or blocked storage */ }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify({ ...state, messages: state.messages.slice(-40) })); } catch { /* ignore */ } };

let busy = false;
let lastInputWasVoice = false;
const t = (k, n) => T[state.lang][k].replace(/\{[nd]\}/, n);

// ---------- DOM helpers ----------
const $ = (s) => document.querySelector(s);
function h(tag, attrs = {}, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === null || v === false) continue;
    if (k === 'class') n.className = v;
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v === true ? '' : v);
  }
  n.append(...kids.flat().filter((x) => x !== null && x !== undefined && x !== false));
  return n;
}
const icon = (d) => { const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true'); s.innerHTML = d; return s; };
const ICON_SPEAK = '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/>';
const ICON_EXT = '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>';
const ICON_SHARE = '<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"/>';

// ---------- Rendering ----------
function chipText(k, v) {
  const L = state.lang;
  if (VALUE[k]) return VALUE[k][v]?.[L] || v;
  if (k === 'state') return v;
  if (k === 'age') return `${FIELD.age[L]} ${v}`;
  if (k === 'annualFamilyIncome') return `${FIELD[k][L]}: ₹${v.toLocaleString('en-IN')}`;
  if (typeof v === 'boolean') return `${FIELD[k][L]}: ${v ? t('yes') : t('nope')}`;
  return `${FIELD[k]?.[L] || k}: ${v}`;
}

function renderStatic() {
  document.documentElement.lang = state.lang;
  for (const n of document.querySelectorAll('[data-t]')) n.textContent = t(n.dataset.t);
  for (const b of document.querySelectorAll('[data-lang]')) b.setAttribute('aria-pressed', String(b.dataset.lang === state.lang));
  $('#input').placeholder = t('placeholder');
  $('#send').setAttribute('aria-label', t('send'));
  $('#restart').setAttribute('aria-label', t('restart'));
  $('#examples').replaceChildren(...EXAMPLES[state.lang].map(([em, title, sub, text]) =>
    h('button', { type: 'button', class: 'example', onclick: () => send(text) },
      h('span', { class: 'em', 'aria-hidden': 'true' }, em), h('span', {}, h('b', {}, title), h('small', {}, sub)))));
}

function renderLog() {
  $('#welcome').hidden = state.messages.length > 0;
  const items = [{ role: 'assistant', text: t('greeting') }, ...state.messages].map((m) => {
    if (m.role === 'user') return h('li', { class: 'msg me' }, h('p', {}, m.text));
    const tools = h('div', { class: 'msg-tools' },
      'speechSynthesis' in window && !m.error && h('button', { type: 'button', class: 'speak', onclick: () => speak(m.text) }, icon(ICON_SPEAK), t('speak')),
      m.trace?.length > 0 && h('details', { class: 'trace' }, h('summary', {}, `${t('trace')} (${m.trace.length})`),
        h('ol', {}, m.trace.map((s) => h('li', {}, h('code', {}, s.tool), `(${Object.entries(s.args || {}).map(([k, v]) => `${k}=${v}`).join(', ')}) → ${s.result}`)))));
    return h('li', { class: `msg bot${m.error ? ' error' : ''}` }, h('p', {}, linkify(m.text)), tools);
  });
  if (busy) items.push(h('li', { class: 'msg bot typing', 'aria-label': '…' }, h('p', {}, h('i'), h('i'), h('i'))));
  $('#log').replaceChildren(...items);
  const last = $('#log').lastElementChild;
  if (state.messages.length) requestAnimationFrame(() => last?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
}

function renderProfile() {
  const entries = Object.entries(state.profile);
  $('#profile').hidden = entries.length === 0;
  $('#chips').replaceChildren(...entries.map(([k, v]) => h('span', { class: 'chip' }, chipText(k, v),
    h('button', { type: 'button', title: t('remove'), 'aria-label': `${t('remove')}: ${chipText(k, v)}`, onclick: () => { delete state.profile[k]; save(); render(); } }, '×'))));
}

function shareText(results) {
  const L = state.lang;
  return [t('shareIntro'), '', ...results.flatMap(({ scheme: s }) => [`✅ ${s.name[L]}`, `   ${s.benefit[L]}`, `   📄 ${s.documents[L].join(', ')}`, `   🔗 ${s.url}`, '']),
    t('shareFoot'), location.origin].join('\n');
}
const openWhatsApp = (text) => window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');

const fmtDate = (iso) => new Date(iso).toLocaleDateString(LOCALE[state.lang], { day: 'numeric', month: 'short', year: 'numeric' });
const checkedLine = (s) => s.checked && h('p', { class: isStale(s) ? 'checked stale' : 'checked' }, t(isStale(s) ? 'stale' : 'checked', fmtDate(s.checked)));

// Plain text with https links made clickable (never innerHTML).
const linkify = (text) => text.split(/(https:\/\/[^\s)]*[^\s).,!?।])/g).map((part, i) => (i % 2 ? h('a', { href: part, target: '_blank', rel: 'noopener' }, part) : part));

function card(r) {
  const { scheme: s, status } = r;
  const L = state.lang;
  const checked = new Set(state.checked[s.id] || []);
  const top = h('div', { class: 'card-top' }, h('span', { class: 'badge' }, t(status)), h('span', { class: 'lvl' }, t(s.level)));
  if (status === 'maybe') {
    return h('article', { class: 'card maybe' }, top, h('h4', {}, s.name[L]), h('p', { class: 'benefit' }, s.benefit[L]),
      h('p', { class: 'need' }, `${t('needs')} ${r.missing.map((f) => FIELD[f][L]).join(', ')}`));
  }
  return h('article', { class: 'card likely' }, top, h('h4', {}, s.name[L]), h('p', { class: 'benefit' }, s.benefit[L]),
    s.note && h('p', { class: 'note' }, s.note[L]),
    checkedLine(s),
    h('details', {}, h('summary', {}, `${t('docs')} (${s.documents[L].length})`),
      h('ul', { class: 'docs' }, s.documents[L].map((d, i) => h('li', {}, h('label', {},
        h('input', { type: 'checkbox', checked: checked.has(i), onchange: (e) => {
          e.target.checked ? checked.add(i) : checked.delete(i); state.checked[s.id] = [...checked]; save();
        } }), h('span', {}, d))))),
      h('p', { class: 'apply' }, h('b', {}, t('apply')), s.apply[L])),
    h('div', { class: 'card-actions' },
      h('a', { href: s.url, target: '_blank', rel: 'noopener' }, icon(ICON_EXT), t('site')),
      h('button', { type: 'button', onclick: () => openWhatsApp(shareText([r])) }, icon(ICON_SHARE), t('share'))));
}

let lastResultsKey = '';
function renderResults() {
  const key = JSON.stringify([state.lang, state.profile]);
  if (key === lastResultsKey) return; // keeps open <details> and scroll while chatting
  lastResultsKey = key;
  const L = state.lang;
  const results = evaluate(state.profile);
  // ponytail: "more rules = more targeted to this person" ranks PM Vishwakarma above generic insurance; good enough for 15 schemes.
  const by = (st) => results.filter((r) => r.status === st).sort((a, b) => b.scheme.rules.length - a.scheme.rules.length);
  const [likely, maybe, no] = [by('likely'), by('maybe'), by('no')];
  const groups = $('#groups');
  $('#share-all').hidden = likely.length === 0;
  $('#share-all').onclick = () => openWhatsApp(shareText(likely));
  $('#jump').hidden = likely.length === 0;
  $('#jump').textContent = t('jump', likely.length);

  if (Object.keys(state.profile).length === 0) {
    groups.replaceChildren(h('p', { class: 'empty' }, t('empty')), h('p', { class: 'try' }, t('covered', SCHEMES.length)),
      h('div', { class: 'covered' }, SCHEMES.map((s) => h('span', {}, s.name[L]))));
    return;
  }
  groups.replaceChildren(...[
    likely.length > 0 && h('section', { class: 'group g-likely' }, h('h3', {}, t('likely'), h('span', { class: 'count' }, likely.length)), h('div', { class: 'cards' }, likely.map((r) => card(r)))),
    maybe.length > 0 && h('section', { class: 'group g-maybe' }, h('h3', {}, t('maybe'), h('span', { class: 'count' }, maybe.length)), h('div', { class: 'cards' }, maybe.map((r) => card(r)))),
    no.length > 0 && h('details', { class: 'group g-no' }, h('summary', {}, t('no'), h('span', { class: 'count' }, no.length)),
      h('ul', { class: 'nolist' }, no.map(({ scheme: s }) => h('li', {}, s.name[L])))),
  ].filter(Boolean));
}

function render() {
  renderStatic();
  renderLog();
  renderProfile();
  renderResults();
  $('#send').disabled = busy;
  $('#mic').disabled = busy;
}

// ---------- Agent call ----------
async function send(text, viaVoice = false) {
  text = text.trim();
  if (!text || busy) return;
  lastInputWasVoice = viaVoice;
  speechSynthesis?.cancel?.();
  state.messages.push({ role: 'user', text });
  $('#input').value = '';
  busy = true;
  render();
  try {
    const res = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ lang: state.lang, profile: state.profile, messages: state.messages.filter((m) => !m.error).map(({ role, text }) => ({ role, text })) }),
    });
    const data = await res.json().catch(() => ({}));
    if (data.profile) state.profile = clean(data.profile);
    if (!res.ok) throw new Error(data.error || 'failed');
    state.messages.push({ role: 'assistant', text: data.reply, trace: data.trace });
    if (lastInputWasVoice) speak(data.reply);
  } catch (e) {
    state.messages.push({ role: 'assistant', text: t(e.message === 'busy' ? 'busy' : 'error'), error: true });
  } finally {
    busy = false;
    save();
    render();
    if (matchMedia('(pointer: fine)').matches) $('#input').focus();
  }
}

// ---------- Voice (browser-native, free) ----------
function speak(text) {
  if (!('speechSynthesis' in window) || !text) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const loc = LOCALE[state.lang];
  const voices = speechSynthesis.getVoices();
  // Many phones have no Marathi voice; a Hindi voice reads Devanagari Marathi acceptably.
  u.voice = voices.find((v) => v.lang.replace('_', '-') === loc) || voices.find((v) => v.lang.startsWith(loc.slice(0, 2)))
    || (state.lang === 'mr' && voices.find((v) => v.lang.startsWith('hi'))) || null;
  u.lang = u.voice?.lang || loc;
  u.rate = 0.95;
  speechSynthesis.speak(u);
}

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = null;
function setMic(on) {
  $('#mic').classList.toggle('on', on);
  $('#mic').setAttribute('aria-label', t(on ? 'micStop' : 'mic'));
  $('#hint').textContent = on ? t('listening') : '';
}
function toggleMic() {
  if (rec) return rec.stop();
  if (!SR) return ($('#hint').textContent = t('noMic'));
  speechSynthesis?.cancel?.();
  rec = new SR();
  rec.lang = LOCALE[state.lang];
  rec.interimResults = true;
  let finalText = '';
  rec.onresult = (e) => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) finalText += e.results[i][0].transcript;
      else interim += e.results[i][0].transcript;
    }
    $('#input').value = (finalText + interim).trim();
  };
  rec.onerror = (e) => { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') $('#hint').textContent = t('micBlocked'); };
  rec.onend = () => {
    rec = null;
    setMic(false);
    if (finalText.trim()) send($('#input').value, true);
  };
  rec.start();
  setMic(true);
}

// ---------- Wire up ----------
$('#composer').addEventListener('submit', (e) => { e.preventDefault(); send($('#input').value); });
$('#mic').addEventListener('click', toggleMic);
$('#jump').addEventListener('click', () => $('#results').scrollIntoView({ behavior: 'smooth' }));
$('#restart').addEventListener('click', () => { speechSynthesis?.cancel?.(); state = { ...state, messages: [], profile: {}, checked: {} }; save(); render(); });
for (const b of document.querySelectorAll('[data-lang]')) b.addEventListener('click', () => { state.lang = b.dataset.lang; save(); render(); setMic(false); });
if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = () => {}; // warms the voice list on Chrome
setMic(false);
render();
