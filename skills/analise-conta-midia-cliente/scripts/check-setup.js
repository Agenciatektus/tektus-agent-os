#!/usr/bin/env node
/**
 * analise-conta-midia-cliente — verificação de ambiente
 *
 * Confere se as credenciais necessárias estão disponíveis, SEM imprimir valor
 * nenhum. Mostra só o nome da variável, se existe, e o que dá para fazer com
 * o que está presente.
 *
 * Uso:
 *   node scripts/check-setup.js
 *
 * As credenciais são lidas do ambiente. Carregue seu arquivo antes:
 *   Linux/macOS:  set -a && source _secrets/analise-midia.env && set +a
 *   Windows:      node --env-file=_secrets/analise-midia.env scripts/check-setup.js
 */

const CREDS = [
  {
    env: "META_ACCESS_TOKEN",
    required: true,
    unlocks: "Graph API v23 — histórico de gasto, campanhas, conjuntos, pixels, criativos",
    how: "System User token na Business Manager, com escopo ads_read nas contas do cliente",
  },
  {
    env: "APIFY_TOKEN",
    required: false,
    unlocks: "Acervo do perfil no Instagram (posts, views, engajamento)",
    how: "Console da Apify, em Settings > Integrations",
  },
  {
    env: "VERDASH_SUPABASE_URL",
    required: false,
    unlocks: "Consulta a matriz_meta como complemento (snapshot recente)",
    how: "URL do Supabase do Verdash",
  },
  {
    env: "VERDASH_SUPABASE_KEY",
    required: false,
    unlocks: "Autenticação da consulta acima, respeitando o isolamento entre agências",
    how: "Chave anon do Verdash. Nunca use service_role para esta skill.",
  },
];

// Só o formato é validado, nunca o conteúdo — e nada é impresso.
function shape(name, value) {
  if (!value) return null;
  if (name === "META_ACCESS_TOKEN") {
    if (!/^EAA/.test(value)) return "formato inesperado (token da Meta costuma começar com EAA)";
    if (value.length < 100) return "curto demais para um token de System User";
  }
  if (name === "APIFY_TOKEN" && !/^apify_api_/.test(value)) {
    return "formato inesperado (esperado apify_api_...)";
  }
  if (name === "VERDASH_SUPABASE_URL" && !/^https?:\/\//.test(value)) {
    return "não parece uma URL";
  }
  if (name === "VERDASH_SUPABASE_KEY" && /^eyJ/.test(value)) {
    try {
      const role = JSON.parse(Buffer.from(value.split(".")[1], "base64").toString()).role;
      if (role === "service_role") {
        return "É uma chave service_role. Ela atravessa o isolamento entre agências e não é necessária aqui. Use a chave anon.";
      }
    } catch {}
  }
  return null;
}

console.log("\nanalise-conta-midia-cliente — verificação de ambiente\n");

let missingRequired = 0;
let warnings = 0;

for (const c of CREDS) {
  const val = process.env[c.env];
  const problem = shape(c.env, val);

  if (!val) {
    const mark = c.required ? "✗" : "·";
    console.log(`  ${mark} ${c.env} — ausente${c.required ? " (obrigatória)" : " (opcional)"}`);
    console.log(`      desbloqueia: ${c.unlocks}`);
    console.log(`      como obter:  ${c.how}\n`);
    if (c.required) missingRequired++;
    continue;
  }

  if (problem) {
    console.log(`  ⚠ ${c.env} — presente, mas ${problem}\n`);
    warnings++;
    continue;
  }

  console.log(`  ✓ ${c.env} — presente`);
  console.log(`      desbloqueia: ${c.unlocks}\n`);
}

if (missingRequired) {
  console.log("Sem META_ACCESS_TOKEN a análise não roda: é a fonte do histórico.");
  console.log("Peça ao responsável pela Business Manager um System User token");
  console.log("com escopo ads_read nas contas do cliente.\n");
  process.exit(1);
}

console.log(
  warnings
    ? "Ambiente utilizável, com ressalvas acima.\n"
    : "Ambiente pronto. Pode rodar a análise.\n"
);
