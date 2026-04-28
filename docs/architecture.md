# Architecture

## The mental model

Tektus Agent OS is built on **3 primitives** that compose:

```
   Skills (how)        Squads (who)        Best-Practices (what good looks like)
        \                  |                            /
         \                 |                           /
          ─────────────────────────────────────────────
                            ODP
              (Orchestration Discovery Protocol)
```

### Skills — narrow capabilities

A skill is a **how-to**. It teaches the agent to do one thing well: render an HTML to PNG (`image-creator`), publish to Instagram (`instagram-publisher`), strip AI-stink from PT-BR text (`humanizer`), audit WordPress performance (`wp-performance`).

Skills are **discovered** by the agent at runtime via the `Skill` tool — they live in context only when relevant.

### Squads — named teams

A squad is a **team of agents** with explicit hierarchy, roles, and an invocation protocol. Examples:

- `c-level/cto` — strategic technical decisions
- `internal/cyber-security/secure-coding-reviewer` — pre-deploy code review
- `pools/copy-squad-pool` — copywriter + reviewer + brand-voice expert

You can `@mention` an agent (e.g. `@Cassio_SecRev review this diff`) and ODP will route the request through that squad's protocol.

### Best-practices — opinionated playbooks

A best-practice is a **document explaining what excellent output looks like in a domain**. Includes Core Principles, Techniques, Quality Criteria, Output Examples, Anti-Patterns, and Vocabulary guidance.

Examples: `copywriting`, `secure-coding`, `instagram-feed`, `linkedin-article`, `blog-seo`.

The agent loads the relevant best-practice **before** producing output.

## ODP — Orchestration Discovery Protocol

Every meaningful prompt forces the agent to declare, **before acting**:

```
Para esta tarefa vou usar: [skill X] + [squad Y] + [best-practice Z].
[Motivo: por quê essas ferramentas]
```

Why? Because:
1. It surfaces wrong choices early (you catch the agent picking `humanizer` for an English text before it wastes a turn)
2. It builds shared vocabulary across IDEs and team members
3. It creates an audit trail

Implementation: a `UserPromptSubmit` hook in Claude Code injects a compact catalog. Same rule lives in `.cursor/rules/` and `.agents/rules/`.

See [`core/rules/00-orchestration-protocol.md`](../core/rules/00-orchestration-protocol.md).

## Cross-IDE parity

The Tektus team uses **Claude Code, Cursor, and Antigravity/Gemini** in parallel — different tools for different tasks. If a rule lives in only one IDE, agents drift apart between sessions.

Solution: master in `core/rules/` + mirrors in `adapters/{claude-code,cursor,antigravity}/`. Per [`core/rules/11-cross-ide-sync.md`](../core/rules/11-cross-ide-sync.md), any change to a rule must update all 3 in the same commit.

The script `scripts/sync-ide.js` (planned for 0.2.0) automates this.

## Skill vetting (rule 10)

External skills are a security risk: prompt injection, credential exfiltration, malicious scripts. Tektus Agent OS makes vetting **mandatory**:

1. WebFetch the skill's `SKILL.md` (read-only)
2. Apply 4-point checklist (source, code review, permission scope, risk classification)
3. Present `SKILL VETTING REPORT`
4. Human approval required for HIGH/EXTREME risk
5. Only then install + mirror

See [`core/rules/10-skill-vetting.md`](../core/rules/10-skill-vetting.md).

## Continuous learning (rule 13)

Every correction, error, feature request, and security decision goes into `.learnings/` with a structured ID (`LRN-YYYYMMDD-XXX`). Future sessions read this before major tasks. Without it, every conversation starts from zero.

See [`core/rules/13-continuous-learning.md`](../core/rules/13-continuous-learning.md).

## Cyber-Security squad — always-on

Any prompt involving code, infra, secrets, or payments **automatically** invokes the Blue Team squad:

- `@ciso` — strategic risk decisions
- `@secure-coding-reviewer` — pre-deploy code review
- `@devsecops-engineer` — CI/CD, secrets, dependencies
- `@infra-security-monitor` — VPS hardening, monitoring
- `@incident-responder` — incidents in progress

See [`core/rules/12-cyber-security-squad.md`](../core/rules/12-cyber-security-squad.md).

## Putting it together — example flow

User: *"Write an Instagram post in PT-BR for our Black Friday campaign."*

Agent declares (per ODP):
> Para esta tarefa: skill `marketing-expert` (Copywriter persona) + skill `humanizer` (passe final PT-BR) + best-practice `instagram-feed` + squad `pools/copy-squad-pool` para review.

Then:
1. Loads `core/best-practices/instagram-feed.md`
2. Drafts copy with `marketing-expert` (AIDA structure)
3. Runs `humanizer` to strip AI-stink
4. `pools/copy-squad-pool/copy-reviewer` reviews
5. Optionally calls `instagram-publisher` skill to schedule

If something goes wrong (user corrects), the correction is logged to `.learnings/LEARNINGS.md` so the next session won't repeat it.

That's the OS.
