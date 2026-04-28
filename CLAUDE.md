# Tektus Agent OS — Project Instructions for Claude Code

This project runs on **Tektus Agent OS** ([README.md](README.md)). Before doing anything, you operate under the rules below. They are non-negotiable.

## Master rules (always loaded)

These are the canonical rules in `core/rules/` (master). The `.claude/rules/` mirrors are kept in sync via `scripts/sync-ide.js`.

- [`core/rules/00-orchestration-protocol.md`](core/rules/00-orchestration-protocol.md) — **ODP**: declare which skill / squad / best-practice you'll use **at the top of every reply**. Triggered automatically by the `UserPromptSubmit` hook (`adapters/claude-code/.claude/hooks/odp-reminder.js`).
- [`core/rules/02-token-economy.md`](core/rules/02-token-economy.md) — Lens-first protocol; declare context source.
- [`core/rules/10-skill-vetting.md`](core/rules/10-skill-vetting.md) — never install an external skill without running it through `skill-vetter` first.
- [`core/rules/11-cross-ide-sync.md`](core/rules/11-cross-ide-sync.md) — any rule change must mirror to all 3 adapters in the same commit.
- [`core/rules/12-cyber-security-squad.md`](core/rules/12-cyber-security-squad.md) — code/infra/auth/payment work invokes the Cyber-Security Blue Team automatically.
- [`core/rules/13-continuous-learning.md`](core/rules/13-continuous-learning.md) — log corrections / errors / feature requests to `.learnings/`. Read `.learnings/LEARNINGS.md` and `.learnings/ERRORS.md` before major tasks.
- [`core/rules/14-first-run-onboarding.md`](core/rules/14-first-run-onboarding.md) — first message in a project triggers the `tektus-onboarding` skill if `.tektus/profile.yaml` is missing. Hook: `adapters/claude-code/.claude/hooks/onboarding-check.js`.

## How to start any session

1. Read `.tektus/profile.yaml` (if exists) — it tells you the user's role, language, stack, preferred squads
2. Read `WORKSPACE_STATE.md` (if exists) — current task, recent decisions, conventions
3. Read `.learnings/LEARNINGS.md` recent entries — avoid repeating past mistakes
4. **Then** address the user's prompt, with the ODP declaration at the top

## Default chains (applied per profile)

The `tektus-onboarding` skill saves a profile that determines defaults:
- Language `pt-br` → run `humanizer` skill on the final pass of any user-facing PT-BR text
- Use case `agency` → invoke pools `content-production`, `copy-squad-pool`, `brand-creation` for relevant tasks
- Stack includes `wordpress` → enable `wp-performance`, `wp-plugin-development`, `wp-rest-api`
- (See `skills/tektus-onboarding/profiles/*.yaml`)

## Inventory

- **Skills**: `skills/` (30+) — invoke via the Skill tool when the trigger matches
- **Squads**: `squads/c-level/`, `squads/internal/cyber-security/`, `squads/pools/` (35+) — invoke via @mention or by reading the agent file
- **Best-practices**: `core/best-practices/` (24) — load before producing output in that domain
- **Adapters**: `adapters/claude-code/` is what's active for you right now (mirrors of `core/rules/` and the hooks)

## When in doubt

- Search [`squads/_catalog.md`](squads/_catalog.md) for the right squad
- Read [`docs/architecture.md`](docs/architecture.md) for the mental model
- Use the `Skill` tool to discover skills (don't reimplement what already exists)
