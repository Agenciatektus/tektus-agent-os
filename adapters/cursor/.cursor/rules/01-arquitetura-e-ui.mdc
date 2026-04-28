---
description: "Padrões de Arquitetura (Feature-first) e UI (shadcn/ui + Tailwind)."
globs: "**/*.{ts,tsx,css,scss}"
alwaysApply: true
---

# 📚 Arquitetura & Estrutura
- Adote **Feature‐first**: agrupe `components`, `hooks`, `services` dentro de `src/features/<domínio>/`.
- Crie camada `src/shared/` para utilidades reutilizáveis (hooks, UI genérica, helpers).
- Cada domínio deve expor apenas **API pública** (index.ts).
- State management: isole cada slice em `src/store/<domínio>.ts`.

# 📐 Padrões de UI & Componentes
- Use **shadcn/ui + Tailwind tokens**. Use **PascalCase** e exportação nominal.
- Proibido hard-code de hex ou `px`. Use tokens (`text-primary`, `spacing-3`).
- Acessibilidade mínima: Contraste AA, Foco visível, `aria-*` correto.
- Commits de UI: use tags **`ui:`** ou **`fix(ui):`**.
- Antes de grandes mudanças globais em CSS/Tokens, peça confirmação.
