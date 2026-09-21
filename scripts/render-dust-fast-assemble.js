const fs = require('fs');
const path = require('path');
const { spawn, spawnSync, execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SLUG = 'dust';
const splitFile = path.join(ROOT, `.render-github-split.${SLUG}.json`);
const accFile = path.join(ROOT, 'render-accounts.json');

if (!fs.existsSync(splitFile)) {
  console.error(`Split file not found: ${splitFile}`);
  process.exit(1);
}

const split = JSON.parse(fs.readFileSync(splitFile, 'utf8'));
const acc = JSON.parse(fs.readFileSync(accFile, 'utf8'));

const outDir = path.join(ROOT, 'out', `gh-asm-${SLUG}`);
fs.mkdirSync(outDir, { recursive: true });

function verifyMp4(filePath) {
  if (!fs.existsSync(filePath)) return { ok: false, dur: 0 };
  const probe = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', filePath], { encoding: 'utf8' });
  const dur = parseFloat((probe.stdout || '').trim());
  if (!Number.isFinite(dur) || dur <= 0.1) return { ok: false, dur: 0 };
  const dec = spawnSync('ffmpeg', ['-v', 'error', '-t', '5', '-i', filePath, '-f', 'null', '-'], { encoding: 'utf8' });
  return { ok: dec.status === 0, dur };
}

async function getBlobUrlWithRetry(repo, artifactId, token, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}/actions/artifacts/${artifactId}/zip`, {
        headers: {
          'Authorization': `token ${token}`,
          'User-Agent': 'Remotion-Fast-Assembler',
          'Accept': 'application/vnd.github+json'
        },
        redirect: 'manual'
      });
      const loc = res.headers.get('location');
      if (loc) return loc;
    } catch (e) {
      if (attempt === maxRetries) throw e;
      await new Promise(r => setTimeout(r, 2000 * attempt));
    }
  }
  throw new Error(`Failed to get blob URL for artifact ${artifactId}`);
}

function runCurlAsync(blobUrl, zipDest) {
  return new Promise((resolve, reject) => {
    const cp = spawn('curl.exe', [
      '-L',
      '--retry', '5',
      '--retry-delay', '2',
      '--retry-all-errors',
      '-s',
      '-o', zipDest,
      blobUrl
    ], { stdio: 'ignore' });
    cp.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`curl exited with code ${code}`));
    });
    cp.on('error', reject);
  });
}

function runTarAsync(zipDest, extractDir) {
  return new Promise((resolve, reject) => {
    const cp = spawn('tar', ['-xf', zipDest, '-C', extractDir], { stdio: 'ignore' });
    cp.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`tar exited with code ${code}`));
    });
    cp.on('error', reject);
  });
}

async function downloadSegment(sg) {
  const mp4Dest = path.join(outDir, `seg${sg.seg}.mp4`);
  
  // Check if already downloaded and valid
  const check = verifyMp4(mp4Dest);
  if (check.ok) {
    console.log(`✓ seg${sg.seg} already downloaded and verified (${(check.dur / 60).toFixed(1)} min)`);
    return mp4Dest;
  }

  const worker = acc.workers.find(w => w.username === sg.username);
  if (!worker) throw new Error(`Worker not found: ${sg.username}`);

  const repo = `${worker.username}/${worker.repo}`;
  const artifactId = sg.artifactId;
  const zipDest = path.join(outDir, `seg${sg.seg}.zip`);
  const extractDir = path.join(outDir, `extract-seg${sg.seg}`);

  console.log(`[seg${sg.seg}] Getting download URL for ${repo}...`);

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      fs.rmSync(zipDest, { force: true });
      fs.rmSync(extractDir, { recursive: true, force: true });

      const blobUrl = await getBlobUrlWithRetry(repo, artifactId, worker.token);

      console.log(`[seg${sg.seg}] Downloading (attempt ${attempt}/3)...`);
      const t0 = Date.now();

      await runCurlAsync(blobUrl, zipDest);

      if (!fs.existsSync(zipDest) || fs.statSync(zipDest).size < 1000) {
        throw new Error(`Downloaded zip is missing or too small`);
      }

      const dlSec = ((Date.now() - t0) / 1000).toFixed(1);
      console.log(`[seg${sg.seg}] Downloaded in ${dlSec}s (${(fs.statSync(zipDest).size / 1e6).toFixed(1)} MB). Extracting...`);

      fs.mkdirSync(extractDir, { recursive: true });
      await runTarAsync(zipDest, extractDir);

      const entries = fs.readdirSync(extractDir);
      const mp4File = entries.find(f => f.toLowerCase().endsWith('.mp4'));
      if (!mp4File) throw new Error(`No mp4 file found in extracted zip for seg${sg.seg}`);

      fs.copyFileSync(path.join(extractDir, mp4File), mp4Dest);
      fs.rmSync(zipDest, { force: true });
      fs.rmSync(extractDir, { recursive: true, force: true });

      const v = verifyMp4(mp4Dest);
      if (!v.ok) throw new Error(`seg${sg.seg} failed ffprobe/ffmpeg decode check`);

      console.log(`✓ seg${sg.seg} verified (${(v.dur / 60).toFixed(1)} min)`);
      return mp4Dest;
    } catch (err) {
      console.warn(`⚠ seg${sg.seg} attempt ${attempt} failed: ${err.message}`);
      if (attempt === 3) throw err;
      await new Promise(r => setTimeout(r, 3000 * attempt));
    }
  }

  throw new Error(`seg${sg.seg} could not be downloaded`);
}

async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = [];
  const executing = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);
    if (poolLimit <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}

async function main() {
  console.log(`=== Fast Assembler for ${SLUG} ===`);
  const segments = [...split.segments].sort((a, b) => a.seg - b.seg);

  console.log(`Starting parallel download of ${segments.length} segments (concurrency: 3)...`);
  const tTotal = Date.now();

  const segFiles = await asyncPool(3, segments, downloadSegment);

  console.log(`\nAll ${segFiles.length} segments downloaded and verified in ${((Date.now() - tTotal) / 1000).toFixed(1)}s!`);

  // Concat
  const partsFile = path.join(outDir, 'parts.txt');
  fs.writeFileSync(partsFile, segFiles.map(f => `file '${f.replace(/\\/g, '/')}'`).join('\n'));

  const finalDest = path.join(ROOT, 'out', `${SLUG}.mp4`);
  console.log(`\nConcatenating segments into ${finalDest}...`);
  execSync(`ffmpeg -y -f concat -safe 0 -i "${partsFile}" -c copy "${finalDest}"`, { stdio: 'inherit' });

  // Verify final video
  console.log('\nVerifying final output...');
  const probe = execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${finalDest}"`, { encoding: 'utf8' });
  const durSec = parseFloat(probe.trim());
  const durMin = (durSec / 60).toFixed(2);

  execSync(`ffmpeg -v error -t 6 -i "${finalDest}" -f null -`);
  execSync(`ffmpeg -v error -sseof -6 -i "${finalDest}" -f null -`);

  const stat = fs.statSync(finalDest);
  console.log(`\n🎉 SUCCESS!`);
  console.log(`File: out/${SLUG}.mp4`);
  console.log(`Size: ${(stat.size / (1024 * 1024)).toFixed(1)} MB`);
  console.log(`Duration: ${durMin} minutes (${durSec.toFixed(1)} seconds)`);
  console.log(`Head & tail 6s decode verified clean.`);
}

main().catch(err => {
  console.error('Assemble failed:', err);
  process.exit(1);
});
