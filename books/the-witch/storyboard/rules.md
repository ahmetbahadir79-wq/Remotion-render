# Storyboard authoring — The Witch (Freida McFadden) · Vox engine

Vox = photoreal Flux stills + kinetic type. For EVERY beat decide what a viewer with the SOUND OFF
must see. Each image costs money and a wrong one is worse than none. ENGLISH only.
Book context: `books/the-witch/story-bible.json` — world/era: 1692–present day.

## Output — one object per beat in your chunk, same order, same `i`
```json
{ "i": 12,
  "design": {
    "type": "statement|imagefocus|list|quote|stat|compare|checklist|polaroid|chart|timeline|question|punchline|place|document|map|flow",
    "kicker": "2-4 word ALL-CAPS tag or ''",
    "emphasis": ["1-3 SHORT ALL-CAPS specific words from THIS beat: names, places, numbers"],
    "items": [],                                     // list/checklist only: 2-4 SHORT ALL-CAPS items
    "image": null | { "subject": "a described photograph", "style": "cutout|card" },
    "compare": null | { "left": {"label","subject"}, "right": {"label","subject"} },
    "storyboard": { "claim": "...", "concreteVisual": "the picture as DRAWN (or what the text card shows)", "onScreenText": "the words on screen, or "none"",
                    "relationToPrevious": "...", "addedInformation": "..." } } }
// all five storyboard fields are REQUIRED on every beat, written from the narration — never a copy of another field
```

## The image test (most important)
`image.subject` is a DESCRIBED PHOTOGRAPH — who, doing what, where, when — never a keyword list
("heart, manuscript, 1985" is forbidden). A muted viewer must guess the sentence from it. Reuse a
character's look VERBATIM so the same person recurs:
- Julia: a woman in her thirties, slim build, shoulder-length dark hair, plain modern clothes, tired expression
- Caroline: a young woman in her twenties, slim, long pale hair under a plain linen cap, dark period dress, frightened eyes
- Peton: a seventeenth-century timber house, not a person; no figure is drawn for it
- Ethel: an elderly woman in her eighties, thin, grey hair in a bun, dark cardigan, stern face
- Henry: a man in his forties, neat build, short hair, tweed jacket, polite but intense
- Molly: a young woman in her twenties, plain build, brown hair under a cap, rough servant's dress
- Celia: a woman in her seventies, composed, grey-streaked hair, cardigan, cold expression
- Archie Eldridge: a man in his fifties, heavy build, dark wool coat, white collar, stern face
Keep the era right (no anachronisms). Flux drops gore, children in danger and war violence
(CONTENT_FILTERED) — soften to aftermath, symbol or place. No text inside images.
## Coverage — a muted viewer needs a picture most of the time
Give 70-85% of beats an image. The mute-test bar (image ADDS on >= 60% of ALL frames) cannot
be met otherwise: All the Light had images on 44% of its screen time and failed on text-only frames
while its images scored 14/15. An idea with no photograph still has a place, a person or an object
that carries it (the reader at a desk, the ruined street, the radio). `statement` with image null
only for pure banter or when every picture would mislead.
ONLY `imagefocus`, `polaroid`, `compare` and `duo` put a picture on screen. An image on any other
type (list, question, place, quote, stat, punchline, timeline…) is never shown — the planner turns such
a beat into imagefocus. Keep 15-30% of beats as those text archetypes WITHOUT an image where the shape
is the point (a real question, a real list, a real quotation): 40 minutes of one layout loses viewers.

## Output
Return ONLY a JSON array for your chunk. Validate it parses and matches every `i`.
