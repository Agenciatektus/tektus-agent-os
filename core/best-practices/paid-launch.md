---
id: paid-launch
name: "Paid Launch — Framework end-to-end de campanha de tráfego"
whenToUse: |
  Creating agents that plan, launch and operate paid traffic campaigns
  end-to-end (Meta + Google + TikTok). From brief to creative to
  structure to upload to learning-phase management to scale or kill.
  NOT for: organic content (use `strategist` + content squads); product
  launches with multi-stage funnel (use `marketing-expert` Especialista em
  Funil + this BP for the paid leg); audit of existing accounts (use
  squad `traffic-audit`).
version: "1.1.0"
last_updated: "2026-04-27"
---

# Paid Launch — Best Practices

## Core Principles

1. **Tracking precede tráfego.** Não suba R$1 de campanha antes de validar Pixel + CAPI server-side em DebugView. Campanha rodando com tracking quebrado = budget queimado sem aprendizado. A regra é absoluta: pixel-setup completo + 3 eventos de teste validados → AÍ campanha sobe.

2. **Estrutura aglutinada > fragmentada.** Modelo Andromeda da Meta exige liquidez de leilão: AdSets amplos com R$ 200-500/dia rodam melhor que 5 AdSets de R$ 50/dia. Mesma lógica em Google Performance Max. Fragmentar orçamento = matar a learning phase.

3. **Criativo IS o targeting.** Audience deixa de ser variável estratégica em 2026. Variável agora é creative variant + hook + ângulo. Mantenha audiência broad / Advantage+ / Lookalike escalado e teste no creative.

4. **Naming convention é não-negociável.** Toda campanha segue `[Funil]_[Objetivo]_[Persona]_[Data]_[Variante]`. Sem isso, GA4 + relatórios viram pesadelo. Sem isso, time não sabe qual criativo performou. Sem isso, escalar = improviso.

5. **Learning phase é sagrada.** Meta exige ~50 conversões/AdSet/semana pra sair de learning. Quem mexe na campanha (edita budget, trocar copy, pausa creative) reseta a learning. Bloqueio de mexidas: 7 dias mínimo OU 50 conversões.

6. **Kill ≠ pausar.** Criativo que não bate KPI em 5 dias = MATA, não pausa "por enquanto". Pausar acumula lixo na conta. Matar libera atenção do algoritmo.

7. **Escala vertical com batismo.** Antes de subir budget de R$200 → R$1000, "batiza" o creative campeão duplicando-o numa nova campanha CBO/ASC+ isolada. Campanha de teste continua testando; campanha de escala roda só com batizados.

8. **Atribuição honesta > atribuição de vaidade.** Last-click do Meta exagera a contribuição. Sempre cruze com GA4 + dado de receita real do cliente (CRM/checkout). ROAS de Meta sozinho mente em 30-50% dos casos.

## Paid Launch Methodology — 8 fases

### Fase 1 — Brief estratégico (1-2 dias)

Carregar:
- `audience-research` brief (personas + ICP + JTBD + awareness stages)
- `strategist` brief (objetivos, KPIs, content pillars)
- Histórico do cliente: contas atuais Meta/Google, ROAS atual, CAC, LTV
- Restrições: budget mensal, deadline, compliance (LGPD, claims regulados)

Output: `brief-pago-{cliente}.md` com:
- Objetivo da campanha (lead-gen / venda direta / awareness / re-engajamento)
- Funil: source → conversion → revenue
- KPIs SMART (CPL ≤R$ X, CAC ≤R$ Y, ROAS ≥Z em 30d)
- Budget allocation (Meta vs Google vs TikTok %)
- Personas-alvo + awareness stages priorizadas
- Ofertas (não invente — usa o que cliente realmente vende)

### Fase 2 — Tracking setup (1 dia)

Antes de qualquer campanha: pixel-setup completo (ver BP `pixel-setup`):
- Meta Pixel + CAPI Server-Side via GTM Server-side ou n8n webhook
- Google Tag (gtag.js) + Enhanced Conversions
- GA4 events alinhados ao funil (PageView, ViewContent, Lead, Purchase)
- Validação em **DebugView** com 3 eventos reais antes de prosseguir

Output: `tracking-spec-{cliente}.md` + screenshots de DebugView com eventos batendo.

### Fase 3 — Criativo (paralelo com Fase 4 — 2-5 dias)

Squad `traffic-masters-pool` (Cassiano + visual-producer cross-squad):
- Test grid documentado (ver BP `ad-creative`)
- 3 ângulos × 2 visuais × 2 hooks = 12 variants para wave 1
- Reaproveitar orgânicos top-saves quando aplicável (skill `creative-recycle`)
- Master + cuts: 9:16 + 1:1 + 4:5 minimum
- Copy passa por `humanizer` se PT-BR

Output: pasta `creatives/{cliente}/wave-1/` + planilha do test grid.

### Fase 4 — Estruturação de campanhas (1 dia)

Agentes `gabriel-google` e `marcos-meta`:
- Naming convention aplicada
- Meta: 1 campanha CBO Advantage+ ou ASC+ com 2-3 AdSets amplos
- Google: 1 Performance Max + 1 Search com keywords ICP-fit
- Bidding: lowest cost com cost cap pelo CAC alvo da Fase 1
- Audiences: broad + Lookalike 1-3% + custom (visitors, lead-events)

Output: `campaign-spec-{cliente}.yaml` (formato consumível por skill upload).

### Fase 5 — Upload (manual OU automatizado)

**Manual:** humano segue spec → BM/Google Ads UI. Tempo: 2-4h.

**Automatizado:** skills `meta-ads-api` + `google-ads-api` consomem
`campaign-spec.yaml` → criam campanhas via API → retornam IDs + link de
revisão. Tempo: 5-10min + 30min de revisão humana.

> **Antes de subir automatizado em conta de cliente:** sempre rodar primeiro
> em **conta de teste** ou em campanha pausada. API errada = orçamento
> drenado em horas.

Após upload: campanhas ficam **pausadas** até checklist de Fase 6.

### Fase 6 — Checklist de pré-vôo (30min)

- [ ] Tracking validado (Fase 2)
- [ ] Naming convention bate em todas as campanhas
- [ ] Budgets corretos (não R$10000 por engano em vez de R$1000)
- [ ] Audiences corretas (não pegou audience errada de outro cliente)
- [ ] Creatives carregados nos placements certos
- [ ] CTAs apontam pra URL correta com UTMs corretas
- [ ] Compliance: claims revisados (saúde/finanças/estética)
- [ ] Cliente aprovou o pacote

Só ATIVA campanha quando 8/8 checked.

### Fase 7 — Learning phase management (7-14 dias)

Bloqueio de mexidas:
- **Não** edite budget (>20% mudança reseta learning)
- **Não** edite copy/creative em campanha rodando (resetará)
- **Não** pause/reative (penalidade severa)

O que pode (sem reset):
- Adicionar **novo** creative na mesma campanha (não substitui)
- Adicionar **nova** campaign de teste isolada

Owner: `aline-analista` monitora diariamente, sem mexer.

### Fase 8 — Iteração: kill, escala, batismo (semanal, contínuo)

Critérios de **KILL**:
- CPL >2x da meta da Fase 1 após 50 cliques
- Thumbstop <15% após 1000 impressions
- CTR <0.8% após 1000 impressions
→ Mata creative, não pausa.

Critérios de **ESCALA**:
- ROAS ≥meta por 7 dias consecutivos
- Volume de conversões consistente (não pico isolado)
- Budget ainda longe de saturação (audience size suficiente)
→ Bativa creative campeão pra campanha de escala isolada (CBO/ASC+
   amplo). Sobe budget gradual: +20% a cada 48h.

Critérios de **NEW WAVE**:
- Performance estagnando (criative fatigue) por 7+ dias
- Awareness stage saturada — precisa pivotar pra outra
→ Kicks off Fase 3 de nova wave.

## Quality Criteria

Antes de declarar paid launch "pronto":

- [ ] Brief estratégico assinado pelo cliente
- [ ] Tracking validado em DebugView com 3 eventos reais
- [ ] Test grid documentado com hipóteses por wave
- [ ] Naming convention aplicada em 100% das campanhas
- [ ] Checklist pré-vôo (Fase 6) com 8/8 itens
- [ ] Owner de monitoramento nomeado (default: aline-analista)
- [ ] Cadência de review semanal agendada
- [ ] Kill criteria + scale criteria documentados ANTES de subir

## Output Examples

### Example 1 — Lançamento Meta+Google pra SaaS B2B (R$15k/mês)

```
Cliente: SaaS de gestão pra salões
Budget: R$ 15.000/mês (R$ 10k Meta, R$ 5k Google)
Objetivo: 60 leads qualificados/mês a CPL ≤R$ 250
ROAS alvo: 3x em 90d (LTV de R$ 750/cliente, CAC alvo R$ 250)

Estrutura Meta (R$ 10k/mês = R$ 333/dia):
  Campanha 1: ASC+ "TOPO_LEADGEN_SALOES_2026Q1_WAVE1"
    AdSet único: Advantage+ Audience (broad)
    Creatives wave 1: 12 variants (3 ângulos × 2 visuais × 2 hooks)
    Budget: R$ 233/dia (70%)
    KPI promoção: CPL ≤R$ 250

  Campanha 2: CBO "FUNDO_LEADGEN_SALOES_2026Q1_REMARKETING"
    AdSet 1: Visitors 30d (custom)
    AdSet 2: Lead-event 90d (re-engaja não-converteu)
    Creatives: 3 (oferta + urgência + caso real)
    Budget: R$ 100/dia (30%)
    KPI promoção: ROAS ≥4x em 14d

Estrutura Google (R$ 5k/mês = R$ 167/dia):
  Performance Max "TOPO_PMAX_SALOES_2026Q1"
    Asset Groups: por ângulo (3 grupos)
    Audience signals: keywords ICP-fit + lookalike from Meta
    Budget: R$ 100/dia
    Conversion goal: Lead (preencher form)

  Search "FUNDO_SEARCH_SALOES_2026Q1_BRAND+COMPETIDOR"
    Keywords: brand + competitor terms (concorrentes específicos)
    Match: phrase + exact
    Budget: R$ 67/dia
    Conversion goal: Lead

Tracking:
  Meta Pixel + CAPI via GTM SS
  Google Tag + Enhanced Conversions
  Eventos: PageView, ViewContent, Lead, Purchase
  Validação DebugView: ✅ feito 2026-01-15

Naming convention:
  [Funil]_[Objetivo]_[Persona]_[Período]_[Variante]
  Ex: TOPO_LEADGEN_SALOES_2026Q1_WAVE1

Cadência:
  Daily standup com aline-analista (10min)
  Weekly review com tiago-traffic-chief + cliente
  Bi-weekly: revisão de wave + decisão de novas waves
```

### Example 2 — Kill decision (criativo abaixo de meta)

```
Date: 2026-01-22 (5 dias após launch)
Creative: ASC+_TOPO_LEADGEN_v3_pergunta_irritacao
Performance:
  - Spend: R$ 1.200
  - Impressions: 18.400
  - CTR: 0.6% (meta: ≥1.5%)
  - Thumbstop: 12% (meta: ≥30%)
  - CPL: R$ 480 (meta: ≤R$ 250)

Decision: KILL.
Reason: 1 indicador acima da tolerância seria "watch"; 3 indicadores
        2x abaixo da meta = sinal claro do algoritmo "audiência não
        ressona com este ângulo". Não pausa — desativa permanentemente
        no test grid e marca em LRN como hipótese refutada.
        Wave 2 substitui pelo ângulo "comparação direta" (Schwartz
        solution-aware).

Updated test grid: hipótese "irritação como hook funciona em saloeiras"
                   → REFUTADA. Próxima wave foca em curiosidade + dor
                   concreta.
```

## Anti-Patterns

### Never Do

- **Subir campanha sem tracking validado** — nem que seja "pra testar". Eventos no DebugView ou nada.
- **Editar campanha em learning phase** — sabote-se sozinho. Aguarde os 7 dias / 50 conversões.
- **Fragmentar budget em 10 AdSets** — mata learning, mata leilão. 1-3 AdSets amplos.
- **Pausar criativo ruim ao invés de matar** — acumula lixo na conta, dilui orçamento futuro.
- **Subir creative direto pra escala sem teste** — qualquer hipótese precisa de wave de teste antes do batismo.
- **Atribuir 100% ao Meta last-click** — over-conta. Cruze com GA4 + CRM real.

### Always Do

- **Tracking antes de tráfego.** DebugView verde, AÍ campanha sobe.
- **Kill criteria documentados antes do launch.** Decisão emocional pós-launch é viés.
- **Master + cuts.** 1 vídeo hero → 5 formatos. Não 5 vídeos.
- **Naming convention rígida.** Sem isso, GA4 + relatórios = inferno.
- **Batizar campanha campeã** antes de escalar verticalmente.
- **Daily review com aline-analista.** Catch problems early.

## Vocabulary Guidance

### Always Use

- "Learning phase" / "saiu de learning"
- "Liquidez de leilão"
- "Aglutinação de orçamento" (vs fragmentação)
- "Test wave" / "test grid"
- "Batismo" (creative campeão pra campanha de escala)
- "Kill criteria" / "scale criteria"
- "Thumbstop ratio"
- "Naming convention"
- "Atribuição honesta" (vs last-click vanity)

### Never Use

- "Vamos otimizar audience" — em 2026, audience é commodity, criativo manda
- "Pausar pra ver se melhora" — pause = dúvida = lixo. Mata ou roda.
- "Custo por clique baixo" sem ROAS — vanity metric

### Tone Rules

- **Numérico antes de qualitativo.** "CPL caiu 18%" > "campanha está performando bem"
- **Decisão > análise.** "Mata creative v3, escala v7, novo teste pra v8" > "v3 está abaixo, v7 está acima, v8 talvez seja interessante"

## 2026 Platform-Specific Refinements

Este BP é **multi-canal e atemporal**. Para playbooks **plataforma-específicos** com cobertura das mudanças estruturais de 2026, consulte:

- **Meta Ads 2026** (Andromeda · Lattice · Muse Spark) → [`meta-ads-2026.md`](meta-ads-2026.md)
  - Modelo **3-1-Many** (3 campanhas × 1 audiência × N criativos) substitui ABO fragmentado
  - **CBO + Advantage+ Audience** como default em 2026; Detailed Targeting reservado para casos específicos
  - **Janela de aprendizado de 7 dias** com no mínimo 50 conversões → daí decisão de escala/kill
  - **CAPI + Event ID + EMQ ≥ 8** como pré-condição (governado por `pixel-setup.md`)

- **Google Ads 2026** (Gemini 3 · Power Pack · Comércio Agêntico) → [`google-ads-2026.md`](google-ads-2026.md)
  - **Power Pack** = Demand Gen (top funil) + AI Max (intenção) + Performance Max (conversão); arquitetura recomendada
  - **AI Overviews** corrói CTR de Search → migrar parte do orçamento para Demand Gen
  - **Enhanced Conversions API unificada** (deadline Merchant API: **18/08/2026**)
  - **ALF + UCP** (agentic commerce / Universal Commerce Protocol) — preparar feed de produtos

- **Creative Direction Meta 2026** → [`creative-direction-meta-2026.md`](creative-direction-meta-2026.md)
  - **Hook Rate** (3s view rate) e **Hold Rate** (75% completion) como KPIs primários antes de CTR
  - **Trope Stacking + OCR ≤ 20% da tela** para passar Andromeda Entity ID
  - **VEO** (Visual Entity Optimization) — diversidade semântica entre variantes do mesmo conceito

Cada um desses 3 BPs **especializa** as Fases 2 (tracking) e 3 (creative) deste framework geral. Mantenha este BP como o **end-to-end multi-canal**; vá para os 2026 quando o canal for definido.

## Downstream consumers

- Squad `traffic-launch` — segue este framework no setup de cliente novo
- Squad `traffic-analytics` — mede contra os KPIs declarados na Fase 1
- Skill `meta-ads-api` / `google-ads-api` — consome `campaign-spec.yaml` da Fase 4
- Skill `creative-recycle` — feeds Fase 3 com criativos orgânicos top-saves
- Best-practice `ad-creative` — governa Fase 3 (criativos)
- Best-practice `pixel-setup` — governa Fase 2 (tracking)
- Best-practices `meta-ads-2026` / `google-ads-2026` / `creative-direction-meta-2026` — playbooks plataforma-específicos 2026 (ver acima)
