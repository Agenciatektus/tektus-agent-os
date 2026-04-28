# WORKSPACE_STATE.md — Memória persistente do projeto

> **O que é este arquivo:** snapshot vivo do estado do projeto, atualizado pelo agente
> ao fim de cada sessão produtiva. Próxima sessão lê isto **antes** de qualquer coisa
> pra recuperar contexto sem reler o repo inteiro.
>
> **Regra cardinal:** uma linha por decisão. Se ficar grande, mover decisões antigas
> pra `docs/decisions/YYYY-MM-DD.md` e manter aqui só os últimos 30 dias.

Last updated: YYYY-MM-DD

---

## 🎯 Foco atual

**Tarefa em andamento:** [breve descrição da feature/épico em curso]

**Próximo passo concreto:** [o que vai ser feito a seguir, sem ambiguidade]

**Bloqueado em:** [nada / aguardando X / decisão pendente sobre Y]

---

## ✅ Decisões recentes (últimos 30 dias)

| Data | Decisão | Motivo | Onde foi feito |
|------|---------|--------|----------------|
| YYYY-MM-DD | [Decisão tomada] | [Por quê — incluir constraint ou trade-off] | [Arquivo / commit / LRN] |
| YYYY-MM-DD | [Outra decisão] | [Motivo] | [Referência] |

> Para histórico completo: `.learnings/LEARNINGS.md`

---

## 📁 Convenções deste repo

- **Idioma de resposta:** [pt-br / en / es]
- **Style guide código:** [link pra style guide se houver]
- **Branch principal:** `main`
- **PR review obrigatório:** [ex.: ✅ por @<reviewer> pra qualquer mudança em código]
- **Commits assinados:** [opcional / obrigatório]
- **Test runner:** `[comando do projeto]`
- **Build:** `[comando do projeto]`
- **Deploy:** [como acontece]

---

## 🔧 Stack ativa

- Frontend: [React / Vue / Svelte / Next.js / etc]
- Backend: [Supabase / Rails / Django / etc]
- Hosting: [Vercel / Coolify / AWS / etc]
- Email: [Migadu / Resend / SES / etc]
- Monitoring: [Uptime Kuma / Beszel / Datadog / etc]

---

## 🚧 Issues / blockers conhecidos

- [ ] [Item 1 com link pra issue ou LRN]
- [ ] [Item 2 — descrever workaround temporário se aplicável]
- [ ] [Item 3]

---

## 🔮 Próximos marcos

| Marco | Quando | Owner |
|-------|--------|-------|
| [Próximo lançamento / fase] | [data ou sprint] | <You> + Agent |
| [Marco seguinte] | [quando] | <You> |
| [Pentest / audit recorrente] | [trimestre] | [squad responsável] |

---

## 📚 Como ler este arquivo

Se você é uma sessão NOVA do agente nesse repo, leia em ordem:

1. **Foco atual** → entende em que estamos trabalhando
2. **Decisões recentes** → entende por que escolhas foram tomadas
3. **Convenções** → adota o estilo do projeto
4. **Issues conhecidos** → não tropeça em problemas já mapeados
5. Depois: lê `.learnings/LEARNINGS.md` (últimas 5 entradas) pra detalhe técnico
