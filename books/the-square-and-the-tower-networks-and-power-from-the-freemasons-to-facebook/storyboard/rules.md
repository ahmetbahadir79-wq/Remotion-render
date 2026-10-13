# Storyboard authoring — The Square and the Tower: Networks and Power, from the Freemasons to Facebook (Niall Ferguson) · Vox engine

Vox = photoreal Flux stills + kinetic type. For EVERY beat decide what a viewer with the SOUND OFF
must see. Each image costs money and a wrong one is worse than none. ENGLISH only.
Book context: `books/the-square-and-the-tower-networks-and-power-from-the-freemasons-to-facebook/story-bible.json` — world/era: 1700s to today.

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
    "storyboard": { "claim": "...", "concreteVisual": "...", "onScreenText": "...",
                    "relationToPrevious": "...", "addedInformation": "..." } } }
```

## The image test (most important)
`image.subject` is a DESCRIBED PHOTOGRAPH — who, doing what, where, when — never a keyword list
("heart, manuscript, 1985" is forbidden). A muted viewer must guess the sentence from it. Reuse a
character's look VERBATIM so the same person recurs:
- Niall Ferguson: a British historian in his fifties, short greying hair, dark sport jacket over an open-collar shirt, seated at a wooden desk with books
- Adam Weishaupt: a late-18th-century Bavarian university professor in his late twenties, slim, powdered-hair style, dark frock coat with a white cravat
- Adolph Knigge: a German baron in his thirties, well-fed, embroidered dark-green court coat, powdered hair, a lace jabot
- Mayer Amschel Rothschild: an 18th-century Frankfurt merchant-banker in his fifties, stout, dark wool coat, round spectacles, ledger in hand
- Mark Zuckerberg: a 21st-century American tech founder in his thirties, short brown hair, plain grey T-shirt under a dark hoodie, no tie
- Henry Kissinger: an elderly American statesman in a dark suit, white hair combed back, heavy-framed glasses
- Everyman: an ordinary person of any era in plain clothes, mid-thirties, seen from behind
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
