---
name: humanizer
description: |
  Remove sinais de texto gerado por IA e deixa a escrita mais natural em PT-BR.
  Use ao criar ou revisar mensagens de prospecção (WhatsApp), copy comercial,
  respostas de negociação, prompts de edge function, relatórios voltados a cliente
  e qualquer texto que um humano vai ler. Base técnica: Wikipedia "Signs of AI
  writing" (WikiProject AI Cleanup). Repositório upstream (MIT):
  https://github.com/blader/humanizer — instalar/atualizar com:
  `git clone https://github.com/blader/humanizer.git ~/.claude/skills/humanizer`
---

# Humanizer (Tektus/Verdash)

Ao editar texto em **português (Brasil)** para leitura humana (WhatsApp, e-mail comercial, relatório de cliente, mensagem interna):

1. Escreve o rascunho com fatos e estrutura.
2. Roda o **passe rápido** (lista abaixo) — 30-60 segundos.
3. Roda o **passe fino** — releia buscando os padrões estruturais.
4. Faz o **teste de voz** — leia o texto em voz alta na sua cabeça. Onde parece jargão, corte.
5. Só entrega depois disso.

Nunca pular passes 3-4 quando o texto for pra cliente ou for exposto publicamente.

---

## 🚫 Padrões proibidos (banidos por reincidência)

Cada item aqui é AI-tell que apareceu em produção e foi corrigido pelo Peterson. Reincidência é violação de protocolo — vira LRN novo.

### Pontuação e separadores

- **Middot `·` como separador inline** (LRN-20260723-001). Use vírgula, ponto ou parênteses.
  - ❌ `R$ 5,16/dia · 9 ads · 7 dias · CPS R$ 2,50`
  - ✅ `R$ 5,16/dia, 9 ads, 7 dias, CPS de R$ 2,50`
- **Middot `·` como marca de bullet.** Use `-` (traço) ou `*` (asterisco) em markdown.
  - ❌ `· Baseline CPL R$ 24,82`
  - ✅ `- Baseline CPL R$ 24,82`
- **Travessão longo `—` em cadeia** no lugar de vírgula ou ponto. Se o texto tem 3+ travessões, corta e usa pontuação normal.
  - ❌ `A campanha rodou — com CTR de 4% — e trouxe leads — todos qualificados.`
  - ✅ `A campanha rodou com CTR de 4% e trouxe leads qualificados.`
- **En-dash `–` no meio da frase.** Não é usado em PT-BR. Trocar por vírgula ou traço curto `-`.

### Estruturas retóricas

- **"Não é (só) X, é Y" / "não X, mas Y"** (LRN antigo do Peterson). Diz na afirmativa direta.
  - ❌ `Não é sobre CPL, é sobre CPA real.`
  - ✅ `O que importa é o CPA real.`
- **Regra de três forçada** (adjetivo, adjetivo, adjetivo).
  - ❌ `Rápido, escalável e confiável.`
  - ✅ `Roda em produção há 6 meses sem cair.`
- **Variação elegante** (trocar sinônimo pra "não repetir palavra"). Repetir palavra é humano; sinônimo forçado é IA.
- **Listas com negrito + dois-pontos estilo slide.** Só use se estiver de fato apresentando slide.
  - ❌ `**Performance:** CTR 4%. **Custo:** R$ 0,21. **Volume:** 660 cliques.`
  - ✅ `CTR 4%, CPC R$ 0,21, 660 cliques.`
- **Gerúndio encadeado** só pra parecer profundo.
  - ❌ `Refletindo o momento, evidenciando o padrão, simbolizando a mudança.`
  - ✅ `O padrão mudou por causa disso.`

### Peso falso e conectivos de relatório

- **Peso falso:** "momento crucial", "papel vital", "no cenário atual", "é fundamental/pivotal", "vale a pena destacar".
- **Conectivos de relatório:** "Além disso", "Adicionalmente", "Vale ressaltar", "É importante mencionar", "Nesse contexto".
- **Atribuição vaga:** "especialistas dizem", "o mercado tem notado", "estudos mostram" (sem citar o estudo).
- **Tom de chatbot:** "Espero que ajude", "Fico à disposição", "Ótima pergunta!", "Segue abaixo", "Perfeito!". Chega direto no ponto.

### Vocabulário frequente em LLM PT-BR (banido)

alinhar, panorama, potencializar, robusto, jornada (quando vazio), intricado, destacar (verbo), cenário, landscape, sinergia, viabilizar, entregar valor, mindset, alavancar, potencial, ecossistema, orquestrar.

---

## ✅ O que preferir

- **Verbos simples:** é, tem, faz, vi que, notei, roda, cai, sobe, custa.
- **Cena concreta + número real** em vez de generalidade (LRN `copy_paupavel_sempre_tektus`).
  - ❌ `A campanha teve boa performance.`
  - ✅ `Sábado 12/07 o INICIAL-B teve CTR 4,33% e trouxe 3 SignUps.`
- **Opinião ou ressalva quando couber.** Texto neutro demais soa IA.
- **Ritmo variado.** Frase curta. Frase média com pausa. Frase mais longa que carrega um contexto inteiro. Cadência humana tem oscilação.
- **1-2 emojis no máximo** em mensagem curta e só se combinar com o tom da agência. Nunca 3+.
- **Voz Tektus:** parabeniza a iniciativa, não agradece (LRN `tektus_voz_parabeniza_nao_agradece`). Do outro lado, quando é Peterson escrevendo em 1ª pessoa, checar se a afirmação foi confirmada (LRN `copy_nao_inventar_afirmacao_do_peterson`).

---

## 5 vícios estruturais catalogados (Millena Nóbrega)

Aplicar no passe fino:

1. **"Não é sobre X, é sobre Y"** — apaga a estrutura e afirma direto.
2. **Bullets pra tudo** — se os itens formam ideia contínua, escreve em frase única.
3. **Adjetivos empilhados** — "poderoso, transformador, revolucionário" são 3 palavras dizendo a mesma coisa vazia. Troca por caso concreto (com número, quando existir).
4. **Todas as frases começam iguais** — anáfora monótona ("Você precisa... Você vai... Você deve..."). Varia sujeito e estrutura.
5. **Superexplicação do óbvio** — se o leitor já sabe, corta.

---

## Checklist final obrigatório (30 segundos)

Antes de entregar, releia caçando cada item:

- [ ] Zero `·` middot como separador ou bullet
- [ ] Zero travessão `—` em cadeia (máx 1 no texto inteiro)
- [ ] Zero "não é X, é Y" ou "não só X, mas Y"
- [ ] Zero conectivo de relatório ("Além disso", "Vale ressaltar")
- [ ] Zero vocabulário LLM (alinhar, robusto, jornada vazia, etc.)
- [ ] Zero adjetivo empilhado sem número que sustente
- [ ] Pelo menos 1 número, data ou nome concreto no texto (evidência)
- [ ] Ritmo varia (não são todas as frases do mesmo tamanho)
- [ ] Se copia em nome do Peterson, cada afirmação em 1ª pessoa foi confirmada

Falhou 1 item? Reescreve o trecho antes de enviar.

---

## Contexto WhatsApp/B2B curto

Mensagem pra grupo ou 1-1 no WhatsApp segue regras extras:

- **Sem introdução ceremonial** ("Espero que este email te encontre bem"). Vai direto no que interessa.
- **Sem despedida formal** ("Atenciosamente", "Cordialmente"). "Abraço", "Valeu", ou nada.
- **Sem `>` de quote citando a mensagem anterior** a não ser que o assunto exija.
- **Formatação WhatsApp nativa:** `*negrito*` em números-chave e títulos de seção. `_itálico_` em ênfase leve. Nunca `**negrito duplo**` (é markdown, não renderiza no WA).
- **Quebras manuais de linha** só se a mensagem for muito longa e precisar respirar. WhatsApp faz o wrap sozinho — quebra manual excessiva vira sinal de bloco copiado de outro lugar.

---

## Referência completa (inglês)

Patterns numerados, exemplos antes/depois e "soul pass": ver `SKILL.md` em [blader/humanizer](https://github.com/blader/humanizer).

---

## Uso no Cursor / Antigravity

Skill mora em `skills/humanizer` (raiz do repo), lida pelos 3 IDEs. Não precisa espelhar em `.cursor/skills/` ou `.agents/skills/` porque o caminho raiz já cobre.

Se algum agente rodar sem contexto da raiz e precisar da skill localmente, copiar a pasta.

---

## LRNs relacionados

- `[[copy_nao_inventar_afirmacao_do_peterson]]` — 1ª pessoa só quando confirmado.
- `[[copy_paupavel_sempre_tektus]]` — cena concreta + dinheiro, nunca abstrato.
- `[[tektus_voz_parabeniza_nao_agradece]]` — voz Tektus não agradece na abertura, parabeniza.
- `[[feedback_usar_arsenal_completo]]` — humanizer é passo final, não substitui análise/copy anteriores.
- LRN-20260723-001 — middot proibido (registrado nesta versão).
