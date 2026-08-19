---
name: carrossel-tweet
description: Cria carrossel Instagram estilo tweet-card (Tektus/Peterson) a partir de uma pauta, texto pronto ou conteúdo fatiado. Fluxo pensado pro celular (dispatch) — pauta rápida entra, PNGs prontos + legenda saem. 4 estilos visuais. Usa as regras de copy Tektus (palpável, humanizer, 5 vícios, sem ferramentas, sem garantias).
type: prompt+script
version: 1.0.0
---

# Carrossel Tweet — Tektus

Carrossel de texto puro em card estilo tweet (nome + @ + selo + texto grande), formato que performa por parecer pensamento espontâneo do founder, não peça de agência. Feito pra ideia rápida: Peterson manda a pauta (do celular, do Notion, de qualquer lugar) e recebe os slides prontos.

## Fluxo (siga nesta ordem)

### 1. Identificar o input (3 caminhos)

- **(a) Só a pauta** ("faz um sobre follow-up") → VOCÊ escreve o conteúdo do zero.
- **(b) Texto pronto** (parágrafos corridos) → VOCÊ fatia em slides sem reescrever a essência; ajustes só de ritmo.
- **(c) Já fatiado** (lista de slides) → VOCÊ só monta, zero reescrita.
- Se o usuário passar **URL do Notion**, buscar o conteúdo via MCP Notion (notion-fetch) e tratar como (b) ou (c).

### 2. Regras de escrita (caminho a e b) — INEGOCIÁVEIS

- Consultar memórias/regras: copy palpável (cena concreta + dinheiro), `humanizer` + **5 vícios estruturais** (sem "não é X é Y" vazio, sem lista de ideia contínua, sem adjetivo empilhado, aberturas variadas, sem óbvio).
- **Zero ferramenta citada** (Tintim/Verdash/Kommo/Meta). **Zero garantia/número/prazo** inventado (`limites_juridicos`). **Zero vivência fabricada** do Peterson.
- Estrutura clássica da série: slide 1 = gancho contraintuitivo curto (1-3 frases) · slides 2-6 = desenvolvimento (1 ideia por slide, 2-4 frases) · último slide = fechamento com opinião + CTA suave (seguir/comentar/salvar).
- 5 a 8 slides. Texto por slide: 60-340 caracteres (o gerador auto-ajusta o corpo).
- `**negrito**` nas 2-4 palavras que carregam o slide (em dark-verde o negrito sai verde neon).

### 3. Preview e confirmação

Mostrar os slides EM TEXTO numerados + estilo sugerido. Perguntar: "Aprova ou ajusto algo?" Só renderizar após OK (no dispatch mobile, se o usuário já mandou "pode gerar direto", pular a confirmação).

### 4. Estilos (usuário escolhe; default `papel`)

| Estilo | Visual |
|---|---|
| `branco` | Tweet clássico fundo branco |
| `papel` | Off-white #ECECEC (série clean) |
| `dark` | Preto estilo X dark mode |
| `dark-verde` | DNA Tektus: #0D100F + negrito/selo verde neon |

### 5. Gerar e renderizar

```bash
# 1. salvar slides.json na pasta de saída (ver formato no script)
python skills/carrossel-tweet/scripts/build_tweet_slides.py <slides.json> <pasta-saida> [estilo]

# 2. renderizar (máquina local — pipeline canônico):
cd "<pasta-do-cliente>/brand/04-marca-aplicada/instagram/_html"
node render-external.mjs "<pasta-saida-absoluta>"

# Fallback (ambiente sem o node_modules local, ex. sandbox):
npx -y playwright install chromium --with-deps 2>/dev/null || npx -y playwright install chromium
for f in <pasta>/tweet-*.html; do npx -y playwright screenshot --viewport-size=1080,1440 "$f" "${f%.html}.png"; done
```

Saída padrão: `Conteudo-Instagram/producao/tweets/AAAA-MM-DD-<slug>/` (criar).

### 6. Entregar

- Conferir 1 PNG (Read) antes de anunciar pronto.
- Entregar: caminhos dos PNGs + **legenda** (1ª linha = reforço do gancho ≤125 chars · 2-3 linhas de contexto · CTA · 5-8 hashtags de nicho).
- Perguntar se registra a pauta usada no banco de ideias (`pauta_conteudo_founder_tektus.md`) quando for pauta nova boa.

## Variante COM MÍDIA (guerrilla banner — modelo @tintim.app "CPL NÃO GERA ROI")

Post de 1 slide: card do tweet no topo (com linha de BIO) + hook "🚨 **URGENTE**: … Leia a legenda 👇" + **foto anexa** embaixo (arredondada). A frase forte vive NA FOTO (gerada por IA), não em HTML.

- **slides.json** aceita slide-objeto: `{"texto":"…","midia":"faixa.png","fs":44}` e override de perfil por post:
  ```json
  {"estilo":"branco",
   "perfil":{"nome":"@agencia.tektus","handle":"@agencia.tektus","verificado":true,
             "bio":"Tektus | Rastreio e previsibilidade pra quem vende serviço","avatar":"avatar.png"},
   "slides":[{"texto":"🚨 **URGENTE**: … \n\nLeia a legenda 👇","midia":"faixa.png"}]}
  ```
  Com `midia`, o card sobe pro topo, a foto entra embaixo e a fonte do texto reduz (a imagem domina; `fs` sobrescreve). O bloco `perfil` serve Tektus / Verdash / cliente sem editar a skill.
- **A FOTO (`faixa.png`) precisa de prompt de IA** → ver `PROMPT-IMAGEM.md` (template reutilizável, trocar só `{FRASE}`). Gerar no Gemini, salvar `faixa.png` na pasta do post, rebuild+render.

## Perfil

`perfil.json` na raiz da skill (nome, handle, verificado, avatar). Avatar ausente → círculo com iniciais automático. **Na primeira execução, se handle = "@CONFIRMAR_HANDLE", perguntar o handle real ao usuário e salvar.** Pra posts de marca (não pessoal), usar o override `perfil` no `slides.json`.

## Exemplo de slides.json

```json
{
  "estilo": "papel",
  "slides": [
    "A maioria das vendas que você perdeu, ninguém te tirou.\n\nVocê **abandonou**.",
    "Pensa no último orçamento que o cliente sumiu.\n\nEle disse \"vou pensar\". Você respondeu \"tranquilo\" e nunca mais voltou.",
    "\"Vou pensar\" quase nunca é não.\n\nÉ **\"me convence sem me pressionar\"**.",
    "O concorrente que voltou nele três dias depois levou a venda que era sua.",
    "Follow-up não é insistência.\n\nÉ **profissionalismo**.",
    "Abre tua lista de orçamentos parados e manda mensagem pros últimos cinco.\n\nDepois volta aqui e me conta quantos responderam."
  ]
}
```
