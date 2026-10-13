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

function streamDownload(url, dest, token) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Node-Fetch', 'Authorization': 'token ' + token } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (sres) => {
          if (sres.statusCode !== 200) return reject(new Error('Storage status ' + sres.statusCode));
          const file = fs.createWriteStream(dest);
          sres.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
          file.on('error', err => { fs.unlink(dest, () => {}); reject(err); });
        }).on('error', reject);
      } else {
        reject(new Error('Expected redirect, got ' + res.statusCode));
      }
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
    console.log('⬇ seg' + sg.seg + ' fetching artifact from ' + repo + '...');
    const artList = await fetchJson('https://api.github.com/repos/' + repo + '/actions/artifacts?name=video-' + SLUG + '-seg' + sg.seg, worker.token);
    const art = (artList.artifacts || [])[0];
    if (!art) throw new Error('No artifact found for seg' + sg.seg);
    console.log('  downloading ' + art.name + ' (' + (art.size_in_bytes/1048576).toFixed(1) + ' MB)...');
    const zipDest = path.join(segDir, 'part.zip');
    if (fs.existsSync(zipDest)) fs.unlinkSync(zipDest);
    await streamDownload(art.archive_download_url, zipDest, worker.token);
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