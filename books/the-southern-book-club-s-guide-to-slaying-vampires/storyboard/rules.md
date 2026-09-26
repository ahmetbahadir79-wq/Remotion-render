# Storyboard authoring — The Southern Book Club's Guide to Slaying Vampires (Grady Hendrix) · Antidote engine

You art-direct an animated summary. The audio is a two-host analysis. For EVERY beat decide what a
viewer with the SOUND OFF must see to understand what is being said. A wrong picture is worse than
none. Everything you write is ENGLISH. Book context: `books/the-southern-book-club-s-guide-to-slaying-vampires/story-bible.json`.
Reference (approved, We Were Liars): `books/we-were-liars/art.json` — read 10 beats of it first.

## Output — one object per beat in your chunk, same order, same `i`
```json
{ "i": 12,
  "concept": "<icon>" | null,
  "diagram": null | { "type": "flow|sorter|spectrum|matchWave", "labels": ["..",".."], "values": [..]? },
  "callout": { "text": "2-5 words", "style": "reveal|highlight|strike|box|stack" } | null,
  "set": "<set>",                    // optional
  "shotOverride": "<shot>",          // optional, rarely
  "cast": ["<castKey>", "<castKey>"],// who is on screen, most important first
  "expression": "<expression>",      // first cast member's face
  "action": "<action>",              // first cast member's body
  "holds": "<object>",               // optional object in their hand
  "storyboard": { "claim": "...", "concreteVisual": "...", "onScreenText": "...",
                  "relationToPrevious": "...", "addedInformation": "... (write 'weak: ...' if honest)" } }
```

## Vocabulary (nothing else renders)
- icons: crash, ledge, water, grave, medical, notes, phone, home, family, road, storm, star, heart, fire, tree, mask, mirror, key, law, photo, war, game, city, food, coin, door, lightbulb, puppeteer, chains, compass, boulder, crack, clock, balance, book, shield, trophy, hourglass, target, gift, inheritance, casserole, trueCrimeBook, snake
- sets: horizon, street, room, abstract, kitchen, bedroom, library, hospital, forest, highway
- shots: wide, medium, closeUp, twoShot, overShoulder, insert, split, silhouette, lowAngle, crowd, illustration, diorama, beforeAfter
- expressions: neutral, happy, sad, surprised, worried
- actions: idle, talk, point, celebrate, slump, think, walk, sit, hold, reach
- holds: book, phone, key, notes, letter, coin, cup, lightbulb, mask, photo, mirror, flower, compass, briefcase, shield, trophy, hourglass, target, magnifier, wallet, gift
- cast (story-bible keys):
- `patricia` — Patricia Campbell (protagonist — suburban housewife, book club founder, the one who sees the monster first): White woman in her late thirties, medium build, shoulder-length brown hair pinned back, wearing a floral print dress with an apron, tired eyes, 1990s suburban mother
- `james` — James Harris (antagonist — the vampire, a charming Southern gentleman who feeds on the invisible): Tall, lean white man in his early forties, dark slicked-back hair, sharp jaw, immaculate navy blazer over a crisp white shirt, unsettlingly polished smile, 1990s real estate investor look
- `carter` — Carter Campbell (Patricia's husband — ambitious psychiatrist, sides with James over his own wife): White man in his early forties, tall athletic build, neat sandy-brown hair parted to the side, wire-rimmed glasses, wearing a button-down shirt with rolled sleeves, doctor's confidence
- `mrs-green` — Mrs. Green (moral center — elderly Black domestic worker who sees the truth and has survived real monsters): Elderly Black woman in her late sixties, small sturdy build, short gray hair under a headscarf, wearing a simple housedress, weathered hands, fierce clear eyes
- `slick` — Slick Paley (book club member — terrified of her husband finding out what they read, dies in hospital): White woman in her late thirties, slim build, highlighted blonde bob, wearing a pastel polo shirt and khaki shorts, tennis bracelet, country club suburban wife
- `grace` — Grace (book club member — called out by Mrs. Green for protecting herself but not the children of Six Mile): White woman in her early forties, stocky build, reddish-brown curly hair, wearing a cardigan over a blouse, reading glasses on a chain around her neck
- `everyman` — Everyman (generic stand-in for unnamed people, neighbors, children): Nondescript adult, neutral clothing, used when no specific character is on screen

## The icon test (most important)
Pick a `concept` only if a muted viewer seeing that icon WITHOUT the callout would guess the right
meaning. The icon's LITERAL reading must be the beat's claim — a metaphor the viewer has to decode
is read literally (Fahrenheit 451: chains for "numbness" read as "links", a medical cross for an
execution read as "healthcare", a coin for "the price we pay" read as "debt"). NEVER because a word
matches ("treating this TEXT as" is not a phone; "romance is the wrong reading" is not a heart).
What viewers actually read (measured in mute tests — data/icon-readings.json):
- medical: reads as healthcare, a hospital, being treated. NEVER for: an execution, a lethal injection, an injury while fleeing, an overdose handled coldly (read as benign care, F451 x3)
- phone: reads as a MODERN smartphone. NEVER for: any world before ~2000: 1950s TV walls, radios, telephones (read as smartphone anxiety, F451)
- family: reads as abstract geometric shapes (blind viewers do not see a family). NEVER for: caregiving, a household, relatives (Southern Book Club: read as a lamp and shadows)
- star: reads as a glowing decorative star. NEVER for: a character introduction or anything specific (read as nothing, F451)
- heart: reads as love, romance
- fire: reads as fire, burning. NEVER for: a job described as 'cleaning' unless the fire itself is the subject
- mask: reads as a false public face, pretending
- mirror: reads as self-image, reflection. NEVER for: appearance, looks or vanity, judging yourself against others (read as appearance-checking, the-courage-to-be-disliked readcheck #17 #109 #229)
- city: reads as a standing, intact city. NEVER for: a city being destroyed (it is drawn intact, F451)
- food: reads as a dinner plate with fork and knife, literal eating. NEVER for: a metaphor of consuming or enjoying anything else (read as dining, F451)
- coin: reads as literal cash on hand, plain endorsement of money. NEVER for: a vow about money, a doubt about money, or money-as-metaphor (die-with-zero readcheck: 2 misreads) — the attitude must come from the words and people, or the viewer reads endorsement
- door: reads as a way in or out, exclusion. NEVER for: 'no way out'
- puppeteer: reads as one person controlling others
- chains: reads as bound, imprisoned, controlled (drawn intact). NEVER for: numbness, stupefaction, silenced writers, surrender to technology, links or continuity (F451 holdout1+2: 4 misreads, read as 'links' / 'history')
- boulder: reads as a heavy burden sitting in the path. NEVER for: an internalized or reflective weight, or stress that comes from home/family (read as a burden others dumped on you, the-courage-to-be-disliked readcheck #283; also mutes a 'this weight is not yours' reveal, #1)
- crack: reads as an abstract orange branching line (blind viewers do NOT see a crack). NEVER for: cultural rot, conflict, a breakdown of society (F451 holdout2+3: described 3x as an abstract branching structure)
- clock: reads as time, a deadline. NEVER for: speed, environmental distortion, a lack of mental silence (read as literal schedule time, F451 x2)
- balance: reads as weighing two sides, fairness, justice. NEVER for: a critique, a reframing, a verdict on society (an empty tipped scale read as nothing, F451)
- shield: reads as protection
- trophy: reads as status, a prize. NEVER for: weakness
- hourglass: reads as time running out. NEVER for: an epidemic, a cost, a price paid (read as 'time passing', F451)
- target: reads as aiming at a goal, being targeted. NEVER for: where an idea came from, its origins (read as irrelevant, F451)
- gift: reads as a present, giving away
- inheritance: reads as a will, an estate, an heir
- casserole: reads as (SBC own icon) a black toaster-like appliance — redraw own icons as the silhouette a stranger names in one word
If nothing reads literally: `concept: null` and stage the PEOPLE doing the idea (face + body +
object) with a strong callout. A wrong icon is worse than none.
No single shared icon on more than 5% of the beats: an icon used for everything means nothing.

## This book's own icons (drawn for it — use them whenever the beat is ABOUT that thing)
- casserole: Casserole Dish — a covered baking dish with steam rising
- trueCrimeBook: True-Crime Paperback — a paperback book with a blood splatter on the cover
- snake: Snake — a coiled snake with its head raised

## How staging reads (measured in mute tests)
- worried + talk: reads as SHOCKED (open mouth) — never for suppressed anger or quiet worry; use worried + slump or think (SBC #166)
- neutral face in closeUp: carries nothing — a close-up needs a face that IS the claim (SBC #88/#179/#220)
- neutral + idle, no icon: an empty frame: only the callout speaks — stage the person DOING the idea or give an icon (SBC: 24 beats)
- cast order: the FIRST cast member is drawn as the lead — put the person the sentence is ABOUT first (SBC #59 showed Carter on "the women do not feel safe")
- happy on the antagonist: reads as a FRIENDLY man — the muted viewer does not know he is the villain. Show the threat: the victim worried, the villain neutral with a menacing icon or set; "happy" only when the narration says the smile is fake AND a second cue shows it (SBC run6 #2/#78/#108)
- physical states the rig cannot draw: there is NO lying, falling, fighting, biting or dying pose (actions: idle talk point celebrate slump think walk sit hold reach). "Lies paralyzed on the floor" drawn with standing people reads as nothing happening (SBC #189) — carry such moments with an icon/own icon, a set, or the survivor reacting
- crowd / multiple figures: the crowd shot repeats ONE person many times — viewers see ghost duplicates, never "a community"

## Negation, irony, fakery
When the narration says NOT / never / fake / scripted / pretend / hollow X, never stage X plainly
(F451: a warm embrace for "fake scripted validation" read as genuine warmth; a thoughtful face for
"he is NOT thinking about the ideas" read as valuing them). Stage the contrast instead: the empty
face beside the smiling screen, the forced smile (say so), the turned back.
Two people side by side must look clearly different (build, age, costume); two men in the same
uniform read as "identical men" — stage one of them.

## Staging the people (the picture must carry meaning, not only the text)
Put on screen the characters the sentence is ABOUT (not the host). Give them the face and body of the moment: grief -> sad + slump, fear -> worried, revelation -> surprised, a forced polite smile over pain -> happy (say so), accusing -> point, grasping -> reach, arriving/leaving -> walk. Give them the object they handle (letter, photo, key, cup).
Never happy over death or tragedy unless it is a fake smile.

## Callouts
2-5 words, the narrator's own concrete words from THIS beat; correct ASR spellings of names.
Every callout of 4+ words needs a function word (the/of/to/her/...), no keyword soup, max 7 words /
48 chars. `strike` = the narrator REJECTS the phrase; never for emphasis. No invented labels.
Every beat needs a callout OR a diagram OR an icon; pure banter ("Right.") may carry only staging.

## Diagrams (about 1 per 25 beats, only on structural beats)
flow = cause -> effect (2-3 labels, 1-2 words each, from the narration); sorter = 2-4 buckets;
spectrum = [left, right] + values[0..1]; matchWave = two rhythms syncing. A diagram beat has
concept null and callout null. Avoid bare template words as labels (DENIAL, CHANGE, GROWTH) — use
the narrator's phrase ("Family denial").

## Output
Return ONLY a JSON array for your chunk. Validate it parses and matches every `i`.
