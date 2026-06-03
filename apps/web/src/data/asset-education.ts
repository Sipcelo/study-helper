import type { AssetEducation } from '@/types/education';

export const ASSET_EDUCATION: Record<string, AssetEducation> = {

  // ── Currencies ────────────────────────────────────────────────────────────

  brl: {
    assetId: 'brl',
    summary: 'O Real é a moeda oficial do Brasil desde 1994, criada para controlar a hiperinflação.',
    beginnerExplanation:
      'Pense no Real como uma régua que mede o valor das coisas. Se a régua encolhe (inflação), você precisa de mais reais para comprar a mesma coisa. O Banco Central cuida dessa régua subindo ou descendo os juros.',
    whyItMovesUp: [
      'Queda na inflação, aumentando a confiança na moeda',
      'Alta da taxa Selic atraindo investidores estrangeiros',
      'Superávit comercial: o Brasil exporta mais do que importa',
      'Aumento do preço de commodities como soja e minério de ferro',
    ],
    whyItMovesDown: [
      'Inflação alta corrói o poder de compra',
      'Instabilidade política ou fiscal afasta investidores',
      'Queda no preço das commodities reduz entrada de dólares',
      'Crise global leva investidores a buscar moedas mais seguras como o dólar',
    ],
    mainRisks: [
      'Alta dependência de exportação de commodities',
      'Vulnerabilidade a choques políticos e fiscais',
      'Inflação crônica que reduz o poder de compra ao longo do tempo',
    ],
    relatedConcepts: [
      {
        id: 'inflacao',
        label: 'Inflação',
        explanation: 'Aumento generalizado dos preços que reduz o poder de compra da moeda.',
      },
      {
        id: 'selic',
        label: 'Taxa Selic',
        explanation: 'Taxa básica de juros do Brasil, definida pelo Banco Central para controlar a inflação.',
      },
      {
        id: 'cambio',
        label: 'Taxa de câmbio',
        explanation: 'Relação entre o valor do Real e outras moedas, como o dólar ou o euro.',
      },
    ],
    practicalExample:
      'Se você guarda R$ 1.000 durante um ano com inflação de 5%, ao fim do período esse dinheiro compra o equivalente a apenas R$ 952 — você "perdeu" R$ 48 sem gastar nada. É por isso que deixar dinheiro parado sem rendimento é arriscado.',
    studyQuestions: [
      {
        question: 'O que acontece com o poder de compra do Real quando a inflação sobe?',
        hint: 'Pense na régua que mede o valor das coisas.',
        level: 'beginner',
      },
      {
        question: 'Por que o Banco Central aumenta os juros quando a inflação está alta?',
        hint: 'Juros altos tornam o consumo e o crédito mais caros.',
        level: 'beginner',
      },
      {
        question: 'Como a exportação de commodities afeta o valor do Real?',
        hint: 'Pense no fluxo de dólares entrando no Brasil.',
        level: 'intermediate',
      },
    ],
  },

  usd: {
    assetId: 'usd',
    summary: 'O dólar americano é a principal moeda de reserva mundial e referência global para commodities.',
    beginnerExplanation:
      'O dólar é como o "idioma universal" do dinheiro. Petróleo, ouro e muitas commodities são precificados em dólar. Quando o dólar sobe em relação ao Real, produtos importados ficam mais caros no Brasil.',
    whyItMovesUp: [
      'Fed (banco central dos EUA) aumenta os juros americanos',
      'Crises globais geram fuga para ativos seguros — investidores buscam o dólar',
      'Economia americana crescendo mais que outras economias',
      'Queda no preço das commodities que o Brasil exporta',
    ],
    whyItMovesDown: [
      'Fed corta os juros americanos, reduzindo atratividade do dólar',
      'Melhora da confiança em economias emergentes',
      'Alta nos preços das commodities, beneficiando países exportadores como o Brasil',
      'Dívida pública americana crescente gera preocupações com o valor do dólar',
    ],
    mainRisks: [
      'Impacto direto em importações brasileiras: dólar alto encarece produtos estrangeiros',
      'Volatilidade em períodos de crise global',
      'Dependência do mundo ao dólar cria vulnerabilidade sistêmica',
    ],
    relatedConcepts: [
      {
        id: 'reserva-valor',
        label: 'Moeda de reserva',
        explanation: 'Moeda mantida por bancos centrais do mundo como reserva de valor por sua estabilidade e aceitação global.',
      },
      {
        id: 'fed',
        label: 'Federal Reserve (Fed)',
        explanation: 'Banco central americano, responsável pela política monetária dos EUA e pela taxa de juros americana.',
      },
      {
        id: 'commodities',
        label: 'Commodities',
        explanation: 'Relação inversa: quando o dólar sobe, commodities em dólar ficam mais caras para outros países, reduzindo a demanda.',
      },
    ],
    practicalExample:
      'Se você importa um computador de R$ 6.000 quando o dólar está em R$ 5,00, o produto custaria US$ 1.200. Se o dólar subir para R$ 6,00, o mesmo computador passa a custar R$ 7.200 — um aumento de R$ 1.200 apenas por causa do câmbio.',
    studyQuestions: [
      {
        question: 'Por que o dólar é chamado de "moeda de reserva mundial"?',
        hint: 'Pense em quantos países e contratos usam o dólar como referência.',
        level: 'beginner',
      },
      {
        question: 'Como a alta dos juros americanos afeta o valor do Real?',
        hint: 'Investidores buscam maior retorno — onde eles colocam o dinheiro?',
        level: 'intermediate',
      },
      {
        question: 'Quais produtos do seu dia a dia ficam mais caros quando o dólar sobe?',
        hint: 'Pense em tecnologia, combustível e alimentos industrializados.',
        level: 'beginner',
      },
    ],
  },

  eur: {
    assetId: 'eur',
    summary: 'O Euro é a moeda única de 20 países europeus, a segunda mais negociada do mundo.',
    beginnerExplanation:
      'O Euro foi criado para facilitar o comércio entre países europeus, eliminando a necessidade de converter moedas ao viajar ou fazer negócios na Europa. É como se 20 países decidissem usar a mesma carteira.',
    whyItMovesUp: [
      'Crescimento econômico forte na zona do euro',
      'Banco Central Europeu (BCE) aumenta os juros',
      'Estabilidade política na União Europeia',
      'Queda nos preços de energia que a Europa importa',
    ],
    whyItMovesDown: [
      'Crises de dívida em países membros (como a crise grega de 2010)',
      'BCE reduz os juros para estimular a economia',
      'Conflitos ou instabilidade geopolítica na Europa',
      'Alta nos preços de energia, que a Europa importa em grande quantidade',
    ],
    mainRisks: [
      'Dificuldade de ter uma política monetária única para economias muito diferentes',
      'Vulnerabilidade a crises de dívida de países membros',
      'Dependência energética — Europa importa grande parte de seu gás e petróleo',
    ],
    relatedConcepts: [
      {
        id: 'uniao-europeia',
        label: 'União Europeia',
        explanation: 'Bloco de países europeus com livre circulação de pessoas, bens e capital, e moeda única entre parte dos membros.',
      },
      {
        id: 'bce',
        label: 'Banco Central Europeu (BCE)',
        explanation: 'Banco central responsável pela política monetária da zona do euro, controlando a inflação e os juros.',
      },
    ],
    practicalExample:
      'Em 2010, a crise da dívida grega assustou investidores e o Euro caiu de 1,51 para 1,19 dólares em poucos meses. Isso mostra como a fragilidade de um país pequeno pode impactar toda a moeda do bloco.',
    studyQuestions: [
      {
        question: 'Quais são as vantagens de um grupo de países usar a mesma moeda?',
        hint: 'Pense em viagens e comércio internacional.',
        level: 'beginner',
      },
      {
        question: 'Por que é difícil ter uma política monetária única para países muito diferentes?',
        hint: 'Compare a Alemanha e a Grécia: economias muito distintas, mesmo banco central.',
        level: 'intermediate',
      },
    ],
  },

  jpy: {
    assetId: 'jpy',
    summary: 'O Iene japonês é considerado uma "moeda porto seguro" — investidores o buscam em períodos de crise.',
    beginnerExplanation:
      'O Iene é como um abrigo durante tempestades financeiras. Quando há crises globais, investidores vendem ativos arriscados e compram ienes, pois o Japão é visto como uma economia estável e credora líquida.',
    whyItMovesUp: [
      'Crises globais geram demanda por ativos seguros',
      'Banco Central do Japão aumenta os juros',
      'Redução do "carry trade": investidores devolvem ienes tomados emprestados',
      'Superávit comercial japonês, com mais exportações que importações',
    ],
    whyItMovesDown: [
      'Banco do Japão mantém juros próximos de zero, reduzindo atratividade',
      '"Carry trade": investidores pegam ienes emprestados baratos e aplicam em moedas com juros mais altos',
      'Desastres naturais que afetam a economia japonesa',
      'Queda na demanda global por produtos japoneses',
    ],
    mainRisks: [
      'Deflação crônica no Japão — preços caindo inibem consumo e crescimento',
      'Dívida pública japonesa altíssima, maior do mundo como % do PIB',
      'População envelhecendo rapidamente, reduzindo a força de trabalho',
    ],
    relatedConcepts: [
      {
        id: 'carry-trade',
        label: 'Carry Trade',
        explanation: 'Estratégia de pegar dinheiro emprestado em moeda de baixos juros (como o iene) e investir em moedas de juros altos.',
      },
      {
        id: 'porto-seguro',
        label: 'Ativo porto seguro',
        explanation: 'Ativo que investidores buscam em momentos de crise por sua estabilidade percebida: ouro, iene e franco suíço.',
      },
    ],
    practicalExample:
      'Durante a crise financeira de 2008, o iene valorizou mais de 30% em poucos meses — investidores ao redor do mundo venderam ações e compraram ienes para se proteger. Quem tinha ienes antes da crise viu seu patrimônio crescer enquanto os mercados desabavam.',
    studyQuestions: [
      {
        question: 'O que é "carry trade" e por que ele envolve o iene com frequência?',
        hint: 'Pense em pegar emprestado barato para aplicar caro.',
        level: 'intermediate',
      },
      {
        question: 'Por que o Japão é considerado uma economia credora líquida?',
        hint: 'O Japão empresta mais para o mundo do que toma emprestado.',
        level: 'intermediate',
      },
    ],
  },

  gbp: {
    assetId: 'gbp',
    summary: 'A Libra Esterlina é a moeda mais antiga ainda em uso, e uma das mais negociadas do mundo.',
    beginnerExplanation:
      'A Libra existe há mais de mil anos e sobreviveu a guerras, impérios e crises. Hoje, reflete a saúde da economia britânica e o papel de Londres como um dos principais centros financeiros do planeta.',
    whyItMovesUp: [
      'Banco da Inglaterra aumenta os juros para conter a inflação',
      'Dados econômicos britânicos acima do esperado',
      'Redução da incerteza política no Reino Unido',
      'Acordo comercial favorável aumentando exportações britânicas',
    ],
    whyItMovesDown: [
      'Incertezas sobre o Brexit e relações comerciais com a Europa',
      'Inflação alta no Reino Unido corroendo o poder de compra',
      'Banco da Inglaterra corta juros para estimular a economia',
      'Crise política interna ou instabilidade do governo',
    ],
    mainRisks: [
      'Consequências econômicas de longo prazo do Brexit',
      'Alta inflação britânica em comparação a outros países desenvolvidos',
      'Dependência do setor financeiro de Londres para a economia do país',
    ],
    relatedConcepts: [
      {
        id: 'brexit',
        label: 'Brexit',
        explanation: 'Saída do Reino Unido da União Europeia em 2020, que mudou as relações comerciais e financeiras do país.',
      },
      {
        id: 'risco-cambial',
        label: 'Risco cambial',
        explanation: 'Risco de perdas causadas por variações na taxa de câmbio. A Libra é especialmente sensível a eventos políticos como o Brexit.',
      },
    ],
    practicalExample:
      'No dia do resultado do referendo do Brexit em 2016, a Libra caiu mais de 10% em uma única noite — a maior queda em décadas. Investidores que tinham Libras perderam 10% do valor em horas, mostrando como eventos políticos podem ser tão impactantes quanto crises econômicas.',
    studyQuestions: [
      {
        question: 'Como o Brexit afetou e pode continuar afetando o valor da Libra?',
        hint: 'Pense no acesso do Reino Unido ao mercado europeu.',
        level: 'intermediate',
      },
      {
        question: 'Por que é importante para investidores brasileiros acompanhar a Libra?',
        hint: 'Pense em exportações brasileiras para o Reino Unido e investimentos.',
        level: 'beginner',
      },
    ],
  },

  cny: {
    assetId: 'cny',
    summary: 'O Yuan chinês (Renminbi) reflete a ascensão da China como segunda maior economia do mundo.',
    beginnerExplanation:
      'O Yuan é diferente de outras moedas: o governo chinês controla parcialmente sua cotação, evitando variações bruscas. É como se o país tivesse um câmbio "guiado" em vez de totalmente livre.',
    whyItMovesUp: [
      'Crescimento econômico forte na China',
      'Banco Popular da China permite maior valorização',
      'Alta demanda global por produtos chineses',
      'Acordos comerciais que ampliam o uso do yuan internacionalmente',
    ],
    whyItMovesDown: [
      'Banco Popular da China intervém para desvalorizar e estimular exportações',
      'Conflitos comerciais com os EUA, como a guerra tarifária de 2018',
      'Desaceleração econômica chinesa reduz confiança',
      'Fuga de capitais quando investidores desconfiam da economia',
    ],
    mainRisks: [
      'Risco de intervenção governamental: o câmbio não é totalmente de mercado',
      'Bolha imobiliária e dívida corporativa elevada na China',
      'Tensões geopolíticas com EUA, Taiwan e outros parceiros',
    ],
    relatedConcepts: [
      {
        id: 'cambio-administrado',
        label: 'Câmbio administrado',
        explanation: 'Sistema em que o governo controla ou influencia ativamente a taxa de câmbio, diferente do câmbio flutuante.',
      },

    ],
    practicalExample:
      'A China e o Brasil têm um acordo de comércio que permite transações em yuan, sem precisar converter para dólares. Em 2023, o Brasil e a China fecharam contratos bilionários diretamente em yuan, reduzindo a dependência do dólar no comércio bilateral.',
    studyQuestions: [
      {
        question: 'O que significa dizer que o yuan tem "câmbio administrado"?',
        hint: 'Compare com o câmbio flutuante do Real.',
        level: 'intermediate',
      },
      {
        question: 'Por que a China às vezes desvaloriza o yuan intencionalmente?',
        hint: 'Pense em como o preço dos produtos exportados muda com a desvalorização.',
        level: 'intermediate',
      },
    ],
  },

  // ── Stocks ────────────────────────────────────────────────────────────────

  petr4: {
    assetId: 'petr4',
    summary: 'PETR4 é a ação preferencial da Petrobras, a maior empresa de energia do Brasil e uma das maiores do mundo.',
    beginnerExplanation:
      'Comprar PETR4 é como se tornar sócio da Petrobras sem ter direito a votar nas decisões da empresa — mas com prioridade no recebimento de dividendos. A empresa lucra principalmente com petróleo, então seu desempenho segue o preço do barril.',
    whyItMovesUp: [
      'Alta no preço do petróleo no mercado internacional',
      'Descobertas de novos poços de pré-sal',
      'Resultados financeiros acima do esperado, com lucro alto',
      'Política de dividendos generosa atrai investidores de renda',
    ],
    whyItMovesDown: [
      'Queda no preço do barril de petróleo',
      'Intervenção do governo nos preços de combustíveis',
      'Escândalos de corrupção ou investigações (como a Lava Jato)',
      'Alta da taxa Selic tornando a renda fixa mais atrativa que ações',
    ],
    mainRisks: [
      'Controle estatal: decisões políticas podem prejudicar acionistas minoritários',
      'Volatilidade do petróleo afeta diretamente o resultado da empresa',
      'Risco ambiental e regulatório crescente em torno de combustíveis fósseis',
    ],
    relatedConcepts: [
      {
        id: 'acao-pn',
        label: 'Ação Preferencial (PN)',
        explanation: 'Tipo de ação sem direito a voto, mas com prioridade no recebimento de dividendos e no reembolso em caso de liquidação.',
      },
      {
        id: 'pre-sal',
        label: 'Pré-sal',
        explanation: 'Enormes reservas de petróleo descobertas no Brasil abaixo de camadas de sal no fundo do oceano, que transformaram o país em grande produtor.',
      },
      {
        id: 'dividendos',
        label: 'Dividendos',
        explanation: 'Parte do lucro distribuída aos acionistas. Empresas como a Petrobras são conhecidas por pagar dividendos generosos.',
      },
    ],
    practicalExample:
      'Em 2022, com o petróleo a US$ 100/barril e política de dividendos agressiva, a Petrobras distribuiu mais de R$ 70 bilhões em dividendos. Quem tinha 1.000 ações PETR4 recebeu centenas de reais apenas em dividendos, sem vender nenhuma ação.',
    studyQuestions: [
      {
        question: 'Qual é a diferença entre ação PN (preferencial) e ON (ordinária)?',
        hint: 'Pense em quem tem direito a votar e quem recebe dividendos primeiro.',
        level: 'beginner',
      },
      {
        question: 'Por que o preço do petróleo afeta tanto o valor de PETR4?',
        hint: 'De onde vem a maior parte da receita da Petrobras?',
        level: 'beginner',
      },
      {
        question: 'Quais são os riscos de investir em uma empresa controlada pelo governo?',
        hint: 'Pense em decisões de preço de combustível que o governo pode querer.',
        level: 'intermediate',
      },
    ],
  },

  vale3: {
    assetId: 'vale3',
    summary: 'VALE3 é a maior mineradora de ferro e níquel do mundo, com forte ligação à demanda industrial da China.',
    beginnerExplanation:
      'Comprar VALE3 é como apostar na construção civil e industrial global — principalmente da China. A Vale extrai minério de ferro, o principal componente do aço usado em prédios, pontes e carros.',
    whyItMovesUp: [
      'Crescimento da economia chinesa aumentando demanda por aço e minério',
      'Alta no preço do minério de ferro no mercado internacional',
      'Novos projetos de infraestrutura global impulsionando demanda',
      'Resultados financeiros sólidos com margens altas',
    ],
    whyItMovesDown: [
      'Desaceleração da economia chinesa reduzindo demanda por aço',
      'Queda no preço do minério de ferro',
      'Desastres como o de Mariana (2015) ou Brumadinho (2019) geram passivos enormes',
      'Aumento da oferta global de minério por concorrentes australianos',
    ],
    mainRisks: [
      'Risco de desastre ambiental e de barragem — passivo histórico e reputacional',
      'Alta concentração de receita em minério de ferro e dependência da China',
      'Transição energética: menos aço tradicional pode ser demandado no futuro',
    ],
    relatedConcepts: [
      {
        id: 'acao-on',
        label: 'Ação Ordinária (ON)',
        explanation: 'Tipo de ação com direito a voto nas assembleias da empresa. Acionistas ordinários participam das decisões corporativas.',
      },
      {
        id: 'commodities',
        label: 'Commodities',
        explanation: 'Principal matéria-prima do aço, usado em construção e indústria. A Vale é líder mundial na produção e exportação de minério de ferro.',
      },
      {
        id: 'blue-chip',
        label: 'Blue chip',
        explanation: 'Ação de empresa grande, consolidada e reconhecida, geralmente com menor volatilidade e pagamento regular de dividendos.',
      },
    ],
    practicalExample:
      'Quando a China anunciou um pacote de estímulo à construção civil em 2023, o preço do minério de ferro subiu 15% em dias — e as ações da Vale subiram junto. Isso mostra como VALE3 funciona quase como um "termômetro" da economia chinesa.',
    studyQuestions: [
      {
        question: 'Por que a demanda da China tem tanto impacto no preço de VALE3?',
        hint: 'Quem é o maior comprador de minério de ferro do mundo?',
        level: 'beginner',
      },
      {
        question: 'Quais foram as consequências dos desastres de Mariana e Brumadinho para a empresa?',
        hint: 'Pense em indenizações, reputação e regulação.',
        level: 'intermediate',
      },
      {
        question: 'Como a transição para energia limpa pode afetar a Vale no longo prazo?',
        hint: 'Pense na demanda por aço em um mundo com menos carros a combustão.',
        level: 'advanced',
      },
    ],
  },

  itub4: {
    assetId: 'itub4',
    summary: 'ITUB4 é a ação preferencial do Itaú Unibanco, o maior banco privado da América Latina.',
    beginnerExplanation:
      'Comprar ITUB4 é como se tornar sócio de um banco. Bancos lucram cobrando juros de quem toma empréstimos e pagando menos juros a quem deposita. Quanto maior a diferença (o "spread"), maior o lucro.',
    whyItMovesUp: [
      'Alta da Selic aumenta a margem financeira dos bancos',
      'Crescimento do crédito: mais pessoas e empresas tomando empréstimos',
      'Inadimplência controlada, com poucos calotes',
      'Expansão para novos serviços digitais e fintechs',
    ],
    whyItMovesDown: [
      'Inadimplência alta quando a economia vai mal',
      'Concorrência de bancos digitais e fintechs como Nubank e Inter',
      'Regulação mais rígida do Banco Central limitando tarifas',
      'Crise econômica reduzindo demanda por crédito',
    ],
    mainRisks: [
      'Risco de crédito: clientes que não pagam suas dívidas',
      'Disrupção por bancos digitais que operam com custos muito menores',
      'Exposição a ciclos econômicos — em recessões, bancos sofrem mais',
    ],
    relatedConcepts: [
      {
        id: 'spread-bancario',
        label: 'Spread bancário',
        explanation: 'Diferença entre o juro que o banco cobra ao emprestar e o juro que paga aos depositantes. É a principal fonte de lucro dos bancos.',
      },
      {
        id: 'inadimplencia',
        label: 'Inadimplência',
        explanation: 'Proporção de empréstimos não pagos no prazo. Alta inadimplência significa mais perdas para o banco.',
      },
    ],
    practicalExample:
      'Com a Selic a 13,75% em 2023, o Itaú cobrava cerca de 50% ao ano no crédito rotativo do cartão, mas pagava apenas 13% ao poupador. Essa diferença de 37 pontos percentuais era pura margem de lucro para o banco.',
    studyQuestions: [
      {
        question: 'O que é o "spread bancário" e por que ele importa para o lucro do Itaú?',
        hint: 'Compare o juro que o banco cobra e o que ele paga.',
        level: 'beginner',
      },
      {
        question: 'Por que a alta da Selic beneficia bancos como o Itaú?',
        hint: 'Pense em quem ganha quando os juros sobem.',
        level: 'intermediate',
      },
      {
        question: 'Como os bancos digitais ameaçam o modelo de negócio dos bancos tradicionais?',
        hint: 'Compare os custos de uma agência física com um banco 100% digital.',
        level: 'intermediate',
      },
    ],
  },

  aapl: {
    assetId: 'aapl',
    summary: 'Apple é a empresa mais valiosa do mundo, conhecida por hardware premium e um ecossistema de serviços fechado.',
    beginnerExplanation:
      'Comprar AAPL é como apostar que as pessoas continuarão pagando mais por um iPhone do que por qualquer concorrente. A Apple cobra preços altos porque os usuários ficam "presos" no ecossistema — iMessage, AirPods, iCloud — tornando difícil trocar de marca.',
    whyItMovesUp: [
      'Lançamento de novos produtos com alta demanda (iPhone, Apple Watch, Vision Pro)',
      'Crescimento do segmento de serviços — App Store, Apple Music, iCloud',
      'Recompra de ações (buyback) que aumenta o lucro por ação',
      'Expansão em mercados emergentes como Índia',
    ],
    whyItMovesDown: [
      'Saturação do mercado de smartphones reduzindo o crescimento',
      'Tensões com a China, onde a Apple fabrica e vende muito',
      'Regulação antimonopólio, especialmente sobre a App Store',
      'Alta dos juros americanos tornando ações de tecnologia menos atrativas',
    ],
    mainRisks: [
      'Concentração de fabricação na China — vulnerabilidade geopolítica',
      'Dependência do iPhone que ainda representa mais de 50% da receita',
      'Pressão regulatória crescente sobre domínio da App Store',
    ],
    relatedConcepts: [
      {
        id: 'buyback',
        label: 'Recompra de ações (Buyback)',
        explanation: 'Quando uma empresa usa seu caixa para comprar de volta suas próprias ações, reduzindo a quantidade disponível e aumentando o lucro por ação.',
      },
      {
        id: 'ecossistema',
        label: 'Ecossistema fechado',
        explanation: 'Estratégia em que produtos e serviços funcionam melhor entre si do que com concorrentes, criando dependência do cliente.',
      },
      {
        id: 'magnificent-seven',
        label: 'Magnificent Seven',
        explanation: 'Grupo das sete maiores empresas de tecnologia dos EUA: Apple, Microsoft, Alphabet, Amazon, Meta, Tesla e NVIDIA.',
      },
    ],
    practicalExample:
      'Em 2023, a Apple tinha US$ 62 bilhões em caixa e gastou US$ 90 bilhões em recompra de ações. Isso significa que a empresa comprou de volta suas próprias ações em um volume maior que o PIB de países como o Equador — impulsionando o preço para cima.',
    studyQuestions: [
      {
        question: 'O que é "lock-in" de cliente e como a Apple usa isso a seu favor?',
        hint: 'Pense em quanto custaria para você trocar todos seus aparelhos Apple por Android.',
        level: 'beginner',
      },
      {
        question: 'Por que a recompra de ações (buyback) tende a aumentar o preço das ações?',
        hint: 'Menos ações no mercado com o mesmo lucro = mais lucro por ação.',
        level: 'intermediate',
      },
      {
        question: 'Qual é o risco de a Apple ter quase toda sua fabricação concentrada na China?',
        hint: 'Pense em uma guerra comercial ou pandemia que interrompa a produção.',
        level: 'intermediate',
      },
    ],
  },

  tsla: {
    assetId: 'tsla',
    summary: 'Tesla é líder global em veículos elétricos e baterias, mas sua ação é conhecida pela alta volatilidade.',
    beginnerExplanation:
      'Comprar TSLA é como apostar no futuro da mobilidade elétrica. A Tesla não é só uma montadora — é vista como empresa de tecnologia e energia. Por isso, seu preço reflete expectativas de crescimento futuro, não apenas o lucro de hoje.',
    whyItMovesUp: [
      'Crescimento nas entregas de veículos acima do esperado',
      'Avanços em autonomia e software FSD (Full Self-Driving)',
      'Expansão para novos mercados como Índia e sudeste asiático',
      'Crescimento do segmento de energia (Powerwall, Megapack)',
    ],
    whyItMovesDown: [
      'Concorrência crescente de montadoras chinesas como BYD',
      'Elon Musk e polêmicas que afastam consumidores e investidores',
      'Cortes de preço que reduzem margens de lucro',
      'Alta dos juros americanos tornando "growth stocks" menos atrativas',
    ],
    mainRisks: [
      'Dependência da figura de Elon Musk — suas ações pessoais afetam a empresa',
      'Margens pressionadas por guerra de preços com concorrentes',
      'Regulação de carros autônomos ainda incerta em muitos países',
    ],
    relatedConcepts: [
      {
        id: 'crescimento',
        label: 'Ação de Crescimento',
        explanation: 'Ação de empresa em que investidores pagam mais pelo potencial de crescimento futuro do que pelo lucro atual. Alta expectativa = alta volatilidade.',
      },
      {
        id: 'veiculo-eletrico',
        label: 'Veículo Elétrico (EV)',
        explanation: 'Carro movido a bateria elétrica em vez de combustível fóssil. O setor cresce rapidamente com incentivos governamentais ao redor do mundo.',
      },
    ],
    practicalExample:
      'Em 2021, a Tesla valia mais do que todas as outras montadoras do mundo somadas — Ford, GM, Toyota, Volkswagen. Em 2022, após o aumento dos juros americanos, perdeu 65% do valor. Isso exemplifica a volatilidade extrema de growth stocks.',
    studyQuestions: [
      {
        question: 'O que é uma "growth stock" e por que elas caem mais quando os juros sobem?',
        hint: 'Quando os juros sobem, o dinheiro futuro vale menos hoje.',
        level: 'intermediate',
      },
      {
        question: 'Como a concorrência da BYD e montadoras chinesas afeta a Tesla?',
        hint: 'Pense em preço, volume e participação de mercado.',
        level: 'intermediate',
      },
      {
        question: 'Por que o comportamento público de Elon Musk afeta o preço da TSLA?',
        hint: 'Pense em consumidores, parceiros e investidores institucionais.',
        level: 'beginner',
      },
    ],
  },

  nvda: {
    assetId: 'nvda',
    summary: 'NVIDIA é a maior fabricante de GPUs do mundo e tornou-se o pilar de infraestrutura da revolução de IA.',
    beginnerExplanation:
      'Comprar NVDA é como apostar que a IA vai continuar crescendo. As GPUs da NVIDIA são como "motores" que treinam modelos de inteligência artificial — ChatGPT, Gemini, e todos os grandes modelos usam chips NVIDIA. Sem esses chips, a IA moderna não existiria.',
    whyItMovesUp: [
      'Demanda crescente por GPUs para treinar modelos de IA generativa',
      'Lançamento de novas arquiteturas de chip como Blackwell e Hopper',
      'Crescimento dos data centers de hiperescala (Amazon, Google, Microsoft)',
      'Expansão para novos mercados: robótica, carros autônomos, saúde',
    ],
    whyItMovesDown: [
      'Restrições de exportação dos EUA para a China reduzem um grande mercado',
      'Concorrência crescente de AMD, Intel e chips proprietários das big techs',
      'Bolha de IA: se os investimentos em IA desacelerarem, a demanda cai',
      'Alta valorização já precifica muito crescimento futuro',
    ],
    mainRisks: [
      'Concentração em um único mercado: a IA representa a maior parte do crescimento',
      'Dependência da TSMC para fabricação — concentração em Taiwan',
      'Avaliação muito alta: qualquer decepção nos resultados causa queda forte',
    ],
    relatedConcepts: [
      {
        id: 'gpu',
        label: 'GPU (Graphics Processing Unit)',
        explanation: 'Chip originalmente criado para gráficos de videogame, mas ideal para IA por processar milhares de cálculos em paralelo.',
      },
      {
        id: 'ia-generativa',
        label: 'IA Generativa',
        explanation: 'Sistemas de inteligência artificial que criam conteúdo novo (texto, imagem, código) como ChatGPT, Midjourney e Gemini.',
      },
      {
        id: 'data-center',
        label: 'Data Center',
        explanation: 'Grandes instalações com servidores que processam e armazenam dados. Empresas como Amazon e Google constroem data centers usando chips NVIDIA.',
      },
    ],
    practicalExample:
      'Para treinar o GPT-4, a OpenAI usou mais de 25.000 GPUs A100 da NVIDIA durante meses. A custo de US$ 10.000 por chip, isso representa US$ 250 milhões só em hardware — quase todo indo para o caixa da NVIDIA.',
    studyQuestions: [
      {
        question: 'Por que GPUs são ideais para treinar modelos de IA, diferente dos processadores comuns?',
        hint: 'Pense em fazer muitas contas simples ao mesmo tempo versus poucas contas complexas.',
        level: 'beginner',
      },
      {
        question: 'O que pode acontecer com as ações da NVIDIA se os investimentos em IA desacelerarem?',
        hint: 'Lembre-se do caso da Tesla: expectativas altas embutem muito otimismo no preço.',
        level: 'intermediate',
      },
      {
        question: 'Por que as restrições de exportação de chips para a China são um risco relevante?',
        hint: 'Qual a fatia da receita da NVIDIA que vinha do mercado chinês?',
        level: 'advanced',
      },
    ],
  },

  // ── Indices ────────────────────────────────────────────────────────────────

  ibov: {
    assetId: 'ibov',
    summary: 'O Ibovespa é o principal índice da bolsa brasileira, reunindo as ações mais negociadas da B3.',
    beginnerExplanation:
      'O Ibovespa é como a "temperatura" do mercado de ações brasileiro. Quando sobe, significa que as principais ações brasileiras estão valorizando em média. Ele não é comprado diretamente — mas você pode investir em fundos que replicam sua composição.',
    whyItMovesUp: [
      'Crescimento econômico do Brasil aumentando lucros das empresas',
      'Queda da Selic tornando a renda fixa menos atrativa e migrando dinheiro para ações',
      'Alta no preço de commodities beneficiando Petrobras e Vale, que têm grande peso',
      'Entrada de capital estrangeiro buscando ativos brasileiros baratos',
    ],
    whyItMovesDown: [
      'Crise política ou fiscal que assusta investidores estrangeiros',
      'Alta da Selic tornando a renda fixa mais atrativa que ações',
      'Queda no preço de petróleo ou minério de ferro',
      'Recessão econômica reduzindo lucros das empresas',
    ],
    mainRisks: [
      'Alta concentração em commodities (Petrobras e Vale pesam muito no índice)',
      'Volatilidade em crises políticas e eleições',
      'Dependência do cenário externo e do apetite global a risco',
    ],
    relatedConcepts: [
      {
        id: 'bolsa-valores',
        label: 'Bolsa de Valores',
        explanation: 'O Ibovespa é o principal índice da B3, a bolsa de valores brasileira.',
      },
      {
        id: 'blue-chip',
        label: 'Blue chips',
        explanation: 'As maiores posições do Ibovespa são blue chips: Vale, Petrobras, Itaú e outras grandes empresas.',
      },
      {
        id: 'dividendos',
        label: 'Dividendos',
        explanation: 'Empresas do Ibovespa costumam pagar dividendos. O retorno total inclui a valorização da ação e os proventos recebidos.',
      },
    ],
    practicalExample:
      'Entre 2016 e 2019, o Ibovespa subiu de 38.000 para 119.000 pontos — uma alta de mais de 200% em 3 anos. Quem investiu R$ 10.000 em um ETF que replica o índice em 2016 teria R$ 31.000 em 2019, sem precisar escolher nenhuma ação individualmente.',
    studyQuestions: [
      {
        question: 'Por que uma queda na taxa Selic tende a impulsionar o Ibovespa?',
        hint: 'Pense no que acontece com o dinheiro que estava na renda fixa.',
        level: 'beginner',
      },
      {
        question: 'Por que Petrobras e Vale têm tanto peso no Ibovespa?',
        hint: 'O peso no índice é proporcional ao volume negociado.',
        level: 'intermediate',
      },
      {
        question: 'O que é um ETF e como ele permite investir no índice?',
        hint: 'Pense em um fundo que compra todas as ações do índice na mesma proporção.',
        level: 'beginner',
      },
    ],
  },

  spx: {
    assetId: 'spx',
    summary: 'O S&P 500 mede o desempenho das 500 maiores empresas americanas e é o principal termômetro da economia dos EUA.',
    beginnerExplanation:
      'O S&P 500 é como um resumo das 500 maiores empresas dos Estados Unidos em um único número. Se o índice sobe, significa que, em média, essas empresas estão valendo mais. É considerado o melhor termômetro da saúde econômica americana.',
    whyItMovesUp: [
      'Crescimento econômico americano com lucros corporativos acima do esperado',
      'Federal Reserve cortando juros, estimulando consumo e investimento',
      'Inovação tecnológica e crescimento das Magnificent Seven',
      'Mercado de trabalho forte sustentando o consumo das famílias',
    ],
    whyItMovesDown: [
      'Fed subindo juros agressivamente para combater a inflação',
      'Recessão econômica reduzindo lucros corporativos',
      'Crises geopolíticas gerando incerteza nos mercados',
      'Resultados corporativos abaixo do esperado em setores-chave',
    ],
    mainRisks: [
      'Concentração excessiva: as 10 maiores empresas respondem por ~35% do índice',
      'Valuation elevado — qualquer decepção pode gerar queda forte',
      'Política monetária do Fed pode mudar o cenário rapidamente',
    ],
    relatedConcepts: [
      {
        id: 'indice-mercado',
        label: 'Índice de Mercado',
        explanation: 'O S&P 500 é o índice de referência para a economia americana e base para fundos passivos ao redor do mundo.',
      },
      {
        id: 'blue-chip',
        label: 'Blue chips',
        explanation: 'O S&P 500 é composto pelas maiores blue chips americanas: Apple, Microsoft, Amazon, NVIDIA, Alphabet.',
      },
      {
        id: 'volatilidade',
        label: 'Volatilidade',
        explanation: 'Em crises como 2008 e 2020, o S&P 500 caiu mais de 30%, mostrando que mesmo o índice mais sólido tem riscos.',
      },
    ],
    practicalExample:
      'Desde 1957, o S&P 500 rendeu em média 10,5% ao ano. R$ 10.000 investidos em 1990 valeriam mais de R$ 420.000 hoje. É por isso que Warren Buffett recomenda que a maioria das pessoas invista em fundos passivos que replicam o índice.',
    studyQuestions: [
      {
        question: 'Por que o S&P 500 é considerado o melhor termômetro da economia americana?',
        hint: 'Pense em quantas empresas importantes ele inclui e qual percentual da economia americana representam.',
        level: 'beginner',
      },
      {
        question: 'Como a política de juros do Fed afeta o nível do S&P 500?',
        hint: 'Juros mais altos tornam títulos do governo mais atrativos do que ações.',
        level: 'intermediate',
      },
      {
        question: 'O que é concentração de índice e por que pode ser um risco?',
        hint: 'Se as 10 maiores empresas pesam 35%, o que acontece se esse grupo cair muito?',
        level: 'intermediate',
      },
    ],
  },

  ixic: {
    assetId: 'ixic',
    summary: 'O Nasdaq Composite reúne mais de 3.000 empresas listadas na Nasdaq, com forte concentração em tecnologia.',
    beginnerExplanation:
      'O Nasdaq é o índice da tecnologia. Quando empresas como Apple, Microsoft, NVIDIA e Tesla sobem, o Nasdaq sobe junto. Por concentrar empresas de crescimento, é mais volátil que o S&P 500 — sobe mais nos bons momentos e cai mais nas crises.',
    whyItMovesUp: [
      'Avanços em inteligência artificial aumentando valuations das big techs',
      'Fed cortando juros — growth stocks se beneficiam mais com juros baixos',
      'Resultados trimestrais acima do esperado das Magnificent Seven',
      'Adoção acelerada de novas tecnologias abrindo novos mercados',
    ],
    whyItMovesDown: [
      'Alta dos juros americanos — growth stocks caem mais que value stocks',
      'Bolha de avaliação: valuations muito altos se tornam insustentáveis',
      'Regulação antimonopólio ameaçando big techs como Alphabet e Meta',
      'Desaceleração do crescimento de receitas das empresas de tecnologia',
    ],
    mainRisks: [
      'Concentração extrema: Apple, Microsoft e NVIDIA sozinhas respondem por ~25%',
      'Sensibilidade à taxa de juros muito maior que outros índices',
      'Exposição a ciclos de hype tecnológico (como a bolha dot-com de 2000)',
    ],
    relatedConcepts: [
      {
        id: 'indice-mercado',
        label: 'Índice de Mercado',
        explanation: 'O Nasdaq Composite é o índice de referência para o setor de tecnologia nos EUA.',
      },
      {
        id: 'ia-generativa',
        label: 'IA Generativa',
        explanation: 'O boom da IA generativa foi o principal motor do Nasdaq entre 2023 e 2025, puxado por NVIDIA, Microsoft e outros.',
      },
      {
        id: 'crescimento',
        label: 'Ações de Crescimento',
        explanation: 'A maioria das empresas do Nasdaq são growth stocks — pagam pouco ou nenhum dividendo, e os investidores esperam crescimento acelerado.',
      },
    ],
    practicalExample:
      'Em 2022, com o Fed subindo juros de 0,25% para 5,5%, o Nasdaq caiu 33% — mais que o dobro da queda do S&P 500 no mesmo período. Isso ilustra como a tecnologia sofre mais com juros altos por depender de valuation baseado em crescimento futuro.',
    studyQuestions: [
      {
        question: 'Por que o Nasdaq cai mais do que o S&P 500 quando os juros sobem?',
        hint: 'Pense em como o valor atual de lucros futuros muda com a taxa de desconto.',
        level: 'intermediate',
      },
      {
        question: 'Quais foram as consequências da bolha dot-com para o Nasdaq em 2000?',
        hint: 'O índice demorou 15 anos para recuperar o patamar anterior à crise.',
        level: 'intermediate',
      },
    ],
  },

  // ── Indicators ─────────────────────────────────────────────────────────────

  selic: {
    assetId: 'selic',
    summary: 'A Taxa Selic é a taxa básica de juros do Brasil, principal instrumento de política monetária do Banco Central.',
    beginnerExplanation:
      'A Selic é como o "termostato" da economia brasileira. Quando a inflação sobe, o Banco Central aumenta a Selic para "esfriar" a economia. Juros altos encarecem o crédito, as pessoas consomem menos, e os preços param de subir. Quando a inflação está controlada, a Selic cai para estimular a economia.',
    whyItMovesUp: [
      'Inflação acima da meta do Copom — o BC sobe a Selic para conter os preços',
      'Pressão cambial: Selic alta atrai capital estrangeiro, valorizando o Real',
      'Expectativas de inflação futura elevadas pelo mercado',
      'Incerteza fiscal elevada, exigindo prêmio de risco maior',
    ],
    whyItMovesDown: [
      'Inflação convergindo para a meta do Banco Central',
      'Atividade econômica fraca pedindo estímulo monetário',
      'Cenário externo favorável com juros internacionais em queda',
      'Ancoragem das expectativas de inflação pelo mercado',
    ],
    mainRisks: [
      'Selic muito alta por muito tempo pode frear o crescimento e elevar o desemprego',
      'Selic baixa demais pode alimentar inflação persistente',
      'Interferência política no Banco Central compromete a credibilidade da política monetária',
    ],
    relatedConcepts: [
      {
        id: 'juros',
        label: 'Juros',
        explanation: 'A Selic define o piso dos juros no Brasil e baliza todos os outros tipos de crédito e investimento do país.',
      },
      {
        id: 'politica-monetaria',
        label: 'Política Monetária',
        explanation: 'A Selic é o principal instrumento de política monetária do Banco Central do Brasil.',
      },
      {
        id: 'inflacao',
        label: 'Inflação',
        explanation: 'Controlar a inflação é o principal objetivo por trás das decisões de alta ou baixa da Selic.',
      },
    ],
    practicalExample:
      'Em 2021, a Selic estava em 2% ao ano — o menor nível da história. Em 2022, com inflação de 12%, o Banco Central subiu para 13,75% em 12 meses. Quem tinha R$ 10.000 no Tesouro Selic saiu de R$ 200 de retorno anual para R$ 1.375 — um impacto enorme na rentabilidade de investimentos conservadores.',
    studyQuestions: [
      {
        question: 'Por que a Selic é chamada de "taxa básica" de juros?',
        hint: 'Pense em como outras taxas de crédito são determinadas a partir dela.',
        level: 'beginner',
      },
      {
        question: 'O que é o Copom e com que frequência define a Selic?',
        hint: 'Comitê de Política Monetária — reúne-se a cada 45 dias aproximadamente.',
        level: 'beginner',
      },
      {
        question: 'Como a Selic afeta ao mesmo tempo o custo do crédito e o retorno de investimentos?',
        hint: 'Pense nos dois lados: quem toma emprestado e quem empresta.',
        level: 'intermediate',
      },
    ],
  },

  ipca: {
    assetId: 'ipca',
    summary: 'O IPCA é o índice oficial de inflação do Brasil, calculado mensalmente pelo IBGE.',
    beginnerExplanation:
      'O IPCA mede quanto os preços subiram para as famílias brasileiras. Pense nele como uma "lista de compras" da economia: alimentação, aluguel, transporte, saúde, educação. Se essa lista ficou 5% mais cara em um ano, o IPCA foi de 5%. É ele que o Banco Central tenta manter próximo da meta.',
    whyItMovesUp: [
      'Alta no preço de energia elétrica e combustíveis',
      'Desvalorização do Real encarecendo produtos importados',
      'Chuvas abaixo do normal afetando a produção agrícola',
      'Demanda aquecida com economia crescendo rápido',
    ],
    whyItMovesDown: [
      'Alta da Selic tornando o crédito mais caro e reduzindo o consumo',
      'Real valorizado reduzindo o custo de produtos importados',
      'Commodities agrícolas em baixa reduzindo preço de alimentos',
      'Atividade econômica fraca com menos pressão de demanda',
    ],
    mainRisks: [
      'IPCA acima da meta pode levar a altas da Selic, encarecendo o crédito',
      'Indexação: muitos contratos reajustam preços pelo IPCA, propagando a inflação',
      'Inflação desgasta salários reais e o poder de compra das famílias',
    ],
    relatedConcepts: [
      {
        id: 'inflacao',
        label: 'Inflação',
        explanation: 'O IPCA é a medida oficial de inflação do Brasil, calculada pelo IBGE desde 1980.',
      },
      {
        id: 'politica-monetaria',
        label: 'Política Monetária',
        explanation: 'O Banco Central usa a Selic para tentar manter o IPCA dentro da meta estabelecida pelo CMN.',
      },
      {
        id: 'banco-central',
        label: 'Banco Central',
        explanation: 'O Banco Central do Brasil é o responsável por manter a inflação (IPCA) próxima da meta.',
      },
    ],
    practicalExample:
      'Em 2022, o IPCA chegou a 12,13% — a maior inflação desde 2002. Uma família que gastava R$ 5.000 por mês no início do ano precisava de R$ 5.606 em dezembro para comprar as mesmas coisas. Isso corrói o poder de compra mesmo de quem não contraiu dívidas.',
    studyQuestions: [
      {
        question: 'Qual é a diferença entre o IPCA e a inflação do dia a dia que você sente no supermercado?',
        hint: 'O IPCA é uma média de várias categorias — mas o peso de cada uma varia.',
        level: 'beginner',
      },
      {
        question: 'O que é a "meta de inflação" e quem a define?',
        hint: 'No Brasil, o CMN define a meta e o Banco Central é responsável por cumpri-la.',
        level: 'intermediate',
      },
      {
        question: 'Por que a inflação alta é ruim mesmo para quem não tem dívidas?',
        hint: 'Pense no poder de compra do salário e das economias guardadas.',
        level: 'beginner',
      },
    ],
  },

  dxy: {
    assetId: 'dxy',
    summary: 'O Dollar Index (DXY) mede a força do dólar americano contra uma cesta de 6 moedas globais.',
    beginnerExplanation:
      'O DXY funciona como um "termômetro do dólar" no mundo. Quando sobe, o dólar está forte contra as principais moedas. Para o Brasil, um DXY alto normalmente significa dólar caro — produtos importados ficam mais caros e o Real tende a se desvalorizar.',
    whyItMovesUp: [
      'Fed sobe os juros americanos, atraindo capital global para o dólar',
      'Crises globais geram fuga para segurança — investidores compram dólar',
      'Economia americana crescendo mais forte que outras economias',
      'Queda no preço de commodities reduzindo demanda por moedas exportadoras',
    ],
    whyItMovesDown: [
      'Fed corta os juros americanos, reduzindo a atratividade do dólar',
      'Melhora do cenário global estimulando apetite por ativos de risco',
      'Alta nas commodities beneficiando moedas de países exportadores',
      'Crescimento mais forte em outras economias atraindo capital para fora dos EUA',
    ],
    mainRisks: [
      'DXY muito alto pressiona moedas emergentes como o Real, encarecendo importações',
      'Dólar forte reduz competitividade das exportações americanas',
      'Dependência global do dólar cria vulnerabilidades sistêmicas',
    ],
    relatedConcepts: [
      {
        id: 'dolar-indice',
        label: 'Dollar Index (DXY)',
        explanation: 'O DXY mede o dólar contra 6 moedas: Euro, Iene, Libra, Dólar Canadense, Coroa Sueca e Franco Suíço.',
      },
      {
        id: 'cambio',
        label: 'Taxa de Câmbio',
        explanation: 'O DXY sobe quando o dólar se fortalece frente às principais moedas, afetando câmbios ao redor do mundo.',
      },
      {
        id: 'commodities',
        label: 'Commodities',
        explanation: 'DXY e commodities têm relação inversa: dólar forte tende a pressionar preços de petróleo, ouro e minério.',
      },
    ],
    practicalExample:
      'Em setembro de 2022, o DXY atingiu 114,7 pontos — nível não visto em 20 anos. Nesse mesmo período, o Real chegou a R$ 5,40/dólar e o custo de importar um produto de US$ 1.000 subiu de R$ 5.000 para R$ 5.400 em semanas. Isso impactou desde a gasolina até eletrônicos.',
    studyQuestions: [
      {
        question: 'Por que o DXY sobe durante crises globais?',
        hint: 'Pense no dólar como um "ativo porto seguro" — onde as pessoas colocam dinheiro quando têm medo.',
        level: 'beginner',
      },
      {
        question: 'Como um DXY alto afeta o custo de vida no Brasil?',
        hint: 'Pense em produtos importados, combustíveis e inflação.',
        level: 'intermediate',
      },
      {
        question: 'Por que o DXY não inclui o Real ou o Yuan, apesar de serem moedas importantes?',
        hint: 'O índice foi criado em 1973 e reflete as moedas mais negociadas naquela época.',
        level: 'advanced',
      },
    ],
  },

};
