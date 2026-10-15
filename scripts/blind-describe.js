// blind-describe.js — sends the anonymized mute frames to a Gemini vision model with the
// PROMPTS.md §1 blind-rater prompt and writes blind.json. The model receives ONLY the images
// plus the prompt (no repo context) = a blind rater.
//   node scripts/blind-describe.js --dir=audit/mute/<slug>/<label> [--model=..] [--batch=10]
//
// The frames are downscaled to JPEG first: posting ten 1.3 MB PNGs in one request is what made
// the first attempt fail with HTTP 503 five times over (the previous agent hand-built
// mute-small / mute-tiny to get around it). Small JPEGs are plenty for a blind read.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const KEY = process.env.GOOGLE_API_KEY;
if (!KEY) throw new Error('GOOGLE_API_KEY missing');
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : []; }));
if (!args.dir) throw new Error('Usage: node scripts/blind-describe.js --dir=audit/mute/<slug>/<label> [--model=..]');
const RUN_DIR = path.join(__dirname, '..', args.dir);
const MODEL = args.model || process.env.BLIND_MODEL || 'gemini-flash-lite-latest';
const BATCH = parseInt(args.batch || '10', 10);

const PROMPT = [
  'You are a blind rater in a mute test. You will look at still frames from an animated explainer video with NO audio and NO other context.',
  'Work ONE image at a time, in the order given. Never describe from memory of an earlier image.',
  'For EACH image, produce one entry with: "img" (the filename label shown before each image), "text" (every word printed on the image, exactly as written, or "none"), "sees" (literal description: people, what they do, their faces, objects, text, diagram, setting; 1-3 sentences), "message" (what the narrator is saying at this moment, one sentence, from the image only), "confidence" ("low"/"medium"/"high"), "wouldConfuse" (anything that could mislead, or "none").',
  'Output ONLY a JSON array of exactly N objects [{"img":"img-01.png","text":"...","sees":"...","message":"...","confidence":"...","wouldConfuse":"..."}] - no markdown fences, no commentary.',
].join('\n');

async function callGemini(parts) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
  let lastStatus = 0;
  for (let attempt = 1; attempt <= 6; attempt++) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': KEY },
      body: JSON.stringify({ contents: [{ parts }], generationConfig: { temperature: 0.2, maxOutputTokens: 8000, responseMimeType: 'application/json' } }),
    });
    lastStatus = res.status;
    const json = await res.json();
    if (res.ok) return json;
    const retryable = res.status === 503 || res.status === 429 || res.status === 500;
    console.error(`attempt ${attempt}: HTTP ${res.status}${retryable ? ' (retrying in ' + attempt * 15 + 's)' : ''}`);
    if (!retryable) throw new Error('API ' + res.status + ': ' + JSON.stringify(json).slice(0, 300));
    await new Promise((r) => setTimeout(r, attempt * 15000));
  }
  throw new Error('API failed after retries: ' + lastStatus);
}

// the frames are full-res PNGs; make small JPEGs once (ffmpeg, no image lib needed)
function smallJpegs(names) {
  const dir = path.join(RUN_DIR, 'mute-small');
  fs.mkdirSync(dir, { recursive: true });
  return names.map((n) => {
    const jpg = path.join(dir, n.replace(/\.png$/, '.jpg'));
    if (!fs.existsSync(jpg)) {
      execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', path.join(RUN_DIR, 'mute', n), '-vf', 'scale=960:-2', '-q:v', '5', jpg]);
    }
    return jpg;
  });
}

async function describeBatch(names, from, to) {
  const jpegs = smallJpegs(names);
  const parts = [{ text: PROMPT.replace('exactly N objects', 'exactly ' + names.length + ' objects').replace('in the order given', 'in the order given (starting at ' + names[0] + ')') }];
  names.forEach((n, k) => {
    parts.push({ text: `Image ${from + k} label: ${n}` });
    parts.push({ inlineData: { mimeType: 'image/jpeg', data: fs.readFileSync(jpegs[k]).toString('base64') } });
  });
  const json = await callGemini(parts);
  const text = (json.candidates && json.candidates[0] && json.candidates[0].content && json.candidates[0].content.parts || []).map((p) => p.text || '').join('');
  const arr = JSON.parse(text.slice(text.indexOf('['), text.lastIndexOf(']') + 1));
  if (!Array.isArray(arr) || arr.length !== names.length) throw new Error(`batch ${from}-${to}: expected ${names.length}, got ${arr && arr.length}`);
  console.error(`batch ${from}-${to} ok`);
  return arr;
}

async function main() {
  const out = path.join(RUN_DIR, 'blind.json');
  const imgDir = path.join(RUN_DIR, 'mute');
  const all = fs.readdirSync(imgDir).filter((f) => /^img-\d+\.png$/.test(f)).sort();
  if (!all.length) throw new Error('no mute/img-NN.png frames in ' + imgDir);
  const result = [];
  for (let from = 0; from < all.length; from += BATCH) {
    const names = all.slice(from, from + BATCH);
    result.push(...await describeBatch(names, from + 1, from + names.length));
    fs.writeFileSync(out, JSON.stringify(result, null, 1)); // incremental
  }
  result.forEach((d, i) => { if (d.img !== all[i]) throw new Error(`entry ${i} has img=${d.img}, expected ${all[i]}`); });
  fs.writeFileSync(out, JSON.stringify(result, null, 1));
  console.log(`written ${result.length} -> ${path.relative(path.join(__dirname, '..'), out)}`);
}
main().catch((e) => { console.error('FAIL:', e.message); process.exit(1); });
