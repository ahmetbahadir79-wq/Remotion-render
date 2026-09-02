# NotebookLM prompt — The War of the Worlds (H.G. Wells)

**Slug:** `war-of-the-worlds` · **Genre:** science-fiction · **Engine:** vox · **Target:** 45–60 min · **Market:** US (English)

**Nasıl kullanılır:** NotebookLM → kitabın kaynaklarını yükle → **Audio Overview → Customize** → uzunluğu **"Longer"** seç → SADECE aşağıdaki bloğu yapıştır → Generate. (Blok kompakt tutuldu ki karakter limitinde kesilmesin. Ses **45 dk'nın altına düşerse** tekrar üret — prompt 8 beat + Depth Engine ile 45-60 dk hedefler. Süreyi zorla doldurtmaz: tekrar/dolgu yasak, derinleşerek uzar, gerçek insan sohbeti gibi.)

```
Two hosts. A deep, original 45-60 minute analysis of "The War of the Worlds" by H.G. Wells. English only, natural US conversation - argue, interrupt, build on each other.

ANGLE (do NOT recap the plot or treat this as "aliens invade Earth"): Thesis to prove - this is not a monster story, it is a mirror. Wells takes the exact logic Victorian England used to justify its empire - superior intelligence has the RIGHT to erase inferior life - and turns it on London. The Martians aren't evil; they are us, seen from the losing end. And the punchline is a humiliation: humanity does nothing to win - we are saved by the smallest thing alive. Recurring phrase-that-pays: "under the microscope" - we spend the book being studied and dismissed exactly as we study a drop of pond water.

COLD OPEN (0:00-0:25, mid-thought, no greeting): "The Martians don't lose to our armies. They lose to a germ - and Wells did that on purpose, to tell his own empire it was never the top of the food chain."

BEATS (4-6 min each; one claim + the concrete scene that proves it):
1. The first page IS the argument: minds "vast and cool and unsympathetic" watch us like a man with a microscope watches infusoria - and Wells names it outright, the British extermination of the Tasmanians. The invader's excuse is Britain's own.
2. Horsell Common, Woking: a curious crowd rings the cylinder, a deputation walks out waving a white flag - the Heat-Ray turns them to fire in a heartbeat. We aren't even the enemy; we're clutter.
3. The Heat-Ray and the Black Smoke: killing made silent, invisible, industrial. Wells invents mechanized total war a generation before the trenches prove him right.
4. The Thunder Child: the one human "win" is an ironclad ramming two tripods to its own death, to buy a boat of refugees a few minutes. Heroism is real - and irrelevant to the outcome.
5. The curate: trapped in the ruined house, the man of God unravels into a shrieking liability, and our decent narrator has to silence him. Catastrophe strips the varnish off faith and civility.
6. The artilleryman's speech: a thrilling vision of men living underground, breeding a resistance "for the sake of the breed" - then we find he's dug a few lazy feet and is playing cards. Grandiosity vs. what people actually do.
7. The red weed and the blood: the Martians farm us, draining human blood into their veins, while their alien plant recolonizes English rivers. We are livestock; the empire is now the colony.
8. The ending: the Martians rot in their pits, "slain, after all man's devices had failed, by the humblest things upon this earth." Not our courage - bacteria. The lowest rung decides who rules the ladder.

COUNTERPOINT (be honest): the bacteria ending is a deus ex machina - we're let off the hook without earning it, and Wells, who flirted with eugenics, may just swap empire's hierarchy for nature's, where microbes are the real imperialists. Does the book humble the ladder or only reorder it?

CLOSER (reframe): the real terror isn't the tripods. It's the microscope pointed back at us - the discovery that "superior" is a temporary accident, not a throne.

STORYTELLING STYLE: tell each scene like a master keynote storyteller - present tense, one vivid sensory detail (the hiss of the Heat-Ray, the reek of the Black Smoke), voice the people, THEN land the point. Keep returning to "under the microscope." One honest "wait - but then..." turn per beat.

HARD RULES: English only, US audience. Use ONLY what's in the novel and its real documented context (the Tasmania line is Wells's own) - never invent quotes, numbers, or events; if unsure, stay general. Never mention "sources", "notebook", "documents", or that this is AI; never break character. No greetings, no plot-recap for its own sake, no generic praise. Target 45-60 min; go deeper, never pad, never wrap early.
```

---
## Sonraki adımlar
1. Sesi indir → `public/audio/war-of-the-worlds.m4a` (veya .mp3)
2. Videoyu YouTube'a (unlisted) yükle → otomatik altyazıyı **kelime zaman damgalı VTT** olarak indir → `public/captions/war-of-the-worlds.vtt`
3. Tek komut:
```
node scripts/make-book.js --slug=war-of-the-worlds --title="The War of the Worlds" --author="H.G. Wells" --genre=science-fiction
```
