# 🗺️ Mapa do Sistema — Tektus Agent OS

Documento único que mostra **tudo o que existe** no Tektus Agent OS e **como as peças se conectam**. Use este mapa quando:
- Quiser ter visão geral do sistema
- Procurar a skill / squad / best-practice certa para uma tarefa
- Onboardar alguém novo no OS
- Decidir o que customizar / desativar / contribuir

> Este é o índice navegável. Catálogos detalhados:
> - Squads: [`squads/_catalog.md`](../squads/_catalog.md) + [`squads/_registry.yaml`](../squads/_registry.yaml)
> - Best-practices: [`core/best-practices/_catalog.yaml`](../core/best-practices/_catalog.yaml)
> - Skills: cada `skills/<nome>/SKILL.md`

---

## 🏛️ Visão arquitetural

```
                    ┌─────────────────────────────────────────┐
                    │      USER PROMPT (chat / IDE)           │
                    └─────────────────┬───────────────────────┘
                                      │
                  ┌───────────────────▼────────────────────┐
                  │  HOOK: UserPromptSubmit                │
                  │  ┌──────────────────────────────────┐  │
                  │  │ odp-reminder.js                  │  │
                  │  │   → injeta catálogo + ODP        │  │
                  │  └──────────────────────────────────┘  │
                  │  ┌──────────────────────────────────┐  │
                  │  │ onboarding-check.js              │  │
                  │  │   → checa .tektus/profile.yaml   │  │
                  │  └──────────────────────────────────┘  │
                  └───────────────────┬────────────────────┘
                                      │
        ┌─────────────────────────────▼──────────────────────────────┐
        │   AGENT (Claude / Cursor / Antigravity)                    │
        │                                                            │
        │   1. Lê core/rules/ (master) + adapter mirrors             │
        │   2. Lê .tektus/profile.yaml + WORKSPACE_STATE.md          │
        │   3. Lê .learnings/LEARNINGS.md (corrections passadas)     │
        │   4. DECLARA tools (per ODP — rule 00)                     │
        │   5. Invoca: skill X + squad @Y + best-practice Z          │
        │   6. Executa                                               │
        │   7. Loga aprendizados em .learnings/ (rule 13)            │
        └────────────────────────────────────────────────────────────┘
                                      │
                  ┌───────────────────┼───────────────────┐
                  ▼                   ▼                   ▼
            ┌──────────┐        ┌──────────┐        ┌──────────────┐
            │  SKILLS  │        │  SQUADS  │        │ BEST-PRACT.  │
            │   (30)   │        │   (38)   │        │     (24)     │
            └──────────┘        └──────────┘        └──────────────┘
```

### As 7 master rules em `core/rules/`

| # | Rule | O que faz |
|---|---|---|
| 00 | orchestration-protocol | Força declaração de tools antes de toda resposta (ODP) |
| 02 | token-economy | Lens-first, Workspace State, targeted reads — corta ~80% tokens |
| 10 | skill-vetting | Vetting obrigatório antes de instalar skill externa |
| 11 | cross-ide-sync | Paridade Claude/Cursor/Antigravity em todo commit |
| 12 | cyber-security-squad | Code/infra/auth/payments invocam Blue Team |
| 13 | continuous-learning | Loga em `.learnings/` após correções/erros/padrões novos |
| 14 | first-run-onboarding | Wizard quando `.tektus/profile.yaml` ausente |

---

## 🔧 SKILLS (36) — capacidades narrowly-defined

### Tektus original (18)

| Skill | Quando usar |
|---|---|
| [`humanizer`](../skills/humanizer/SKILL.md) | Passe final em texto PT-BR para reduzir "cara de IA" |
| [`marketing-expert`](../skills/marketing-expert/SKILL.md) | 8 personas: Estrategista, Copywriter, Social Media, Social Seller, Funil, Growth, Branding, Marca Pessoal |
| [`ui-ux-pro-max`](../skills/ui-ux-pro-max/SKILL.md) | UI/UX intelligence (50+ estilos, 161 paletas, 99 UX guidelines) |
| [`template-designer`](../skills/template-designer/SKILL.md) | Identidade visual consistente para entregas |
| [`image-creator`](../skills/image-creator/SKILL.md) | Render HTML→PNG (Playwright) — carrosséis, social graphics |
| [`image-fetcher`](../skills/image-fetcher/SKILL.md) | Buscar imagens (web search ou screenshot live) |
| [`image-ai-generator`](../skills/image-ai-generator/SKILL.md) | Gerar imagens via Openrouter (test/production modes) |
| [`instagram-publisher`](../skills/instagram-publisher/SKILL.md) | Publicar carrossel direto via Graph API |
| [`apify`](../skills/apify/SKILL.md) | Web scraping, social media scraping |
| [`blotato`](../skills/blotato/SKILL.md) | Multi-platform publishing (IG, LinkedIn, X, TikTok, YT) |
| [`canva`](../skills/canva/SKILL.md) | Designs via Canva Connect (OAuth) |
| [`resend`](../skills/resend/SKILL.md) | Email transacional / marketing |
| [`tektus-onboarding`](../skills/tektus-onboarding/SKILL.md) | First-run wizard (3-block interview) |
| [`workspace-state`](../skills/workspace-state/SKILL.md) | Manter `WORKSPACE_STATE.md` (memória entre sessões) |
| [`context-lens`](../skills/context-lens/SKILL.md) | Wrapper do MCP Context Lens (Tier 1 token economy) |
| [`opensquad-skill-creator`](../skills/opensquad-skill-creator/SKILL.md) | Criar/iterar novas skills com evals |
| [`opensquad-agent-creator`](../skills/opensquad-agent-creator/SKILL.md) | Criar/atualizar best-practices |
| [`meta-ads-analyzer`](../skills/meta-ads-analyzer/SKILL.md) | Análise/diagnóstico de campanhas Meta existentes — compliance terminológico Meta + data integrity + marginal cost reasoning + policy routing (adapted from Manus AI) |

### Skills externas vetadas (13)

| Skill | Fonte / Licença | Para |
|---|---|---|
| `wp-performance` | WordPress.org | Auditoria + otimização WP (WP-CLI, autoload, cache) |
| `wp-plugin-development` | WordPress.org | Dev de plugins (hooks, settings API, security) |
| `wp-rest-api` | WordPress.org | Endpoints REST customizados |
| `supabase` | Supabase MIT | Database, Auth, Edge Functions, Realtime, Storage |
| `supabase-postgres-best-practices` | Supabase MIT | Otimização Postgres (indexes, locks, queries) |
| `n8n-{code-javascript,code-python,expression-syntax,mcp-tools-expert,node-configuration,validation-expert,workflow-patterns}` (×7) | czlonkowski MIT | n8n workflows, Code nodes, expressões, validação |
| `gws-{shared,drive,sheets,gmail,calendar,docs,forms}` (×7) | Google Apache-2.0 | Google Workspace operations |
| `stripe-best-practices` | Stripe MIT | API selection, Connect, Billing, key management |
| `upgrade-stripe` | Stripe MIT | Migração de versões da API Stripe |
| `mcp-builder` | Anthropic | Construir MCP servers (FastMCP / TS SDK) |
| `canvas-design` | Anthropic | Designs canvas-based (.png/.pdf) |
| `web-artifacts-builder` | Anthropic | HTML artifacts complexos (React + Tailwind + shadcn) |
| `github` | Callstack MIT | Padrões gh CLI (PRs, stacked PRs, review) |

### Meta-skills (4)

| Skill | Para |
|---|---|
| `openclaw-skills-skill-vetter` | Checklist de segurança antes de instalar skill externa |
| `openclaw-skills-self-improving-agent` | Captura de aprendizados em `.learnings/` |
| `opensquad-skill-creator` | Workflow para criar skill com evals |
| `opensquad-agent-creator` | Workflow para criar/atualizar best-practice |

---

## 👥 SQUADS (38) — equipes nomeadas com hierarquia

### C-Level (6) — `squads/c-level/`

| Agente | whenToUse |
|---|---|
| `ceo` | Estratégia geral, decisão final |
| `cto` | Arquitetura técnica, supervisão de Cyber-Security |
| `cmo` | Branding, posicionamento, criativos, inbound |
| `cgo` | Performance, tráfego pago, growth, CRO |
| `coo` | Operações, processos, qualidade |
| `cdo` | Dados, BI, memory management |

### Cyber-Security Blue Team (5) — `squads/internal/cyber-security/`

| Agente | whenToUse |
|---|---|
| `@ciso` | Decisão estratégica de risco, threat model |
| `@secure-coding-reviewer` | Code review pré-deploy |
| `@devsecops-engineer` | CI/CD, secrets, audit de deps |
| `@infra-security-monitor` | Hardening VPS, monitoring, alertas |
| `@incident-responder` | Incidente em curso (malware, vazamento) |

### Pools (32) — `squads/pools/`

| Categoria | Squads |
|---|---|
| **Brand** | `brand-creation`, `brand-narrative`, `brand-pool`, `brand-rebrand` |
| **Content** | `content-calendar`, `content-factory-pool`, `content-production`, `content-publish` |
| **Copy** | `copy-project`, `copy-review`, `copy-squad-pool` |
| **Cyber (Red Team)** | `cyber-incident-response`, `cyber-pentest`, `cyber-pool` (cybersecurity-pool com 14+ agentes) |
| **Design** | `design-pool`, `design-system-creation` |
| **Dev** | `dev-pool`, `dev-feature-design` |
| **Sales** | `sales-sprint`, `sales-lead-pipeline`, `sales-ops-pool` |
| **Traffic** | `traffic-audit`, `traffic-launch`, `traffic-masters-pool` |
| **Outros** | `app-kickoff`, `crm-setup`, `mapeamento-processos`, `story-development`, `storytelling-pool`, `ui-revamp`, `vibe-sprint`, `wp-automation` |

---

## 📚 BEST-PRACTICES (31) — `core/best-practices/`

### Disciplina (9)

| Best-practice | Para |
|---|---|
| `secure-coding` | 8 Core Principles (auth-gate, no secrets, defense in depth, etc.) |
| `copywriting` | AIDA, PAS, PASTOR, 4Ps, FAB |
| `researching` | Data brief, sourcing, validation |
| `review` | QC de conteúdo, code review humano |
| `image-design` | Min font sizes, contraste WCAG, layout grid |
| `technical-writing` | Long-form técnico, documentação |
| `data-analysis` | Métricas, reports, dashboards |
| `strategist` | Calendário editorial, planos 90 dias |
| `token-economy` | Lens-first, anti-patterns de leitura, custo por op |

### Por plataforma (15)

| Plataforma | Best-practices |
|---|---|
| Instagram | `instagram-feed`, `instagram-reels`, `instagram-stories` |
| LinkedIn | `linkedin-post`, `linkedin-article` |
| Twitter/X | `twitter-post`, `twitter-thread` |
| YouTube | `youtube-script`, `youtube-shorts` |
| Email | `email-newsletter`, `email-sales` |
| Blog | `blog-post`, `blog-seo` |
| WhatsApp | `whatsapp-broadcast` |
| Geral | `social-networks-publishing` |

---

## 🔄 WORKFLOWS — combinações típicas

Aqui está **como as peças se montam** em fluxos reais. Cada workflow lista skills + squads + best-practices envolvidos.

### W1 — Carrossel de Instagram (PT-BR, agência)

```
Trigger: "Crie um carrossel Instagram sobre X" / "monta 7 slides sobre Y"
↓
Skill carousel-creator (orquestrador) → executa em 8 etapas:
  1. marketing-expert (Copywriter) → estrutura narrativa AIDA/PAS
  2. humanizer → passe PT-BR (remove cara de IA)
  3. template-designer → identidade visual (reusa pipeline/data se existir)
  4. Geração de HTML por slide (image-design.md regras obrigatórias)
  5. image-creator (Playwright) → render 1080×1440 PNG por slide
  6. Validação visual (dimensões, contraste, truncamento)
  7. Caption + 5-10 hashtags (humanizer aplicado se PT-BR)
  8. (opcional) instagram-publisher / blotato → publica
↓
.learnings/: registra padrões do cliente para próximos carrosséis
```

> Para post de imagem **única** (sem múltiplos slides), pule `carousel-creator`
> e use `image-creator` direto + `marketing-expert` + best-practice `instagram-feed`.

### W2 — Code review pré-deploy

```
Trigger: "Revise este diff antes de deploy"
↓
1. Rule 12 (auto-trigger) → invoca Blue Team
2. Best-practice secure-coding → 8 Core Principles
3. Squad internal/cyber-security/secure-coding-reviewer → review estruturado
4. Se há infra: @devsecops-engineer (secrets, CI)
5. Se há decisão de risco: @ciso (threat model)
↓
Output: APPROVE / BLOCK / FLAG com justificativas
.learnings/: novos padrões de vulnerabilidade encontrados
```

### W3 — Auditoria de WordPress lento

```
Trigger: "Site WP do cliente X está lento"
↓
1. Skill wp-performance → wp doctor + wp profile + autoload
2. Best-practice secure-coding (defense in depth) → durante fix
3. Squad pools/wp-automation → executa fixes priorizados
4. Skill workspace-state → loga decisões em WORKSPACE_STATE.md
↓
Verificação: re-run wp profile, comparar baseline
```

### W4 — Setup SaaS (Supabase + Stripe)

```
Trigger: "Configure auth + payments no SaaS"
↓
1. Skill supabase → Auth + RLS policies
2. Best-practice supabase-postgres-best-practices → schema, indexes
3. Skill stripe-best-practices → Connect, restricted keys, webhooks
4. Squad internal/cyber-security/secure-coding-reviewer → review
5. Skill mcp-builder (se precisar MCP custom) → expor como ferramenta
↓
.learnings/: decisões de RLS / restricted keys
```

### W5 — Lançamento de produto (CPL completo)

```
Trigger: "Vou lançar o curso X"
↓
1. Skill marketing-expert (Especialista em Funil) → desenha CPL
2. Squad pools/copy-project → copies (página, e-mails, ads)
3. Best-practice strategist → cronograma 90 dias
4. Best-practice email-sales → sequência de carrinho 7 dias
5. Skill resend → envio das sequências
6. Squad pools/traffic-launch → ads + tracking
7. Skill humanizer → todos os textos PT-BR
↓
KPIs: registrados em .learnings/ para próximos lançamentos
```

### W6 — Pesquisa + Brief estratégico

```
Trigger: "Faça um diagnóstico digital do cliente Y"
↓
1. Skill apify → scraping concorrência + cliente
2. Best-practice researching → data brief estruturado
3. Best-practice strategist → SWOT + plano 90 dias
4. Squad c-level/cmo + cgo → leitura estratégica
5. Skill template-designer → entrega visual
↓
Saída: doc executivo + plano fase 1/2/3
```

### W7 — Onboarding em projeto novo (first-run)

```
Trigger: primeira mensagem do usuário em projeto sem .tektus/profile.yaml
↓
1. Hook onboarding-check.js → injeta lembrete pra rodar wizard
2. Skill tektus-onboarding → entrevista 3 blocos (AskUserQuestion)
3. Salva .tektus/profile.yaml
4. Aplica adaptações por profile (agency/solo-dev/saas/etc.)
5. Skill workspace-state → seed inicial de WORKSPACE_STATE.md
6. Mostra 3 starter prompts customizados
↓
Próxima mensagem: agente já adaptado
```

### W8 — Token Economy (toda sessão grande)

```
Trigger: começar tarefa em repo > 200 arquivos
↓
1. Rule 02 → exige Lens-first
2. Skill context-lens → lens_context(query)
3. Skill workspace-state → /state read
4. Best-practice token-economy → decision table
5. Glob/Grep só se Lens não cobriu
6. Read targeted (offset/limit) só se necessário
↓
Declaração ODP: "Fonte de contexto: lens (3 results) + state + 1 Read"
```

### W9 — Adicionar nova skill ao OS

```
Trigger: "Quero adicionar a skill X"
↓
1. Rule 10 (skill-vetting) → obrigatório
2. Skill openclaw-skills-skill-vetter → fetch SKILL.md, checklist
3. Apresenta SKILL VETTING REPORT
4. Aprovação humana (HIGH/EXTREME)
5. Instala em .claude/skills/<X>/
6. Espelha em .cursor/skills/ + .agents/skills/ (rule 11)
7. Roda scripts/validate-skills.js
8. Loga em .learnings/ category=skill_installed
↓
.tektus/profile.yaml atualiza skills_active
```

### W10 — Criar squad / agente novo

```
Trigger: "Preciso de um squad para [domínio Z]"
↓
1. Skill opensquad-agent-creator → entrevista
2. Define role + skills + best-practices que o agente usa
3. Cria squads/<categoria>/<squad-name>/
4. Adiciona em squads/_catalog.md + _registry.yaml
5. Cada agente declara seus tools + protocolo
6. Roda scripts/validate-skills.js (se houver skills)
↓
Próximas tasks invocam @novo-agente
```

### W12 — Lançamento de tráfego pago end-to-end (Meta + Google)

```
Trigger: "Lança campanha Meta+Google pro cliente X com R$15k/mês a partir
         do dia Y"
↓
Etapa 1 — Brief estratégico (1-2 dias)
  Squad: traffic-launch (chief + analista + pixel + creative)
  Best-practices: audience-research + paid-launch (Fase 1)
  Output: brief-pago-X.md (objetivo + KPIs SMART + budget allocation +
          personas-alvo + ofertas reais)

Etapa 2 — Setup técnico (1 dia) — PRÉ-REQUISITO ABSOLUTO
  Agent: pedro-pixel
  Best-practice: pixel-setup (7 fases — server-side obrigatório)
  Output: tracking-spec-X.md + DebugView verde com 3 eventos reais
  ⚠️ Sem este passo concluído, qualquer campanha = budget queimado

Etapa 3 — Criativo (paralelo, 2-5 dias)
  Agent: cassiano-criativo + visual-producer (cross-squad com content-factory-pool)
  Best-practice: ad-creative
  Skill orquestradora: creative-recycle (quando reaproveitando orgânico)
  Skill: humanizer (PT-BR pass)
  Test grid documentado: 3 ângulos × 2 visuais × 2 hooks = 12 variants
  Output: pasta de criativos prontos com test grid

Etapa 4 — Estruturação (1 dia)
  Agents: marcos-meta + gabriel-google
  Best-practice: paid-launch (Fase 4)
  Output: campaign-spec.yaml com naming convention + budgets + audiences

Etapa 5 — Upload (manual OU automático)
  Manual: humano segue spec → BM/Google Ads UI (2-4h)
  Automático: skills meta-ads-api + google-ads-api consomem spec → criam
              campanhas pausadas via API + retornam IDs (10-30min)
  ⚠️ Sempre status PAUSED até checklist Fase 6
  ⚠️ Skills de API ainda em SPEC (v0.1.0) — implementação requer sessão dedicada

Etapa 6 — Pré-vôo (30min)
  Best-practice: paid-launch (Fase 6 — checklist 8 itens)
  Critério ATIVAR: 8/8 checked
  Cliente assina aprovação antes de despausar

Etapa 7 — Learning phase (7-14 dias)
  Owner: aline-analista monitora, NÃO mexe
  Best-practice: paid-launch (Fase 7 — bloqueio de mexidas)

Etapa 8 — Iteração: kill / scale / new-wave (semanal, contínuo)
  Squad: traffic-analytics (paid-analyst + attribution-curator)
  Best-practice: paid-launch (Fase 8) + ad-creative (test grid)
  Decisões assinadas com critério numérico:
    KILL: CPL >2x meta após 50 cliques (mata, não pausa)
    SCALE: ROAS ≥meta por 7d → batismo em campanha de escala
    NEW WAVE: creative fatigue 7d+ → kicks off Etapa 3 nova
↓
Loop: insights da Etapa 8 alimentam Etapa 3 (novas waves) +
content-analytics (creatives orgânicos top-performance viram source pra
creative-recycle).
```

### W11 — Estratégia de conteúdo end-to-end (90 dias agendados)

```
Trigger: "Cria estratégia de conteúdo Q1 pro cliente X com calendário
         90 dias e agenda os primeiros 30 dias"
↓
Etapa 1 — Pesquisa de público (1-2 dias)
  Best-practice: audience-research → personas (Schwartz stage), ICP, JTBD,
                                      negative personas, VoC bank
  Best-practice: researching → fontes verificadas, freshness, contradições
  Skill (externa): apify → scraping de social profiles, reviews, search
  Output: audience-brief-cliente-X.md (5+ entrevistas por persona,
          20+ VoC quotes, valid until)

Etapa 2 — Estratégia + KPIs (1 dia)
  Best-practice: strategist → SWOT, content pillars (3-5), KPIs SMART,
                              cadence per platform, refresh cycle
  Skill (externa): marketing-expert (Estrategista)
  Output: estrategia-q1-cliente-X.md (objetivos + KPIs + pillars)

Etapa 3 — Calendário editorial (1 dia)
  Squad: content-calendar (chief, format-strategist, calendar-planner)
  Pool: content-factory-pool/agents
  Output: calendar-q1-cliente-X.md (data + plataforma + pillar + formato + brief)

Etapa 4 — Produção peça-a-peça (paralelo, 10-30 peças)
  Squad: content-production (chief, writer, visual-producer, video-editor,
                              format-strategist)
  Skill orquestradora: carousel-creator (quando carrossel)
  Skill final: humanizer (PT-BR pass)
  Best-practices: instagram-feed | linkedin-post | youtube-script | etc.
  Output: pasta com PNGs/MP4s + captions + hashtags por peça

Etapa 5 — Publicação + agendamento (1 dia)
  Squad: content-publish (chief, format-strategist, publisher)
  Skill (externa): blotato (multi-plataforma + scheduling ISO 8601)
  Skill (externa): instagram-publisher (carrossel direto sem scheduling)
  Output: publish-log com URLs + scheduled_at confirmados

Etapa 6 — Mensuração + iteração (recorrente, semanal)
  Squad: content-analytics (kpi-curator, analyst)
  Best-practice: data-analysis
  MCP: google-analytics-mcp + Meta Insights + LinkedIn Analytics
  Output: report semanal (top wins/losses + 1-2 experimentos próxima semana)
↓
Loop: insights da etapa 6 alimentam ajustes em content-calendar e
content-production. KPIs fora de meta escalam pra strategist (recalibração).
.learnings/: padrões repetíveis viram best-practice candidate.
```

### W13 — Tráfego pago plataforma-específico 2026 (Meta era Andromeda + Google era Gemini 3)

```
Trigger: "Estruturar campanha Meta Ads para [SaaS/D2C/serviço] em 2026"
         OU "Auditar conta Google Ads e adaptar pra Power Pack"
         OU "Briefar criativo Reel pra Meta com Hook Rate ≥ 30%"
↓
Etapa 0 — Sincronizar conhecimento 2026 (todo trigger acima)
  Skill: marketing-expert (9ª persona — Tráfego Pago 2026 Meta+Google)
  Best-practices DATADAS (last_updated: 2026-04-27):
    - meta-ads-2026 (se Meta) — Andromeda, Lattice, 3-1-Many, 7-day learning
    - creative-direction-meta-2026 (se brief criativo) — VEO, Trope Stacking
    - google-ads-2026 (se Google) — Power Pack, AI Max, ALF/UCP, AI Overviews
  Best-practices ATEMPORAIS (sempre carregar em conjunto):
    - paid-launch (framework end-to-end multi-canal)
    - pixel-setup (Event ID + EMQ + Enhanced Conversions Unified)
    - ad-creative (Hook Rate / Hold Rate / Thumbstop benchmarks)
↓
Etapa 1 — Decisão de eixos (Meta apenas)
  • Eixo objetivo: Mensagens / Conversões / Tráfego / Vendas (Advantage+
    Shopping APENAS se houver checkout online + catálogo)
  • Eixo orçamento: CBO (default 2026) | ABO (casos específicos)
  • Eixo audiência: Advantage+ Audience (default 2026) | Detailed Targeting
  Output: 3 escolhas declaradas, justificadas com base no negócio
↓
Etapa 2 — Tracking pré-condição absoluta
  Best-practice: pixel-setup v1.1.0 — Event ID com mesmo ID em Pixel + CAPI,
  EMQ ≥ 8 medido em Events Manager > Diagnostics, Enhanced Conversions
  unificada (Google) com hashing SHA-256 client-side
↓
Etapa 3 — Estrutura plataforma-específica
  Meta (3-1-Many): 3 campanhas (TOFU/MOFU/BOFU) × 1 audiência ampla × N
    criativos. CBO + Advantage+ Audience. Budget mínimo R$200-500/dia por
    AdSet pra alcançar liquidez Andromeda.
  Google (Power Pack): Demand Gen (top funil) + AI Max (intenção) + PMax
    (conversão). Não fragmentar em mais campanhas.
↓
Etapa 4 — Briefing criativo Meta 2026
  Best-practice: creative-direction-meta-2026
  Targets: Hook Rate ≥ 30%, Hold Rate ≥ 12%, Thumbstop ≥ 8%, OCR ≤ 20%
  Variantes: 5-6 ângulos diferentes (Trope Stacking + diversidade VEO)
  Formato dominante: Reels-first; UGC > polished na maioria dos verticais
↓
Etapa 5 — Learning phase (regra dos 7 dias Meta)
  Não otimizar antes de 50+ conversões OU 7 dias completos.
  Decisão pós-learning:
    - Hook Rate ≥ 30% + ROAS ≥ meta → escalar 20-50%
    - Hook Rate ≥ 30% + ROAS < meta → trocar oferta/landing, não criativo
    - Hook Rate < 20% → matar criativo, novo briefing
↓
Etapa 6 — Iteração + atribuição honesta
  Squad: traffic-analytics (paid-analyst + attribution-curator)
  Cross-canal: Meta + Google + GA4 attribution model unified
  Loop semanal: kill / scale / new-wave decisions assinadas
↓
.learnings/: cada decisão Andromeda/Gemini-específica que se mostra repetível
vira candidate pra próxima revisão trimestral dos BPs *-2026.
```

**Diferença chave vs W12 (paid-launch genérico):**
W12 cobre o **fluxo end-to-end** (brief → tracking → creative → estrutura → upload → learning → iteração) sem se prender a uma plataforma específica. W13 **especializa as fases 3-5** com playbooks Meta 2026 (Andromeda) e Google 2026 (Gemini 3). Use **os dois juntos** quando o canal é definido.

---

## 🛡️ Triggers obrigatórios (atalhos para encontrar o caminho)

| Tipo de pedido | Caminho automático |
|---|---|
| Código / infra / auth / pagamento | Rule 12 → Cyber-Security Blue Team |
| UI/UX | `ui-ux-pro-max` skill (+ MCP 21st se disponível) |
| Conteúdo PT-BR | `humanizer` no passe final |
| Instalar skill nova | `skill-vetter` primeiro (rule 10) |
| Erro / correção / aprendizado | Logar em `.learnings/` (rule 13) |
| Repo > 200 arquivos | Lens-first (rule 02) |
| Primeira mensagem em projeto novo | `tektus-onboarding` (rule 14) |

---

## 🧭 Como navegar este OS quando você está perdido

1. **Não sabe que skill usar** → consulte tabela de Skills acima ou rode `Skill` tool com keyword
2. **Não sabe que squad invocar** → consulte tabela de Squads ou [`squads/_catalog.md`](../squads/_catalog.md)
3. **Não sabe que best-practice carregar** → veja [`core/best-practices/_catalog.yaml`](../core/best-practices/_catalog.yaml)
4. **Quer ver um workflow inteiro** → seção W1-W12 acima
5. **Quer entender o porquê** → leia [`docs/architecture.md`](architecture.md)
6. **Quer começar a usar** → siga [`docs/getting-started.md`](getting-started.md)

---

## 📊 Métricas do sistema (v0.1.0)

| Métrica | Valor |
|---|---|
| Skills | 30 |
| Squads | 38 (6 C-Level + 5 Cyber-Security + 32 pools — 5 placeholders) |
| Best-practices | 24 |
| Master rules | 7 |
| Workflows documentados | 10 |
| IDEs suportados | 3 (Claude Code, Cursor, Antigravity) |
| Hooks | 2 (odp-reminder, onboarding-check) |
| Profile templates | 6 (agency, solo-dev, saas, consultant, learner, contributor) |

---

## 🔗 Referências cruzadas

- [README.md](../README.md) — pitch público
- [docs/architecture.md](architecture.md) — mental model + ODP + cross-IDE
- [docs/getting-started.md](getting-started.md) — quickstart 10 min
- [docs/token-economy.md](token-economy.md) — pilar de economia de tokens
- [docs/credits.md](credits.md) — atribuição de skills externas
- [CONTRIBUTING.md](../CONTRIBUTING.md) — como contribuir
- [CHANGELOG.md](../CHANGELOG.md) — histórico de versões
