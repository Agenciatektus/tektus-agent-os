---
description: "Padrões de Sincronização e Colaboração via Git/GitHub."
globs: "**/*"
alwaysApply: true
---

# 🤝 Team Collaboration
Este repositório é compartilhado. Para evitar conflitos e perda de trabalho, siga estas regras:

## 🔄 Fluxo de Sincronização
- **Puxar Primeiro**: Sempre execute `git pull --rebase` antes de iniciar qualquer alteração.
- **Commits Pequenos**: Faça commits focados em uma única tarefa. Evite acumular muitas mudanças.
- **Push Constante**: Sempre que terminar uma tarefa (ou parte dela), faça o `push` para o GitHub.

## 🤖 Papel do Agente na Sincronização (Proatividade)
- No início de cada conversa ou após longos períodos, o agente deve rodar silenciosamente `git fetch`.
- Se detectar que o repositório local está atrás do remoto, o agente deve identificar o autor das mudanças (`git log HEAD..origin/master --pretty=format:"%an" -1`) e avisar: 
  > *"Notei que há novas atualizações no escritório feitas por [Nome do Autor]. Posso sincronizar seu ambiente agora?"*
- **Backup antes de puxar**: Se houver alterações locais não commitadas, o agente deve sugerir um `commit` ou `stash` antes de fazer o `pull`.

## 📝 Mensagens de Commit
- Use o padrão definido em `00-diretivas-gerais.mdc` (Conventional Commits).
