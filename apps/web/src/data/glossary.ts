import type { GlossaryConcept } from '@/types/glossary';

export const GLOSSARY: Record<string, GlossaryConcept> = {

  // ── Macroeconomia ─────────────────────────────────────────────────────────

  inflacao: {
    id: 'inflacao',
    title: 'Inflação',
    shortDefinition: 'Aumento generalizado dos preços que reduz o poder de compra da moeda.',
    fullExplanation:
      'Inflação ocorre quando a quantidade de dinheiro em circulação cresce mais rápido do que a produção de bens e serviços. Isso faz com que o mesmo dinheiro compre menos coisas ao longo do tempo. O Banco Central usa os juros como principal ferramenta de controle: juros altos tornam o crédito caro, reduzindo o consumo e, consequentemente, a pressão sobre os preços.',
    category: 'Macroeconomia',
    example:
      'Se a inflação é 6% ao ano, R$ 1.000 guardados no colchão comprarão apenas R$ 943 de produtos no ano seguinte. Em 10 anos, o poder de compra cai quase à metade.',
    relatedTerms: ['selic', 'banco-central', 'politica-monetaria'],
  },

  selic: {
    id: 'selic',
    title: 'Taxa Selic',
    shortDefinition: 'Taxa básica de juros do Brasil, definida pelo Banco Central para controlar a inflação.',
    fullExplanation:
      'A Selic é a taxa de referência para todas as outras taxas de juros do Brasil. Quando o Banco Central sobe a Selic, o crédito fica mais caro, o consumo desacelera e a inflação tende a cair. Quando a Selic cai, o crédito fica mais barato e a economia aquece — mas a inflação pode subir. Investimentos como Tesouro Selic e CDBs são diretamente indexados a ela.',
    category: 'Macroeconomia',
    example:
      'Com Selic a 10,5% ao ano, R$ 10.000 no Tesouro Selic rendem aproximadamente R$ 1.050 em um ano (antes de impostos). Se a Selic estiver a 6%, o mesmo investimento renderia R$ 600.',
    relatedTerms: ['inflacao', 'banco-central', 'juros'],
  },

  juros: {
    id: 'juros',
    title: 'Juros',
    shortDefinition: 'Custo do dinheiro emprestado ou remuneração pelo dinheiro investido.',
    fullExplanation:
      'Juros são o "preço do tempo" no sistema financeiro: quem empresta dinheiro abre mão do uso imediato e cobra juros em troca. Juros altos encarecem o crédito, freiam a economia e atraem capital estrangeiro. Juros baixos estimulam investimentos e consumo, mas podem gerar inflação se a economia estiver superaquecida.',
    category: 'Macroeconomia',
    example:
      'Um financiamento de R$ 50.000 a 1,5% ao mês resulta em pagamento total de quase R$ 90.000 em 36 parcelas. É por isso que a taxa de juros impacta diretamente o custo de vida das famílias.',
    relatedTerms: ['selic', 'banco-central', 'politica-monetaria'],
  },

  'banco-central': {
    id: 'banco-central',
    title: 'Banco Central',
    shortDefinition: 'Instituição que controla a política monetária, regula os juros e protege a estabilidade da moeda.',
    fullExplanation:
      'O Banco Central (no Brasil, o Bacen) é o guardião da moeda. Suas principais funções são: controlar a inflação via taxa de juros, emitir moeda, regular o sistema bancário e administrar as reservas internacionais. Em momentos de crise, pode atuar como "emprestador de última instância", injetando liquidez para evitar colapsos.',
    category: 'Macroeconomia',
    example:
      'Quando a inflação disparou em 2022, o Banco Central do Brasil elevou a Selic de 2% para 13,75% em menos de dois anos. Essa decisão encareceu o crédito, mas derrubou a inflação de 12% para próximo da meta de 3%.',
    relatedTerms: ['selic', 'politica-monetaria', 'inflacao'],
  },

  'politica-monetaria': {
    id: 'politica-monetaria',
    title: 'Política Monetária',
    shortDefinition: 'Conjunto de decisões do banco central para controlar a oferta de moeda e os juros.',
    fullExplanation:
      'A política monetária é a principal ferramenta para regular o ritmo da economia. Quando é contracionista (juros altos), freia a inflação mas pode desacelerar o crescimento. Quando é expansionista (juros baixos), estimula consumo e investimentos, mas pode aquecer a inflação. O equilíbrio entre crescimento e inflação é o desafio central de todo banco central.',
    category: 'Macroeconomia',
    example:
      'Em 2020, o Fed americano cortou os juros para quase zero e injetou trilhões na economia — política expansionista. Em 2022, com a inflação em 9%, reverteu o curso com a maior alta de juros em décadas.',
    relatedTerms: ['banco-central', 'selic', 'inflacao', 'juros'],
  },

  fed: {
    id: 'fed',
    title: 'Federal Reserve (Fed)',
    shortDefinition: 'Banco central americano, responsável pela política monetária dos EUA e influente no mundo inteiro.',
    fullExplanation:
      'O Fed é o banco central mais observado do mundo porque o dólar é a moeda de reserva global. Quando o Fed sobe os juros americanos, capital flui dos países emergentes para os EUA, causando desvalorização de moedas como o Real. Suas reuniões do FOMC são eventos que movem mercados globais.',
    category: 'Macroeconomia',
    example:
      'Em 2022–2023, o Fed elevou os juros de 0,25% para 5,5%. Isso fez o dólar valorizar frente a quase todas as moedas do mundo, incluindo o Real, que foi de R$ 5,20 para R$ 5,70.',
    relatedTerms: ['banco-central', 'juros', 'politica-monetaria'],
  },

  // ── Moedas ────────────────────────────────────────────────────────────────

  cambio: {
    id: 'cambio',
    title: 'Taxa de Câmbio',
    shortDefinition: 'Preço de uma moeda expresso em outra moeda.',
    fullExplanation:
      'A taxa de câmbio determina quanto de uma moeda é necessário para comprar outra. No Brasil, o câmbio flutuante significa que o Real sobe e cai conforme oferta e demanda por dólares. Fatores como fluxo de investimentos, exportações, juros e confiança política afetam essa taxa.',
    category: 'Moedas',
    example:
      'Quando o dólar vai de R$ 5,00 para R$ 6,00, um iPhone importado que custava R$ 7.000 passa a custar R$ 8.400 — aumento de 20% apenas pelo câmbio, sem qualquer mudança no preço do produto em dólar.',
    relatedTerms: ['risco-cambial', 'inflacao', 'reserva-valor'],
  },

  'reserva-valor': {
    id: 'reserva-valor',
    title: 'Moeda de Reserva',
    shortDefinition: 'Moeda mantida por bancos centrais ao redor do mundo por sua estabilidade e aceitação global.',
    fullExplanation:
      'Uma moeda de reserva é aquela em que países guardam suas reservas internacionais. O dólar responde por cerca de 60% das reservas globais, conferindo aos EUA o privilégio de se endividar na própria moeda. Em crises globais, a demanda por dólares aumenta, valorizando-o frente a outras moedas.',
    category: 'Moedas',
    example:
      'O petróleo é cotado em dólares no mundo inteiro. Quando o Brasil importa petróleo, precisa pagar em dólares, independentemente da origem. Isso sustenta a demanda constante pelo dólar.',
    relatedTerms: ['cambio', 'banco-central', 'fed'],
  },

  // ── Mercado ───────────────────────────────────────────────────────────────

  commodities: {
    id: 'commodities',
    title: 'Commodities',
    shortDefinition: 'Matérias-primas e produtos básicos padronizados negociados em mercados globais.',
    fullExplanation:
      'Commodities são produtos sem diferenciação significativa entre produtores: petróleo, soja, minério de ferro, ouro, café. Seu preço é determinado pela oferta e demanda global. O Brasil é um dos maiores exportadores de commodities do mundo, então a alta dessas matérias-primas tende a valorizar o Real e fortalecer a balança comercial.',
    category: 'Mercado',
    example:
      'Em 2022, a guerra na Ucrânia interrompeu exportações de trigo e fertilizantes, causando alta global de preços de alimentos. O Brasil, maior exportador de soja, se beneficiou — a soja bateu recordes, gerando bilhões em receita de exportação.',
    relatedTerms: ['oferta-demanda', 'cambio', 'inflacao'],
  },

  liquidez: {
    id: 'liquidez',
    title: 'Liquidez',
    shortDefinition: 'Facilidade com que um ativo pode ser convertido em dinheiro sem perda significativa de valor.',
    fullExplanation:
      'Um ativo líquido pode ser vendido rapidamente pelo preço de mercado. Ações de grandes empresas têm alta liquidez. Um imóvel tem baixa liquidez: vender rapidamente pode exigir desconto. Liquidez é fundamental em momentos de crise, quando investidores precisam acessar recursos com urgência.',
    category: 'Mercado',
    example:
      'Durante a crise de 2020, ações e títulos públicos (altamente líquidos) foram vendidos rapidamente. Imóveis e participações em empresas fechadas foram difíceis de liquidar. Por isso investidores exigem um "prêmio de iliquidez" em ativos de difícil saída.',
    relatedTerms: ['volatilidade', 'blue-chip'],
  },

  'oferta-demanda': {
    id: 'oferta-demanda',
    title: 'Oferta e Demanda',
    shortDefinition: 'Forças fundamentais que determinam o preço de qualquer bem, serviço ou ativo.',
    fullExplanation:
      'Quando a demanda por algo aumenta e a oferta permanece constante, o preço sobe. Quando a oferta aumenta sem crescimento da demanda, o preço cai. No mercado financeiro, essa dinâmica explica desde o preço de ações até o câmbio. Eventos que afetam oferta ou demanda — colheitas, guerras, inovações tecnológicas — movem preços imediatamente.',
    category: 'Mercado',
    example:
      'Em 2021, a escassez global de semicondutores (oferta baixa + demanda alta por eletrônicos) fez o preço dos chips disparar. Montadoras pararam linhas de produção por falta de chips, mostrando como uma commodity tecnológica pode travar indústrias inteiras.',
    relatedTerms: ['commodities', 'inflacao', 'liquidez'],
  },

  // ── Ações ────────────────────────────────────────────────────────────────

  dividendos: {
    id: 'dividendos',
    title: 'Dividendos',
    shortDefinition: 'Parcela do lucro que uma empresa distribui periodicamente aos seus acionistas.',
    fullExplanation:
      'Quando uma empresa tem lucro, pode reinvestir no negócio ou distribuir como dividendos. No Brasil, empresas são obrigadas a distribuir pelo menos 25% do lucro líquido. Empresas maduras e estáveis (bancos, utilities) tendem a pagar dividendos maiores; empresas de crescimento retêm mais lucro para expandir.',
    category: 'Ações',
    example:
      'Se você tem 1.000 ações de uma empresa e ela paga R$ 2,00 de dividendo por ação, você recebe R$ 2.000 sem precisar vender nenhuma ação. Esse é o princípio da renda passiva via dividendos, muito usado em estratégias de aposentadoria.',
    relatedTerms: ['lucro', 'receita', 'blue-chip'],
  },

  receita: {
    id: 'receita',
    title: 'Receita',
    shortDefinition: 'Valor total gerado pelas vendas ou serviços prestados por uma empresa em um período.',
    fullExplanation:
      'Receita é o faturamento bruto — tudo que a empresa ganhou antes de descontar custos. É diferente de lucro. Uma empresa pode ter receita crescente e ainda dar prejuízo se os custos crescerem mais rápido. Analistas observam receita para entender se o negócio está ganhando participação de mercado.',
    category: 'Ações',
    example:
      'Uma startup pode ter receita de R$ 100 milhões, mas gastar R$ 150 milhões em marketing e desenvolvimento — resultado: prejuízo de R$ 50 milhões. Amazon fez isso por anos antes de se tornar altamente lucrativa.',
    relatedTerms: ['lucro', 'valuation', 'dividendos'],
  },

  lucro: {
    id: 'lucro',
    title: 'Lucro',
    shortDefinition: 'O que sobra da receita depois que a empresa desconta todos os seus custos e despesas.',
    fullExplanation:
      'Lucro líquido é o resultado final que vai para o balanço. Pode ser distribuído como dividendos ou reinvestido. O lucro por ação (LPA) é um dos indicadores mais usados na análise de ações. Uma empresa consistentemente lucrativa tende a criar valor para acionistas no longo prazo.',
    category: 'Ações',
    example:
      'Uma empresa com receita de R$ 1 bilhão e custos de R$ 950 milhões tem margem de lucro de 5%. Outra com receita de R$ 500 milhões e custos de R$ 400 milhões tem margem de 20%. A segunda é mais eficiente, mesmo sendo menor.',
    relatedTerms: ['receita', 'dividendos', 'valuation'],
  },

  'market-cap': {
    id: 'market-cap',
    title: 'Market Cap',
    shortDefinition: 'Valor total de mercado de uma empresa: preço da ação multiplicado pelo número de ações.',
    fullExplanation:
      'Market cap representa quanto o mercado acredita que uma empresa vale hoje. Empresas são classificadas por tamanho: large caps (gigantes), mid caps (médias) e small caps (pequenas). O market cap muda com o preço das ações e reflete expectativas futuras, não o valor contábil.',
    category: 'Ações',
    example:
      'Se uma empresa tem 1 bilhão de ações e cada ação custa R$ 30, seu market cap é R$ 30 bilhões. Se o preço cair para R$ 25, o market cap cai para R$ 25 bilhões — destruição de R$ 5 bilhões de valor de mercado, mesmo sem mudança operacional.',
    relatedTerms: ['valuation', 'lucro', 'blue-chip'],
  },

  valuation: {
    id: 'valuation',
    title: 'Valuation',
    shortDefinition: 'Processo de estimar o valor justo de uma empresa ou ativo com base em seus fundamentos.',
    fullExplanation:
      'Valuation envolve projetar receitas, lucros e fluxo de caixa futuro e trazê-los a valor presente. O múltiplo P/L (preço/lucro) compara o preço da ação ao lucro por ação. Uma ação com P/L alto pode ser justificada por alto crescimento esperado — ou simplesmente estar "cara".',
    category: 'Ações',
    example:
      'Se uma empresa tem lucro de R$ 10 por ação e o mercado paga R$ 150 por ela, o P/L é 15x. Uma empresa do mesmo setor com P/L de 30x está sendo precificada com maior expectativa de crescimento.',
    relatedTerms: ['market-cap', 'lucro', 'receita'],
  },

  'blue-chip': {
    id: 'blue-chip',
    title: 'Blue Chip',
    shortDefinition: 'Ação de empresa grande, consolidada e com histórico estável de resultados.',
    fullExplanation:
      'Blue chips são as "pedras sólidas" do mercado: empresas com décadas de história, fluxo de caixa previsível e menor risco relativo. No Brasil: Petrobras, Vale, Itaú. Nos EUA: Apple, Microsoft. Tendem a pagar dividendos regulares e resistem melhor a crises do que empresas menores.',
    category: 'Ações',
    example:
      'Durante a crise de 2008, as blue chips sofreram, mas se recuperaram em 2–3 anos. Empresas menores e endividadas quebraram. Investidores conservadores preferem blue chips pela resiliência histórica.',
    relatedTerms: ['dividendos', 'market-cap', 'liquidez'],
  },

  crescimento: {
    id: 'crescimento',
    title: 'Ação de Crescimento',
    shortDefinition: 'Ação de empresa que reinveste os lucros para crescer acima da média, apostando no futuro.',
    fullExplanation:
      'Empresas de crescimento reinvestem praticamente todo o lucro para expandir o negócio em vez de pagar dividendos. O investidor aposta que o valor futuro será muito maior do que hoje. Por isso, costumam ter valuation elevado. São mais voláteis: se o crescimento decepcionar, as quedas podem ser severas.',
    category: 'Ações',
    example:
      'A Amazon por anos não pagou dividendos e tinha margens baixas, mas reinvestia tudo em logística e nuvem. Quem comprou em 2010 a US$ 180 e manteve até 2021 viu a ação chegar a US$ 3.800 — retorno acima de 2.000%.',
    relatedTerms: ['valuation', 'lucro', 'market-cap'],
  },

  // ── Risco ────────────────────────────────────────────────────────────────

  volatilidade: {
    id: 'volatilidade',
    title: 'Volatilidade',
    shortDefinition: 'Medida de quanto o preço de um ativo varia ao longo do tempo.',
    fullExplanation:
      'Alta volatilidade significa que o preço sobe e cai muito em curtos períodos — maior risco, mas também maior oportunidade. A volatilidade é medida pelo desvio padrão dos retornos. Em crises, explode; em períodos de calmaria, cai. O índice VIX mede a volatilidade esperada do mercado americano.',
    category: 'Risco',
    example:
      'Em março de 2020, o Ibovespa caiu 30% em menos de um mês. Já entre 2017–2019, o mercado subia gradualmente com baixa volatilidade. Uma criptomoeda pode variar 10% em um único dia; uma blue chip pode variar isso em um ano inteiro.',
    relatedTerms: ['risco-cambial', 'liquidez', 'market-cap'],
  },

  'risco-cambial': {
    id: 'risco-cambial',
    title: 'Risco Cambial',
    shortDefinition: 'Possibilidade de perda financeira causada por variações inesperadas na taxa de câmbio.',
    fullExplanation:
      'O risco cambial afeta empresas que importam insumos, têm dívidas em moeda estrangeira ou exportam produtos. Uma empresa com dívida em dólar perde se o dólar subir. Investidores em ativos estrangeiros também correm esse risco. Estratégias de hedge (proteção cambial) são usadas para neutralizá-lo.',
    category: 'Risco',
    example:
      'Uma companhia aérea brasileira compra aviões em dólares parcelados em 10 anos. Se o dólar subir de R$ 5 para R$ 6, suas parcelas ficam 20% mais caras em Reais — isso pode transformar lucro em prejuízo sem que a empresa mude nada em suas operações.',
    relatedTerms: ['cambio', 'volatilidade'],
  },

  // ── Tecnologia e Setores ─────────────────────────────────────────────────

  semicondutores: {
    id: 'semicondutores',
    title: 'Semicondutores',
    shortDefinition: 'Materiais usados para fabricar chips eletrônicos, a base de toda a computação moderna.',
    fullExplanation:
      'Semicondutores permitem criar transistores — os blocos fundamentais de todo chip. Chips de silício estão em smartphones, carros e servidores. A cadeia de produção é concentrada: design nos EUA, fabricação em Taiwan (TSMC) e Coreia (Samsung). Essa concentração cria dependências geopolíticas críticas.',
    category: 'Tecnologia e Setores',
    example:
      'Em 2021, a escassez de chips travou a produção de veículos no mundo inteiro. A Toyota reduziu produção em 40%. Um carro moderno usa mais de 1.000 chips — do motor ao sistema de entretenimento.',
    relatedTerms: ['gpu', 'ia-generativa', 'data-center'],
  },

  gpu: {
    id: 'gpu',
    title: 'GPU',
    shortDefinition: 'Processador especializado em cálculos paralelos, essencial para gráficos e treinamento de IA.',
    fullExplanation:
      'A GPU foi originalmente criada para renderizar gráficos em jogos. Mas sua capacidade de executar milhares de operações simultâneas a tornou ideal para treinar modelos de IA. A NVIDIA domina esse mercado. Treinar um grande modelo de linguagem como GPT-4 requer milhares de GPUs rodando por semanas.',
    category: 'Tecnologia e Setores',
    example:
      'A GPU H100 da NVIDIA custa cerca de US$ 30.000 cada. Grandes empresas de IA compram dezenas de milhares delas. A Microsoft investiu bilhões na OpenAI — boa parte foi para comprar GPUs para treinar modelos.',
    relatedTerms: ['semicondutores', 'ia-generativa', 'data-center'],
  },

  'ia-generativa': {
    id: 'ia-generativa',
    title: 'IA Generativa',
    shortDefinition: 'Inteligência artificial capaz de criar conteúdo novo — textos, imagens, código e outros.',
    fullExplanation:
      'A IA generativa é treinada em enormes volumes de dados e aprende padrões para gerar conteúdo original. Modelos como GPT (texto), DALL-E (imagens) e Codex (código) exemplificam a tecnologia. O impacto econômico é enorme: automatiza tarefas criativas e transforma indústrias. A corrida por GPUs é consequência direta desse boom.',
    category: 'Tecnologia e Setores',
    example:
      'O ChatGPT atingiu 100 milhões de usuários em apenas 2 meses — o produto de mais rápido crescimento da história. Isso gerou demanda massiva por infraestrutura. A NVIDIA viu sua ação triplicar em 2023 puxada por esse crescimento.',
    relatedTerms: ['gpu', 'data-center', 'semicondutores'],
  },

  'data-center': {
    id: 'data-center',
    title: 'Data Center',
    shortDefinition: 'Instalação física que hospeda servidores e infraestrutura para processar e armazenar dados.',
    fullExplanation:
      'Data centers são o sistema nervoso da economia digital — sem eles, não existiriam streaming, bancos digitais ou IA. A demanda explodiu com cloud computing e IA generativa. Empresas como Amazon (AWS), Microsoft (Azure) e Google (GCP) constroem data centers bilionários. O consumo de energia é um desafio crescente de sustentabilidade.',
    category: 'Tecnologia e Setores',
    example:
      'A Microsoft anunciou US$ 100 bilhões em data centers até 2030. Um único data center moderno pode consumir tanta energia quanto uma cidade de 50.000 habitantes, exigindo usinas geradoras dedicadas.',
    relatedTerms: ['gpu', 'ia-generativa', 'semicondutores'],
  },

  'veiculo-eletrico': {
    id: 'veiculo-eletrico',
    title: 'Veículo Elétrico (EV)',
    shortDefinition: 'Carro movido por motor elétrico e bateria, sem motor a combustão interna.',
    fullExplanation:
      'Veículos elétricos (EVs) não emitem CO2 diretamente e são movidos por baterias de lítio. Governos do mundo oferecem incentivos para acelerar a adoção. A China é o maior mercado, com marcas como BYD dominando localmente. A cadeia de fornecimento envolve mineradoras de lítio, fabricantes de baterias e chips semicondutores. A Tesla foi pioneira no segmento premium antes das montadoras tradicionais entrarem no setor.',
    category: 'Tecnologia e Setores',
    example:
      'Em 2023, os EVs representaram 18% de todos os carros novos vendidos no mundo. A China liderou com 9 milhões de unidades — mais do que o resto do mundo combinado. A BYD ultrapassou a Tesla em volume de vendas nesse ano.',
    relatedTerms: ['semicondutores', 'commodities', 'ia-generativa'],
  },

  // ── Ações — tipos e operações ────────────────────────────────────────────

  'acao-pn': {
    id: 'acao-pn',
    title: 'Ação Preferencial (PN)',
    shortDefinition: 'Tipo de ação sem direito a voto, mas com prioridade no recebimento de dividendos.',
    fullExplanation:
      'Ações preferenciais (PN) não dão direito de votar nas assembleias da empresa. Em compensação, têm prioridade no recebimento de dividendos em relação às ações ordinárias. No Brasil, são identificadas pelo número "4" no ticker — como PETR4 e ITUB4. Em caso de falência, acionistas PN recebem antes dos ON. Fora do Brasil, ações PN são raras — o padrão internacional é a ação ordinária.',
    category: 'Ações',
    example:
      'PETR4 é a ação preferencial da Petrobras. Quando a empresa distribui dividendos, os acionistas de PETR4 recebem antes dos acionistas de PETR3 (ordinária). Em 2022, a Petrobras pagou mais de R$ 70 bilhões em dividendos — a maior parte foi para acionistas PN.',
    relatedTerms: ['acao-on', 'dividendos', 'blue-chip'],
  },

  'acao-on': {
    id: 'acao-on',
    title: 'Ação Ordinária (ON)',
    shortDefinition: 'Tipo de ação com direito a voto nas assembleias e participação nas decisões da empresa.',
    fullExplanation:
      'Ações ordinárias (ON) dão ao acionista o direito de votar em assembleias e influenciar decisões como eleição do conselho e distribuição de lucros. No Brasil, são identificadas pelo número "3" no ticker — como VALE3 e PETR3. É o tipo padrão nos EUA. Em caso de liquidação da empresa, acionistas ON são os últimos a receber, após credores e acionistas PN.',
    category: 'Ações',
    example:
      'VALE3 é a ação ordinária da Vale. Quem tem VALE3 pode votar em assembleias e influenciar decisões estratégicas. Em 2023, grandes fundos usaram esse voto para pressionar a empresa sobre práticas ESG e remuneração dos executivos.',
    relatedTerms: ['acao-pn', 'dividendos', 'market-cap'],
  },

  buyback: {
    id: 'buyback',
    title: 'Recompra de Ações (Buyback)',
    shortDefinition: 'Quando uma empresa usa seu caixa para recomprar suas próprias ações do mercado.',
    fullExplanation:
      'No buyback, a empresa retira ações de circulação usando dinheiro do caixa. Com menos ações disponíveis, o lucro por ação (EPS) sobe automaticamente — mesmo que o lucro total seja igual. Isso tende a valorizar o preço. É muito comum em empresas americanas com caixa robusto, como Apple, Microsoft e Google. Pode ser visto como sinal de que a empresa considera suas próprias ações baratas.',
    category: 'Ações',
    example:
      'A Apple gastou US$ 90 bilhões em buyback em 2023 — mais do que o PIB do Equador. Com menos ações no mercado, cada ação restante representa uma fatia maior da empresa, elevando o preço mesmo sem crescimento de lucro.',
    relatedTerms: ['lucro', 'market-cap', 'blue-chip'],
  },

  // ── Mercado — estratégias e mecanismos ───────────────────────────────────

  'carry-trade': {
    id: 'carry-trade',
    title: 'Carry Trade',
    shortDefinition: 'Estratégia de tomar empréstimo em moeda com juros baixos e investir em moeda com juros altos.',
    fullExplanation:
      'No carry trade, um investidor toma dinheiro emprestado num país com juros baixos (como o Japão) e aplica em títulos de países com juros altos (como o Brasil). O ganho vem da diferença de juros. É uma estratégia popular em forex, mas arriscada: se a moeda de destino desvalorizar bruscamente, os ganhos evaporam. O desmonte simultâneo do carry trade por muitos investidores pode causar crises cambiais.',
    category: 'Mercado',
    example:
      'Em 2007, investidores pegavam ienes emprestados a 0,5% ao ano e aplicavam em títulos brasileiros pagando 12% ao Selic. O ganho era de 11,5% — até a crise de 2008 forçar todos a desfazer as posições ao mesmo tempo, fazendo o iene disparar.',
    relatedTerms: ['cambio', 'selic', 'juros'],
  },

  'spread-bancario': {
    id: 'spread-bancario',
    title: 'Spread Bancário',
    shortDefinition: 'Diferença entre a taxa que o banco cobra ao emprestar e a que paga a quem deposita.',
    fullExplanation:
      'O spread é a principal fonte de lucro dos bancos. Se um banco paga 10% ao ano para captar dinheiro via CDB e cobra 50% no crédito rotativo do cartão, o spread é de 40 pontos percentuais. O Brasil tem um dos maiores spreads bancários do mundo, tornando o crédito muito caro para consumidores e empresas. A concorrência de fintechs e bancos digitais tem pressionado esse valor para baixo.',
    category: 'Mercado',
    example:
      'Com a Selic a 13,75% em 2023, o Itaú pagava cerca de 13% ao ano em CDBs, mas cobrava até 400% ao ano no crédito pessoal rotativo. Essa diferença enorme sustenta os altos lucros dos bancos brasileiros.',
    relatedTerms: ['juros', 'selic', 'inadimplencia'],
  },

  // ── Risco — indicadores e conceitos ─────────────────────────────────────

  inadimplencia: {
    id: 'inadimplencia',
    title: 'Inadimplência',
    shortDefinition: 'Proporção de empréstimos não pagos no prazo. Mede o risco de crédito do sistema financeiro.',
    fullExplanation:
      'A inadimplência representa o percentual de devedores que não pagaram suas obrigações financeiras no prazo. Em crises econômicas, o desemprego sobe e mais pessoas deixam de pagar empréstimos. Para bancos, inadimplência alta significa mais provisões para devedores duvidosos e menor lucro. O Banco Central monitora esse indicador como termômetro da saúde financeira das famílias e empresas.',
    category: 'Risco',
    example:
      'Em 2023, a inadimplência das famílias brasileiras atingiu 8% — o maior nível desde 2012. Bancos aumentaram as reservas para cobrir calotes, o que reduziu temporariamente o lucro e pesou nas cotações do setor financeiro.',
    relatedTerms: ['spread-bancario', 'juros', 'volatilidade'],
  },

  'porto-seguro': {
    id: 'porto-seguro',
    title: 'Ativo Porto Seguro',
    shortDefinition: 'Ativo buscado por investidores em crises por ser considerado estável e confiável.',
    fullExplanation:
      'Em momentos de crise, investidores vendem ativos de risco e migram para "portos seguros" — ativos que tendem a manter ou ganhar valor enquanto o mercado cai. Os principais são: ouro, dólar americano, iene japonês e títulos do Tesouro americano. Essa migração coletiva é o que faz esses ativos se valorizarem em crises. Após a crise, costumam perder parte da valorização.',
    category: 'Risco',
    example:
      'Durante a pandemia de 2020, o ouro subiu 25% enquanto as bolsas despencavam. O iene valorizou 10% na semana mais caótica de março de 2020. Quem tinha esses ativos protegeu o patrimônio enquanto ações globais caíam 30%.',
    relatedTerms: ['volatilidade', 'risco-cambial', 'cambio'],
  },

  // ── Moedas — mecanismos cambiais ─────────────────────────────────────────

  'cambio-administrado': {
    id: 'cambio-administrado',
    title: 'Câmbio Administrado',
    shortDefinition: 'Sistema em que o governo controla ou intervém na taxa de câmbio em vez de deixá-la livre.',
    fullExplanation:
      'Em vez de deixar o câmbio flutuar livremente pelo mercado, alguns países intervêm comprando ou vendendo moeda estrangeira para manter a taxa próxima de um valor desejado. Isso dá ao governo controle sobre a competitividade das exportações. O yuan chinês é o exemplo mais conhecido: o Banco Popular da China define uma banda diária dentro da qual a moeda pode variar. Países com câmbio fixo ou administrado ficam mais vulneráveis a ataques especulativos.',
    category: 'Moedas',
    example:
      'Em 2015, a China desvalorizou o yuan 2% em um único dia — uma decisão deliberada para tornar as exportações mais baratas. Isso gerou volatilidade global e mostra como decisões de câmbio administrado podem impactar mercados ao redor do mundo.',
    relatedTerms: ['cambio', 'banco-central', 'risco-cambial'],
  },

  // ── Macroeconômia — mecanismos externos ─────────────────────────────────────

  'uniao-europeia': {
    id: 'uniao-europeia',
    title: 'União Europeia',
    shortDefinition: 'Bloco político e econômico de 27 países europeus com livre circulação de pessoas, bens e capital.',
    fullExplanation:
      'A União Europeia foi criada para promover a integração econômica e política da Europa após as guerras mundiais. Vinte países adotaram o Euro como moeda única — a "zona do euro". A UE cria um mercado único onde empresas e cidadãos circulam livremente, mas cada país mantém parte de sua soberania. Crises em um país membro podem afetar todos os outros.',
    category: 'Macroeconomia',
    example:
      'Em 2010, a crise da dívida grega ameaçou toda a zona do euro. Alemanha e França precisaram coordenar pacotes de resgate para evitar que a Grécia deixasse o bloco, mostrando como a integração cria interdependências fortes.',
    relatedTerms: ['bce', 'cambio', 'politica-monetaria'],
  },

  brexit: {
    id: 'brexit',
    title: 'Brexit',
    shortDefinition: 'Saída do Reino Unido da União Europeia, concluída em 2020 após referendo em 2016.',
    fullExplanation:
      'Em junho de 2016, o Reino Unido votou por 52% a 48% para deixar a União Europeia. Após anos de negociação, o Brexit foi concluído em 2020. Isso afetou acordos comerciais, movimentação de trabalhadores europeus no UK e o acesso de empresas britânicas ao mercado europeu. A Libra Esterlina foi um dos ativos mais impactados pela incerteza durante o processo.',
    category: 'Macroeconomia',
    example:
      'Na noite do resultado do referendo do Brexit em 2016, a Libra caiu mais de 10% em relação ao dólar — a maior queda em décadas. Investidores que tinham Libras perderam 10% do valor em horas por conta da incerteza política.',
    relatedTerms: ['risco-cambial', 'cambio', 'uniao-europeia'],
  },

  'pre-sal': {
    id: 'pre-sal',
    title: 'Pré-sal',
    shortDefinition: 'Reservas de petróleo localizadas abaixo de camadas de sal no fundo do oceano, descobertas no Brasil.',
    fullExplanation:
      'O pré-sal brasileiro é uma das maiores descobertas de petróleo das últimas décadas. As reservas estão a mais de 5 km de profundidade, abaixo de camadas de sal no Atlântico. A exploração é tecnicamente complexa e cara, mas o petróleo tem alta qualidade. A Petrobras é a principal operadora e o pré-sal transformou o Brasil em um grande produtor mundial.',
    category: 'Mercado',
    example:
      'Em 2010, o governo brasileiro realizou a maior capitalização da história das bolsas para financiar a exploração do pré-sal: a Petrobras captou R$ 120 bilhões. Isso posicionou o Brasil como um dos maiores exportadores de petróleo do mundo na década seguinte.',
    relatedTerms: ['commodities', 'dividendos', 'lucro'],
  },

  ecossistema: {
    id: 'ecossistema',
    title: 'Ecossistema Fechado',
    shortDefinition: 'Estratégia em que produtos e serviços funcionam melhor entre si do que com concorrentes, criando fidelização.',
    fullExplanation:
      'Em um ecossistema fechado, a empresa cria produtos e serviços que se integram perfeitamente entre si, mas têm compatibilidade limitada com concorrentes. Isso aumenta o custo de troca para o consumidor ("switching cost"), tornando-o mais fiel à marca. A Apple é o exemplo mais famoso: iPhone, Mac, iPad, iCloud, AirPods e Apple Watch funcionam juntos de forma integrada.',
    category: 'Tecnologia e Setores',
    example:
      'Uma pessoa com iPhone, MacBook e AirPods precisaria trocar todos os três aparelhos se quisesse sair do ecossistema Apple para o Android. O custo de migração (tempo, dinheiro, perda de dados e conveniência) é tão alto que a maioria prefere continuar comprando Apple.',
    relatedTerms: ['crescimento', 'market-cap', 'receita'],
  },

  'magnificent-seven': {
    id: 'magnificent-seven',
    title: 'Magnificent Seven',
    shortDefinition: 'As sete maiores empresas de tecnologia dos EUA, que dominam os índices americanos.',
    fullExplanation:
      'O termo "Magnificent Seven" se popularizou em 2023 para descrever as sete gigantes de tecnologia que respondem por grande parte do S&P 500 e Nasdaq: Apple, Microsoft, Alphabet (Google), Amazon, Meta, Tesla e NVIDIA. Juntas, chegaram a representar 30% do S&P 500. Seu desempenho influencia desproporcionalmente os índices americanos.',
    category: 'Tecnologia e Setores',
    example:
      'Em 2023, enquanto o restante das ações do S&P 500 ficou relativamente estável, as Magnificent Seven subiram em média mais de 70%. Isso fez o S&P 500 subir 24% no ano mesmo com a maioria das ações performando muito abaixo disso.',
    relatedTerms: ['indice-mercado', 'ia-generativa', 'crescimento'],
  },

  // ── Índices e mercado ─────────────────────────────────────────────────────

  'indice-mercado': {
    id: 'indice-mercado',
    title: 'Índice de Mercado',
    shortDefinition: 'Cesta ponderada de ativos que representa o desempenho médio de um mercado ou setor.',
    fullExplanation:
      'Um índice de mercado agrega o desempenho de múltiplos ativos em um único número, servindo como termômetro do mercado. O Ibovespa representa as ações mais negociadas da B3; o S&P 500, as 500 maiores empresas americanas. Índices são usados como referência (benchmark) para avaliar fundos e carteiras: bater o índice significa superar a média do mercado.',
    category: 'Mercado',
    example:
      'Se o Ibovespa sobe 15% em um ano e seu fundo de ações rendeu 10%, você ficou abaixo do índice. Se rendeu 20%, "bateu o Ibovespa". Por isso os índices são a principal régua de desempenho para investidores.',
    relatedTerms: ['bolsa-valores', 'blue-chip', 'volatilidade'],
  },

  'bolsa-valores': {
    id: 'bolsa-valores',
    title: 'Bolsa de Valores',
    shortDefinition: 'Mercado organizado onde ações e outros ativos são comprados e vendidos entre investidores.',
    fullExplanation:
      'A bolsa de valores é a infraestrutura que conecta empresas que precisam de capital com investidores dispostos a financiá-las. No Brasil, a B3 (Bolsa Brasil Balcão) é a única bolsa de valores. Nos EUA, as principais são NYSE e Nasdaq. As bolsas garantem transparência, liquidez e regulação para as negociações.',
    category: 'Mercado',
    example:
      'Quando a Petrobras emitiu novas ações em 2010 na bolsa, captou R$ 120 bilhões — a maior captação da história das bolsas na época. Esse dinheiro foi usado para explorar o pré-sal. Qualquer investidor que comprou essas ações tornou-se sócio da empresa.',
    relatedTerms: ['indice-mercado', 'blue-chip', 'dividendos'],
  },

  'dolar-indice': {
    id: 'dolar-indice',
    title: 'Dollar Index (DXY)',
    shortDefinition: 'Índice que mede a força do dólar americano frente a uma cesta de 6 moedas globais.',
    fullExplanation:
      'O DXY compara o dólar com Euro (57,6%), Iene (13,6%), Libra (11,9%), Dólar Canadense (9,1%), Coroa Sueca (4,2%) e Franco Suíço (3,6%). Um DXY alto significa dólar forte globalmente, o que tende a pressionar commodities (que ficam mais caras para outros países) e moedas emergentes como o Real. É amplamente usado para medir o apetite a risco global.',
    category: 'Moedas',
    example:
      'Em 2022, com a alta agressiva dos juros americanos, o DXY subiu de 96 para 114 pontos — o dólar mais forte em 20 anos. Nesse período, o Real, o Euro e o Iene se desvalorizaram significativamente em relação ao dólar.',
    relatedTerms: ['cambio', 'commodities', 'fed'],
  },

  // ── Macroeconomia — instituições ─────────────────────────────────────────

  bce: {
    id: 'bce',
    title: 'Banco Central Europeu (BCE)',
    shortDefinition: 'Banco central da zona do euro, responsável pela política monetária de 20 países europeus.',
    fullExplanation:
      'O BCE tem como missão principal manter a inflação próxima de 2% na zona do euro. Diferente do Fed ou do Banco Central do Brasil, cuida de uma área monetária com 20 países de economias muito diferentes. Define a taxa de juros do euro, pode comprar títulos de dívida dos países membros e supervisiona os maiores bancos europeus. Sediado em Frankfurt, Alemanha.',
    category: 'Macroeconomia',
    example:
      'Em 2022, diante de inflação de 10% puxada pela guerra na Ucrânia, o BCE subiu os juros de -0,5% para 4,5% em 14 meses — o ciclo de alta mais rápido de sua história. Essa velocidade impactou hipotecas e crédito em toda a Europa.',
    relatedTerms: ['banco-central', 'inflacao', 'politica-monetaria'],
  },

};

export const GLOSSARY_CONCEPTS: GlossaryConcept[] = Object.values(GLOSSARY);
