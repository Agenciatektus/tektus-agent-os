---
type: generation
agent: "squads/traffic-masters-pool/agents/aline-analista"
dependencies: 
  - "squads/traffic-audit/output/dados-auditoria.md"
outputFile: "squads/traffic-audit/output/02-matriz-fugas.md"
---

# Step 02: Aline Analista - Cruzamento de Fugas

## Tarefa
Leia @dados-auditoria.md e gere a matriz de quedas no funil. Foque no *drop-off* entre Cliques, Inbounds da VerDash e Compras (Deal Won).

## Contexto para Aline Analista
Confronte as métricas fornecidas em `dados-auditoria.md`. Nós precisamos de uma Tabela Cruzada de Saúde mostrando especificamente em que etapa da plataforma ou do lado de negócios as pessoas sumiram. Não hesite em expor Wasted Spend flagrante.
