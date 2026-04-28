---
description: "Protocolo de Orquestração e Descoberta Dinâmica de Ferramentas (ODP)"
globs: "**/*"
alwaysApply: true
---

# 🤖 Protocolo de Orquestração (ODP)

Este protocolo garante que o orquestrador (Antigravity / Cursor / Claude Code) utilize sempre as melhores ferramentas disponíveis na agência antes de implementar qualquer solução manualmente.

> 🪝 **Hook de reforço (Claude Code):** `.claude/hooks/odp-reminder.js` é executado em TODO `UserPromptSubmit` e injeta no contexto do agente um lembrete compacto do catálogo + ODP. Configurado em `.claude/settings.local.json`.

## 🔍 Procedimento de Descoberta (Obrigatório em TODA resposta)

Para **qualquer pedido** (incluindo aparentemente triviais — exceto mudanças puramente de formatação como typo único ou rename simples), o agente deve seguir estes passos:

1. **Auditoria de Skills**: Verificar `skills/` (master) e `.claude/skills/` (instaladas via LobeHub ou plugin manager) por habilidade especializada. Lista canônica: ver inventário no [`README.md`](../../README.md) e na seção "Skills extras".
2. **Auditoria de Squads**: Consultar **[`squads/_catalog.md`](../../squads/_catalog.md)** (catálogo canônico) e [`squads/_registry.yaml`](../../squads/_registry.yaml) para identificar agente/squad focado no domínio do pedido.
3. **Auditoria de Best-Practices**: Consultar [`core/best-practices/_catalog.yaml`](../best-practices/_catalog.yaml) quando for trabalho de criação de conteúdo, código ou design.
4. **Auditoria de MCP**: Listar servidores MCP ativos e suas ferramentas.
   - Para **GA4** (relatórios, propriedades, tempo real, links Google Ads): usar o MCP **`google-analytics-mcp`** (ver `.cursor/docs/MCP_GOOGLE_ANALYTICS.md`).
5. **Declaração de Ferramentas (OBRIGATÓRIA)**: No início de **toda** resposta, o agente DEVE listar explicitamente o que identificou — em **uma linha curta** ou bloco compacto.
   - *Exemplo curto: "Para esta tarefa: skill `marketing-expert` + best-practice `instagram-feed` + skill `humanizer` no passe final. Motivo: post Instagram em PT-BR."*
   - *Exemplo de pedido pequeno: "Tarefa simples (rename) — sem orquestração necessária."*
   - **Exceção (skip declaration):** typo de 1 palavra, rename trivial, format-only, ou pergunta puramente conversacional ("qual a hora?"). Para tudo mais, declarar.

## 🛡️ Diretivas Específicas: Segurança & Código

Sempre que o pedido envolver **código** (criar, editar, revisar, deploy), **infraestrutura** (VPS, Coolify, n8n, Docker), **dados sensíveis** (clientes, autenticação, pagamento), ou **integração com APIs externas**:

- **OBRIGATÓRIO**: Invocar squad `Cyber-Security` ([`squads/internal/cyber-security/`](../../squads/internal/cyber-security/)):
  - **Code review** → `@Cassio_SecRev` (secure-coding-reviewer)
  - **CI/CD, secrets, deps** → `@Davi_DevSecOps` (devsecops-engineer)
  - **Hardening VPS, monitoring** → `@Mira_InfraSec` (infra-security-monitor)
  - **Incidente em curso** → `@Igor_IR` (incident-responder)
  - **Decisão estratégica de risco** → `@Iris_CISO` (líder)
- **OBRIGATÓRIO**: Aplicar best-practice `secure-coding` ([`core/best-practices/secure-coding.md`](../best-practices/secure-coding.md)).
- Antes de instalar qualquer skill nova: usar **`skill-vetter`** (regra [`10-skill-vetting.md`](./10-skill-vetting.md)).

## 🎨 Diretivas Específicas: Front-end (UI/UX)

Sempre que o pedido envolver UI, UX ou criação de interfaces:
- **OBRIGATÓRIO**: Usar a skill `ui-ux-pro-max`.
- **OBRIGATÓRIO**: Consultar o **MCP `21st`** para buscar componentes reutilizáveis (backgrounds, botões, tabelas, heros, etc.). Não crie do zero se houver um componente disponível.

## ✍️ Diretivas Específicas: Marketing & Conteúdo

Sempre que o pedido envolver copy, conteúdo, post social, email, blog, branding, lançamento, anúncio, estratégia de mercado, ou narrativa:

- **OBRIGATÓRIO**: Carregar a best-practice da plataforma/formato específico em [`core/best-practices/`](../best-practices/). Mapeamento:

| Tipo de pedido | Skill / Squad / Best-practice |
|---|---|
| Copy persuasivo, ad, headline, CTA, página de vendas | skill `marketing-expert` + best-practice `copywriting` |
| Texto em PT-BR (B2B, WhatsApp, social) | **skill `humanizer` no passe final** (reduz cara de IA) |
| Post Instagram (feed) | best-practice `instagram-feed` + invocar `copy-squad-pool` |
| Post Instagram (reels) | best-practice `instagram-reels` |
| Post Instagram (stories) | best-practice `instagram-stories` |
| Post LinkedIn (curto) | best-practice `linkedin-post` |
| Artigo LinkedIn | best-practice `linkedin-article` + `technical-writing` |
| Tweet / X post | best-practice `twitter-post` |
| Thread Twitter/X | best-practice `twitter-thread` |
| Roteiro YouTube (long-form) | best-practice `youtube-script` |
| YouTube Shorts | best-practice `youtube-shorts` |
| Email newsletter | best-practice `email-newsletter` + skill `resend` para envio |
| Email vendas / cold outreach | best-practice `email-sales` + skill `resend` |
| Blog post (conteúdo) | best-practice `blog-post` |
| Blog post (SEO) | best-practice `blog-seo` |
| WhatsApp broadcast / mensagem | best-practice `whatsapp-broadcast` + skill `humanizer` |
| Estratégia de marketing / 90-day plan | skill `marketing-expert` (Estrategista) |
| Lançamento (CPL, carrinho, sequência) | skill `marketing-expert` (Especialista em Funil) |
| Growth experiments / CAC / LTV | skill `marketing-expert` (Growth Marketing) + squad `Performance-Ads` |
| Branding / identidade / posicionamento | `brand-pool` + skill `marketing-expert` (Branding) |
| Marca pessoal | skill `marketing-expert` (Marca Pessoal) |
| Storytelling / roteiro narrativo | `storytelling-pool` |
| Design visual (criativo, banner, carrossel) | skill `design` ou `banner-design` + `design-pool` |
| Pesquisa / data brief | best-practice `researching` |
| Review / QC de conteúdo | best-practice `review` |
| Estratégia editorial / calendário | best-practice `strategist` |
| Análise de métricas / report | best-practice `data-analysis` |
| Long-form técnico / documentação | best-practice `technical-writing` |

- **OBRIGATÓRIO** para todo texto final em PT-BR: passe da skill `humanizer`.
- **Publicação** (Instagram, X, etc.): considerar skill `blotato` (multi-plataforma), `instagram-publisher` (carrossel direto), ou `social-networks-publishing` (best-practice).
- **Templates visuais**: skill `template-designer` quando precisar de identidade visual consistente para a entrega.

## 📈 Diretivas Específicas: Tráfego Pago

Sempre que o pedido envolver Meta Ads, Google Ads, TikTok Ads, lançamento pago, gestão de campanha, ou criativo de ad:

- **OBRIGATÓRIO:** verificar `pixel-setup` BP completo antes de qualquer R$ subir. DebugView verde com 3 eventos reais = pré-condição absoluta.
- **OBRIGATÓRIO:** seguir `paid-launch` BP (8 fases) end-to-end. Não pular Fase 6 (checklist pré-vôo).
- **OBRIGATÓRIO:** invocar squad `traffic-launch` (onboarding) ou `traffic-audit` (contas existentes).
- **OBRIGATÓRIO:** invocar squad `traffic-analytics` pra mensuração ongoing — kill/scale/new-wave decisions assinadas.
- Para criativos: `ad-creative` BP + agente `cassiano-criativo` (squad traffic-masters-pool).
- Reaproveitamento de orgânico → ad: skill `creative-recycle` (orquestradora).
- Upload manual: agentes `marcos-meta` / `gabriel-google` operam BM/Google Ads UI.
- Upload automático: skills `meta-ads-api` / `google-ads-api` (em SPEC v0.1.0 — implementação dedicada antes de ir pra produção).

| Tipo de pedido | Skill / Squad / Best-practice |
|---|---|
| Lançar campanha Meta+Google nova | squad `traffic-launch` + best-practice `paid-launch` |
| Auditar conta existente (forense) | squad `traffic-audit` |
| Configurar tracking (Pixel + CAPI + GTM SS) | best-practice `pixel-setup` + agente `pedro-pixel` |
| Criativo de ad (script, copy, hook) | best-practice `ad-creative` + agente `cassiano-criativo` |
| Reaproveitar carrossel orgânico em ad | skill `creative-recycle` |
| Upload automático de campanhas | skills `meta-ads-api` + `google-ads-api` (SPEC) |
| Mensuração + kill/scale/new-wave | squad `traffic-analytics` (paid-analyst + attribution-curator) |
| Atribuição honesta cruzando CRM | agente `attribution-curator` |

### 🚀 Tráfego Pago 2026 (refinamentos plataforma-específicos)

A partir de **abril/2026**, três best-practices datadas (`last_updated: 2026-04-27`) refletem as mudanças estruturais nas plataformas — **devem ser invocadas em conjunto** com os BPs gerais acima quando o canal é definido:

| Tipo de pedido | Adicionar (além dos BPs gerais) |
|---|---|
| Campanha Meta Ads (Facebook/Instagram) em 2026 | best-practice `meta-ads-2026` (Andromeda · Lattice · 3-1-Many · Hook Rate · EMQ) + skill `marketing-expert` (9ª persona) |
| Briefar / dirigir / auditar criativo Meta 2026 | best-practice `creative-direction-meta-2026` (VEO · Trope Stacking · OCR ≤ 20% · Reels-first) |
| Campanha Google Ads em 2026 | best-practice `google-ads-2026` (Power Pack · AI Max · PMax · ALF/UCP · AI Overviews) + skill `marketing-expert` (9ª persona) |
| Estratégia de tráfego pago Meta+Google 2026 | skill `marketing-expert` (9ª persona) — sintetiza os 3 BPs acima |
| **Análise / diagnóstico de campanha Meta existente** (CPL alto, ROAS caiu, frequency, learning travada) | **skill `meta-ads-analyzer`** (compliance terminológico Meta + data integrity + marginal cost reasoning) + best-practice `meta-ads-2026` (KPIs benchmark) |
| **Reporting de Meta Ads para cliente B2B** (compliance Meta — "Accounts Center accounts", "Clicks (all)", sentence case) | **skill `meta-ads-analyzer`** seções 1 + 4 (regras inegociáveis + output rules) |
| Pergunta sobre policy Meta (é permitido?) | skill `meta-ads-analyzer` seção 6 — rotear pra URL oficial via tool `<your-meta-mcp>__get_policy` |

**Regra de uso:** os BPs `paid-launch`, `pixel-setup` e `ad-creative` (v1.1.0) cobrem a **estrutura multi-canal atemporal**. Os BPs `*-2026` cobrem **mudanças estruturais específicas** que vão ser revalidadas trimestralmente. **Sempre carregar os dois lados** quando o pedido toca uma das plataformas em 2026.

## 🛠️ Diretivas Específicas: Stacks Técnicas (skills externas vetadas)

Sempre que o pedido envolver uma das stacks abaixo, **invocar a skill correspondente** em vez de implementar manualmente:

### WordPress

| Tipo de pedido | Skill |
|---|---|
| Site WP lento, audit de performance, autoload bloat, queries pesadas | `wp-performance` |
| Desenvolver / revisar plugin WP (hooks, settings API, security) | `wp-plugin-development` |
| Endpoints REST customizados, schema, register_rest_route | `wp-rest-api` |
| WooCommerce, custom post types, migrations | `wp-plugin-development` + `wp-rest-api` |

### Supabase / Postgres

| Tipo de pedido | Skill |
|---|---|
| Auth, RLS policies, JWT, sessions, getUser/getClaims | `supabase` |
| Edge Functions, Realtime, Storage, Vector | `supabase` |
| Schema design, indexes, query optimization, locks | `supabase-postgres-best-practices` |
| Postgres extensions (pg_graphql, pg_cron, pg_vector) | `supabase` |

### Stripe / Pagamentos

| Tipo de pedido | Skill |
|---|---|
| Aceitar pagamentos, Checkout vs PaymentIntents, billing, subscriptions | `stripe-best-practices` |
| Connect platform, marketplaces, Treasury | `stripe-best-practices` |
| Migrar versão de API ou SDK Stripe | `upgrade-stripe` |
| Restricted keys, webhooks, OAuth | `stripe-best-practices` + `secure-coding` BP |

### n8n (automação de fluxos)

| Tipo de pedido | Skill |
|---|---|
| Workflow novo (webhook, schedule, batch) | `n8n-workflow-patterns` |
| Code node em JavaScript | `n8n-code-javascript` |
| Code node em Python | `n8n-code-python` |
| Configurar nó (parâmetros, displayOptions) | `n8n-node-configuration` |
| Validar workflow, interpretar erros | `n8n-validation-expert` |
| Expressões `{{ $json.X }}`, debugar `$node`/`$input` | `n8n-expression-syntax` |
| Usar n8n-mcp tools | `n8n-mcp-tools-expert` |

### Google Workspace

| Tipo de pedido | Skill |
|---|---|
| Ler/escrever em Sheets | `gws-sheets` (+ `gws-shared` para auth) |
| Ler/escrever em Docs | `gws-docs` |
| Drive — files, folders, shared drives | `gws-drive` |
| Gmail — send / read / triage / labels | `gws-gmail` |
| Calendar — events, agenda, scheduling | `gws-calendar` |
| Forms — read responses, write forms | `gws-forms` |

### MCP (Model Context Protocol)

| Tipo de pedido | Skill |
|---|---|
| Construir MCP server (FastMCP Python ou TS SDK) | `mcp-builder` |
| Integrar API externa como tool de agente | `mcp-builder` |

### GitHub (PRs, automation)

| Tipo de pedido | Skill |
|---|---|
| Criar / revisar PRs, stacked PRs, branching strategies | `github` |
| `gh` CLI patterns para automação | `github` |

### Imagem / mídia / publicação

| Tipo de pedido | Skill / Squad |
|---|---|
| **Carrossel completo** (briefing → slides → caption → publish) | **`carousel-creator`** (orquestra template-designer + marketing-expert + humanizer + image-creator + instagram-publisher) |
| **Reaproveitar orgânico em ad pago** (carrossel/reel → ad estático/video) | **`creative-recycle`** (orquestra image-creator + marketing-expert + humanizer + ad-creative BP) |
| Render HTML→PNG individual (1 imagem, infográfico, social graphic) | `image-creator` (Playwright) |
| Buscar imagem na web ou screenshot live de página | `image-fetcher` |
| Gerar imagem via IA (test/production modes) | `image-ai-generator` |
| Publicar carrossel direto no Instagram | `instagram-publisher` |
| Publicar em múltiplas plataformas (IG/LinkedIn/X/TikTok/YT) | `blotato` |
| Designs no Canva (templates, autofill, export) | `canva` |
| Web scraping, social profile data, search results | `apify` |
| Email transacional / marketing (HTML, batch, schedule) | `resend` |
| Designs canvas-based (.png/.pdf, posters, art) | `canvas-design` |
| HTML artifacts complexos (React + Tailwind + shadcn) | `web-artifacts-builder` |

### Token Economy & memória de sessão

| Tipo de pedido | Skill / Rule |
|---|---|
| Repo > 200 arquivos, query semântica do código | `context-lens` (rule 02) |
| Manter memória entre sessões, decisões, conventions | `workspace-state` (`/state read|update|diff`) |
| Primeira mensagem em projeto sem `.tektus/profile.yaml` | `tektus-onboarding` (rule 14) |

### Meta-skills (criar/atualizar o próprio OS)

| Tipo de pedido | Skill |
|---|---|
| Criar skill nova com evals e testes | `opensquad-skill-creator` |
| Criar/atualizar best-practice no catálogo | `opensquad-agent-creator` |
| Vetting de skill externa (segurança) | `openclaw-skills-skill-vetter` (rule 10) |
| Registrar aprendizado, erro, feature request | `openclaw-skills-self-improving-agent` (rule 13) |

## 🧠 Lógica de Decisão

- Se existir uma ferramenta especializada: **Use-a.**
- Se a ferramenta exigir configuração: **Ask the user.**
- Se não houver ferramenta: **Siga com implementação nativa, mencionando que buscou e não encontrou.**
- Em caso de erro/correção do usuário: registrar em `.learnings/` (skill `self-improving-agent`).

## 🔄 Sincronização Cross-IDE

Esta regra está espelhada em 3 locais (Antigravity / Cursor / Claude Code) — alterações em uma DEVEM ser propagadas para as outras 2. Ver [`11-cross-ide-sync.md`](./11-cross-ide-sync.md).

## 📦 Skills bundled vs externas

Algumas skills citadas neste protocolo são **bundled** (incluídas em `skills/`), outras são **externas** (instalar separadamente via plugin manager / LobeHub / repositório do mantenedor).

| Status | Skills | Fonte |
|---|---|---|
| ✅ **Bundled** (em `skills/`) | `canvas-design`, `carousel-creator`, `context-lens`, `creative-recycle`, `github`, `google-ads-api` (spec), `gws-*`, `marketing-expert`, `mcp-builder`, `meta-ads-api` (spec), `n8n-*`, `openclaw-*`, `stripe-best-practices`, `supabase`, `supabase-postgres-best-practices`, `tektus-onboarding`, `upgrade-stripe`, `wp-*` | Este repo |
| ⚠️ **Externas — Tektus** (instalar separado) | `humanizer`, `ui-ux-pro-max`, `image-creator`, `image-fetcher`, `image-ai-generator`, `template-designer`, `apify`, `blotato`, `canva`, `resend`, `instagram-publisher` | LobeHub Marketplace ou repos próprios |
| ⚠️ **Externas — Meta** (instalar separado) | `opensquad-skill-creator`, `opensquad-agent-creator` | Anthropic skill creators (Apr 2026) |

**Comportamento esperado:** se o protocolo cita uma skill que não está local, o agente deve mencioná-la na declaração ODP, sugerir instalação via `skill-vetter` (regra 10) e seguir com fallback nativo enquanto ela não está disponível. Não trate como erro — trate como capacidade futura.
