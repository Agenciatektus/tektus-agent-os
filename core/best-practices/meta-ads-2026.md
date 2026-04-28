---
id: meta-ads-2026
name: "Meta Ads 2026 — Andromeda · Lattice · Muse Spark"
whenToUse: |
  Creating agents that plan, execute, optimize, or audit Meta Ads campaigns (Facebook + Instagram). Covers campaign architecture (3-1-Many model), budget types (CBO + Advantage+ Audience), funnel staging (TOFU/MOFU/BOFU/SAZONAL), KPIs (Hook Rate, Hold Rate, Thumbstop, EMQ, Frequency), tracking (Pixel + CAPI + Event ID), and the seven-day learning rule. NOT for: creative production criteria → see creative-direction-meta-2026. NOT for: copywriting itself → see copywriting.
version: "1.0.0"
last_updated: "2026-04-27"
research_source: "Internal research synthesis on Meta Ads 2026 (Andromeda · Lattice · Muse Spark) — April 2026"
---

# Meta Ads 2026 — Andromeda · Lattice · Muse Spark

> **Atualização:** 27 de abril de 2026
> **Vigência:** abril 2026 a próxima atualização estrutural da Meta. Reavaliar trimestralmente.

The Meta advertising ecosystem fundamentally changed in late 2025 with the global rollout of Andromeda (retrieval engine), Lattice (ranking/classification), GEM (signal modeling), and the April 2026 launch of Muse Spark (the closed-source multimodal LLM that powers Shopping Mode). The gestor de tráfego is no longer a "platform operator" but a **strategist of signals and content**. Tactics that were considered hacks two years ago are now identified as sabotage to the platform's intelligence.

This best-practice encodes the operational rules that distinguish high-performance campaigns from wasted budget in 2026.

## Core Principles

### 1. The creative IS the targeting (não há mais segmentação manual eficaz)

Andromeda decompõe cada pixel e frame de vídeo para identificar "Entidades Visuais" — objetos, contextos, tons de voz, arquétipos psicológicos. **A IA decide o público a partir do criativo, não o contrário.** Tentar "ajustar audiências" através de interesses detalhados tornou-se obsoleto. Um Reel mostrando uma família comendo açaí sinaliza ao Andromeda automaticamente o contexto demográfico/psicográfico — sem que ninguém precise marcar "Família" ou "Açaí" como interesse.

**Aplicação:** sempre usar Advantage+ Audience como público padrão. Detalhamento manual só em testes A/B isolando variável.

### 2. Modelo 3-1-Many é mandatório para escala (1 campanha · 1 conjunto · muitos criativos)

A arquitetura recomendada em 2026 abandonou a fragmentação em interesses. **1 Campanha + 1 Conjunto Advantage+ Audience + 15-25 Criativos diversos.** Auction Overlap (sobreposição de leilão) entre conjuntos próximos canibaliza orçamento e fragmenta o aprendizado do Lattice. Para que a IA aprenda efetivamente, o conjunto precisa de **pelo menos 50 conversões/semana**.

**Verba mínima por conjunto:** R$ 50/dia para alcançar 50 conv/sem com CPL R$ 7. Abaixo disso, **consolidar em menos conjuntos**, não criar mais.

### 3. Tipo de orçamento — combinação correta importa (não confundir Advantage+ Shopping com Advantage+ Audience)

São **dois eixos independentes**:
- **Eixo orçamento:** CBO (Campaign Budget Optimization) ou ABO (Adset Budget Optimization)
- **Eixo audiência:** Advantage+ Audience (Meta escolhe) ou Detalhamento manual

**Combinação default 2026:** `CBO + Advantage+ Audience` — vale para Mensagens, Conversões, Tráfego, Leads.

**Erro comum:** confundir Advantage+ Shopping (campaign type específico para e-commerce com checkout online + catálogo) com Advantage+ Audience (configuração de público). Para clientes que vendem via WhatsApp/loja física/serviços, **nunca** usar Advantage+ Shopping — o objetivo correto é Mensagens com CBO + Advantage+ Audience.

| Combinação | Quando usar |
|---|---|
| CBO + Advantage+ Audience | Padrão 2026 — 95% dos casos |
| ABO + Advantage+ Audience | Quando precisa garantir floor de verba (sazonal curto) |
| Advantage+ Shopping | APENAS e-commerce com checkout online + catálogo |
| Advantage+ App | APENAS instalação/eventos de app mobile |
| Manual | Apenas teste A/B isolando público |

### 4. Janela mínima de 7 dias entre alterações estruturais (Lattice precisa aprender)

Alterar verba, criativo ou estrutura antes de 7 dias **reseta** o aprendizado do GEM. A regra anterior de "+20% a cada 3 dias" sabota o algoritmo em 2026. Para campanhas de R$ 30/dia, isso significa **4 oportunidades de ajuste em 30 dias** — não mais.

**Exceção justificada:** CPL absurdo (> 3× a meta) após 100+ impressões → pausar imediatamente; não esperar 7 dias.

### 5. Diversidade semântica real, não variações superficiais (Entity ID)

Andromeda agrupa criativos com mesma identidade visual sob um único Entity ID — concedendo apenas 1 "bilhete" para o leilão. Trocar cor de botão, palavra na legenda ou fonte do título **não conta como criativo novo**. Diversidade real exige:

- Pessoa diferente em cena
- Cenário diferente (loja vs casa vs rua)
- Tom emocional diferente (humor vs prova social vs urgência)
- Formato diferente (UGC selfie vs produto polido vs depoimento)

**Aplicação:** quando @Performance-Analyst detecta fadiga (frequência > 2.5), pedir ao @Creative-Director peças com identidade visual genuinamente diferente, não rotação de variações cosméticas.

### 6. Sinais de alta fidelidade via CAPI + Event ID + EMQ ≥ 8

A eficácia dos modelos de IA da Meta é diretamente proporcional à qualidade dos dados enviados via Conversions API. Em 2026 a prática padrão é **Dual Tracking** (Pixel + CAPI) com **Event ID único** para deduplicação e **Event Match Quality ≥ 8/10**.

EMQ alto requer enviar via CAPI hasheado (SHA-256): `email`, `phone`, `external_id` + sem hash: `client_ip_address`, `client_user_agent`, `fbc`, `fbp`. Sem isso, EMQ fica em 4-5/10 e o GEM não treina pra qualidade.

**Lead scoring:** evento custom `QualifiedConversation` que dispara apenas quando lead se converte em pedido real treina o algoritmo pra qualidade, não vaidade de cliques baratos.

### 7. Estratégia "Quatro Picos" para recalibrar conta anualmente

Realizar promoções agressivas **4 vezes por ano** gera picos de dados que resetam e recalibram o aprendizado da conta, permitindo escalas maiores nos períodos subsequentes. Datas naturais para foodservice/varejo BR: Dia das Mães (Maio) · Dia dos Pais (Agosto) · Black Friday (Novembro) · Natal/Réveillon (Dezembro).

## Techniques & Frameworks

### Estrutura de conta padrão Tektus (modelo 3-1-Many adaptado)

```
[Cliente]
├── 1 Campanha PERPÉTUA TOFU (sempre ativa)
│   └── 1 Conjunto Advantage+ Audience
│       └── 15-25 criativos diversos
└── N Campanhas SAZONAIS (1 por data quente)
    └── 1 Conjunto Advantage+ Audience cada
        └── 4-8 criativos do tema
```

### Nomenclatura padronizada (sincronizada com [DB] Campanhas — Anúncios no Notion)

```
CAMPANHA:  [CLIENTE]_[OBJETIVO]_[FUNIL]_[ANO-MM]
CONJUNTO:  [PUBLICO]_[GEO]_[IDADE]
ANÚNCIO:   [CLIENTE] — [LETRA] — [PRODUTO]
```

A mesma string vai literalmente no Gerenciador da Meta (campanha/conjunto/anúncio) — facilita conciliação automática quando a <your-tracking-product> exportar dados pra Notion.

### Decisão de escalonamento (regra simples)

| Condição (todas verdadeiras) | Ação |
|---|---|
| CPL < 0.7× meta E Frequência < 2.0 E rodando ≥ 7 dias | Escalar +20% (única vez) |
| Dentro dos KPIs verde | 🟡 Manter |
| Frequência > 2.5 OU Hook Rate caindo 30% | 🔵 Trocar criativo |
| CPL > 1.5× meta após 100+ impressões OU frequência > 3.5 | 🔴 Pausar |
| < 7 dias rodando ou < 50 conversões | ⚪ Aguardar |

## Quality Criteria

- [ ] Estrutura usa modelo 3-1-Many (1 campanha + 1 conjunto Advantage+ + ≥15 criativos)
- [ ] Tipo de orçamento é `CBO + Advantage+ Audience` (não Advantage+ Shopping em negócios sem catálogo)
- [ ] Conjunto tem verba para alcançar ≥ 50 conversões/semana
- [ ] CAPI configurado com Event ID único + EMQ ≥ 8/10 nos primeiros eventos
- [ ] Nomenclatura `[CLIENTE]_[OBJETIVO]_[FUNIL]_[ANO-MM]` aplicada idêntica no Gerenciador Meta e no Notion
- [ ] Calendário respeita janela de 7 dias mínimo entre alterações estruturais
- [ ] Datas sazonais (Quatro Picos) mapeadas no calendário anual

## Output Examples

### Exemplo 1 — Estrutura proposta para cliente novo (delivery local)

```markdown
## Cliente: <pizzeria-example> · Verba R$ 1.500/mês · Objetivo: pedidos via WhatsApp

### Campanha 1 — BV_MSG-WHATSAPP_PERPETUA_2026-Q3
- Objetivo: Mensagens (WhatsApp)
- Tipo de orçamento: CBO + Advantage+ Audience
- Verba/dia: R$ 40
- Conjunto: ADV-AUDIENCE_TIJUCA-7KM_22-55
- Janela horária: Qua-Dom 17h-23h
- Criativos planejados: 18 (10 Reels UGC + 5 estáticos + 3 carrosséis)
- Estágio: TOFU (frio)

### Campanha 2 (sazonal Dia dos Pais — só agosto)
- BV_MSG-WHATSAPP_SAZONAL-PAIS_2026-08
- Verba total: R$ 200 concentrados em 7 dias
- Conjunto: ADV-AUDIENCE_TIJUCA-7KM_30-60
- Cupom: PAIBV (R$ 8 off no combo família)

### Tracking
- Pixel: instalado em pizzariabv.com.br
- CAPI: ativa via WhatsApp Business webhook (<your-tracking-product>)
- Event ID base por anúncio (ex: bv-a-combo-grande)
- EMQ alvo: 8/10
```

### Exemplo 2 — Análise de conta existente com diagnóstico de gap

```markdown
## Auditoria conta Meta — Restaurante X (15 dias rodando)

### Conformidade com Andromeda 2026

| Princípio | Estado | Severidade |
|---|---|---|
| Modelo 3-1-Many | ❌ Tem 6 conjuntos com 2 anúncios cada | 🔴 ALTA |
| CBO + Advantage+ Audience | ❌ ABO em todos · interesses manuais | 🔴 ALTA |
| 50 conv/sem por conjunto | ❌ R$ 10/dia por conjunto · só atinge 12 conv/sem | 🔴 ALTA |
| Janela 7 dias | ❌ Mexem todo dia | 🔴 ALTA |
| ≥15 criativos | ❌ Total de 12 anúncios fragmentados | 🟡 MÉDIA |
| CAPI + Event ID | ⚠️ Pixel sim · CAPI parcial · sem Event ID | 🟡 MÉDIA |

### Plano de remediação (não mexer antes de domingo · regra dos 7 dias)
1. Consolidar 6 conjuntos em 1 só (ADV-AUDIENCE)
2. Migrar para CBO + Advantage+ Audience
3. Reagrupar todos os anúncios no mesmo conjunto
4. Implementar Event ID padronizado em URL wa.me
5. Adicionar 5 Reels UGC à biblioteca (chegando em 7 dias)

CPL atual: R$ 23 · CPL projetado pós-remediação: R$ 8-12 (4 semanas)
```

## Anti-Patterns

### Never Do

- **Nunca usar Advantage+ Shopping em negócio sem catálogo de produtos online.** É campaign type específico para e-commerce com checkout. Em delivery via WhatsApp ou serviços, escolher objetivo Mensagens + CBO + Advantage+ Audience.
- **Nunca segmentar manualmente por interesses estritos** ("Yoga" vs "Meditação"). O Andromeda identifica esses públicos pelo conteúdo criativo melhor que a seleção manual, e fragmentar gera Auction Overlap.
- **Nunca alterar campanha em < 7 dias após subir/escalar.** Reset de aprendizado do GEM. Exceção: CPL > 3× meta após 100+ impressões — pausar imediatamente.
- **Nunca usar variações superficiais como "novos criativos"** (cor de botão, fonte, palavra). Andromeda agrupa por Entity ID e penaliza fragmentação cosmética. Diversidade real = pessoa/cenário/tom/formato genuinamente diferentes.
- **Nunca usar stock photos.** Visão computacional Meta penaliza imagens genéricas em até 29% de taxa de conversão.
- **Nunca rodar campanha sem Event ID padronizado.** Sem dedup Pixel/CAPI, contagem dupla quebra ROAS e o GEM treina com sinal corrompido.

### Always Do

- **Sempre começar pela combinação `CBO + Advantage+ Audience`** dentro do objetivo correto (Mensagens, Conversões, etc.). Mudar só se houver razão técnica explícita.
- **Sempre garantir verba mínima de 50 conversões/semana por conjunto** antes de subir. Fragmentar em conjuntos sem volume mata o aprendizado.
- **Sempre nomear Campanha/Conjunto/Anúncio no Gerenciador Meta com a string exata do DB Notion** — facilita conciliação automática (insumo <your-tracking-product>).

## Vocabulary Guidance

### Always Use (terminologia 2026)
- **Advantage+ Audience** — público escolhido pela IA
- **Modelo 3-1-Many** — 1 campanha + 1 conjunto + 15-25 criativos
- **Hook Rate / Hold Rate / Thumbstop Ratio** — KPIs de retenção em vídeo
- **Entity ID** — agrupamento Andromeda por identidade visual
- **EMQ (Event Match Quality)** — qualidade do sinal CAPI
- **Quatro Picos** — estratégia anual de recalibração
- **VEO (Visual Entity Optimization)** — substantivos visuais para a IA
- **Trope Stacking** — sobreposição de elementos do nicho via texto+OCR

### Never Use (linguagem 2022 obsoleta)
- "Segmentar por interesses" → use "deixar Advantage+ escolher"
- "Limitar a 6 anúncios por conjunto" → contraindicado em 2026
- "Vencedor único do conjunto" → use "Creative Library"
- "Teste A/B de cor de botão" → variação superficial penalizada

### Tone Rules
- Decisões pautadas em dado, não em achismo ("CPL > meta há 7 dias" > "tá meio ruim")
- Recomendações sempre incluem trade-off explícito (escalar +20% requer estabilidade ≥ 7 dias)
- Comunicação com cliente em PT-BR coloquial, sem jargão Andromeda/Lattice/GEM cru — traduzir ("a IA da Meta agora decide o público")
