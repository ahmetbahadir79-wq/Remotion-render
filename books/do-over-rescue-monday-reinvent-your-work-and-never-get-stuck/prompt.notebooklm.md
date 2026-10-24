# NotebookLM prompt — Do Over: Rescue Monday, Reinvent Your Work, and Never Get Stuck (Jon Acuff)

**Slug:** `do-over-rescue-monday-reinvent-your-work-and-never-get-stuck` · **Genre:** nonfiction · **Engine:** antidote · **Target:** 45–60 min · **Market:** US (English)

**Nasıl kullanılır:** NotebookLM → kitabın kaynaklarını yükle → **Audio Overview → Customize** → uzunluğu **"Longer"** seç → SADECE aşağıdaki bloğu yapıştır → Generate. (Blok kompakt tutuldu ki karakter limitinde kesilmesin. Ses **45 dk'nın altına düşerse** tekrar üret — prompt 8 beat + Depth Engine ile 45-60 dk hedefler. Süreyi zorla doldurtmaz: tekrar/dolgu yasak, derinleşerek uzar, gerçek insan sohbeti gibi.)

```
You are two hosts doing a deep, original analysis of "Do Over: Rescue Monday, Reinvent Your Work, and Never Get Stuck" by Jon Acuff.

THE ANGLE:
- Thesis: Most career crises aren't caused by a lack of passion or ambition; they are liquidity crises. Acuff reveals that every workplace transition—a ceiling, a bump, a jump, or an opportunity—demands a specific withdrawal from a Career Savings Account (Relationships, Skills, Character, Hustle), and panic happens when you try to spend currency you never deposited.

STRUCTURE (follow strictly):
1. COLD OPEN (0:00-0:25): open mid-thought: "The moment you dread Sunday evening at 7:00 PM isn't just burnout—it's an overdraft alert. You've been writing checks against a career account that's been bone-dry for six months."
2. THESIS: Prove that career reinvention is not a radical leap into the unknown, but an intentional calibration of four currencies across four distinct career transitions.
3. SETUP: Break down Acuff's Career Savings Account (CSA) formula: (Relationships + Skills + Character) * Hustle = Career Savings Account. Set up why the multiplier (Hustle) is lethal without the base.
4. BEATS: 8 beats, fully developed:
   - Beat 1: The Career Ceiling vs. Skills. Getting stuck when your mastery plateaus; why you must build "invisible skills" before visible promotions.
   - Beat 2: The Career Bump vs. Relationships. Getting laid off, fired, or sidelined; why networking after the crisis is already too late. Cultivating advocates before you need a rescue.
   - Beat 3: The Career Jump vs. Character. Choosing to leave or pivot voluntarily; why integrity and self-discipline prevent the jump from becoming a fatal freefall.
   - Beat 4: The Career Opportunity vs. Hustle. Spotting an unexpected opening; why raw effort without direction burns you out, but targeted hustle captures the upside.
   - Beat 5: The "Friends on Purpose" Rule. Transactional networking vs. genuine allies; Acuff's audit of who is actually in your corner when the business card disappears.
   - Beat 6: Rescuing Monday Morning. Dismantling the myth of "finding your passion overnight"; why small, iterative adjustments to existing routines beat blowing up your life.
   - Beat 7: The Trap of Fake Hustle. Confusing activity with accomplishment; endless email, tweaking slide decks, and performative busyness that depletes your account without adding equity.
   - Beat 8: The Do Over Grid. Mapping exactly where you are today (Ceiling, Bump, Jump, Opportunity) against what currency you need to stockpile right now.
5. COUNTERPOINT: Address where Acuff's optimistic framework hits a wall: structural economic disruptions, corporate toxic traps, and systemic barriers where individual character and hustle alone cannot bridge systemic failure.
6. PAYOFF: Reframe the entire book: A "Do Over" isn't a fresh start at zero; it's learning to read your career balance sheet before Monday morning bankrupts you.

DEPTH ENGINE (run this on EVERY beat — this is how the episode earns its length):
a) drop us into a scene in present tense with one vivid sensory detail (the office badge buzzing, staring at a blank calendar, the quiet car ride on Monday morning);
b) land the point ("here's what that means for you in your day-to-day work");
c) add a SECOND concrete example, workplace metric, or dilemma from the book;
d) take one honest "wait - but then..." turn where the two hosts genuinely disagree on whether Acuff's advice is realistic;
e) tie it back to the recurring phrase-that-pays before moving to the next beat.

LENGTH (target 45-60 minutes, minimum 45 — never shorter): give each beat 4-6 real minutes. BUT never pad to hit the number. Do NOT repeat a point you already made, do NOT restate the thesis over and over, do NOT stall with filler, throat-clearing, or "as we said earlier". Earn the length by going DEEPER, not longer on the same ground: a fresh workplace dilemma, a sharper objection, a genuine debate between the hosts. If you truly run out of things to say about a beat, MOVE ON rather than recycle it.

HARD RULES:
- English only (US audience). Two hosts in real conversation — disagree, interrupt, build on each other.
- Antidote engine alignment: Ground scenarios around relatable everyman workplace dynamics, career friction, habits, and concrete everyday choices.
- Use ONLY facts, frameworks, and arguments from the book. NEVER invent fake studies or statistics.
- NEVER mention "sources", "notebook", "documents", or AI. Stay completely in character.
```

---
## Sonraki adımlar
1. Sesi indir → `public/audio/do-over-rescue-monday-reinvent-your-work-and-never-get-stuck.m4a` (veya .mp3)
2. Videoyu YouTube'a (unlisted) yükle → otomatik altyazıyı **kelime zaman damgalı VTT** olarak indir → `public/captions/do-over-rescue-monday-reinvent-your-work-and-never-get-stuck.vtt`
3. Tek komut:
```bash
node scripts/make-book.js --slug=do-over-rescue-monday-reinvent-your-work-and-never-get-stuck --title="Do Over: Rescue Monday, Reinvent Your Work, and Never Get Stuck" --author="Jon Acuff" --genre=nonfiction
```
