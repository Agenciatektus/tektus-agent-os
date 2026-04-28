#!/usr/bin/env node
/**
 * Tektus Agent OS — Install
 *
 * Installs Tektus Agent OS into a target project directory.
 *
 * Copies:
 *   - core/ (rules + best-practices)
 *   - skills/ (all skills)
 *   - squads/ (all squads)
 * Plus the IDE adapter requested via --ide flag.
 *
 * Usage:
 *   node scripts/install.js --target /path/to/project --ide claude-code
 *   node scripts/install.js --target ./demo --ide cursor
 *   node scripts/install.js --target ./demo --ide antigravity
 *   node scripts/install.js --target ./demo --ide all
 */

const fs = require("node:fs");
const path = require("node:path");

const args = process.argv.slice(2);
function getArg(flag, def) {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : def;
}

const target = getArg("--target", null);
const ide = getArg("--ide", "claude-code");
const VALID_IDES = ["claude-code", "cursor", "antigravity", "all"];

if (!target) {
  console.error("✗ --target is required");
  console.error("  Usage: node scripts/install.js --target /path/to/project --ide claude-code");
  process.exit(1);
}

if (!VALID_IDES.includes(ide)) {
  console.error(`✗ --ide must be one of: ${VALID_IDES.join(", ")}`);
  process.exit(1);
}

if (!fs.existsSync(target)) {
  console.error(`✗ target directory not found: ${target}`);
  console.error("  Create it first: mkdir -p " + target);
  process.exit(1);
}

function copyRecursive(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) copyRecursive(s, d);
    else fs.copyFileSync(s, d);
  }
}

console.log(`Installing Tektus Agent OS → ${target} (ide: ${ide})\n`);

const targets = [
  { src: "core", dst: path.join(target, "core") },
  { src: "skills", dst: path.join(target, "skills") },
  { src: "squads", dst: path.join(target, "squads") },
];

const idesToInstall = ide === "all" ? ["claude-code", "cursor", "antigravity"] : [ide];

for (const i of idesToInstall) {
  const adapterSrc = path.join("adapters", i);
  if (!fs.existsSync(adapterSrc)) {
    console.warn(`  ⚠ adapter not found: ${adapterSrc} (skipping)`);
    continue;
  }
  // Adapter contents (.claude/, .cursor/, or .agents/) go directly to project root
  for (const sub of fs.readdirSync(adapterSrc)) {
    targets.push({
      src: path.join(adapterSrc, sub),
      dst: path.join(target, sub),
    });
  }
}

for (const t of targets) {
  if (!fs.existsSync(t.src)) {
    console.warn(`  ⚠ skipped (not found): ${t.src}`);
    continue;
  }
  copyRecursive(t.src, t.dst);
  console.log(`  ✓ ${t.src} → ${t.dst}`);
}

// Append .tektus/ to target's .gitignore (idempotent)
const giPath = path.join(target, ".gitignore");
const giLine = "\n# Tektus Agent OS\n.tektus/\n";
if (fs.existsSync(giPath)) {
  const cur = fs.readFileSync(giPath, "utf8");
  if (!cur.includes(".tektus/")) {
    fs.appendFileSync(giPath, giLine);
    console.log("  ✓ appended .tektus/ to .gitignore");
  }
} else {
  fs.writeFileSync(giPath, giLine.trimStart());
  console.log("  ✓ created .gitignore with .tektus/");
}

console.log("\n✓ Installation complete.");
console.log("\nNext steps:");
console.log("  1. Open the target project in your IDE (" + ide + ")");
console.log('  2. Send any first message — the onboarding wizard will run automatically');
console.log("  3. Profile saved to .tektus/profile.yaml after the 3-block interview\n");
