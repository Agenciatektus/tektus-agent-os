---
description: "Gestão de Memória e Economia de Tokens através do arquivo de estado."
globs: "**/*"
alwaysApply: true
---

# 🧠 Economia de Tokens & Memória (LENS + STATE)
Para garantir que o agente não precise re-ler todo o diretório a cada comando, utilizamos o **Context Lens** (indexação semântica) e o **Estado do Workspace** (memória persistente).

## 🔍 Antes de Iniciar Qualquer Tarefa (Obrigatório)
1. **Sempre chame o MCP `lens_context`** com sua query/pergunta. 
   - Use o contexto retornado pelo Lens como fonte primária.
   - Isso economiza ~80% de tokens ao evitar a leitura de arquivos irrelevantes.
2. **Leia** o arquivo `.agents/WORKSPACE_STATE.md` se precisar de contexto sobre o estado da colaboração the team.
3. Só use `list_dir` recursivo ou `view_file` direto em arquivos grandes se o Lens não trouxer o detalhe necessário.

## 📝 Após Concluir uma Tarefa
1. **Atualize** o arquivo `.agents/WORKSPACE_STATE.md` com as novas decisões e caminhos.
2. O Lens sincroniza automaticamente via `lens watch` (se ativo) ou na próxima indexação.

> [!TIP]
> O Context Lens permite que o agente tenha visão de "raio-x" do projeto sem custar caro. Use-o sempre.

