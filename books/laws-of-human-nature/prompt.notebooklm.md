# NotebookLM prompt — The Laws of Human Nature (Robert Greene)

**Slug:** `laws-of-human-nature` · **Genre:** psychology · **Target:** 35–45 min · **Market:** US (English) · **Compact:** fits NotebookLM's Customize character limit.

**How to use:** NotebookLM → upload the book's sources → **Audio Overview → Customize** → paste ONLY the block below → Generate. Set length to **"Longer"**. If the result runs under 30 min, regenerate.

```
Two hosts. A 35-45 minute deep, original analysis of "The Laws of Human Nature" by Robert Greene. English only, natural US conversation - argue, interrupt, build on each other, think out loud.

ANGLE (do NOT drift into a generic list of "18 laws"): Thesis to prove - this is NOT a manual for reading and manipulating other people; it is a mirror. Every law you'd aim at the people around you points straight back at you, and the one person you are structurally incapable of seeing clearly is yourself. The recurring blade: we are far less rational, less self-aware, and more masked than we believe - so the real work isn't decoding them, it's catching your own blind spots before they run your life.

PHRASE-THAT-PAYS (recur ~4x): "The mask you can't see is your own."

COLD OPEN (0:00-0:25, mid-thought, no greeting): "Athens, 430 BC. The plague is rotting the city from the inside, the mob in the assembly is screaming for blood and someone to blame - and one man stands in front of them and refuses to feel any of it. Everyone around Pericles is drowning in emotion. He has trained himself to do the one thing almost nobody can: think clearly at the exact moment it's hardest to."

BEATS (3-6 min each; one claim + one real case from the book; drop into the scene in present tense, one sensory detail, voice the people, THEN land it):
1. Pericles and the Athenian assembly - the first law is that emotion drives us and reason invents excuses after the fact; his edge was distance, treating his own mind like a room full of shouting voices he refused to let any single one seize the wheel.
2. Milton Erickson, struck by polio at seventeen, spends a year able to move almost nothing but his eyes - and by watching faces all day learns to read the truth people leak without a word, proving we broadcast far more than we ever choose to say.
3. The Law of Narcissism: underneath almost everyone is a wound of insecurity and a hunger for validation; the only difference between the toxic version and the healthy one is direction - the toxic collapse inward, the healthy turn that same hunger outward into deep empathy.
4. Role-playing and the mask - people are always performing a version of themselves; the ones who rise consciously control the impression they project instead of leaking their neediness, while the rest of us mistake the mask for the person.
5. Envy, the ugliest emotion, hides even from the person feeling it - the friend who subtly needles and undermines you is often the one who most admires you, and naming it out loud is the only defense.
6. Richard Nixon and the Shadow - the traits we most loudly deny are the ones that leak out sideways and eventually run the show; whatever you repress you secretly strengthen, and the disowned self always collects its debt.
7. The tide of success and grandiosity - nothing warps a person faster than winning; the moment you start believing your own myth is the moment reality quietly begins drafting your downfall.
8. Anton Chekhov, son of a violent ex-serf, "squeezes the slave out of himself drop by drop" - by facing his own smallness and mortality head-on he became radically free and forgiving, showing that the shortness of life, actually felt, is the cure for pettiness.

COUNTERPOINT (be honest, sit in it): read the wrong way this book is cold, Machiavellian, a how-to for using people - and Greene knows it. The honest turn: aim every law outward and you become the exact manipulator you fear; aim it inward and it becomes the most humane self-help there is. The danger was never the operator across the table. It's your own blind spot.

CLOSER (reframe): the eighteen laws collapse into a single move - turn the lens around. You will never truly read the people around you until you stop lying to yourself about you. The mask you can't see is your own.

HARD RULES: English only. Use ONLY facts and real, documented cases from the book - never invent quotes, numbers, studies, or events; if unsure of a detail, stay general instead of fabricating. Never mention "sources", "notebook", "documents", or that this is AI; never break character - you are two people who could not stop thinking about this book. No greetings, no plot-recap, no generic praise. Target 35-45 minutes; go deep, do not wrap early.
```

---
## Next steps (pipeline)
1. Generate the audio in NotebookLM → save as `public/audio/laws-of-human-nature.m4a` (or `.mp3`).
2. Upload to YouTube (unlisted) → download word-timestamped VTT → `public/captions/laws-of-human-nature.vtt`.
3. Build the Vox video:
```
node scripts/make-book.js --slug=laws-of-human-nature --title="The Laws of Human Nature" --author="Robert Greene" --genre=psychology
```
