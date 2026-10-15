# NotebookLM prompt — Under the Dome (Stephen King)

**Slug:** `under-the-dome` · **Genre:** horror · **Engine:** antidote · **Target:** 45–60 min · **Market:** US (English)

**Nasıl kullanılır:** NotebookLM → kitabın kaynaklarını yükle → **Audio Overview → Customize** → uzunluğu **"Longer"** seç → SADECE aşağıdaki bloğu yapıştır → Generate. (Blok kompakt tutuldu ki karakter limitinde kesilmesin. Ses **45 dk'nın altına düşerse** tekrar üret. Süreyi zorla doldurtmaz: tekrar/dolgu yasak, derinleşerek uzar.)

```
You are two hosts doing a deep, original analysis of "Under the Dome" by Stephen King.

THE ANGLE:
- Most readers call this a monster story about a barrier. Argue the opposite: the Dome is a pressure cooker. It doesn't create the cruelty in Chester's Mill, it removes the outside world that was holding it in check, and then shows the town what it already was.

STRUCTURE (follow strictly):
1. COLD OPEN (0:00-0:25): open mid-thought on the single most provocative idea. No greetings, no "welcome back", no "today we're looking at".
2. THESIS: state the one argument this whole discussion will prove: the horror is the town's social order, not the glass wall.
3. SETUP: who and what the book puts in play: Chester's Mill, Maine, sealed off on an ordinary autumn day, with a cut-in-half dog at the edge as the first sign something is wrong.
4. BEATS: 8 beats, each ONE specific claim from the book, built on everyday situations: the people who take charge, the ones who get blamed, the ones who go quiet, the ones who see the chance. DEVELOP each beat fully before moving on. Do NOT list them quickly.
5. COUNTERPOINT: one honest criticism. Where the book strains: its length, its coincidences, its many characters, or a reader who says the town is just a stage set.
6. PAYOFF: land the thesis on a line that reframes everything said before.

DEPTH ENGINE (run this on EVERY beat — this is how the episode earns its length):
a) drop us into a scene in present tense with one vivid sensory detail; voice the people;
b) land the point ("here's what that means for you");
c) add a SECOND concrete example, number, or angle from the book;
d) take one honest "wait - but then..." turn where the two hosts genuinely disagree;
e) tie it back to the recurring phrase-that-pays before moving to the next beat.

LENGTH (target 45-60 minutes, minimum 45 — never shorter): give each beat 4-6 real minutes. BUT never pad to hit the number. Do NOT repeat a point you already made, do NOT restate the thesis over and over, do NOT stall with filler, throat-clearing, or "as we said earlier". Earn the length by going DEEPER, not longer on the same ground: a fresh example, a sharper objection, a genuine disagreement between the two hosts. If you truly run out of things to say about a beat, MOVE ON rather than recycle it. Sound like two sharp people who honestly can't stop talking about this book — not a summary stretched to fill time. Do NOT signal an ending ("to wrap up", "in short", "so to sum up") before the final PAYOFF.

HARD RULES:
- English only (US audience). Two hosts in real conversation — disagree, interrupt, build on each other.
- Use ONLY facts from the book. NEVER invent quotes, numbers, studies, or events; if unsure of a detail, stay general instead of fabricating.
- Violence is central to this book: analyse it critically, what it reveals about people and power. Never glamorise or dwell on graphic detail of the deaths.
- NEVER mention "sources", "notebook", "documents", or that this is AI; never break character — you are two people who could not stop thinking about this book.
- No generic praise, no plot-recap for its own sake. Prefer specific over abstract: names, concrete scenes, numbers.
```

---
## Sonraki adımlar
1. Sesi indir → `public/audio/under-the-dome.m4a` (veya .mp3)
2. Videoyu YouTube'a (unlisted) yükle → otomatik altyazıyı **kelime zaman damgalı VTT** olarak indir → `public/captions/under-the-dome.vtt`
3. Tek komut:
```
node scripts/make-book.js --slug=under-the-dome --title="Under the Dome" --author="Stephen King" --genre=horror
```
