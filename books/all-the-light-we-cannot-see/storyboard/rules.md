# Storyboard authoring — All the Light We Cannot See (Anthony Doerr) · Vox engine

Vox = photoreal Flux stills + kinetic type. For EVERY beat decide what a viewer with the SOUND OFF
must see. Each image costs money and a wrong one is worse than none. ENGLISH only.
Book context: `books/all-the-light-we-cannot-see/story-bible.json` — world/era: 1934–1944.

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
- Marie-Laure: A slight 16-year-old French girl with cloudy pale eyes from congenital cataracts, wavy dark brown hair pulled back with a ribbon, delicate cheekbones, wearing a faded blue cotton dress with a small leather satchel, fingertips tracing the air in front of her.
- Werner: An 18-year-old German soldier with striking white-blond hair, pale skin, sharp intelligent blue eyes, lean wiry build, wearing a rumpled grey Wehrmacht field uniform with radio headphones around his neck.
- Daniel LeBlanc: A stocky 45-year-old French craftsman with calloused steady hands, a kind square face, short dark hair greying at the temples, wearing a brown wool museum worker's coat with tiny brass keys on a ring at his belt.
- Etienne: A frail 65-year-old French man with trembling hands, thinning white hair, hollow frightened eyes behind round spectacles, wearing a faded dressing gown over a wrinkled shirt, standing in a dim attic beside a glowing radio transmitter.
- von Rumpel: A gaunt 50-year-old German officer with sunken cheeks from terminal illness, close-cropped greying hair, cold analytical grey eyes, wearing a crisp dark Wehrmacht officer's coat with a jeweler's loupe on a chain around his neck.
- Frederick: A thin 16-year-old German boy with thick round glasses, soft brown eyes, uncombed light brown hair, slight stooped build, wearing the grey wool uniform of the Schulpforta academy with a small bird-identification notebook in his pocket.
- Jutta: A 14-year-old German girl with the same striking white-blond hair as Werner, sharp questioning eyes, a determined set to her jaw, wearing a simple patched orphanage dress.
- Madame Manec: A stout 70-year-old French woman with silver hair in a tight bun, weathered ruddy face, strong broad hands, wearing a practical dark apron over a grey housedress.
- Narrator: A modern analyst in a dark blazer over an open-collar shirt, gesturing while explaining the themes of All the Light We Cannot See.
- Everyman: A faceless modern figure in a plain dark hoodie, illuminated by the blue glow of a screen, headphones on, surrounded by invisible radio waves.
Keep the era right (no anachronisms). Flux drops gore, children in danger and war violence
(CONTENT_FILTERED) — soften to aftermath, symbol or place. No text inside images.
## Coverage — a muted viewer needs a picture most of the time
Give at least 70% of beats an image. The mute-test bar (image ADDS on >= 60% of ALL frames) cannot
be met otherwise: All the Light had images on 44% of its screen time and failed on text-only frames
while its images scored 14/15. An idea with no photograph still has a place, a person or an object
that carries it (the reader at a desk, the ruined street, the radio). `statement` with image null
only for pure banter or when every picture would mislead.

## Output
Return ONLY a JSON array for your chunk. Validate it parses and matches every `i`.
