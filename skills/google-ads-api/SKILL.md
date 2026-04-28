---
name: google-ads-api
description: |
  Consome `campaign-spec.yaml` (Fase 4 do BP paid-launch) e cria
  campanhas pausadas no Google Ads via Google Ads API. Suporta
  Performance Max, Search, Display, YouTube Ads. Devolve resource
  names + link de revisão pra aprovação humana antes de ativar.
  ⚠️ STATUS: SPEC apenas. Implementação requer test em conta sandbox
  (Google Ads API não tem sandbox real — usa conta de teste com flag
  `test_account: true`).
type: api-wrapper
version: 0.1.0-spec
---

# google-ads-api

> ⚠️ Esta skill está em **estado de SPEC**, não implementada. Antes de
> implementar, leia inteiro e valide com `skill-vetter` (regra 10).

## When to use

Use quando:
- Tem `campaign-spec.yaml` validado pela Fase 4 do BP `paid-launch`
- Tracking validado em DebugView com Enhanced Conversions ativo (BP `pixel-setup`)
- Cliente autorizou explicitamente upload via API
- MCC (My Client Center) tem developer token e refresh_token configurados
- Conta-alvo está linkada ao MCC

NÃO use quando:
- Conta Google Ads recém-criada (Google exige observação inicial manual)
- Cliente sem MCC configurado (MCC é pré-requisito pra API access)
- Volume de campanhas <2 — manual pelo `gabriel-google` é mais rápido

## Inputs

```yaml
campaign_spec:
  source: path/to/campaign-spec.yaml
  customer_id: "1234567890"            # Google Ads customer ID (sem hífens)
  manager_customer_id: "9876543210"    # MCC ID
  conversion_action_resource: "customers/1234567890/conversionActions/12345"
auth:
  developer_token_env: "GOOGLE_ADS_DEVELOPER_TOKEN"
  client_id_env: "GOOGLE_OAUTH_CLIENT_ID"
  client_secret_env: "GOOGLE_OAUTH_CLIENT_SECRET"
  refresh_token_env: "GOOGLE_ADS_REFRESH_TOKEN"
options:
  start_paused: true                    # default true
  rollback_on_error: true
  validate_only: false                  # se true, valida sem criar
  test_account: false                   # true se cliente é test account
```

## Comportamento esperado

### 1. Pre-flight checks
- Valida credentials: chamar customer.list_accessible_customers
- Customer_id existe no MCC
- Conversion action existe e tá ENABLED
- Se test_account=true, conta tem flag `test_account: true` (Google API restringe não-test em ações destrutivas em dev)
- Se qualquer check falha → STOP

### 2. Parse spec
- Lê `campaign-spec.yaml`
- Valida que campaigns têm tipo definido (PERFORMANCE_MAX | SEARCH | DISPLAY | VIDEO)
- Naming convention: `[Funil]_[Objetivo]_[Persona]_[Data]_[Variante]`

### 3. Create campaigns (Google Ads é trickier que Meta)
Google Ads API exige **mutate operations agrupadas**. Por campanha:
- Campaign budget (CampaignBudgetService.mutate)
- Campaign (CampaignService.mutate, status: PAUSED)
- Para Performance Max:
  - Asset Group (AssetGroupService.mutate)
  - Asset Group Assets (text, image, video, etc.)
  - Audience signals (linka customer match list ou interests)
- Para Search:
  - Ad Group (AdGroupService.mutate)
  - Keywords (AdGroupCriterionService.mutate)
  - Ad (AdGroupAdService.mutate)
- Conversion goals (CustomerConversionGoalService.mutate) — atrelados às campanhas

Idempotência: registrar resource_names criados em `state/{run_id}/created.json`.

### 4. Rollback on error
Google Ads API NÃO tem DELETE em todas as operações — algumas só permitem `REMOVED` status. Skill deve:
- Para campaigns: status REMOVED (efetivamente deleta)
- Para asset groups: status REMOVED
- Para keywords: status REMOVED
- Logs detalhados do que foi tentado vs revertido

### 5. Output
```yaml
run_id: 2026-04-26-1900-google-upload
status: success | partial | failed
campaigns_created:
  - resource_name: "customers/1234567890/campaigns/22222222"
    name: "TOPO_PMAX_SALOES_2026Q1"
    type: PERFORMANCE_MAX
    status: PAUSED
    review_url: "https://ads.google.com/aw/campaigns?ocid=XXX&campaignId=22222222"
asset_groups_created: 3
keywords_added: 47
errors: []
warnings:
  - "Performance Max sem 'final URL expansion' explícita — Google pode expandir pra páginas indesejadas"
next_step: "Revisar campanhas no link acima. Após aprovação, ativar manualmente OU `google-ads-api activate <run_id>`."
```

## Armadilhas críticas

### 1. Developer token approval
Google exige que o developer token seja **approved** antes de uso em conta de produção. Token recém-criado é "TEST" e só funciona em test accounts. Production approval pode demorar 1-7 dias.

### 2. Conversion tracking obrigatório
Google penaliza campanhas sem conversões trackadas — Smart Bidding falha sem dado. Skill DEVE checar que pelo menos 1 ConversionAction está ENABLED + tem dados nos últimos 30 dias.

### 3. Performance Max é caixa-preta
PMax otimiza tudo automaticamente. Você não controla muito. Naming convention + Asset Group structure são as únicas alavancas. Não tente forçar segmentação manual em PMax — vai contra o design.

### 4. Quotas e rate limits
Google Ads API tem 3 níveis de quota: developer token tier (Basic/Standard/Test), por customer (15.000 ops/dia free), por minuto. Bulk uploads podem hit limit. Implementar batch sizes apropriados (max 5000 ops por request).

### 5. Negative keywords não vão pra Performance Max diretamente
PMax exige adicionar negative keywords no level de account, não campaign. Spec deve refletir isso.

### 6. Mudança de campaign type não é permitida
Uma vez criada como PERFORMANCE_MAX, não vira SEARCH. Cuidado em rollback: status REMOVED não devolve "fresh" — tipo fica preso pra sempre.

### 7. Account validation requer cobertura mínima
Google bloqueia campanhas em contas com:
- Ausência de billing setup
- Domain verification pendente
- Politicas violadas em campanhas anteriores
Skill DEVE validar account_status antes de prosseguir.

## Quality Criteria

- [ ] Credentials via env vars (NUNCA hardcode)
- [ ] Pre-flight: developer_token approval status verificado
- [ ] Conversion actions ativas e com data (≥30d)
- [ ] Customer in MCC (managed)
- [ ] Idempotência via run_id + state file
- [ ] Rollback usando status REMOVED em vez de DELETE
- [ ] Status sempre PAUSED ao criar
- [ ] Naming-collision check
- [ ] Quota awareness (não hit 15k ops em 1 request)
- [ ] Output com review URL Google Ads UI

## Implementação — onde começar

Stack sugerida: Python + google-ads ou Node.js + google-ads

```bash
pip install google-ads
# OR
npm install google-ads-node
```

Setup em: https://developers.google.com/google-ads/api/docs/start

Pré-requisitos críticos:
- MCC configurado
- Developer token aplicado e aprovado (1-7 dias de wait)
- OAuth refresh token gerado
- Conta de teste pra dev

Skeleton fora do escopo deste spec — implementação merece sessão dedicada com:
- Test account ativa
- gabriel-google validando outputs reais
- skill-vetter aprovando

## Dependencies

- best-practice `paid-launch` — formato do `campaign-spec.yaml`
- best-practice `pixel-setup` — Enhanced Conversions ativo
- best-practice `secure-coding` — handling de token, OAuth, retry
- squad `Cyber-Security` — review obrigatório
- skill `skill-vetter` — vetting da implementação real

## Roadmap

- v0.1.0 (atual) — SPEC apenas
- v0.2.0 — Performance Max only (mais simples)
- v0.3.0 — adiciona Search + keywords
- v0.4.0 — adiciona Display + YouTube
- v1.0.0 — completo + tested em ≥3 contas reais 30d zero incidentes
