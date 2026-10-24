# Storyboard authoring — Do Not Say We Have Nothing (Madeleine Thien) · Vox engine

Vox = photoreal Flux stills + kinetic type. For EVERY beat decide what a viewer with the SOUND OFF
must see. Each image costs money and a wrong one is worse than none. ENGLISH only.
Book context: `books/do-not-say-we-have-nothing/story-bible.json` — world/era: 1956–1989.

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
- Sparrow: A slender 35-year-old Chinese man with sensitive thoughtful eyes, slightly disheveled dark hair, high cheekbones, wearing a plain buttoned cotton cadre jacket over a fraying white shirt, posture quiet and introspective.
- Kai: A charismatic 30-year-old Chinese pianist with sharp intense eyes, neat swept-back black hair, lean athletic frame, wearing a crisp dark wool tunic or pressed shirt, carrying an aura of guarded vigilance.
- Zhuli: A graceful 19-year-old Chinese violinist with fiery expressive dark eyes, hair tied back with a simple red ribbon, slender hands calloused from violin strings, wearing a modest dark cotton student dress.
- Marie: A 22-year-old Chinese-Canadian woman with intelligent observant dark eyes, shoulder-length straight black hair, wearing an oversized knit wool sweater and denim, studying handwritten notebooks at a wooden desk.
- Ai-ming: A 19-year-old Chinese woman with guarded haunted eyes, chin-length blunt black hair, slender and tense build, wearing a faded olive green military surplus jacket over a dark t-shirt.
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
