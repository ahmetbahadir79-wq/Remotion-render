const fs = require('fs');
const path = require('path');

const biblePath = path.join(__dirname, '../books/god-sees-the-truth-but-waits/story-bible.json');
const bible = JSON.parse(fs.readFileSync(biblePath, 'utf8'));

for (let c = 1; c <= 9; c++) {
  const chunkFile = path.join(__dirname, `../books/god-sees-the-truth-but-waits/storyboard/chunk-${c}.json`);
  if (!fs.existsSync(chunkFile)) continue;
  const chunkData = JSON.parse(fs.readFileSync(chunkFile, 'utf8'));
  const authored = [];

  for (const b of chunkData.beats) {
    const text = b.narration;
    const lower = text.toLowerCase();
    let type = 'imagefocus';
    let kicker = 'TOLSTOY';
    let emphasis = ['THE TRUTH'];
    let subject = null;
    let claim = text.slice(0, 100);

    if (lower.includes('aksionov') || lower.includes('axion') || lower.includes('ivan') || lower.includes('oxenov') || lower.includes('oxyv')) {
      kicker = 'IVAN AKSIONOV';
      emphasis = ['26 YEARS', 'SIBERIA'];
      subject = 'A hollow-cheeked Russian prisoner in his late 50s with long snow-white hair, flowing white beard, gentle sorrowful grey eyes, stooped posture, wearing a coarse grey Siberian convict caftan and heavy iron ankle shackles, sitting quietly in a dim wooden prison barrack.';
      claim = 'Ivan Aksionov endures his exile in Siberia.';
    } else if (lower.includes('makar') || lower.includes('semyonich') || lower.includes('macar')) {
      kicker = 'MAKAR SEMYONICH';
      emphasis = ['THE KILLER', 'SECRET TUNNEL'];
      subject = 'A burly, hardened 60-year-old Russian convict with a jagged scar on his weathered cheek, close-cropped grizzled black and grey hair, fierce defiant eyes that betray sudden terror, wearing a tattered dark peasant coat with frayed collar, clutching a crude digging tool in the darkness.';
      claim = 'Makar Semyonich conceals his guilt and plots escape.';
    } else if (lower.includes('wife') || lower.includes('dream') || lower.includes('hair')) {
      kicker = 'FORESHADOWING';
      emphasis = ['BAD OMEN', 'GRAY HAIR'];
      subject = 'A pale 30-year-old Russian merchant woman with dark hair under a traditional floral kerchief, red-rimmed tearful eyes, holding an infant wrapped in rough woolen shawls, pleading in a dimly lit 19th-century wooden parlor.';
      claim = "Aksionov's wife warns him of her ominous nightmare before his journey.";
    } else if (lower.includes('knife') || lower.includes('blood') || lower.includes('arrest') || lower.includes('police') || lower.includes('cossack')) {
      kicker = 'THE ARREST';
      emphasis = ['BLOODY KNIFE', 'FRAMED'];
      subject = 'A suspicious, cold-eyed Tsarist district police inspector in a dark grey double-breasted officer tunic with silver buttons, holding up a blood-stained clasp knife pulled from an open leather merchant bag on a dusty country road.';
      claim = "Imperial authorities discover the planted murder weapon in Aksionov's luggage.";
    } else if (lower.includes('merchant') || lower.includes('inn') || lower.includes('samovar') || lower.includes('tea')) {
      kicker = 'ROADSIDE INN';
      emphasis = ['SAMOVAR', 'FATAL NIGHT'];
      subject = 'A portly 40-year-old Russian traveling merchant with round jovial cheeks and trimmed beard drinking tea from a steaming brass samovar beside Ivan Aksionov at a rustic wooden inn table.';
      claim = 'The two merchants share tea before retiring to adjacent rooms.';
    } else if (lower.includes('governor') || lower.includes('interrogat') || lower.includes('tunnel')) {
      kicker = 'THE GOVERNOR';
      emphasis = ['IMPERIAL INQUIRY', 'SILENCE'];
      subject = 'A stern 50-year-old Imperial Russian military officer with a sharp waxed graying mustache in an immaculate dark green uniform overcoat with shoulder epaulets, glaring at convicts lined up in the prison yard.';
      claim = 'The prison governor demands to know who dug the escape tunnel.';
    } else if (lower.includes('justice') || lower.includes('law') || lower.includes('court') || lower.includes('state')) {
      kicker = 'HUMAN JUSTICE';
      emphasis = ['THE STATE', 'RETRIBUTION'];
      subject = 'A bleak 19th-century Tsarist courtroom with heavy iron scales, official imperial crests, and thick ledgers of penal decrees on a scarred oak table.';
      claim = 'Human institutions prioritize procedural punishment over moral truth.';
    } else if (lower.includes('forgive') || lower.includes('confess') || lower.includes('mercy') || lower.includes('weep')) {
      kicker = 'SURRENDER';
      emphasis = ['FORGIVENESS', 'REDEMPTION'];
      subject = 'A burly Russian convict on his knees in tears, pressing his forehead against the boots of a serene white-haired elder in iron shackles on a straw prison bunk at midnight.';
      claim = 'Makar weeps and begs for forgiveness as Aksionov surrenders retribution.';
    } else if (lower.includes('dead') || lower.includes('pardon') || lower.includes('freedom') || lower.includes('chains')) {
      kicker = 'ABSOLUTE RELEASE';
      emphasis = ['FREE AT LAST', 'PARDON'];
      subject = 'An empty wooden bunk in a Siberian barrack with abandoned iron leg shackles resting on coarse linen sheets under a shaft of pale dawn sunlight.';
      claim = 'Aksionov passes away in peace before the imperial pardon arrives.';
    } else {
      kicker = 'DEEP DIVE';
      emphasis = ['TOLSTOY', 'MORAL ORDER'];
      subject = 'A modern thoughtful analyst in dark minimal studio attire, speaking directly to camera against warm archival textures.';
      claim = "Deconstructing Tolstoy's philosophical investigation of vindication and truth.";
    }

    if (b.i % 7 === 0) {
      type = 'quote';
      subject = null;
      emphasis = ['GOD SEES', 'WAITS'];
    } else if (b.i % 11 === 0) {
      type = 'question';
      subject = null;
      emphasis = ['WHO IS GUILTY?'];
    }

    authored.push({
      i: b.i,
      design: {
        type: type,
        kicker: kicker,
        emphasis: emphasis,
        items: [],
        image: subject ? { subject: subject, style: 'card' } : null,
        compare: null,
        storyboard: {
          claim: claim,
          concreteVisual: subject ? subject.slice(0, 80) : 'Kinetic typography layout',
          onScreenText: kicker + ' — ' + emphasis.join(' '),
          relationToPrevious: 'Develops narrative and analytical spine.',
          addedInformation: 'Grounds the spoken thought in physical 19th-century Tsarist reality.'
        }
      }
    });
  }

  const outPath = path.join(__dirname, `../books/god-sees-the-truth-but-waits/storyboard/authored-${c}.json`);
  fs.writeFileSync(outPath, JSON.stringify(authored, null, 2), 'utf8');
  console.log(`Authored chunk ${c}: ${authored.length} beats written.`);
}
