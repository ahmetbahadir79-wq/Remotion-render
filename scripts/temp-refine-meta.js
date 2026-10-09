const fs = require('fs');
const meta = JSON.parse(fs.readFileSync('books/piranesi/youtube-meta.json', 'utf8'));

meta.titles = [
  'Why Piranesi Chose The Labyrinth (Susanna Clarke Explained)',
  'Piranesi Explained: The Ending Everyone Gets Wrong',
  'What Susanna Clarke’s Piranesi Is Really Telling Us',
  'Piranesi (Susanna Clarke) — Full Summary & Deep Analysis',
  'The Meaning Behind The Infinite House in Piranesi',
];

meta.thumbnail.hook = 'WHY HE STAYED';

meta.chapters = [
  { t: 0, label: 'The Paradox of Captivity' },
  { t: 151, label: 'Mapping the Tides & Solitude' },
  { t: 252, label: 'A State of Pure Reverence' },
  { t: 412, label: 'The Arrival of The Other' },
  { t: 568, label: 'A Dangerous Distortion of Reality' },
  { t: 722, label: 'Uncovering Forgotten Journals' },
  { t: 877, label: 'Who Is Matthew Rose Sorensen?' },
  { t: 957, label: 'The Sinister Experiment of Arne-Sayles' },
  { t: 1114, label: 'The Confrontation in the Drowned Halls' },
  { t: 1265, label: 'A Flood of Truth and Memory' },
  { t: 1315, label: 'The Rescue by Raphael' },
  { t: 1468, label: 'Living Between Two Worlds' },
  { t: 1622, label: 'The Final Verdict on The House' },
];

const chapterLines = meta.chapters
  .map((c) => {
    const m = Math.floor(c.t / 60);
    const s = String(c.t % 60).padStart(2, '0');
    return `${m}:${s} ${c.label}`;
  })
  .join('\n');

meta.description = `Why would a captive choose reverence over revenge? Susanna Clarke's masterpiece "Piranesi" explores isolation, sanity, and the sacred beauty of being lost.

In this complete breakdown of Piranesi by Susanna Clarke, we analyze the architecture of the infinite House, the dark secrets of Ketterley and Laurence Arne-Sayles, and the profound tragedy of Matthew Rose Sorensen.

⏱️ Chapters:
${chapterLines}

🔔 Subscribe for in-depth literary analyses and book breakdowns.

#Piranesi #SusannaClarke #BookSummary #BookAnalysis #BookTube`;

meta.needsClaudeRefine = false;
meta.metaSource = 'claude-refined';
meta.generatedAt = new Date().toISOString();

fs.writeFileSync('books/piranesi/youtube-meta.json', JSON.stringify(meta, null, 2) + '\n');
console.log('Successfully refined youtube-meta.json for Piranesi.');
