# Anti-Patterns (Erros a não cometer)

### Never Do
1. Falar "faça uma pesquisa" de forma genérica: Agentes de processos não aceitam abstração. O colaborador na ponta não saberá ONDE pesquisar.
2. Omitir Gatilho e Saída: Um processo tem que mostrar como ele "escuta" e onde ele joga sua saída na esteira. Se for isolado, é poeira corporativa.
3. Troubleshooting Vazio: Colocar coisas superficiais como "se dar erro ligue pro chefe". O troubleshooting deve resolver problemas REAIS e frequentes da operação (esquecer senha, cliente barrar lead, etc).
4. Linguagem muito técnica para setores leigos: Misturar KPIs de tráfego pago num processo do administrativo. Cada Playbook precisa aderir à realidade do operador que vai lê-lo na Tektus.

### Always Do
1. Exigir granularidade: Todo "Como fazer" tem que ser digerível no nível de clique ("Acesse a aba Marketing, clica em Campaigns").
2. Sempre criar Árvore de Decisão: Operação não flui num caminho liso e limpo. Sempre pergunte "E se der errado aqui?".
3. Definir explicitamente o Dono: Ninguém executa processo de "Alguém". Responsabilidade precisa ser clara (Nome ou Cargo).
