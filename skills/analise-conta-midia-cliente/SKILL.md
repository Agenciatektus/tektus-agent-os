---
name: analise-conta-midia-cliente
description: |
  Análise profunda da conta e da operação de mídia paga de um cliente NOVO de tráfego,
  ANTES de propor plano de ação. Levanta o baseline histórico real (o que foi gasto, o
  que converteu, o que deu errado, quais ativos existem, quem opera) puxando a verdade
  na FONTE — Graph API v23 (via System User token da própria pessoa), Apify (posts do perfil),
  Biblioteca de Anúncios, fetch das LPs/SaaS do cliente — e cruzando com Verdash
  (complemento), posicionamento da marca e compliance. Produz 3 docs padronizados +
  "Método reprodutível". Use no onboarding de cliente de tráfego / due diligence de
  conta herdada.
type: prompt
version: 2.0.0
---

# Análise de conta e operação de mídia (cliente novo)

Este é o método que a Tektus roda ao **assumir o tráfego de um cliente novo** (ou fazer due
diligence de uma conta herdada). O objetivo: **nunca começar no escuro**. Antes de qualquer
plano de ação, você levanta o baseline histórico REAL da operação — não o que o cliente
lembra, e sim o que a Graph API, o Apify e as páginas dizem. O nome do jogo é ir na **fonte
autenticada** e escrever docs que a próxima pessoa (ou o próximo agente) lê de relance.

> Regra-mãe da skill: **a Verdash é COMPLEMENTO, não fonte de verdade do histórico.** Ela
> costuma ter só um snapshot recente (1 dia) em `matriz_meta`. O histórico lifetime mora na
> **Graph API**. Quem descobriu "muito mais que a Verdash" foi exatamente ir na Graph direto.

---

## 1. When to Use

Use esta skill quando:

- A Tektus vai **assumir a gestão de tráfego** de um cliente (novo ou herdado de outra agência/gestor).
- Precisa levantar o **baseline histórico** de uma conta de anúncio antes de propor verba/estrutura.
- Há suspeita de conta **fragmentada, banida, mal configurada** ou com rastreio de venda furado.
- Quer catalogar o **acervo de criativos** do perfil (o que já engajou, o que dá pra reaproveitar em ad).
- Precisa mapear **posse de ativos** (pixel, WABA, página, BM) antes de uma transição.

**NÃO use** para: criar criativo novo do zero (isso é `mkt-ad-creative`/`design`), montar plano
de campanha detalhado (isso vem DEPOIS, alimentado por estes docs — ver `plano-*.md` dos
clientes de referência), ou análise de métrica recorrente de conta já sob gestão (isso é
report/`mkt-analytics`).

---

## 2. Entregáveis — 3 docs padronizados

Gravar em uma pasta por cliente, por exemplo `clientes/<Cliente>/04-Trafego-e-Criativos/`.

Vale manter dois casos de referência no seu repositório, porque os arquétipos se repetem:
- um cliente de **saúde com conta fragmentada**, onde uma das contas foi banida por
  integridade e o gasto dela some do token
- um cliente **SaaS B2B com conta única madura**, onde o rastreio de venda está quebrado
  por checkout em domínio de terceiro

Adapte o esqueleto ao caso — nem toda seção existe em todo cliente. O que **sempre** existe:
TL;DR honesto, tabelas com números REAIS, achados, riscos, plano de transição e a seção
**"Método (reprodutível)"** no fim (é o que permite refazer).

### 2.1 `historico-contas-anuncio.md`
O baseline financeiro/operacional de cada conta de anúncio no portfólio do cliente.

Esqueleto:
- **Título + linha de objetivo** (o que puxou, de onde, data da coleta).
- **TL;DR** (5-8 bullets): quantas contas, saudável/banida, gasto lifetime total, quantas
  operações convivem, o achado central (ex.: "rastreio de venda furado — e achei onde"),
  baseline pra bater (pico mensal).
- **A(s) conta(s)** — tabela por conta: Nome · ID (`act_...`) · Status (1=ativa/101=encerrada) ·
  disable_reason · BM · Criada em · Moeda/fuso · Financiamento · Spend cap · **Gasto lifetime** · Pixel ativo.
- **Posse** — de quem é a conta e a BM, e por qual token a Verdash enxerga (BM da agência ou perfil pessoal de alguém).
- **Curva mensal** (tabela `time_increment=monthly`): Mês · Gasto · Impressões · Cliques · CPM +
  **leitura** da curva (rampa, pico, quedas, mudança de destino, rebrand, CPM subindo).
- **Onde a verba foi** (`level=campaign`): tabela por campanha — Gasto · Campanha · **o que
  otimizava (evento REAL, confirmado adset a adset)** · sinais (leads/purch/conversas).
- **Nota ODAX**: registrar que o objetivo foi lido pelo `optimization_goal`/`promoted_object`,
  não pelo nome (LRN-20260703-008).
- **Pixels / Conjuntos de dados**: tabela — Pixel · ID · último disparo · uso · CAPI? A posse do pixel é do cliente?
- **WABA** (se houver): número, status (Cloud API oficial × ON_PREMISE), verificação de negócio, acessos.
- **O que deu certo ✅ / O que pesa ❌**: leitura interpretada, não só números.
- **Plano de transição**: passos concretos pra Tektus assumir sem perder histórico.
- **Método (reprodutível)** no fim.

### 2.2 `catalogo-videos-perfil.md`
O acervo de criativos do perfil, classificado pra colocar o criativo certo no público certo.

Esqueleto:
- **Título + perfil (@handle, ID) + total de posts + fonte (Apify, data)**.
- **TL;DR**: idade do perfil, natureza (marca pessoal × brand B2B), views (viral × qualificado pequeno),
  quanto é "de ad" de verdade, trava de compliance (CFM × Meta policy).
- **Quebra por tipo**: tabela Tipo (🎬 Vídeo · 🖼️ Carrossel · 📷 Imagem) · Qtd · papel · observação.
- **Método de classificação**: dimensões (Dor/Tema · Pilar · Etapa→público · Apto a ad?).
- **Catálogo classificado** (top N): tabelas por tema/dor — Post (link) · Views/♥ · Tema · Pilar · Etapa → público · Apto a ad.
  Marcar ⚠️ os que ferem compliance (termo proibido, testemunho, promessa).
- **Cruzamento com o posicionamento da marca**: o acervo conversa com o site/posicionamento? Onde está a lacuna (mensagem × funil)?
- **Como isso alimenta o funil** (se já há hipótese de estrutura).
- **Método (reprodutível)** no fim (input do Apify, dataset id, campos coletados).

### 2.3 `investigacao-operacao-atual.md`
O que **já roda** antes da Tektus assumir: LPs, checkout, rastreamento, ferramentas, riscos.

Esqueleto:
- **Título + linha de objetivo + data**.
- **TL;DR**: quantas motions convivem, onde está o nó (criativo? verba? rastreio? posse?).
- **O que existe hoje**: LPs (URL · época · papel · estado), checkout/pagamento (domínio, cross-domain?),
  CRM/agendamento, ferramenta de gestão. Fetch real das páginas.
- **⚠️ Conflitos e riscos** (A, B, C...): mensagem fora da marca, pixel/atribuição duplicado,
  posse de ativos, rastreio de venda quebrado, mismatch objetivo×página, CPM alto. Classificar severidade.
- **Perguntas pro cliente/gestor** (destravar transição) — o que só o humano responde.
- **Recomendação da Tektus (rascunho)**: curto/médio prazo, sempre "instrumentar antes de escalar".
- **Ticket real e contexto de verba/ROAS**: qual o produto que paga a conta (ticket único × assinatura/LTV).
- **Fontes** listadas.

---

## 3. Fontes & Método (o ouro) — comandos exatos

> **Segredo NUNCA impresso.** Você lê token/chave só pra usar EM MEMÓRIA. Só a resposta do
> Graph/Apify vai pro terminal ou pro doc. Isso é regra dura (secure-coding princípio 7 + 2).

### 3.0 Setup — uma vez por pessoa

Esta skill roda com credenciais **suas**, no seu ambiente. Ninguém precisa de
acesso a servidor, e ninguém compartilha token com ninguém.

```bash
cp skills/analise-conta-midia-cliente/.env.example _secrets/analise-midia.env
# preencha o arquivo, depois confira:
node --env-file=_secrets/analise-midia.env \
  skills/analise-conta-midia-cliente/scripts/check-setup.js
```

O `check-setup.js` diz o que está presente, o que falta e o que cada credencial
desbloqueia. Ele nunca imprime valor nenhum.

| Credencial | Obrigatória | Como obter |
|---|---|---|
| `META_ACCESS_TOKEN` | sim | Business Manager > Configurações > Usuários do sistema > Gerar token, com escopo `ads_read` nas contas do cliente |
| `APIFY_TOKEN` | não | Console da Apify > Settings > Integrations |
| `VERDASH_SUPABASE_URL` / `_KEY` | não | Verdash. Use a chave **anon**, nunca `service_role` |

> **Por que System User token e não o token pessoal de alguém.** O token de
> System User pertence à Business Manager, não a uma pessoa. Ele não morre
> quando alguém troca a senha, dá para revogar sozinho, e o escopo é por conta.
> Cada pessoa da equipe pode ter o seu, com acesso apenas às contas que opera.

---

### 3.1 Graph API v23 — a verdade do histórico Meta

Todas as chamadas passam pelo `scripts/graph.js`, que lê o token do ambiente,
usa em memória e **nunca o imprime** (nem quando a própria Meta ecoa o token de
volta dentro de uma mensagem de erro, coisa que ela faz).

```bash
alias graph='node --env-file=_secrets/analise-midia.env skills/analise-conta-midia-cliente/scripts/graph.js'

graph contas                      # contas visíveis pelo token
graph conta      act_<id>         # metadados, status, gasto lifetime
graph mensal     act_<id>         # curva mês a mês
graph campanhas  act_<id>         # gasto e ações por campanha, lifetime
graph atual      act_<id>         # últimos 30 dias
graph conjuntos  act_<id>         # objetivo REAL (ver aviso abaixo)
graph pixels     act_<id>         # pixels e último disparo
graph criativos  <campaign_id>    # criativos e LPs (object_story_spec)
graph raw "/act_<id>/ads?fields=name,status"   # qualquer endpoint
```

O wrapper já converte o que costuma confundir:

- `amount_spent` vem em **centavos**; o campo `_amount_spent_reais` traz o valor dividido
- `account_status` ganha `_status_legivel` (**1** ativa, **101** encerrada ou restrita)
- `disable_reason` ganha `_motivo_legivel` (**0** sem restrição, **1** integridade, **3** pagamento)

**Pegadinhas que continuam valendo:**

- **Objetivo real difere do nome da campanha** (LRN-20260703-008). No ODAX, uma
  `OUTCOME_ENGAGEMENT` pode estar otimizando Mensagens ou CTWA. Quem decide é o
  `optimization_goal` + `destination_type` + `promoted_object.custom_event_type`
  **do conjunto**. Confirme conjunto a conjunto, com `graph conjuntos`.
- Conta **banida ou fora do escopo do token** não é legível. O gasto dela existe
  só no Gerenciador. Registre a limitação no doc e siga. Não invente número.
- Se `graph contas` não lista a conta do cliente, o problema é escopo do token,
  não a skill. Peça ao dono da BM para conceder `ads_read` naquela conta.

### 3.2 Apify — acervo do perfil

Actor `apify/instagram-scraper`, endpoint `run-sync-get-dataset-items`, usando
`APIFY_TOKEN` do ambiente.

```json
{"directUrls":["https://www.instagram.com/<handle>/"],"resultsType":"posts","resultsLimit":90}
```

Campos úteis por item: `type` (Video/Sidecar/Image), `videoViewCount`,
`likesCount`, `commentsCount`, `timestamp`, `shortCode`, `caption`. A
classificação de aptidão para anúncio e de etapa de funil é manual.

### 3.3 Biblioteca de Anúncios pública (Meta)

`https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=BR&q=<Cliente>`

Costuma não renderizar sem sessão logada e não expõe gasto de contas comuns. Se
vier vazia, **registre no doc que é limitação da biblioteca**, nunca como "nada
rodando", e volte para a Graph, que é a fonte autenticada.

### 3.4 Web fetch das LPs e do SaaS

Busque as URLs de LP nos criativos (`graph criativos` devolve `object_story_spec`)
e faça fetch do site e do checkout. Registre: headline, CTA, plataforma
(WordPress/Elementor etc.), prova social, domínio do checkout (cross-domain é
onde o `Purchase` costuma quebrar) e estado (no ar, 522, redirect de rebrand).

### 3.5 Verdash — complemento, não fonte do histórico

Consulte pela **API REST do Supabase**, com a chave anon, que respeita o
isolamento entre agências:

```bash
curl -s "$VERDASH_SUPABASE_URL/rest/v1/matriz_meta?account_id=eq.act_<id>&select=*" \
  -H "apikey: $VERDASH_SUPABASE_KEY" \
  -H "Authorization: Bearer $VERDASH_SUPABASE_KEY"
```

**Confira o schema antes de qualquer SELECT novo** (as colunas variam por integração):

```bash
curl -s "$VERDASH_SUPABASE_URL/rest/v1/matriz_meta?select=*&limit=1" \
  -H "apikey: $VERDASH_SUPABASE_KEY" -H "Authorization: Bearer $VERDASH_SUPABASE_KEY"
```

Quase sempre é **snapshot de 1 dia**, não o histórico. A Graph continua sendo a
verdade. `tracker_*` só existe se o cliente já tem instância Tracker cadastrada.

### 3.6 Apêndice — acesso direto ao banco (somente administradores)

**Você não precisa disto para rodar a análise.** A skill inteira funciona com as
credenciais da seção 3.0.

Este caminho existe apenas para quem administra a infraestrutura e precisa
investigar algo que a API não expõe. Ele envolve a VPS de produção, que hospeda
o Verdash com **agências clientes pagantes além da Tektus**, então vale a régua
de sempre: confirmar o host pela impressão digital viva (ver `infra/HOSTS.md`),
somente leitura, nunca `UPDATE`, `INSERT` ou DDL.

Se você chegou aqui achando que precisa de acesso ao banco para analisar uma
conta, provavelmente o que falta é escopo no seu `META_ACCESS_TOKEN`. Peça
`ads_read` na conta ao dono da Business Manager e volte para a seção 3.1.

---

## 4. Overlay de compliance (sempre aplicar)

Antes de marcar qualquer criativo/LP como aproveitável, passe pelo filtro do nicho:

- **Saúde → CFM (rígido):** PROIBIDO promessa de resultado ("livre-se da dor", "fim da dor",
  "cura"), termo "regenerativa"/"ortopedia regenerativa", **testemunho/depoimento de paciente
  em ad pago**, segmentação/afirmação por condição pessoal ("você sofre com artrose?"). Depoimento
  pode viver no orgânico, mas como **ad pago é risco** — marcar ⚠️. Conferir o mapa de
  posicionamento do próprio cliente (ex.: `06-Documentos/Posicionamento_*.md`).
- **Fora de saúde → posicionamento da marca + Meta policy:** sem promessa de ganho financeiro
  como headline de ad ("R$200 mil em 4 minutos", "de R$9,90 a R$25 mil"), sem renda garantida,
  sem afirmação por condição pessoal. O gancho pode ser ótimo no orgânico e precisar de
  reescrita pra virar ad — marcar ⚠️ "reescrever p/ ad".

Consistência de marca sempre: o criativo diz o que a marca definiu que diz (ex.: "crescimento
previsível", não "fórmula mágica").

---

## 5. Regras de ouro

1. **Nunca inventar número.** Conta sem acesso/banida/fora do token → escrever "gasto só no
   Gerenciador", não estimar. `0 Purchase apesar de dezenas de milhares de LandingPageView` é **evento não
   voltando**, não "não vendeu" — diga isso.
2. **Confirmar o objetivo REAL adset a adset** (`optimization_goal`/`promoted_object`), nunca
   pelo nome da campanha (LRN-20260703-008).
3. **Segredo nunca impresso** — token/chave só em memória; só a resposta do Graph/Apify aparece.
4. **Schema-check antes de query nova** na Verdash (`information_schema.columns`).
5. **Só leitura, sempre.** A skill lê; ela não altera campanha, conjunto nem anúncio. O fluxo
   padrão (§3.0) nem toca em servidor. Se você acabou no apêndice §3.6, a régua é a mesma:
   confirmar o host antes, e nada de `UPDATE`, `INSERT` ou DDL.
6. **Código e asset do cliente ficam no repositório do cliente.** No `tektus-operacao`, a pasta
   de cada cliente guarda documentação; criativo em imagem e código de LP não entram (ver
   `agencia/clientes/_INDEX.md`). A skill versiona normalmente.
7. **TL;DR honesto** — o achado central primeiro (ex.: "o nó não é criativo nem verba, é
   rastreamento"). O doc serve pra decidir, não pra impressionar.

---

## 6. Fluxo (na ordem)

1. **Ler o que já existe do cliente** — `README.md`, `_reunioes/kickoff`, docs de
   `06-Documentos/` (posicionamento, produtos/ticket). Entender o negócio e o produto que paga a conta.
2. **Confirmar os IDs** — BM, conta(s) de anúncio (`act_<id>`), página, Instagram (@handle + ID),
   pixel, WABA. Sem os IDs certos, tudo puxa errado.
3. **Puxar as fontes** (§3): Graph (metadados → curva → campanhas → adsets → pixels → LPs dos
   criativos) + Apify (perfil) + Biblioteca de Anúncios + fetch das LPs/site/checkout. Complementar com Verdash.
4. **Cruzar** com posicionamento da marca + overlay de compliance (§4) — marcar criativos e mensagens fora da marca.
5. **Escrever os 3 docs** (§2) com tabelas de números REAIS, achados, riscos, plano de
   transição, e **"Método (reprodutível)"** no fim de cada um.
6. **Listar as perguntas pro humano** (o que só o cliente/gestor responde: CAPI do checkout,
   churn/LTV, quem paga as LPs, verba, posse da BM) — não travar o doc esperando resposta, deixar explícito.

---

## Apêndice — o tipo de achado que só aparece na fonte

Estes padrões se repetem, e nenhum deles aparece olhando só o painel de BI:

- **Conta fragmentada com uma banida.** Várias contas para o mesmo negócio, uma
  delas desativada por integridade, com o motivo não exposto pela Meta. O gasto
  dessa conta some do token e existe apenas no Gerenciador. O pixel pode estar
  saudável e no portfólio, portanto não preso à conta banida, o que muda
  completamente o plano de transição.
- **Rastreio de venda furado por checkout cross-domain.** Dezenas de milhares de
  `LandingPageView` e zero `Purchase`, porque o checkout mora em domínio de
  terceiro e o evento nunca volta. Isso é evento não voltando, nunca "não
  vendeu". A diferença entre os dois diagnósticos vale a conta inteira.
- **Duas motions convivendo na mesma conta.** Geração de lead respondendo pela
  maior parte do gasto e um self-checkout rodando em paralelo, sem que ninguém
  tenha percebido que são funis diferentes disputando a mesma verba.
- **Snapshot que finge ser histórico.** A camada de BI trazendo um único dia de
  gasto enquanto a conta tem anos de investimento. Quem compara os dois números
  descobre a diferença; quem confia no painel propõe verba errada.
