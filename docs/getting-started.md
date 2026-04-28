# Getting Started

This guide takes you from zero to running your first squad in ~10 minutes.

## Prerequisites

- Node.js 18+ (for install scripts and some skills)
- Git
- One of: **Claude Code**, **Cursor**, or **Antigravity / Gemini**

## 1. Install

### Option A — Auto (recommended once 0.2.0 ships)

```bash
npx @tektus/agent-os init
```

The wizard asks which IDE you use, your role, and your project type, then installs the right adapter and squads.

### Option B — Manual (works today on 0.1.0)

```bash
git clone https://github.com/Agenciatektus/tektus-agent-os.git
cd tektus-agent-os

# Copy core + skills + squads into your project
cp -r core skills squads /path/to/your-project/

# Pick your IDE adapter
cp -r adapters/claude-code/.claude /path/to/your-project/   # or cursor / antigravity
```

## 2. First conversation

Open your project in your IDE. Send any message — for example:

> *"Help me write a LinkedIn post about our Q2 product launch."*

The agent will (per ODP):
1. Declare: *"Para esta tarefa: skill `marketing-expert` + best-practice `linkedin-post` + squad `pools/copy-squad-pool`."*
2. Load the relevant best-practice
3. Draft + review + return

## 3. Try a Cyber-Security flow

Drop a sketchy code snippet:

> *"Review this auth middleware before I deploy:"*
> ```js
> app.post('/login', (req, res) => {
>   const user = db.query(`SELECT * FROM users WHERE email = '${req.body.email}'`);
>   res.json(user);
> });
> ```

ODP triggers the Blue Team squad (`@secure-coding-reviewer`). You'll get a structured review citing the `secure-coding` best-practice — SQL injection flagged, no auth-gate flagged, missing rate-limit flagged.

## 4. Run the onboarding wizard (0.2.0)

When `tektus-onboarding` ships, the first message in any project will trigger a 3-block interview:

- **Identity** — name, role, company, language
- **Purpose** — agency / dev / SaaS / consultant; main pain point; tech stack
- **Configuration** — IDEs, starter squads, telemetry opt-in

Profile saved to `.tektus/profile.yaml`. The agent then adapts: PT-BR triggers `humanizer` by default, "agency" pre-installs content + brand + copy squads, etc.

## 5. Next steps

- Read [docs/architecture.md](architecture.md) to internalize the mental model
- Browse [squads/_catalog.md](../squads/_catalog.md) to see what teams ship out of the box
- Read [docs/cross-ide-sync.md](cross-ide-sync.md) if you use multiple IDEs
- When you want to add a custom skill: [docs/creating-your-first-squad.md](creating-your-first-squad.md)

## Troubleshooting

**The agent isn't declaring tools at the top of replies.**
Check that the `UserPromptSubmit` hook is registered. In Claude Code: `cat .claude/settings.local.json`. Should reference `.claude/hooks/odp-reminder.js`.

**Skill not found / not appearing in `/skills` list.**
Re-run `node scripts/validate-skills.js` (when shipped). Most likely cause: invalid frontmatter in `SKILL.md`.

**Cursor doesn't see the rules.**
Cursor wants `.mdc` files, not `.md`. Check `adapters/cursor/.cursor/rules/` — extension should be `.mdc`.
