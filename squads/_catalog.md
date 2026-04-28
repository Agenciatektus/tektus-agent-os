# 🗂️ Catálogo de Squads — SquadAgency Tektus

> Lista canônica para o **Protocolo de Orquestração (ODP)**. Antes de implementar qualquer pedido não-trivial, o agente DEVE consultar este catálogo para identificar o squad/agente correto e usá-lo. Ver `.claude/rules/00-protocolo-orquestracao.md`.

## Como ler

- **whenToUse** — quando esse squad/agente é o pertinente
- **agentes** — membros do squad (id e role)
- **arquivos** — caminhos dos `.md` para invocar

## C-Level (executivos)

| Agente | Role | whenToUse | Arquivo |
|---|---|---|---|
| `ceo` | Chief Executive Officer | Estratégia geral, decisão final, alinhamento entre C-Level | `C-Level/ceo.md` |
| `cto` | Chief Technology Officer | Arquitetura técnica, infra, automação, **supervisiona Cyber Segurança** | `C-Level/cto.md` |
| `cmo` | Chief Marketing Officer | Branding, posicionamento, criativos, inbound | `C-Level/cmo.md` |
| `cgo` | Chief Growth Officer | Performance, tráfego pago, growth experiments, CRO | `C-Level/cgo.md` |
| `coo` | Chief Operations Officer | Operações, processos internos, qualidade | `C-Level/coo.md` |
| `cdo` | Chief Data Officer | Dados, BI, memory management | `C-Level/cdo.md` |

## Squads Internas

### Sob CTO

| Squad | whenToUse | Status | Arquivos |
|---|---|---|---|
| **Cyber-Seguranca** (Blue Team / DevSecOps) | Review de código vibecoded, hardening de VPS, gestão de secrets, monitoring 24/7, resposta a incidente. Obrigatório quando pedido toca código, deploy, infra, dados de cliente, autenticação ou pagamento. | ✅ ativo | `Internal/Cyber-Seguranca/{ciso,secure-coding-reviewer,devsecops-engineer,infra-security-monitor,incident-responder}.md` + `README.md` |
| Tech-Automation | Automações n8n, integrações de API, scripts | 🟡 placeholder | `Internal/Tech-Automation/` (vazio) |
| Dev-Infrastructure | Infra de dev (CI, repos, ambientes) | 🟡 placeholder | `Internal/Dev-Infrastructure/` (vazio) |

### Sob CGO

| Squad | whenToUse | Arquivos |
|---|---|---|
| Growth-Experiments | A/B tests, hipóteses de growth, ICE prioritization | `Internal/Growth-Experiments/` |
| Performance-Ads | Google Ads, Meta Ads, CAPI, CRO | `Internal/Performance-Ads/` |

### Sob CMO

| Squad | whenToUse | Arquivos |
|---|---|---|
| Inbound-Marketing | Conteúdo orgânico, blog, SEO, social | `Internal/Inbound-Marketing/` |
| Design-Criativos | Criativos de ads, design de UI, branding | `Internal/Design-Criativos/` |

### Sob COO

| Squad | whenToUse | Arquivos |
|---|---|---|
| Operations-Agility | Processos internos, OKRs, qualidade | `Internal/Operations-Agility/` |

## Pools (squads/pools/)

| Pool | whenToUse | Caminho |
|---|---|---|
| **cybersecurity-pool** (Red Team / Pentest) | OSINT, recon, pentest contra clientes. **Invocado pela CISO**, não por agente comum. 14+ agentes (Shannon Runner OSINT, Cartographer, Busterer, etc.) | `squads/pools/cybersecurity-pool/` |
| brand-pool | Identidade de marca, tom de voz | `squads/pools/brand-pool/` |
| copy-squad-pool | Copywriting persuasivo | `squads/pools/copy-squad-pool/` |
| design-pool | Design visual | `squads/pools/design-pool/` |
| storytelling-pool | Narrativas, roteiros | `squads/pools/storytelling-pool/` |
| **content-calendar** | Planejamento editorial mensal — pillars + cronograma | `squads/pools/content-calendar/` |
| **content-production** | Produção de cada peça (copy + visual + format) | `squads/pools/content-production/` |
| **content-publish** | Publicação multi-plataforma + agendamento (Blotato / IG Publisher) | `squads/pools/content-publish/` |
| **content-analytics** | Mensuração + iteração — KPIs, report semanal, experimentos | `squads/pools/content-analytics/` |
| content-factory-pool | Pool compartilhado de agentes (chief, writer, format-strategist, publisher, visual-producer, video-editor, calendar-planner) | `squads/pools/content-factory-pool/` |
| **traffic-launch** | Onboarding de tráfego pago — setup BM, GTM, scripts criativos, plano tático Meta+Google | `squads/pools/traffic-launch/` |
| **traffic-audit** | Auditoria forense de contas Meta+Google — diagnóstico de baixo desempenho, wasted spend | `squads/pools/traffic-audit/` |
| **traffic-analytics** | Mensuração de tráfego — kill/scale/new-wave decisions com atribuição honesta (last-click vs CRM real) | `squads/pools/traffic-analytics/` |
| traffic-masters-pool | Pool compartilhado de agentes de tráfego (chief, google, meta, criativo, pixel, analista, fiscal) | `squads/pools/traffic-masters-pool/` |

## ✍️ Marketing & Conteúdo — fluxo padrão

Quando o pedido for criar/editar conteúdo, copy, post, email, blog, ou estratégia de marketing, este é o **fluxo obrigatório**:

```
1. Identificar plataforma/formato       (Instagram? Email? Blog?)
2. Carregar best-practice da plataforma (instagram-feed.md, email-sales.md, etc.)
3. Invocar skill / pool especialista    (marketing-expert, copy-squad-pool)
4. Produzir draft                        (seguindo best-practice)
5. Passe da skill humanizer (PT-BR)     (OBRIGATÓRIO antes de entregar)
6. Publicar (se aplicável)               (blotato, instagram-publisher, resend)
```

**Especialistas combinados na skill `marketing-expert`** (8 personas):
- 🧭 Estrategista Digital (planos 90d, OKRs)
- ✍️ Copywriter (AIDA, PAS, PASTOR, 4Ps, FAB)
- 📱 Social Media Manager (calendário editorial, mix por plataforma)
- 💼 Social Seller (DM, abordagem TRUST, objeções)
- 🚀 Especialista em Lançamentos (CPL, carrinho, sequência email)
- 📈 Growth Marketing (AARRR, ICE, CAC/LTV)
- 🎨 Branding (arquétipos, posicionamento, voz)
- 👤 Marca Pessoal (4 pilares, escada de valor)

**Pools de agentes** (especialistas separados, em `OpenSquad-Framework/squads/`):
- `copy-squad-pool/` — copywriters por nicho
- `brand-pool/` — branding
- `storytelling-pool/` — narrativa
- `design-pool/` — visual

**Pipeline obrigatório PT-BR**: produção → revisão → **`humanizer` no final** (sempre, sem exceção, para evitar texto com cara de IA).

## Best-Practices disponíveis (`_opensquad/core/best-practices/`)

Lista completa em `_catalog.yaml`. Destaque para uso recorrente:

- `secure-coding` — review de código com cabeça defensiva (NOVO 2026-04-24)
- `copywriting` — copy persuasivo
- `researching` — pesquisa estruturada
- `review` — review de conteúdo
- `image-design` — design de imagens
- `technical-writing` — long-form
- `data-analysis` — interpretação de métricas
- + best-practices por plataforma (Instagram, LinkedIn, Twitter, YouTube, blog, email, WhatsApp)

## Referências cruzadas

- Hierarquia formal: `Registry.yaml`
- Protocolo ODP: `.claude/rules/00-protocolo-orquestracao.md` (espelhado em `.cursor/` e `.agents/`)
- Convenção cross-IDE: `.claude/rules/11-sincronizacao-cross-ide.md`
- Aprendizado contínuo: `.learnings/`
