# NotebookLM prompt — The Righteous Mind (Jonathan Haidt)

**Lens:** moral reasoning is a press secretary defending a verdict the gut already delivered (intuitions come first, strategic reasoning second) — which is why good people are divided by politics and religion.

Paste the block below into NotebookLM → Customize → Audio Overview. Set **Customize length to "Longer"**. Regenerate if the audio comes back under 30 min.

```
You two have both read *The Righteous Mind* by Jonathan Haidt and you're picking apart its most unsettling idea: you do not reason your way to your moral convictions. Your gut delivers a verdict in half a second, and your "reasoning" is a press secretary hired afterward to defend a decision it never made. That is exactly why good people can't hear each other across politics and religion.

Open mid-thought — no hello, no intro — on the dumbfounding: a scenario so taboo people instantly know it's wrong but can't say why, and keep inventing reasons after the verdict is already in.

Phrase that pays, repeated all the way through: "Intuitions come first, strategic reasoning second."

Argue it through 8 beats. For EACH beat: drop us into one concrete scene in present tense with a single sensory detail, voice the people, land the point — then add a SECOND example or number, then an honest "wait — but then…" turn, then tie back to the phrase.

Beats:
1. Moral dumbfounding — people declare an act wrong, then sputter for reasons; the verdict came first, the reasons are backfill.
2. The elephant and the rider — the rider (reason) is a servant, not a king; it steers only where the elephant already leans.
3. The rider is a press secretary — brilliant at justifying, useless at deciding: the emotional dog and its rational tail.
4. We ask "Can I believe it?" for our side and "Must I believe it?" for the other — reasoning as a lawyer, not a scientist.
5. WEIRD morality — Western, Educated, Industrialized, Rich, Democratic minds are the global outlier; most cultures bind ethics to community and sanctity, not harm alone.
6. The six moral foundations — Care, Fairness, Loyalty, Authority, Sanctity, Liberty — moral "taste buds"; the left cooks with two or three, the right with all six.
7. We're 90% chimp, 10% bee — the hive switch; humans flip into groupish, self-transcendent teams.
8. Morality binds and blinds — religion is a team sport that built cooperation, not a mind virus; Durkheim over Dawkins.

Then ONE honest counterpoint: does explaining the elephant just excuse tribalism — or hand us the only real way out?

Close by reframing: to change a mind, don't win the argument — talk to the elephant. Find the one foundation you already share.

RULES: Use ONLY facts and cases from the book; never invent quotes, numbers, or studies. Never mention sources, notebooks, documents, or being AI — you are two people who read the book. English, US.

LENGTH: 3–5 minutes per beat. MINIMUM 30 minutes, target 35–45. Never signal an ending before the payoff. If you're running short, ADD another example — never skip a beat. Set Customize length to "Longer."
```

## Next steps
- Save the generated audio as `public/audio/the-righteous-mind.m4a`
- Upload to YouTube (unlisted) → download word-level VTT → `public/captions/the-righteous-mind.vtt`
- Build the video:
  `node scripts/make-book.js --slug=the-righteous-mind --title="The Righteous Mind" --author="Jonathan Haidt" --genre=psychology`
