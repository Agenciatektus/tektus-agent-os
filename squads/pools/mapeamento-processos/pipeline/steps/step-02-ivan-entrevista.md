---
execution: inline
agent: squads/mapeamento-processos/agents/ivan-interrogador
inputFile: squads/mapeamento-processos/output/research-focus.md
outputFile: squads/mapeamento-processos/output/entrevista-resumo.md
---

# Step 02: Resumo Tático do Interrogador

## Context Loading

Load these files before executing:
- `squads/mapeamento-processos/output/research-focus.md` — As anotações caóticas do usuário sobre o processo.
- `squads/mapeamento-processos/pipeline/data/research-brief.md` — Metodologia Tektus de Interrogatório.

## Instructions

### Process
1. Leia a descrição crua do usuário.
2. Identifique explicitamente o Dono e o Gatilho.
3. Formate um resumo tático claro (Caminho Feliz, Possíveis Gargalos/Exceções apontadas, Ferramentas).
4. Informe ao usuário o seu diagnóstico da entrevista para ele ver se algo foi esquecido.
5. Salve o Output estrito conforme formato abaixo, para a arquiteta usar no próximo passo.

## Output Format

The output MUST follow this exact structure:
```markdown
# 🕵️‍♂️ Resumo Tático do Interrogatório

**Área/Processo:** [Nome]
**Gatilho Identificado:** [O que dispara a ação]
**Dono:** [Responsável]

**Matéria Prima (Ações Macro):**
- [Passo 1]
- [Passo 2]
- [Passo X]

**Ferramentas:**
- [App 1], [App 2]

**Alertas (Furos Operacionais e Troubleshooting mapeados):**
- [Alerta de Erro X]
- [Alerta de Exceção Y]
```

## Output Example

# 🕵️‍♂️ Resumo Tático do Interrogatório

**Área/Processo:** Vendas / Prospecção
**Gatilho Identificado:** Lista gerada no Apollo.
**Dono:** SDR Mkt.

**Matéria Prima (Ações Macro):**
- Fazer download dos leads.
- Subir para lista de cold mailing X.
- Transferir para Dialpad se open rate > 20%.

**Ferramentas:**
- Apollo, Dialpad, Lemlist.

**Alertas (Furos Operacionais e Troubleshooting mapeados):**
- Não avisaram o que fazer se o limite diário bater.
- Não tem SLA de quando fazer a call fria.

## Veto Conditions

Reject and redo if ANY of these are true:
1. O Gatilho e Dono não puderem ser isolados da bagunça do usuário (peça pra ele clarificar).
2. O resultado não for uma lista clara de bullets (textos densos são proibidos).

## Quality Criteria

- [ ] O resumo extraído prepara perfeitamente o campo para Patrícia estruturar a árvore lógica?
- [ ] O vocabulário usado é aderente ao mundo de agências/growth?
- [ ] Está focado na realidade de *como* o processo acontece, com as ferramentas envolvidas?
