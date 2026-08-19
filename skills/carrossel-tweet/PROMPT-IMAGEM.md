# Prompt de imagem — modelo Tweet-card COM MÍDIA

No formato **tweet-card + foto** (modelo @tintim.app), a foto anexa (`faixa.png`) é gerada por IA.
**Regra de ouro (Peterson): a imagem é SOB MEDIDA pra frase — NÃO é a mesma cena com o texto trocado.**
Cada post ganha uma cena que faz sentido com a mensagem daquele post. Não existe template fixo de imagem.

## Método (por post)

1. Pega a **ideia central** da frase (ex.: "CPL não paga boleto" = métrica de vaidade × dinheiro real).
2. Escolhe **UMA metáfora visual forte no mundo real** que traduz essa ideia (não um gráfico, não um mock).
3. Descreve uma **cena fotorrealista** (fotojornalismo/editorial), com o elemento-chave nítido e um enquadramento que sobra respiro. Se a frase entra como texto na cena (faixa, outdoor, placa), pedir **texto exato, letras grandes, ortografia exata**.
4. Formato **4:3 ou 1:1** (o card corta as laterais, `object-fit:cover`, altura fixa ~660px). Elemento-chave no centro.
5. Frase em imagem sempre **curta (2–5 palavras)** — texto longo o modelo erra.

## Arquétipos de cena (escolher o que casa com a frase — variar entre posts)

- **Faixa guerrilha** (bom pra frase-manifesto / verdade dura): alpinistas fixando uma faixa preta com texto branco num prédio de vidro. → usado no "CPL NÃO GERA ROI.".
- **Outdoor/billboard** na cidade, à noite iluminado, com a frase.
- **Objeto-símbolo em cena real**: ex. "SEGUIDOR NÃO PAGA BOLETO" → um maço de dinheiro real sobre um balcão × um celular apagado ao lado; "LEAD ESFRIA EM MINUTOS" → um café esquecido esfriando na mesa de um comercial vazio.
- **Cena de flagrante do cotidiano** que ilustra a dor (dono no balcão à noite, celular apitando sem resposta, etc.).
- **Placa/muro/lambe-lambe** com a frase pintada.

> Se a frase for um **manifesto/provocação curta**, a faixa/outdoor com o texto funciona muito bem.
> Se a frase descreve uma **situação/dor**, é melhor uma cena que mostra a situação (sem precisar do texto na imagem).

## Exemplo real (post CPL — faixa guerrilha)

```
Fotografia realista, estilo fotojornalismo urbano, formato 4:3, luz natural de dia.
Dois profissionais de acesso por corda (alpinismo industrial: capacete, arnês, cordas)
pendurados na fachada de um prédio comercial moderno de vidro e concreto, terminando
de fixar uma grande FAIXA DE LONA preta pendurada na vertical. Na faixa, em letras
GRANDES, BRANCAS, em negrito, sans-serif, o texto exato: "CPL NÃO GERA ROI." — nítido,
perfeitamente legível, ortografia exata, ocupando a maior parte da faixa. Ângulo
contra-plongée (de baixo pra cima), céu claro ao fundo, reflexos nas janelas do prédio.
Clima de manifesto e verdade inconveniente. Cores realistas, alto detalhe, foco nítido
na faixa. NÃO incluir nenhum outro texto, marca, logo ou watermark além da frase da faixa.
```

## Regras técnicas

- Banner **preto com texto branco** = mais legível. Cor de marca só com contraste alto.
- Se o texto vier torto/errado, **regenerar** (não editar à mão) — texto curto acerta em poucas tentativas.
- Salvar como **`faixa.png`** na pasta do post (`producao/tweets/AAAA-MM-<slug>/`).
- A marca d'água do Gemini (canto) normalmente cai fora no crop central; se aparecer, avisar que eu removo.

## Depois de gerar

```bash
python skills/carrossel-tweet/scripts/build_tweet_slides.py "<pasta-post>/slides.json" "<pasta-post>"
cd "Tektus/02-Portfolio-Clientes/Finflow/brand/04-marca-aplicada/instagram/_html"
node render-external.mjs "<pasta-post-absoluta>" "tweet-01-feed.html"
```

`slides.json` referencia `"midia":"faixa.png"`; o bloco `perfil` (nome/handle/bio/avatar) é override
por post → serve Tektus, Verdash ou cliente.
