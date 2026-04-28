#!/usr/bin/env node
/**
 * Tektus Agent OS — ODP Reminder Hook (UserPromptSubmit)
 *
 * Injects a compact reminder of the Orchestration Discovery Protocol (ODP) +
 * skill/squad/best-practice catalog on EVERY user prompt.
 *
 * Goal: force the orchestrator to ACTIVATE on every interaction. Every reply
 * starts with a DECLARATION of which tools/squads will be used and why.
 *
 * See: core/rules/00-orchestration-protocol.md
 * Hooks docs: https://docs.claude.com/en/docs/claude-code/hooks
 *
 * To enable, register this in .claude/settings.local.json:
 *   { "hooks": { "UserPromptSubmit": [
 *     { "command": "node .claude/hooks/odp-reminder.js" }
 *   ] } }
 */

const reminder = `
[ODP — Orchestration Discovery Protocol — Tektus Agent OS]

Before answering, declare explicitly which tools you will use:

🔧 SKILLS — see skills/ for full list (30+):
  Tektus original: marketing-expert (9 personas, inc. Tráfego Pago 2026) | humanizer (PT-BR final pass) | meta-ads-analyzer (compliance + diagnóstico) |
                   ui-ux-pro-max | template-designer |
                   image-{creator,fetcher,ai-generator} | instagram-publisher |
                   apify | blotato | canva | resend |
                   tektus-onboarding | workspace-state | context-lens
  Vetted external: wp-{performance,plugin-development,rest-api} |
                   supabase{,-postgres-best-practices} |
                   n8n-{code-javascript,code-python,expression-syntax,
                        mcp-tools-expert,node-configuration,validation-expert,
                        workflow-patterns} |
                   gws-{shared,drive,sheets,gmail,calendar,docs,forms} |
                   stripe-best-practices | upgrade-stripe |
                   mcp-builder | canvas-design | web-artifacts-builder | github
  Meta: openclaw-skills-skill-vetter | openclaw-skills-self-improving-agent |
        opensquad-{skill,agent}-creator

👥 SQUADS — see squads/_catalog.md:
  • C-Level (squads/c-level/): ceo, cto, cmo, cgo, coo, cdo
  • Cyber-Security Blue Team (squads/internal/cyber-security/):
    @ciso, @secure-coding-reviewer, @devsecops-engineer,
    @infra-security-monitor, @incident-responder
  • Pools (squads/pools/, 32 squads): brand-{creation,narrative,pool,rebrand} |
    content-{calendar,factory-pool,production,publish} |
    copy-{project,review,squad-pool} | cyber-{incident-response,pentest,pool} |
    design-{pool,system-creation} | dev-{pool,feature-design} |
    sales-{sprint,lead-pipeline,ops-pool} |
    traffic-{audit,launch,masters-pool} |
    + app-kickoff, crm-setup, mapeamento-processos, story-development,
      storytelling-pool, ui-revamp, vibe-sprint, wp-automation

📚 BEST-PRACTICES — see core/best-practices/_catalog.yaml (24):
  Discipline: secure-coding | copywriting | researching | review |
              image-design | technical-writing | data-analysis | strategist |
              token-economy
  Per platform: instagram-{feed,reels,stories} | linkedin-{post,article} |
                twitter-{post,thread} | youtube-{script,shorts} |
                email-{newsletter,sales} | blog-{post,seo} | whatsapp-broadcast

🛡️ MANDATORY TRIGGERS (from core/rules/00-orchestration-protocol.md):
  Cross-cutting:
  • Code / infra / auth / payments → invoke Cyber-Security squad (rule 12)
  • UI/UX → ui-ux-pro-max + 21st MCP (if available)
  • PT-BR content → humanizer skill on the final pass
  • Installing new skill → skill-vetter first (rule 10)
  • Error / correction / new pattern → log to .learnings/ (rule 13)
  • First message in a project → tektus-onboarding skill (rule 14)
  • Any non-trivial task → declare context source per rule 02 (token-economy)

  Stack-specific (use the skill, don't reimplement):
  • WordPress → wp-{performance,plugin-development,rest-api}
  • Supabase → supabase | supabase-postgres-best-practices
  • Stripe / payments → stripe-best-practices | upgrade-stripe
  • n8n workflows → n8n-{workflow-patterns,code-javascript,code-python,
                     expression-syntax,node-configuration,validation-expert,
                     mcp-tools-expert}
  • Google Workspace → gws-{shared,sheets,docs,drive,gmail,calendar,forms}
  • MCP server → mcp-builder
  • GitHub PRs / gh CLI → github
  • Image render HTML→PNG → image-creator
  • Image search / screenshot → image-fetcher
  • Image AI generation → image-ai-generator
  • Instagram carousel publish → instagram-publisher
  • Multi-platform publish → blotato
  • Canva designs → canva
  • Web scraping → apify
  • Email transacional / marketing → resend
  • Posters / canvas art (.png/.pdf) → canvas-design
  • Complex HTML artifact (React+shadcn) → web-artifacts-builder
  • Token economy / large repo → context-lens (rule 02)
  • Cross-session memory → workspace-state (/state read|update|diff)
  • Create new skill → opensquad-skill-creator
  • Create new best-practice → opensquad-agent-creator

📋 DECLARATION FORMAT (at the START of your reply):
  "For this task I will use: [skill X] + [agent @Y] + [best-practice Z].
   Context source: lens (N results) + WORKSPACE_STATE.md + targeted Read.
   [Reason: why these tools]"

Details: core/rules/00-orchestration-protocol.md
`;

process.stdout.write(reminder);
process.exit(0);
