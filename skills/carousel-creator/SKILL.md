---
name: carousel-creator
description: |
  Cria carrosséis para Instagram, LinkedIn e outras redes sociais — fim a fim.
  Recebe briefing (tema, plataforma, número de slides), estrutura narrativa
  (hook → desenvolvimento → CTA), gera HTML por slide com identidade visual
  consistente, renderiza para PNG e (opcional) publica.
  É uma SKILL ORQUESTRADORA: combina template-designer, image-creator,
  marketing-expert, humanizer e instagram-publisher/blotato em um workflow
  único, com um único comando.
type: orchestrator
version: 1.0.0
---

# Carousel Creator

Skill orquestradora. Não substitui as 3 skills base — orquestra-as.

## When to use

Use quando o pedido for **"crie um carrossel"**, **"monta um carrossel
sobre X"**, **"3-10 slides para Instagram/LinkedIn sobre Y"**.

NÃO use quando:
- For pedido de 1 imagem só (use `image-creator` direto)
- For texto sem imagem (use `marketing-expert` + best-practice da plataforma)
- Vídeo/Reels (não é carrossel — use best-practice `instagram-reels`)

## Inputs esperados

```yaml
briefing:
  topic: string                       # tema central
  audience: string                    # quem vai ler
  platform: instagram-feed | linkedin-post | both
  slides: 2..10                       # quantidade
  goal: awareness | engagement | save | click_link
  brand:                              # opcional
    logo_path: string
    primary_color: hex
    secondary_color: hex
    font_family: string
  cta:                                # opcional, default = "Salve para depois"
    text: string
    url: string
  language: pt-br | en | es           # default pt-br
publish:
  enabled: false | true               # default false
  account: string                     # @username (se publish=true)
```

Se algum campo crítico estiver faltando (topic, platform, slides), a skill
**pergunta** antes de gerar — não assume.

## Workflow

### Etapa 1 — Estruturar narrativa
Invoca `marketing-expert` (persona Copywriter) com o briefing.
Output: lista de slides, cada um com `{title, body, role}`:

```yaml
slides:
  - role: hook
    title: "Headline curta que para o scroll"
    body: "Promise / pergunta provocativa / dado surpreendente"
  - role: develop_1
    title: "Desenvolvimento do ponto 1"
    body: "Detalhe acionável (max 200 chars)"
  - role: develop_2
    title: "Desenvolvimento do ponto 2"
    body: "Detalhe acionável (max 200 chars)"
  # ... mais slides develop_N
  - role: payoff
    title: "Insight final / virada"
    body: "Conclusão útil"
  - role: cta
    title: "CTA"
    body: "Salve / Comente / Acesse o link"
```

Frameworks aplicáveis: AIDA, PAS, PASTOR, FAB. Marketing-expert escolhe
qual encaixa no `goal` + `audience`.

### Etapa 2 — Humanizar (texto PT-BR)
Se `language == pt-br`, passa CADA `body` pela skill `humanizer`. Remove
padrões "cara de IA": "no cenário atual", "vale ressaltar", listas com
**:** estilo slide etc.

### Etapa 3 — Identidade visual
Invoca `template-designer` para definir/aplicar visual:
- Se squad já tem `pipeline/data/visual-identity.md` + `template-reference.html`,
  reusa.
- Caso contrário, gera 3 variantes via `template-designer` e pede aprovação
  do usuário antes de prosseguir.

### Etapa 4 — Gerar HTML por slide
Para cada slide, gera arquivo HTML self-contained (CSS inline, fonts via
Google Fonts @import, sem deps externas). Aplica regras OBRIGATÓRIAS de
`core/best-practices/image-design.md`:
- Viewport fixo (Instagram carrossel: 1080×1440 px)
- Hero ≥58px, Heading ≥43px, Body ≥34px, Caption ≥24px
- Font-weight ≥500 para body+
- Contraste ≥4.5:1 (WCAG AA)
- CSS Grid ou Flexbox apenas
- Sem texto inferior a 20px em qualquer hipótese
- NUNCA contador "1/7" (Instagram tem navegação nativa)

Salva como `output/{run_id}/slide-01.html`, `slide-02.html`, etc.

### Etapa 5 — Renderizar para PNG
Invoca `image-creator` (Playwright workflow) para cada HTML:
1. Inicia HTTP server local na pasta output
2. Para cada slide:
   - `browser_navigate` → `http://localhost:8765/slide-NN.html`
   - `browser_resize` → 1080×1440 (ou viewport definido)
   - `browser_take_screenshot` → salva como `slide-NN.png`
3. Para HTTP server.

### Etapa 6 — Validação visual
Verifica todas as PNGs:
- Dimensões corretas (1080×1440 para IG carrossel)
- Não ficou texto truncado (compara altura do conteúdo HTML vs viewport)
- Cores OK (sample de pixels nos cantos vs paleta esperada)
- Se algum slide falhou → regenera HTML ajustado e renderiza de novo.

### Etapa 7 — Caption + hashtags
Marketing-expert gera caption final pra acompanhar o post:
- Hook na primeira linha (corta no feed se >2 linhas)
- Corpo (3-6 linhas, evita parágrafo único gigante)
- CTA explícito
- 5-10 hashtags relevantes (mix nicho + autoridade + locais quando faz sentido)
- Texto passa por `humanizer` se PT-BR

### Etapa 8 (opcional) — Publicar
Se `publish.enabled == true`:
- Instagram → invoca `instagram-publisher` (carrossel via Graph API)
- LinkedIn / multi-plataforma → invoca `blotato`
- Caso contrário, retorna caminho dos arquivos pra publicação manual.

## Output

```yaml
run_id: 2026-04-26-1845-tema-x
slides:
  - path: output/2026-04-26-1845-tema-x/slide-01.png
    role: hook
    dimensions: 1080x1440
  - path: output/.../slide-02.png
    role: develop_1
    dimensions: 1080x1440
  # ...
caption: |
  [Texto pronto pra colar no Instagram, com line breaks intactos]
hashtags:
  - "#nichoX"
  - "#autoridade"
  - "#cidade"
metrics:
  total_slides: 7
  total_words_visual: 412
  total_words_caption: 87
  generation_time_seconds: 124
publish:
  enabled: false
  status: not_published
  url: null
```

## Anti-patterns

- **Não gerar mais de 10 slides** sem confirmar com usuário (Instagram limita a 10; LinkedIn permite 20 mas atenção ao engajamento).
- **Não pular humanizer em PT-BR** — texto AI-stink reduz engajamento.
- **Não duplicar paleta de cor entre slides adjacentes** se design system permite variação.
- **Não usar emoji decorativo** sem briefing pedir (regra Tektus: emojis só quando o usuário marcar `emoji_use: medium|high` no profile).

## Dependencies

- skill `marketing-expert` (estruturação narrativa) — externa, ver README "Skills externas"
- skill `humanizer` (PT-BR final pass) — externa
- skill `template-designer` (identidade visual) — externa
- skill `image-creator` (HTML→PNG via Playwright) — externa
- skill `instagram-publisher` (publish IG) — externa, opcional
- skill `blotato` (multi-platform publish) — externa, opcional
- best-practice `core/best-practices/image-design.md` — bundled
- best-practice `core/best-practices/instagram-feed.md` ou `linkedin-post.md` — bundled

## Como invocar

Usuário diz: "monta um carrossel de 7 slides sobre [tema] pro Instagram da [conta]"

Agente declara ODP:
```
Para esta tarefa vou usar: skill `carousel-creator` (orquestra
template-designer + marketing-expert + humanizer + image-creator +
instagram-publisher) + best-practices `instagram-feed` + `image-design`.
Motivo: pedido explícito de carrossel multi-slide com publicação automática.
```

E executa o workflow das 8 etapas.

## Notas de implementação

- **Estado entre etapas:** salvar em `output/{run_id}/state.yaml` pra
  permitir retomar se falhar no meio (ex.: render de slide 5 quebra,
  retoma a partir do slide 5 sem refazer 1-4).
- **Paralelismo:** etapas 1-2-3 sequenciais; etapa 4 (gerar HTML) e
  etapa 5 (render) podem rodar slide a slide em sequência (Playwright
  sessão única) ou em batch paralelo se infraestrutura permitir.
- **Custo:** se `image-ai-generator` for invocado dentro do template
  (ex.: hero generativo), aplicar regra "test mode → produção mode"
  conforme `image-ai-generator/SKILL.md`.

## Versão

1.0.0 — initial release. Próximas: 1.1 (Reels storyboard derivado do
carrossel), 1.2 (variantes A/B de hook automáticas), 2.0 (vídeos
animados a partir do carrossel via Remotion).
