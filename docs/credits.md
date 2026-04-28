# Credits

Tektus Agent OS bundles or references the following third-party works. Their original licenses apply.

## Bundled skills (in `skills/`)

| Skill(s) | Source | License | Notes |
|---|---|---|---|
| `wp-performance`, `wp-plugin-development`, `wp-rest-api` | [WordPress/agent-skills](https://github.com/WordPress/agent-skills) | NOASSERTION (presumed GPL-compatible) | Consult upstream before redistribution |
| `supabase`, `supabase-postgres-best-practices` | [supabase/agent-skills](https://github.com/supabase/agent-skills) | MIT |  |
| `n8n-code-javascript`, `n8n-code-python`, `n8n-expression-syntax`, `n8n-mcp-tools-expert`, `n8n-node-configuration`, `n8n-validation-expert`, `n8n-workflow-patterns` | [czlonkowski/n8n-skills](https://github.com/czlonkowski/n8n-skills) | MIT |  |
| `gws-shared`, `gws-drive`, `gws-sheets`, `gws-gmail`, `gws-calendar`, `gws-docs`, `gws-forms` | [googleworkspace/cli](https://github.com/googleworkspace/cli) | Apache-2.0 |  |
| `stripe-best-practices`, `upgrade-stripe` | [stripe/ai](https://github.com/stripe/ai) | MIT |  |
| `mcp-builder`, `canvas-design`, `web-artifacts-builder` | [anthropics/skills](https://github.com/anthropics/skills) | See each skill's `LICENSE.txt` |  |
| `github` | [callstackincubator/agent-skills](https://github.com/callstackincubator/agent-skills) | MIT |  |
| `openclaw-skills-skill-vetter`, `openclaw-skills-self-improving-agent` | [Openclaw / LobeHub Skills](https://lobehub.com/skills) | Per upstream | Meta-skills used by ODP |

## Skills heavily inspired by external work (in `skills/` as Tektus original adaptations)

| Skill | Inspired by | Notes |
|---|---|---|
| `humanizer` | [blader/humanizer](https://github.com/blader/humanizer) | PT-BR adaptation |
| `ui-ux-pro-max` | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Configured for shadcn/ui + Tailwind |

## Architectural inspirations

- **Anthropic Claude Code** — core skill loading model and frontmatter format
- **Cursor** — `.cursor/rules/*.mdc` convention
- **Antigravity / Google Gemini** — `.agents/rules/` mirror
- **OpenSquad framework** — squad / agent / pool taxonomy

## Tektus original work

Everything not listed above (rules in `core/rules/`, squads in `squads/`, best-practices in `core/best-practices/`, scripts in `scripts/`, this documentation) is **Tektus original** under [MIT](../LICENSE).

## Reporting an attribution issue

If you believe your work is bundled here without proper credit, open an issue or email security@tektus.com.br. We take attribution seriously.
