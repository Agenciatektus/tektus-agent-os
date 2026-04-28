# Changelog

All notable changes to Tektus Agent OS will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [Unreleased] — Paid Traffic 2026 specialization + Meta Ads analysis layer

### Added (Meta Ads Analyzer — 2026-04-28)

- **New skill `meta-ads-analyzer`** (Tektus original `skills/meta-ads-analyzer/`, mirrored to all 3 IDE adapters):
  - Compliance terminology rules (Meta-mandatory): "Accounts Center accounts" instead of "people/users", "Clicks (all)" / "Link clicks" instead of "clicks", exact standardized display names with no `Total`/`Overall`/`Average` prefixes
  - Data integrity (currency, partial dates, scope account vs asset, "N/A" for null/cross-objective aggregations, never fabricate data)
  - Workflow rules (campaign-level for CBO, ad-set-level for ABO to avoid Breakdown Effect; marginal-cost reasoning over averages)
  - Policy routing (never interpret Meta policies — always redirect to official URL via MCP tool)
  - Provider-agnostic (works with Manus AI, n8n, Coolify-deployed MCP, custom)
- **ODP rule** (`core/rules/00-orchestration-protocol.md`): 3 new triggers in "🚀 Tráfego Pago 2026" section (analysis/diagnosis, B2B reporting, Meta policy questions) — propagated to all 3 adapters via sync-ide.js
- **Hook `odp-reminder.js`**: catalog updated with `meta-ads-analyzer (compliance + diagnóstico)`

### Counts (Meta Ads Analyzer addition)

- Skills: 35 → **36** (Tektus original 17 → 18)
- Best-practices: 31 (unchanged)
- Workflows: 13 (unchanged — analysis/diagnosis fits within W12/W13 specialization layer)

### Attribution

- `meta-ads-analyzer` — adapted from [Manus AI](https://manus.im/) `meta-ads-analyzer` skill (compliance terminology + data integrity rules). Tektus added: provider-agnostic framing, cross-references to Tektus Agent OS BPs, PT-BR adaptation, decision table matching skill vs BP usage.

---

## [Unreleased] — Paid Traffic 2026 specialization

### Added

- **3 new best-practices** dated `last_updated: 2026-04-27`:
  - `meta-ads-2026.md` — Andromeda · Lattice · Muse Spark (3-1-Many model, CBO + Advantage+ Audience, 7-day learning rule, EMQ + Event ID)
  - `creative-direction-meta-2026.md` — Hook Rate / Hold Rate / Thumbstop benchmarks, VEO, Trope Stacking, OCR ≤ 20%, Reels-first
  - `google-ads-2026.md` — Power Pack (Demand Gen + AI Max + PMax), AI Overviews impact, ALF + UCP agentic commerce, Enhanced Conversions Unified (deadline 18/08/2026)
- **`marketing-expert` skill bundled** (was previously listed as external) with 9 personas, including the new "Tráfego Pago 2026 Meta+Google" persona that synthesizes the 3 BPs above.
- **Workflow W13** in `docs/MAP.md` — paid-traffic platform-specific 2026 (Meta era Andromeda + Google era Gemini 3) explaining how W12 (multi-channel framework) composes with the platform-specific BPs.

### Changed

- **3 best-practices bumped 1.0.0 → 1.1.0** with `last_updated: 2026-04-27` and "2026 Refinements" sections cross-referencing the new platform-specific BPs:
  - `paid-launch.md` — links to all 3 platform-specific BPs as the "specialization layer"
  - `pixel-setup.md` — Event ID + EMQ ≥ 8 + Enhanced Conversions API Unified
  - `ad-creative.md` — Hook Rate / Hold Rate / Thumbstop benchmarks + Trope Stacking + VEO
- **`core/best-practices/_catalog.yaml`** — 3 new entries + bump notes on 3 existing.
- **`core/rules/00-orchestration-protocol.md`** — adds "🚀 Tráfego Pago 2026" sub-section with platform-specific decision table; `marketing-expert` moved from "external" to "bundled" in the Skills tier table; rule synced to all 3 IDE adapters.
- **`adapters/claude-code/.claude/hooks/odp-reminder.js`** — references `marketing-expert (9 personas, inc. Tráfego Pago 2026)`.
- **`scripts/validate-skills.js`** — `VALID_TYPES` extended with `orchestrator` and `api-wrapper` (already in use by carousel-creator, meta-ads-api, google-ads-api).

### Security

- **Sanitize patterns expanded** in `.sanitize-patterns.yaml` per the canonical regex sweep template (incident-recovery best-practice from internal LRN):
  - 14 client/product names + slugs + internal Tektus systems
  - 5 person names (operators + client owners)
  - 2 production IPs
  - 4 internal URL patterns
- **Redacted leak in `AUDIT-FASE-1.md`** line 29 (was leaking 3 client slugs in `Initial commit` `fe4b57c` — visible on public repo HEAD until next squash + force-push via `extract-to-public.sh`).

### Counts

- Skills: 30 → **35**
- Best-practices: 28 → **31**
- Catalog entries: 27 → **30**
- Workflows: 12 → **13**

### References

- Mono privado LRNs: `LRN-20260427-001` (Advantage+ Shopping vs Audience), `LRN-20260427-002` (Meta Ads BPs creation), `LRN-20260427-003` (Google Ads + 9th persona)

## [0.1.0] — 2026-04-26

First public release. Extracted from the Tektus internal mono after running for ~6 months in production.

### Added

- **Core**:
  - 5 master rules (`00-orchestration-protocol`, `10-skill-vetting`, `11-cross-ide-sync`, `12-cyber-security-squad`, `13-continuous-learning`)
  - 18 best-practices (copywriting, secure-coding, social platforms, email, blog, technical-writing, data-analysis, strategist, image-design, researching, review)
- **Skills (27)**:
  - Tektus original: humanizer, marketing-expert, ui-ux-pro-max, template-designer, image-creator, image-fetcher, image-ai-generator, instagram-publisher, apify, blotato, canva, resend, opensquad-skill-creator, opensquad-agent-creator
  - Vetted externals: WordPress (×3), Supabase (×2), n8n (×7), Google Workspace (×7), Stripe (×2), Anthropic (×3), Callstack github
  - Meta-skills: skill-vetter, self-improving-agent
- **Squads (38)**:
  - 6 C-Level (CEO, CTO, CMO, CGO, COO, CDO)
  - 5 Cyber-Security Blue Team agents
  - 32 reusable pools (brand, content, copy, design, dev, sales, traffic, …)
- **Adapters** for Claude Code, Cursor, and Antigravity/Gemini with rule mirrors
- **ODP** (Orchestration Discovery Protocol) — declarative skill/squad/best-practice selection
- **Cross-IDE sync** — same rules across 3 IDEs in same commit
- `.learnings/` template for institutional memory

### Security

- Pre-publication audit (`AUDIT-FASE-1.md`): 7 scans for secrets, connection strings, internal IPs, PII — zero leaks
- Skill vetting protocol mandatory for any external skill (rule 10)

### Known limitations

- `tektus-onboarding` skill + first-run wizard: planned for 0.2.0
- Token economy pillar (Context Lens integration): planned for 0.2.0
- Install scripts: stub only — `0.2.0` will ship `install.js`, `sync-ide.js`, `validate-skills.js`
- WordPress agent-skills license is unspecified upstream — bundled with disclaimer; consult upstream before redistribution

## [Unreleased]

- Onboarding wizard with 6 profile templates (agency, solo-dev, saas, consultant, learner, contributor)
- Context Lens integration as first-class pillar
- CI workflow (gitleaks + skill validator)
- Per-IDE install scripts
