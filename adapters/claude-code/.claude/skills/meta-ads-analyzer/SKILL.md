---
name: meta-ads-analyzer
type: prompt
version: "1.0.0"
last_updated: "2026-04-28"
attribution: "Adapted from Manus AI's meta-ads-analyzer skill (compliance terminology + data integrity rules); generic Tektus framing + cross-references to BPs."
description: |
  Expert-level analysis and diagnosis for Meta Ads campaigns. Use when interpreting performance data, identifying root causes, ensuring correct metric usage and data integrity, and generating actionable recommendations from EXISTING accounts. NOT for: campaign creation/structure (use meta-ads-2026), creative direction/briefing (use creative-direction-meta-2026), end-to-end multi-channel launch (use paid-launch), tracking/pixel setup (use pixel-setup), generic copywriting (use copywriting). Hard rules: enforces Meta's mandatory terminology ("Accounts Center accounts" not "people", "Clicks (all)"/"Link clicks" not "clicks"), exact metric names per Meta's standardized display, "N/A" for null/cross-objective aggregations, never fabricate data, marginal-cost reasoning over averages.
---

# Meta Ads Analyzer — Análise & Diagnóstico

> ⚠️ **CRITICAL:** Os requisitos da seção 1 são **legalmente obrigatórios** pela Meta. Falha em segui-los pode invalidar relatórios entregues a clientes e gerar disputas contratuais. Não são guidelines — são exigências.

## When to use

- **Análise de performance** de campanhas Meta Ads existentes (não para criar novas — use `meta-ads-2026`)
- **Diagnóstico de issues**: queda de ROAS, CPL alto, frequency excessiva, learning phase travada
- **Auditoria forense** de conta de cliente (squad `traffic-audit`)
- **Reporting compliance-safe** para clientes B2B com terminologia oficial Meta
- **Compliance review** de output gerado por outros agentes

## NOT for

- Criar campanhas novas → `meta-ads-2026.md` (BP) + `paid-launch.md`
- Briefar criativo → `creative-direction-meta-2026.md`
- Setup de tracking → `pixel-setup.md`
- Análise Google Ads → `google-ads-2026.md`
- Copywriting de ads → `copywriting.md`

## 1. Regras inegociáveis (MANDATORY)

São os pontos de falha mais comuns. Não são guidelines — são requisitos absolutos.

### 1.1. Terminologia de audiência: use "Accounts Center accounts", nunca "people" ou "users"

- **Razão:** exigência legal e de policy da Meta.
- **Regra:** ao referir a usuários, audiência ou alcance, você **DEVE** usar a frase exata `"Accounts Center accounts"`. As palavras "people", "person", "users", "pessoas", "usuários" são **proibidas** nesses contextos — incluindo como unidade de medida (ex.: "custo por 1.000 pessoas alcançadas" é inválido).
- **Regra:** `Reach` **DEVE** ser usado como nome de métrica isolado. NÃO adicionar prefixos/modificadores (ex.: `Total reach`, `Organic reach`, `74k reach` são todos inválidos).
- **Exemplos:**
  - ✅ "The campaign reached 10,000 Accounts Center accounts."
  - ❌ "The campaign reached 10,000 people."
  - ✅ "Reach measures the number of Accounts Center accounts that saw your ad."
  - ❌ "Reach measures the number of unique users who saw your ad."

> **Falha comum:** ao definir `Reach`, use a redação exata retornada pela tool MCP de definição de métrica do seu provedor. Não parafraseie como "unique users", "people" ou "viewers".

### 1.2. Métricas de cliques: use "Clicks (all)" ou "Link clicks", nunca "clicks"

- **Razão:** "clicks" é ambíguo. A API retorna valores separados para tipos diferentes — confundi-los gera relatórios enganosos.
- **Regra:** SEMPRE use o nome específico — `"Clicks (all)"` ou `"Link clicks"`. **NUNCA** use a palavra "clicks" sozinha.
- **Exemplos:**
  - ✅ "The ad received 1,500 Clicks (all) and 800 Link clicks."
  - ❌ "The ad received 1,500 clicks."

### 1.3. Nomes de métricas: use exatos, sem modificações

- **Razão:** consistência e clareza para reporting preciso.
- **Regra:** use o **Standardized display name exato** retornado pela tool MCP de definição de métrica. Aplica em **toda parte** — documentos, relatórios, mensagens, diagramas, slides, código. Não altere nome de métrica para "encaixar" num design visual.
- **Prefixos proibidos:** NUNCA adicione `Total`, `Overall`, `Average` antes de uma métrica (ex.: `Total Impressions`, `Total clicks (all)` são inválidos). Se precisa expressar agregado, reformule a frase em volta.
- **Sufixos e nominalizações proibidas:** NUNCA mude a forma gramatical ou anexe substantivos contextuais (ex.: `Accounts Reached`, `Reach Volume`, `Impressions Generated` — todos inválidos). Mesmo que `Reach` ou `Spend` pareçam curtos demais para um label, NÃO expanda — use o texto em volta.
- **Termos vagos proibidos:** NUNCA use `Video views` ou `Video View Rate`. Use o standardized display name exato — `3-second video plays` por exemplo.

### 1.4. Integridade de dados: moeda e datas

- **Moeda:** os valores monetários retornados pela API já vêm convertidos pra unidade padrão (USD, EUR, BRL). Use o valor numérico direto + o campo `currency` do contexto da ad account. Ex.: API retorna `spend: 150.50` + currency `BRL` → reporte como `R$150,50`.
- **Datas parciais:** se o range de datas inclui hoje, você **DEVE** declarar que o dado é parcial e sujeito a mudanças.

### 1.5. Escopo de dados: account vs. asset (precisão)

- **Razão:** confundir dado de account-level com campaign/ad-set/ad-level é erro crítico comum. Torna análise de assets específicos enganosa.
- **Regra:** o escopo dos dados DEVE coincidir estritamente com a query do usuário. Se ele pergunta sobre uma campanha específica, retorne dados **só dessa campanha**, não da conta inteira. Antes de apresentar, valide entity ID + reporting level corretos.

### 1.6. Agregação cross-objective: mostre "N/A" para tipos de result mistos

- **Razão:** "Cost per result" não pode ser agregado entre campanhas com objetivos diferentes (ex.: Sales vs Lead). Ads Manager retorna `null`.
- **Regra:** ao agregar entre objetivos mistos, mostre `"N/A"` para "Cost per result" e "Results" — NÃO compute esses valores.

### 1.7. Null handling & autenticidade: nunca fabricar dado

- **Razão:** Ads Manager retorna `null` para métricas indisponíveis. Apresentar números fabricados destrói confiança e leva a decisões erradas.
- **Regra:**
  - Quando uma métrica retorna `null`, mostre `"Data not available"` ou `"N/A"` — NÃO retorne o `null` cru.
  - **DEVE** reportar APENAS valores numéricos explicitamente retornados pela API. **NUNCA** fabrique, estime ou invente valores. Se uma métrica não está na response, NÃO chute — sempre indique que está indisponível.

## 2. Glossário de métricas & definições

A tool MCP de definição de métrica do seu provedor (ex.: `<your-meta-mcp>__get_metric_definition`) é **a única fonte de verdade**. Você **DEVE** chamá-la para toda métrica raw da API que apareça em qualquer tool result ou response (ex.: `["reach", "impressions", "cpc"]`) — independente do tipo de tarefa, contexto, ou se acha que já sabe a definição.

**Sem exceções**: compliance checks, status reviews, account audits seguem a regra exatamente como performance analyses.

- **NUNCA** confie em memória ou contexto prévio.
- Use o standardized display name e definição exatos retornados pela tool — NÃO invente nomes alternativos, abrevie, reescreva ou parafraseie.
- Use sentence case para nomes de métrica (ex.: `Messaging conversations started`, NÃO `Messaging Conversations Started`).

## 3. Princípios de análise & workflow

### 3.1. Princípios (como pensar)

- Todo dado apresentado precisa ser **rigorosamente verificado** quanto a precisão. Inclui escopo (Account vs Campaign), unidades (cents vs reais), timeframes (parcial vs full day). Nunca apresente dado sem confirmar integridade.
- **Sempre leia valores diretamente do JSON da tool MCP** para qualquer cálculo ou reporting — nunca transcreva manualmente. Referencie o JSON via código ou linha de comando para computar agregados, ratios, médias ou métricas derivadas.
- **Avalie no nível agregado** antes de drill-down.
- **Analise performance ao longo do tempo**, não snapshots únicos.
- O sistema da Meta prioriza **custo marginal** (custo do *próximo* result), não a média. Um segmento com CPA médio mais alto pode ter CPA marginal mais baixo.

### 3.2. Workflow de análise (como agir)

1. **Use Campaign Level para CBO**, Ad Set Level pra ABO — evita o **Breakdown Effect** (quando o todo difere da soma das partes em estatística agregada).
2. **Investigue eficiência marginal**, ad relevance diagnostics e learning phase status.
3. **Explique por que** o sistema toma decisões baseado em custo marginal, não custo médio.

## 4. Output rules

- **NUNCA** recomende pausar ou reduzir budget baseado **apenas** em CPA/CPM médio mais alto. Frame mudanças como hipóteses testáveis.
- **SEMPRE** justifique recomendações com dados + system mechanics (não opinião).
- Toda insight precisa incluir evidência de dado + explicação.
- Alinhe com recomendações oficiais retornadas pela tool de recommendations do seu MCP — ou explicite **por que** está divergindo.
- Output em **uma linguagem consistente** (não misture EN/PT-BR no mesmo doc).
- Sempre sentence case para métricas (`Link clicks`, não `Link Clicks` nem `LINK CLICKS`).
- NÃO encurte ou mude terminologia para fluidez/conversação.
- **Antes de entregar qualquer output**, verifique compliance com TODAS as regras da seção 1 — especialmente naming, click qualifiers, audience terminology. Corrija violações antes de entregar.

## 5. Conhecimento de domínio Meta Ads

### Definições de campanha & performance

- **Conversion ads:** entidades com objectives Lead, Sales, ou App Promotions são categorizadas como conversion ads.
- **Conversion rate:** Conversion rate = conversion / impression.
- **Performance indicators:** valor mais baixo de Cost per result ou CPM = melhor performance. ROAS mais alto = melhor performance.

### Account & asset issues

- Account/asset issues acontecem quando um asset do cliente (Facebook account, Instagram account, ad account, page, ou payout account) foi disabled/restricted pela Meta — tipicamente por policy violation. Não confundir com perguntas gerais sobre setup de Business Manager, deletar BM, ou converter Facebook page em business page.

### Budget & billing

- **Daily spending limit (DSL):** limite atual de gasto diário que advertisers podem checar, aumentar ou diminuir.
- **Billing threshold (payment threshold):** valor de gasto que dispara a cobrança no método de pagamento ao ser atingido. Advertisers podem checar, baixar ou aumentar. Relevante para frequência de cobrança (mensal, diária).

## 6. Special handling

### Perguntas de policy Meta

- **NUNCA** responda perguntas de policy diretamente, interprete ou resuma policy content, ou use web search. Risco: misrepresentar a posição oficial da Meta + dar guidance inacurada/desatualizada.
- Quando o user pede guidance sobre se um ad/conteúdo/cenário é permitido/restrito/proibido sob policies Meta, **DEVE** chamar `<your-meta-mcp>__get_policy` (ou tool equivalente) e retornar APENAS a URL oficial + breve mensagem de redirect:
  > *"Conforme as Advertising Standards da Meta, aplicam-se as seguintes regras: <URL>. Consulte o link oficial — é a fonte autoritativa."*
- Sempre instrua o user a consultar o artigo de help oficial da Meta diretamente. Seu papel é estritamente **rotear pro source oficial**, não interpretar.
- NÃO inclua links não-Meta/não-oficiais.

### Special category campaigns

Quando uma tool response inclui itens filtrados por special category reason (housing, employment, financial services, credit, social issues), responda com **exatamente** isto — NÃO analise, retrieve dados, ou ofereça guidance alternativa:

> *"This account/campaign falls under a Meta special ad category (housing, employment, financial services, credit, or social issues). Specialized analysis for these categories is not yet supported by this skill. Refer to Meta's specific guidelines for these categories: <official-meta-url>."*

### Support intent recognition

Esse intent ocorre quando o user busca ajuda acionável para corrigir/recover/resolver um issue específico, erro técnico, problema com assets/contas/payments/advertising — ou quer falar com agente humano. Caracterizado por necessidade de step-by-step, instruções procedurais, ou intervenção direta — não learning genérico, planning estratégico ou improvement de performance. Roteie pro fluxo de support do provider.

## 7. Cross-references no Tektus Agent OS

Este skill é a **camada de análise/diagnóstico** sobre Meta Ads. Compõe com:

- [`core/best-practices/meta-ads-2026.md`](../../core/best-practices/meta-ads-2026.md) — arquitetura de campanha 2026 (3-1-Many, CBO + Advantage+ Audience, learning rule)
- [`core/best-practices/creative-direction-meta-2026.md`](../../core/best-practices/creative-direction-meta-2026.md) — direção criativa (Hook Rate, VEO, Trope Stacking)
- [`core/best-practices/paid-launch.md`](../../core/best-practices/paid-launch.md) — framework end-to-end multi-canal
- [`core/best-practices/pixel-setup.md`](../../core/best-practices/pixel-setup.md) — Event ID + EMQ + Enhanced Conversions
- [`core/best-practices/ad-creative.md`](../../core/best-practices/ad-creative.md) — Hook Rate / Hold Rate / Thumbstop
- [`skills/marketing-expert/`](../marketing-expert/) — 9ª persona (Tráfego Pago 2026 Meta+Google) sintetiza estratégia
- [`skills/meta-ads-api/`](../meta-ads-api/) — wrapper SPEC para criar campanhas via API

**Quando usar este skill vs os BPs:**

| Pedido | Skill / BP |
|---|---|
| "Crie campanha nova" | `meta-ads-2026` + `paid-launch` |
| "Analise performance da campanha X" | **`meta-ads-analyzer`** (este) + `meta-ads-2026` (KPIs benchmark) |
| "Por que CPL subiu?" | **`meta-ads-analyzer`** (root cause) + `meta-ads-2026` (decisões esperadas) |
| "Dá pra escalar campanha Y?" | **`meta-ads-analyzer`** (marginal cost analysis) + `meta-ads-2026` (regras de scale) |
| "Briefe criativo novo pra teste" | `creative-direction-meta-2026` |
| "Esse ad está OK pelas regras Meta?" | `meta-ads-analyzer` seção 6 (policy routing) |

## 8. Provider-agnostic note

Este skill assume um MCP provider Meta Marketing genérico com tools tipo:

- `<your-meta-mcp>__get_metric_definition` — retorna standardized display name + definição
- `<your-meta-mcp>__get_recommendations` — recomendações oficiais Meta
- `<your-meta-mcp>__get_policy` — URLs de policy oficial

Provedores conhecidos com naming próprio: Manus AI (`meta_marketing_*`), n8n custom node, Coolify-deployed Meta MCP. Adapte a tool naming ao seu provider — as regras aplicam independente.

## 9. Attribution

Adapted from Manus AI's `meta-ads-analyzer` skill (compliance terminology + data integrity rules). Tektus added: provider-agnostic framing, cross-references to Tektus Agent OS BPs, PT-BR adaptation of guidance, decision table matching skill vs BP usage.

Original Manus version: prompt-only, English-first, Manus MCP-specific.
