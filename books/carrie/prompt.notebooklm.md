# NotebookLM prompt — Carrie (Stephen King)

**Slug:** `carrie` · **Genre:** horror · **Engine:** antidote · **Target:** 45–60 min · **Market:** US (English)

**Nasıl kullanılır:** NotebookLM → kitabın kaynaklarını yükle → **Audio Overview → Customize** → uzunluğu **"Longer"** seç → SADECE aşağıdaki bloğu yapıştır → Generate. (Blok kompakt tutuldu ki karakter limitinde kesilmesin. Ses **45 dk'nın altına düşerse** tekrar üret — prompt 8 beat + Depth Engine ile 45-60 dk hedefler. Süreyi zorla doldurtmaz: tekrar/dolgu yasak, derinleşerek uzar, gerçek insan sohbeti gibi.)

```
You are two hosts doing a deep, original analysis of "Carrie" by Stephen King.

THE ANGLE:
Carrie is not a story about a supernatural monster punishing bullies; it is an epistolary autopsy of institutional failure, dissecting how domestic religious abuse and high school social hierarchy manufacture a mass casualty event through weaponized isolation.

STRUCTURE (follow strictly):
1. COLD OPEN (0:00-0:25): open mid-thought on the claustrophobic terror of the shower room: a sixteen-year-old girl bleeding for the first time, utterly ignorant of biology, met not with comfort but with chanting girls hurling sanitary napkins like stones.
2. THESIS: Carrie proves that horror is systemic: telekinesis is merely the detonator, but the bomb itself is engineered by Margaret White's fanatical abuse and Ewen High School's casual cruelty.
3. SETUP: Carrie White, an ostracized high school senior in Chamberlain, Maine; her mother Margaret, wielding distorted scripture and the closet altar; and a school ecology divided between cruel instigators like Chris Hargensen and guilt-ridden bystanders like Sue Snell.
4. BEATS:
- Beat 1: The Epistolary Autopsy — how King frames the disaster through Senate hearings, psychiatric reports, and memoirs (The Shadow Exploded) to reveal an irreversible societal catastrophe rather than a surprise twist.
- Beat 2: Margaret White and Sanctified Domestic Terror — examining the blue-eyed crucifix, the scrub brush, and the theological prison that convinced Carrie her developing body was inherently sinful.
- Beat 3: The Locker Room Trauma as Systemic Failure — how Miss Desjardin and Principal Graybill misdiagnose severe abuse as simple social awkwardness, punishing symptoms while leaving the poison intact.
- Beat 4: Sue Snell’s Complicity and the Currency of Pity — unpacking Tommy Ross’s prom invitation not as selfless kindness, but as an uneasy moral transaction born of performative suburban guilt.
- Beat 5: Chris Hargensen and Billy Nolan: Sociopathy Behind Privilege — analyzing the calculated malice of the pig blood scheme, driven by resentment against institutional authority.
- Beat 6: The Epiphany of Dignity — the fleeting, heartbreaking hour at the prom where Carrie genuinely believes she is accepted, making the impending betrayal infinitely more devastating.
- Beat 7: Black Prom and the Mechanics of Total Destruction — the sensory breakdown of high school doors locking, live electrical wires touching water, and telekinesis shifting from defense mechanism to an indifferent natural catastrophe.
- Beat 8: The Aftermath: Matricide, the Death of Chamberlain, and the Genetic Menace — Carrie's final confrontation with Margaret, her agonizing death with Sue Snell, and the chilling letter from Amelia Jenks suggesting telekinesis is dormant in the next generation.
5. COUNTERPOINT: Many critics view the epistolary excerpts and scientific rationalization of telekinesis as clunky pacing that deflates the visceral horror of King’s debut narrative.
6. PAYOFF: The tragedy of Carrie White is that Chamberlain did not perish because she was inherently evil, but because a whole town chose to ignore a drowning child until she took the town down with her.

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
1. Sesi **MP3** olarak indir → `public/audio/carrie.mp3` (.m4a da çalışır, ama uzun bir kitapta GitHub'ın 100 MB dosya sınırını aşabilir; o zaman render worker'ları reddeder)
2. Videoyu YouTube'a (unlisted) yükle → otomatik altyazıyı **kelime zaman damgalı VTT** olarak indir → `public/captions/carrie.vtt`
3. Bu oturumda yaz: **"dosyalar hazır, preview hazırla"** (skill `preview-hazirla`: kitabın kendi worktree'si, storyboard, kapılar, kör sessiz test). Final render ayrı, operatör onaylı bir adım.
