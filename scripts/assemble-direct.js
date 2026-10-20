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

function downloadUrl(url, dest, token) {
  return new Promise((resolve, reject) => {
    const headers = { 'User-Agent': 'Node-Fetch' };
    if (token && url.includes('api.github.com')) headers['Authorization'] = 'token ' + token;
    https.get(url, { headers }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadUrl(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
      file.on('error', (err) => { fs.unlink(dest, () => {}); reject(err); });
    }).on('error', reject);
  });
}

function fetchJson(url, token) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Node-Fetch', 'Authorization': 'token ' + token } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch(e) { reject(e); } });
    }).on('error', reject);
  });
}

async function run() {
  const segFiles = [];
  const segments = split.segments.sort((a,b) => a.seg - b.seg);
  for (const sg of segments) {
    const worker = acc.workers.find(w => w.username === sg.username);
    const repo = worker.username + '/' + worker.repo;
    const segDir = path.join(tmpRoot, 'seg' + sg.seg);
    if (!fs.existsSync(segDir)) fs.mkdirSync(segDir, { recursive: true });
    const existing = fs.readdirSync(segDir).find(f => f.endsWith('.mp4'));
    if (existing) {
      console.log('✓ seg' + sg.seg + ' already exists: ' + existing);
      segFiles.push(path.join(segDir, existing));
      continue;
    }
    console.log('Fetching seg' + sg.seg + ' from ' + repo + '...');
    const artList = await fetchJson('https://api.github.com/repos/' + repo + '/actions/artifacts?name=video-' + SLUG + '-seg' + sg.seg, worker.token);
    const art = (artList.artifacts || [])[0];
    if (!art) throw new Error('No artifact for seg' + sg.seg);
    console.log('Downloading ' + art.name + '...');
    const zipPath = path.join(segDir, 'artifact.zip');
    await downloadUrl(art.archive_download_url, zipPath, worker.token);
    console.log('Extracting seg' + sg.seg + '...');
    execSync('tar -xf "' + zipPath + '" -C "' + segDir + '"', { stdio: 'ignore' });
    fs.unlinkSync(zipPath);
    const mp4 = fs.readdirSync(segDir).find(f => f.endsWith('.mp4'));
    console.log('✓ seg' + sg.seg + ' ready: ' + mp4);
    segFiles.push(path.join(segDir, mp4));
  }
  console.log('\nAll segments ready! Concatenating...');
  const partsFile = path.join(tmpRoot, 'parts.txt');
  fs.writeFileSync(partsFile, segFiles.map(f => 'file ' + JSON.stringify(f.replace(/\\/g, '/'))).join('\n'));
  const dest = path.join(ROOT, 'out', SLUG + '.mp4');
  execSync('ffmpeg -y -f concat -safe 0 -i "' + partsFile + '" -c copy "' + dest + '"', { stdio: 'inherit' });
  console.log('\n🎉 SUCCESS: out/' + SLUG + '.mp4 created!');
}
run().catch(console.error);