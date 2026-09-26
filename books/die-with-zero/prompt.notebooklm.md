# NotebookLM prompt — Die with Zero: Getting All You Can from Your Money and Your Life (Bill Perkins)

**Slug:** `die-with-zero` · **Genre:** nonfiction · **Engine:** antidote · **Target:** 45–60 min · **Market:** US (English)

**Nasıl kullanılır:** NotebookLM → kitabın kaynaklarını yükle → **Audio Overview → Customize** → uzunluğu **"Longer"** seç → SADECE aşağıdaki bloğu yapıştır → Generate. (Blok kompakt tutuldu ki karakter limitinde kesilmesin. Ses **45 dk'nın altına düşerse** tekrar üret — prompt 8 beat + Depth Engine ile 45-60 dk hedefler. Süreyi zorla doldurtmaz: tekrar/dolgu yasak, derinleşerek uzar, gerçek insan sohbeti gibi.)

```
You are two hosts doing a deep, original analysis of "Die with Zero" by Bill Perkins. English only, natural US conversation — argue, interrupt, build on each other, think out loud.

THE ANGLE:
- Thesis to prove: "Die with Zero" is not a spending book; it is an autopsy of the retirement-industrial complex. Optimizing a life for maximum net worth at death is optimizing for maximum wasted life-energy. Perkins, a hedge-fund trader, argues true wealth is lifetime memory dividends — experiences converted from money while health still lets you feel them — and every dollar left unspent at death is a vote for a future self who will never arrive.
- Lens: temporal economics — money as frozen life-time with an expiry date printed on your body.

COLD OPEN (0:00-0:25, mid-thought, no greeting): "The richest corpse in the cemetery won nothing — every dollar you die with is a surf trip, a sabbatical, a dinner with your kid at age nine that you refused to buy while your knees still worked."

SETUP: Bill Perkins — energy trader, poker player, high-stakes optimizer — watching rich friends die with eight figures and starved memories. The stakes: a generation told to save, compound, and die "responsible" is sleepwalking into the only bankruptcy that matters — outliving your health with a full bank account.

BEATS (4-6 min each — develop each fully before moving on):
1. THE AUTOPSY OF A RICH CORPSE: Dying with millions is not discipline, it is miscalculation. Perkins opens with elderly savers who won the money game and lost the life game. Why does our culture treat a fat estate as success and a zero balance at 90 as shame?
2. MEMORY DIVIDENDS: An experience at 30 pays you at 60 — the story compounds every time you retell it. A cheap backpacking month with friends out-yields a luxury cruise at 75 you barely remember. Why does the brain pay interest on early memories and almost nothing on late ones?
3. TIME BUCKETS: Your life is three health windows — go-go, slow-go, no-go — and every experience has an expiry date. Ski Japan at 35 or never; bring the kids to Disney at 8 or the window shuts forever. Map adventures to the bucket where your body can still cash the check.
4. PEAK NET WORTH & THE DRAWDOWN CURVE: Your fortune should rise, crest around middle age, then deliberately fall toward zero — not climb until the funeral. Spend down on purpose, front-load the big experiences, stop insuring a 100-year-old self who may never exist.
5. PRICING FEAR: Over-saving is buying insurance at a brutal markup. Annuities, late-life buffers, "just one more year" of work — Perkins prices the fear of running out against the certainty of running out of time. When does caution stop protecting you and start robbing you?
6. GIVE IT WHILE THEY CAN USE IT: An inheritance at 60 is a refund on a life already lived; the same money at 28 buys a down payment, a career risk, grandkids you actually meet. Give to kids in their late 20s and 30s, fund charity while you can watch it work — don't mail checks from the grave.
7. HEALTHSPAN IS THE WALLET: Health is the exchange rate between dollars and joy. Exercise, sleep, and bold mid-life breaks (mini-retirements, sabbaticals) aren't costs — they extend the years your money still converts. A 50-year-old who invested in knees buys more life per dollar than a 70-year-old with twice the savings.
8. SPEND WITH AUDACITY: Take the trip, quit for six months, bet on the experience while the odds — youth, energy, free time — are in your favor. Perkins calls it maximizing lifetime fulfillment points, not net worth points. What is one "irresponsible" experience you keep postponing until the bucket expires?

COUNTERPOINT: Does the zero curve assume too much — a high earner's surplus, predictable health, no disabled child or broke parent to support? For median earners and longevity outliers, is "die with zero" reckless advice dressed as liberation, and does Perkins underprice real ruin risk?

CLOSER: In the end wealth is not what you die with — it is what you managed to convert into memory before your body revoked the currency. Die with zero dollars and a full ledger of dividends, or die rich and admit you never spent your life at all.

DEPTH ENGINE (run on EVERY beat):
a) Drop us into an everyman scene in present tense with one sensory detail; voice the people;
b) Land the point ("here's what this means for your money and your calendar");
c) Add a second concrete case, tradeoff, or number from the book;
d) Take an honest "wait — but then..." turn where the two hosts clash;
e) Anchor back to the phrase: "convert money into memory before the window closes."

LENGTH: Target 45-60 minutes, minimum 45. Never pad or repeat; earn time through sharper tradeoffs, harder objections, and genuine disagreement.

HARD RULES: English only. Strictly facts from the book. Never mention "sources", "documents", "notebook", or AI. No greetings, no generic praise. Stay in character as two people obsessed with spending life well.
```

---
## Sonraki adımlar
1. Sesi indir → `public/audio/die-with-zero.m4a` (veya .mp3)
2. Videoyu YouTube'a (unlisted) yükle → otomatik altyazıyı **kelime zaman damgalı VTT** olarak indir → `public/captions/die-with-zero.vtt`
3. Tek komut:
```
node scripts/make-book.js --slug=die-with-zero --title="Die with Zero: Getting All You Can from Your Money and Your Life" --author="Bill Perkins" --genre=nonfiction
```
