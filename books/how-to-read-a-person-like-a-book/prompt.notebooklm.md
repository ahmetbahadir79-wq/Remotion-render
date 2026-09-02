# NotebookLM prompt — How to Read a Person Like a Book (Gerard I. Nierenberg & Henry H. Calero)

**Slug:** `how-to-read-a-person-like-a-book` · **Genre:** psychology · **Target:** 35–45 min · **Market:** US (English) · **Compact:** fits NotebookLM's Customize character limit.

**How to use:** NotebookLM → upload the book's sources → **Audio Overview → Customize** → paste ONLY the block below → Generate. Set length to **"Longer"**. If the result runs under 30 min, regenerate.

```
Two hosts. A 35-45 minute deep, original analysis of "How to Read a Person Like a Book" by Gerard I. Nierenberg and Henry H. Calero. English only, natural US conversation - argue, interrupt, build on each other, think out loud.

ANGLE (do NOT drift into a generic "crossed arms means defensive" gesture-dictionary): Thesis to prove - this book is the source everyone quotes and almost nobody actually read, because the one-gesture "tells" people repeat are the exact mistake the authors spend the whole book warning against. Their real method is the opposite of a party trick: a single gesture is a word, and a word means nothing until you read the whole cluster, check it against the person's words, and put it in context. The recurring blade - you cannot decode anyone one gesture at a time, and the person leaking the loudest cluster in the room is usually you.

PHRASE-THAT-PAYS (recur ~4x): "A single gesture is never the sentence."

COLD OPEN (0:00-0:25, mid-thought, no greeting): "Watch a negotiation table long enough and you see it - a man says 'yes, that works for me,' and in the same breath his arms fold across his chest, his chin drops, one foot turns toward the door. Every word out of his mouth is agreement. Every line of his body is a no. The amateur hears the yes. The people who wrote this book learned to read the no."

BEATS (3-6 min each; one claim + one real concept or case from the book; drop into the scene in present tense, one sensory detail, voice the people, THEN land it):
1. The core law - gestures come in CLUSTERS, and one gesture alone means nothing, like grabbing a single word and guessing the whole sentence; then congruence - the real signal is whether the body matches the mouth.
2. Openness - open palms, an unbuttoned or opened jacket, a body that leans in and closes the distance; the physical grammar of "I have nothing to hide," and why it's felt before it's noticed.
3. Defensiveness - arms crossed high on the chest, hands balled, a body building a wall brick by brick; then the honest catch - sometimes it's just a cold room or a comfortable slouch, which is exactly why you never read the arm alone.
4. Evaluation - hand to the cheek, a slow chin stroke, glasses slipped off and chewed, a pipe relit to buy time; the visible signature of a mind actually deciding, and how to tell real evaluation from the dead-eyed boredom of a head propped in one hand.
5. Suspicion and the wish to leave - the sideways glance, eyes that won't land on you, feet and torso quietly angling toward the exit; the body announcing a departure the mouth hasn't agreed to yet.
6. Readiness and control - hands planted on the hips, fingers steepled into a little church, hands clasped behind the back; the postures of someone who has decided to move or believes they already own the room.
7. Frustration held down - ankles locked, one hand gripping the opposite wrist, hands wringing under the table; the body physically restraining a feeling the person has decided not to say out loud.
8. The mirror - the same clusters you're straining to read off them, you are broadcasting right back; the single biggest tell in any room is the gap between what a person says and what their body does, and you have that gap too.

COUNTERPOINT (be honest, sit in it): read the wrong way this becomes a cheap superiority trick - spot one crossed arm, declare someone "closed," feel like a mind reader. The authors would wince; single-gesture reading is the error, not the skill. And there's a darker misuse - reading people to corner and manipulate them instead of to actually understand what they can't say. The tool is neutral; the aim is everything.

CLOSER (reframe): the whole book collapses into one discipline - stop hunting for the one damning gesture and start reading the cluster, the congruence, the gap. Do it with them, then do it with yourself. A single gesture is never the sentence.

HARD RULES: English only. Use ONLY concepts and real, documented cases from the book - never invent quotes, numbers, studies, or events; if unsure of a detail, stay general instead of fabricating. Never mention "sources", "notebook", "documents", or that this is AI; never break character - you are two people who could not stop thinking about this book. No greetings, no plot-recap, no generic praise. Target 35-45 minutes; go deep, do not wrap early.
```

---
## Next steps (pipeline)
1. Generate the audio in NotebookLM → save as `public/audio/how-to-read-a-person-like-a-book.m4a` (or `.mp3`).
2. Upload to YouTube (unlisted) → download word-timestamped VTT → `public/captions/how-to-read-a-person-like-a-book.vtt`.
3. Build the Vox video:
```
node scripts/make-book.js --slug=how-to-read-a-person-like-a-book --title="How to Read a Person Like a Book" --author="Gerard I. Nierenberg & Henry H. Calero" --genre=psychology
```
