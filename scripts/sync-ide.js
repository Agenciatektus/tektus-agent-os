#!/usr/bin/env node
/**
 * Tektus Agent OS — Cross-IDE Rule Sync
 *
 * Reads core/rules/*.md (master) and writes copies into:
 *   - adapters/claude-code/.claude/rules/  (.md)
 *   - adapters/cursor/.cursor/rules/       (.mdc — Cursor wants this extension)
 *   - adapters/antigravity/.agents/rules/  (.md)
 *
 * Idempotent. Safe to re-run.
 *
 * Usage:
 *   node scripts/sync-ide.js
 *   node scripts/sync-ide.js --dry-run
 */

const fs = require("node:fs");
const path = require("node:path");

const DRY = process.argv.includes("--dry-run");

const SOURCE = path.join("core", "rules");
const TARGETS = [
  { dir: path.join("adapters", "claude-code", ".claude", "rules"), ext: ".md" },
  { dir: path.join("adapters", "cursor", ".cursor", "rules"), ext: ".mdc" },
  { dir: path.join("adapters", "antigravity", ".agents", "rules"), ext: ".md" },
];

function ensureDir(p) {
  if (DRY) return console.log(`[dry] mkdir -p ${p}`);
  fs.mkdirSync(p, { recursive: true });
}

function writeFile(p, content) {
  if (DRY) return console.log(`[dry] write ${p} (${content.length} bytes)`);
  fs.writeFileSync(p, content);
}

function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error(`✗ source not found: ${SOURCE}`);
    process.exit(1);
  }

  const rules = fs.readdirSync(SOURCE).filter((f) => f.endsWith(".md"));
  console.log(`Found ${rules.length} master rules in ${SOURCE}`);

  let synced = 0;
  for (const rule of rules) {
    const content = fs.readFileSync(path.join(SOURCE, rule), "utf8");
    const baseName = rule.replace(/\.md$/, "");

    for (const target of TARGETS) {
      ensureDir(target.dir);
      const outPath = path.join(target.dir, baseName + target.ext);
      writeFile(outPath, content);
      synced++;
    }
  }

  console.log(`✓ Synced ${rules.length} rules × ${TARGETS.length} adapters = ${synced} files`);
  if (DRY) console.log("(dry-run mode — no files actually written)");
}

main();
