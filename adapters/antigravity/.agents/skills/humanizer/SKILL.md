---
name: humanizer
description: |
  Remove sinais de texto gerado por IA e deixa a escrita mais natural. Use ao criar ou
  revisar: mensagens de prospecção (WhatsApp), prompts da edge `lead-enrichment`, copy
  comercial, relatórios e documentação voltada a cliente. Base técnica: Wikipedia
  “Signs of AI writing” (WikiProject AI Cleanup). Repositório upstream (MIT):
  https://github.com/blader/humanizer — instalar/atualizar com:
  `git clone https://github.com/blader/humanizer.git ~/.claude/skills/humanizer`
---

# Humanizer (PT-BR)

Ao editar texto em **português (Brasil)** para abordagem B2B / WhatsApp:

1. Identifique padrões de IA (lista abaixo).
2. Reescreva mantendo fatos, tom da marca e limites legais/compliance.
3. Preserve significado; ganhe **voz**: ritmo variado, frases curtas e longas, uma opinião ou ressalva quando couber.
4. Faça um passe final: “O que ainda soa óbvio de IA?” → corrija.

## O que evitar (equivalentes PT)

- **Peso falso:** “momento crucial”, “papel vital”, “testemunha o poder de”, “no cenário atual”, “é fundamental/pivotal”.
- **Conectivos de relatório:** “Além disso”, “Adicionalmente”, “Vale ressaltar”, “É importante destacar”.
- **-ndo encadeado** só para parecer profundo: “refletindo…”, “evidenciando…”, “simbolizando…”.
- **“Não é só X, é Y”**; **regra de três** forçada; **variação elegante** (sinônimo a cada linha para o mesmo conceito).
- **Atribuição vaga:** “especialistas dizem”, “o mercado tem notado”.
- **Tom de chatbot:** “Espero que ajude”, “Fico à disposição”, “Ótima pergunta!”, “Segue abaixo”.
- **Travessões (—) em cadeia** no lugar de vírgula ou ponto.
- **Lista com negrito + dois-ponto** estilo slide (“**Performance:** …”).
- **Vocabulário frequente em LLM:** alinhar, panorama, potencializar, robusto, jornada (vazio), intricado, destacar (verbo), cenário, landscape.

## O que preferir

- Verbos simples: “é”, “tem”, “faz”, “vi que”, “percebi”.
- Uma observação **concreta** (quando há evidência) em vez de generalidade.
- **1–2 emojis no máximo** em mensagem curta, só se combinar com o tom da agência.

## Referência completa (inglês)

Patterns numerados, exemplos antes/depois e “soul pass”: ver `SKILL.md` em [blader/humanizer](https://github.com/blader/humanizer).

## Uso no Cursor

Se o projeto ignorar `.cursor/` no seu Git local, copie esta pasta para as skills do Cursor:

`skills/humanizer` → `.cursor/skills/humanizer` (mesmo `SKILL.md`).
