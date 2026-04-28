---
id: ad-creative
name: "Ad Creative — Hooks, Body & Variation Architecture"
whenToUse: |
  Creating agents that produce paid-ads creatives (Meta, Google, TikTok,
  YouTube Ads) — short-form videos, statics, carousels, headlines, primary
  text. Optimized for the modern algorithmic auction (Meta Andromeda /
  Advantage+, Google Performance Max) where creative IS the targeting.
  NOT for: organic social posts (use `instagram-feed`/`linkedin-post`/etc.);
  long-form copy (use `copywriting`); visual rendering (use `image-design`).
version: "1.1.0"
last_updated: "2026-04-27"
---

# Ad Creative — Best Practices

## Core Principles

1. **The creative IS the targeting.** In modern auctions (Meta Andromeda, Advantage+, Google Performance Max), broad audiences + machine learning beat manual interest segmentation. The hook, the first frame, the visible thumbnail — that's what the algorithm reads to decide who sees the ad. Stop optimizing audience segments; start optimizing creative variants.

2. **3 seconds decides 80% of performance.** Thumbstop ratio (3-second view rate) correlates with CPM, CPC and ROAS more than any other early signal. The first frame must answer "why should I stop scrolling?" — not "let me explain my company". A creative whose first 3 seconds don't earn attention will never recover, no matter how good the offer is.

3. **One angle, one emotion per creative.** Mixing irritation + exclusivity + nostalgia in a single ad creates none of them strongly. Pick ONE emotional angle and execute it cleanly. Variation comes from running multiple creatives, each with one angle — not from one creative trying to be everything.

4. **Volume tested intelligently > volume tested blindly.** Producing 50 random creatives wastes budget. Producing 5 angles × 3 visual treatments × 2 hooks = 30 creatives mapped to a hypothesis grid is testing. The creative brief must declare WHICH variable is being tested in each batch.

5. **UGC and "celzinho vertical" beat over-produced agency art for local + bottom-funnel.** Especially for B2C, local services, and DM-driven funnels (WhatsApp), amateur-feeling vertical video performs 2-5x better than polished agency creatives. The exception: top-of-funnel awareness for brand-conscious B2B, where production value signals legitimacy.

6. **CTA must trigger immediate action.** "Saiba mais" is weak. "Toque no Saiba Mais agora" is direct. "Toque no link da bio e baixe o PDF" is concrete. The CTA tells the algorithm what action to optimize for AND tells the human exactly what to do next. Both matter.

7. **One creative, multiple cuts.** A single 30-second hero video should produce: 9:16 Reels/Shorts, 1:1 feed static (key frames), 16:9 YouTube Ads, 4:5 Instagram feed, 6-second bumper. Don't produce 5 creatives — produce 1 master + 5 cuts. Saves time AND ensures message consistency across placements.

8. **Schwartz awareness stage governs the angle.** Same product, different stages of awareness, totally different creative:
   - **Unaware:** story/news/curiosity hook ("ninguém te contou que…")
   - **Problem-aware:** dramatize the pain ("você acorda de manhã e…")
   - **Solution-aware:** comparison ("X método vs Y método")
   - **Product-aware:** demo + ROI ("em 30 dias, [resultado]")
   - **Most-aware:** offer + urgency ("últimas 4 horas com 30% off")
   Pretending one creative works for all stages = wasted budget on the wrong audience.

## Techniques & Frameworks

### Variation Architecture (the testing grid)

Before producing a single creative, map the test grid:

```
ANGLE × VISUAL × HOOK = CREATIVE_VARIANT

Angles (3-5 per campaign):
- Pain-driven: "você está perdendo X porque Y"
- Aspiration-driven: "imagina chegar em Z"
- Authority/proof: "X clientes já fizeram, veja o resultado"
- Contrarian: "todo mundo faz X, eu te mostro porquê está errado"
- Story/case: "A. era como você há 6 meses. hoje…"

Visual treatments (3 per angle):
- UGC vertical (celzinho)
- Static high-contrast (carrossel reaproveitado)
- Motion graphic (Cassiano-style direct response)

Hook variations (2 per visual):
- Pergunta: "Por que você ainda…?"
- Choque: "Pare de fazer X."
- Curiosidade: "Tem uma coisa que ninguém te contou sobre…"

Total: 5 angles × 3 visuals × 2 hooks = 30 variants — too much for 1 batch.
Pick: 3 angles × 2 visuals × 2 hooks = 12 variants per test wave.
```

### Hook → Body → CTA structure (script template)

Para vídeo curto (Reels / Shorts / TikTok / Meta Reels):

```
Frame 1-3s — HOOK
  Pergunta provocativa OU afirmação polêmica OU demonstração visual
  (regra: deve fazer SENTIDO mesmo sem áudio — 85% assistem mudo)

Frame 3-15s — BODY
  Desenvolve o ponto. Pode usar 1 das 3 formas:
  (a) Listar (3 motivos pelos quais X)
  (b) Demonstrar (mostrar o problema acontecendo + solução)
  (c) Storyizar (caso real anonimizado — antes/depois)

Frame 15-25s — VIRADA / INSIGHT
  O ponto que o espectador não esperava. É o que faz ele compartilhar.

Frame 25-30s — CTA explícita
  "Toque em [Saiba Mais / Comprar Agora / Link da Bio]"
  + razão concreta pra agir agora (escassez real, deadline, oferta)
```

### Reaproveitamento de criativo orgânico → ad

Não produza criativo novo se um post orgânico do cliente já performou bem. Sequência:

1. Identifique posts orgânicos com **save rate ou share rate acima da média do pillar** (não engagement total — esses são os que indicam "vou querer revisitar")
2. Ad-adapt:
   - Carrossel orgânico → static ad (slide 1 vira primary visual; demais slides viram texto na descrição)
   - Reel orgânico → ad video (cortar pra 15s; adicionar CTA explícita ao final; comprimir intro pra ganhar thumbstop)
   - Story orgânico → tipo Story Ad (manter formato vertical, adicionar CTA "deslize pra cima" / sticker)
3. Sempre adicione CTA explícita — orgânico não tem, ad precisa
4. Sempre teste contra um criativo "ad-nativo" como controle — orgânico-virado-ad nem sempre ganha

### Anatomia de copy de ad

**Primary Text (Meta) / Description (Google):**
- Linha 1 = ampliação do hook do visual (deve ler bem se aparecer truncado em "...ver mais")
- Linhas 2-4 = body (dor → agitação → solução)
- Linha final = CTA + link

**Headline (Meta + Google):**
- Curta (≤40 chars Meta, ≤30 chars Google)
- Promise concreta com número quando possível ("Em 30 dias, X")
- Não repete o primary text — complementa

**Description (Google):**
- 90 chars
- Inclui keyword + diferencial + prova social

## Quality Criteria

Antes de aprovar criativo pra subir:

- [ ] Hook funciona muted (85% assistem sem áudio)
- [ ] Visual de thumbnail (frame 1) é entendível sozinho
- [ ] CTA explícita aparece nos últimos 5 segundos
- [ ] Existe pelo menos 1 ângulo testado por persona/awareness stage
- [ ] Variação angular: 3+ creatives testando hipóteses diferentes (não 3 cores do mesmo)
- [ ] Copy de primary text passa pelo `humanizer` (PT-BR)
- [ ] Aspect ratios: 9:16 + 1:1 + 4:5 (no mínimo) gerados a partir de 1 master
- [ ] Compliance: sem claims absolutas ("garanto que…"), sem imagens de antes/depois sem disclaimer (saúde/estética/finanças)

## Output Examples

### Example 1 — Brief de criativo Meta Ads (B2B SaaS, dor de tempo)

```
Cliente: SaaS de gestão de agenda pra salões de beleza
Persona: Marcia (Gestora 32-45, Schwartz: solution-aware)
Pain: passa domingo respondendo cliente; não tem visão consolidada da semana
Awareness: solution-aware (já viu apps de agenda, não confia em mais um)

Ângulos a testar (3):

Ângulo 1 — Domingo perdido (pain-driven)
  Hook (3s): mostra mão pegando celular na cama, Tela com 47 mensagens
             não respondidas. Texto on-screen: "O domingo dela acaba aqui."
  Body (3-15s): UGC celzinho de uma "Marcia" real falando: "antes de
                usar o app, eu respondia cliente até meia-noite."
  Virada (15-25s): "Hoje, deixo o WhatsApp em silêncio. O sistema responde
                  por mim com agenda em tempo real."
  CTA (25-30s): "Toque em Saiba Mais e teste 7 dias grátis."

Ângulo 2 — Comparação direta (solution-aware specific)
  Hook (3s): split screen — esquerda "App genérico de calendário", direita
             "Sistema feito pra salão". Texto: "Por que o app genérico falha?"
  Body: 3 razões em texto on-screen (sem áudio dependente):
        1. Não fala com WhatsApp do cliente
        2. Não calcula comissão
        3. Não tem confirmação automática
  Virada: "Isso aqui faz tudo isso, em 1 lugar."
  CTA: "Veja o tour de 60 segundos no link."

Ângulo 3 — Prova social (case)
  Hook (3s): "Salão da Marina foi de 80 pra 140 cliente/mês com isso."
  Body: imagens reais (com permissão) de antes/depois da agenda dela.
  Virada: "O que mudou? Ela começou a dizer não pros buracos de horário."
  CTA: "Veja como — link na bio."

Visual treatments por ângulo:
  v1: UGC vertical celzinho
  v2: Motion graphic high-contrast (Cassiano-style)

Hook variations: 1 pergunta + 1 afirmação chocante por ângulo

Total: 3 angles × 2 visuals × 2 hooks = 12 creatives pra wave 1.
Budget de teste: R$ 50/dia × 5 dias = R$ 2.500.
KPI de promoção: thumbstop ≥30% + CTR ≥1.5% + CPL ≤R$ 50.
```

### Example 2 — Reaproveitamento orgânico → ad

```
Trigger: post de carrossel sobre "5 erros que sua agenda do salão tem"
         performou no orgânico — 800 saves (média do pillar = 120).

Ad-adaptation:

Variant A (static ad):
- Visual: slide 1 do carrossel original (hook "5 erros que sua agenda
  do salão tem") como imagem principal
- Primary text: "Sua agenda tem esses 5 erros? [Lista compacta dos 5
  erros do carrossel original]
  Veja como corrigir todos em 1 ferramenta. Toque em Saiba Mais."
- Headline: "5 Erros da Sua Agenda — Corrija Agora"
- CTA: Saiba Mais → link da landing
- Hipótese de teste: post orgânico com alta retenção/save vira ad
                     ROAS-positivo se mantermos hook + adicionarmos CTA explícita

Variant B (controle ad-nativo):
- Criativo novo, ângulo similar mas roteiro escrito do zero pelo Cassiano
- Mesmo budget, mesmo público

Janela de teste: 7 dias.
Critério de promoção: variant A com CPL ≤30% acima do baseline ad-nativo
                      OU melhor (ganhou).
```

## Anti-Patterns

### Never Do

- **Ad com 5 ângulos misturados** — "essa parte é pra dor, essa é prova social, essa é demo" = ninguém entende. 1 ângulo por creative.
- **Hook genérico de "vídeo de empresa"** — câmera lenta sobre logo, música corporate, voiceover institucional = thumbstop ≤5%. Cortar.
- **CTA implícita** — "veja mais no nosso site" sem botão visível, sem direção verbal explícita.
- **Texto pequeno em vídeo vertical** — se não lê em iPhone SE no metrô, não existe. Mínimo 36pt em 1080×1920.
- **Mesma criativo em todas as awareness stages** — desperdício de budget servindo unaware com copy product-aware (e vice-versa).

### Always Do

- **Test grid documentado** antes de produzir — ângulo × visual × hook em planilha
- **Master + cuts** — 1 vídeo hero que vira 5+ formats
- **CTA explícita verbal + visual** nos últimos 5 segundos
- **Reaproveitamento testado contra controle ad-nativo** — orgânico viral nem sempre vira ad campeão

## Vocabulary Guidance

### Always Use

- "Thumbstop ratio" — metric crítica nas primeiras 3s
- "Ângulo" (não "ideia" ou "conceito")
- "Variação angular" (não "novo criativo")
- "Hook → Body → Virada → CTA" (estrutura)
- "Awareness stage" (Schwartz)
- "Master + cuts" (não "edit pra cada plataforma")
- "Test grid" / "test wave"

### Never Use

- "Vídeo institucional" — sinônimo de baixo thumbstop
- "Criativo bonito" — bonito ≠ converte
- "Vamos testar muitos criativos" — sem grid = sem teste
- "Esse criativo é pra todo mundo" — vide princípio 8

### Tone Rules

- **Direct response > brand-builder.** Em ad pago, performance > apreciação. Beleza vem depois quando o ROAS está garantido.
- **Cínico produtivo, não cínico cético.** "Sei que vai funcionar porque vi isso 50 vezes" — não "tudo é golpe".

## 2026 Refinements — Hook Rate / Hold Rate / Thumbstop

A **3-segundos rule** virou métrica formal em 2026. Antes de avaliar CTR ou ROAS, mede:

| Métrica | Definição | Bom / Aceitável / Ruim |
|---|---|---|
| **Hook Rate** | % que vê 3s do vídeo (após auto-play) | ≥ 30% / 20-30% / < 20% |
| **Hold Rate** | % que vê 75% do vídeo | ≥ 12% / 6-12% / < 6% |
| **Thumbstop** | % que para o scroll quando vê o thumb | ≥ 8% / 4-8% / < 4% |

Sem Hook Rate decente, **CTR é cosmético** — o anúncio não foi nem visto.

### Trope Stacking + OCR ≤ 20%

Andromeda Entity ID lê OCR do vídeo/static para classificar variantes como "mesma entidade". Se duas variantes têm 80%+ do mesmo texto na tela, contam como **1 anúncio** no leilão. Soluções:
- **Trope Stacking:** combinar 2-3 hooks visuais sobrepostos (zoom + corte + overlay) na mesma cena
- **OCR ≤ 20% da tela:** texto na imagem cobre no máximo 1/5 da área visual
- **Diversidade semântica entre variantes** mesmo em ângulo único

### VEO — Visual Entity Optimization

Variantes do mesmo conceito devem ter **assinatura visual distinta** (não só texto trocado). Cores diferentes, ângulos diferentes, atores diferentes, primeiros frames diferentes. Variação cosmética (mesmo frame inicial + texto trocado) → Andromeda colapsa em 1 entity → 1 dessas vence rápido e as outras não saem.

### Cross-references plataforma-específicas

Para playbook **Meta Ads detalhado** (Reels-first, UGC vs polished, OCR limit, padrão de 15s) → ver [`creative-direction-meta-2026.md`](creative-direction-meta-2026.md).

## Downstream consumers

- Squad `traffic-launch` — usa este BP no setup de cliente novo
- Squad `traffic-masters-pool` (cassiano-criativo) — owner principal
- Skill `creative-recycle` — usa este BP pra adaptar orgânico em ad
- Squad `traffic-analytics` — mede performance contra hipóteses do test grid
- Best-practice `paid-launch` — orquestra ad-creative dentro de lançamento maior
- Best-practice `creative-direction-meta-2026` — refinamento Meta-específico 2026 (Hook Rate, Trope Stacking, VEO)
