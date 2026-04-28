# 🚀 First-Run Onboarding (Rule 14)

When an agent operating under Tektus Agent OS receives the **first message** in a project, it must check whether the user has been onboarded. If not, it must invoke the `tektus-onboarding` skill **before** doing anything else.

## Detection

A `UserPromptSubmit` hook (`adapters/claude-code/.claude/hooks/onboarding-check.js` and equivalents for Cursor/Antigravity) checks for the existence of `.tektus/profile.yaml` at the project root.

If absent **and** `.tektus/onboarding-skipped` is also absent, the hook injects this instruction into context:

> *"Onboarding pending. Before doing anything else, invoke the `tektus-onboarding` skill via the Skill tool. Do not answer the user's actual prompt yet."*

## Agent behavior

On receiving the injected instruction:
1. Acknowledge the user's actual prompt briefly (*"Bem-vindo ao Tektus Agent OS — antes de atender seu pedido, vou rodar um onboarding rápido (3 blocos, ~3 min)."*)
2. Invoke `tektus-onboarding` skill
3. Run the 3-block interview
4. Save profile to `.tektus/profile.yaml`
5. Apply adaptations (language, squads, skills)
6. **Then** answer the user's original prompt

## Skip / re-run

- User can skip: *"skip onboarding"* → write `.tektus/onboarding-skipped` (empty file) and never trigger again unless the user runs `/tektus reonboard`
- User can re-run: `/tektus reonboard` → invoke skill regardless of profile presence

## Profile file location

```
<project-root>/
└── .tektus/
    ├── profile.yaml              # gitignored by default
    ├── onboarding-completed-at   # epoch timestamp
    └── onboarding-skipped        # empty marker, only if user opted out
```

`.tektus/` is added to `.gitignore` automatically on first run.

## Why this is a rule

If the agent forgets to onboard, every subsequent reply is generic — no language preference applied, no squad pre-loaded, no PT-BR `humanizer` chain. The whole adaptive layer of Tektus Agent OS depends on the profile existing. Making this a rule with a hook ensures it can't be bypassed by accident.

## Sync

Mirrored at:
- `adapters/claude-code/.claude/rules/14-first-run-onboarding.md`
- `adapters/cursor/.cursor/rules/14-first-run-onboarding.mdc`
- `adapters/antigravity/.agents/rules/14-first-run-onboarding.md`
