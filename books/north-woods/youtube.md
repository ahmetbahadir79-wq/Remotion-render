# YouTube pack — North Woods (Daniel Mason)

> Title limit = **100 chars** (front-load the hook in the first ~45). Description first ~157 chars show above the fold. Tags cap = 500 chars. First 3 hashtags render above the title.
> ⚠ SCAFFOLD (deterministic) — hand-refine youtube-meta.json from the narration, set needsClaudeRefine:false, then `node scripts/plan-meta.js <config> --md-only` and `node scripts/lint-titles.js --slug=north-woods --pack`.

## Title options (pick 1, A/B test top two)
1. North Woods Summary (Daniel Mason) — Key Ideas Explained  _(56 chars)_
2. North Woods by Daniel Mason: Full Summary & Analysis  _(52 chars)_
3. North Woods Explained — TODO counter-narrative angle 1 (lint-titles.js)  _(71 chars)_
4. North Woods Review — TODO counter-narrative angle 2 (lint-titles.js)  _(68 chars)_
5. North Woods — Daniel Mason Book Review  _(38 chars)_

**Primary keyword:** North Woods Daniel Mason summary

## Description

```
I mean, because here is the most provocative thing about this entire narrative. That's the core of North Woods by Daniel Mason — and it's not what you'd expect.

In this deep dive into "North Woods" by Daniel Mason, we break down every key idea in plain language — the arguments, the turning points, and what they mean for the way you think and decide. By the end you'll walk away with the book's biggest takeaways and one reframing you can actually use. No fluff, no ending spoilers.

⏱️ Chapters:
0:00 The Setup: How "North Woods" Works
2:38 Think Of Peace And Bounty
5:15 Decade That's Just That's The
7:53 Forest Doesn't Need To Be
10:24 Casualties Were Staggering And The
12:59 Losers For A Wild Seed
15:31 Brilliant Flip It's Like Owning
18:09 Local Revolutionary Militias Are Highly
20:43 Hardened Elite Combatants In An
23:13 Impossibly Pale Dangerously Emaciated And
25:43 Paint But As The Winter
28:14 From Nash To Keep William
30:51 Borders Is Completely At The
33:27 Left By The New Turnpike
36:01 Worried About Their Mortgages And
38:38 Highly Obsessive Directions He Writes
41:15 Reject Him By Suggesting He
43:52 Pave Over Meadows With Asphalt
46:26 Own Selfish He Is Extracting
48:56 Careers They Look Incredibly Small
51:26 It's Not A Tragic Ending

🔔 Subscribe for more book breakdowns.

#NorthWoods #BookSummary #Fiction #Books #SelfImprovement
```

## Tags (≤500 chars — paste comma-separated)

```
North Woods summary, North Woods Daniel Mason, Daniel Mason, North Woods explained, North Woods analysis, North Woods book review, book summary, fiction books, fiction book summary, book breakdown, books explained, self improvement, personal development, best fiction books, book club, nonfiction summary, North Woods, North Woods key ideas
```

## Thumbnail
- File: `out/thumbnail-north-woods.png` (1280×720, code-rendered `Thumb-north-woods`)
- Layout: **portrait-right** (Style: `baroque-oil`)
- Overlay hook (already in the render): **THE SETUP**
- Concept: `[power-00]` (Score: 60/100)

<!-- test-compare:start -->
### Thumbnail Test & Compare (YouTube Studio)
Upload all three under **Thumbnail → Test & compare**; YouTube serves them evenly and keeps the one with the highest watch-time share. Same hook, different design — the test measures the design, not the promise.
- **A**: `out/thumbnail-north-woods.png` — full-bleed · right · label · mono · gold
- **B**: `out/thumbnail-north-woods-b.png` — cinematic-bleed · bottom · editorial · mono · gold
- **C**: `out/thumbnail-north-woods-c.png` — cinematic-bleed · right · label · duotone · gold
<!-- test-compare:end -->

## Upload checklist
- [ ] Upload `out/north-woods.mp4`
- [ ] Title: paste option 1 (or A/B option 2)
- [ ] Description: paste block (chapters auto-become clickable)
- [ ] Tags: paste block
- [ ] Thumbnail: `out/thumbnail-north-woods.png` + Test & compare B/C (`-b.png`, `-c.png`)
- [ ] Captions: upload `public/captions/north-woods.clean.vtt` as English CC → choose **"With timing"** (NOT the raw north-woods.vtt — YouTube rejects its inline word-timing markup)
- [ ] Category: Education · add to a "Book Breakdowns" playlist
- [ ] Pin a comment with the single sharpest line from the video
