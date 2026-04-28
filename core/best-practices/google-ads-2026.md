---
id: google-ads-2026
name: "Google Ads 2026 — Gemini 3 · Power Pack · Comércio Agêntico"
whenToUse: |
  Creating agents that plan, execute, optimize, or audit Google Ads campaigns. Covers Power Pack framework (Demand Gen + AI Max + Performance Max), AI Overviews impact on CTR, agentic commerce (ALF + UCP), Enhanced Conversions unification, signal purification, broad match + smart bidding patterns, and creative production with Asset Studio (Imagen 4, Veo 3, Nano Banana 4). NOT for: Meta Ads → see meta-ads-2026. NOT for: SEO orgânico → see strategist or technical-writing.
version: "1.0.0"
last_updated: "2026-04-27"
research_source: "Internal research synthesis on Google Ads 2026 (Gemini 3 · Power Pack · ALF/UCP) — April 2026"
---

# Google Ads 2026 — Gemini 3 · Power Pack · Comércio Agêntico

> **Atualização:** 27 de abril de 2026
> **Vigência:** abril 2026 a próxima atualização estrutural do Google. Reavaliar trimestralmente.

O Google Ads em 2026 deixou de ser uma plataforma de leilão de palavras-chave para se tornar um **sistema de gestão de sinais e identidade alimentado por inteligência artificial agêntica**. A integração profunda do Gemini 3 (lançado em novembro de 2025) e a chegada do Universal Commerce Protocol (UCP) redefiniram o papel do gestor de tráfego: deixou de ser executor de lances manuais e passou a ser **curador de dados, criativo e estratégia de marca**. Esta best-practice encoda as regras operacionais que distinguem campanhas de alta performance de orçamento queimado.

## Core Principles

### 1. Gestão de Sinais > Gestão de Cliques (signal economy)

A introdução do ALF (Advertiser Large Foundation Model) atribui a cada conta um **vetor de confiança**. Contas com sinais limpos (dados primários consistentes, criativos coerentes com a experiência pós-clique, ausência de tráfego de bots) recebem inventário premium e CPC menor. Contas com fraude de clique, inconsistência criativa ou Schema mal estruturado são penalizadas algoritmicamente.

**Aplicação:** purificar feeds de dados antes de subir campanha. Implementar defesa contra fraude de clique. Garantir coerência absoluta entre criativo, landing page e produto entregue.

### 2. Power Pack é o framework padrão (Demand Gen + AI Max + PMax)

Substituiu o "Power Pair" em maio/2025. Cobre o funil completo:

| Tipo de campanha | Função no funil | Quando usar |
|---|---|---|
| **Demand Gen** | Topo + meio (criar intenção) | Lançamento de produto, conscientização, alcance via Shorts/Discover/Gmail |
| **AI Max para Pesquisa** | Meio (capturar intenção) | Substitui DSA (descontinuação até set/2026) e amplia palavras-chave de match |
| **Performance Max (PMax)** | Fundo (conversão multi-canal) | Carro-chefe — controla 45-54% dos gastos médios da conta |

Não é mais "ou um ou outro". As 3 trabalham em concerto, com PMax como peça central.

### 3. Demand Gen virou motor de intenção (não só awareness)

Mudança algorítmica fim de 2025: passou de targeting **contextual** (conteúdo que o usuário consome) para targeting por **interesse e comportamento global** nas propriedades Google (YouTube + Maps + Gmail + Search). Demand Gen agora compete pelo crédito de conversão no meio e fundo do funil — não só topo.

**Aplicação:** rodar Demand Gen com feed de produtos ativo + criativos verticais (9:16 para Shorts) + parcerias com criadores nativos. Resultado típico: +30% lift em conversão mantendo CPA.

### 4. AI Max + Diretrizes de Texto (Text Guidelines)

AI Max para Pesquisa (lançamento global fev/2026) **não é campaign type novo** — é um conjunto de features aplicado a Search existente. Combina:
- Correspondência sem palavras-chave (broad match expandido)
- Personalização de texto gerada por IA
- Expansão de URL final

**+14% conversão média · +27% para contas que vinham de match exato/frase.** Use **Text Guidelines** (fev/2026) para vetar termos proibidos ou impor tom de voz obrigatório — protege a marca contra geração off-brand.

⚠️ DSA (Dynamic Search Ads) está sendo **descontinuado** — migração automática até **setembro de 2026**. Migrar voluntariamente antes pra evitar resets de aprendizado.

### 5. PMax 2026 ficou mais transparente (saindo do "caixa preta")

Não é mais o PMax opaco de 2023. Em 2026 oferece:
- **Relatórios por canal** (Search, Display, YouTube, Gmail, Discover, Maps)
- **Search Themes** — até 25 temas por grupo de ativos para priorizar consultas
- **High Value Mode** — instrui o algoritmo a pagar mais por clientes com alto LTV previsto (requer integração CRM/dados primários)
- **Exclusão de marca** em nível de campanha (não só conta)
- **10.000 negativas por campanha** (era 100)

**Aplicação:** sempre habilitar relatórios por canal antes de avaliar performance. Usar Search Themes para guiar a IA sem engessar. Ativar High Value Mode quando há dado de LTV confiável.

### 6. AI Overviews mudaram o jogo do CTR (paid e orgânico)

AI Overviews aparecem em ~15.69% das buscas (alto em informacional/YMYL, baixo em transacional/local). Impacto:

| Tipo de consulta | Acionamento AI Overview | Impacto CTR (posição 1) |
|---|---|---|
| Informacional ("o que é", "como fazer") | 47% | -34% |
| Educacional | 41% | -26% |
| Comparação ("X vs Y") | 38% | -23% |
| Saúde / Medicina | 34% | -31% |
| Transacional | 8% | -12% |
| Local / Navegação | 12% | -14% |

Queda de 61% no CTR orgânico e até 68% no CTR pago em consultas com Overview. **A vitória nova é ser citado** dentro do bloco de resposta da IA — gera tráfego de intenção mais qualificado.

**Aplicação na landing page:** Schema (FAQ, Product, Review), H2/H3 que espelham perguntas conversacionais, blocos de resposta concisos que a IA possa citar.

### 7. Comércio Agêntico (UCP) reduz a importância do clique

UCP (Universal Commerce Protocol) permite que agentes de IA (Gemini Mode, Muse Spark e equivalentes) consultem inventários, negociem e executem checkout em nome do usuário **sem visita ao site do anunciante**. O usuário diz "fritadeira de ar pra 5 pessoas até R$ 800 com entrega em 24h" e a IA fecha a compra.

**Implicação prática:**
- A decisão de compra está sendo tomada pela IA do usuário em diálogo com a IA do Google Ads
- **Liquidez de sinais** importa mais que UX do site
- Feeds Merchant Center precisam estar perfeitos (dados completos, imagens corretas, estoque sincronizado)
- **Migração obrigatória para Merchant API até 18/08/2026** — substitui a Content API antiga. Quem não migrar fica fora da economia agêntica.

### 8. Enhanced Conversions Unificadas (jun/2026)

A partir de junho/2026, "Enhanced Conversions for Web" e "Enhanced Conversions for Leads" fundem-se em interface única. Aceita simultaneamente:
- Tags de site
- Conexões Data Manager
- Fluxos de API (server-side)

**EMQ (Event Match Quality)** análogo ao da Meta — qualidade dos dados primários (email/telefone hasheado SHA-256, IP, UA) é o que define se o Smart Bidding aprende ou treina mal.

### 9. Meridian (MMM Open Source) substitui métricas de vaidade

Meridian é a ferramenta de Marketing Mix Model open-source do Google. Usa **estatística bayesiana** sobre sinais granulares de Search e YouTube para medir **incrementalidade real** — quanto a conversão acontece **por causa** do anúncio, não correlacionada a ele.

**Aplicação:** orçamento estratégico (definir mix entre Search/YouTube/Demand Gen/PMax) deve ser pautado em Meridian, não em ROAS de last-click. Particularmente importante para verbas > R$ 30k/mês.

### 10. Estrutura de conta enxuta + Broad Match com Guardrails

A microgestão de termos morreu. Em 2026 o padrão é **conta simplificada** com poucas campanhas e muitos ativos. Broad Match + Smart Bidding viraram default — mas exigem **lista de palavras-chave negativas em nível de conta** para bloquear "grátis", "vagas", "barato", "como fazer" e termos irrelevantes globalmente.

**Aplicação:** começar com 1 PMax + 1 AI Max (Search) + 1 Demand Gen. Adicionar mais campanhas só quando volume justifica.

## Techniques & Frameworks

### Estrutura de conta padrão Tektus 2026

```
[Cliente]
├── PMax — fundo de funil (orçamento principal)
│   ├── Asset Group por linha de produto / objetivo
│   ├── Search Themes (até 25 por grupo)
│   ├── High Value Mode ativado (se houver dado LTV)
│   └── Audience signals: clientes existentes + lookalike CRM
├── AI Max para Pesquisa — meio de funil
│   ├── Broad match + Smart Bidding (tROAS ou Maximizar Valor)
│   ├── Text Guidelines com termos vetados + tom de voz
│   └── Lista de negativas em nível de conta
└── Demand Gen — topo + meio (formação de intenção)
    ├── Feed de produtos ligado
    ├── Criativos verticais 9:16 prioritários
    └── Parcerias com criadores nativos quando possível
```

### Nomenclatura padronizada (alinhada ao [DB] Campanhas — Anúncios)

```
CAMPANHA:  [CLIENTE]_[OBJETIVO]_[FUNIL]_[ANO-MM]
CONJUNTO/GRUPO:  [TIPO-CAMPANHA]_[FOCO]_[ESTRATEGIA-LANCE]
ANÚNCIO/ASSET:   [CLIENTE] — [LETRA] — [PRODUTO]
```

Exemplos:
- `DDF_TRAFEGO-WEB_PMAX_2026-Q3` · grupo: `PMAX_PRODUTOS-PRINCIPAIS_TROAS-300`
- `FABLO_LEAD_AIMAX_2026-Q2` · grupo: `AIMAX_BROAD-MATCH_MAX-CONVERSAO`

A mesma string vai literalmente no Google Ads — facilita conciliação Notion ↔ plataforma.

### Decisão de escalonamento

| Condição (todas verdadeiras) | Ação |
|---|---|
| ROAS ≥ 1.3× meta · CPA dentro · ≥ 14 dias rodando | Escalar +30% (uma vez · esperar 14 dias) |
| Dentro dos KPIs | 🟡 Manter |
| Asset Group com baixo Ad Strength | 🔵 Adicionar 5+ ativos novos (texto + imagem) |
| ROAS < 0.7× meta após 14 dias e R$ 500+ gastos | 🔴 Pausar grupo · investigar landing |

⚠️ Janela de aprendizado Google: **mínimo 14 dias** entre alterações estruturais (mais conservador que Meta porque Smart Bidding é mais dependente de volume).

## Quality Criteria

- [ ] Estrutura usa Power Pack (Demand Gen + AI Max + PMax) ou justifica ausência
- [ ] Broad Match acompanhado de lista de negativas em nível de conta (≥ 50 termos baseline)
- [ ] Text Guidelines configuradas no AI Max (termos vetados + tom de voz)
- [ ] Search Themes (até 25) populados em PMax para guiar consultas-alvo
- [ ] High Value Mode ativado se houver dado de LTV confiável (CRM integrado)
- [ ] Enhanced Conversions ligadas (com email + phone hasheados SHA-256)
- [ ] GA4 integrado com Smart Bidding (requisito de elegibilidade IA)
- [ ] Schema na landing (Product/FAQ/Review/Organization) para citação em AI Overview
- [ ] Merchant API migrada (deadline 18/08/2026 para varejistas)
- [ ] DSA migrados para AI Max (deadline set/2026)
- [ ] Janela de 14 dias respeitada entre alterações

## Output Examples

### Exemplo 1 — Estrutura proposta para cliente novo (e-commerce médio)

```markdown
## Cliente: <furniture-store-example> · Verba R$ 8.000/mês · Objetivo: vendas online

### Estrutura Power Pack
1. PMax: MV_VENDAS_PMAX_2026-Q3 · 60% verba (R$ 4.800/mês)
   - 3 Asset Groups (Sala / Quarto / Escritório)
   - Search Themes: "móveis planejados rj", "sofá retrátil", "guarda-roupa casal"
   - High Value Mode: ON (dado LTV de 8 meses já mapeado)
   - tROAS: 350%

2. AI Max Search: MV_VENDAS_AIMAX_2026-Q3 · 30% verba (R$ 2.400/mês)
   - Broad match + Maximizar Valor da Conversão (com COGS)
   - Text Guidelines: vetar "barato", "promoção" · tom: confiável, decorativo
   - Negativas globais: 80 termos baseline + lista personalizada

3. Demand Gen: MV_AWARENESS_DEMAND_2026-Q3 · 10% verba (R$ 800/mês)
   - Feed de produtos ativo
   - Criativos verticais 9:16 (Shorts) e 1:1 (Discover)
   - Audience: clientes que compraram no último ano (lookalike 1%)

### Tracking & Sinais
- Enhanced Conversions: email + telefone hasheados SHA-256
- GA4 integrado · Server-side via GTM
- Meridian configurado (planejamento orçamentário)
- Defesa anti-fraude: ClickCease ou similar

### Deadlines críticos
- Migrar Merchant API: até 30/06/2026 (margem de segurança)
- Migrar DSA → AI Max: até 30/06/2026 (já planejado)
```

### Exemplo 2 — Auditoria de conta existente

```markdown
## Auditoria conta Google Ads — Clínica X (3 meses rodando)

### Conformidade com playbook 2026

| Princípio | Estado | Severidade |
|---|---|---|
| Power Pack (3 tipos de campanha) | ❌ Só Search legado · sem PMax · sem Demand Gen | 🔴 ALTA |
| AI Max + Text Guidelines | ❌ Search ainda em match exato/frase · DSA solto | 🔴 ALTA |
| Broad Match + Negativas conta | ❌ Negativas só em nível de campanha | 🟡 MÉDIA |
| Enhanced Conversions | ⚠️ Tags ligadas · sem hash de email/telefone | 🟡 MÉDIA |
| Schema na landing page | ❌ Sem Schema FAQ ou Product | 🔴 ALTA |
| Janela 14 dias entre ajustes | ❌ Mexem em lances 3× por semana | 🔴 ALTA |
| Defesa contra fraude de clique | ❌ Sem ferramenta | 🟡 MÉDIA |

### Plano de remediação (sequenciado · 30 dias)
Semana 1: implementar Enhanced Conversions com hash + Schema na landing
Semana 2: subir AI Max em paralelo ao Search legado · migrar DSA
Semana 3: pausar Search legado · subir PMax com 3 Asset Groups
Semana 4: subir Demand Gen com R$ 30/dia · ferramenta anti-fraude

CPC atual: R$ 12 · CPC projetado pós-remediação: R$ 6-8 (60 dias)
```

## Anti-Patterns

### Never Do

- **Nunca rodar Search com Broad Match sem lista de negativas em nível de conta.** O Smart Bidding queima orçamento em "grátis", "vagas", "como fazer" sem isso.
- **Nunca alterar campanha em < 14 dias após subir/escalar.** Reset de Smart Bidding mais custoso que no Meta.
- **Nunca usar tROAS sem dado primário de margem (COGS).** A IA otimiza pra venda alta margem se você fornece dados; sem isso, vende qualquer coisa.
- **Nunca deixar DSA rodando sem plano de migração para AI Max.** Descontinuação automática até set/2026 — quem fica até o último dia perde aprendizado.
- **Nunca esquecer migração para Merchant API em e-commerce.** Deadline 18/08/2026. Quem não migrar fica fora do UCP/comércio agêntico.
- **Nunca confundir AI Max com PMax.** AI Max = features de IA aplicadas em Search existente. PMax = campaign type multi-canal próprio.
- **Nunca subir landing sem Schema em conta que rode AI Max ou PMax.** AI Overview cita Schema; sem Schema, a IA não te encontra como fonte.

### Always Do

- **Sempre começar pelo Power Pack** (mesmo que com verbas pequenas em Demand Gen). Cada peça alimenta as outras.
- **Sempre habilitar relatórios por canal no PMax** antes de avaliar performance. Sem isso, decisão é cega.
- **Sempre integrar GA4 antes de subir Smart Bidding.** Requisito de elegibilidade.

## Vocabulary Guidance

### Always Use (terminologia 2026)
- **Power Pack** — framework Demand Gen + AI Max + PMax
- **AI Max para Pesquisa** — features de IA em Search (não é campaign type novo)
- **Performance Max (PMax)** — campaign type multi-canal
- **Demand Gen** — campanha de criação de intenção (não confundir com awareness puro)
- **Search Themes** — até 25 temas por grupo no PMax
- **High Value Mode** — instruir IA a priorizar clientes high-LTV
- **Text Guidelines** — vetos e tom de voz no AI Max
- **ALF / UCP** — modelo de confiança / protocolo de comércio agêntico
- **Asset Studio** — geração de criativos com Imagen 4 / Veo 3 / Nano Banana 4
- **Meridian** — MMM open-source para incrementalidade
- **Enhanced Conversions Unificadas** (jun/2026)

### Never Use (linguagem obsoleta)
- "Power Pair" → use "Power Pack"
- "Dynamic Search Ads (DSA)" → migrar para AI Max
- "Content API" → usar Merchant API
- "Match exato como segurança" → contraindicado em 2026
- "Otimizar CPA isolado" → use Maximizar Valor com COGS

### Tone Rules
- Decisões pautadas em ROAS incremental (Meridian) > ROAS last-click
- Comunicação com cliente em PT-BR coloquial · jargão (PMax, AI Max, ALF) sempre traduzido na primeira menção
- Recomendações sempre quantificam deadline crítico (Merchant API, DSA, Enhanced Conversions)
