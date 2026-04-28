---
description: "Convenção de sincronização de rules e skills entre Claude Code, Cursor e Antigravity/Gemini"
globs: "**/*"
alwaysApply: true
---

# 🔄 Sincronização Cross-IDE (Convenção)

A Tektus opera com 3 IDEs em paralelo: **Claude Code**, **Cursor**, **Antigravity/Gemini**. Skills, rules e MCPs DEVEM ter paridade nos 3 — caso contrário, agentes em IDEs diferentes operam com conhecimento inconsistente.

## Mapeamento de pastas

| Conteúdo | Claude Code | Cursor | Antigravity/Gemini |
|---|---|---|---|
| **Rules** | `.claude/rules/X.md` | `.cursor/rules/X.mdc` | `.agents/rules/X.md` |
| **Skills (LobeHub)** | `.claude/skills/X/` | `.cursor/skills/X/` | `.agents/skills/X/` |
| **Skills custom (centralizadas)** | `skills/X/` (raiz, lida pelos 3 IDEs) |
| **Squads** | `squads/...` (raiz, lida pelos 3 IDEs) |
| **Best-Practices** | `core/best-practices/` (raiz) |

## Regra simples

> Sempre que criar ou alterar uma regra/skill em **um** dos 3 IDEs, replicar imediatamente nos outros **2**, no mesmo commit.

## Diferenças de extensão

- **Cursor** usa `.mdc` (markdown + YAML frontmatter para metadados de regra).
- **Claude Code** e **Antigravity** usam `.md` puro.
- O **conteúdo** é idêntico — só a extensão muda no Cursor.

## Verificação periódica

Para conferir paridade:

```bash
# Listar regras nos 3 IDEs e ver se nomes batem (ignorando .mdc vs .md)
cd <your-project-root>
for d in .claude/rules .cursor/rules .agents/rules; do
  echo "=== $d ==="
  ls $d | sed 's/\.mdc$//; s/\.md$//' | sort
done
```

O agente `@Mira_InfraSec` (Cyber-Seguranca) inclui esse check no audit mensal.

## Skills do LobeHub instaladas

Quando rodar `npx -y @lobehub/market-cli skills install X --agent claude-code`:

1. CLI extrai em `.claude/skills/X/`
2. Manualmente: copiar pasta inteira para `.cursor/skills/X/` e `.agents/skills/X/`
3. Registrar em `.learnings/LEARNINGS.md` (category `skill_installed`)

## Por que isso importa

Sem paridade: agente do Cursor não sabe da regra que existe só em `.claude/`. Resultado é comportamento inconsistente entre sessões. O incidente `_tok.php` (`LRN-20260423-001`) é exemplo: lição aprendida em uma sessão precisa estar disponível em todas as IDEs nas próximas.
