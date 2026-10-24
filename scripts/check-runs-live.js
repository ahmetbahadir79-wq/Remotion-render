const fs = require('fs');
const { execSync } = require('child_process');

const pool = JSON.parse(fs.readFileSync('render-accounts.json', 'utf8'));

for (const acc of pool.workers) {
  try {
    const cmd = `gh run list --repo ${acc.username}/${acc.repo} --workflow render-video.yml -L 1 --json databaseId,status,conclusion,headBranch`;
    const out = execSync(cmd, { env: { ...process.env, GH_TOKEN: acc.token } }).toString();
    const runs = JSON.parse(out);
    console.log(acc.username, runs[0] ? `${runs[0].headBranch}: ${runs[0].status} (${runs[0].conclusion || 'running'})` : 'no runs');
  } catch (e) {
    console.log(acc.username, 'error checking');
  }
}
