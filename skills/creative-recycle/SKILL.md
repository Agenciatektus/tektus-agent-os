---
name: creative-recycle
description: |
  Adapta criativos orgânicos de social media (carrosséis, reels, statics)
  em criativos de paid ads — preservando o que funcionou organicamente
  (hook, ângulo, retenção) e adicionando o que ad exige (CTA explícita,
  cuts pra placements, copy pra primary text/headline).
  Skill orquestradora: invoca image-creator + carousel-creator (quando
  aplicável) + marketing-expert (Copywriter) + humanizer.
type: orchestrator
version: 1.0.0
---

# Creative Recycle

## When to use

Use quando:
- Cliente tem post orgânico que performou bem (save rate / share rate acima da média do pillar)
- Tráfego pago precisa de criativos novos pra wave/campanha
- Quer reduzir tempo + custo de produção reaproveitando ativos validados

NÃO use quando:
- Post orgânico foi engagement-bait raso (alto like, baixo save) — não vira ad bom
- Cliente não tem histórico de orgânico significativo (use `carousel-creator` zero-to-one)
- Restrição compliance proíbe (claims de saúde/finanças que rolam no orgânico mas Meta nega no ads)

## Inputs esperados

```yaml
source_post:
  url: string                         # URL pública do post orgânico
  platform: instagram-feed | instagram-reel | instagram-story | linkedin-post | tiktok | youtube-shorts
  format: carousel | reel | static | story
  performance:                        # importante — usado pra priorizar reuso
    saves: number
    shares: number
    completion_rate: number (0-1)     # pra reels
    avg_watch_time: seconds (0-N)     # pra reels
    pillar: string                    # ex: "educação", "bastidores", "casos"
target_ad:
  platform: meta-ads | google-ads | tiktok-ads | both
  placement: feed | reels | stories | youtube | search | display
  funnel_stage: topo | meio | fundo
  awareness_stage: unaware | problem-aware | solution-aware | product-aware | most-aware
  cta:
    text: string                      # ex: "Saiba Mais"
    url: string
  budget_class: test | scale          # test = 1 wave; scale = creative campeão
brand:                                # opcional — sobrescreve identidade visual
  primary_color: hex
  secondary_color: hex
  font_family: string
  logo_path: string
language: pt-br | en | es
```

## Workflow

### Etapa 1 — Análise do post fonte

Carrega o post:
- Se carrossel → extrai cada slide (imagens + texto on-image)
- Se reel/vídeo → extrai key frames (1-3-7-15-25s) + transcript via Whisper API ou similar
- Se static → extrai imagem + caption

Identifica:
- **Hook** (primeira frase / primeiro frame / primeiro slide)
- **Ângulo** (qual emoção/promessa central — ver BP `ad-creative` para taxonomia)
- **Body** (desenvolvimento do ponto)
- **CTA implícita** (caso exista) — geralmente fraca em orgânico
- **VoC potencial** (frases dos comentários se autor responde no comments)

### Etapa 2 — Decidir formato de saída

Mapeia post fonte → formato de ad alvo:

| Fonte | Alvo | Estratégia |
|---|---|---|
| Carrossel orgânico | Static ad (1:1 ou 4:5) | Slide 1 vira primary visual; demais viram texto da descrição |
| Carrossel orgânico | Carrossel ad | Mesmo carrossel + adiciona slide final com CTA + ajusta naming |
| Reel orgânico | Video ad (9:16) | Cortar pra 15-30s, comprimir intro, adicionar CTA visual nos últimos 5s |
| Reel orgânico | Static ad | Frame de melhor thumbstop vira static; transcript vira primary text |
| Static orgânico | Static ad | Adiciona CTA visual + adapta primary text com angle de venda |
| Story orgânico | Story Ad | Mantém vertical; adiciona sticker "Saiba Mais" + CTA pra link |

### Etapa 3 — Adaptação de copy

Invoca `marketing-expert` (Copywriter persona):
- **Primary text**: amplia hook + body + CTA explícita (≤500 chars Meta)
- **Headline**: ≤40 chars Meta / ≤30 chars Google — promise concreta com número
- **Description (Google)**: ≤90 chars com keyword + diferencial
- **CTA literal**: "Toque em [Saiba Mais] agora" (não "veja mais no nosso site")

Awareness stage do `target_ad` governa o tom:
- Solution-aware → comparação direta, prova social
- Product-aware → ROI específico, demo, garantia
- Most-aware → oferta + urgência (ver BP `ad-creative`)

Aplica `humanizer` se PT-BR.

### Etapa 4 — Adaptação visual

Para **carrossel orgânico → static ad**:
1. Pega slide 1 (hook) do carrossel original
2. Verifica regras de `image-design.md`:
   - Texto ≥58px (hero)
   - Contraste ≥4.5:1
   - Formato 1080×1080 ou 1080×1350 (4:5)
3. Se necessário, recompõe via `image-creator` (HTML→PNG)
4. Adiciona logo/badge do cliente em canto inferior (não invasivo)

Para **reel orgânico → video ad**:
1. Identifica key moments (hook 0-3s, body 3-15s, virada 15-25s, CTA 25-30s)
2. Se reel original é >30s → cortar (ferramenta externa de edição: descreve cuts em spec, não executa)
3. Adiciona overlay de CTA "Toque em Saiba Mais" nos últimos 5s
4. Verifica que funciona muted (85% assistem sem áudio) — se não, adiciona texto on-screen do body
5. Gera cuts: 9:16 (Reels), 1:1 (feed), 4:5 (feed alternativo)

### Etapa 5 — Variação angular automática

Pra mesmo post-fonte, cria 3 variantes de hook diferentes (ad-creative principle: thumbstop ratio):

```
Variant A — Hook original (controle)
  Mantém hook do post orgânico inalterado.
  Hipótese: "post viral mantém viralidade no ad com CTA explícita"

Variant B — Hook em pergunta
  Reescreve hook como pergunta provocativa do mesmo ângulo.
  Hipótese: "pergunta ativa thumbstop em audiência fria"

Variant C — Hook contrarian
  Reescreve hook como afirmação polêmica do mesmo ângulo.
  Hipótese: "afirmação polêmica = mais saves em B2B"
```

### Etapa 6 — Output package

Saída padrão em `output/{run_id}/`:

```
output/2026-04-26-1900-recycle-cliente-X-post-Y/
├── source-analysis.md          # análise do post original
├── ad-spec.yaml                # spec consumível por meta-ads-api / google-ads-api
├── creatives/
│   ├── variant-a-hook-original/
│   │   ├── 1x1.png
│   │   ├── 4x5.png
│   │   ├── 9x16.png (se vídeo: 9x16.mp4)
│   │   └── primary-text.txt + headline.txt
│   ├── variant-b-hook-pergunta/
│   │   └── ...
│   └── variant-c-hook-contrarian/
│       └── ...
├── upload-checklist.md         # checklist pré-vôo da BP paid-launch Fase 6
└── test-grid.md                # hipótese a testar + métrica de sucesso por variant
```

### Etapa 7 — Handoff

- Se squad `traffic-analytics` está ativo → notifica paid-analyst pra
  monitorar performance da wave
- Se skill `meta-ads-api` ou `google-ads-api` disponíveis e cliente
  autorizou → spec é passada pra upload automático
- Caso contrário → upload manual pelo `marcos-meta` / `gabriel-google`

## Quality Criteria

- [ ] Performance do post fonte qualifica (save rate ≥2x média do pillar OU completion rate ≥60% pra reels)
- [ ] Awareness stage do target_ad mapeada
- [ ] CTA explícita verbal + visual presente nos cuts finais
- [ ] Cuts em todos os aspect ratios necessários (9:16 + 1:1 + 4:5 mínimo)
- [ ] Copy primary text + headline gerados pelas 3 variantes
- [ ] Humanizer aplicado em PT-BR
- [ ] Test grid documenta hipótese a validar por variant
- [ ] Spec compatível com meta-ads-api / google-ads-api se upload automático

## Anti-patterns

- **Reaproveitar tudo que postou** — só os top-saves. Engagement raso (likes) não vira ad bom.
- **Manter CTA fraca do orgânico** — orgânico permite "saiba mais"; ad exige CTA agressiva.
- **Gerar 1 variant só** — orgânico-virado-ad nem sempre ganha. Sempre rode variant ad-nativo como controle.
- **Pular humanizer no PT-BR** — texto AI-stink no ad mata thumbstop.
- **Não checar compliance** — claim de saúde que passou no orgânico pode bloquear o ad.

## Dependencies

- skill `image-creator` — render HTML→PNG dos cuts visuais
- skill `marketing-expert` (externa) — Copywriter persona
- skill `humanizer` (externa) — PT-BR final pass
- skill `template-designer` (externa) — opcional, se precisa adaptar identidade visual
- best-practice `ad-creative` — governa lógica de hook + variação angular
- best-practice `image-design` — regras técnicas de cuts (sizes, contraste, fontes)
- best-practice `paid-launch` — output spec compatível com Fase 4

## Como invocar

Usuário diz: "pega esse post de carrossel que viralizou pra Fabiana e
transforma em ad pra wave 1 com R$ 50/dia de teste"

Agente declara ODP:
```
Para esta tarefa vou usar: skill `creative-recycle` (orquestra image-creator +
marketing-expert + humanizer + image-design BP) + best-practice `ad-creative` +
`paid-launch`. Motivo: pedido de adaptar criativo orgânico em ad com test wave.
```

E executa o workflow das 7 etapas.

## Notas

- **Limites legais (LGPD/MIDIA-CRIANÇA):** orgânicos podem ter pessoas em segundo plano sem consent específico de uso comercial. Ao virar ad pago, exigência de consent muda. Sempre revisar.
- **Direitos musicais:** áudio comercial em reels vai contra licenciamento de Meta Ads. Música original / royalty-free obrigatória pro ad.
- **Plataforma de origem ≠ alvo:** reel do TikTok pode quebrar regras de Meta Ads. Adapte conforme regras da plataforma alvo.
