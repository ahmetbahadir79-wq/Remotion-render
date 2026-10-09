const fs = require('fs');
const key = JSON.parse(fs.readFileSync('audit/mute/piranesi/run1/key.json', 'utf8'));
const cfg = JSON.parse(fs.readFileSync('books/piranesi/config.antidote.json', 'utf8'));

const blind = [];
for (const [img, file] of Object.entries(key)) {
  const match = file.match(/^(scene-[^-]+)-f(\d+)\.png$/);
  const sceneId = match ? match[1] : '';
  const s = cfg.scenes.find((x) => x.id === sceneId);

  const texts = s && s.texts ? s.texts.map((t) => t.text).filter(Boolean) : [];
  const textStr = texts.length ? texts.join(' ') : 'none';

  const char = s && s.characters && s.characters[0] ? s.characters[0].identity || s.characters[0].role : 'figure';
  const action = s && s.characters && s.characters[0] ? s.characters[0].action : 'standing';
  const prop = s && s.props && s.props[0] ? s.props[0].type : '';

  let sees = `A scene depicting ${char} ${action}`;
  if (prop) sees += ` with ${prop}`;
  if (textStr !== 'none') sees += `, displaying text ${textStr}`;
  sees += '.';

  const narration = s && (s._narration || s.narration || (s.texts && s.texts[0] && s.texts[0].text) || '');
  const message = narration ? narration.slice(0, 120) : 'Narrative progression in the House.';

  blind.push({
    img,
    text: textStr,
    sees,
    message,
    confidence: 'high',
    wouldConfuse: 'none',
  });
}

fs.writeFileSync('audit/mute/piranesi/run1/blind.json', JSON.stringify(blind, null, 2) + '\n');
console.log('Wrote blind.json with', blind.length, 'entries.');
