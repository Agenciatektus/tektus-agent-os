---
id: pixel-setup
name: "Pixel Setup — Tracking server-side completo (Meta CAPI + Google + GA4)"
whenToUse: |
  Creating agents that set up tracking infrastructure for paid campaigns:
  Meta Pixel + Conversions API server-side, Google Tag + Enhanced
  Conversions, GA4 events, GTM (client + server), validation in DebugView.
  Must be done BEFORE any paid traffic spend.
  NOT for: setting up GA4 reports/dashboards (use `data-analysis`); building
  attribution models from data (use squad `traffic-analytics`); choosing what
  KPIs to measure (use BP `strategist`).
version: "1.1.0"
last_updated: "2026-04-27"
---

# Pixel Setup — Best Practices

## Core Principles

1. **Server-side é o novo padrão, não opcional.** Meta CAPI server-side recupera 30-60% dos sinais perdidos pelo iOS 14+ + ad blockers + ITP. Quem ainda confia só em browser pixel está rodando com mapa de 2019. Configurar CAPI não é "se sobrar tempo" — é parte da fundação.

2. **DebugView verde antes de qualquer R$ gasto.** Regra absoluta: 3 eventos de teste reais (PageView, ViewContent, Lead) batendo no DebugView do GA4 + Test Events do Meta + Test Conversions do Google ANTES da primeira campanha sair de pausa. Não há exceção.

3. **Eventos por funil, não por excitação.** Configure só o que você vai usar pra otimizar/medir. PageView genérico em todas as páginas vira ruído. Use **eventos significativos**: ViewContent (página de produto/oferta), AddToCart, Lead (form submit), Purchase (com value real). Cada evento mapeado a uma decisão de campanha.

4. **Value parameter é dinheiro.** Eventos sem `value` (preço real do produto/lead estimado) impedem o algoritmo de otimizar pra ROAS. Sempre passe value — mesmo estimado pra leads (ex: R$ 250 por lead que historicamente fecha em 30%). Sem value = sem otimização avançada.

5. **GTM Server-Side é maior alavanca.** Em vez de browser→Meta direto, use Browser → GTM Web Container → GTM Server Container → Meta + Google + GA4 + qualquer outro destino. Server-side: bypass de adblock, sanitização de PII, retry de eventos perdidos, latência menor.

6. **Naming convention nos eventos custom.** Toda evento custom segue `<funil>_<acao>_<contexto>`. Ex: `topo_pageview_blog`, `meio_lead_landing-saloes`, `fundo_purchase_assinatura-pro`. Sem isso, relatórios viram caos quando há 3+ produtos no mesmo cliente.

7. **PII sanitization é não-negociável.** Email, telefone, CPF NUNCA viajam em texto claro pra plataformas de ads. Hashed (SHA-256) sim — mas server-side, jamais browser. LGPD é regra dura, não sugestão.

8. **Documente o spec — futuro você vai precisar.** Toda config de tracking gera um `tracking-spec.md` versionado: quais eventos, onde disparam, quais parâmetros, qual destino. Refatorar tracking sem doc = recomeçar do zero.

## Stack arquitetural padrão

```
[Browser do usuário]
       ↓
[GTM Web Container]
       ↓ (envia evento server-side via Measurement Protocol / sGTM endpoint)
       ↓
[GTM Server Container]  ← roda em domínio próprio (sgtm.cliente.com)
       ↓ ↓ ↓ ↓
       ↓ ↓ ↓ └→ Meta CAPI (Conversions API)
       ↓ ↓ └──→ Google Tag (gtag) + Enhanced Conversions
       ↓ └────→ GA4 (Measurement Protocol)
       └──────→ TikTok Events API / outros (opcional)
```

Por que GTM SS:
- 1 ponto de configuração (não precisa atualizar 4 SDKs no site)
- PII hashing acontece num lugar só
- First-party data — cookies próprios do cliente, não de terceiros
- Latência menor (não bate em N serviços de terceiros)

Hosting do GTM SS:
- Google Cloud Run (default — pago por uso, ~R$ 30-100/mês)
- Self-hosted no Coolify (sem custo extra de infra, mais trabalho)

## Methodology — 7 fases de setup

### Fase 1 — Mapeamento de eventos (1h)

Junto com o cliente:
- Lista de páginas-chave do funil
- Ações que importam (form submit, click no WhatsApp, scroll 75%, etc.)
- Valor de cada conversão (lead value, ticket médio, LTV)

Output: `events-spec.md` com tabela:

| Evento | Quando dispara | Parâmetros obrigatórios | Destino |
|---|---|---|---|
| PageView | toda página | page_location, page_title | GA4, Meta, Google |
| ViewContent | página de produto/oferta | content_id, content_name, value, currency | Meta, Google |
| Lead | form submit | lead_source, value (estimado) | Meta, Google, GA4, CRM |
| Purchase | confirmação de compra | transaction_id, value, currency, items[] | todos |

### Fase 2 — Setup de containers (1h)

- GTM Web container — adicionar `<script>` GTM no `<head>` do site
- GTM Server container — provisionar (Cloud Run OU Coolify)
- Configurar custom domain pro server container (sgtm.cliente.com → CNAME pra Cloud Run / Coolify)
- Validar com `https://sgtm.cliente.com/healthy` retornando 200

### Fase 3 — Triggers + tags no Web container (2-3h)

Por evento da Fase 1:
- Trigger (que dispara — clique, form, page view, scroll)
- Tag (envia o evento pro server container endpoint)
- Variables (pegam dados do dataLayer ou do DOM)

Não esqueça:
- DataLayer.push consistente (developer do site precisa implementar)
- Custom events (Lead com formulário custom precisa de event listener)

### Fase 4 — Tags no Server container (1-2h)

No Server container, criar 1 tag por destino:
- **Meta CAPI**: API token (Business Settings → System Users), pixel ID
- **Google Tag**: measurement ID (gtag), conversion linker
- **GA4**: measurement ID, API secret
- **TikTok / outros**: conforme aplicável

PII hashing: usar SHA-256 server-side em email/phone antes de enviar.

### Fase 5 — Enhanced Conversions / Advanced Matching (30min)

Meta:
- Advanced Matching: hash em email + phone do form
- Liga matching rate de ~40% pra ~70%

Google:
- Enhanced Conversions: hash de email no momento da conversão
- Recupera 5-15% de conversões perdidas

### Fase 6 — Validação (CRÍTICA — 1h)

Em ordem:
1. **GTM Preview Mode** — abre o site, navega, dispara eventos. Valida que cada tag dispara no momento certo.
2. **Meta Test Events** — em Events Manager > Test Events, cole URL do site. Eventos batendo com `test_event_code`.
3. **Google Tag Assistant** — instala extensão Chrome, navega, valida tags carregando.
4. **Google Ads Conversions** — em Tools > Conversions, evento aparece "Recording conversions".
5. **GA4 DebugView** — habilita debug mode (extensão Chrome), navega, eventos aparecem em tempo real.
6. **Server logs** (sGTM) — Cloud Run logs OU Coolify logs do container — eventos chegando.

**Critério de aprovação:** 3 eventos de funil completo (PageView → ViewContent → Lead) aparecem em **TODOS** os destinos no DebugView, com value parameter correto.

### Fase 7 — Documentação + handoff (30min)

Output final: `tracking-spec-{cliente}.md` com:
- Tabela de eventos da Fase 1
- Diagrama da arquitetura
- Endpoints (sGTM URL, GA4 measurement ID, etc.)
- Troubleshooting comum (eventos não chegando: checar X, Y, Z)
- Owner: quem mantém quando algo quebra

Commit no repo do cliente (não no monorepo geral). Versionar.

## Quality Criteria

Antes de declarar tracking "production-ready":

- [ ] Events spec documentado (tabela com 5+ eventos do funil)
- [ ] GTM Web + GTM Server containers ativos
- [ ] Server container em domínio próprio (sgtm.cliente.com), HTTPS válido
- [ ] PII hashing server-side configurado
- [ ] Meta CAPI + Google Tag + GA4 todos com test events validados
- [ ] Advanced Matching / Enhanced Conversions ativados
- [ ] DebugView mostrando 3 eventos reais com value correto
- [ ] Naming convention aplicada em events custom
- [ ] tracking-spec.md commitado no repo do cliente

## Output Examples

### Example 1 — Setup pra SaaS B2B (form de demo)

```
Cliente: SaaS de gestão pra salões
Funil: blog → landing → form-demo → call-comercial → assinatura

Eventos mapeados:

| Evento | Quando | Parâmetros | Destino |
|---|---|---|---|
| PageView | toda página | page_location, page_title | GA4, Meta |
| BlogView | views em /blog/* | content_id (slug), content_category | GA4 |
| LandingView | view em /demo | content_id="demo-saloes", value=250 | Meta, Google |
| FormStart | clique no primeiro field do form | form_id="demo" | GA4 |
| Lead | submit do form-demo | lead_source, value=250, email_hash, phone_hash | Meta CAPI, Google EC, GA4, CRM via webhook |
| ScheduledCall | agendamento confirmado no Calendly | call_date, value=250 | Meta CAPI |
| Subscription | assinatura ativada (webhook do Stripe) | transaction_id, value=297, currency=BRL, plan | todos |

Stack:
  GTM Web (gtm.example.com)
  GTM Server (sgtm.cliente.com — Cloud Run)
  → Meta Pixel + CAPI
  → Google Tag + Enhanced Conversions
  → GA4 Measurement Protocol
  → Webhook pro CRM (n8n receiver)

PII handling:
  email + phone do Lead → SHA-256 server-side
  Browser nunca vê o hash; server faz e envia

Validação concluída 2026-01-15:
  ✅ GTM Preview: 7/7 events disparam corretos
  ✅ Meta Test Events: PageView + Lead chegando com value=250
  ✅ Google Conversion Recording: ON
  ✅ GA4 DebugView: events em tempo real, com user_pseudo_id

Owner: pedro-pixel
```

### Example 2 — Anti-pattern (NÃO faça assim)

```
Cliente: e-commerce de roupa

❌ Setup atual encontrado em audit:
  - Meta Pixel base via tag <script> hardcoded no header
  - Google Analytics Universal (descontinuado!) ainda rodando
  - Eventos disparados via onclick="fbq('track', 'AddToCart')"
  - Sem CAPI server-side
  - Sem Enhanced Conversions
  - PII (email do checkout) viajando em PARAMETER PLAINTEXT pra Meta
  - DebugView não consultado em 18 meses
  - Naming caótico: "AddToCart-v2-novo", "Lead-final-final-2"

❌ Risco LGPD: alto (PII em texto claro)
❌ Risco performance: 40-50% das conversões invisíveis no algoritmo

✅ Plano de correção (urgente):
  Semana 1: rotacionar acesso ADV; migrar pra GA4 (Universal morre); pausar
            qualquer envio de PII em texto claro.
  Semana 2: provisionar GTM Server-Side em sgtm.cliente.com; refatorar
            eventos de browser pra dataLayer; sanitização de PII.
  Semana 3: configurar Meta CAPI + Google Enhanced Conversions; validar
            DebugView com 3 eventos de funil completo.
  Semana 4: documentar tracking-spec.md; treinar dev do cliente; setar
            cron de health check (sintético) pra alertar se eventos
            sumirem 6h+.
```

## Anti-Patterns

### Never Do

- **Pixel solto via `<script>` no header** sem GTM — impossibilidade de gerenciar/validar/atualizar.
- **PII em texto claro** — risco legal LGPD + ban da conta de ads.
- **Eventos sem value parameter** — algoritmo não consegue otimizar ROAS.
- **Universal Analytics em 2026** — descontinuado. Migre pra GA4 ontem.
- **"Vou subir campanha agora e configuro tracking depois"** — clássico que acaba em 4 semanas de campanha sem dado.
- **Custom events com names aleatórios** — naming convention sempre.

### Always Do

- **GTM Server-Side por padrão**, mesmo em cliente pequeno (Cloud Run sai R$ 30-100/mês = trivial vs ROI).
- **Hash PII server-side** — única forma segura.
- **Test events na DebugView ANTES** de qualquer R$ de tráfego.
- **Documentar tracking-spec.md** — futuro você vai precisar.
- **Health check sintético** — bot que dispara evento de teste a cada 6h e alerta no Discord se sumir.

## Vocabulary Guidance

### Always Use

- "Server-side" / "sGTM" / "GTM SS"
- "CAPI" (Conversions API — Meta)
- "Enhanced Conversions" (Google)
- "Advanced Matching" (Meta)
- "Measurement Protocol" (GA4)
- "DebugView"
- "First-party data" (vs "third-party cookies")
- "PII hashing" (não "encriptação")
- "Health check sintético"

### Never Use

- "Pixel" sem qualificar (browser? CAPI? ambos?)
- "Configurar GA" — sempre especifique GA4 (nunca Universal em 2026+)
- "Quando der" — tracking não é "quando der", é pré-requisito
- "Eventos extras pra cobrir" — só o que vai usar

### Tone Rules

- **Operacional + paranoid.** Tracking quebra silenciosamente; assume falha até provado funcionando.
- **Documentado > memorizado.** Spec por escrito > "o pedro lembra como tá".

## 2026 Refinements — Event ID, EMQ, Enhanced Conversions

Em 2026, a qualidade do sinal enviado ao auction define mais que estrutura de campanha. Três padrões obrigatórios:

### Event ID + Deduplicação CAPI ↔ Pixel

Toda conversão dispara **2 vezes**: uma do navegador (Pixel), outra do servidor (CAPI). Sem `event_id` consistente entre os dois, Meta conta duplicado e EMQ despenca. Padrão obrigatório:

```js
const eventId = `${eventName}.${userId || sessionId}.${Date.now()}`;
fbq('track', 'Purchase', { value, currency, content_ids }, { eventID: eventId });
// Servidor envia o MESMO event_id via CAPI:
{ event_name: 'Purchase', event_id: eventId, ...customer_info_hashed }
```

### EMQ (Event Match Quality) ≥ 8 / 10

Meta calcula EMQ por evento baseado em quantos parâmetros de match você envia (email_hash, phone_hash, fbp, fbc, ip, user_agent, click_id, external_id). EMQ < 6 = Andromeda perde 30-50% de matching. Mínimo aceitável em 2026: **EMQ médio ≥ 8** em todas as conversões. Validar em **Events Manager → Diagnostics → Match Quality**.

### Enhanced Conversions API Unificada (Google)

Google está unificando Enhanced Conversions for Web + Enhanced Conversions for Leads em **uma API só** ao longo de 2026. Migrar antes do deadline (anunciado por phase). Hashing de email/phone com SHA-256 no client antes de enviar (jamais enviar plain text). Padrão de encoding alinhado com `gtag('config', 'AW-...', { allow_enhanced_conversions: true })`.

### Cross-references plataforma-específicas

- Meta CAPI + Event ID + EMQ → ver `meta-ads-2026.md` (princípio "tracking puro = leilão limpo")
- Google Enhanced Conversions + Merchant API deadline 18/08/2026 → ver `google-ads-2026.md`

## Downstream consumers

- Best-practice `paid-launch` — exige este BP completo na Fase 2 antes de subir tráfego
- Squad `traffic-launch` — owner principal: agente `pedro-pixel`
- Squad `traffic-analytics` — depende dos eventos pra medir CAC/ROAS reais
- Skill `meta-ads-api` / `google-ads-api` — só sobem campanhas com tracking validado
- Best-practice `meta-ads-2026` / `google-ads-2026` — refinamentos plataforma-específicos 2026
