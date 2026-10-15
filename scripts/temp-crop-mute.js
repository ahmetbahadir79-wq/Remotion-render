const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const SLUG = 'piranesi';
const LABEL = 'run1';
const ROOT = process.cwd();
const OUT = path.join(ROOT, 'audit', 'mute', SLUG, LABEL);
const D = path.join(ROOT, 'audit', 'mute', SLUG, LABEL, 'stills', SLUG);

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFor(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  }
  return h >>> 0;
}

const files = fs.readdirSync(D).filter(f => f.endsWith('.png'));
console.log('Found stills:', files.length);

const rnd = rng(seedFor(LABEL) ^ 0x5bd1e995);
const order = files.map(f => [f, rnd()]).sort((a, b) => a[1] - b[1]).map(x => x[0]);
const key = {};

fs.mkdirSync(path.join(OUT, 'mute'), { recursive: true });

order.forEach((f, k) => {
  const id = `img-${String(k + 1).padStart(2, '0')}.png`;
  key[id] = f;
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', path.join(D, f), '-vf', 'crop=iw:ih*0.76:0:0', path.join(OUT, 'mute', id)]);
});

fs.writeFileSync(path.join(OUT, 'key.json'), JSON.stringify(key, null, 2));

const imgDir = path.join(OUT, 'mute');
const promptMd = `# Mute test — ${SLUG} / ${LABEL}

## 1. Blind describer (a fresh agent; it must not know the book)
You are a blind rater in a mute test. You will look at ${order.length} still frames from an animated explainer video with NO audio and NO other context. Do not read any other files in the repository — only the images listed below. Do not search the repo, do not open JSON/config files, do not look at sibling folders.

Images (read each with the Read tool): ${path.join(imgDir, 'img-01.png')} through img-${String(order.length).padStart(2, '0')}.png in the same folder.

Work ONE image at a time: open img-NN, write its entry, then open the next. Never describe from memory of an earlier image.
For EACH image, write: "text" (every word printed on the image, exactly as written, or "none"), "sees" (literal description: people, what they do, their faces, objects, text, diagram, setting; 1-3 sentences), "message" (what the narrator is saying at this moment, one sentence, from the image only), "confidence" (low/medium/high), "wouldConfuse" (anything that could mislead, or "none").

Write ONLY a JSON array [{"img":"img-01.png","text":"...","sees":"...","message":"...","confidence":"...","wouldConfuse":"..."}, ...] to ${path.join(OUT, 'blind.json')}. Verify it parses and has ${order.length} entries. Reply with one line: "written ${order.length}".

## 2. Then
    node scripts/mute-test.js judge --slug=${SLUG} --label=${LABEL}
`;

fs.writeFileSync(path.join(OUT, 'PROMPTS.md'), promptMd);
console.log(`Successfully prepared mute images and prompts for ${order.length} frames.`);
