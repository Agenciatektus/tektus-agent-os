---
description: "Diretivas gerais de comportamento, linguagem e organização de arquivos."
globs: "**/*"
alwaysApply: true
---

# 📌 Diretivas Gerais
- Sempre responda em **pt-BR**.
- **Proatividade Git**: No início de cada sessão, verifique o status do repositório (`git fetch`). Se houver mudanças, pergunte se pode atualizar (`git pull`).
- Prefira soluções simples, sem introduzir novas libs/tecnologias sem necessidade.
- Evite duplicação de código; verifique primeiro se já existe solução semelhante.
- Considere ambientes **dev / test / prod** ao escrever código.
- Nunca sobrescreva `.env` sem confirmação explícita.

# 📂 Organização de Código
- Divida arquivos >300 linhas ou funções >50 linhas (exceto arquivos de tipagem, mocks ou configs gerados automaticamente).
- Use Conventional Commits (`feat: ...`, `fix: ...`, etc.) nos commits.

# 🧹 Pós-implementação
- Escreva uma reflexão de 1–2 parágrafos sobre escalabilidade e manutenção.
- Sugira melhorias ou próximos passos, se aplicável.
