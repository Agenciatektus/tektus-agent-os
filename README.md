# Tektus Agent OS

> The open-source operating system for AI agent teams — multi-IDE, with squads, skills, and orchestration protocols.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Made by Tektus](https://img.shields.io/badge/Made%20by-Tektus-blue)](https://tektus.com.br)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## Why this exists

Most AI-coding setups are ad-hoc: a `CLAUDE.md`, a few skills copied from a Twitter thread, no shared protocol between IDEs, no audit trail when an agent does something dumb. **You can't run a real team — human or AI — that way.**

Tektus Agent OS is the operating system we built running an actual marketing agency on top of AI agents. It standardizes:

- **Skills** — narrow capabilities (`humanizer`, `marketing-expert`, `wp-performance`, …) loaded only when relevant.
- **Squads** — named teams of agents with explicit hierarchy (CEO, CTO, CMO, Cyber-Security Blue Team, content pools, etc).
- **Best-practices** — opinionated defaults for copywriting, secure-coding, Instagram feeds, LinkedIn posts, blog SEO, and more.
- **ODP — Orchestration Discovery Protocol** — every prompt forces the agent to declare which skill / squad / best-practice it will use *before* acting.
- **Cross-IDE parity** — the same rules and skills mirror to Claude Code, Cursor, and Antigravity/Gemini in the same commit.
- **Continuous learning** — `.learnings/` captures every correction so the next session doesn't repeat the mistake.
- **Token economy** — Lens-first protocol cuts ~80% of tokens in large repos.

If you've ever told Claude/Cursor *"stop doing X"* twice in the same week, this fixes that.

---

## Quickstart

```bash
# 1. Clone
git clone https://github.com/Agenciatektus/tektus-agent-os.git
cd tektus-agent-os

# 2. Install into your project (interactive, asks which IDE + which squads)
node scripts/install.js --target /path/to/your/project

# 3. Open your project. The agent will run the onboarding wizard
#    on first message, then adapt to your profile.
```

That's it. The first time you talk to your agent in the target project, it will:
1. Detect there's no `.tektus/profile.yaml`.
2. Run the **`tektus-onboarding`** skill (3-block interview).
3. Save your profile, install the squads/skills that fit, and show 3 prompts to try.

### Manual install (if you don't want the script)

Copy `core/`, `skills/`, `squads/` into your project, then copy the right adapter:

| Your IDE | Copy this |
|---|---|
| **Claude Code** | `adapters/claude-code/.claude/` → `your-project/.claude/` |
| **Cursor** | `adapters/cursor/.cursor/` → `your-project/.cursor/` |
| **Antigravity / Gemini** | `adapters/antigravity/.agents/` → `your-project/.agents/` |

---

## Architecture

```
tektus-agent-os/
├── core/
│   ├── rules/             # 5 master rules (orchestration, skill-vetting, cross-IDE sync, …)
│   └── best-practices/    # 18 opinionated playbooks (copywriting, secure-coding, instagram-feed, …)
├── skills/                # 27 skills — Tektus custom + curated externals (Stripe, Supabase, n8n, GWS, …)
├── squads/
│   ├── c-level/           # CEO, CTO, CMO, CGO, COO, CDO
│   ├── internal/cyber-security/   # Blue Team — CISO, SecRev, DevSecOps, InfraSec, IR
│   └── pools/             # 32 reusable squads (brand, content, copy, design, dev, sales, traffic, …)
├── adapters/              # Per-IDE mirrors (Claude Code, Cursor, Antigravity)
├── scripts/               # install / sync-ide / validate-skills
├── docs/
└── examples/
```

### The mental model: Skill < Squad < Best-Practice

- A **skill** is a narrow how-to (`humanizer`: reduce AI-stink in PT-BR text).
- A **squad** is a team (`copy-squad-pool`: copywriter + reviewer + brand voice expert).
- A **best-practice** is a playbook (`copywriting`: AIDA, PAS, voice-of-customer, anti-patterns).

When you ask the agent to *"write an Instagram post about X"*, ODP forces it to pick:
- skill `marketing-expert` (persona) + skill `humanizer` (PT-BR final pass)
- best-practice `instagram-feed`
- squad `copy-squad-pool` to review

…and **declare those choices before acting**. No more agents going off-script.

---

## What's in the box

### Skills

The orchestration protocol references skills from two tiers:

#### ✅ Bundled in this repo (in `skills/`)

| Category | Skill | Source |
|---|---|---|
| **Skill creation / vetting** | `opensquad-skill-creator`, `openclaw-skills-skill-vetter`, `openclaw-skills-self-improving-agent-1-0-0` | This repo |
| **WordPress** | `wp-performance`, `wp-plugin-development`, `wp-rest-api` | [WordPress/agent-skills](https://github.com/WordPress/agent-skills) |
| **Backend** | `supabase`, `supabase-postgres-best-practices` | [supabase/agent-skills](https://github.com/supabase/agent-skills) (MIT) |
| **Automation** | `n8n-code-javascript`, `n8n-code-python`, `n8n-expression-syntax`, `n8n-mcp-tools-expert`, `n8n-node-configuration`, `n8n-validation-expert`, `n8n-workflow-patterns` | [czlonkowski/n8n-skills](https://github.com/czlonkowski/n8n-skills) (MIT) |
| **Google Workspace** | `gws-shared`, `gws-drive`, `gws-sheets`, `gws-gmail`, `gws-calendar`, `gws-docs`, `gws-forms` | [googleworkspace/cli](https://github.com/googleworkspace/cli) (Apache-2.0) |
| **Payments** | `stripe-best-practices`, `upgrade-stripe` | [stripe/ai](https://github.com/stripe/ai) (MIT) |
| **Anthropic** | `mcp-builder`, `canvas-design` | [anthropics/skills](https://github.com/anthropics/skills) |
| **Dev / Tooling** | `github` (gh CLI patterns) | [callstackincubator/agent-skills](https://github.com/callstackincubator/agent-skills) (MIT) |
| **Orchestrators** | `carousel-creator` (carrosséis Instagram/LinkedIn end-to-end), `creative-recycle` (orgânico → ad) | This repo |
| **Ads APIs (specs)** | `meta-ads-api`, `google-ads-api` — SPEC v0.1.0, implementação requer sessão dedicada | This repo |
| **Marketing strategist** | `marketing-expert` — 9 personas (Estrategista, Copywriter, Social Media, Social Seller, Funil, Growth, Branding, Marca Pessoal, **Tráfego Pago 2026 Meta+Google**) | This repo |
| **Meta Ads compliance & diagnóstico** | `meta-ads-analyzer` — terminologia oficial Meta + data integrity + marginal cost reasoning + policy routing | This repo (adapted from Manus AI) |
| **Onboarding** | `tektus-onboarding`, `context-lens` | This repo |

#### ⚠️ Externas — instalar separadamente (não vendoradas neste repo)

O ODP cita as skills abaixo porque elas formam a espinha do fluxo de marketing/conteúdo da Tektus em produção. Elas **não são distribuídas neste repo** (algumas são privadas/pagas, outras vivem em repos próprios). O agente as menciona na declaração ODP e você instala via plugin manager / LobeHub:

| Skill | Tipo | Quando instalar |
|---|---|---|
| `humanizer` | PT-BR final pass anti-IA-stink | Qualquer texto final em PT-BR |
| `ui-ux-pro-max` | 50+ styles, 161 palettes, 99 UX guidelines | UI / UX work |
| `image-creator` | HTML→PNG via Playwright (carrosséis, social graphics) | Posts visuais |
| `image-fetcher` | Screenshots live + web image search | Compor referências |
| `image-ai-generator` | Geração via OpenRouter (test/prod modes) | Imagens originais |
| `template-designer` | Identidade visual consistente nos squads | Setup de squad de design |
| `apify` | Web scraping, social profile data | Pesquisa de mercado / leads |
| `blotato` | Multi-platform publishing (IG/LinkedIn/X/TikTok/YT) | Distribuição |
| `canva` | OAuth Canva, autofill templates | Design corporativo |
| `instagram-publisher` | Carrossel direto no IG via Graph API | Publishing direto |
| `resend` | Email transacional/marketing | Newsletters / cold outreach |
| `opensquad-agent-creator` | Criar/atualizar best-practices | Manutenção do OS |

> Onde encontrar: LobeHub Marketplace (`npx -y @lobehub/market-cli skills install <name>`),
> repos da Tektus, ou repos do mantenedor original. Antes de instalar qualquer
> uma, **rodar pelo `skill-vetter`** (regra `core/rules/10-skill-vetting.md`).

> **Por que não vendorar tudo?** Algumas têm licença restritiva, outras evoluem
> rapidamente em repos próprios e queremos pegar updates upstream. Se você quer
> só o esqueleto do OS pra adaptar pro seu próprio fluxo (não-Tektus), **as
> bundled bastam** — substitua as externas pelas suas.

### 32 Squads (highlights)

- **C-Level**: ceo, cto, cmo, cgo, coo, cdo
- **Cyber-Security Blue Team**: ciso, secure-coding-reviewer, devsecops-engineer, infra-security-monitor, incident-responder
- **Pools**: brand-creation, brand-narrative, brand-rebrand, content-production, content-publish, copy-project, copy-review, cyber-pentest, design-pool, dev-pool, sales-sprint, traffic-launch, ui-revamp, wp-automation, vibe-sprint, story-development, …

See [squads/_catalog.md](squads/_catalog.md) for the full catalog.

### 18 Best-Practices

`copywriting`, `secure-coding`, `researching`, `review`, `image-design`, `technical-writing`, `data-analysis`, `strategist`, `instagram-{feed,reels,stories}`, `linkedin-{post,article}`, `twitter-{post,thread}`, `youtube-{script,shorts}`, `email-{newsletter,sales}`, `blog-{post,seo}`, `whatsapp-broadcast`.

---

## 🔒 Sanitize check (extracting to public)

Tektus Agent OS includes tooling to **prevent sensitive data leaks** when
extracting from a private monorepo to a public repo:

```bash
# scan now
node scripts/sanitize-check.js

# install local hooks (pre-commit + pre-push)
node scripts/install-hooks.js

# automated 4-phase extraction (worktree → sanitize → squash → force-push)
bash scripts/extract-to-public.sh \
  --src-dir my-subproject \
  --target-remote https://github.com/Org/public-repo.git
```

Patterns live in `.sanitize-patterns.yaml` (commit it — version your
defenses). CI runs on every PR via `.github/workflows/sanitize-check.yml`.

Full playbook: **[docs/extraction-workflow.md](docs/extraction-workflow.md)**

## 🗺️ Full system map

For the complete catalog (every skill, squad, best-practice, plus 10 documented workflows showing how the pieces compose), see **[docs/MAP.md](docs/MAP.md)**.

---

## How vs. alternatives

| | Claude Code skills (vanilla) | OpenAI Swarm | CrewAI | **Tektus Agent OS** |
|---|---|---|---|---|
| Cross-IDE | ✗ | ✗ | ✗ | ✓ Claude / Cursor / Antigravity |
| Named squads with hierarchy | ✗ | partial | ✓ | ✓ |
| Skill vetting protocol | ✗ | ✗ | ✗ | ✓ |
| Token economy / Lens-first | ✗ | ✗ | ✗ | ✓ |
| First-run onboarding wizard | ✗ | ✗ | ✗ | ✓ |
| Self-improving via `.learnings/` | ✗ | ✗ | ✗ | ✓ |
| Battle-tested in production | — | — | — | ✓ Running a real agency |

---

## Status

`v0.1.0` — first public release. APIs may change. We dogfood this every day.

See [CHANGELOG.md](CHANGELOG.md).

---

## Contributing

PRs welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening one. Skill vetting is **mandatory** for any external skill addition (rule 10).

---

## License

[MIT](LICENSE). Some bundled skills retain upstream licenses — see `LICENSE` "Third-party content" section and [docs/credits.md](docs/credits.md).

---

## Need a custom squad?

Tektus designs and runs AI agent operations for agencies and SaaS — from one-off custom squads to full ops handoff. If this repo's framework saved you a week, imagine what we can do shipping for you.

→ [tektus.com.br](https://tektus.com.br)

---

🇧🇷 *Made by the user Queiroz and the Tektus team in Brazil. PT-BR is a first-class citizen — see the `humanizer` skill.*
