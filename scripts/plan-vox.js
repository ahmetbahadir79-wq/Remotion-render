#!/usr/bin/env node
/**
 * plan-vox.js (v2) — Vox Auto-Pipeline planner with LLM art-direction.
 *
 * VTT + book meta  ->  vox-config JSON { meta, captions[], beats[] }
 *
 * Timing comes from heuristic VTT segmentation; the *creative* plan (archetype,
 * kicker, emphasis, image subjects/style, compare pairs) is produced by an LLM
 * (NVIDIA llama-3.3-70b via the same NVIDIA_API_KEY) with a heuristic fallback.
 *
 * On-screen text is EMPHASIS ONLY — subtitles (captions[]) carry the full narration.
 *
 * Usage:
 *   node scripts/plan-vox.js --vtt=public/captions/single-dad-dilemma.vtt \
 *     --audio=audio/single-dad-dilemma.m4a --title="Single Dad Dilemma" \
 *     --author="Carla Sorensen" --genre=romance --slug=single-dad-dilemma \
 *     --until=180 [--no-llm]
 */
const fs = require("fs");
const { rel, ensureBookDir } = require("./lib/paths");
const { MODEL, ENDPOINT, USE_NVIDIA, stripThink } = require("./lib/llm");
const { phraseEmphasis } = require("./lib/beat-text");

const FPS = 30;
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [a.replace(/^--/, ""), true];
  }),
);
const VTT = args.vtt || "public/captions/captions.vtt";
const AUDIO = args.audio || "audio/single_dad_dilemma.m4a";
const TITLE = args.title || "Untitled";
const AUTHOR = args.author || "";
const GENRE = (args.genre || "drama").toLowerCase();
const SLUG = args.slug || slugify(TITLE);
const UNTIL = args.until ? parseFloat(args.until) : Infinity;
// VTT sits ~0.5s ahead of the audio for this project (legacy captionOffset).
// Shift beats + captions later by OFFSET seconds to lock visuals to the voice.
const OFFSET = args.offset !== undefined ? parseFloat(args.offset) : 0.5;
const OUT = args.out || rel.voxConfig(SLUG);
// Claude-first art-direction. Model path (llama) is dormant unless opted in.
//   --designs=<file>    consume Claude-authored designs (highest quality)
//   --emit-beats=<file> dump beat texts for Claude to design, then exit
//   USE_NVIDIA=1 / --use-llm  wake the model path;  --no-llm always forces off
const DESIGNS_IN = args.designs || null;
const EMIT_BEATS = args["emit-beats"] || null;
const USE_LLM = !args["no-llm"] && (USE_NVIDIA || !!args["use-llm"]) && !!process.env.NVIDIA_API_KEY;

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function tc(t) {
  const m = t.match(/(\d+):(\d+):(\d+)\.(\d+)/);
  return m ? +m[1] * 3600 + +m[2] * 60 + +m[3] + +m[4] / 1000 : 0;
}

// ── VTT word-level parse ─────────────────────────────────────────────────
function parseWords(vttText) {
  const lines = vttText.split(/\r?\n/);
  const words = [];
  let cueStart = 0;
  const cueHeader = /(\d+:\d+:\d+\.\d+)\s+-->\s+(\d+:\d+:\d+\.\d+)/;
  const inlineRe = /<(\d+:\d+:\d+\.\d+)><c>\s*([^<]+?)\s*<\/c>/g;
  for (const line of lines) {
    const h = line.match(cueHeader);
    if (h) { cueStart = tc(h[1]); continue; }
    if (!line.includes("<c>")) continue;
    const firstStamp = line.indexOf("<");
    const lead = firstStamp > 0 ? line.slice(0, firstStamp).trim() : "";
    if (lead) lead.split(/\s+/).forEach((w) => words.push({ t: cueStart, w }));
    let m;
    inlineRe.lastIndex = 0;
    while ((m = inlineRe.exec(line))) words.push({ t: tc(m[1]), w: m[2].trim() });
  }
  const seen = new Set();
  const out = [];
  for (const x of words) {
    if (!x.w) continue;
    const key = x.t.toFixed(3) + "|" + x.w.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    if (out.length && out[out.length - 1].w === x.w && Math.abs(out[out.length - 1].t - x.t) < 0.05) continue;
    out.push(x);
  }
  out.sort((a, b) => a.t - b.t);
  for (let i = 0; i < out.length; i++) {
    const next = out[i + 1];
    out[i].end = next ? Math.max(out[i].t + 0.1, next.t) : out[i].t + 0.5;
    if (out[i].end - out[i].t > 1.2) out[i].end = out[i].t + 0.6;
  }
  return out;
}

function buildCaptions(words) {
  const caps = [];
  let cur = [];
  const flush = () => {
    if (!cur.length) return;
    caps.push({
      text: cur.map((w) => w.w).join(" "),
      startFrame: Math.round(cur[0].t * FPS),
      endFrame: Math.round(cur[cur.length - 1].end * FPS),
      words: cur.map((w) => ({ w: w.w, s: Math.round(w.t * FPS), e: Math.round(w.end * FPS) })),
    });
    cur = [];
  };
  for (const w of words) {
    if (w.t > UNTIL) break;
    cur.push(w);
    const dur = cur[cur.length - 1].end - cur[0].t;
    if (cur.length >= 9 || dur >= 3.0 || (/[.!?]$/.test(w.w) && cur.length >= 4)) flush();
  }
  flush();
  return caps;
}

function buildBeats(words) {
  const TARGET = 6.5, MIN = 3.0, MAX = 8.5;
  const beats = [];
  let cur = [];
  const push = () => { if (cur.length) { beats.push({ words: cur, start: cur[0].t, end: cur[cur.length - 1].end }); cur = []; } };
  for (const w of words) {
    if (w.t > UNTIL) break;
    cur.push(w);
    const dur = cur[cur.length - 1].end - cur[0].t;
    if ((/[.!?]$/.test(w.w) && dur >= TARGET) || dur >= MAX) push();
  }
  push();
  const split = [];
  for (const b of beats) {
    const dur = b.end - b.start;
    if (dur <= MAX + 0.5) { split.push(b); continue; }
    const n = Math.max(2, Math.round(dur / TARGET));
    const per = Math.ceil(b.words.length / n);
    for (let i = 0; i < b.words.length; i += per) {
      const chunk = b.words.slice(i, i + per);
      split.push({ words: chunk, start: chunk[0].t, end: chunk[chunk.length - 1].end });
    }
  }
  const merged = [];
  for (const b of split) {
    if (b.end - b.start < MIN && merged.length) {
      const prev = merged[merged.length - 1];
      prev.words = prev.words.concat(b.words);
      prev.end = b.end;
    } else merged.push(b);
  }
  return merged;
}

// ── heuristic art-direction (fallback) ───────────────────────────────────
const STOP = new Set("the a an and or but so of to in on at for with as is are was were be been it its this that these those we you they i he she him her his their our your my me us them mean just like really very much more most about into from than then now here there what how why who when which not no yes um uh".split(/\s+/));
const FILLER = new Set("specifically absolutely really actually basically literally honestly maybe probably obviously essentially definitely certainly seriously totally completely".split(/\s+/));

function keywords(text, n = 3) {
  const toks = text.toLowerCase().replace(/[^a-z0-9$%.\s-]/g, "").split(/\s+/).filter((w) => w.length > 3 && !STOP.has(w));
  const freq = {};
  toks.forEach((w) => (freq[w] = (freq[w] || 0) + 1 + w.length * 0.05));
  return [...new Set(toks)].sort((a, b) => freq[b] - freq[a]).slice(0, n);
}
// Emphasis = the single most salient contiguous PHRASE (see beat-text.js).
// Falls back to the top keyword when the beat has nothing phrase-worthy.
function emphasis(text, n = 2) {
  const ph = phraseEmphasis(text, { max: n === 1 ? 2 : 3, want: n === 1 ? 1 : 2 }).slice(0, Math.max(n, 3));
  if (ph.length) return ph;
  return keywords(text, n).map((w) => w.toUpperCase());
}
function listItems(t) {
  const m = t.match(/([\w-]+(?:\s[\w-]+)?),\s*([\w-]+(?:\s[\w-]+)?),?\s*(?:and|&)\s*([\w-]+(?:\s[\w-]+)?)/i);
  return m ? [m[1], m[2], m[3]].map((s) => s.replace(/^(in|a|an|the|of|to|and)\s+/i, "").trim().toUpperCase()) : null;
}
const GENERIC = new Set("THIS THAT THESE THOSE DESCRIPTION THING THINGS STUFF PART PARTS IT ONE MORE MOST SOME MANY MUCH KIND SORT WAY WAYS".split(/\s+/));
function cleanItems(list) {
  const out = [];
  for (let it of list || []) {
    it = String(it).replace(/^(HIS|HER|THE|A|AN|OF|TO|AND|IN|THEIR|ITS)\s+/i, "").trim().toUpperCase();
    if (!it || it.length < 3 || GENERIC.has(it)) continue;
    if (!out.includes(it)) out.push(it);
  }
  return out.slice(0, 4);
}
function heuristicDesign(text, i, total) {
  const li = listItems(text);
  let type = "statement";
  if (i === 0) type = "title";
  else if (i === total - 1) type = "punchline";
  else if (li) type = "list";
  else if (/(\$?\d[\d,\.]*\s?(%|percent|million|billion|trillion))/i.test(text)) type = "stat";
  else if (/["“”]/.test(text)) type = "quote";
  else if (text.split(/\s+/).length <= 8) type = "statement";
  else type = i % 2 === 0 ? "imagefocus" : "statement";
  const kw = keywords(text, 3);
  const d = { type, kicker: type === "title" ? "BOOK BREAKDOWN" : "", emphasis: emphasis(text, type === "list" ? 1 : 2), items: li || [], compare: null };
  if (type === "title" || type === "imagefocus") d.image = { subject: kw.join(", "), style: "card" };
  else d.image = null;
  return d;
}

// ── LLM art-direction (with incremental per-beat cache) ────────────────────
function textHash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(36);
}
const PROMPT_VERSION = "v2"; // bump to invalidate cache when the system prompt changes

async function llmDesign(beatTexts) {
  const key = process.env.NVIDIA_API_KEY;
  const cacheFile = rel.cache(SLUG);
  let cache = {};
  try { cache = JSON.parse(fs.readFileSync(cacheFile, "utf8")); } catch {}
  const results = new Array(beatTexts.length);
  const miss = [];
  beatTexts.forEach((t, i) => {
    const h = PROMPT_VERSION + ":" + textHash(t);
    if (cache[h]) results[i] = cache[h];
    else miss.push(i);
  });
  console.log(`  cache: ${beatTexts.length - miss.length} hit, ${miss.length} to design`);

  const CHUNK = 24;
  for (let start = 0; start < miss.length; start += CHUNK) {
    const idxs = miss.slice(start, start + CHUNK);
    const slice = idxs.map((i) => beatTexts[i]);
    const sys = `You are the art director for a Vox / Johnny-Harris-style motion-graphics book-summary video about the ${GENRE} book "${TITLE}"${AUTHOR ? " by " + AUTHOR : ""}.
For each narration beat, design ONE scene. Output STRICT JSON: an array (same length & order as input) of objects with keys:
- "type": one of "title","statement","list","quote","stat","imagefocus","compare","punchline".
- "kicker": 2-4 word ALL-CAPS label or "" (a section tag, not a sentence).
- "emphasis": 1-3 SHORT punchy ALL-CAPS words/phrases that will appear big on screen. NEVER a full sentence.
- "items": for "list" only, 2-4 SHORT ALL-CAPS items, else [].
- "image": null, or {"subject":"<concrete cinematic visual to illustrate this beat, no text>","style":"cutout"|"card"}. Use "cutout" for a single person/character or object (it will be masked onto a paper background); "card" for an environment/place/scene. Only add an image when it genuinely helps.
- "compare": for "compare" only, {"left":{"label":"<CAPS>","subject":"<visual>"},"right":{"label":"<CAPS>","subject":"<visual>"}}, else null.
Rules: on-screen text is EMPHASIS ONLY (subtitles carry the words). Vary archetypes so no 3 in a row repeat. First beat = "title". Prefer concrete, specific image subjects tied to the story (characters, settings, objects), not abstractions.`;
    const user = "Beats:\n" + slice.map((t, i) => `${i}. ${t}`).join("\n") + "\n\nReturn ONLY the JSON array.";
    try {
      const resp = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "system", content: sys }, { role: "user", content: user }],
          temperature: 0.5, max_tokens: 4000,
        }),
      });
      const j = await resp.json();
      const txt = stripThink(j.choices?.[0]?.message?.content);
      const arr = JSON.parse(txt.slice(txt.indexOf("["), txt.lastIndexOf("]") + 1));
      idxs.forEach((gi, k) => {
        const d = arr[k] || heuristicDesign(beatTexts[gi], gi, beatTexts.length);
        results[gi] = d;
        cache[PROMPT_VERSION + ":" + textHash(beatTexts[gi])] = d;
      });
      fs.writeFileSync(cacheFile, JSON.stringify(cache)); // save incrementally (resume-safe)
      console.log(`  designed misses ${start}-${start + idxs.length - 1} / ${miss.length}`);
    } catch (e) {
      console.warn(`  LLM chunk @${start} failed (${e.message}); heuristics for it.`);
      idxs.forEach((gi) => { results[gi] = heuristicDesign(beatTexts[gi], gi, beatTexts.length); });
    }
  }
  for (let i = 0; i < beatTexts.length; i++) if (!results[i]) results[i] = heuristicDesign(beatTexts[i], i, beatTexts.length);
  return results;
}

// per-book palette overrides (thematic, keyed by slug) — win over the genre default
const SLUG_PALETTES = {
  // The Mountain Is You: self-sabotage (cold, high-altitude shadow) → mastery (golden summit dawn)
  "the-mountain-is-you": "cold alpine blue-slate shadows warming into golden summit dawn light, misty high-altitude air, restrained palette",
};

function imagePrompt(subject, style) {
  const palette = SLUG_PALETTES[SLUG]
    || (GENRE === "romance" ? "warm cinematic light, muted earthy tones, emotional"
    : ["thriller", "mystery", "horror"].includes(GENRE) ? "moody low-key lighting, desaturated, tense"
    : "cinematic, filmic, atmospheric");
  const iso = style === "cutout" ? "single isolated subject, plain seamless studio background, centered, full subject in frame, " : "";
  return `cinematic editorial still: ${subject}. ${iso}${palette}, shallow depth of field, no text, no watermark, high detail, 8k`;
}

// ── build ─────────────────────────────────────────────────────────────────
(async () => {
  ensureBookDir(SLUG); // books/<slug>/ must exist before writing config.vox.json / cache.json
  const vttText = fs.readFileSync(VTT, "utf8");
  const words = parseWords(vttText);
  if (!words.length) { console.error("No words parsed from VTT."); process.exit(1); }
  const captions = buildCaptions(words);
  const rawBeats = buildBeats(words);
  const texts = rawBeats.map((b) => b.words.map((w) => w.w).join(" "));

  // ── DESIGN SOURCE (Claude-first) ──────────────────────────────────────────
  // Author's manual (--emit-beats → author → --designs) beats the model; the
  // model beats heuristics. All three yield the same design[] shape.
  if (EMIT_BEATS) {
    const payload = {
      slug: SLUG, title: TITLE, author: AUTHOR, genre: GENRE, count: texts.length,
      instructions:
        "Author one design per beat, SAME order & length. Then: node scripts/plan-vox.js --designs=<thisFileEdited> (same other args).",
      designSchema: {
        type: "title|statement|list|quote|stat|imagefocus|compare|punchline",
        kicker: "2-4 word ALL-CAPS section tag or ''",
        emphasis: "1-3 SHORT ALL-CAPS words/phrases (never a full sentence)",
        items: "list-only: 2-4 SHORT ALL-CAPS items, else []",
        image: "null OR {subject:'concrete cinematic visual, no text', style:'cutout'|'card'}",
        compare: "compare-only: {left:{label,subject},right:{label,subject}}, else null",
      },
      beats: texts.map((t, i) => ({ i, text: t, design: heuristicDesign(t, i, texts.length) })),
    };
    ensureBookDir(SLUG);
    fs.writeFileSync(EMIT_BEATS, JSON.stringify(payload, null, 2));
    console.log(`\n✍  ${texts.length} beat yazıldı → ${EMIT_BEATS}`);
    console.log(`   Claude: her beat için "design"i kitaba özgü yeniden yaz (heuristic taslak dolu), sonra:`);
    console.log(`   node scripts/plan-vox.js --designs=${EMIT_BEATS} --vtt=${VTT} --slug=${SLUG} --title="${TITLE}" ...`);
    return;
  }

  let designs;
  if (DESIGNS_IN) {
    const loaded = JSON.parse(fs.readFileSync(DESIGNS_IN, "utf8"));
    // accept either the emit-beats payload ({beats:[{design}]}) or a bare design[]
    const arr = Array.isArray(loaded) ? loaded : (loaded.beats || []).map((b) => b.design || b);
    if (arr.length !== texts.length) {
      console.warn(`  ⚠ designs count ${arr.length} ≠ beats ${texts.length}; missing filled with heuristics.`);
    }
    designs = texts.map((t, i) => arr[i] || heuristicDesign(t, i, texts.length));
    console.log(`Planning ${rawBeats.length} beats via Claude designs (${DESIGNS_IN}) ...`);
  } else if (USE_LLM) {
    console.log(`Planning ${rawBeats.length} beats via LLM (${MODEL}) ...`);
    designs = await llmDesign(texts);
  } else {
    console.log(`Planning ${rawBeats.length} beats via heuristics (Claude-first: --emit-beats to hand-direct, or USE_NVIDIA=1 for the model) ...`);
    designs = texts.map((t, i) => heuristicDesign(t, i, texts.length));
  }

  const arr = (v) => (Array.isArray(v) ? v : v ? String(v).split(/\s*[,/]\s*/) : []);
  const usedTypes = [];
  const beats = rawBeats.map((b, i) => {
    const d = designs[i] || heuristicDesign(texts[i], i, texts.length);
    const id = `beat-${String(i).padStart(3, "0")}`;
    const fromFrame = Math.round(b.start * FPS);
    const durationFrames = Math.max(30, Math.round((b.end - b.start) * FPS));
    const kicker = String(d.kicker || "").toUpperCase();
    const emphasis = arr(d.emphasis).map((s) => String(s).toUpperCase()).slice(0, 3);
    let items = cleanItems(arr(d.items));
    const kws = keywords(texts[i], 3);
    const blob = kicker + " " + emphasis.join(" ");

    // ── deterministic archetype assignment (LLM content + code variety) ──
    let type;
    const textList = cleanItems(listItems(texts[i]) || []);
    if (i === 0) type = "title";
    else if (i === texts.length - 1) type = "punchline";
    else if (/\bVS\b/i.test(blob) || d.type === "compare") type = "compare";
    else if (items.length >= 2 || textList.length >= 2) {
      type = "list";
      if (items.length < 2) items = textList;
    } else if (d.type === "stat" || /(\$?\d[\d,\.]*\s?(%|percent|million|billion|trillion))/i.test(texts[i])) type = "stat";
    else if (d.type === "quote") type = "quote";
    else if (d.image && d.image.subject) type = "imagefocus";
    else type = "statement";
    // break up monotony: no 3 of the same image/text archetype in a row
    if (type === "statement" && usedTypes.slice(-2).every((t) => t === "statement")) type = "quote";
    if (type === "imagefocus" && usedTypes.slice(-2).every((t) => t === "imagefocus")) type = "statement";
    usedTypes.push(type);

    const images = [];
    const addImg = (suffix, subject, style) => {
      const path = `scenes/${SLUG}/${id}${suffix}.png`;
      const img = { path, prompt: imagePrompt(subject, style), style };
      if (style === "cutout") img.cut = `scenes/${SLUG}/${id}${suffix}-cut.png`;
      images.push(img);
      return img;
    };

    const props = { text: texts[i], kicker, emphasis, items, keywords: kws };
    if (i === 0) { props.title = TITLE; props.author = AUTHOR; if (!props.kicker) props.kicker = "BOOK BREAKDOWN"; }

    if (type === "compare") {
      let left, right, ls, rs;
      if (d.compare && d.compare.left && d.compare.right) {
        left = String(d.compare.left.label || "").toUpperCase();
        right = String(d.compare.right.label || "").toUpperCase();
        ls = d.compare.left.subject || left;
        rs = d.compare.right.subject || right;
      } else {
        const src = emphasis.find((e) => /\bVS\b/i.test(e)) || (/\bVS\b/i.test(kicker) ? kicker : emphasis.join(" VS "));
        const parts = src.split(/\bVS\b/i).map((s) => s.trim()).filter(Boolean);
        left = (parts[0] || emphasis[0] || kws[0] || "THIS").toUpperCase();
        right = (parts[1] || emphasis[1] || kws[1] || "THAT").toUpperCase();
        ls = `${left.toLowerCase()} concept, ${GENRE} story`;
        rs = `${right.toLowerCase()} concept, ${GENRE} story`;
      }
      props.compareLabels = [left, right];
      addImg("-a", ls, "cutout");
      addImg("-b", rs, "cutout");
    } else if (type === "title") {
      if (d.image && d.image.subject) addImg("", d.image.subject, d.image.style === "cutout" ? "cutout" : "card");
      else addImg("", `evocative ${GENRE} book cover mood for "${TITLE}"`, "card");
    } else if (type === "imagefocus") {
      const subj = (d.image && d.image.subject) || kicker.toLowerCase() || kws.join(", ");
      const style = d.image && d.image.style === "card" ? "card" : "cutout";
      addImg("", subj, style);
    }
    return { id, type, fromFrame, durationFrames, props, images };
  });

  // ── SYNC: re-anchor each scene to when its on-screen key word is actually
  // spoken (a beat's emphasis word is usually mid-sentence, so starting the
  // scene at the beat's first word makes the visual lead the audio by seconds).
  const PREROLL = 0.35; // s of lead so the entrance lands right as the word is heard
  const CLEAN = (w) => w.toLowerCase().replace(/[^a-z0-9]/g, "");
  const tokenize = (list) =>
    (list || []).flatMap((e) => String(e).toLowerCase().split(/\s+/)).map((w) => w.replace(/[^a-z0-9]/g, "")).filter((w) => w.length > 2);
  // Search the GLOBAL word stream from the beat's start onward — the on-screen
  // emphasis word ("Buffalo") is often spoken a few seconds later, sometimes past
  // the chunk boundary, so anchoring only inside the beat's own words misses it.
  const firstSpokenAfter = (tokens, fromT, maxT) => {
    if (!tokens.length) return null;
    for (const wd of words) {
      if (wd.t < fromT - 0.05) continue;
      if (wd.t > maxT) break;
      if (tokens.includes(CLEAN(wd.w))) return wd.t;
    }
    return null;
  };
  const anchorTime = beats.map((beat, i) => {
    const rb = rawBeats[i];
    const primary = tokenize([...(beat.props.emphasis || []), ...(beat.props.items || []), ...(beat.props.compareLabels || [])]);
    const secondary = tokenize(beat.props.keywords);
    const cap = rb.end + 9; // don't let a mismatched word drag the scene minutes away
    const at = firstSpokenAfter(primary, rb.start, cap) ?? firstSpokenAfter(secondary, rb.start, cap);
    return at != null ? at : rb.start;
  });
  // monotonic starts, preroll + global sync offset; title pinned to 0
  let prev = -1;
  beats.forEach((beat, i) => {
    let s = i === 0 ? 0 : anchorTime[i] - PREROLL + OFFSET;
    s = Math.max(s, prev + 0.5); // don't let scenes collide
    beat.fromFrame = Math.round(s * FPS);
    prev = s;
  });
  // each scene runs until the next scene's start (last one to end of narration)
  beats.forEach((beat, i) => {
    const next = i + 1 < beats.length ? beats[i + 1].fromFrame : Math.round((rawBeats[i].end + OFFSET) * FPS);
    beat.durationFrames = Math.max(20, next - beat.fromFrame);
  });

  // COLLAPSE rapid clusters: when several emphasis words are spoken in quick
  // succession, anchoring packs their scenes into ~1s (flashing). Keep only the
  // most visual beat per <MIN_SCENE window; it holds from the cluster's start.
  const MIN_SCENE = Math.round(1.8 * FPS);
  const visualScore = (b) =>
    (b.images.length ? 2 : 0) + (["compare", "list", "stat", "title", "punchline"].includes(b.type) ? 1 : 0);
  const finalBeats = [];
  let collapsed = 0;
  for (const beat of beats) {
    const prev = finalBeats[finalBeats.length - 1];
    if (prev && beat.fromFrame - prev.fromFrame < MIN_SCENE) {
      collapsed++;
      if (visualScore(beat) > visualScore(prev)) {
        beat.fromFrame = prev.fromFrame; // keep the earlier (synced) start
        finalBeats[finalBeats.length - 1] = beat;
      }
      // otherwise drop this beat; prev keeps holding
    } else {
      finalBeats.push(beat);
    }
  }
  finalBeats.forEach((b, i) => {
    const next = i + 1 < finalBeats.length ? finalBeats[i + 1].fromFrame : b.fromFrame + b.durationFrames;
    b.durationFrames = Math.max(FPS, next - b.fromFrame);
  });
  // captions keep word-accurate timing; only shifted by the global sync offset
  const offFrames = Math.round(OFFSET * FPS);
  if (offFrames) {
    captions.forEach((c) => {
      c.startFrame += offFrames;
      c.endFrame += offFrames;
      c.words.forEach((w) => { w.s += offFrames; w.e += offFrames; });
    });
  }

  const totalFrames = finalBeats.length ? finalBeats[finalBeats.length - 1].fromFrame + finalBeats[finalBeats.length - 1].durationFrames : 0;
  const config = {
    meta: { title: TITLE, author: AUTHOR, genre: GENRE, slug: SLUG, audio: AUDIO, fps: FPS, width: 1920, height: 1080, totalFrames, until: UNTIL === Infinity ? null : UNTIL, planner: USE_LLM ? "llm" : "heuristic", generatedAt: new Date().toISOString() },
    captions,
    beats: finalBeats,
  };
  fs.writeFileSync(OUT, JSON.stringify(config, null, 2));

  const counts = finalBeats.reduce((a, b) => ((a[b.type] = (a[b.type] || 0) + 1), a), {});
  const imgCount = finalBeats.reduce((a, b) => a + b.images.length, 0);
  const cutCount = finalBeats.reduce((a, b) => a + b.images.filter((im) => im.cut).length, 0);
  const minDur = Math.min(...finalBeats.map((b) => b.durationFrames)) / FPS;
  console.log(`\n✓ ${OUT}`);
  console.log(`  beats: ${finalBeats.length} (collapsed ${collapsed} rapid)  captions: ${captions.length}  duration: ${(totalFrames / FPS).toFixed(1)}s`);
  console.log(`  archetypes:`, counts);
  console.log(`  images: ${imgCount} (cutouts: ${cutCount})  shortest scene: ${minDur.toFixed(1)}s`);
})();
