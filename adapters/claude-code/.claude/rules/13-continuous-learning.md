---
description: "Registro contínuo de aprendizados, erros e correções em .learnings/ (skill self-improving-agent)"
globs: "**/*"
alwaysApply: true
---

# 📚 Aprendizado Contínuo (Obrigatório)

Toda sessão da Tektus DEVE registrar aprendizados, erros e correções em `.learnings/` para que sessões futuras (em qualquer IDE) tenham acesso ao conhecimento acumulado.

Skill que cobre o protocolo: **`openclaw-skills-self-improving-agent-1-0-0`** (instalada em `.claude/skills/`).

## Triggers obrigatórios de registro

| Situação | Arquivo | Categoria |
|---|---|---|
| Comando ou operação falha inesperadamente | `.learnings/ERRORS.md` | (entrada `ERR-YYYYMMDD-XXX`) |
| Usuário corrige ("não, isso está errado", "na verdade...") | `.learnings/LEARNINGS.md` | `correction` |
| Usuário pede capacidade que não existe | `.learnings/FEATURE_REQUESTS.md` | (entrada `FR-YYYYMMDD-XXX`) |
| API/ferramenta externa falha | `.learnings/ERRORS.md` | + integration details |
| Conhecimento desatualizado / errado | `.learnings/LEARNINGS.md` | `knowledge_gap` |
| Abordagem melhor descoberta para tarefa recorrente | `.learnings/LEARNINGS.md` | `best_practice` |
| Decisão de segurança importante (CISO) | `.learnings/LEARNINGS.md` | `security_decision` |

## Antes de tarefas grandes

**Ler `.learnings/LEARNINGS.md` e `.learnings/ERRORS.md`** antes de começar — para evitar repetir erro conhecido e aplicar padrões já validados.

## Promoção para CLAUDE.md

Aprendizados de aplicabilidade ampla (não só uma sessão) DEVEM ser promovidos para:

- `CLAUDE.md` (raiz) — conhecimento que TODOS os agentes precisam
- `~/.claude/projects/.../memory/MEMORY.md` (memória pessoal do Claude Code)
- Best-practices em `_opensquad/core/best-practices/` quando virarem padrão

## Formato de entrada (LEARNINGS.md)

```markdown
## [LRN-YYYYMMDD-XXX] category

**Logged**: ISO-8601 timestamp
**Priority**: low | medium | high | critical
**Status**: pending | in_progress | resolved | wontfix
**Area**: frontend | backend | infra | tests | docs | config | security

### Summary
Uma linha do que foi aprendido.

### Details
Contexto completo: o que aconteceu, o que estava errado, o que é correto.

### Suggested Action
Fix específico ou melhoria a fazer.

### Metadata
- Source: conversation | error | user_feedback
- Related Files: path/to/file.ext
- Tags: tag1, tag2
- See Also: LRN-XXX (se relacionado a entrada existente)

---
```

## Sincronização Cross-IDE

`.learnings/` mora na raiz do repo — todos os 3 IDEs leem do mesmo lugar. Apenas a regra (`.claude/rules/13-aprendizado-continuo.md`) precisa ser espelhada em `.cursor/rules/` e `.agents/rules/`.

## Por que isso importa

Sem `.learnings/`, cada sessão começa do zero. O incidente `_tok.php` foi pego porque já estava registrado como `ERR-20260423-001` e `LRN-20260423-001` — agentes futuros não vão repetir esse erro. Cada `.learnings/` é a memória institucional da Tektus.
