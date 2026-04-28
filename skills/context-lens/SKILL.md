---
name: context-lens
description: Wrapper and decision guide for the Context Lens MCP — semantic indexing of a codebase that lets the agent retrieve relevant snippets without re-reading large files. Use when starting any non-trivial task in a repo with > 200 files; falls back to Glob/Grep when Lens is unavailable.
type: prompt
version: 1.0.0
---

# Context Lens — semantic codebase index

Context Lens is the **first tier** of the Token Economy protocol (see [`core/rules/02-token-economy.md`](../../core/rules/02-token-economy.md)). It's an MCP server that indexes your repo and returns ranked, relevant snippets for natural-language queries.

In repos > 200 files, Lens-first usage cuts ~80% of redundant token usage compared to naive `Read` cycles.

## When to use

- Starting any task in a repo larger than ~200 source files
- Looking for "where is X handled?" before opening files
- Trying to understand a feature that spans multiple modules
- Onboarding to a new codebase

## When NOT to use

- Repos < 50 files: `Glob` + `Grep` is faster and free
- You already know the exact path: just `Read` it
- The query is about file *names* or *structure*: use `Glob`

## Decision table

| Goal | Tool | Why |
|---|---|---|
| "Find by meaning" — *"the auth flow"* | `lens_context` | Semantic match across files |
| "Find by name" — *"all `*.test.ts`"* | `Glob` | Pattern match on filenames |
| "Find by string" — *"every call to `getUserById`"* | `Grep` | Literal substring match |
| "I know the file, need full content" | `Read` | Direct |
| "I know the file, need lines 200-280" | `Read` with `offset` + `limit` | Direct |

## Setup

### 1. Install Context Lens MCP

Recommended: official Lens MCP (or any compatible semantic indexer).

```bash
# In your IDE config (Claude Code .mcp.json or equivalent)
{
  "mcpServers": {
    "lens": {
      "command": "npx",
      "args": ["-y", "@context-lens/mcp"]
    }
  }
}
```

### 2. Index your repo

```bash
lens index .
```

Run once. Re-index after large refactors.

### 3. Watch mode (optional)

```bash
lens watch .
```

Re-indexes incrementally on file changes. Recommended for active projects.

## Usage in agent prompts

Per ODP, declare the source of context:

```
Para esta tarefa: skill X + best-practice Y.
Fonte de contexto: lens_context (5 results) → 1 Read targeted.
```

Then:

```
lens_context(query: "JWT validation in auth middleware")
```

Lens returns ranked snippets like:

```
1. src/auth/middleware.ts:42-58 (score 0.91)
2. src/auth/jwt-utils.ts:12-30 (score 0.84)
3. tests/auth/middleware.test.ts:101-120 (score 0.72)
```

You read what's relevant — usually 1-2 of the top 3.

## Fallback when Lens isn't available

If Lens isn't configured (or the user opts out during onboarding), fall back to Tier 3 of Token Economy:

1. `Glob` likely paths (`**/auth/**/*.ts`)
2. `Grep` for the symbol (`pattern: "validateJWT"`, `output_mode: "content"`)
3. `Read` only what you found

State this in your tool declaration: *"Fonte de contexto: glob + grep targeted (Lens não disponível)."*

## Anti-patterns

- ❌ Calling `lens_context` then immediately `Read`-ing the *whole file* anyway — the snippet usually has what you need
- ❌ Calling `lens_context` 5 times with similar queries — refine the query or accept top results
- ❌ Indexing `node_modules` / `dist` / `.next` — exclude in `lens.config.json`
- ❌ Using Lens for trivial lookups like *"open package.json"* — just `Read` it

## Integration with onboarding

The `tektus-onboarding` skill asks: *"Quer ativar o Context Lens? (recomendado para repos > 200 arquivos)"*. If yes, it walks the user through install + initial index.

Profile entry:
```yaml
token_economy:
  lens_enabled: true
  workspace_state_enabled: true
```

## Why it pays off

A 100-turn session that uses Lens-first averages ~10 KB of context per turn instead of ~50 KB. At Claude Opus pricing (Apr 2026), that's roughly the difference between a $5 session and a $30 session — and dramatically delays rate limits in autonomous mode.
