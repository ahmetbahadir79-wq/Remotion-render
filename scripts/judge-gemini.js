// judge-gemini.js — the mute-test judge step run through a Gemini model that
// has seen ONLY judge-input.json (narration + blind descriptions), never the
// repo. Mirrors PROMPTS.md §3 / JUDGE_RULES in scripts/mute-test.js.
//   node scripts/judge-gemini.js --dir=audit/mute/<slug>/<label> [--model=..]
//
// Robustness (2026-09-29): the first run died on "Expected ',' or '}'" when the
// model returned a malformed third batch. It now asks for JSON output, retries a
// failed batch, and falls back to splitting it in half; each batch is written to
// judge-result.json as soon as it lands, so a later crash never loses earlier work.
const fs = require('fs');
const path = require('path');

const KEY = process.env.GOOGLE_API_KEY;
if (!KEY) throw new Error('GOOGLE_API_KEY missing');
const args = Object.fromEntries(process.argv.slice(2).map(a => { const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : []; }));
const DIR = path.join(__dirname, '..', args.dir);
const MODEL = args.model || 'gemini-flash-lite-latest';
const OUT = path.join(DIR, 'judge-result.json');

const RULES = `For each item give:
A. correctness — CORRECT (the viewer's understood message matches the narration), NEUTRAL (neither matches nor contradicts: just a person, abstract/empty), WRONG (suggests a different or opposite meaning: unrelated object, wrong emotion over tragedy, emphasis where the narration rejects, etc.).
B. contribution — ADDS (the image itself — people's actions/expressions, objects, icons, not only copied text — conveys something the narration means), TEXT_ONLY (only on-screen text carries meaning), NONE.
C. explains — YES only when contribution is ADDS AND the picture itself shows the narration's mechanism, relationship or cause→effect (who does what to whom, what leads to what), not just its subject or mood; otherwise NO.
One short reason each. Be strict and literal; do not reward a version for being prettier or busier.`;

async function callGemini(parts) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
  let lastStatus = 0;
  for (let attempt = 1; attempt <= 6; attempt++) {
    const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': KEY },
      body: JSON.stringify({ contents: [{ parts }], generationConfig: { temperature: 0.1, maxOutputTokens: 16000, responseMimeType: 'application/json' } }) });
    const json = await res.json();
    if (res.ok) return json;
    lastStatus = res.status;
    console.error(`attempt ${attempt}: HTTP ${res.status}`);
    if (res.status !== 503 && res.status !== 429) throw new Error('API ' + res.status + ': ' + JSON.stringify(json).slice(0, 300));
    await new Promise(r => setTimeout(r, attempt * 15000));
  }
  throw new Error('API failed after retries: ' + lastStatus);
}

const enumOf = (v, allowed, fallback) => {
  const s = String(v == null ? '' : v).toUpperCase().replace(/[^A-Z_]/g, '');
  return allowed.includes(s) ? s : fallback;
};
// Tolerate a flat or a nested verdict, and badly cased enums.
function normalize(raw, single) {
  if (!raw || typeof raw !== 'object') return null;
  const one = (o) => {
    const src = typeof o === 'string' ? { correctness: o } : (o || {});
    return {
      correctness: enumOf(src.correctness || src.verdict, ['CORRECT', 'NEUTRAL', 'WRONG'], 'NEUTRAL'),
      why: String(src.why || src.reason || '').trim(),
      contribution: enumOf(src.contribution, ['ADDS', 'TEXT_ONLY', 'NONE'], 'NONE'),
      whyC: String(src.whyC || src.whyContribution || '').trim(),
      explains: enumOf(src.explains, ['YES', 'NO'], 'NO'),
    };
  };
  if (single) {
    const v = raw.V || (raw.correctness || raw.contribution ? raw : null);
    return v ? { id: raw.id, V: one(v) } : null;
  }
  return raw.X && raw.Y ? { id: raw.id, X: one(raw.X), Y: one(raw.Y) } : null;
}

// One batch: ask, parse, and on failure retry — then split the batch in half.
async function judgeBatch(batch, single, attempt = 1) {
  const payload = batch.map(it => single
    ? { id: it.id, t: it.t, narration: it.narration, V: it.V }
    : { id: it.id, t: it.t, narration: it.narration, X: it.X, Y: it.Y });
  const shape = single
    ? '{"items":[{"id":"item-01","V":{"correctness":"CORRECT|NEUTRAL|WRONG","why":"...","contribution":"ADDS|TEXT_ONLY|NONE","whyC":"...","explains":"YES|NO"}}]}'
    : '{"items":[{"id":"item-01","X":{...},"Y":{...}}]}';
  const parts = [{ text: `You are an impartial judge in a mute test of an animated book-summary video. You are given items; each has the narration spoken around a moment and a blind description of what a viewer with the sound OFF saw (${single ? 'V' : 'X and Y, assigned randomly per item — judge each on its own merits'}).\n${RULES}\nItems JSON:\n${JSON.stringify(payload, null, 1)}\nWrite ONLY JSON: ${shape} (${batch.length} items). No markdown, no commentary.` }];

  let items = [];
  try {
    const json = await callGemini(parts);
    const text = (json.candidates[0].content.parts || []).map(p => p.text || '').join('');
    const obj = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
    items = (obj.items || []).map(x => normalize(x, single)).filter(Boolean);
  } catch (e) {
    console.error(`batch ${batch[0].id} attempt ${attempt} failed: ${e.message}`);
    // a bad model name / bad key / quota is not a malformed-output problem: stop,
    // never recurse down to single items on a hard API error
    if (/^API 4\d\d/.test(e.message)) throw e;
    if (attempt >= 3) {
      if (batch.length === 1) throw new Error(`item ${batch[0].id}: could not be judged`);
      const mid = Math.ceil(batch.length / 2);
      console.error(`   splitting batch ${batch[0].id} (${batch.length}) into halves`);
      return [...await judgeBatch(batch.slice(0, mid), single, 1), ...await judgeBatch(batch.slice(mid), single, 1)];
    }
    await new Promise(r => setTimeout(r, 4000 * attempt));
    return judgeBatch(batch, single, attempt + 1);
  }
  if (items.length !== batch.length) {
    console.error(`batch ${batch[0].id} attempt ${attempt}: expected ${batch.length} items, got ${items.length}`);
    return judgeBatch(batch, single, attempt + 1 > 3 ? 3 : attempt + 1);
  }
  console.error(`judge batch ${batch[0].id}-${batch[batch.length - 1].id} ok`);
  return items;
}

function save(result) {
  fs.writeFileSync(OUT, JSON.stringify({ items: result }, null, 1));
}

async function main() {
  const items = JSON.parse(fs.readFileSync(path.join(DIR, 'judge-input.json'), 'utf8'));
  const single = !items[0].Y;
  const result = [];
  for (let from = 0; from < items.length; from += 10) {
    const batch = items.slice(from, from + 10);
    result.push(...await judgeBatch(batch, single));
    save(result); // incremental — a later crash keeps what already landed
  }
  const ids = items.map(x => x.id);
  result.forEach((r, i) => { if (r.id !== ids[i]) throw new Error('item order mismatch at ' + i + ': ' + r.id); });
  save(result);
  console.log('written', result.length, '-> judge-result.json');
}
main().catch(e => { console.error('FAIL:', e.message); process.exit(1); });
