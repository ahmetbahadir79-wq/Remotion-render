# AGENT LOG — cross-agent coordination

**Multiple Claude agents work on this repo concurrently.** This file is the shared
memory between them (private per-agent memory is NOT visible to other agents — this
file is). Read the **Active WIP** table before starting systemic work, and append a
**Changelog** entry after any systemic change (new script, pipeline/engine change,
workflow change, git-strategy change, credential handling). Keep entries short.

Conventions:
- Timezone: local. Tag yourself with a short stable handle in the `agent` column.
- "Systemic" = affects the pipeline, engines, render infra, workflows, or shared config.
  Per-book content edits do NOT need a log entry (they're self-evident in `books/<slug>/`).
- Before a broad commit/push to `god-mode`: skim this file for in-flight work on the
  same files. `god-mode` is the shared working branch; several agents commit there.

---

## Active WIP (who is touching what right now)

| agent | area / files | status | notes |
|---|---|---|---|
| worker-orchestrator | `scripts/render.js` (multi-worker REST dispatch), `render-accounts.json`, `.github/workflows/render-video.yml` | landed (local, unpushed commits up to b7a04c0) | pooled GitHub-Actions render across accounts; round-robin |
| antidote-pipeline | download+cleanup half of the pool (`scripts/render-github-{download,cleanup}.js`, `scripts/lib/render-pool.js`), coordination log | landed | done; not pushed to origin (local commit on top of worker-orchestrator's b7a04c0) |

_(clear your row when you stop; move the summary into the Changelog below.)_

---

## Changelog (newest first)

### 2026-09-02 — antidote-pipeline — origin/god-mode overwritten with the clean tree
- **What:** local `god-mode` (worker-orchestrator's clean orphan deploy tree, 252 files)
  and `origin/god-mode` (old history, 1262 files) had **NO common ancestor**. The extra
  ~1015 files on origin were a committed Python `venv/` (junk); code was equivalent
  (books 68=68, src 99=99), local had 3 extra scripts (render-pool). User confirmed "current
  structure is the real structure, overwrite" → **force-pushed local god-mode to origin**,
  replacing the old history. Added `venv/`,`.venv/` to `.gitignore` so it can't re-bloat.
- **Files:** `.gitignore`, this log; force-push of `god-mode`.
- **Status:** DONE. origin/god-mode is now the clean tree. Old 36-commit history is gone
  from the branch tip (only reachable via anyone's local reflog). Render worker repos are
  pushed to from LOCAL by render.js, unaffected.

### 2026-09-02 — vox-onscreen — meaningful on-screen text + engagement enrichment
- **What:** Fixed the meaningless big emphasis words (was "IT'S LET"). New
  `phraseEmphasis()` in `lib/beat-text.js` (salient contiguous phrase; proper-noun
  bonus; meta-word demote) → wired into `plan-vox.js` `emphasis()`. New retrofit
  scripts (no replan, respect `props.emphasisLocked`): `apply-emphasis.js` (recompute
  emphasis), `fix-names.js` (ASR name map `books/<slug>/names.json`), `apply-phrases.js`
  (lock hero "phrase-that-pays" from `books/<slug>/phrases.json`). Engine (voxkit):
  StatementScene now has 3 seeded layouts; ImageFocus label 2→3 words; **Vox-native
  ChapterOverlay + ProgressRail**; **breathing-room** = audio SLICED in Remotion
  (`NarrationAudio` segments) with gaps + `GapMusic` swell + card-in-gap
  (`apply-breathing-room.js` writes `meta.audioSegments/gaps/gapFrames/gapMusic`,
  extends `meta.totalFrames`).
- **Files:** `src/broll/voxkit/index.tsx`, `scripts/plan-vox.js`, `scripts/lib/beat-text.js`,
  `scripts/apply-emphasis.js`, `scripts/fix-names.js`, `scripts/apply-phrases.js`,
  `scripts/apply-breathing-room.js`.
- **Compat:** all voxkit additions are OPTIONAL/gated on config fields (`chapters`,
  `meta.audioSegments/gaps/gapFrames`) — books without them render exactly as before.
- **Breathing-room (audio gaps + gap music) FULLY REMOVED (user call):** inserting
  silent gaps into gap-less narration sounds broken at chapter transitions; music made
  it worse. DELETED `scripts/apply-breathing-room.js`; removed `NarrationAudio` slicing
  + `GapMusic` from voxkit; VoxBook is back to a single continuous `<Audio>`;
  `ChapterOverlay` no longer takes `gapFrames`. Do NOT reintroduce audio gaps for Vox —
  the narration has no natural pauses. Chapter cards remain as a non-blocking dark-scrim
  overlay over the CONTINUOUS audio. (Old book configs untouched per user; only martyr
  ever had gaps and it was reverted — no other config uses these fields.)
- **Status:** landed locally (uncommitted). `books/martyr` = emphasis/names/hero
  phrases/chapter cards, continuous single-`<Audio>`, totalFrames 65317 (36.3 min).

### 2026-09-02 — antidote-pipeline — GitHub-render pool: security + download/cleanup half
- **What:** (1) SECURITY: `render-accounts.json` holds live GitHub PATs and was NOT
  gitignored — added it (+ `render-worker-*.json`, `.render-github-state.json`) to
  `.gitignore` so an accidental `git add .` can't commit tokens and leak them to every
  worker repo on the next force-push. (2) Building `render-github-download.js` (pull the
  finished mp4 from the worker's Actions artifact + ffprobe-verify) and
  `render-github-cleanup.js` (after user approval, delete that repo's artifacts + run
  logs to reclaim Actions storage quota, ready the slot for the next render).
- **Files:** `.gitignore`, `scripts/lib/render-pool.js`, `scripts/render-github-download.js`, `scripts/render-github-cleanup.js`, `CLAUDE.md`, this log.
- **Status:** DONE. `render-github-download.js --slug=X` pulls+ffprobe-verifies the mp4 and writes `.render-github-state.json`; `render-github-cleanup.js --slug=X` (after approval) deletes that run's artifacts+logs on the worker repo (`--all` sweeps every completed run). Shared helpers in `scripts/lib/render-pool.js` (gh auth via GH_TOKEN env, token never on argv). Verified: syntax + worker resolution; not run against a live artifact yet.
- **Also:** added `CLAUDE.md` (auto-loaded by every session) pointing all agents here.
- **Coordination:** builds ON the worker-orchestrator's `render.js` dispatch — does not
  modify `render.js`. Tokens are read from `render-accounts.json` (gitignored) exactly
  like `render.js` does. Heads-up: the two worker remotes embed their PAT in the
  `.git/config` URL (local only, never pushed) — works, but rotate tokens if a URL leaks.

### 2026-09-02 — worker-orchestrator — multi-worker GitHub-Actions render pool
- **What:** `render.js --method=github` now round-robins across a POOL of GitHub
  accounts (`render-accounts.json` → `workers[]` with `{id,username,repo,token,branch,
  remoteName,monthlyMinutes,active}` + `lastUsedWorkerIndex`). Picks the next worker,
  force-pushes the current branch to that worker's remote, dispatches `render-video.yml`
  via the GitHub REST API with the worker's token. Spreads Actions minutes/quota across
  accounts. `render-video.yml` reworked (per-worker registry ref, masters audio on the
  runner from raw). Two workers registered: `sates52ko/Remotion-render`,
  `goodbooksummary-a11y/Remotion-render`.
- **Files:** `scripts/render.js`, `.github/workflows/render-video.yml`, `render-accounts.json` (gitignored).
- **Status:** landed locally (commits `1e97fa5`..`b7a04c0`, unpushed to origin/god-mode at time of writing).

### 2026-09-01 — antidote-pipeline — Antidote concept-aware visuals + auto YouTube pack
- **What:** Antidote engine now shows a beat's literal SUBJECT (26 flat-vector scene
  icons + `illustration`/`diorama`/`beforeAfter` shots + a 27-concept director lexicon)
  instead of talking heads. YouTube pack automated for Antidote
  (`plan-antidote-meta.js` + make-book wiring + thumbnail still, author-forward SEO).
  Render assets kept out of git (`*.mastered.m4a`/`out/` gitignored; runner re-masters).
- **Files:** `src/engines/antidote/{motifs.tsx,shots.ts,schema.ts}`,
  `scripts/lib/antidote-director.js`, `scripts/plan-antidote.js`,
  `scripts/plan-antidote-meta.js`, `scripts/plan-meta.js`, `scripts/make-book.js`.
- **Status:** committed (`bf58b8c`). Engine built but not yet re-planned into a live book.
