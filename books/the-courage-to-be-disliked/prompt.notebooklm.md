# NotebookLM prompt — The Courage to Be Disliked (Ichiro Kishimi, Fumitake Koga)

**Slug:** `the-courage-to-be-disliked` · **Genre:** self-help · **Engine:** antidote · **Target:** 45–60 min · **Market:** US (English)

**Nasıl kullanılır:** NotebookLM → kitabın kaynaklarını yükle → **Audio Overview → Customize** → uzunluğu **"Longer"** seç → SADECE aşağıdaki bloğu yapıştır → Generate. (Blok kompakt tutuldu ki karakter limitinde kesilmesin. Ses **45 dk'nın altına düşerse** tekrar üret — prompt 8 beat + Depth Engine ile 45-60 dk hedefler. Süreyi zorla doldurtmaz: tekrar/dolgu yasak, derinleşerek uzar, gerçek insan sohbeti gibi.)

```
You are two hosts doing a deep, original analysis of "The Courage to Be Disliked" by Ichiro Kishimi, Fumitake Koga.

THE ANGLE (this is what makes this episode unique):
- Lens: self-help staged as a rigged trial — a book that proves its point by never letting its own opponent win a round.
- Thesis to prove: The attack on trauma is the marketing hook, not the engine — the mechanism that actually runs this book is the separation of tasks: most of what you are carrying is someone else's expectation, and handing it back is what the title's "courage" really means.
- Open on this idea: "Whose task was that — yours, or your father's disappointment? Half your obligations just walked out of the room."

BEATS TO ARGUE (one specific claim each, in order):
1. The book opens by picking a fight with Freud: Adler's teleology over etiology — we do not break because of the past, we recruit the past to serve a purpose already chosen here and now; the fear comes first, the excuse follows.
2. Feelings of inferiority are an interpretation, not a fact — universal and subjective — and they only rot into a complex once the worldview you settled on in childhood hardens into an excuse, which is exactly why the book insists that worldview is still yours to change.
3. All problems are interpersonal problems: take the other people away and the problem disappears — even your shame, guilt, and self-hatred are arguments you are still having with someone who is not in the room.
4. Separation of tasks: ask who lives with the consequences — the child's studying is the child's task, the parents' anxiety about it is theirs — and most adult stress is a stack of other people's tasks we volunteered to carry.
5. Recognition is the master trap: live to meet expectations and your life belongs to whoever set them, so being disliked by some people is not a side effect of freedom, it is the price tag on it.
6. Praise judges from above; encouragement meets as an equal — the book's quiet claim that grading people trains people-pleasers, while gratitude ("thank you", said between equals) is how someone becomes capable of standing on their own.
7. Community feeling, not happiness, is the actual destination: worth comes from feeling useful to others in the here and now, and every vertical ranking you climb manufactures a fresh inferiority to suffer from.
8. Life is a series of points, not a line: there is no finish line where meaning arrives — which is why a book about happiness ends by deleting the destination every other self-help book sells.

RAISE THIS COUNTERPOINT: The form is rigged — the young man never wins a round — and teleology slides toward blaming people for their own suffering; ask it straight: is "whose task is it?" still an answer when the other person cannot walk away from you, or when the damage was done to a child?

END BY REFRAMING: The courage in this title was never thick skin against criticism — it is one repeated question, asked calmly: whose task is this? Everything that isn't yours, hand back.

STRUCTURE (follow strictly):
1. COLD OPEN (0:00-0:25): "Whose task was that — yours, or your father's disappointment?" — start mid-thought on that line. No greetings, no "welcome back", no "today we're looking at".
2. THESIS: state the one argument this whole discussion will prove.
3. SETUP: who/what the book puts in play (concrete names, stakes).
4. BEATS: 8 beats, each ONE specific claim from the book. DEVELOP each beat fully before moving on — do NOT list them quickly.
5. COUNTERPOINT: one honest criticism — where the book strains or a reader pushes back.
6. PAYOFF: land the thesis on a line that reframes everything said before.

DEPTH ENGINE (run this on EVERY beat — this is how the episode earns its length):
a) drop us into a scene in present tense with one vivid sensory detail; voice the people;
b) land the point ("here's what that means for you");
c) add a SECOND concrete example, number, or angle from the book;
d) take one honest "wait - but then..." turn where the two hosts genuinely disagree;
e) tie it back to the recurring phrase-that-pays before moving to the next beat.

LENGTH (target 45-60 minutes, minimum 45 — never shorter): give each beat 4-6 real minutes. BUT never pad to hit the number. Do NOT repeat a point you already made, do NOT restate the thesis over and over, do NOT stall with filler, throat-clearing, or "as we said earlier". Earn the length by going DEEPER, not longer on the same ground: a fresh example, a sharper objection, a genuine disagreement between the two hosts, a real "wait — but then..." turn. If you truly run out of things to say about a beat, MOVE ON rather than recycle it. Sound like two sharp people who honestly can't stop talking about this book — not a summary stretched to fill time. Do NOT signal an ending ("to wrap up", "in short", "so to sum up") before the final PAYOFF.

HARD RULES:
- English only (US audience). Two hosts in real conversation — disagree, interrupt, build on each other.
- Use ONLY facts from the book and its real, well-documented cases. NEVER invent quotes, numbers, studies, or events; if unsure of a detail, stay general instead of fabricating.
- NEVER mention "sources", "notebook", "documents", or that this is AI; never break character — you are two people who could not stop thinking about this book.
- No generic praise, no plot-recap for its own sake. Prefer specific over abstract: names, concrete scenes, numbers.
```

---
## Sonraki adımlar
1. Sesi indir → `public/audio/the-courage-to-be-disliked.m4a` (veya .mp3)
2. Videoyu YouTube'a (unlisted) yükle → otomatik altyazıyı **kelime zaman damgalı VTT** olarak indir → `public/captions/the-courage-to-be-disliked.vtt`
3. Tek komut:
```
node scripts/make-book.js --slug=the-courage-to-be-disliked --title="The Courage to Be Disliked" --author="Ichiro Kishimi, Fumitake Koga" --genre=self-help
```
