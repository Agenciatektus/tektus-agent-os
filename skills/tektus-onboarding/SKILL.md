---
name: tektus-onboarding
description: First-run interactive onboarding wizard for any project using Tektus Agent OS. Captures user context (identity, purpose, configuration) in a 3-block interview, persists to .tektus/profile.yaml, and adapts the OS (active language, suggested squads, default skills) based on the profile. Triggered automatically by the first-run hook when .tektus/profile.yaml is absent. Can be re-run via /tektus reonboard.
type: prompt
version: 1.0.0
---

# Tektus Onboarding — first-run wizard

When someone clones Tektus Agent OS and opens it in their IDE, this skill conducts a structured 3-block interview that captures who they are, what they want to do, and how they want their OS configured. The result is `.tektus/profile.yaml` — a single source of truth that ODP, default skill selection, and squad recommendations all read from.

## When to use

- **Automatic**: triggered by the `UserPromptSubmit` hook (`onboarding-check`) when `.tektus/profile.yaml` is missing
- **Manual**: user runs `/tektus reonboard` (e.g., switched to a new project, role changed)

## When NOT to use

- `.tektus/profile.yaml` already exists and is recent (< 90 days). Read it instead.
- User explicitly says "skip onboarding" — respect, set `.tektus/onboarding-skipped` flag, and don't trigger again

## Interview flow

Use `AskUserQuestion` (one Ask call per block, multiple questions per call). DO NOT ask all 9 questions in a single call — that's overwhelming. Three blocks, breathing room between.

### Block 1 — Identity (3 questions)

1. **Role** — single-select: Founder / Solo developer / Marketer / Agency / SaaS team / Consultant / Student / Other
2. **Company / project name** (free text, optional)
3. **Primary working language** — single-select: PT-BR / EN / ES / Other

### Block 2 — Purpose (3 questions)

4. **Primary use case** — single-select: Marketing agency operations / Solo dev productivity / SaaS internal tooling / Consulting / Learning / Open-source contribution
5. **Main pain to solve** — single-select: Content production at scale / Code review automation / Customer support / Growth/marketing / Security/compliance / Other
6. **Predominant tech stack** — multi-select: React / Next.js / Node.js / Python / Go / Rust / WordPress / Supabase / Stripe / n8n / no-code / Other

### Block 3 — Configuration (3 questions)

7. **IDEs in use** — multi-select: Claude Code / Cursor / Antigravity (Gemini) / Other
8. **Token Economy** — single-select: Enable Context Lens (recommended for repos > 200 files) / Skip for now
9. **Anonymous telemetry** — single-select: Yes, help improve the OS / No, keep my usage private (default: No)

## Persist profile

Write to `.tektus/profile.yaml` (create directory if absent):

```yaml
profile:
  version: 1
  onboarded_at: 2026-04-26T15:42:00Z
  identity:
    role: founder
    company: "Acme Marketing"
    language: pt-br
  purpose:
    use_case: agency
    main_pain: content_production
    stack: [wordpress, n8n, react]
  configuration:
    ides: [claude-code, cursor]
    token_economy:
      lens_enabled: true
      workspace_state_enabled: true
    telemetry: false
```

Also write timestamp to `.tektus/onboarding-completed-at` (epoch).

## Adapt the OS based on profile

After saving, immediately apply:

### By language
- `pt-br` → activate `humanizer` skill in default chain (final pass for any PT-BR text)
- `en` / `es` → don't trigger `humanizer` automatically

### By use case → suggest squads
- `agency` → `pools/content-production`, `pools/copy-squad-pool`, `pools/brand-creation`
- `solo-dev` → `internal/cyber-security`, `pools/dev-pool`, `pools/ui-revamp`
- `saas` → `internal/cyber-security`, `pools/dev-pool`, `pools/sales-sprint`, `c-level/cto`, `c-level/cmo`
- `consultant` → `c-level/ceo`, `pools/copy-project`, `pools/content-production`
- `learning` → `pools/dev-pool`, all c-level (for exposure)
- `open-source` → `pools/dev-pool`, `internal/cyber-security`, `pools/copy-review`

### By stack → activate skills
- includes `wordpress` → enable `wp-performance`, `wp-plugin-development`, `wp-rest-api` triggers
- includes `supabase` → enable `supabase`, `supabase-postgres-best-practices`
- includes `stripe` → enable `stripe-best-practices`
- includes `n8n` → enable n8n-* skills
- includes `react` / `nextjs` → enable `ui-ux-pro-max`

### By IDEs → ensure adapter installed
For each selected IDE, verify `adapters/{ide}/` is symlinked/copied into the user's project. If not, run install for that adapter.

### Token Economy
- If `lens_enabled` → walk user through `lens index .` setup
- If `workspace_state_enabled` → seed `WORKSPACE_STATE.md` with profile-derived initial entry

## Show 3 starter prompts (concrete to profile)

After setup, output exactly 3 example prompts the user can copy-paste based on their profile:

**For agency / pt-br / wordpress**:
```
1. "Faça uma auditoria de performance no Portal X (WordPress) e me dê um plano priorizado."
2. "Escreva um post de Instagram em PT-BR sobre nossa promoção de Black Friday."
3. "Revise este diff de plugin WP antes do deploy."
```

**For solo-dev / en / react+supabase**:
```
1. "Audit the auth middleware for security issues."
2. "Suggest a Supabase RLS policy for the orders table."
3. "Refactor this React component to use the latest shadcn/ui patterns."
```

(Customize for each profile combination.)

## Re-onboarding

`/tektus reonboard` rewrites the profile. Useful when:
- User switched to a different project / company
- Stack changed significantly
- User wants to adjust language or telemetry preference

## Privacy

- `.tektus/profile.yaml` is **gitignored by default** (added to `.gitignore` on first run)
- Telemetry, when opt-in, is anonymous and aggregated — only counts (e.g., "12 PT-BR agency users this month") with no PII
- Profile is local-only unless user explicitly shares it

## Failure modes

- User refuses Block 1 entirely → save `{role: anonymous}` and proceed minimal config
- User cancels mid-interview → save what was answered, mark `partial: true`, prompt to finish next session
- IDE doesn't support `AskUserQuestion` → fall back to free-text Q&A in conversation

## Implementation notes

This skill is invoked by the agent (it's a prompt-type skill, not a script). The actual `AskUserQuestion` calls are issued by the agent following this playbook. The hook `adapters/claude-code/.claude/hooks/onboarding-check.js` only **detects** the missing profile and tells the agent to invoke this skill; it doesn't run the wizard itself.
