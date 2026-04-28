# Extraction Workflow — extrair sub-projeto privado pra repo público

> **Contexto:** quando você tem um sub-projeto dentro de um monorepo privado
> (ex: docs internos, agente OS, ferramentas) e quer abrir só ele como
> repo público, precisa garantir que **nem um histórico contaminado vaza**:
> IPs reais, paths internos, nomes de cliente, segredos em commits antigos.
>
> `git log -p` revela tudo. Esquecer disso é o erro mais comum.

## Princípio cardinal

> **Histórico ≠ HEAD.** Limpar `HEAD` não basta — o histórico do git mantém
> tudo até alguém rodar `git filter-repo` ou squash.

## Workflow padrão (4 fases)

### Fase 1 — Worktree isolado

```bash
git worktree add ../meu-projeto-public -b extract/meu-projeto-public
```

Por quê: trabalho em árvore separada, sem sujar `main` do monorepo
privado. Se algo der errado, você descarta o worktree.

### Fase 2 — Sanitize sweep

```bash
cd ../meu-projeto-public
node scripts/sanitize-check.js --severity medium
```

Lê padrões de `.sanitize-patterns.yaml`. Bloqueia se achar:

| Categoria | Severidade | Exemplos |
|---|---|---|
| `ips` | high | IPs reais de servidores produção |
| `domains` | high | Domínios de cliente / interno |
| `internal_paths` | medium | `_Infra/`, `SquadAgency/`, monorepo paths |
| `people` | high | Nomes de sócio / equipe / cliente (PII) |
| `clients_and_products` | high | Marcas reais de cliente / produto interno |
| `secrets` | critical | Bearer tokens, sk-*, ghp_*, AWS keys, SSH keys |
| `ephemeral_urls` | medium | sslip.io, nip.io com IP embutido |

**Adapte `.sanitize-patterns.yaml` à sua org** antes de rodar.

### Fase 3 — Squash em branch órfão

```bash
git checkout --orphan clean-main
git add -A
git commit -m "Initial commit — public release"
```

Resultado: 1 commit único, **zero histórico**. Ninguém vê commits antigos
do monorepo privado.

### Fase 4 — Sanity pós-squash + force-push

```bash
# valida de novo (paranoia — paga sempre)
node scripts/sanitize-check.js --severity medium

# remote idealmente recém-criado vazio no GitHub
git remote add public https://github.com/Org/public-repo.git
git push --force public clean-main:main
```

**Idealmente o repo no GitHub é recém-criado** (ou recriado deletando o
antigo). Force-push em repo com histórico antigo deixa o histórico
contaminado em `reflog` por 90 dias.

## Tudo automatizado

Em vez de rodar mão-a-mão, use:

```bash
bash scripts/extract-to-public.sh \
  --src-dir my-subproject \
  --target-remote https://github.com/Org/public-repo.git \
  --branch main
```

O script faz as 4 fases, pede confirmação antes do force-push.

## Configurar `.sanitize-patterns.yaml` pra sua org

Edite a seção `custom` de cada categoria. Exemplo mínimo:

```yaml
ips:
  custom:
    - "192\\.0\\.2\\.42"          # produção
    - "203\\.0\\.113\\.10"        # staging

people:
  custom:
    - "Maria Silva"               # sócia
    - "João Pereira"              # gerente

clients_and_products:
  custom:
    - "Acme Corp"
    - "Project Phoenix"           # codinome interno
```

> **Dica:** comente cada padrão com WHY. 6 meses depois você esquece por
> que `192\.0\.2\.42` está bloqueado.

## Hooks locais (opt-in mas recomendado)

Pra prevenir commits sujos antes mesmo de chegarem em `git push`:

```bash
node scripts/install-hooks.js
```

Instala `pre-commit` + `pre-push` que rodam `sanitize-check.js`
automaticamente. Bypass de emergência:

```bash
SANITIZE_SKIP=1 git commit -m "..."  # use com extrema cautela
```

## CI no GitHub

`.github/workflows/sanitize-check.yml` roda em todo PR e push em `main`.
Falha bloqueia merge + comenta no PR explicando como fixar.

## Quando bypass faz sentido?

Quase nunca. Casos legítimos:

- Sample/exemplo intencional cujo IP é RFC 5737 (`192.0.2.x`, `198.51.100.x`,
  `203.0.113.x`) — adicione regex que ignora explicitamente esses ranges
- Documentação que **cita** o pattern bloqueado (ex: este arquivo) —
  adicione path em `exclude_paths`

## Pós-extração: governance

- ✅ **Code review obrigatório** em PRs no repo público (pelo menos 1 aprovação)
- ✅ **CI sanitize-check** rodando — se falhar, não merge
- ✅ **Audit anual** rodando `node scripts/sanitize-check.js --severity low`
  pra capturar drift
- ✅ **`.sanitize-patterns.yaml`** versionado junto com o código

## Troubleshooting

**"Sanitize check passou local mas falhou no CI."**
→ Padrões de regex podem se comportar diferente em Node versions diferentes.
   Garanta `node-version: '20'` no workflow.

**"Falso positivo em arquivo que cita o pattern intencionalmente."**
→ Adicione o arquivo em `exclude_paths` em `.sanitize-patterns.yaml`.

**"Pre-commit lento em repo grande."**
→ `--staged` já filtra só staged files. Se ainda lento, aumente
   `exclude_extensions` pra ignorar mais binários.

**"Esqueci de configurar `custom` antes do primeiro push."**
→ Não tem como reverter histórico vazado sem `git filter-repo` + force-push +
   convencer todo mundo a re-clonar. Quanto antes detectar, melhor.
