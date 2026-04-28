---
name: workspace-state
description: Maintain a living WORKSPACE_STATE.md at the project root that captures current task, decisions, conventions, and "who's doing what" — the bridge between agent sessions. Use when starting a session (read state), finishing a non-trivial task (update state), or onboarding a new agent/IDE to the project.
type: prompt
version: 1.0.0
---

# Workspace State — persistent working memory

`WORKSPACE_STATE.md` is the file every agent reads at session start and updates after meaningful work. Without it, each conversation starts from zero — the agent has no idea what was decided last week, what's in flight, or which conventions you've established.

## When to use

- **Session start**: read `WORKSPACE_STATE.md` before doing anything broad. It's the second tier of context (after Lens, before Glob/Grep).
- **After meaningful work**: update it with new decisions, completed tasks, new conventions.
- **Cross-IDE handoff**: when switching from Cursor to Claude Code mid-task, the state file carries you forward.

## Commands

### `/state read`
Read `WORKSPACE_STATE.md` at project root. If absent, prompt to create one.

### `/state update`
Open `WORKSPACE_STATE.md` and append/edit relevant sections based on conversation context. Use git-blame-style entries:

```markdown
## 2026-04-26 — the user
- Decided: switch auth from session cookies to JWT (mobile clients need stateless tokens)
- In flight: refactor `src/auth/middleware.ts` (PR #142)
- Convention: all new endpoints use `register_rest_route` v2 (per wp-rest-api skill)
```

### `/state diff`
Show what changed in `WORKSPACE_STATE.md` in the last N days (using git log).

## Template (creates this if file doesn't exist)

```markdown
# Workspace State

> Living memory for the project. Read at session start. Update after meaningful work.
>
> Format: dated entries by author. Newest at top.

## Active task
<one sentence on what we're working on RIGHT NOW>

## Recent decisions
<bullet list of architectural/product decisions with date>

## Conventions
<things we always do in this codebase that aren't obvious from reading it>

## Pending / Blocked
<stuff that's stuck and what's blocking it>

## People
<who's working on what>

---

## YYYY-MM-DD — Author
- Decided: ...
- In flight: ...
- Done: ...
- Convention: ...
```

## Auto-update via Stop hook (optional)

If you want the agent to update state automatically when it finishes a task, register a `Stop` hook:

```json
// .claude/settings.local.json
{
  "hooks": {
    "Stop": [{ "command": "node .claude/hooks/state-autosave.js" }]
  }
}
```

The hook reads the current conversation, extracts decisions/changes, and appends a draft entry to `WORKSPACE_STATE.md` for human review. Auto-save is **opt-in** — many teams prefer manual control.

## Anti-patterns

- **Don't dump conversation transcripts** into the state file — keep entries short and high-signal
- **Don't store secrets** (use `.env`)
- **Don't store anything that belongs in git history** — this file is for state that *isn't* in code
- **Don't let it grow unbounded** — archive entries older than 90 days to `WORKSPACE_STATE.archive.md`

## Integration with onboarding

The `tektus-onboarding` skill seeds an initial `WORKSPACE_STATE.md` based on the user's profile (project name, role, first task). This makes the file useful from minute one.

## Why this is part of Token Economy

Reading `WORKSPACE_STATE.md` (~2 KB) once per session can replace 5-10 file reads of "wait, what was the convention here again?". See [`core/rules/02-token-economy.md`](../../core/rules/02-token-economy.md).
