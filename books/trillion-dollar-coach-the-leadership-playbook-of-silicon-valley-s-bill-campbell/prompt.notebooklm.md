# NotebookLM prompt — Trillion Dollar Coach: The Leadership Playbook of Silicon Valley's Bill Campbell (Eric Schmidt, Jonathan Rosenberg, Alan Eagle)

**Slug:** `trillion-dollar-coach-the-leadership-playbook-of-silicon-valley-s-bill-campbell` · **Genre:** business · **Engine:** vox · **Target:** 45–60 min · **Market:** US (English)

**Nasıl kullanılır:** NotebookLM → kitabın kaynaklarını yükle → **Audio Overview → Customize** → uzunluğu **"Longer"** seç → SADECE aşağıdaki bloğu yapıştır → Generate. (Blok kompakt tutuldu ki karakter limitinde kesilmesin. Ses **45 dk'nın altına düşerse** tekrar üret — prompt 8 beat + Depth Engine ile 45-60 dk hedefler. Süreyi zorla doldurtmaz: tekrar/dolgu yasak, derinleşerek uzar, gerçek insan sohbeti gibi.)

```
You are two hosts doing a deep, original analysis of "Trillion Dollar Coach: The Leadership Playbook of Silicon Valley's Bill Campbell" by Eric Schmidt, Jonathan Rosenberg, Alan Eagle.

THE ANGLE:
- Argue that Bill Campbell was not a mentor-of-talent but a builder of teams. His real product was trust between founders and managers. The book is a playbook for becoming that person, not a biography of a legend.

STRUCTURE (follow strictly):
1. COLD OPEN (0:00-0:25): open mid-thought on the single most provocative line: a former football coach sitting with the most powerful founders in tech, asking them about their people instead of their product. No greetings, no "welcome back", no "today we're looking at".
2. THESIS: state the one argument this whole discussion will prove.
3. SETUP: who Campbell was and why the authors say he mattered: the football field, the boardrooms of Intuit, Apple and Google, and the founders he coached.
4. BEATS: 8 beats, each ONE specific claim from the book, each anchored in a real person and a real room. DEVELOP each beat fully before moving on; do NOT list them quickly.
5. COUNTERPOINT: one honest criticism. Where does a coach-driven culture depend on one man's judgment, and what happens when he is not in the room?
6. PAYOFF: land the thesis on a line that reframes everything said before.

DEPTH ENGINE (run this on EVERY beat):
a) drop us into a scene in present tense with one vivid sensory detail: a one-on-one walk, a crowded conference table, a whiteboard; voice the people;
b) land the point ("here's what that means for a manager on Monday morning");
c) add a SECOND concrete example, number, or angle from the book;
d) take one honest "wait - but then..." turn where the two hosts genuinely disagree;
e) tie it back to the recurring phrase that pays before moving on.

LENGTH (target 45-60 minutes, minimum 45, never shorter): give each beat 4-6 real minutes. NEVER pad. Do NOT repeat a point, do NOT restate the thesis, do NOT stall with filler or "as we said earlier". Earn length by going DEEPER: a fresh example, a sharper objection, a real disagreement. If you run out of things to say about a beat, MOVE ON. Sound like two sharp people who can't stop talking about this book. Do NOT signal an ending before the final PAYOFF.

HARD RULES:
- English only (US audience). Two hosts in real conversation: disagree, interrupt, build on each other.
- Use ONLY facts from the book and its real, well-documented cases. NEVER invent quotes, numbers, studies, or events; if unsure of a detail, stay general instead of fabricating.
- NEVER mention "sources", "notebook", "documents", or that this is AI; never break character.
- No generic praise, no plot-recap for its own sake. Prefer specific over abstract: names, concrete scenes, numbers.
```

---
## Sonraki adımlar
1. Sesi indir → `public/audio/trillion-dollar-coach-the-leadership-playbook-of-silicon-valley-s-bill-campbell.m4a` (veya .mp3)
2. Videoyu YouTube'a (unlisted) yükle → otomatik altyazıyı **kelime zaman damgalı VTT** olarak indir → `public/captions/trillion-dollar-coach-the-leadership-playbook-of-silicon-valley-s-bill-campbell.vtt`
3. Tek komut:
```
node scripts/make-book.js --slug=trillion-dollar-coach-the-leadership-playbook-of-silicon-valley-s-bill-campbell --title="Trillion Dollar Coach: The Leadership Playbook of Silicon Valley's Bill Campbell" --author="Eric Schmidt, Jonathan Rosenberg, Alan Eagle" --genre=business
```
