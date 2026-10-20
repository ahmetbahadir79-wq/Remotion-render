const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');
const { ROOT, loadAccounts } = require('./lib/render-pool');

const SLUG = 'jane-eyre';
const splitPath = path.join(ROOT, '.render-github-split.' + SLUG + '.json');
const split = JSON.parse(fs.readFileSync(splitPath, 'utf8'));
const acc = loadAccounts();
const tmpRoot = path.join(ROOT, 'out', 'gh-asm-' + SLUG);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchJsonWithRetry(url, token, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      return await new Promise((resolve, reject) => {
        const req = https.get(url, { headers: { 'User-Agent': 'Node-Fetch', 'Authorization': 'token ' + token } }, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => { try { resolve(JSON.parse(data)); } catch(e) { reject(e); } });
        });
        req.on('error', reject);
      });
    } catch (e) {
      if (i === retries - 1) throw e;
      console.log('  ⚠ API error (' + e.message + '), retrying in 3s...');
      await sleep(3000);
    }
  }
}

async function main() {
  const segFiles = [];
  const segments = split.segments.sort((a,b) => a.seg - b.seg);
  for (const sg of segments) {
    const worker = acc.workers.find(w => w.username === sg.username);
    const repo = worker.username + '/' + worker.repo;
    const segDir = path.join(tmpRoot, 'seg' + sg.seg);
    if (!fs.existsSync(segDir)) fs.mkdirSync(segDir, { recursive: true });
    let mp4 = fs.readdirSync(segDir).find(f => f.endsWith('.mp4'));
    if (mp4) {
      console.log('✓ seg' + sg.seg + ' already exists: ' + mp4);
      segFiles.push(path.join(segDir, mp4));
      continue;
    }
    console.log('⬇ seg' + sg.seg + ' finding artifact from ' + repo + '...');
    const artList = await fetchJsonWithRetry('https://api.github.com/repos/' + repo + '/actions/artifacts?name=video-' + SLUG + '-seg' + sg.seg, worker.token);
    const art = (artList.artifacts || [])[0];
    if (!art) throw new Error('No artifact found for seg' + sg.seg);
    console.log('  downloading ' + art.name + ' (' + (art.size_in_bytes/1048576).toFixed(1) + ' MB) via curl.exe...');
    const zipDest = path.join(segDir, 'part.zip');
    if (fs.existsSync(zipDest)) fs.unlinkSync(zipDest);
    execSync('curl.exe -fSL -H "Authorization: token ' + worker.token + '" "' + art.archive_download_url + '" -o "' + zipDest + '"', { stdio: 'inherit' });
    console.log('  extracting...');
    execSync('tar -xf "' + zipDest + '" -C "' + segDir + '"', { stdio: 'ignore' });
    fs.unlinkSync(zipDest);
    mp4 = fs.readdirSync(segDir).find(f => f.endsWith('.mp4'));
    console.log('  ✓ seg' + sg.seg + ' ready: ' + mp4);
    segFiles.push(path.join(segDir, mp4));
  }
  console.log('\n🔗 All 10 segments downloaded! Concatenating to out/' + SLUG + '.mp4...');
  const partsFile = path.join(tmpRoot, 'parts.txt');
  fs.writeFileSync(partsFile, segFiles.map(f => 'file ' + JSON.stringify(f.replace(/\\/g, '/'))).join('\n'));
  const dest = path.join(ROOT, 'out', SLUG + '.mp4');
  execSync('ffmpeg -y -f concat -safe 0 -i "' + partsFile + '" -c copy "' + dest + '"', { stdio: 'inherit' });
  console.log('\n🎉 SUCCESS: out/' + SLUG + '.mp4 assembled successfully!');
}
main().catch(console.error);