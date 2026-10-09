#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { validateConfig, loadBook } = require("./lib/narrative-visual-firewall");
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : [a.slice(2), true]; }));
const slug = args.slug;
if (!slug) { console.error("Usage: node scripts/validate-narrative-visual-firewall.js --slug=<slug> [--report-only]"); process.exit(1); }
const root = path.resolve(__dirname, "..");
let report;
try { report = validateConfig({ ...loadBook(root, slug), slug }); }
catch (error) { report = { version: "P1.1", slug, status: "FAIL", counts: { scenes: 0, violations: 1 }, violations: [{ reasonCode: "STORY_BIBLE_INCOMPLETE", message: error.message }] }; }
// PREVIEW-ONLY mode (explicit, never the production default): strategy/fallback
// mismatches (STRATEGY_REQUIREMENT_UNMET, STRATEGY_UNRESOLVED) are moved to
// report.previewWarnings and do not block. Every other violation still blocks.
// Scores, thresholds and the report status are NOT changed; status stays FAIL.
const STRATEGY_CLASS = new Set(["STRATEGY_REQUIREMENT_UNMET", "STRATEGY_UNRESOLVED"]);
if (args["preview-only"] && report.status !== "PASS") {
  const blocking = report.violations.filter((v) => v.severity !== "diagnostic" && !STRATEGY_CLASS.has(v.reasonCode));
  const warnings = report.violations.filter((v) => v.severity !== "diagnostic" && STRATEGY_CLASS.has(v.reasonCode));
  report.previewWarnings = warnings;
  report.previewOnly = { mode: "PREVIEW-ONLY", blockingRemaining: blocking.length, strategyWarnings: warnings.length };
  report.violations = report.violations.filter((v) => !warnings.includes(v));
  report.counts = { ...report.counts, violations: blocking.length + report.violations.filter((v) => v.severity === "diagnostic").length };
}
const out = path.join(root, "books", slug, "narrative-visual-firewall.report.json");
fs.writeFileSync(out, JSON.stringify(report, null, 2) + "\n");
console.log(`${report.status} ${slug}: ${report.counts.violations} violation(s), ${report.counts.diagnostics || 0} diagnostic(s) → ${path.relative(root, out)}`);
for (const v of report.violations.slice(0, 20)) console.log(`  ${v.severity === "diagnostic" ? "(diagnostic) " : ""}${v.reasonCode}: ${v.message}`);
const previewPass = args["preview-only"] && report.previewOnly && report.previewOnly.blockingRemaining === 0;
if (previewPass) console.log(`PREVIEW-ONLY: ${report.previewOnly.strategyWarnings} strategy/fallback warning(s) recorded in previewWarnings — NOT production-ready`);
if (report.status !== "PASS" && !args["report-only"] && !previewPass) process.exit(1);
