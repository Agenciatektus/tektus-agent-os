# Token Economy — Why Tektus Agent OS uses ~80% fewer tokens

If you've ever burned through your Claude/Cursor budget faster than you expected, you've felt the cost of naive context loading. Most agentic setups re-read the same large files every turn. In a 100-turn session that re-reads 5 files of 6 KB each, you've burned **3 MB of redundant context** — for no incremental value.

Tektus Agent OS treats token economy as a first-class pillar.

## The 4-tier protocol

```
Tier 1: lens_context()       ← semantic index (cheap, broad)
Tier 2: WORKSPACE_STATE.md   ← persistent memory (cheap, focused)
Tier 3: Glob / Grep          ← targeted retrieval (cheap, specific)
Tier 4: Read with offset/limit ← surgical reads only
```

Skip a tier only when it's genuinely unavailable. Most "I need to understand X" questions are answered at Tier 1 in a single 8 KB query.

## Real measurements

In the Tektus internal mono (~13,000 files):

| Setup | Avg tokens / turn | 100-turn cost (Opus) |
|---|---|---|
| Vanilla CLAUDE.md only | ~50 KB | ~$30 |
| + Lens-first + state file | ~10 KB | ~$5 |

Same task. Same agent. Same quality. **6× cheaper.**

## What you give up

Honestly? Almost nothing. A tiny upfront cost: configure Lens (one command), seed `WORKSPACE_STATE.md` (the onboarding wizard does it for you), and train yourself to **declare context source in every reply** (ODP forces this).

## Why the rule lives in the protocol

If token economy were a "nice to have" docs page, it'd be ignored. So Tektus Agent OS makes it a **rule** (`core/rules/02-token-economy.md`) that ODP enforces. Every prompt declares its context source. The agent that doesn't declare gets corrected by the rule.

## Skills that implement this

- [`skills/context-lens/SKILL.md`](../skills/context-lens/SKILL.md) — wrapper for the Lens MCP, decision table for when to use it vs Glob/Grep
- [`skills/workspace-state/SKILL.md`](../skills/workspace-state/SKILL.md) — `/state read`, `/state update`, `/state diff` commands
- [`core/best-practices/token-economy.md`](../core/best-practices/token-economy.md) — Core Principles, Techniques, Quality Criteria, Anti-Patterns

## See also

- Rule: [`core/rules/02-token-economy.md`](../core/rules/02-token-economy.md)
- Architecture context: [docs/architecture.md](architecture.md)
