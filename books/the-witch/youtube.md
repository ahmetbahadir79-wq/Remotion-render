# YouTube pack — The Witch (Freida McFadden)

> Title limit = **100 chars** (front-load the hook in the first ~45). Description first ~157 chars show above the fold. Tags cap = 500 chars. First 3 hashtags render above the title.
> ⚠ SCAFFOLD (deterministic) — hand-refine youtube-meta.json from the narration, set needsClaudeRefine:false, then `node scripts/plan-meta.js <config> --md-only` and `node scripts/lint-titles.js --slug=the-witch --pack`.

## Title options (pick 1, A/B test top two)
1. The Witch Summary (Freida McFadden) — Key Ideas Explained  _(57 chars)_
2. The Witch by Freida McFadden: Full Summary & Analysis  _(53 chars)_
3. The Witch Explained — TODO counter-narrative angle 1 (lint-titles.js)  _(69 chars)_
4. The Witch Review — TODO counter-narrative angle 2 (lint-titles.js)  _(66 chars)_
5. The Witch — Freida McFadden Book Review  _(39 chars)_

**Primary keyword:** The Witch Freida McFadden summary

## Description

```
We always talk about home ownership like, you know, like we own the house, right? That's the core of The Witch by Freida McFadden — and it's not what you'd expect.

In this deep dive into "The Witch" by Freida McFadden, we break down every key idea in plain language — the arguments, the turning points, and what they mean for the way you think and decide. By the end you'll walk away with the book's biggest takeaways and one reframing you can actually use. No fluff, no ending spoilers.

⏱️ Chapters:
0:00 The Setup: How "The Witch" Works
2:36 Most Expensive Cities On Earth
5:11 Historical Which You Know On
7:49 Manifestations Of A Society's Deep
10:27 Knife Humans Built Those Cramped
12:59 Love That Parallel While Her
15:30 Where You'd Set Up A
18:06 What Does This All Actually
20:38 She's Terrified She Goes To
23:17 House Specifically Mick And The
25:54 Life She Has Been Living
28:32 Struck A Demonic Unspoken Bargain
31:10 Wasn't Some Hysterical Hallucinating Teenage
33:44 Sheer Audacity To Wear The
36:15 Massive Financial Way Out Of
38:46 House Here's What That Means
41:19 Ethel Twist In The Modern

🔔 Subscribe for more book breakdowns.

#TheWitch #BookSummary #Thriller #Books #SelfImprovement
```

## Tags (≤500 chars — paste comma-separated)

```
The Witch summary, The Witch Freida McFadden, Freida McFadden, The Witch explained, The Witch analysis, The Witch book review, book summary, thriller books, thriller audiobook, book breakdown, books explained, self improvement, personal development, best thriller books, book club, nonfiction summary, The Witch, The Witch key ideas
```

## Thumbnail
- File: `out/thumbnail-the-witch.png` (1280×720, code-rendered `Thumb-the-witch`)
- Layout: **portrait-right** (Style: `brutalist-graphic`)
- Overlay hook (already in the render): **THE SETUP**
- Concept: `[power-00]` (Score: 58/100)

<!-- test-compare:start -->
### Thumbnail Test & Compare (YouTube Studio)
Upload all three under **Thumbnail → Test & compare**; YouTube serves them evenly and keeps the one with the highest watch-time share. Same hook, different design — the test measures the design, not the promise.
- **A**: `out/thumbnail-the-witch.png` — full-bleed · left · block · color · gold
- **B**: `out/thumbnail-the-witch-b.png` — cinematic-bleed · right · label · duotone · red
- **C**: `out/thumbnail-the-witch-c.png` — cinematic-bleed · bottom · editorial · mono · gold
<!-- test-compare:end -->

## Upload checklist
- [ ] Upload `out/the-witch.mp4`
- [ ] Title: paste option 1 (or A/B option 2)
- [ ] Description: paste block (chapters auto-become clickable)
- [ ] Tags: paste block
- [ ] Thumbnail: `out/thumbnail-the-witch.png` + Test & compare B/C (`-b.png`, `-c.png`)
- [ ] Captions: upload `public/captions/the-witch.clean.vtt` as English CC → choose **"With timing"** (NOT the raw the-witch.vtt — YouTube rejects its inline word-timing markup)
- [ ] Category: Education · add to a "Book Breakdowns" playlist
- [ ] Pin a comment with the single sharpest line from the video
