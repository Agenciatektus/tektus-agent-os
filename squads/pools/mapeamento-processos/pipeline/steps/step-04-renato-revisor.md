---
execution: subagent
agent: squads/mapeamento-processos/agents/renato-revisor
model_tier: powerful
inputFile: squads/mapeamento-processos/output/draft-playbook.md
outputFile: squads/mapeamento-processos/output/playbook-validado.md
---

# Step 04: Controle de Qualidade (Review)

## Context Loading

Load these files before executing:
- `squads/mapeamento-processos/output/draft-playbook.md` — O playbook montado pela Patricia.
- `squads/mapeamento-processos/pipeline/data/quality-criteria.md` — Padrões exigidos.

## Instructions

### Process
1. Leia severamente o Draft de Playbook ponta a ponta.
2. Identifique omissões (Falta de Dono? Falta de Gatilho? Sem SLA?).
3. Se estiver tudo presente, corrija apenas o tom de voz e verbos passivos, transformando o rascunho em um Arquivo Final Homologado.
4. Se faltar informações GRAVES que inutilizam o manual, sinalize a recusa preenchendo as tags de REJEIÇÃO, senão apense o Rótulo de Homologado e reproduza o texto revisado no Output.

## Output Format

The output MUST follow this exact structure:
```markdown
# 👨‍⚖️ Relatório de Revisão do Playbook

**Status:** [APROVADO ✅ / REPROVADO ❌]

[Citar motivos centrais, ou lista de omissões se reprovado].
[Se reprovado, pare por aqui. Não preencha as linhas abaixo]

---
*(Se Aprovado, liste abaixo o playbook final refatorado)*

# Playbook: [Nome do Processo]
## 1. Identificação Operacional
...
```

## Output Example

# 👨‍⚖️ Relatório de Revisão do Playbook

**Status:** APROVADO ✅ 

O documento estava com alguns jargões fracos que refatorei (troquei "veja se" por "Verifique e valide"). A Árvore Trata 100% das fugas.

---

# Playbook: Envio de Briefing Inicial para Clientes

## 1. Identificação Operacional
- **Área:** Client Success
- **Dono:** CS Onboarder
[...]

## Veto Conditions

Reject and redo if ANY of these are true:
1. O Avaliador diz que reprovou, mas entrega o texto completo do playbook de qualquer jeito.
2. O Avaliador não usa o sistema de Status explícito.

## Quality Criteria

- [ ] A formatação MD (Headers, Bullets, Texto em Negrito) foi respeitada à risca?
- [ ] O tom da auditoria de fato encarna a "chateação por excelência" da agência?
