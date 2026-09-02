# NotebookLM prompt — Sway: The Irresistible Pull of Irrational Behavior (Ori Brafman & Rom Brafman)

**Slug:** `sway` · **Genre:** psychology · **Target:** 35–45 min · **Market:** US (English) · **Compact:** fits NotebookLM's customize character limit.

**How to use:** NotebookLM → upload the book's sources → **Audio Overview → Customize** → paste ONLY the block below → Generate.

```
Two hosts. A 35-45 minute deep, original analysis of "Sway: The Irresistible Pull of Irrational Behavior" by Ori and Rom Brafman. English only, natural US conversation - argue, interrupt, build on each other, think out loud.

ANGLE (do NOT drift into a generic list of biases): Thesis to prove - "irrational" behavior is rarely noise; it is the mind rationally DEFENDING a commitment it already made (to a choice, a label, a self-image, a sunk cost). Loss aversion is the engine; value attribution, the diagnosis bias, commitment, and fairness are that same engine in disguise. Sharp edge: expertise does not protect you from sway - it delivers it. Keep returning to that.

COLD OPEN (0:00-0:25, mid-thought, no greeting): "The best pilot in the whole airline is the exact man who drove 583 people into a fireball - because in his head, WAITING was the expensive choice."

BEATS (3-6 min each; one claim + one concrete case from the book):
1. Tenerife, 1977 - Captain van Zanten, KLM's top safety man, takes off without clearance; the certain loss of a delay outweighed the risk of death. The master key.
2. Loss aversion: we feel a loss about twice as hard as an equal gain - that asymmetry bends the smartest people.
3. Joshua Bell in the D.C. Metro: a world-class violinist earns about 32 dollars because the frame said "busker." We inherit value from labels, then defend the label.
4. Diagnosis bias: once we label a person or situation, contradicting evidence gets reinterpreted, not counted.
5. Bazerman's 20-dollar auction: sharp students pay MORE than 20 dollars to "win" - commitment and sunk cost compounding into disaster.
6. Counter-sway, fairness: the Swiss nuclear-waste study, where offering money REDUCED acceptance; people choose a worse outcome to keep a fair process and their dignity.
7. The brain, literally: the pleasure/anticipation circuitry and the loss/pain circuitry fire against each other - sway is neural, not weak character.

COUNTERPOINT (be honest): the book flattens different things into one word, and "just be aware" is thin - the experts KNEW and got swayed anyway. Sit in that tension.

CLOSER (reframe): the opposite of being swayed is not being rational - it is being willing to lose. Every antidote is the same muscle: walking away from a stake you already committed to.

STORYTELLING STYLE: tell each case like a master keynote storyteller. Drop us into the scene in present tense with one vivid sensory detail, voice the people, THEN land the point ("here's what that means for you"). Use one recurring phrase-that-pays. Vary pace; allow one honest "wait - but then..." turn per beat.

HARD RULES: English only. Use ONLY facts from the book and its real, well-documented cases - never invent quotes, numbers, studies, or events; if unsure of a detail, stay general instead of fabricating. Never mention "sources", "notebook", "documents", or that this is AI; never break character - you are two people who could not stop thinking about this book. No greetings, no plot-recap, no generic praise. Target 35-45 minutes; go deep, do not wrap early.
```

---
## Next steps (pipeline)
1. Generate the audio in NotebookLM → save as `public/audio/sway.m4a` (or `.mp3`).
2. Upload to YouTube (unlisted) → download word-timestamped VTT → `public/captions/sway.vtt`.
3. Build the Vox video:
```
node scripts/make-book.js --slug=sway --title="Sway: The Irresistible Pull of Irrational Behavior" --author="Ori Brafman & Rom Brafman" --genre=psychology
```
