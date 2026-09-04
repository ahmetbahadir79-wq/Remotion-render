#!/usr/bin/env node
/**
 * render-github-cleanup.js — free a worker repo's Actions storage after an approved render.
 *
 * FLOW: render.js --method=github  →  render-github-download.js (+ffprobe verify)  →  you
 * watch out/<slug>.mp4  →  if OK, run THIS to delete that render's artifact(s) + run logs
 * on the worker's GitHub repo, reclaiming the Actions storage quota so the next render has
 * room. Running this = your approval; it only deletes on the worker whose render you just
 * pulled (from .render-github-state.json) unless you point it elsewhere.
 *
 * Usage:
 *   node scripts/render-github-cleanup.js --slug=<slug>         # clean the run you just downloaded
 *   node scripts/render-github-cleanup.js --worker=<id> --run=<id>
 *   node scripts/render-github-cleanup.js --worker=<id> --all   # sweep ALL completed runs on that worker
 */
const fs = require("fs");
const path = require("path");
const { ROOT, loadAccounts, resolveWorker, repoOf, gh, parseArgs } = require("./lib/render-pool");

const args = parseArgs(process.argv.slice(2));
const acc = loadAccounts();
const statePath = path.join(ROOT, ".render-github-state.json");
let state = null;
try { state = JSON.parse(fs.readFileSync(statePath, "utf8")); } catch {}

// ── resolve worker + which run(s) to clean ──────────────────────────────────
let worker, runIds = [];
if (args.worker) {
  worker = resolveWorker(acc, args.worker);
} else if (state && (!args.slug || args.slug === state.slug)) {
  worker = resolveWorker(acc, state.workerId);
} else {
  worker = resolveWorker(acc, "last");
}
const repo = repoOf(worker);

if (args.all) {
  const runs = gh(worker, ["run", "list", "--repo", repo, "--workflow", "render-video.yml", "-L", "100",
    "--json", "databaseId,status"], { json: true }) || [];
  runIds = runs.filter((r) => r.status === "completed").map((r) => r.databaseId);
} else if (args.run) {
  runIds = [Number(args.run)];
} else if (state && (!args.slug || args.slug === state.slug) && state.runId) {
  runIds = [Number(state.runId)];
} else {
  console.error("Ne temizlenecek belli değil. Ver: --slug=<son indirilen> | --run=<id> | --all");
  process.exit(1);
}

console.log(`🧹 Temizlik — ${repo} (worker ${worker.name || worker.id}) · ${runIds.length} çalışma`);

let freed = 0, delArt = 0, delRun = 0;
for (const id of runIds) {
  let arts = [];
  try {
    const raw = gh(worker, ["api", `/repos/${repo}/actions/runs/${id}/artifacts`,
      "--jq", ".artifacts[] | {id:.id,name:.name,size:.size_in_bytes}"]);
    arts = raw.trim().split("\n").filter(Boolean).map((l) => JSON.parse(l));
  } catch {}
  for (const a of arts) {
    try {
      gh(worker, ["api", "-X", "DELETE", `/repos/${repo}/actions/artifacts/${a.id}`]);
      freed += a.size || 0; delArt++;
      console.log(`  🗑 artifact "${a.name}" (${((a.size || 0) / 1e6).toFixed(0)} MB)`);
    } catch (e) { console.warn(`  ⚠ artifact ${a.id} silinemedi: ${String(e.message).slice(0, 120)}`); }
  }
  try {
    gh(worker, ["run", "delete", String(id), "--repo", repo]);
    delRun++; console.log(`  🗑 run ${id} (loglar)`);
  } catch (e) {
    try { gh(worker, ["api", "-X", "DELETE", `/repos/${repo}/actions/runs/${id}`]); delRun++; console.log(`  🗑 run ${id} (loglar)`); }
    catch (e2) { console.warn(`  ⚠ run ${id} silinemedi: ${String(e2.message).slice(0, 120)}`); }
  }
}

console.log(`\n✓ Silinen: ${delArt} artifact + ${delRun} run · ~${(freed / 1e6).toFixed(0)} MB Actions deposu boşaldı.`);

// clear state if we just cleaned that render
if (state && (!args.slug || args.slug === state.slug)) {
  try { fs.unlinkSync(statePath); } catch {}
}
console.log(`✅ Havuz slotu (${repo}) bir sonraki render'a hazır.`);
