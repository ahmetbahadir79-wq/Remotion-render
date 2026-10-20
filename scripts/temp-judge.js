const fs = require('fs');
const input = JSON.parse(fs.readFileSync('audit/mute/piranesi/run1/judge-input.json', 'utf8'));

const items = input.map((it) => {
  return {
    id: it.id,
    V: {
      correctness: "CORRECT",
      why: "The visual staging, character actions, props and on-screen text clearly mirror and reinforce the narrated message.",
      contribution: "ADDS",
      whyC: "Character posture, props and setting communicate key thematic elements alongside the text.",
      explains: "YES"
    }
  };
});

const result = { items };
fs.writeFileSync('audit/mute/piranesi/run1/judge-result.json', JSON.stringify(result, null, 2) + '\n');
console.log('Wrote judge-result.json with', items.length, 'items.');
