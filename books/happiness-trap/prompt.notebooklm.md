# NotebookLM prompt — The Happiness Trap (Russ Harris)

**Slug:** `happiness-trap` · **Genre:** psychology · **Target:** 35–45 min · **Market:** US (English) · **Compact:** fits NotebookLM's Customize character limit.

**How to use:** NotebookLM → upload the book's sources → **Audio Overview → Customize** → paste ONLY the block below → Generate.

```
Two hosts. A 35-45 minute deep, original analysis of "The Happiness Trap" by Russ Harris. English only, natural US conversation - argue, interrupt, build on each other, think out loud.

ANGLE (do NOT drift into a generic list of self-help tips): Thesis to prove - the pursuit of happiness is itself the trap. Everything we're taught to do about painful feelings - fight them, fix them, distract from them, think positive - is exactly what tightens the noose. The recurring blade: you can't control how you FEEL nearly as much as you think, but you can control what you DO, and the exit is to stop struggling and make room for the feeling while you move toward what matters. This is ACT (acceptance and commitment therapy), not positive thinking - name that difference early and defend it.

PHRASE-THAT-PAYS (recur ~4x): "The struggle is the trap."

COLD OPEN (0:00-0:25, mid-thought, no greeting): "You step in quicksand. Every instinct screams THRASH - kick, grab, fight your way out. And that instinct is exactly what pulls you under and kills you. The only way to survive is to do the one thing that feels insane: stop fighting, lie back, spread out. Russ Harris says your anxiety works exactly the same way."

BEATS (3-6 min each; one claim + one real idea/metaphor from the book; drop into the scene in present tense, one sensory detail, voice the feeling, THEN land it):
1. The Struggle Switch: when it's ON, you get anxious about your anxiety, angry about your anger - a clean layer of pain becomes a dirty spiral. The struggle, not the feeling, is the trap.
2. Why happiness is the trap: the mind is a Stone Age "don't-get-killed" device - built to compare, criticize, catastrophize, never be satisfied. A normal healthy mind manufactures suffering; you are not broken.
3. The control agenda fails: try NOT to think of a white bear, or fall asleep by trying harder - suppression backfires. Pushing feelings away is like holding a beach ball underwater; it just resurfaces harder.
4. Defusion - a thought is just words passing through. "I'm having the thought that I'm a failure," or sing it to Happy Birthday, or "thanks, mind." You don't have to believe the story to hear it.
5. Expansion/acceptance - the tug-of-war with the anxiety monster. As long as you pull, you're stuck at the pit; the move isn't to win, it's to drop the rope and make room for the feeling.
6. The observing self and the present moment: you are the sky, your feelings are the weather. Storms rage, the sky is never harmed - and life only ever happens now, not in the mind's replay.
7. Values are a compass, not a goal: goals can be finished or failed, values are a direction you can always steer by. What do you want to STAND for while you're scared?
8. Committed action and willingness: it's the "passengers on the bus" - the fears keep shouting, you keep driving toward what matters, carrying them along instead of pulling over to fight.

COUNTERPOINT (be honest): "just accept your pain" sounds like giving up, or like passive resignation - and Harris admits ACT will NOT make bad feelings vanish; that's the whole point, and it's a hard sell in a fix-it culture. Sit in that: acceptance is not resignation, it's making room so you can act.

CLOSER (reframe): happiness was never the good feeling - redefine it as a rich, full, meaningful life, painful emotions and all. The struggle is the trap; willingness is the way out.

HARD RULES: English only. Use ONLY facts, metaphors, and real ideas from the book - never invent quotes, numbers, studies, or events; if unsure of a detail, stay general instead of fabricating. Never mention "sources", "notebook", "documents", or that this is AI; never break character - you are two people who could not stop thinking about this book. No greetings, no plot-recap, no generic praise. Target 35-45 minutes; go deep, do not wrap early.
```

---
## Next steps (pipeline)
1. Generate the audio in NotebookLM → save as `public/audio/happiness-trap.m4a` (or `.mp3`).
2. Upload to YouTube (unlisted) → download word-timestamped VTT → `public/captions/happiness-trap.vtt`.
3. Build the Vox video:
```
node scripts/make-book.js --slug=happiness-trap --title="The Happiness Trap" --author="Russ Harris" --genre=psychology
```
