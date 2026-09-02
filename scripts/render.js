#!/usr/bin/env node
/**
 * 🎬 UNIFIED REMOTION RENDER ORCHESTRATOR
 *
 * Desteklenen Yöntemler (--method):
 *   1. local  (VARSAYILAN / DEFAULT) -> Yerelde mikro-chunk'lar ile güvenli render + otomatik FFmpeg birleştirme.
 *   2. lambda                         -> AWS Remotion Lambda üzerinden render (uzun videolarda segmentleme desteği).
 *   3. github                         -> GitHub Actions workflow'unu tetikler (UI veya `gh` CLI).
 *
 * Kullanım:
 *   node scripts/render.js --slug=sway                                 (Varsayılan: local chunk render)
 *   node scripts/render.js --slug=sway --method=local --concurrency=5
 *   node scripts/render.js --slug=sway --method=lambda
 *   node scripts/render.js --slug=sway --method=github
 *   node scripts/render.js --config=books/sway/config.vox.json
 */

const { spawnSync, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ENTRY = "src/index.ts";

// ── Argument Parsing ────────────────────────────────────────────────────────
const args = {};
process.argv.slice(2).forEach((arg) => {
  if (arg.startsWith("--")) {
    const [k, ...v] = arg.replace(/^--/, "").split("=");
    args[k] = v.length > 0 ? v.join("=") : true;
  }
});

if (args.help || args.h) {
  printHelp();
  process.exit(0);
}

function printHelp() {
  console.log(`
🎬 Remotion Unified Render CLI

Kullanım:
  node scripts/render.js [SEÇENEKLER]

Seçenekler:
  --slug=<slug>               Kitap / proje slug'ı (örn: sway, single-dad-dilemma)
  --config=<dosya>            Özel config json yolu (örn: books/sway/config.vox.json)
  --composition=<id>          Özel composition id (örn: Vox-sway, Antidote-clear-thinking)
  --method=<yöntem>           Render yöntemi: local | lambda | github (VARSAYILAN: local)
  --chunk-size=<sayı>         Her chunk'taki frame sayısı (local için, varsayılan: 400)
  --concurrency=<sayı>        Eşzamanlı render worker sayısı (local için, varsayılan: 4 veya render.concurrency)
  --frames=<başla-bitir>      Belirli frame aralığını render et (örn: 0-1999)
  --region=<aws-region>       AWS Lambda region (lambda için, varsayılan: us-east-1)
  --site-name=<site>          Önceden oluşturulmuş lambda site adı
  --help, -h                  Bu yardım mesajını gösterir
`);
}

// ── Configuration & Metadata Resolution ─────────────────────────────────────
let slug = args.slug;
let configFile = args.config;
let composition = args.composition;
const method = (args.method || "local").toLowerCase();

// If config path given without slug, extract slug
if (configFile && !slug) {
  const match = configFile.match(/books\/([^/]+)/);
  if (match) slug = match[1];
}

// If slug given without config, find config
if (slug && !configFile) {
  const cands = [
    `books/${slug}/config.vox.json`,
    `books/${slug}/config.antidote.json`,
    `configs/${slug}.json`,
  ];
  for (const c of cands) {
    if (fs.existsSync(path.join(ROOT, c))) {
      configFile = c;
      break;
    }
  }
}

// Default fallback if nothing specified
if (!configFile && !composition) {
  const defaultSlug = "single-dad-dilemma";
  const defPath = `books/${defaultSlug}/config.vox.json`;
  if (fs.existsSync(path.join(ROOT, defPath))) {
    slug = defaultSlug;
    configFile = defPath;
  } else {
    console.error("❌ Hata: Render edilecek bir --slug veya --config belirtilmedi.");
    printHelp();
    process.exit(1);
  }
}

let configData = null;
if (configFile && fs.existsSync(path.join(ROOT, configFile))) {
  try {
    configData = JSON.parse(fs.readFileSync(path.join(ROOT, configFile), "utf8"));
  } catch (e) {
    console.warn(`⚠ Config dosyası okunamadı: ${configFile} (${e.message})`);
  }
}

const meta = configData?.meta || {};
const engine = configData?.engine || (meta.totalFrames ? "vox" : meta.durationInFrames ? "antidote" : "vox");
if (!composition) {
  composition =
    configData?.compositionId ||
    (slug ? `${engine === "antidote" ? "Antidote" : "Vox"}-${slug}` : "Generic-Book-Summary");
}
if (!slug && meta.slug) slug = meta.slug;
if (!slug) slug = composition.toLowerCase();

const totalFrames =
  configData?.totalFrames ||
  meta.totalFrames ||
  meta.durationInFrames ||
  (configData?.beats ? configData.beats.reduce((acc, b) => acc + (b.durationInFrames || b.frames || 0), 0) : 10000);

const chunkSize = Number(args["chunk-size"]) || 400;
const finalOutPath = path.join(ROOT, "out", `${slug}.mp4`);

// Concurrency resolution
const CONC_FILE = path.join(ROOT, "render.concurrency");
function getConcurrency() {
  try {
    if (fs.existsSync(CONC_FILE)) {
      const n = Number(String(fs.readFileSync(CONC_FILE, "utf8")).trim());
      if (n >= 1) return n;
    }
  } catch {}
  return Number(args.concurrency || process.env.RENDER_CONCURRENCY || 4);
}

console.log("\n🎬 ═══════════════════════════════════════════════════════════════");
console.log(`   REMOTION RENDER ORCHESTRATOR`);
console.log(`   Slug        : ${slug}`);
console.log(`   Composition : ${composition}`);
console.log(`   Engine      : ${engine.toUpperCase()}`);
console.log(`   Toplam Frame: ${totalFrames}`);
console.log(`   Yöntem      : ${method.toUpperCase()}${!args.method ? " (Varsayılan: local)" : ""}`);
console.log("═════════════════════════════════════════════════════════════════\n");

// ── Execution Router ────────────────────────────────────────────────────────
switch (method) {
  case "local":
    runLocalRender();
    break;
  case "lambda":
    runLambdaRender();
    break;
  case "github":
  case "actions":
  case "github-actions":
    runGithubActionsRender();
    break;
  default:
    console.error(`❌ Geçersiz render yöntemi: "${method}". Seçenekler: local, lambda, github`);
    process.exit(1);
}

// ═════════════════════════════════════════════════════════════════════════════
// 1. LOCAL CHUNK RENDERING (DEFAULT)
// ═════════════════════════════════════════════════════════════════════════════
function runLocalRender() {
  const outChunksDir = path.join(ROOT, `out_${composition}_chunks`.replace(/ /g, "_"));
  fs.mkdirSync(outChunksDir, { recursive: true });
  fs.mkdirSync(path.join(ROOT, "out"), { recursive: true });

  const startFrame = args.frames ? Number(args.frames.split("-")[0]) : 0;
  const endFrame = args.frames ? Number(args.frames.split("-")[1]) : totalFrames - 1;
  const numChunks = Math.ceil((endFrame - startFrame + 1) / chunkSize);

  console.log(`[LOCAL] Mikro-chunk render başlıyor...`);
  console.log(`  Hedef Dizin : ${outChunksDir}`);
  console.log(`  Chunk Sayısı: ${numChunks} (${chunkSize} frame/chunk)`);
  console.log(`  Frame Aralığı: ${startFrame} - ${endFrame}`);
  console.log(`  Concurrency : ${getConcurrency()}\n`);

  let chunkIdx = 1;
  for (let s = startFrame; s <= endFrame; s += chunkSize) {
    const e = Math.min(s + chunkSize - 1, endFrame);
    const chunkFile = path.join(outChunksDir, `chunk-${String(chunkIdx).padStart(4, "0")}.mp4`);

    if (fs.existsSync(chunkFile) && verifyChunkFile(chunkFile)) {
      // Chunk geçerli ve mevcut -> atla
    } else {
      console.log(`[${new Date().toLocaleTimeString()}] Chunk ${chunkIdx}/${numChunks} render ediliyor (Frame ${s} - ${e})...`);
      const conc = getConcurrency();
      const isVoxOrAntidote = !!(meta && meta.slug);
      const propsFlag = isVoxOrAntidote || !configFile ? "" : `--props="${configFile}"`;
      const cmd = `npx remotion render ${ENTRY} ${composition} "${chunkFile}" --frames=${s}-${e} ${propsFlag} --concurrency=${conc} --puppeteer-timeout=90000 --timeout=180000`;

      let retries = 3;
      let ok = false;
      while (!ok && retries > 0) {
        try {
          execSync(cmd, { cwd: ROOT, stdio: "inherit" });
          if (verifyChunkFile(chunkFile)) {
            ok = true;
          } else {
            throw new Error("Chunk dosyası doğrulanamadı (eksik/bozuk video akışı).");
          }
        } catch (err) {
          retries--;
          console.warn(`\n⚠ Chunk ${chunkIdx} başarısız oldu (${err.message}). Kalan deneme: ${retries}`);
          if (retries === 0) {
            console.error(`❌ Chunk ${chunkIdx} render edilemedi. İşlem durduruluyor.`);
            process.exit(1);
          }
          execSync('node -e "new Promise(r => setTimeout(r, 4000))"');
        }
      }
    }
    chunkIdx++;
  }

  // FFmpeg Concat
  console.log("\n[LOCAL] Parçalar birleştiriliyor (FFmpeg Concat)...");
  const concatList = [];
  for (let i = 1; i < chunkIdx; i++) {
    const fileName = `chunk-${String(i).padStart(4, "0")}.mp4`;
    concatList.push(`file '${fileName}'`);
  }
  const partsFile = path.join(outChunksDir, "parts.txt");
  fs.writeFileSync(partsFile, concatList.join("\n"));

  try {
    execSync(`ffmpeg -y -f concat -safe 0 -i "${partsFile}" -c copy "${finalOutPath}"`, {
      cwd: ROOT,
      stdio: "inherit",
    });
    console.log(`\n🎉 [BAŞARILI] Video oluşturuldu: ${finalOutPath}`);
  } catch (err) {
    console.error(`\n❌ FFmpeg concat birleştirme hatası: ${err.message}`);
    process.exit(1);
  }
}

function verifyChunkFile(filePath) {
  if (!fs.existsSync(filePath)) return false;
  if (fs.statSync(filePath).size < 2048) return false;
  const probe = spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", filePath], {
    encoding: "utf8",
  });
  if (probe.status !== 0) return false;
  const dur = parseFloat((probe.stdout || "").trim());
  if (!Number.isFinite(dur) || dur <= 0.1) return false;

  // Hızlı ffmpeg decode testi
  const dec = spawnSync("ffmpeg", ["-v", "error", "-i", filePath, "-f", "null", "-"], { encoding: "utf8" });
  if (dec.status !== 0 || (dec.stderr && dec.stderr.trim().length > 0)) return false;
  return true;
}

// ═════════════════════════════════════════════════════════════════════════════
// 2. AWS REMOTION LAMBDA RENDERING
// ═════════════════════════════════════════════════════════════════════════════
function runLambdaRender() {
  console.log(`[LAMBDA] AWS Remotion Lambda render akışı başlatılıyor...`);
  const region = args.region || "us-east-1";
  const siteName = args["site-name"] || `${slug}-site-${Date.now().toString().slice(-4)}`;

  // Registry güncelle
  try {
    execSync("node scripts/gen-books-registry.js", { cwd: ROOT, stdio: "inherit" });
  } catch {}

  console.log(`\n1. Lambda Site Deploy ediliyor (${siteName}, region: ${region})...`);
  try {
    execSync(`npx remotion lambda sites create ${ENTRY} --site-name=${siteName} --region=${region}`, {
      cwd: ROOT,
      stdio: "inherit",
    });
  } catch (e) {
    console.error("❌ Lambda site oluşturma başarısız. AWS kimlik bilgilerinizi (.env) kontrol edin.");
    process.exit(1);
  }

  // 15 dakikadan (22500 frame) uzun videolar için Lambda'nın 900sn orchestrator limitine takılmamak üzere segmentleme
  const SEGMENT_FRAMES = 21000;
  if (totalFrames > SEGMENT_FRAMES && !args.frames) {
    console.log(`\n2. Video uzun (${totalFrames} frames) -> 900s Lambda timeout'unu önlemek için ${Math.ceil(totalFrames / SEGMENT_FRAMES)} segmente bölünüyor...`);
    const segDir = path.join(ROOT, "out", `${slug}-segments`);
    fs.mkdirSync(segDir, { recursive: true });

    let segIndex = 1;
    const segFiles = [];
    for (let s = 0; s < totalFrames; s += SEGMENT_FRAMES) {
      const e = Math.min(s + SEGMENT_FRAMES - 1, totalFrames - 1);
      const outName = `${slug}-seg${segIndex}.mp4`;
      const segLocalPath = path.join(segDir, outName);
      segFiles.push(segLocalPath);

      console.log(`\n── Segment ${segIndex}: Frame ${s} to ${e} ──`);
      const renderCmd = `npx remotion lambda render ${siteName} ${composition} --region=${region} --codec=h264 --frames=${s}-${e} --out-name=${outName}`;
      const renderOutput = execSync(renderCmd, { cwd: ROOT, encoding: "utf8" });
      console.log(renderOutput);

      // Render ID yakala
      const renderIdMatch = renderOutput.match(/Render ID:\s*([a-zA-Z0-9_-]+)/i) || renderOutput.match(/([a-z0-9]{10,})/i);
      const renderId = renderIdMatch ? renderIdMatch[1] : null;

      if (renderId && fs.existsSync(path.join(ROOT, "scripts", "dl-render.js"))) {
        console.log(`  S3'ten indiriliyor (${renderId})...`);
        execSync(`node scripts/dl-render.js ${renderId} ${outName} "${segLocalPath}"`, {
          cwd: ROOT,
          stdio: "inherit",
        });
      }
      segIndex++;
    }

    // Segmentleri concat et
    console.log("\n3. Lambda segmentleri birleştiriliyor (FFmpeg)...");
    const segParts = path.join(segDir, "parts.txt");
    fs.writeFileSync(segParts, segFiles.map((f) => `file '${f.replace(/\\/g, "/")}'`).join("\n"));
    execSync(`ffmpeg -y -f concat -safe 0 -i "${segParts}" -c copy "${finalOutPath}"`, {
      cwd: ROOT,
      stdio: "inherit",
    });
    console.log(`\n🎉 [BAŞARILI] Lambda render tamamlandı: ${finalOutPath}`);
  } else {
    console.log(`\n2. Lambda render başlatılıyor...`);
    const framesFlag = args.frames ? `--frames=${args.frames}` : "";
    const renderCmd = `npx remotion lambda render ${siteName} ${composition} --region=${region} --codec=h264 ${framesFlag}`;
    execSync(renderCmd, { cwd: ROOT, stdio: "inherit" });
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// 3. GITHUB ACTIONS RENDERING (MULTI-WORKER SUPPORT)
// ═════════════════════════════════════════════════════════════════════════════
async function runGithubActionsRender() {
  // PRE-FLIGHT (git-aware): the runner does a fresh checkout, so every asset the
  // composition needs must be COMMITTED (not just on local disk) or it 404s there.
  // This gate is why a render can no longer be dispatched with missing/uncommitted
  // assets (the first martyr render died on an untracked shared background PNG).
  if (slug && fs.existsSync(path.join(ROOT, "scripts/verify-render-assets.js")) && !args["skip-verify"]) {
    console.log(`[GITHUB ACTIONS] Ön-kontrol (git-aware asset doğrulama)...`);
    const pf = spawnSync("node", ["scripts/verify-render-assets.js", `--slug=${slug}`], { cwd: ROOT, stdio: "inherit" });
    if (pf.status !== 0) {
      console.error(`\n❌ Ön-kontrol başarısız — render TETİKLENMEDİ. Eksik/commit'lenmemiş dosyaları ekleyip tekrar dene (veya --skip-verify).`);
      process.exit(1);
    }
  }
  console.log(`[GITHUB ACTIONS] Render Worker aranıyor...`);

  const accountsFile = path.join(ROOT, "render-accounts.json");
  let accounts = null;
  if (fs.existsSync(accountsFile)) {
    try {
      accounts = JSON.parse(fs.readFileSync(accountsFile, "utf8"));
    } catch {}
  }

  const activeWorkers = (accounts?.workers || []).filter((w) => w.active !== false && w.token);
  if (activeWorkers.length === 0) {
    console.error(`❌ render-accounts.json içinde aktif bir Render Worker bulunamadı.`);
    process.exit(1);
  }

  let worker = null;
  const requestedWorker = args.worker || args.account;

  if (requestedWorker && requestedWorker !== "auto") {
    worker = accounts?.workers?.find((w) => w.id === requestedWorker || w.username === requestedWorker || w.email === requestedWorker);
  } else {
    // Round-robin otomatik seçim
    const lastIdx = typeof accounts.lastUsedWorkerIndex === "number" ? accounts.lastUsedWorkerIndex : -1;
    const nextIdx = (lastIdx + 1) % activeWorkers.length;
    worker = activeWorkers[nextIdx];

    // Kayıt defterini güncelle
    accounts.lastUsedWorkerIndex = nextIdx;
    try {
      fs.writeFileSync(accountsFile, JSON.stringify(accounts, null, 2), "utf8");
    } catch {}
  }

  if (!worker || !worker.token) {
    console.error(`❌ Geçerli Render Worker seçilemedi. render-accounts.json dosyasını kontrol edin.`);
    process.exit(1);
  }

  console.log(`✓ Aktif Render Worker: ${worker.name || worker.id} (@${worker.username})`);
  console.log(`  Havuzdaki Konum: ${activeWorkers.findIndex(w => w.id === worker.id) + 1} / ${activeWorkers.length} worker`);
  console.log(`  Aylık Kota: ${worker.monthlyMinutes || 2000} dk`);
  console.log(`  Hedef Depo : https://github.com/${worker.username}/${worker.repo}`);
  console.log(`  Hedef Dal  : ${worker.branch || "god-mode"}\n`);

  // 1. Kodu render worker reposuna push et
  const remote = worker.remoteName || "render-worker-1";
  const branch = worker.branch || "god-mode";
  console.log(`1. Son değişiklikler Render Worker'a (${remote}/${branch}) gönderiliyor...`);
  try {
    const curBranch = execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf8" }).trim();
    execSync(`git push ${remote} ${curBranch}:${branch} --force`, {
      cwd: ROOT,
      stdio: "inherit",
      env: { ...process.env, GIT_TERMINAL_PROMPT: "0", GCM_INTERACTIVE: "never" },
    });
    console.log(`✓ Kodlar başarıyla Render Worker'a aktarıldı.`);
  } catch (err) {
    console.warn(`⚠ Git push uyarısı: ${err.message}. Mevcut kodla devam ediliyor...`);
  }

  // 2. GitHub Actions Workflow Dispatch API çağrısı
  console.log(`\n2. GitHub Actions render iş akışı tetikleniyor...`);
  const https = await import("https");
  
  const payload = JSON.stringify({
    ref: branch,
    inputs: {
      slug: slug,
      composition: composition,
      chunk_size: String(chunkSize),
      concurrency: String(args.concurrency || 2),
    },
  });

  const req = https.default.request({
    hostname: "api.github.com",
    path: `/repos/${worker.username}/${worker.repo}/actions/workflows/render-video.yml/dispatches`,
    method: "POST",
    headers: {
      "User-Agent": "Remotion-Render-Orchestrator",
      Authorization: `Bearer ${worker.token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payload),
    },
  }, (res) => {
    let body = "";
    res.on("data", (d) => (body += d));
    res.on("end", async () => {
      if (res.statusCode === 204) {
        console.log(`\n🚀 [BAŞARILI] Render iş akışı başarıyla başlatıldı!`);
        console.log(`\nCanlı İlerleme ve İndirme:`);
        console.log(`  🔗 https://github.com/${worker.username}/${worker.repo}/actions`);
        console.log(`\nRender tamamlandığında oluşan video GitHub Actions sekmesinden (Artifacts) indirilebilir.`);

        if (args.wait) {
          console.log(`\n⏳ [--wait devrede] Render tamamlanana kadar bekleniyor...`);
          const pollIntervalSec = Number(args["poll-interval"] || 15);
          await sleep(10000);
          const startTime = Date.now();
          const maxTimeoutMs = 120 * 60 * 1000;

          while (Date.now() - startTime < maxTimeoutMs) {
            try {
              const runRes = await new Promise((resolve) => {
                https.default.get({
                  hostname: "api.github.com",
                  path: `/repos/${worker.username}/${worker.repo}/actions/runs?per_page=5`,
                  headers: {
                    "User-Agent": "Remotion-Render-Orchestrator",
                    Authorization: `Bearer ${worker.token}`,
                    Accept: "application/vnd.github.v3+json",
                  },
                }, (r) => {
                  let b = "";
                  r.on("data", (d) => (b += d));
                  r.on("end", () => {
                    try { resolve(JSON.parse(b)); } catch { resolve(null); }
                  });
                });
              });

              if (runRes && runRes.workflow_runs && runRes.workflow_runs.length > 0) {
                const latest = runRes.workflow_runs[0];
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                const elapsedStr = `${Math.floor(elapsed / 60)}m ${elapsed % 60}s`;

                if (latest.status === "completed") {
                  if (latest.conclusion === "success") {
                    console.log(`\n\n🎉 [BAŞARILI] Render tamamlandı (${elapsedStr})!`);
                    if (fs.existsSync(path.join(ROOT, "scripts", "render-github-download.js"))) {
                      console.log(`\n3. Video indiriliyor (out/${slug}.mp4)...`);
                      try {
                        execSync(`node scripts/render-github-download.js --slug=${slug} --worker=${worker.id}`, { cwd: ROOT, stdio: "inherit" });
                      } catch (e) {
                        console.warn(`⚠ İndirme uyarısı: ${e.message}`);
                      }
                    }
                    break;
                  } else {
                    console.error(`\n❌ Render başarısız sonuçlandı (${latest.conclusion}). Link: ${latest.html_url}`);
                    break;
                  }
                } else {
                  process.stdout.write(`\r⏳ Render devam ediyor... (${elapsedStr}) | Durum: ${latest.status} | URL: ${latest.html_url}   `);
                }
              }
            } catch {}
            await sleep(pollIntervalSec * 1000);
          }
        }
      } else {
        console.error(`❌ Workflow tetikleme hatası (HTTP ${res.statusCode}): ${body}`);
      }
    });
  });

  req.on("error", (e) => {
    console.error(`❌ API Bağlantı hatası: ${e.message}`);
  });

  req.write(payload);
  req.end();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
