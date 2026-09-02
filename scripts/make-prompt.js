#!/usr/bin/env node
/**
 * make-prompt.js — Step 0 of the book pipeline.
 *
 * Given a book (title/author/genre), generates a BESPOKE NotebookLM "Audio Overview"
 * customization prompt: a unique analytical thesis + structure so every video is
 * genuinely transformative (YPP-safe) and hooks hard in the first seconds.
 *
 * Usage:
 *   node scripts/make-prompt.js --title="Single Dad Dilemma" --author="Carla Sorensen" --genre=romance
 *   (optional) --minutes=40 --slug=<slug>
 *
 * Output: books/<slug>/prompt.notebooklm.md  (paste into NotebookLM → Audio Overview → Customize)
 * Style baked in: compact (fits NotebookLM's char limit), master-keynote storytelling,
 * strictly no fabrication, no AI signature / no "sources" mentions, English/US.
 */
const fs = require("fs");
const { rel, abs, ensureBookDir } = require("./lib/paths");
const { MODEL, ENDPOINT, USE_NVIDIA, stripThink } = require("./lib/llm");

// ── ENGINE DECISION (Step 0 is the right place: the book's concept is fully known
//    here — we author the angle now — and the choice is audio/VTT-independent, so
//    deciding early lets us record it in book.json BEFORE any downstream work and
//    tell the user up front. make-book.js reads book.json.engine as the source of
//    truth and routes plan-vox vs plan-antidote accordingly.)
//
//    • Vox      → concepts carried by SPECIFIC REAL people / historical scenes /
//                 documentary realism (photoreal Flux cut-outs of nameable figures).
//    • Antidote → ABSTRACT / internal / psychological concepts with an "everyman"
//                 protagonist and no specific real people to depict (flat-vector
//                 rigged characters + kinetic typography, CPU-cheap).
//
//    This heuristic is only the CODED FALLBACK (same Claude-first split as the
//    angle): when Claude authors the book at Step 0 it passes an explicit
//    --engine=<vox|antidote> with a bespoke rationale. Vox is the safe default.
const ANTIDOTE_GENRES = new Set([
  "psychology", "self-help", "selfhelp", "self help", "relationships", "romance",
  "spirituality", "mindfulness", "productivity", "parenting", "personal-development",
]);
const VOX_GENRES = new Set([
  "philosophy", "history", "biography", "memoir", "finance", "business", "economics",
  "politics", "science", "war", "sports", "true-crime", "health", "leadership",
]);
function decideEngine(genre, title) {
  const g = String(genre).toLowerCase();
  if (ANTIDOTE_GENRES.has(g))
    return { engine: "antidote", rationale: `Genre "${g}" is abstract/internal with an everyman protagonist and no specific real people to depict — flat-vector rigged characters + kinetic typography (Antidote) read better and render cheaper than photoreal cut-outs.` };
  if (VOX_GENRES.has(g))
    return { engine: "vox", rationale: `Genre "${g}" is carried by specific real people, historical scenes and documentary realism — photoreal Flux cut-outs of nameable figures (Vox) fit the concept.` };
  return { engine: "vox", rationale: `No strong signal for "${g}"; defaulting to Vox (the main engine). Override with --engine=antidote if the concept is abstract/everyman.` };
}

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [a.replace(/^--/, ""), true];
  }),
);
const TITLE = args.title;
const AUTHOR = args.author || "";
const GENRE = (args.genre || "drama").toLowerCase();
const MINUTES = args.minutes || 50;
if (!TITLE) {
  console.error('Kullanım: node scripts/make-prompt.js --title="Kitap Adı" --author="Yazar" --genre=romance');
  process.exit(1);
}
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const SLUG = args.slug || slugify(TITLE);
const OUT = rel.prompt(SLUG);

// A fixed, COMPACT spine every prompt must contain — kept tight so the whole
// block fits NotebookLM's "Customize" character limit (long prompts get cut off
// mid-sentence). This is what keeps videos YPP-safe and retention-friendly;
// the LLM (or Claude, when no API key) fills in the book-specific angle.
const SPINE = `
STRUCTURE (follow strictly):
1. COLD OPEN (0:00-0:25): open mid-thought on the single most provocative idea. No greetings, no "welcome back", no "today we're looking at".
2. THESIS: state the one argument this whole discussion will prove.
3. SETUP: who/what the book puts in play (concrete names, stakes).
4. BEATS: 8 beats, each ONE specific claim from the book. DEVELOP each beat fully before moving on — do NOT list them quickly.
5. COUNTERPOINT: one honest criticism — where the book strains or a reader pushes back.
6. PAYOFF: land the thesis on a line that reframes everything said before.

DEPTH ENGINE (run this on EVERY beat — this is how the episode earns its length):
a) drop us into a scene in present tense with one vivid sensory detail; voice the people;
b) land the point ("here's what that means for you");
c) add a SECOND concrete example, number, or angle from the book;
d) take one honest "wait - but then..." turn where the two hosts genuinely disagree;
e) tie it back to the recurring phrase-that-pays before moving to the next beat.

LENGTH (target 45-60 minutes, minimum 45 — never shorter): give each beat 4-6 real minutes. BUT never pad to hit the number. Do NOT repeat a point you already made, do NOT restate the thesis over and over, do NOT stall with filler, throat-clearing, or "as we said earlier". Earn the length by going DEEPER, not longer on the same ground: a fresh example, a sharper objection, a genuine disagreement between the two hosts, a real "wait — but then..." turn. If you truly run out of things to say about a beat, MOVE ON rather than recycle it. Sound like two sharp people who honestly can't stop talking about this book — not a summary stretched to fill time. Do NOT signal an ending ("to wrap up", "in short", "so to sum up") before the final PAYOFF.

HARD RULES:
- English only (US audience). Two hosts in real conversation — disagree, interrupt, build on each other.
- Use ONLY facts from the book and its real, well-documented cases. NEVER invent quotes, numbers, studies, or events; if unsure of a detail, stay general instead of fabricating.
- NEVER mention "sources", "notebook", "documents", or that this is AI; never break character — you are two people who could not stop thinking about this book.
- No generic praise, no plot-recap for its own sake. Prefer specific over abstract: names, concrete scenes, numbers.
`.trim();

async function llmAngle() {
  const sys = `You design original analytical angles for a book-analysis podcast. Return STRICT JSON with keys:
- "thesis": one sharp, arguable thesis about the book (a claim, not a summary) — the spine of the whole discussion.
- "hook": the exact opening line the hosts should start on (provocative, mid-thought, under 25 words).
- "lens": the analytical lens (e.g. "structural craft", "power dynamics", "trauma and control", "genre subversion", "economics of the world") — pick one that fits THIS book and is not the obvious take.
- "beats": 8 SHORT beat descriptions (one tight sentence each — keep the whole prompt compact enough to fit NotebookLM's character limit), each a distinct specific claim to argue (not plot events), grounded in a real, concrete case/number from the book (never invented). 8 beats is required so the discussion reliably runs 45+ minutes without padding.
- "counterpoint": one honest criticism or tension worth raising.
- "closer": a reframing final line concept.
Make the angle SPECIFIC to this book and non-generic — it should be impossible to reuse for a different book.`;
  const user = `Book: "${TITLE}"${AUTHOR ? " by " + AUTHOR : ""}. Genre: ${GENRE}.\nReturn ONLY the JSON object.`;
  const resp = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "system", content: sys }, { role: "user", content: user }],
      temperature: 0.85,
      max_tokens: 2000,
    }),
  });
  if (!resp.ok) throw new Error("HTTP " + resp.status);
  const j = await resp.json();
  const txt = stripThink(j.choices?.[0]?.message?.content);
  const a = txt.indexOf("{"), b = txt.lastIndexOf("}") + 1;
  if (a < 0 || b <= a) throw new Error("no JSON in response");
  return JSON.parse(txt.slice(a, b));
}

(async () => {
  // ── ENGINE DECISION FIRST (it shapes the prompt) ──────────────────────────
  // The engine is decided BEFORE the angle is authored, because it changes HOW
  // the prompt should be written: Vox wants beats built on specific real people
  // and documentary scenes (photoreal cut-outs); Antidote wants abstract/everyman
  // beats a vector rig can portray. Claude passes --engine + --engine-why; else
  // the coded heuristic decides. Recorded in book.json (pipeline source of truth).
  ensureBookDir(SLUG);
  const picked = args.engine
    ? { engine: String(args.engine).toLowerCase(), rationale: args["engine-why"] || "Set explicitly by Claude at authoring time." }
    : decideEngine(GENRE, TITLE);
  if (!["vox", "antidote"].includes(picked.engine)) {
    console.error(`❌ Bilinmeyen engine "${picked.engine}" — sadece: vox | antidote`);
    process.exit(1);
  }
  const manifestPath = abs.manifest(SLUG);
  let manifest = {};
  try { manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")); } catch {}
  manifest = { slug: SLUG, title: TITLE, author: AUTHOR, genre: GENRE, ...manifest,
    engine: picked.engine, engineRationale: picked.rationale };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`🎬 ENGINE KARARI → ${picked.engine.toUpperCase()}${args.engine ? " (Claude, açık)" : " (heuristik)"}`);
  console.log(`   gerekçe: ${picked.rationale}`);
  console.log(`   (değiştir: --engine=${picked.engine === "vox" ? "antidote" : "vox"} --engine-why="...")`);
  console.log(`   → prompt'u bu motora göre yaz: ${picked.engine === "vox"
    ? "gerçek/isimlendirilebilir figürler + belgesel sahneler (Flux cut-out'a uygun)"
    : "soyut/everyman beat'ler (vektör rig gerçek kişi canlandıramaz)"}\n`);
  const ENGINE = picked.engine;

  // Claude-first: the bespoke angle is authored by Claude directly (sharper &
  // more book-specific than llama). The NVIDIA path is dormant unless opted in
  // with USE_NVIDIA=1. When neither runs, we write the scaffold and Claude fills
  // in the angle (see the "AUTHOR" banner below).
  let angle = null;
  if (USE_NVIDIA) {
    for (let i = 1; i <= 3 && !angle; i++) {
      try { angle = await llmAngle(); } catch (e) { console.warn(`  angle attempt ${i} failed: ${e.message}`); }
    }
  }

  const body = angle
    ? `THE ANGLE (this is what makes this episode unique):
- Lens: ${angle.lens}
- Thesis to prove: ${angle.thesis}
- Open on this idea: "${angle.hook}"

BEATS TO ARGUE (one specific claim each, in order):
${(angle.beats || []).map((b, i) => `${i + 1}. ${b}`).join("\n")}

RAISE THIS COUNTERPOINT: ${angle.counterpoint}

END BY REFRAMING: ${angle.closer}`
    : `THE ANGLE:
- Build the discussion around one arguable thesis about how "${TITLE}" works as ${GENRE}, not a summary.`;

  const prompt = `You are two hosts doing a deep, original analysis of "${TITLE}"${AUTHOR ? ` by ${AUTHOR}` : ""}.

${body}

${SPINE}`;

  const md = `# NotebookLM prompt — ${TITLE}${AUTHOR ? " (" + AUTHOR + ")" : ""}

**Slug:** \`${SLUG}\` · **Genre:** ${GENRE} · **Engine:** ${ENGINE} · **Target:** 45–60 min · **Market:** US (English)

**Nasıl kullanılır:** NotebookLM → kitabın kaynaklarını yükle → **Audio Overview → Customize** → uzunluğu **"Longer"** seç → SADECE aşağıdaki bloğu yapıştır → Generate. (Blok kompakt tutuldu ki karakter limitinde kesilmesin. Ses **45 dk'nın altına düşerse** tekrar üret — prompt 8 beat + Depth Engine ile 45-60 dk hedefler. Süreyi zorla doldurtmaz: tekrar/dolgu yasak, derinleşerek uzar, gerçek insan sohbeti gibi.)

\`\`\`
${prompt}
\`\`\`

---
## Sonraki adımlar
1. Sesi indir → \`public/audio/${SLUG}.m4a\` (veya .mp3)
2. Videoyu YouTube'a (unlisted) yükle → otomatik altyazıyı **kelime zaman damgalı VTT** olarak indir → \`public/captions/${SLUG}.vtt\`
3. Tek komut:
\`\`\`
node scripts/make-book.js --slug=${SLUG} --title="${TITLE}" --author="${AUTHOR}" --genre=${GENRE}
\`\`\`
`;

  fs.writeFileSync(OUT, md);
  console.log(`✓ ${OUT}`);
  console.log(`✓ ${rel.manifest(SLUG)} (engine: ${ENGINE})`);

  if (angle) {
    console.log(`  angle: NVIDIA/${MODEL} · lens: ${angle.lens}\n  thesis: ${String(angle.thesis).slice(0, 100)}...`);
  } else {
    console.log(`\n⚠  AÇI YAZILMADI (scaffold) — CLAUDE ŞİMDİ YAZMALI (tercih edilen, en kaliteli yol):`);
    console.log(`   ${OUT} içindeki bloğu, kitaba özgü açıyla YENİDEN yaz:`);
    console.log(`     • non-obvious lens + tek arguable thesis + mid-thought cold-open`);
    console.log(`     • 8 argued beat (her biri kitaptan somut örnek/sayı) + honest counterpoint + reframing closer`);
    console.log(`     • DEPTH ENGINE + LENGTH block korunur (45 dk floor, 45-60 hedef; dolgu/tekrar YOK, derinleşerek uzar), tam İngilizce, ~2.5–3.5k char`);
    console.log(`     • MOTORA GÖRE (${ENGINE}): ${ENGINE === "vox"
      ? "beat'leri gerçek/isimlendirilebilir figürler + belgesel sahneler üzerine kur (Flux cut-out'a uygun)"
      : "beat'leri soyut/everyman durumlar üzerine kur (vektör rig gerçek kişi canlandıramaz)"}`);
    console.log(`   (Modeli uyandırmak istersen: USE_NVIDIA=1 node scripts/make-prompt.js ...)`);
  }
})();
