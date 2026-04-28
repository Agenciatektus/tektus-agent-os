---
id: token-economy
name: Token Economy & Working Memory
whenToUse: |
  Use whenever an agent is operating on a repo > 200 files, OR when a session
  is expected to be long-running (autonomous mode, multi-hour task), OR when
  the user has flagged cost / rate-limit concerns. NOT for: one-shot single-file
  edits in tiny repos → just Read directly.
version: 1.0.0
---

# Token Economy & Working Memory

The cheapest way to make an agent more effective is to **load less unnecessary context**. This best-practice codifies the patterns that keep agents fast, cheap, and focused — particularly in long sessions and large repos.

## Core Principles

### 1. Lens-first, then Workspace State, then targeted Glob/Grep, then Read

Every information need follows this hierarchy. Skip a tier only when the previous tier is genuinely unavailable. See [`core/rules/02-token-economy.md`](../rules/02-token-economy.md).

### 2. Read with surgical precision

Never `Read` a 5000-line file in full when you need lines 200-280. Use `offset` + `limit`. Never `Read` `package-lock.json`, `node_modules/*`, generated files, or build artifacts.

### 3. Don't re-fetch what you already have

If you `Read` `src/foo.ts:42-58` in turn 3, don't `Read` it again in turn 7. The agent has it. Reference your prior observation.

### 4. Persist decisions, not transcripts

`WORKSPACE_STATE.md` captures **decisions and conventions**, not full conversation logs. A 2 KB state file beats re-reading the same file three times across sessions.

### 5. Batch tool calls when independent

If you need `Read` on 3 unrelated files, issue all three in a single message (parallel). Don't serialize independent reads.

### 6. Declare context source in every reply

Per ODP: *"Fonte de contexto: lens (3) + state + 1 Read targeted."* Makes the cost visible and audit-able.

## Techniques & Frameworks

### The "Why am I reading this?" test

Before any `Read` call, ask:
- Do I need the whole file, or a specific symbol/section?
- Have I already read it this session?
- Is there a `lens_context` query that would replace it?

If you can't justify the full read in one sentence, downgrade to `Grep`/`Glob`/Lens.

### Window-budget thinking

A typical Claude Opus session has a soft "useful working window" of ~50-100 KB before quality degrades. If you've already loaded 80 KB, the next `Read` competes with what's already in context. **Compaction beats accumulation.**

### State file rotation

Archive `WORKSPACE_STATE.md` entries older than 90 days to `WORKSPACE_STATE.archive.md`. Keep the active file under 4 KB.

## Quality Criteria

A token-efficient agent session demonstrates:

- [ ] Every reply declares context source per ODP
- [ ] Average tokens per turn (excluding output) under ~10-15 KB after warmup
- [ ] No file is `Read` more than once per session
- [ ] No file > 1000 lines is `Read` in full unless absolutely required (and the requirement is stated)
- [ ] Generated files (`*.lock`, `dist/`, `node_modules/`) never appear in `Read` calls
- [ ] `WORKSPACE_STATE.md` is updated after non-trivial work

## Output Examples

### Example 1 — Good context source declaration

```
Para esta tarefa: skill `wp-performance` + best-practice `secure-coding` +
squad `internal/cyber-security/secure-coding-reviewer`.
Fonte de contexto: lens_context (3 results em src/wp/) + WORKSPACE_STATE.md
+ Read targeted skills/wp-performance/references/database.md.
Total estimado: ~8 KB.
```

### Example 2 — Anti-pattern with correction

❌ Bad:
```
Read package-lock.json (250 KB)
Read node_modules/typescript/lib/typescript.d.ts (1.2 MB)
Read src/index.ts (50 KB)
```

✅ Corrected:
```
Glob "src/**/*.ts" → identified 12 candidate files
lens_context "where is the main entry point initialized?" → src/index.ts:1-40
Read src/index.ts offset=1 limit=40 (1.2 KB)
```

## Anti-Patterns

### Never Do

1. **`Read` files > 1000 lines without `offset`/`limit`** — burns context with low value
2. **`Read` `*.lock`, `node_modules/*`, `dist/*`, `.next/*`, generated files** — almost never needed
3. **Re-fetch the same file 3+ times in one session** — your prior `Read` result is still in context
4. **Recursive `find /` or `ls -R` on large trees** — explodes output
5. **Serialize independent `Read`s** — batch them in a single message

### Always Do

1. **Call `lens_context` first** for "where/how is X handled" questions in repos > 200 files
2. **Use `offset` + `limit` on `Read`** for files > 500 lines
3. **Update `WORKSPACE_STATE.md`** after meaningful decisions/work
4. **Declare context source** in every ODP-bound reply

## Vocabulary Guidance

### Always Use
- "Lens-first protocol"
- "Workspace State"
- "Targeted Read" (with `offset`/`limit`)
- "Context source declaration"
- "Window budget"
- "Compaction beats accumulation"

### Never Use
- "Just read everything to be safe" — never. Be specific.
- "Let me re-read X" — if X was read this session, don't.
- "I'll grep recursively" — `Grep` is already recursive in this OS; just use it correctly with `glob` filter.

### Tone Rules
- Be explicit about cost. *"That would burn ~60 KB; let's Lens-first instead."*
- Don't apologize for being efficient. Token economy is professionalism, not corner-cutting.
