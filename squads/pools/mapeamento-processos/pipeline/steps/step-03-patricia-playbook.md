---
execution: subagent
agent: squads/mapeamento-processos/agents/patricia-playbook
model_tier: powerful
inputFile: squads/mapeamento-processos/output/entrevista-resumo.md
outputFile: squads/mapeamento-processos/output/draft-playbook.md
---

# Step 03: Arquitetar Playbook

## Context Loading

Load these files before executing:
- `squads/mapeamento-processos/output/entrevista-resumo.md` — Resumo tático com Gatilho, Macro Passos e Alertas.
- `squads/mapeamento-processos/pipeline/data/domain-framework.md` — A macro estrutura obrigatória de 5 blocos Tektus.
- `squads/mapeamento-processos/pipeline/data/anti-patterns.md` — Regras do que não fazer ao escrever Playbooks.

## Instructions

### Process
1. Converta o Resumo Tático em um Playbook documentado, hiperularizando (quebrando) passos genéricos.
2. Formate as condicionais ("se isso acontecer, então faça aquilo") na Seção de Árvore de Decisão de maneira muito clara.
3. Elabore e deduza o Troubleshooting se o resumo tático citou gaps e gargalos.
4. Salve o arquivo gerado em `output/draft-playbook.md`.

## Output Format

The output MUST follow this exact structure:
```markdown
# Playbook: [Nome do Processo]

## 1. Identificação Operacional
- **Área:** [Área]
- **Dono:** [Dono]
- **Gatilho Inicial:** [Gatilho]
- **Tempo Estimado / SLA:** [Tempo ideal inferido ou mapeado]

## 2. Setup e Pré-Requisitos
- [Ferramentas preparadas ou arquivos necessários]

## 3. Passo a Passo
1. **[Ação Atômica 1]:** [Explicação em 1 frase hiper-direta]
2. **[Ação Atômica 2]:** [Explicação]
...

## 4. Árvore de Decisões
- **Se** [cenário divergente freq], **então** [ação].
- **Se** [cenário freq B], **então** [ação].

## 5. Troubleshooting (Resolução de Erros)
- **Erro/Gargalo:** [Problema citado nos "Alertas" do Ivan]
  - **Ação Paliativa/Prevenção:** [Resolução direta do erro sem fugir do controle]
```

## Output Example

# Playbook: Envio de Briefing Inicial para Clientes

## 1. Identificação Operacional
- **Área:** Client Success
- **Dono:** CS Onboarder
- **Gatilho Inicial:** Contrato assinado (Stripe = Paid).
- **Tempo Estimado / SLA:** 2 horas úteis.

## 2. Setup e Pré-Requisitos
- Acesso de edição ao HubSpot.

## 3. Passo a Passo
1. **Localizar o Deal no HubSpot:** Confirme que o card está na coluna "Closed Won".
2. **Disparar o Formulário:** Vá em (Sales > Templates). Utilize o template `[Tektus] Briefing Integrado`.

## 4. Árvore de Decisões
- **Se o cliente preencher o form em 48h:**
  - Mova o Deal para a coluna "Briefing Recebido".
- **Se o cliente não preencher o form em 48h:**
  - Envie WhatsApp de alerta (Template `followup-1.md`).

## 5. Troubleshooting (Resolução de Erros)
- **Erro:** O cliente mandou o documento prévio incompleto.
  - **Ação:** Responda apontando os campos obrigatorios. Não force o Design.

## Veto Conditions

Reject and redo if ANY of these are true:
1. O Playbook não contiver as 5 macro-seções idênticas à arquitetura Tektus.
2. A linguagem for narracional ("depois a gente vai ali e faz...") em vez de imperativa clássica.

## Quality Criteria

- [ ] Troubleshooting aborda as exceções levantadas pelo investigador?
- [ ] Os verbos atômicos direcionam à ação (Ir, Abrir, Copiar, Disparar)?
- [ ] O Escopo Temporal (SLA) faz sentido para Growth?
