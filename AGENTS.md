# AGENTS.md — generic agent instructions

Most modern AI coding assistants now read `AGENTS.md` (or `GEMINI.md` for Antigravity, `.cursorrules` for Cursor) at project root. This file is the IDE-agnostic version of [CLAUDE.md](CLAUDE.md).

## TL;DR for any agent

You are operating in a project that runs **Tektus Agent OS**. The full architecture is in [README.md](README.md) and [docs/architecture.md](docs/architecture.md). Before responding to a user prompt:

1. **Declare** which skill / squad / best-practice you will use, and why (per ODP — `core/rules/00-orchestration-protocol.md`)
2. **Check** `.tektus/profile.yaml` (user context), `WORKSPACE_STATE.md` (current task), `.learnings/LEARNINGS.md` (past corrections)
3. **Use** the Lens-first protocol when retrieving context (`core/rules/02-token-economy.md`)

If any of those rules are missing locally, this OS may not be fully installed — see [docs/getting-started.md](docs/getting-started.md).

## Per-IDE entry points

| IDE | File | Path |
|---|---|---|
| Claude Code | `CLAUDE.md` (root) + `.claude/rules/` + `.claude/hooks/` | `adapters/claude-code/.claude/` |
| Cursor | `.cursor/rules/*.mdc` (auto-loaded by extension) | `adapters/cursor/.cursor/` |
| Antigravity / Gemini | `GEMINI.md` (root) + `.agents/rules/` | `adapters/antigravity/.agents/` |
| Other (any) | This `AGENTS.md` + `core/rules/` | `core/` |

## The 7 master rules (canonical, in `core/rules/`)

- **00-orchestration-protocol** — declare tools at top of every reply (ODP)
- **02-token-economy** — Lens-first context retrieval, no redundant reads
- **10-skill-vetting** — never install external skills without vetting
- **11-cross-ide-sync** — rule changes mirror to all 3 adapters in one commit
- **12-cyber-security-squad** — code/infra/auth/payments invoke Blue Team
- **13-continuous-learning** — log to `.learnings/` after corrections / errors / new patterns
- **14-first-run-onboarding** — first message triggers onboarding wizard if profile missing

## Cross-IDE parity

Same rules. Same skills. Same squads. Different file locations. That's the whole point. Run `node scripts/sync-ide.js` after editing anything in `core/rules/` to propagate to all adapters.

## License

[MIT](LICENSE). Some bundled skills retain upstream licenses — see [docs/credits.md](docs/credits.md).
