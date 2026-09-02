# NotebookLM prompt — Martyr! (Kaveh Akbar)

**Slug:** `martyr` · **Genre:** fiction · **Engine:** vox · **Target:** 45–60 min · **Market:** US (English)

**Nasıl kullanılır:** NotebookLM → kitabın kaynaklarını yükle → **Audio Overview → Customize** → uzunluğu **"Longer"** seç → SADECE aşağıdaki bloğu yapıştır → Generate. (Blok kompakt tutuldu ki karakter limitinde kesilmesin. Ses **45 dk'nın altına düşerse** tekrar üret — prompt 8 beat + Depth Engine ile 45-60 dk hedefler. Süreyi zorla doldurtmaz: tekrar/dolgu yasak, derinleşerek uzar, gerçek insan sohbeti gibi.)

```
You are two hosts doing a deep, original analysis of "Martyr!" by Kaveh Akbar.

THE ANGLE (this is what makes this episode unique):
- Lens: martyrdom as the last addiction. Read the whole novel as a recovery story where the drug being kicked isn't alcohol — it's the craving for a death that finally means something.
- Thesis to prove: Cyrus Shams wants a meaningful death because his mother got a meaningless one — murdered by a warship, waved off as an accident — and the book's real argument is that the meaningful-death fantasy is addiction wearing its holiest mask; the cure is not a better death but an ordinary, sober, present next day.
- Open on this idea: "A U.S. warship shoots down a passenger plane, kills a baby's mother along with 289 others, and the crew comes home with medals. That baby grows up wanting to matter so badly he'd rather be martyred than live — and this book is about how wrong he is to want it."

BEATS TO ARGUE (one specific claim each, in order):
1. The wound is Iran Air Flight 655: in 1988 the USS Vincennes mistakes a civilian airliner for an F-14 and shoots it down, 290 dead including Cyrus's mother Roya; the U.S. never truly apologizes and decorates the crew. A death that meaningless is what breeds Cyrus's hunger for a death that means everything.
2. Cyrus's "BOOK OF MARTYRS" project is the addict's brain rebranded: newly sober in Indiana, he's swapped the craving for oblivion for a craving for a significant death. Martyrdom is the high that disguises itself as meaning — the book quietly diagnoses the death-wish as the last addiction.
3. Uncle Arash and the "angel of death": in the Iran-Iraq war he rode a horse dressed as an angel so dying boy-soldiers would see paradise coming for them. Martyrdom here is exposed as manufactured comfort — always someone else's story sold to the person doing the dying.
4. Ali, the father, gets no glorious death: he flees Iran for an Indiana chicken farm, deboning birds on a line for decades, raising a motherless son in silence, then dies unremarkably. The book insists this unspectacular endurance is its own martyrdom — and Cyrus is too dazzled by grandeur to see it.
5. Orkideh's exhibit "Death-Speak" at the Brooklyn Museum: a dying artist spends her final days as a living installation, sitting with strangers to talk about death. Art is offered as the anti-martyrdom — not a meaningful death but a death turned into shared, present attention.
6. The dream sequences aren't whimsy: Cyrus dreams conversations between Rumi and Lisa Simpson, Kareem Abdul-Jabbar, his own dead. The novel stages meaning as something made between voices — the exact opposite of the martyr's solitary, silencing exit.
7. The reveal: Orkideh IS Roya. She was never on the plane; she let the world believe she died and chose to vanish and live as an artist. The mother whose death defined Cyrus actually refused death — the most meaningful life in the book is built on a faked martyrdom.
8. Sobriety is the buried thesis: martyrdom wants the story to end on one redemptive line; recovery is the refusal of the exit — staying, waking up, being ordinary and present. The payoff Cyrus has to earn is not a meaningful death but a meaningful next day.

RAISE THIS COUNTERPOINT: the mother-alive-and-dying-in-a-museum reveal courts melodrama and coincidence, and Akbar — himself a poet — sometimes tells the theme through Cyrus's poems and essayistic riffs instead of dramatizing it, so the dream cameos can tip from resonant into clever-for-its-own-sake.

END BY REFRAMING: The book never claims death is meaningless — Flight 655 settles that some deaths are pure theft. It claims the meaning was never in the dying. Roya didn't matter because she died; she mattered because she kept living where no one was watching. The exclamation point in the title is a taunt: you wanted to be a martyr — try being a person instead.

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
1. Sesi indir → `public/audio/martyr.m4a` (veya .mp3)
2. Videoyu YouTube'a (unlisted) yükle → otomatik altyazıyı **kelime zaman damgalı VTT** olarak indir → `public/captions/martyr.vtt`
3. Tek komut:
```
node scripts/make-book.js --slug=martyr --title="Martyr!" --author="Kaveh Akbar" --genre=fiction
```
