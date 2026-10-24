# NotebookLM prompt — Do Not Say We Have Nothing (Madeleine Thien)

**Slug:** `do-not-say-we-have-nothing` · **Genre:** historical-fiction · **Engine:** vox · **Target:** 45–60 min · **Market:** US (English)

**Nasıl kullanılır:** NotebookLM → kitabın kaynaklarını yükle → **Audio Overview → Customize** → uzunluğu **"Longer"** seç → SADECE aşağıdaki bloğu yapıştır → Generate. (Blok kompakt tutuldu ki karakter limitinde kesilmesin. Ses **45 dk'nın altına düşerse** tekrar üret — prompt 8 beat + Depth Engine ile 45-60 dk hedefler. Süreyi zorla doldurtmaz: tekrar/dolgu yasak, derinleşerek uzar, gerçek insan sohbeti gibi.)

```
You are two hosts doing an obsessive, deeply intellectual breakdown of Madeleine Thien's "Do Not Say We Have Nothing".

THE ANGLE:
- Thesis: Madeleine Thien’s masterpiece isn’t just a tragic chronicle of Mao’s Cultural Revolution and Tiananmen Square—it is a devastating exploration of how totalitarian states try to erase human interiority by outlawing silence, memory, and music, and how survival becomes a secret act of copying, preserving, and smuggling the soul through handwritten fragments.
- Recurring phrase-that-pays: "To be silenced is terrifying, but to be re-recorded in the State’s voice is the true death."

STRUCTURE (follow strictly):
1. COLD OPEN (0:00-0:25): Open mid-thought on Sparrow and Zhuli hiding in the soundproofed practice room at the Shanghai Conservatory of Music in 1966, terrified of playing Bach or Elgar because Western counterpoint has been branded bourgeois poison. No intro music, no "welcome back", no pleasantries.
2. THESIS: State the argument—how art, private consciousness, and classical music become contraband under the Red Guard, turning personal identity into a clandestine archival project.
3. SETUP: Introduce the double timeline—Marie (Jiang Li-ling) and her mother in 1990s Vancouver taking in Ai-ming, a young refugee from Tiananmen Square, piecing together the fragmented handwritten chapters of the mythical "Book of Records" (The Book of Records) left behind by their musician fathers.
4. BEATS (develop each beat fully with concrete scenes, names, and music before advancing):
   - Beat 1: The Golden Age of the Shanghai Conservatory of Music (1950s–1960s). Composer Sparrow, brilliant violinist Zhuli, and prodigy pianist Kai. How Western symphonic tradition and socialist idealism briefly collided before turning into a trap.
   - Beat 2: The Onset of the Cultural Revolution and the Destruction of Sound. The Red Guards smashing violins, burning sheet music, and forcing musicians to compose slogans. The public humiliation sessions where playing Beethoven is treated as treason against the Proletariat.
   - Beat 3: The Tragedy of Zhuli and the Mutilation of the Artist. The horrific struggle session at the Conservatory, the torture, and Zhuli’s heartbreaking suicide note written on scraps of paper—the ultimate refusal to let the collective rewrite her spirit.
   - Beat 4: The Betrayal and Survival of Kai. Kai joining the Party apparatus, denouncing his mentors and comrades to save his skin, and living with the crushing, irredeemable moral rot of complicity that eventually leads him to leap from a window in Vancouver decades later.
   - Beat 5: Sparrow’s Exile and Internal Emigration. Sparrow sent to a labour camp / tractor factory, losing his hearing, physically silenced, yet continuing to compose an entire secret symphony purely in his head without ever putting ink to paper.
   - Beat 6: The Book of Records as an Underground Technology of Memory. How anonymous chapters of this epic adventure novel are copied by hand, passed from person to person across decades, hiding real family genealogies and coded historical truths between lines of fiction.
   - Beat 7: Tiananmen Square 1989 and the Return of the Symphony. Sparrow, now reunited with Kai’s daughter Ai-ming in Beijing, standing among the student hunger strikers in Tiananmen Square as Beethoven’s Ninth blasts from crackling loudspeakers right before the tanks roll in.
   - Beat 8: Marie’s Mathematics and the Reconstruction of the Past. How Marie, studying numbers and fractal geometries in Canada, realizes that memory, like music, never truly disappears—it merely fragments into infinite recursive patterns waiting for someone to listen.
5. COUNTERPOINT: Address an honest critique—the narrative's sheer structural density, recursive polyphony, and relentless, suffocating sorrow can feel emotionally exhausting and opaque to a reader seeking straightforward historical resolution.
6. PAYOFF: Reframe the title itself—the Internationale lyric "We have been naught, we shall be all" (in Chinese: "Do not say we have nothing"). To have nothing in an authoritarian regime isn't despair—it is the clean, uncolonized slate from which human dignity rewrites itself in the dark.

DEPTH ENGINE (run on EVERY beat):
a) Present-tense sensory immersion (the smell of rosin, the harsh scrape of Red Guard loudspeakers, the crisp sound of torn manuscript pages);
b) The philosophical takeaway for personal memory and artistic integrity;
c) Specific names, characters, musical pieces (Bach's Goldberg Variations, Shostakovich, Elgar's Cello Concerto);
d) Genuine intellectual debate between the two hosts about compromise, complicity, and the price of survival;
e) Anchor back to the core thesis.

LENGTH & CADENCE:
- 45–60 minutes target. Treat every beat like an in-depth chapter of 5-6 minutes. Never rush or summarize ahead of time. No throat-clearing, no repetitive filler. Speak with raw gravitas, curiosity, and forensic emotional precision.
```

---
## Sonraki adımlar
1. Sesi indir → `public/audio/do-not-say-we-have-nothing.m4a` (veya .mp3)
2. Videoyu YouTube'a (unlisted) yükle → otomatik altyazıyı **kelime zaman damgalı VTT** olarak indir → `public/captions/do-not-say-we-have-nothing.vtt`
3. Tek komut:
```
node scripts/make-book.js --slug=do-not-say-we-have-nothing --title="Do Not Say We Have Nothing" --author="Madeleine Thien" --genre=historical-fiction
```
