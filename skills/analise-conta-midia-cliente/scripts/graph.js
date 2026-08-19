#!/usr/bin/env node
/**
 * analise-conta-midia-cliente — cliente da Graph API v23
 *
 * Substitui o caminho antigo (SSH na VPS + leitura do token cifrado no banco +
 * decifragem local) por uma chamada que usa o token do ambiente. Qualquer
 * pessoa da equipe com um System User token roda isto, sem acesso a servidor.
 *
 * O token vive só em memória. Ele nunca é impresso, nem em erro: a URL é
 * mascarada antes de qualquer log.
 *
 * Uso:
 *   node scripts/graph.js contas
 *   node scripts/graph.js conta       act_123456
 *   node scripts/graph.js mensal      act_123456
 *   node scripts/graph.js campanhas   act_123456
 *   node scripts/graph.js atual       act_123456
 *   node scripts/graph.js conjuntos   act_123456
 *   node scripts/graph.js pixels      act_123456
 *   node scripts/graph.js criativos   <campaign_id>
 *   node scripts/graph.js raw         "<caminho>?<query>"
 *
 * Carregue as credenciais antes:
 *   node --env-file=_secrets/analise-midia.env scripts/graph.js contas
 */

const API = "https://graph.facebook.com/v23.0";
const TOKEN = process.env.META_ACCESS_TOKEN;

const ENDPOINTS = {
  contas: () => "/me/adaccounts?fields=name,account_status,amount_spent,currency",
  conta: (id) =>
    `/${id}?fields=name,account_status,disable_reason,amount_spent,currency,created_time,business,funding_source_details`,
  mensal: (id) => `/${id}/insights?date_preset=maximum&time_increment=monthly`,
  campanhas: (id) =>
    `/${id}/insights?level=campaign&date_preset=maximum&fields=campaign_name,spend,actions`,
  atual: (id) => `/${id}/insights?level=campaign&date_preset=last_30d`,
  // O objetivo real mora no conjunto, não no nome da campanha (LRN-20260703-008).
  conjuntos: (id) =>
    `/${id}/adsets?fields=name,optimization_goal,destination_type,promoted_object,effective_status&limit=200`,
  pixels: (id) => `/${id}/adspixels?fields=name,last_fired_time`,
  criativos: (id) => `/${id}/ads?fields=name,creative{object_story_spec}`,
};

function die(msg, hint) {
  console.error(`\n✗ ${msg}`);
  if (hint) console.error(`  ${hint}`);
  console.error("");
  process.exit(1);
}

if (!TOKEN) {
  die(
    "META_ACCESS_TOKEN não está no ambiente.",
    "Rode antes: node scripts/check-setup.js\n" +
      "  Ou carregue o arquivo: node --env-file=_secrets/analise-midia.env scripts/graph.js ..."
  );
}

const [cmd, arg] = process.argv.slice(2);

if (!cmd) {
  console.error("\nComandos: " + Object.keys(ENDPOINTS).join(", ") + ", raw\n");
  process.exit(1);
}

let pathQuery;
if (cmd === "raw") {
  if (!arg) die("raw exige um caminho.", 'Exemplo: node scripts/graph.js raw "/act_123/ads?fields=name"');
  pathQuery = arg.startsWith("/") ? arg : "/" + arg;
} else {
  const build = ENDPOINTS[cmd];
  if (!build) die(`Comando desconhecido: ${cmd}`, "Comandos: " + Object.keys(ENDPOINTS).join(", ") + ", raw");
  if (build.length > 0 && !arg) die(`${cmd} exige um id.`, `Exemplo: node scripts/graph.js ${cmd} act_123456`);
  pathQuery = build(arg);
}

const url = `${API}${pathQuery}${pathQuery.includes("?") ? "&" : "?"}access_token=${TOKEN}`;

// Tudo que for para a tela passa por aqui primeiro.
//
// Dois vazamentos possiveis, e ambos ja aconteceram em teste:
//   1. a URL carrega access_token=... na query
//   2. a propria Meta ecoa o token de volta dentro da mensagem de erro
//      ("Malformed access token EAA...") quando ele e invalido
// Por isso redigimos o valor literal do token, nao so o padrao da query.
const safe = (s) =>
  String(s)
    .split(TOKEN).join("[token oculto]")
    .replace(/access_token=[^&\s"]+/g, "access_token=[oculto]")
    .replace(/EAA[A-Za-z0-9_-]{20,}/g, "[token oculto]");

(async () => {
  try {
    const res = await fetch(url);
    const body = await res.json();

    if (!res.ok || body.error) {
      const e = body.error || {};
      console.error(`\n✗ Graph API respondeu ${res.status}`);
      console.error(`  ${safe(e.message || "erro sem mensagem")}`);
      if (e.code) console.error(`  código ${e.code}${e.error_subcode ? `/${e.error_subcode}` : ""}`);

      if (e.code === 190) console.error("\n  Token inválido ou expirado. Gere outro na Business Manager.");
      if (e.code === 200 || e.code === 10)
        console.error("\n  O token não tem permissão nesta conta. Confirme o escopo ads_read e o acesso à conta.");
      if (e.code === 100)
        console.error("\n  Campo ou id inválido. Contas de anúncio levam o prefixo act_.");
      console.error("");
      process.exit(1);
    }

    // Valores monetários da Meta vêm em centavos.
    if (body.amount_spent !== undefined) {
      body._amount_spent_reais = Number(body.amount_spent) / 100;
    }
    if (body.account_status !== undefined) {
      body._status_legivel = { 1: "ativa", 101: "encerrada ou restrita" }[body.account_status] || "ver documentação";
    }
    if (body.disable_reason !== undefined) {
      body._motivo_legivel =
        { 0: "sem restrição", 1: "integridade", 3: "pagamento" }[body.disable_reason] || "ver documentação";
    }

    console.log(JSON.stringify(body, null, 2));
  } catch (err) {
    die("Falha na chamada à Graph API.", safe(err.message));
  }
})();
