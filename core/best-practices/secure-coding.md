---
id: secure-coding
name: "Secure Coding & Application Security"
whenToUse: |
  Creating agents that write, review, or audit application code for security.
  Covers: vibecoded PRs review, novo código em PHP/WordPress/WooCommerce,
  Node.js/TypeScript/React/Vite, Edge Functions Supabase, integrações com
  gateways de pagamento, APIs externas, webhooks, formulários, autenticação,
  upload de arquivos, e configurações de cabeçalhos/CORS/CSP.
  NOT for: hardening de infraestrutura/VPS (→ ver `infra-security`),
  pentest/red team (→ ver `cybersecurity-pool` em squads).
version: "1.0.0"
---

# Secure Coding & Application Security — Best Practices

> Para a Tektus, segurança não é "feature avançada" — é higiene básica para qualquer código que toca dados de cliente, autenticação, ou pagamento. Custo de vazamento (multa LGPD + perda de cliente + retrabalho) é sempre maior que custo de prevenção.

## Core Principles

1. **Auth-gate em tudo que muta estado.** Todo endpoint, script ou função que altera dados (`update_option`, `wpdb->query`, `INSERT`/`UPDATE`/`DELETE`, edge function POST) deve verificar autenticação E autorização antes de executar. Em WordPress: `is_user_logged_in() && current_user_can('manage_options')`. Em Node/Edge Functions: JWT válido + claim de role/escopo. Lição direta do incidentes reais como  (script sem auth-gate exposto publicamente que vazou token de gateway por semanas).

2. **Segredos NUNCA em código.** Tokens, chaves de API, senhas e strings de conexão moram em variáveis de ambiente (`.env`, secrets do Coolify, Supabase Vault, GitHub Actions secrets). Nunca commitar `.env`. Nunca fazer `echo get_option('*_token')`, `console.log(process.env.SECRET)`, ou retornar segredo em response HTTP. Adicionar `.env*` ao `.gitignore` desde o init do projeto.

3. **Defesa em profundidade.** Cada camada falha — combine várias. Padrão mínimo: (a) firewall/WAF de borda, (b) auth-gate na rota, (c) validation no input, (d) sanitization no output, (e) rate limit, (f) audit log. Quando uma cai, as outras ainda contêm o estrago. Nunca confiar em apenas validação client-side.

4. **Least privilege.** Cada conta/serviço tem só as permissões mínimas para sua função. Usuário do banco da aplicação pública: SELECT/INSERT/UPDATE em tabelas específicas (não `GRANT ALL`). Token de API: scope mínimo. Container Docker: rodar como user non-root quando possível. Coolify env: separar `*_PUBLIC` de `*_SECRET`.

5. **Input validation no boundary.** Todo dado que entra no sistema (request body, query string, header, webhook payload, fila, upload, import CSV) é validado **antes** de qualquer uso: tipo, tamanho, formato, charset, range. Rejeitar com 400/422 quando inválido. Em PHP: `sanitize_text_field`, `intval`, `wp_kses`. Em TS: schema com Zod/Valibot. Sem confiar que "o frontend já validou".

6. **No execução remota de código.** Proibir `eval`, `exec`, `system`, `shell_exec`, `passthru`, `unserialize` com input externo. Em React: nunca `dangerouslySetInnerHTML` sem `DOMPurify` (ou equivalente). Em PHP/WP: `wp_kses_post` para HTML controlado. Quando um plugin/lib pede esse padrão, isolar em função dedicada com input validado e auditado.

7. **Logs sem PII e sem segredos.** Logar **eventos**, não payloads. Tokens, senhas, CPFs, RG, números de cartão e e-mails de cliente nunca aparecem em log/Sentry/Datadog. Para debug: usar IDs opacos. Logs vazam frequentemente (compartilhamento de print, Slack, ticket de suporte) — assumir que é público.

8. **Reversibilidade & blast radius pequeno.** Toda mudança destrutiva (DROP, DELETE em massa, deploy que altera schema, mudança em settings de produção) precisa ter (a) backup imediatamente antes, (b) plano de rollback documentado, (c) feature flag quando possível para liga/desliga sem deploy. Antes de executar, perguntar: "se isso der errado, em quanto tempo eu reverto?".

## Techniques & Frameworks

### OWASP Top 10 2021 — mapeamento para a stack Tektus

| OWASP | Como aparece nos projetos Tektus | Como mitigar |
|---|---|---|
| A01 Broken Access Control | Endpoint WP sem `current_user_can`; rota Edge sem JWT verify | Auth-gate (Princípio 1) |
| A02 Cryptographic Failures | Senha em texto plano em logs; HTTP em vez de HTTPS | TLS sempre, hash bcrypt/argon2 |
| A03 Injection | `$wpdb->query("SELECT * WHERE id=$_GET[id]")`; SQL em string concat | `$wpdb->prepare`, prepared statements, ORM |
| A04 Insecure Design | Fluxo de checkout sem validação de preço server-side | Threat modeling antes (STRIDE) |
| A05 Security Misconfiguration | `wp-config.php` com `WP_DEBUG=true` em prod; CORS `*`; cookies sem `Secure` | Hardening checklist por stack |
| A06 Vulnerable Components | `wp-content/plugins/` desatualizado; `npm` deps com CVE | `npm audit`, `composer audit`, Dependabot |
| A07 Auth Failures | Login sem rate limit, sem MFA, sessão sem expiração | Fail2ban, MFA admin, session timeout |
| A08 Software/Data Integrity | Plugin baixado de site obscuro; CDN sem SRI | Source verification, `integrity=` em `<script>` |
| A09 Logging/Monitoring Failures | Sem log de tentativas de login admin; sem alerta no Discord | UFW + journald + alertas (Princípio 7 com cuidado de PII) |
| A10 SSRF | Webhook que `fetch(url_do_payload)` sem validação | Allowlist de hosts, bloquear IPs internos |

### WordPress / WooCommerce — checklist específico

- **Nonces** (`wp_nonce_field`, `wp_verify_nonce`) em todo formulário/AJAX que altera estado.
- **Capabilities** (`current_user_can`) — **jamais** confiar só em `is_user_logged_in()` (subscriber também é logado).
- **Escaping no output**: `esc_html`, `esc_attr`, `esc_url`, `wp_kses`. Toda variável que vai para HTML é escapada no momento da saída.
- **Prepared statements**: sempre `$wpdb->prepare("... WHERE id = %d", $id)`. Concatenação direta = injection.
- **REST API**: `permission_callback` configurado em toda rota — nunca `__return_true` em prod.
- **Plugins de pagamento**: revisar fluxo server-side de cálculo de preço; nunca confiar em valor enviado pelo cliente.
- **wp-config.php**: `define('DISALLOW_FILE_EDIT', true)`, `WP_DEBUG=false` em prod, `FORCE_SSL_ADMIN=true`.

### React/Vite/TypeScript

- **XSS**: nunca `dangerouslySetInnerHTML` sem `DOMPurify`. Preferir JSX direto (já escapa por padrão).
- **CSRF**: em chamadas de mutação (`POST`/`PUT`/`DELETE`), header `Sec-Fetch-Site` ou token CSRF rotativo.
- **CORS**: backend retorna `Access-Control-Allow-Origin` específico — nunca `*` quando há credenciais.
- **localStorage**: tokens curtos OK; refresh tokens devem estar em httpOnly cookie.
- **`process.env.VITE_*`**: tudo prefixado `VITE_` é embedado no bundle e exposto ao cliente. Nunca colocar segredo aqui.
- **CSP**: `Content-Security-Policy` configurado no Traefik/nginx — bloqueia injeções de script externo.

### Edge Functions Supabase

- **JWT verify por padrão** — só desabilitar (`verify_jwt: false`) com auth interna documentada e revisada.
- **RLS (Row Level Security)** sempre ligado. Política `auth.uid() = user_id` em tabelas de dados de usuário.
- **Service role key**: exclusivo do servidor, nunca em client-side. Se for usar em edge function, scope mínimo.
- **Webhook** que recebe POST externo (ex: Stripe, Mercado Pago): validar assinatura HMAC do header.

### Threat Modeling rápido (STRIDE de 1 página)

Antes de implementar feature nova, responder em 5 minutos:

| Categoria STRIDE | Pergunta para a feature | Ação se "sim" |
|---|---|---|
| **S**poofing | Alguém pode se passar por outro usuário? | Auth + token de sessão único |
| **T**ampering | Dados podem ser alterados em trânsito? | TLS + assinatura |
| **R**epudiation | Usuário pode negar ação que fez? | Audit log com user_id + timestamp |
| **I**nformation Disclosure | Resposta vaza dado de outro usuário? | Filtro server-side por user_id |
| **D**enial of Service | Endpoint pode ser saturado? | Rate limit + circuit breaker |
| **E**levation of Privilege | User comum vira admin acidentalmente? | Capabilities check em cada rota |

## Quality Criteria

Para CADA pull request, código novo ou script ad-hoc, marcar todos:

- [ ] Auth-gate presente em rotas que mutam estado (verificado por leitura, não confiando em "framework cuida disso")
- [ ] Nenhum segredo (token, senha, chave) em código fonte ou em log/response
- [ ] Input externo validado no boundary (tipo, tamanho, charset, range) antes de uso
- [ ] Output escapado/sanitizado de acordo com o destino (HTML, SQL, shell, URL)
- [ ] RLS ativo em tabelas Supabase relevantes; queries SQL sempre com prepared statements
- [ ] Logs sem PII, sem tokens, sem dados de cartão
- [ ] Dependências auditadas (`npm audit` / `composer audit`) sem CVE crítica em produção
- [ ] Plano de rollback documentado para mudanças destrutivas; feature flag quando aplicável

## Output Examples

### Exemplo 1 — Review de script PHP ad-hoc (catch igual ao `_tok.php`)

**Input:** arquivo `wp-content/_tok.php`:
```php
<?php require("/var/www/html/wp-load.php"); echo get_option("superfrete_api_token");
```

**Review:**
```
SECURE CODING REVIEW
═════════════════════════════════════════
Arquivo: wp-content/_tok.php
Linhas: 1
─────────────────────────────────────────
PRINCÍPIOS VIOLADOS:
  ❌ #1 Auth-gate em tudo que muta estado
     → arquivo é apenas leitura, mas EXPÕE segredo via HTTP sem qualquer
       verificação. Linha 1 não tem is_user_logged_in nem
       current_user_can.

  ❌ #2 Segredos NUNCA em código
     → echo direto de get_option('superfrete_api_token') em response HTTP.
       Qualquer requisição GET para /wp-content/_tok.php retorna o token.

  ❌ #6 No execução remota de código (parcial)
     → wp-load.php inicializa todo o stack do WordPress sem necessidade.
       Aumenta superfície de ataque sem benefício.

PERMISSÕES ATUAIS: chmod 755 (executável — desnecessário para PHP)

RISCO: ⛔ EXTREME

VEREDICTO: ❌ BLOQUEAR / REMOVER IMEDIATAMENTE

AÇÕES:
  1. Mover arquivo para fora do webroot (ex: /root/scripts/) — feito 2026-04-23
  2. Rotacionar token do gateway/API exposto (assumir comprometimento)
  3. Buscar nos logs do Traefik/Nginx por hits em /wp-content/_tok.php
     desde 11/03/2026 (data de criação)
  4. Para debug futuro: usar `docker exec wordpress-X wp option get
     superfrete_api_token` (não via HTTP)
═════════════════════════════════════════
```

### Exemplo 2 — Review de Edge Function que integra um gateway de envio (ex.: shipping-gateway, Melhor Envio, Frenet) (catch de SSRF)

**Input:** Edge Function que calcula frete:
```typescript
// supabase/functions/calcular-frete/index.ts
import { createClient } from 'jsr:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  const { url_callback, cep, peso } = await req.json()
  const r = await fetch(`https://api.superfrete.com/v1/calculator?cep=${cep}&peso=${peso}`)
  const data = await r.json()
  // Notifica callback do cliente
  await fetch(url_callback, { method: 'POST', body: JSON.stringify(data) })
  return new Response(JSON.stringify(data))
})
```

**Review:**
```
SECURE CODING REVIEW
═════════════════════════════════════════
Arquivo: supabase/functions/calcular-frete/index.ts
─────────────────────────────────────────
PRINCÍPIOS VIOLADOS:
  ❌ #1 Auth-gate
     → Função pública sem verify_jwt. Qualquer um pode invocar.

  ❌ #5 Input validation
     → cep e peso usados direto na URL. Sem validação de formato (CEP 8
       dígitos, peso numérico). Permite injection na query string.

  ❌ SSRF (OWASP A10) — CRÍTICO
     → url_callback vem do cliente e é fetchado sem validação.
       Atacante envia url_callback="http://169.254.169.254/latest/meta-data/"
       (metadados da cloud) ou "http://localhost:5432/" (Postgres interno) e
       a edge function expõe a resposta. Pode ler credenciais da infra.

  ⚠️ #7 Logs/Monitoring
     → Sem log de chamadas. Não detectaria abuso.

RISCO: 🔴 HIGH

VEREDICTO: ❌ BLOQUEAR

AÇÕES (em ordem):
  1. Adicionar `verify_jwt: true` no config da função
  2. Validar inputs com schema Zod:
     - cep: regex /^\d{5}-?\d{3}$/
     - peso: number positivo, max 30
  3. Para callback: allowlist de domínios do cliente registrado
     (ler de tabela com RLS) — nunca aceitar URL arbitrária do request
  4. Bloquear IPs internos no fetch (169.254.x, 10.x, 127.x, ::1)
  5. Adicionar rate limit por user_id (ex: 60 req/min)
  6. Log estruturado: {user_id, cep_hash, ts} (sem CEP em claro nem callback)

REESCRITA SUGERIDA:
  Ver patch em /tmp/calcular-frete-secure.ts
═════════════════════════════════════════
```

## Anti-Patterns

### Never Do

- **Scripts `.php` ad-hoc soltos em web root.** Mesmo "para debug rápido". Use `wp eval-file` via `docker exec`. Lição: `_tok.php` (2026-03-11 → 2026-04-23, 6 semanas exposto).
- **`echo`/`console.log` de segredos em qualquer contexto.** Nem em "log de debug temporário". Logs vazam.
- **`eval(input_do_usuario)`, `exec($_POST['cmd'])`, `dangerouslySetInnerHTML={{__html: userInput}}` sem sanitizer.** Não existe versão segura disso.
- **`chmod 777`** em qualquer arquivo de produção. Usar 644 para arquivos, 755 para diretórios.
- **CORS `Access-Control-Allow-Origin: *`** com `Allow-Credentials: true`. Combinação proibida pelo browser, mas mesmo `*` puro é ruim em endpoints autenticados.
- **Confiar em validação client-side.** Frontend é assistivo, não autoritativo. Toda validação importante roda no servidor.

### Always Do

- **Code review humano antes de merge** em qualquer mudança que toca auth, pagamento, ou dados de cliente. Vibecoded ainda mais.
- **Auditar dependências** mensalmente (`npm audit`, `composer audit`, Dependabot/Renovate). CVE crítica em prod = alerta imediato.
- **SAST básico no CI** (Semgrep com regras OWASP). Roda em <1min, pega 80% dos casos óbvios.
- **Logs estruturados** (JSON) em vez de string concatenation. Permite filtrar PII antes de export.
- **Documentar plano de rollback** para todo deploy que altera schema, settings de produção, ou config de pagamento.

## Vocabulary Guidance

### Always Use

- **auth-gate** — verificação de autenticação E autorização na entrada de uma rota/função
- **threat model** — análise estruturada de riscos antes de implementar
- **blast radius** — escopo do estrago se algo der errado (1 usuário? 1 cliente? toda a base?)
- **least privilege** — princípio de dar a permissão mínima necessária
- **defense-in-depth** — múltiplas camadas independentes de proteção
- **prepared statement** — query SQL com placeholders, não concatenação
- **escape on output** — escapar dado no momento da renderização, não no input

### Never Use

- **"Seguro"** sem qualificar contra o quê. ("seguro" contra SQL injection? XSS? CSRF? quem é o atacante?)
- **"Robust"**, **"enterprise-grade"**, **"hardened"** como adjetivos vagos sem referência a um padrão concreto.
- **"Confiar no usuário"** — em segurança, ninguém é confiável por padrão.

### Tone Rules

- **Específico, não dramático.** Em vez de "isso é uma falha gigantesca de segurança!", escrever "violação do princípio #2 (segredos em código), risco EXTREME, ação: rotacionar token e remover arquivo".
- **Educar enquanto bloqueia.** Quando vetar um PR, explicar o **porquê** com referência ao princípio + exemplo de ataque concreto. O autor (the user via vibecoding) precisa entender para não repetir.
- **Foco em remediação, não em culpa.** O `_tok.php` foi feito por boas intenções (debug). O foco é evitar reincidência, não punir.

---

## Referências internas

- Lições registradas em `.learnings/LEARNINGS.md` (LRN-20260423-001) e `.learnings/ERRORS.md` (ERR-20260423-001)
- Squad que aplica esta best-practice: `squads/internal/cyber-security/secure-coding-reviewer.md`
- Skill complementar (após estabilização desta): `secure-code-review` (skill ATIVA com Semgrep, FR-20260424-002)
- Doc de infra: `<your-infra-docs>/VPS-baseline.md` (cobre lado de hardening — fora do escopo desta best-practice)
