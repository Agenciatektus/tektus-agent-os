---
name: meta-ads-api
description: |
  Consome `campaign-spec.yaml` (output da Fase 4 do BP paid-launch) e cria
  campanhas pausadas no Meta Ads via Marketing API. Suporta Advantage+
  (ASC+), CBO, ABO, Lookalike audiences, custom audiences. Devolve IDs
  + link de revisão pra aprovação humana antes de ativar.
  ⚠️ STATUS: SPEC apenas. Implementação requer test em conta sandbox + tratamento de erros + retry/idempotência.
type: api-wrapper
version: 0.1.0-spec
---

# meta-ads-api

> ⚠️ Esta skill está em **estado de SPEC**, não implementada. O documento abaixo
> descreve a interface, comportamento esperado e armadilhas. Antes de
> implementar, leia inteiro e valide com `skill-vetter` (regra 10).

## When to use

Use quando:
- Tem `campaign-spec.yaml` validado pela Fase 4 do BP `paid-launch`
- Tracking validado em DebugView (BP `pixel-setup` Fase 6)
- Cliente autorizou explicitamente upload via API (consent crítico — orçamento dele em jogo)
- Conta tem token de Business System User com escopo `ads_management`

NÃO use quando:
- Conta nova sem histórico — Meta exige seasoning manual antes
- Volume de campanhas < 3 — manual pelo `marcos-meta` é mais rápido
- Cliente em conta de agência (BM compartilhado) sem permissão escrita

## Inputs

```yaml
campaign_spec:
  source: path/to/campaign-spec.yaml      # da Fase 4 paid-launch
  account_id: "act_XXXXXXXXX"             # ad account
  business_id: "XXXXXXXXX"                 # BM
  page_id: "XXXXXXXXX"                     # FB page (cliente)
  instagram_id: "XXXXXXXXX"                # IG account (cliente)
  pixel_id: "XXXXXXXXX"                    # Pixel ID validado em pixel-setup
auth:
  access_token_env: "META_ADS_TOKEN"      # nome da env var (NUNCA hardcode)
options:
  start_paused: true                       # default true — sempre sobe pausado
  rollback_on_error: true                  # se falha no meio, deleta tudo criado
  max_campaigns_per_run: 5                 # safety cap
  dry_run: false                           # se true, valida spec sem chamar API
```

## Comportamento esperado

### 1. Pre-flight checks
- Validar token: GET /me/permissions → exige ads_management + business_management
- Validar account_id: GET /act_XXX → confirmar acesso
- Validar pixel_id: GET /act_XXX/customaudiences → pixel acessível
- Se qualquer check falha → STOP, reporta, NÃO cria nada

### 2. Parse spec
- Lê `campaign-spec.yaml` (formato definido na Fase 4 do paid-launch BP)
- Valida schema (todas as campanhas têm naming, budget, audiences, creatives)
- Naming convention obrigatória: `[Funil]_[Objetivo]_[Persona]_[Data]_[Variante]`
- Se naming inválido → STOP

### 3. Create campaigns (idempotente)
Por campanha do spec:
- POST /act_XXX/campaigns → cria campanha com `status: PAUSED`
- POST /act_XXX/adsets → cria adset (1-3 max amplos, CBO ou ASC+)
- Upload de creatives:
  - POST /act_XXX/adimages para statics
  - POST /act_XXX/advideos para vídeos
  - Aguardar status `ready` antes de criar Ad
- POST /act_XXX/ads → cria ad com creative_id

Idempotência:
- Cada item criado é registrado em `state/{run_id}/created.json`
- Se script roda 2x com mesmo run_id, NÃO duplica — verifica state primeiro
- Se item já existe, atualiza ao invés de recriar

### 4. Rollback on error
Se qualquer POST falha:
- Lê `created.json` do run atual
- DELETE em ordem reversa (ads → adsets → campaigns)
- Reporta o que foi criado e desfeito
- Exit 1 com erro detalhado

### 5. Output
```yaml
run_id: 2026-04-26-1900-meta-upload
status: success | partial | failed
campaigns_created:
  - id: "23842042424242"
    name: "TOPO_LEADGEN_SALOES_2026Q1_WAVE1"
    status: PAUSED
    review_url: "https://business.facebook.com/adsmanager/manage/campaigns?act=XXX&selected_campaign_ids=23842042424242"
adsets_created: 3
ads_created: 12
errors: []
warnings:
  - "Creative 'topo-v3-static' tem texto sobre 20% da imagem (Meta penaliza)"
next_step: "Revisar URLs acima. Após aprovação humana, alterar status pra ACTIVE manualmente OU rodar `meta-ads-api activate <run_id>`."
```

## Armadilhas críticas

### 1. Token revoga
Tokens de System User têm validade longa (60d+ refreshable) mas Meta às vezes revoga sem aviso. Sempre tratar 401 com mensagem clara: "Token Meta inválido — peça novo ao admin do BM."

### 2. Budget caps de conta nova
Conta Meta nova tem cap diário automático (~R$ 100/dia). Se spec pede mais → erro silencioso (campanha cria, mas Meta limita gasto). Antes de subir budget alto, verificar `account_status` + `spend_cap`.

### 3. Ad Review demorado
Meta revisa criativos em até 24h. Ads em "PENDING_REVIEW" não rodam. Spec deve subir 24h antes do go-live. Não tente "ativar agora" se review pendente.

### 4. CAPI events mismatch
Se pixel-setup não tá completo, Meta sub-reporta conversões. Skill DEVE checar `pixel_setup_completed: true` no spec antes de prosseguir.

### 5. Naming-collision
Se naming convention bate com campanha existente, Meta cria duplicata silenciosa. Skill deve checar duplicata por nome ANTES de criar.

### 6. Rate limits
Marketing API tem rate limit (~200 calls/hour por user). Bulk de 100 ads excede facilmente. Skill DEVE implementar exponential backoff + retry após 429.

### 7. Imagens com texto > 20%
Meta historicamente penalizava (deprecated mas ainda warna). Skill flagga como warning, não erro.

## Quality Criteria

- [ ] Token via env var (jamais hardcode)
- [ ] Pre-flight validation completa antes de qualquer POST
- [ ] Idempotência via run_id + state file
- [ ] Rollback automático em falha
- [ ] Status sempre PAUSED ao criar (humano ativa depois)
- [ ] Naming-collision check antes de criar
- [ ] Rate limit handling (retry + backoff)
- [ ] Output com review_url pra cada campanha
- [ ] Logs estruturados (timestamp + ação + resultado) em arquivo

## Implementação — onde começar

Stack sugerida: Node.js + facebook-nodejs-business-sdk OU Python + facebook-business

```bash
npm install facebook-nodejs-business-sdk
# OR
pip install facebook-business
```

Skeleton de código fora do escopo deste spec — implementação merece sessão dedicada com:
- Test account (Meta Sandbox) configurada
- Cassiano-criativo + marcos-meta validando outputs reais
- skill-vetter aprovando antes de subir em conta de cliente

## Dependencies

- best-practice `paid-launch` — formato do `campaign-spec.yaml` é definido aqui
- best-practice `pixel-setup` — pré-condição (tracking validado)
- best-practice `secure-coding` — handling de token, retry, idempotência
- squad `Cyber-Security` (@Iris_CISO + @Davi_DevSecOps) — review obrigatório antes de ir pra conta de cliente
- skill `skill-vetter` — vetting da implementação real

## Roadmap

- v0.1.0 (atual) — SPEC apenas, este documento
- v0.2.0 — implementação básica com Advantage+ campanhas só
- v0.3.0 — adiciona CBO/ABO + Lookalikes
- v0.4.0 — adiciona Custom Audiences + retargeting
- v1.0.0 — completo + tested em produção em ≥3 contas reais com 0 incidentes 30d
