---
name: lgpd-saas
description: Auditoria e adequação LGPD para SaaS e landing pages (PT-BR, Brasil). Use quando o pedido envolver conformidade LGPD, privacidade, banner/consentimento de cookies, aceite de termos, direitos do titular (art. 18), política de privacidade/cookies, DPO/encarregado, ou "deixar o produto respaldado legalmente". Cobre auditoria (checklist), correção (componentes prontos) e templates. Base: palestra Ana Rita Marciano (Privacy by Design) + implementação de referência no verdash-web.
type: prompt
version: 1.0.0
---

# LGPD para SaaS — Auditoria & Adequação

Kit reutilizável da Tektus para deixar qualquer produto (SaaS ou landing page)
respaldado na LGPD. Nasceu da adequação do Verdash; serve para qualquer cliente.

**Fluxo:** Auditar (checklist) → Corrigir (componentes + templates) → Documentar
(registro de consentimento + canal do titular). Para código, invocar `@Cassio_SecRev`
e aplicar `secure-coding`. Texto legal em PT-BR passa pelo `humanizer`.

## Princípios que guiam toda decisão (Privacy by Design)

1. **Privacidade como padrão** — o usuário não precisa configurar nada pra estar protegido. Cookies opcionais vêm **desmarcados**; tracking só dispara após consentimento.
2. **Consentimento livre, informado e inequívoco** — nunca tácito, nunca pré-marcado. Um "Rejeitar" tão fácil quanto o "Aceitar" (senão a ANPD invalida o consentimento).
3. **Minimização** — coletar só o dado necessário à finalidade. Cada campo de formulário precisa justificar-se.
4. **Base legal correta** — consentimento é a mais frágil e a última opção. Cadastro/pagamento = execução de contrato; retenção fiscal = obrigação legal; medição própria = legítimo interesse (com cautela). Consentimento fica para cookies de marketing/analytics.
5. **Transparência** — dizer quais dados, para quê, com quem se compartilha (Meta, Google, etc.), onde hospeda, e se há transferência internacional.
6. **Segurança de ponta a ponta** — criptografia, anonimização, rastreabilidade de acesso.
7. **Canal do titular que FUNCIONA** — não citar e-mail/canal que não existe. Canal falso é risco maior que a ausência.

## Passo 1 — Auditoria (checklist)

Rode este checklist contra o produto. Marque ✅ / 🟡 / ❌ e cite arquivo:linha.

**Documentos**
- [ ] Política de Privacidade, Termos de Uso e Política de Cookies existem e são acessíveis (footer).
- [ ] Cada uma tem data de atualização e identifica controladora/operadora.
- [ ] Base legal declarada (art. 7º / 11 para dados sensíveis).
- [ ] Direitos do titular (art. 18) descritos.
- [ ] Não há contradição entre as políticas (ex.: uma diz que usa pixel, outra que não).

**Consentimento**
- [ ] Banner de cookies com opt-in real (opcionais desmarcados, "Rejeitar" a 1 clique).
- [ ] Nenhum pixel/analytics dispara antes do consentimento (gate).
- [ ] Consentimento reaberto/revogável a qualquer momento.
- [ ] Aceite explícito de Termos+Privacidade no cadastro/checkout (checkbox, não tácito).
- [ ] Aceite registrado de forma auditável (versão dos termos + timestamp; IP server-side).

**Direitos do titular**
- [ ] Canal do titular existe e funciona (formulário e/ou WhatsApp — não e-mail fantasma).
- [ ] Formulário DSR: acesso, correção, exclusão, portabilidade, revogação.
- [ ] Prazo de resposta declarado (praxe: 15 dias).

**Dados & segurança**
- [ ] Minimização: formulários coletam só o necessário.
- [ ] Dados sensíveis (saúde, biometria, etc.) — evitar; se coletar, tratamento reforçado.
- [ ] Criptografia em repouso/trânsito; multi-tenant isolado (RLS).
- [ ] Rotina de exclusão automática ao fim do prazo legal (privacy by design — sem o titular pedir).
- [ ] Transferência internacional informada (servidor/subprocessador fora do BR: Meta CAPI, Google, Stripe, Vercel...).

**Governança**
- [ ] DPO/encarregado — micro/pequena empresa é dispensada (Resolução ANPD nº 2), MAS o canal do titular continua obrigatório.
- [ ] Plano de resposta a incidente (72h para conter + notificar; relatório assinado).
- [ ] Lista de subprocessadores.

## Passo 2 — Correção (componentes de referência)

Implementação canônica no `verdash-web` — copiar e adaptar:

- **Consentimento**: `src/lib/consent.ts` (modelo por categorias, versão, timestamp), `src/components/consent/` (`CookieConsent` banner, `useConsent`, `ConsentGate`, `CookiePrefsLink`). Todo pixel vai dentro de `<ConsentGate category="marketing">`.
- **Aceite no checkout**: checkbox obrigatório + links + envio de `consent_terms_version` e `consent_accepted_at` no payload.
- **DSR do titular**: página `/privacidade/solicitacao` (form → edge `*-dsr-public` com fallback WhatsApp).
- **Backend (Fase B)**: edge pública que grava a solicitação + tabela `dsr_solicitacoes` e `consent_log` (com RLS insert-only anon). Deploy com schema-check (regra ODP) na infra do cliente.

## Passo 3 — Templates de texto (PT-BR, passar no humanizer)

Estrutura mínima de cada documento (adaptar nome da controladora/operadora por cliente):
- **Privacidade**: quem somos (controladora/operadora) · dados coletados · base legal · finalidade · compartilhamento (listar plataformas de ads) · cookies · transferência internacional · direitos art. 18 · segurança · retenção · canal do titular · ANPD.
- **Cookies**: 3 categorias (essenciais / análise / marketing) · o que cada uma faz · como gerenciar · plataformas de anúncio · transferência internacional.
- **Termos**: objeto · conta · pagamento · SLA · responsabilidades · LGPD (remete à privacidade) · foro.

## Anti-patterns (rejeitar sempre)

- Cookie opcional **pré-marcado** ou banner só com "Aceitar" (consentimento não-livre → inválido).
- Citar e-mail/canal do titular que **não existe**.
- Carregar pixel/gtag/fbq no `layout` sem gate de consentimento.
- Coletar data de nascimento/CPF/telefone "porque um dia pode ser útil" (viola minimização).
- Prometer em política algo que o produto não faz (ou o contrário).
- Assumir que "todo dado é sensível" — sensível é rol taxativo (origem racial, saúde, biometria, convicção política/religiosa, vida sexual, filiação sindical).

## Para ativar em outro cliente

1. Rode o checklist do Passo 1 no produto do cliente.
2. Copie o kit de consentimento (`consent.ts` + `components/consent/`) e ajuste categorias/token de pixel.
3. Gere as 3 políticas pelos templates do Passo 3, com os dados do cliente, e passe no `humanizer`.
4. Suba o canal do titular (form + WhatsApp do cliente) e a edge/tabela DSR.
5. Auditoria final com `@Cassio_SecRev` antes de publicar.

## Sincronização Cross-IDE

Skill central em `skills/lgpd-saas/`, lida pelos três IDEs. O squad de execução correspondente é o `LGPD-Privacidade`, em `squads/internal/`. A sincronização entre adapters segue a regra `11-cross-ide-sync`.
