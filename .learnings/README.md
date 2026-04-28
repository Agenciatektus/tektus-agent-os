# `.learnings/` — Institutional Memory

Every Tektus Agent OS project keeps a `.learnings/` folder at the root, populated by agents (and humans) over time.

It is **read at the start of major tasks** and **updated whenever** the agent encounters: an unexpected failure, a user correction, a feature request, or a better approach to a recurring task.

Without this folder, every conversation starts from zero. With it, the system gets smarter every week.

See [`core/rules/13-continuous-learning.md`](../core/rules/13-continuous-learning.md) for the full protocol.

## Files

| File | Purpose |
|---|---|
| [`LEARNINGS.md`](LEARNINGS.md) | Corrections, knowledge gaps, best-practices discovered, security decisions |
| [`ERRORS.md`](ERRORS.md) | Commands/operations that failed unexpectedly |
| [`FEATURE_REQUESTS.md`](FEATURE_REQUESTS.md) | Capabilities the user asked for that don't exist yet |

## Entry format

Every entry uses a structured ID (`LRN-YYYYMMDD-XXX` for learnings, `ERR-…`, `FR-…`):

```markdown
## [LRN-20260426-001] correction

**Logged**: 2026-04-26T15:00:00-03:00
**Priority**: high
**Status**: resolved
**Area**: security

### Summary
One-line of what was learned.

### Details
Full context: what happened, what was wrong, what's correct now.

### Suggested Action
Specific fix or improvement.

### Metadata
- Source: conversation | error | user_feedback
- Related Files: path/to/file.ext
- Tags: tag1, tag2
- See Also: LRN-XXX (if related)

---
```

## When the agent reads this

Per rule 13, the agent **must** review `LEARNINGS.md` and `ERRORS.md` before:
- Major refactors
- Touching files mentioned in past corrections
- Starting a new feature in a domain that's been corrected before

## When the agent updates this

Triggers (per rule 13):
- A command failed unexpectedly → `ERRORS.md` (`ERR-YYYYMMDD-XXX`)
- User said "no, that's wrong" / "actually…" → `LEARNINGS.md` (category: `correction`)
- User requested a capability that doesn't exist → `FEATURE_REQUESTS.md` (`FR-…`)
- API/tool integration failed → `ERRORS.md` + integration details
- Better approach discovered for recurring task → `LEARNINGS.md` (category: `best_practice`)
- Security decision (CISO) → `LEARNINGS.md` (category: `security_decision`)

## Promotion to CLAUDE.md / docs

Learnings with **broad applicability** (not session-specific) should be promoted to:
- `CLAUDE.md` at project root (everyone needs to know)
- A new best-practice in `core/best-practices/` (when it becomes a pattern)

This file (`.learnings/`) is the **scratch pad**; promoted content moves to durable docs.

## Privacy

`.learnings/` may contain references to internal incidents, client names, vendor names. **Be cautious before pushing this folder publicly**. Most teams gitignore it.

For Tektus Agent OS open-source contributions: only ship `.learnings/` template files (this README + empty starters), never your actual logs.
