# NotebookLM prompt — Deep Work (Cal Newport)

**Slug:** `deep-work` · **Genre:** nonfiction · **Engine:** antidote · **Target:** 45–60 min · **Market:** US (English)

**Nasıl kullanılır:** NotebookLM → kitabın kaynaklarını yükle → **Audio Overview → Customize** → uzunluğu **"Longer"** seç → SADECE aşağıdaki bloğu yapıştır → Generate. (Blok kompakt tutuldu ki karakter limitinde kesilmesin. Ses **45 dk'nın altına düşerse** tekrar üret — prompt 8 beat + Depth Engine ile 45-60 dk hedefler. Süreyi zorla doldurtmaz: tekrar/dolgu yasak, derinleşerek uzar, gerçek insan sohbeti gibi.)

```
You are two hosts doing a deep, original analysis of "Deep Work" by Cal Newport.

THE ANGLE:
Deep Work is not a productivity handbook about clearing inboxes; it is an economic and cognitive manifesto arguing that institutional distraction destroys the human capacity for high-value thought.

STRUCTURE (follow strictly):
1. COLD OPEN (0:00-0:25): open mid-thought: "The terrifying truth Newport proves isn't that social media distracts us; it's that knowledge work has spent thirty years confusing frantic network connectivity with actual economic value." No greetings, no throat-clearing.
2. THESIS: The ability to perform deep work is rapidly becoming the ultimate superpower in the modern economy—precisely as corporate infrastructure systematically destroys it.
3. SETUP: Contrast the frantic open-office knowledge worker trapped in Slack triage against Carl Jung building Bollingen Tower to write foundational psychology. Stakes: master deep focus or become cognitively replaceable.
4. BEATS (develop each fully before moving on):
   - Beat 1: The Deep Work Hypothesis and New Economic Winners. Superstars, high-skilled workers, and owners thrive; shallow workers face obsolescence.
   - Beat 2: Principle of Least Resistance and Busyness as Proxy for Productivity. Without clear output metrics, office culture defaults to visible busyness.
   - Beat 3: Attention Residue and the Multitasking Myth. Sophie Leroy's research reveals even a 10-second glance at an inbox leaves residue that impairs cognition for 20 minutes.
   - Beat 4: The Four Depth Philosophies. Analyzing Monastic (Knuth), Bimodal (Jung), Rhythmic (daily time-blocking), and Journalistic scheduling.
   - Beat 5: Ritualize and Execute like a Business. The 4DX framework applied to focus: wildly important goals, lead measures, scoreboards, and accountability.
   - Beat 6: Don't Take Breaks from Distraction—Take Breaks from Focus. Clifford Nass's research: mental multitasking rewires the brain. Schedule internet blocks and embrace boredom.
   - Beat 7: Quit Social Media (The Craftsman Approach). Reject the Any-Benefit Mindset. A tool must offer substantial positive impacts outweighing cognitive costs.
   - Beat 8: Drain the Shallows and Fixed-Schedule Productivity. The 5:30 PM hard shutdown ritual forces aggressive prioritization and exposes shallow fluff.
5. COUNTERPOINT: Newport's prescriptions carry an elite bias: tenured professors or solo coders can shut doors, but junior or client-facing staff risk being fired.
6. PAYOFF: Deep work is an existential reclamation. A life lived in sustained focus is not just more productive; it is a richer, more meaningful life.

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
1. Sesi **MP3** olarak indir → `public/audio/deep-work.mp3` (.m4a da çalışır, ama uzun bir kitapta GitHub'ın 100 MB dosya sınırını aşabilir; o zaman render worker'ları reddeder)
2. Videoyu YouTube'a (unlisted) yükle → otomatik altyazıyı **kelime zaman damgalı VTT** olarak indir → `public/captions/deep-work.vtt`
3. Bu oturumda yaz: **"dosyalar hazır, preview hazırla"** (skill `preview-hazirla`: kitabın kendi worktree'si, storyboard, kapılar, kör sessiz test). Final render ayrı, operatör onaylı bir adım.
