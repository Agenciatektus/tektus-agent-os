# 🧠 Token Economy & Working Memory (Lens-First Protocol)

One of the cheapest and most-overlooked levers in agentic coding is **what the agent loads into context**. A naive setup re-reads the same large files every conversation. A well-tuned setup uses an index, a memory file, and targeted reads — cutting token usage by ~80% in repos over 200 files.

Tektus Agent OS makes this a **first-class pillar**.

## The 3-tier protocol

Every agent operating under this OS follows this hierarchy when seeking context:

### Tier 1 — Lens-first (semantic index)

If a Context Lens MCP server is configured (recommended for repos > 200 files), **always call `lens_context` before any broader read**.

```
lens_context(query: "where is the auth middleware that handles JWT?")
→ returns ranked file:line snippets
```

The Lens returns the relevant ~10 KB of context. You decide if you need to `Read` any specific file in full.

### Tier 2 — Workspace State (persistent memory)

For state that doesn't live in code (current task, decisions, conventions, who's working on what), read `WORKSPACE_STATE.md` at the project root. The `workspace-state` skill keeps it up-to-date.

```
Read WORKSPACE_STATE.md  → ~2 KB of "what's going on right now"
```

This is the bridge between sessions. Without it, every conversation starts from zero.

### Tier 3 — Targeted Glob/Grep, then Read

If Tiers 1-2 don't suffice:
- `Glob` for filename patterns
- `Grep` for code patterns (with `-A`, `-B`, `-n` flags)
- `Read` only the file ranges you actually need (`offset` + `limit` for large files)

Avoid:
- `Read` on files > 1000 lines without `offset`/`limit`
- Recursive `find` / `ls -R` on large trees
- Reading `node_modules`, `dist/`, `build/`, generated files
- Reading the same file 3+ times in one session (use the result you already have)

## Declaration

ODP requires the agent to declare the **source of context** in its tool declaration:

```
Para esta tarefa: skill X + best-practice Y.
Fonte de contexto: lens (3 results) + WORKSPACE_STATE.md + 1 targeted Read.
```

This makes context cost visible and auditable.

## When to update WORKSPACE_STATE.md

After **any** of these:
- Started a new task / phase / feature
- Made a non-obvious architectural decision
- Established a new convention
- Resolved a tricky bug whose fix wouldn't be obvious from the diff

Use the `workspace-state` skill: `/state update`.

## Anti-patterns (don't do this)

| ❌ Don't | ✅ Do |
|---|---|
| `Read` `package-lock.json` | Skip — `Glob "*.lock"` and inspect names only if relevant |
| `Read` whole 5000-line file | `Read` with `offset` + `limit`, or `Grep` for the symbol you want |
| Re-read CLAUDE.md every turn | It's auto-loaded; reference what you remember |
| `find . -name "*"` | `Glob "**/*.ts"` |
| Read 3 files when a Lens query covers all 3 | One `lens_context` call |

## Cost reference (rough)

| Operation | Tokens (rough) |
|---|---|
| `lens_context` query | 3-8 KB return |
| `Read WORKSPACE_STATE.md` | 1-3 KB |
| `Glob` pattern | <0.5 KB |
| `Grep` with content output | 0.5-5 KB |
| `Read` 500-line TS file | ~6 KB |
| `Read` 5000-line lock file | ~60 KB ❌ |

## Why this matters

A 100-turn coding session that re-reads 5 large files per turn burns ~100 × 5 × 6 KB = **3 MB of redundant context**. Lens-first cuts that to ~0.5 MB. That's the difference between a $5 session and a $50 one — or, in autonomous mode, between hitting the rate limit at turn 30 and at turn 200.

See also: [`core/best-practices/token-economy.md`](../best-practices/token-economy.md) for patterns and anti-patterns with examples.

## Sync

This rule is mirrored at:
- `adapters/claude-code/.claude/rules/02-token-economy.md`
- `adapters/cursor/.cursor/rules/02-token-economy.mdc`
- `adapters/antigravity/.agents/rules/02-token-economy.md`
