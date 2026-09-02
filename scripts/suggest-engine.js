#!/usr/bin/env node
/**
 * suggest-engine.js — reads a book's VTT and RECOMMENDS which engine fits:
 *   Antidote  → character/story-driven narration (people, scenes, dialogue)
 *   Vox       → abstract/data-driven narration (numbers, stats, concepts)
 *
 * Advisory only — the decision is written to books/<slug>/book.json `engine` by
 * you/Claude. Mixing engines across the channel is deliberate (YPP originality:
 * the channel stops being one-note).
 *
 * Usage: node scripts/suggest-engine.js --slug=<slug> [--vtt=path]
 */
const fs = require("fs");
const { rel, abs } = require("./lib/paths");
const { parseWords } = require("./lib/vtt");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [a.replace(/^--/, ""), true];
  }),
);
const SLUG = args.slug;
if (!SLUG) { console.error("Usage: node scripts/suggest-engine.js --slug=<slug> [--vtt=path]"); process.exit(1); }
const VTT = args.vtt && fs.existsSync(args.vtt) ? args.vtt : abs.vtt(SLUG);
if (!fs.existsSync(VTT)) { console.error(`VTT not found: ${VTT}`); process.exit(1); }

const words = parseWords(fs.readFileSync(VTT, "utf8"));
const text = words.map((w) => w.w).join(" ");
const tokens = text.split(/\s+/).filter(Boolean);
const n = tokens.length || 1;

// ── signals ──────────────────────────────────────────────────────────────
const PRONOUNS = new Set("he she they him her his hers their them we i you".split(" "));
const STORY = /\b(story|man|woman|boy|girl|father|mother|son|daughter|friend|day|night|room|door|walked|looked|said|asked|felt|remember|years?|old|home|house|street|car|hands?|face|eyes)\b/gi;
const DATA = /\b(percent|percentage|study|studies|research|data|average|statistics?|rate|ratio|billion|million|thousand|dollars?|economy|market|number|graph|chart)\b/gi;

let pron = 0, proper = 0;
tokens.forEach((t, i) => {
  const raw = t.replace(/[^A-Za-z']/g, "");
  if (!raw) return;
  if (PRONOUNS.has(raw.toLowerCase())) pron++;
  // Capitalized word not at sentence start (prev token doesn't end a sentence) → likely a name/place
  if (/^[A-Z][a-z]{2,}$/.test(raw) && i > 0 && !/[.!?]$/.test(tokens[i - 1])) proper++;
});
const numbers = (text.match(/\$?\d[\d,.]*%?/g) || []).length;
const story = (text.match(STORY) || []).length;
const data = (text.match(DATA) || []).length;

const per1k = (x) => +((x / n) * 1000).toFixed(1);
const antidoteScore = per1k(pron) * 1.0 + per1k(proper) * 1.4 + per1k(story) * 1.2;
const voxScore = per1k(numbers) * 1.3 + per1k(data) * 1.5;

const pick = antidoteScore >= voxScore ? "antidote" : "vox";
const margin = Math.abs(antidoteScore - voxScore);
const confidence = margin > 6 ? "strong" : margin > 2.5 ? "moderate" : "weak (judgment call)";

console.log(`\n══ ENGINE SUGGESTION — ${SLUG} ══`);
console.log(`   words: ${n}`);
console.log(`   Antidote signals /1k:  pronouns ${per1k(pron)} · proper-nouns ${per1k(proper)} · story ${per1k(story)}  → score ${antidoteScore.toFixed(1)}`);
console.log(`   Vox signals /1k:       numbers ${per1k(numbers)} · data-words ${per1k(data)}                → score ${voxScore.toFixed(1)}`);
console.log(`\n   ➜ RECOMMENDATION: ${pick.toUpperCase()}  (${confidence})`);
console.log(`\n   Karar senin/Claude'un — book.json'a yaz:  "engine": "${pick}"`);
console.log(`   Sonra: ${pick === "antidote" ? `node scripts/plan-antidote.js --slug=${SLUG} --title="..." --genre=...` : `node scripts/make-book.js --slug=${SLUG} --title="..." --genre=...`}\n`);
