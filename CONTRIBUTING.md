# Contributing to Tektus Agent OS

Thanks for thinking about contributing! This project is opinionated and battle-tested in a real agency, so PRs need to fit the architecture before being merged.

## Before you open a PR

1. **Read the architecture**: [docs/architecture.md](docs/architecture.md). The mental model (skills < squads < best-practices, ODP, cross-IDE parity) is non-negotiable.
2. **Check existing skills/squads**: don't duplicate what's already there. Search [squads/_catalog.md](squads/_catalog.md) and [skills/](skills/).
3. **Issue first, PR second** for anything beyond a typo. We may have context that saves you work.

## Types of contributions

### Adding a new skill

If the skill is **already public elsewhere** (LobeHub, GitHub, etc.):

1. Run it through `skills/openclaw-skills-skill-vetter/SKILL.md` (rule 10). This is **mandatory** — we will not merge unvetted external skills.
2. Open a PR with:
   - The vetting report in the PR description
   - The skill in `skills/<name>/`
   - Mirrors in all 3 adapters (`adapters/{claude-code,cursor,antigravity}/.../skills/<name>/`)
   - An entry in [docs/credits.md](docs/credits.md) with upstream license

If the skill is **brand new**:

1. Use `skills/opensquad-skill-creator/SKILL.md` to scaffold it.
2. Add evals (real test prompts) per the skill creator guide.
3. Open a PR following the same checklist above.

### Adding a new squad

1. Use `skills/opensquad-agent-creator/SKILL.md`.
2. Place under `squads/<category>/<squad-name>/`.
3. Add an entry to `squads/_catalog.md` and `squads/_registry.yaml`.
4. Each agent must declare which best-practices and skills it uses.

### Adding a new best-practice

1. File goes in `core/best-practices/<id>.md` with frontmatter (`id`, `name`, `whenToUse`, `version`).
2. Update `core/best-practices/_catalog.yaml`.
3. Follow the structure: Core Principles → Techniques → Quality Criteria → Output Examples → Anti-Patterns → Vocabulary.
4. Minimum 200 lines. See existing best-practices as templates.

### Updating rules

Rules in `core/rules/` are master copies. **Always update all 3 adapters in the same commit** (`adapters/claude-code/`, `adapters/cursor/`, `adapters/antigravity/`). The `scripts/sync-ide.js` script can help.

### Bug fixes / typos / docs

PR away. Conventional commits format please:
- `fix(skill/<name>): …`
- `docs: …`
- `feat(squad/<name>): …`

## Commit format

[Conventional Commits](https://www.conventionalcommits.org/) — enforced (eventually) via CI.

## Code of conduct

Be kind. Be specific. Cite sources. Don't ship anything that requires a credential without `.env.example`.

## Security

If you find a security issue, **don't open a public issue**. Email security@tektus.com.br.

## Questions

Open a Discussion. We try to respond within 48h.
