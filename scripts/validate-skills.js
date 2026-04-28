#!/usr/bin/env node
/**
 * Tektus Agent OS — Skills Validator
 *
 * Walks skills/ and checks that every SKILL.md has valid frontmatter.
 * Required fields: name, description, type, version.
 * Exits with code 1 if any skill fails validation.
 *
 * Usage:
 *   node scripts/validate-skills.js
 *   node scripts/validate-skills.js --skills-dir skills
 */

const fs = require("node:fs");
const path = require("node:path");

const args = process.argv.slice(2);
const skillsDir = args.includes("--skills-dir")
  ? args[args.indexOf("--skills-dir") + 1]
  : "skills";

// Required for ALL skills (Anthropic Claude Code format minimum)
const REQUIRED = ["name", "description"];
// Recommended (warned if missing on Tektus-original skills, not external)
const RECOMMENDED = ["type", "version"];
const VALID_TYPES = ["mcp", "script", "hybrid", "prompt", "orchestrator", "api-wrapper"];

function parseFrontmatter(text) {
  // Tolerate CRLF and LF
  const normalized = text.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]+?)\n---/);
  if (!match) return null;
  const fm = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^([a-zA-Z_]+):\s*(.+?)\s*$/);
    if (m) {
      let val = m[2];
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
      fm[m[1]] = val;
    }
  }
  return fm;
}

function validate(skillName, fm) {
  const errors = [];
  const warnings = [];
  for (const f of REQUIRED) {
    if (!fm[f]) errors.push(`missing required field: ${f}`);
  }
  for (const f of RECOMMENDED) {
    if (!fm[f]) warnings.push(`missing recommended field: ${f}`);
  }
  if (fm.type && !VALID_TYPES.includes(fm.type)) {
    errors.push(`invalid type "${fm.type}" — must be one of: ${VALID_TYPES.join(", ")}`);
  }
  // name/folder match is now a warning (skills bundled from external repos
  // sometimes use generic names like "skill-vetter" in folder "openclaw-skills-skill-vetter")
  if (fm.name && fm.name !== skillName) {
    warnings.push(`name "${fm.name}" doesn't match folder "${skillName}"`);
  }
  return { errors, warnings };
}

function main() {
  if (!fs.existsSync(skillsDir)) {
    console.error(`✗ skills directory not found: ${skillsDir}`);
    process.exit(1);
  }

  const skills = fs.readdirSync(skillsDir).filter((s) =>
    fs.statSync(path.join(skillsDir, s)).isDirectory()
  );

  let passed = 0;
  let failed = 0;
  let warned = 0;
  const failures = [];
  const warningsAll = [];

  for (const skill of skills) {
    const skillFile = path.join(skillsDir, skill, "SKILL.md");
    if (!fs.existsSync(skillFile)) {
      failed++;
      failures.push({ skill, errors: ["SKILL.md not found"], warnings: [] });
      continue;
    }
    const text = fs.readFileSync(skillFile, "utf8");
    const fm = parseFrontmatter(text);
    if (!fm) {
      failed++;
      failures.push({ skill, errors: ["no YAML frontmatter found"], warnings: [] });
      continue;
    }
    const { errors, warnings } = validate(skill, fm);
    if (errors.length === 0) {
      passed++;
      if (warnings.length > 0) {
        warned++;
        warningsAll.push({ skill, warnings });
      }
    } else {
      failed++;
      failures.push({ skill, errors, warnings });
    }
  }

  console.log(`Skills validated: ${passed} passed, ${failed} failed, ${warned} with warnings (of ${skills.length} total)`);

  if (warningsAll.length > 0) {
    console.log("\nWarnings (non-blocking):");
    for (const w of warningsAll) {
      console.log(`  ⚠ ${w.skill}`);
      for (const wr of w.warnings) console.log(`      - ${wr}`);
    }
  }

  if (failed > 0) {
    console.log("\nFailures (blocking):");
    for (const f of failures) {
      console.log(`  ✗ ${f.skill}`);
      for (const e of f.errors) console.log(`      - ${e}`);
    }
    process.exit(1);
  }
}

main();
