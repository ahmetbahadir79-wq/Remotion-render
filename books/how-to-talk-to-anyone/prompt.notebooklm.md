# NotebookLM prompt — How to Talk to Anyone (Leil Lowndes)

**Slug:** `how-to-talk-to-anyone` · **Genre:** self-help · **Engine:** antidote · **Target:** 45–60 min · **Market:** US (English)

**Nasıl kullanılır:** NotebookLM → kitabın kaynaklarını yükle → **Audio Overview → Customize** → uzunluğu **"Longer"** seç → SADECE aşağıdaki bloğu yapıştır → Generate. (Blok kompakt tutuldu ki karakter limitinde kesilmesin. Ses **45 dk'nın altına düşerse** tekrar üret — prompt 8 beat + Depth Engine ile 45-60 dk hedefler. Süreyi zorla doldurtmaz: tekrar/dolgu yasak, derinleşerek uzar, gerçek insan sohbeti gibi.)

```
You are two hosts doing a deep, original analysis of "How to Talk to Anyone" by Leil Lowndes.

THE ANGLE:
- Prove that Lowndes's 92 techniques are not cynical manipulation tricks, but an anatomical defense manual for social vulnerability—revealing that charisma is merely the deliberate choreography of making the other person feel emotionally safe.

STRUCTURE (follow strictly):
1. COLD OPEN (0:00-0:25): "The moment you flash an instant, automatic grin at someone the second you make eye contact, you haven't signaled warmth—you've signaled that your smile is cheap, reflexive currency distributed to anyone standing in your peripheral vision."
2. THESIS: Charisma is not an innate extrovert gift; it is micro-calibration—every social interaction is won or lost in the nonverbal margins before logical conversation even begins.
3. SETUP: Lowndes positions the socially anxious striver against the effortlessly charming "Big Winners," dissecting everyday high-stakes arenas—cocktail mixers, awkward boardroom introductions, and casual hallway encounters where reputation is cemented in three seconds.
4. BEATS:
   - Beat 1: The Flooding Smile & Sticky Eyes: Delaying a smile by one second while maintaining intense eye contact creates an undeniable perception of bespoke sincerity over robotic pleasantry.
   - Beat 2: The Big Baby Pivot & Epaulet Posture: Orienting the entire torso toward an interlocutor immediately satisfies primitive tribal needs for total safety and undivided status acknowledgment.
   - Beat 3: Mood Match & Parroting: Pacing another person's emotional velocity and echoing their last two or three words builds subconscious rapport without inventing hollow small-talk topics.
   - Beat 4: Never Naked City & The Whatzit: Eliminating single-word answers about origins or professions turns static resumes into conversational trampolines that rescue encounters from awkward silence.
   - Beat 5: Scramble Therapy & The Commu-niche: Stepping into unfamiliar subcultures and mastering their core vernacular converts an outsider into an immediate insider across disparate social circles.
   - Beat 6: The Grapevine Glory & Killer Compliment: Delivering praise through third-party intermediaries bypasses natural human cynicism, giving compliments triple the impact of direct flattery.
   - Beat 7: Broken Record & Clearing the Room: Deflecting intrusive queries through calm, identical repetition protects personal boundaries without triggering defensive workplace escalations.
   - Beat 8: The Tombstone Technique & Buttering the Gatekeeper: Recognizing the one enduring legacy someone cares about—and elevating the assistant before the executive—secures long-term loyalty where transactional networking fails.
5. COUNTERPOINT: When taken literally as a 92-step checklist, these micro-tactics risk morphing into hyper-vigilant sociopathic performance, inducing debilitating analysis paralysis rather than natural empathy.
6. PAYOFF: The ultimate social trick is realizing nobody is paying attention to your flaws—everyone in the room is secretly waiting for permission to feel accepted and seen.

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
1. Sesi **MP3** olarak indir → `public/audio/how-to-talk-to-anyone.mp3` (.m4a da çalışır, ama uzun bir kitapta GitHub'ın 100 MB dosya sınırını aşabilir; o zaman render worker'ları reddeder)
2. Videoyu YouTube'a (unlisted) yükle → otomatik altyazıyı **kelime zaman damgalı VTT** olarak indir → `public/captions/how-to-talk-to-anyone.vtt`
3. Bu oturumda yaz: **"dosyalar hazır, preview hazırla"** (skill `preview-hazirla`: kitabın kendi worktree'si, storyboard, kapılar, kör sessiz test). Final render ayrı, operatör onaylı bir adım.
