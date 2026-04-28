#!/usr/bin/env node
/**
 * sanitize-check.js — varredura de vazamentos antes de commit/push/CI.
 *
 * Lê padrões de `.sanitize-patterns.yaml` (default) ou arquivo via --config.
 * Falha (exit 1) se qualquer match. Lista arquivos + linhas.
 *
 * Uso:
 *   node scripts/sanitize-check.js                  # varre tudo (git ls-files)
 *   node scripts/sanitize-check.js --staged         # só staged (pre-commit)
 *   node scripts/sanitize-check.js --severity high  # só bloqueia high+
 *   node scripts/sanitize-check.js --json           # output JSON pra CI parsing
 *
 * Sem dependências externas — Node puro 18+. YAML parser caseiro mínimo.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ----------------------------------------------------------------------------
// CLI
// ----------------------------------------------------------------------------
const args = process.argv.slice(2);
const flags = {
  staged: args.includes('--staged'),
  json: args.includes('--json'),
  config: '.sanitize-patterns.yaml',
  severity: 'medium', // medium = bloqueia medium+; critical = só critical
};
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--config') flags.config = args[i + 1];
  if (args[i] === '--severity') flags.severity = args[i + 1];
}

const SEVERITY_RANK = { low: 0, medium: 1, high: 2, critical: 3 };

// ----------------------------------------------------------------------------
// YAML mini parser (não usa lib externa pra manter zero-deps)
// ----------------------------------------------------------------------------
function parseYAML(text) {
  // Suporta apenas o subset necessário: scalars, listas (- item), dicts.
  // Não é YAML completo. Suficiente pra .sanitize-patterns.yaml.
  const lines = text.split(/\r?\n/);
  const root = {};
  const stack = [{ indent: -1, obj: root }];
  for (let raw of lines) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    const indent = raw.length - raw.trimStart().length;
    const line = raw.trim();
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }
    const parent = stack[stack.length - 1].obj;
    if (line.startsWith('- ')) {
      const value = stripQuotes(line.slice(2));
      if (!Array.isArray(parent.__list)) parent.__list = [];
      parent.__list.push(value);
      // Bind back: parent itself becomes array
      const pp = stack[stack.length - 2].obj;
      const lastKey = Object.keys(pp).slice(-1)[0];
      if (lastKey && pp[lastKey] === parent) pp[lastKey] = parent.__list;
    } else {
      const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
      if (!m) continue;
      const key = m[1];
      const valueStr = m[2];
      if (valueStr === '' || valueStr === '[]') {
        const next = valueStr === '[]' ? [] : {};
        parent[key] = next;
        if (!Array.isArray(next)) stack.push({ indent, obj: next });
      } else {
        parent[key] = stripQuotes(valueStr);
      }
    }
  }
  return root;
}
function stripQuotes(s) {
  s = s.trim();
  // Strip inline comments OUTSIDE of quotes. Order matters: handle quoted
  // strings first, then plain values.
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  if (s.startsWith('"') || s.startsWith("'")) {
    // quoted but not closed in same trim — bail
    return s;
  }
  // Plain unquoted value: strip inline comment (everything after #) + trim
  const hashIdx = s.indexOf('#');
  if (hashIdx >= 0) s = s.slice(0, hashIdx);
  return s.trim();
}

// ----------------------------------------------------------------------------
// Carregar config
// ----------------------------------------------------------------------------
function loadConfig() {
  if (!fs.existsSync(flags.config)) {
    console.error(`✗ Config não encontrada: ${flags.config}`);
    process.exit(2);
  }
  const txt = fs.readFileSync(flags.config, 'utf8');
  return parseYAML(txt);
}

// ----------------------------------------------------------------------------
// Lista de arquivos a varrer
// ----------------------------------------------------------------------------
function listFiles(staged) {
  try {
    const cmd = staged
      ? 'git diff --cached --name-only --diff-filter=ACMR'
      : 'git ls-files';
    const out = execSync(cmd, { encoding: 'utf8' });
    return out.split('\n').filter(Boolean);
  } catch (e) {
    console.error('✗ git command falhou:', e.message);
    process.exit(2);
  }
}

function isExcludedExt(file, exts) {
  const ext = path.extname(file).slice(1).toLowerCase();
  return exts.includes(ext);
}
function isExcludedPath(file, paths) {
  return paths.some(p => file.startsWith(p) || file.includes(p));
}

// ----------------------------------------------------------------------------
// Compilar regex de todas as categorias
// ----------------------------------------------------------------------------
function compilePatterns(config) {
  const categories = ['ips', 'domains', 'internal_paths', 'people',
                      'clients_and_products', 'secrets', 'ephemeral_urls'];
  const compiled = [];
  for (const cat of categories) {
    if (!config[cat]) continue;
    const sev = config[cat].severity || 'medium';
    const defaults = Array.isArray(config[cat].defaults) ? config[cat].defaults : [];
    const customs = Array.isArray(config[cat].custom) ? config[cat].custom : [];
    for (const pat of [...defaults, ...customs]) {
      try {
        compiled.push({
          category: cat,
          severity: sev,
          regex: new RegExp(pat, 'g'),
          source: pat,
        });
      } catch (e) {
        console.error(`✗ regex inválida em ${cat}: ${pat}`);
      }
    }
  }
  return compiled;
}

// ----------------------------------------------------------------------------
// Varrer um arquivo
// ----------------------------------------------------------------------------
function scanFile(file, patterns, threshold) {
  let content;
  try {
    content = fs.readFileSync(file, 'utf8');
  } catch (e) {
    return []; // arquivo binário ou inacessível
  }
  const findings = [];
  const lines = content.split(/\r?\n/);
  for (const p of patterns) {
    if (SEVERITY_RANK[p.severity] < SEVERITY_RANK[threshold]) continue;
    p.regex.lastIndex = 0;
    let m;
    while ((m = p.regex.exec(content)) !== null) {
      // Localiza linha
      const before = content.slice(0, m.index);
      const lineNum = (before.match(/\n/g) || []).length + 1;
      findings.push({
        file,
        line: lineNum,
        category: p.category,
        severity: p.severity,
        match: m[0].slice(0, 80),
        pattern: p.source,
        excerpt: lines[lineNum - 1] ? lines[lineNum - 1].trim().slice(0, 200) : '',
      });
      if (!p.regex.global) break;
    }
  }
  return findings;
}

// ----------------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------------
function main() {
  const config = loadConfig();
  const patterns = compilePatterns(config);
  if (patterns.length === 0) {
    console.log('⚠ Nenhum padrão configurado. Edite .sanitize-patterns.yaml');
    process.exit(0);
  }

  const excludeExts = config.exclude_extensions || [];
  const excludePaths = config.exclude_paths || [];

  let files = listFiles(flags.staged);
  files = files.filter(f =>
    !isExcludedExt(f, excludeExts) && !isExcludedPath(f, excludePaths)
  );

  const allFindings = [];
  for (const f of files) {
    const fnd = scanFile(f, patterns, flags.severity);
    allFindings.push(...fnd);
  }

  if (flags.json) {
    console.log(JSON.stringify({
      total: allFindings.length,
      findings: allFindings,
    }, null, 2));
  } else {
    if (allFindings.length === 0) {
      console.log(`✓ Sanitize check passed. ${files.length} arquivos varridos, 0 matches.`);
      process.exit(0);
    }
    console.error(`\n✗ SANITIZE CHECK FALHOU — ${allFindings.length} match(es) encontrados:\n`);
    for (const f of allFindings) {
      const sevTag = f.severity.toUpperCase();
      console.error(`  [${sevTag}] ${f.file}:${f.line}  (${f.category})`);
      if (config.behavior && config.behavior.show_context !== false) {
        console.error(`    └─ ${f.excerpt}`);
      }
    }
    console.error(`\n→ Fix: edite os arquivos acima ou adicione exclusões em .sanitize-patterns.yaml`);
    console.error(`→ Bypass de emergência: SANITIZE_SKIP=1 git commit ... (use com extrema cautela)\n`);
  }

  if (allFindings.length > 0) process.exit(1);
}

if (process.env.SANITIZE_SKIP === '1') {
  console.error('⚠ SANITIZE_SKIP=1 — sanitize check pulado por ENV var. Espero que saiba o que está fazendo.');
  process.exit(0);
}

main();
