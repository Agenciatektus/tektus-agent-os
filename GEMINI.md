# GEMINI.md — Antigravity / Google Gemini Agent Manager

This is the entry point for **Antigravity / Gemini**-based agents. Same content as [CLAUDE.md](CLAUDE.md) and [AGENTS.md](AGENTS.md) — Tektus Agent OS treats all 3 IDEs as first-class citizens.

→ **Read [AGENTS.md](AGENTS.md) for the full instructions.**

## Antigravity-specific notes

- Master rules mirror to `adapters/antigravity/.agents/rules/` (`.md` files)
- Skills mirror to `adapters/antigravity/.agents/skills/`
- The "Force de Trabalho Digital Tektus" doctrine ([adapters/antigravity/.agents/rules/08-tektus-digital-workforce.md](adapters/antigravity/.agents/rules/08-tektus-digital-workforce.md)) describes the human/agent collaboration model
- Antigravity-specific config considerations are documented in [adapters/antigravity/.agents/rules/05-antigravity-config.md](adapters/antigravity/.agents/rules/05-antigravity-config.md)

## After editing rules

```bash
node scripts/sync-ide.js
```

This propagates `core/rules/*.md` into the 3 adapters. Idempotent.
