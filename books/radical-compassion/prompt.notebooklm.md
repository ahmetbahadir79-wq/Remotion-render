# NotebookLM prompt — Radical Compassion: Learning to Love Yourself and Your World with the Practice of RAIN (Tara Brach)

**Slug:** `radical-compassion` · **Genre:** self-help · **Engine:** antidote · **Target:** 45–60 min · **Market:** US (English)

**Nasıl kullanılır:** NotebookLM → kitabın kaynaklarını yükle → **Audio Overview → Customize** → uzunluğu **"Longer"** seç → SADECE aşağıdaki bloğu yapıştır → Generate. (Blok kompakt tutuldu ki karakter limitinde kesilmesin. Ses **45 dk'nın altına düşerse** tekrar üret — prompt 8 beat + Depth Engine ile 45-60 dk hedefler. Süreyi zorla doldurtmaz: tekrar/dolgu yasak, derinleşerek uzar, gerçek insan sohbeti gibi.)

```
You are two hosts doing a deep, original analysis of "Radical Compassion: Learning to Love Yourself and Your World with the Practice of RAIN" by Tara Brach.

THE ANGLE:
- Radical Compassion is not a soft relaxation routine or positive-thinking shield; it is a rigorous, embodied deconditioning technology that exposes how the "trance of unworthiness" weaponizes self-judgment to maintain an illusion of control.

STRUCTURE (follow strictly):
1. COLD OPEN (0:00-0:25): open mid-thought on the reflexive tightness in the chest when shame hits: "We treat self-criticism like a vigilant guard keeping us safe, but what if the guard is actually the prison warden?" No greetings, no "welcome back", no "today we're exploring".
2. THESIS: Compassion is biologically transformative and active only when we stop trying to fix emotional pain and instead inhabit the somatic vulnerability beneath it through RAIN (Recognize, Allow, Investigate, Nurture).
3. SETUP: Tara Brach pairs clinical psychology with meditative inquiry, introducing everyday high-performers, parents, and trauma survivors trapped in chronic emotional flight and relational rupture.
4. BEATS: 8 beats, each ONE specific claim from the book. DEVELOP each beat fully before moving on — do NOT list them quickly:
   - Beat 1: The Trance of Unworthiness — how internal narratives of failure and chronic deficiency construct an invisible cage that isolates us from our lives.
   - Beat 2: Recognize (R) — naming the mental storm (fear, anger, shame) without fusion, stepping back from "I am angry" to "anger is present."
   - Beat 3: Allow (A) — letting the present experience be just as it is without pushing it away or problem-solving, breaking the reflex of immediate defensive reactivity.
   - Beat 4: Investigate with Care (I) — locating where emotion lives in the body (tight throat, clenched jaw, racing pulse) with somatic curiosity rather than analytical dissection.
   - Beat 5: Nurture with Loving Presence (N) — offering intentional kindness, placing a hand on the heart, sending the specific reassurance the hurting part needs most.
   - Beat 6: After the RAIN: The Shift into Presence — resting in natural awareness and observing the shift from an identified, contracted self into spacious freedom.
   - Beat 7: Interpersonal RAIN and Common Humanity — breaking the cycle of blame and polarization with partners, colleagues, and perceived adversaries by seeing their unmet needs and vulnerability.
   - Beat 8: Living with an Unconditional Heart (Bodhisattva in Daily Life) — extending radical compassion outwards as courage, social repair, and active resilience in suffering worlds.
5. COUNTERPOINT: The danger of using "allowing" as passive spiritual bypass or fatalism when real-world boundaries, anger, or structural injustices demand decisive outer resistance.
6. PAYOFF: Real compassion never rescues us from our messy human reality; it awakens the spacious presence capable of holding every inch of it without flinching.

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
1. Sesi **MP3** olarak indir → `public/audio/radical-compassion.mp3` (.m4a da çalışır, ama uzun bir kitapta GitHub'ın 100 MB dosya sınırını aşabilir; o zaman render worker'ları reddeder)
2. Videoyu YouTube'a (unlisted) yükle → otomatik altyazıyı **kelime zaman damgalı VTT** olarak indir → `public/captions/radical-compassion.vtt`
3. Bu oturumda yaz: **"dosyalar hazır, preview hazırla"** (skill `preview-hazirla`: kitabın kendi worktree'si, storyboard, kapılar, kör sessiz test). Final render ayrı, operatör onaylı bir adım.
