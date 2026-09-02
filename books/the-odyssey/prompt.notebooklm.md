# NotebookLM prompt — The Odyssey (Homer)

**Slug:** `the-odyssey` · **Genre:** classics · **Engine:** vox · **Target:** 45–60 min · **Market:** US (English)

**Nasıl kullanılır:** NotebookLM → kitabın kaynaklarını yükle → **Audio Overview → Customize** → uzunluğu **"Longer"** seç → SADECE aşağıdaki bloğu yapıştır → Generate. (Blok kompakt tutuldu ki karakter limitinde kesilmesin. Ses **45 dk'nın altına düşerse** tekrar üret — prompt 8 beat + Depth Engine ile 45-60 dk hedefler. Süreyi zorla doldurtmaz: tekrar/dolgu yasak, derinleşerek uzar, gerçek insan sohbeti gibi.)

```
You are two hosts doing a deep, original analysis of "The Odyssey" by Homer.

THE ANGLE (this is what makes this episode unique):
- Lens: Metis (cunning intellect) vs. Bie (brute force) — read the epic not as a monster fairytale, but as the revolutionary invention of human psychological endurance, where the suicidal warrior glory of Achilles is dismantled in favor of disguise, delayed gratification, and the grueling cost of returning home.
- Thesis to prove: The Odyssey argues that true heroism is not conquering foreign lands through violence, but mastering self-restraint — every monster and obstacle Odysseus faces is an embodiment of unchecked appetite or raw force, and he only survives because he learns to suppress his ego, conceal his identity as "Nobody," and endure humiliation as a beggar in his own palace.
- Open on this idea: "In The Iliad, Achilles chooses to die young for eternal glory — but when Odysseus visits the underworld, Achilles' ghost tells him he would rather be a dirt-poor serf working a stranger's field than king over all the dead."

BEATS TO ARGUE (one specific claim each, in order):
1. The Telemachy is a deliberate delay: Homer starts not with Odysseus, but with Telemachus and 108 predatory suitors eating Ithaca out of house and home — proving that the corruption of hospitality (xenia) and family order is more dangerous than any mythical sea beast.
2. The cave of Polyphemus exposes the lethal danger of aristocratic pride: Odysseus survives the Cyclops by shedding his identity and calling himself "Nobody" (Outis), but his fatal ego drives him to shout his real name from the departing ship, triggering Poseidon's decade-long wrath.
3. The monsters are allegories for the surrender of human consciousness: from the Lotus-Eaters' sweet amnesia to Circe turning men into swine that match their base appetites and Calypso offering seven years of ageless luxury, the sea's real threat is the temptation to forget home.
4. The Nekyia (underworld journey) shatters heroic mythology: descending into Hades, Odysseus confronts the bitter reality of Troy's aftermath — Agamemnon murdered at his own welcome feast and Achilles renouncing martial martyrdom — proving survival is worth more than a dead legend.
5. Binding to the mast proves self-restraint is the ultimate technology: hearing the Sirens' seductive song of total knowledge without leaping overboard shows that true power is not an iron sword, but the discipline to voluntarily restrict one's own destructive impulses.
6. The Cattle of the Sun reveals why the crew perished: when starving men slaughter Helios's sacred cattle on Thrinacia, Homer draws the cruel line between the rare leader who can endure physical suffering and the undisciplined masses whose inability to delay gratification seals their doom.
7. The beggar king transforms the meaning of power: disguised by Athena in ragged cloaks, Odysseus absorbs physical blows and insults from Melanthius and the suitors inside his own hall, proving that true authority lies in weaponized patience and observation.
8. The olive-tree bed is the true climax over the bow: stringing the great bow of Eurytus kills the suitors, but Penelope's unyielding test of the immovable bed carved into the living earth proves husband and wife are equal partners in cunning, bonded by shared intellect.

RAISE THIS COUNTERPOINT: The slaughter of the 108 suitors and the merciless hanging of the twelve enslaved maids is an act of gruesome, disproportionate savagery — an ancient vengeance so uncontrollable that Athena herself must descend from Olympus in the final book to forcibly freeze the cycle of blood feuds before Ithaca annihilates itself.

END BY REFRAMING: The Odyssey didn't just tell a mythic voyage; it invented the modern human — realizing that the hardest journey in history isn't sailing across oceans of monsters, but fighting your way back to who you were after war stripped everything away.

STRUCTURE (follow strictly):
1. COLD OPEN (0:00-0:25): open mid-thought on the single most provocative idea. No greetings, no "welcome back", no "today we're looking at".
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
1. Sesi indir → `public/audio/the-odyssey.m4a` (veya .mp3)
2. Videoyu YouTube'a (unlisted) yükle → otomatik altyazıyı **kelime zaman damgalı VTT** olarak indir → `public/captions/the-odyssey.vtt`
3. Tek komut:
```
node scripts/make-book.js --slug=the-odyssey --title="The Odyssey" --author="Homer" --genre=classics
```
