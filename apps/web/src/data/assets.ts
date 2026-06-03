import type { Asset } from '@study-helper/types';
import { getTrendState } from '../lib/assets/get-trend-state';

// ── Seeded PRNG ────────────────────────────────────────────────────────────
// FNV-1a hash: turns an asset id string into a stable uint32 seed
function hashString(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// Mulberry32: fast, seedable, good distribution
function createRng(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Deterministic history ──────────────────────────────────────────────────
// Fixed anchor date — keeps history identical across reloads and days
const MOCK_HISTORY_END_DATE = '2026-05-21';

// Same assetId → same price series on every reload
function makeHistory(
  basePrice: number,
  assetId: string,
  points = 30,
): { date: string; price: number }[] {
  const rand = createRng(hashString(assetId));
  const history: { date: string; price: number }[] = [];
  let price = basePrice;
  const anchor = new Date(`${MOCK_HISTORY_END_DATE}T00:00:00Z`);
  for (let i = points; i >= 0; i--) {
    const d = new Date(anchor);
    d.setUTCDate(d.getUTCDate() - i);
    price = Math.max(price * (1 + (rand() - 0.5) * 0.03), 0.01);
    history.push({ date: d.toISOString().split('T')[0], price: parseFloat(price.toFixed(4)) });
  }
  return history;
}

// ── Mock currencies ────────────────────────────────────────────────────────

export const MOCK_CURRENCIES: Asset[] = [
  {
    id: 'brl',
    symbol: 'BRL',
    name: 'Real Brasileiro',
    type: 'currency',
    country: 'BR',
    price: 1.0,
    currency: 'BRL',
    changePercent: 0.0,
    trend: getTrendState(0.0),
    description: 'Moeda oficial do Brasil, emitida pelo Banco Central do Brasil.',
    educationalSummary:
      'O Real foi criado em 1994 pelo Plano Real para combater a hiperinflação. É a moeda mais usada no Brasil para transações diárias.',
    riskLevel: 'very_low',
    visualTheme: {
      primaryColor: '#22c55e',
      icon: '🇧🇷',
      modelType: 'institution',
      buildingType: 'central-bank',
    },
    history: makeHistory(1.0, 'brl'),
    lastUpdated: '2026-05-21T00:00:00Z',
    isMock: true,
  },
  {
    id: 'usd',
    symbol: 'USD',
    name: 'Dólar Americano',
    type: 'currency',
    country: 'US',
    price: 5.72,
    currency: 'BRL',
    changePercent: 0.43,
    trend: getTrendState(0.43),
    description: 'Moeda oficial dos Estados Unidos e principal reserva de valor global.',
    educationalSummary:
      'O dólar é a moeda de reserva mundial. Muitas commodities como petróleo e ouro são cotadas em USD. Sua variação impacta importações e exportações brasileiras.',
    riskLevel: 'low',
    visualTheme: {
      primaryColor: '#60a5fa',
      icon: '🇺🇸',
      modelType: 'institution',
      buildingType: 'currency-house',
    },
    history: makeHistory(5.72, 'usd'),
    lastUpdated: '2026-05-21T00:00:00Z',
    isMock: true,
  },
  {
    id: 'eur',
    symbol: 'EUR',
    name: 'Euro',
    type: 'currency',
    country: 'EU',
    price: 6.21,
    currency: 'BRL',
    changePercent: -0.18,
    trend: getTrendState(-0.18),
    description: 'Moeda oficial da União Europeia, usada por 20 países.',
    educationalSummary:
      'O Euro foi introduzido em 1999 para facilitar o comércio entre países europeus. É a segunda moeda mais negociada no mundo.',
    riskLevel: 'low',
    visualTheme: {
      primaryColor: '#a78bfa',
      icon: '🇪🇺',
      modelType: 'institution',
      buildingType: 'currency-house',
    },
    history: makeHistory(6.21, 'eur'),
    lastUpdated: '2026-05-21T00:00:00Z',
    isMock: true,
  },
  {
    id: 'jpy',
    symbol: 'JPY',
    name: 'Iene Japonês',
    type: 'currency',
    country: 'JP',
    price: 0.038,
    currency: 'BRL',
    changePercent: -0.65,
    trend: getTrendState(-0.65),
    description: 'Moeda oficial do Japão, terceira mais negociada no forex.',
    educationalSummary:
      'O Iene é conhecido como moeda "porto seguro". Em períodos de crise global, investidores tendem a comprar Iene pela estabilidade da economia japonesa.',
    riskLevel: 'low',
    visualTheme: {
      primaryColor: '#f87171',
      icon: '🇯🇵',
      modelType: 'bank',
      buildingType: 'currency-house',
    },
    history: makeHistory(0.038, 'jpy'),
    lastUpdated: '2026-05-21T00:00:00Z',
    isMock: true,
  },
  {
    id: 'gbp',
    symbol: 'GBP',
    name: 'Libra Esterlina',
    type: 'currency',
    country: 'GB',
    price: 7.35,
    currency: 'BRL',
    changePercent: 0.22,
    trend: getTrendState(0.22),
    description: 'Moeda oficial do Reino Unido, uma das mais antigas do mundo.',
    educationalSummary:
      'A Libra é a moeda mais antiga ainda em uso (desde o século X). É muito negociada no par GBP/USD, chamado de "cable" no mercado forex.',
    riskLevel: 'medium',
    visualTheme: {
      primaryColor: '#34d399',
      icon: '🇬🇧',
      modelType: 'bank',
      buildingType: 'currency-house',
    },
    history: makeHistory(7.35, 'gbp'),
    lastUpdated: '2026-05-21T00:00:00Z',
    isMock: true,
  },
  {
    id: 'cny',
    symbol: 'CNY',
    name: 'Yuan Chinês',
    type: 'currency',
    country: 'CN',
    price: 0.79,
    currency: 'BRL',
    changePercent: 1.12,
    trend: getTrendState(1.12),
    description: 'Moeda oficial da China, também chamada de Renminbi (RMB).',
    educationalSummary:
      'O Yuan tem crescido em relevância global com a expansão da China. O governo chinês controla parcialmente sua cotação, diferente de moedas com câmbio totalmente livre.',
    riskLevel: 'medium',
    visualTheme: {
      primaryColor: '#16a34a',
      icon: '🇨🇳',
      modelType: 'institution',
      buildingType: 'currency-house',
    },
    history: makeHistory(0.79, 'cny'),
    lastUpdated: '2026-05-21T00:00:00Z',
    isMock: true,
  },
];

// ── Mock stocks ────────────────────────────────────────────────────────────

export const MOCK_STOCKS: Asset[] = [
  {
    id: 'petr4',
    symbol: 'PETR4',
    name: 'Petrobras PN',
    type: 'stock',
    country: 'BR',
    sector: 'Energia',
    exchange: 'B3',
    price: 38.42,
    currency: 'BRL',
    changePercent: 2.15,
    trend: getTrendState(2.15),
    description: 'Ação preferencial da Petrobras, maior empresa de energia do Brasil.',
    educationalSummary:
      'PETR4 é uma ação preferencial (PN), que dá prioridade no recebimento de dividendos mas sem direito a voto. A Petrobras é controlada pelo governo brasileiro e seu desempenho está ligado ao preço do petróleo.',
    riskLevel: 'high',
    visualTheme: {
      primaryColor: '#16a34a',
      icon: '🛢️',
      modelType: 'factory',
      buildingType: 'energy-industrial',
    },
    history: makeHistory(38.42, 'petr4'),
    lastUpdated: '2026-05-21T00:00:00Z',
    isMock: true,
  },
  {
    id: 'vale3',
    symbol: 'VALE3',
    name: 'Vale ON',
    type: 'stock',
    country: 'BR',
    sector: 'Mineração',
    exchange: 'B3',
    price: 62.1,
    currency: 'BRL',
    changePercent: -1.3,
    trend: getTrendState(-1.3),
    description: 'Ação ordinária da Vale, uma das maiores mineradoras do mundo.',
    educationalSummary:
      'VALE3 é uma ação ordinária (ON), com direito a voto nas assembleias. A Vale é líder mundial em minério de ferro e níquel. Seu preço é fortemente influenciado pela demanda da China.',
    riskLevel: 'high',
    visualTheme: {
      primaryColor: '#ef4444',
      icon: '⛏️',
      modelType: 'factory',
      buildingType: 'mining-industrial',
    },
    history: makeHistory(62.1, 'vale3'),
    lastUpdated: '2026-05-21T00:00:00Z',
    isMock: true,
  },
  {
    id: 'itub4',
    symbol: 'ITUB4',
    name: 'Itaú Unibanco PN',
    type: 'stock',
    country: 'BR',
    sector: 'Financeiro',
    exchange: 'B3',
    price: 35.88,
    currency: 'BRL',
    changePercent: 0.56,
    trend: getTrendState(0.56),
    description: 'Ação preferencial do Itaú Unibanco, maior banco privado da América Latina.',
    educationalSummary:
      'Bancos como ITUB4 são chamados de "blue chips" brasileiras — empresas grandes, sólidas e muito negociadas. Pagam dividendos regularmente e são menos voláteis que small caps.',
    riskLevel: 'medium',
    visualTheme: {
      primaryColor: '#f59e0b',
      icon: '🏦',
      modelType: 'bank',
      buildingType: 'bank-tower',
    },
    history: makeHistory(35.88, 'itub4'),
    lastUpdated: '2026-05-21T00:00:00Z',
    isMock: true,
  },
  {
    id: 'aapl',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'stock',
    country: 'US',
    sector: 'Tecnologia',
    exchange: 'NASDAQ',
    price: 198.53,
    currency: 'USD',
    changePercent: 0.88,
    trend: getTrendState(0.88),
    description: 'Ação da Apple, empresa de tecnologia mais valiosa do mundo.',
    educationalSummary:
      'A Apple faz parte do índice S&P 500 e do Nasdaq 100. É considerada uma das "Magnificent Seven" — grupo de gigantes de tecnologia com grande peso nos índices americanos.',
    riskLevel: 'medium',
    visualTheme: {
      primaryColor: '#60a5fa',
      icon: '🍎',
      modelType: 'building',
      buildingType: 'tech-tower',
    },
    history: makeHistory(198.53, 'aapl'),
    lastUpdated: '2026-05-21T00:00:00Z',
    isMock: true,
  },
  {
    id: 'tsla',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    type: 'stock',
    country: 'US',
    sector: 'Tecnologia/EV',
    exchange: 'NASDAQ',
    price: 284.15,
    currency: 'USD',
    changePercent: -2.44,
    trend: getTrendState(-2.44),
    description: 'Ação da Tesla, líder em veículos elétricos e energia limpa.',
    educationalSummary:
      'Tesla é conhecida por alta volatilidade — seu preço pode variar muito em pouco tempo. É um exemplo de "growth stock": investidores pagam caro esperando crescimento futuro, não dividendos atuais.',
    riskLevel: 'very_high',
    visualTheme: {
      primaryColor: '#b91c1c',
      icon: '⚡',
      modelType: 'factory',
      buildingType: 'energy-industrial',
    },
    history: makeHistory(284.15, 'tsla'),
    lastUpdated: '2026-05-21T00:00:00Z',
    isMock: true,
  },
  {
    id: 'nvda',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    type: 'stock',
    country: 'US',
    sector: 'Semicondutores',
    exchange: 'NASDAQ',
    price: 1087.42,
    currency: 'USD',
    changePercent: 3.71,
    trend: getTrendState(3.71),
    description: 'Ação da NVIDIA, fabricante líder de GPUs e chips para IA.',
    educationalSummary:
      'A NVIDIA se tornou central para a revolução de IA. Suas GPUs são usadas para treinar modelos de linguagem. O boom da IA impulsionou a ação a ser uma das mais valiosas do mundo.',
    riskLevel: 'high',
    visualTheme: {
      primaryColor: '#16a34a',
      icon: '🖥️',
      modelType: 'building',
      buildingType: 'semiconductor-lab',
    },
    history: makeHistory(1087.42, 'nvda'),
    lastUpdated: '2026-05-21T00:00:00Z',
    isMock: true,
  },
];

// ── Mock indices ───────────────────────────────────────────────────────────

export const MOCK_INDICES: Asset[] = [
  {
    id: 'ibov',
    symbol: 'IBOV',
    name: 'Ibovespa',
    type: 'index',
    country: 'BR',
    sector: 'Índice',
    exchange: 'B3',
    price: 130150,
    currency: 'pts',
    changePercent: 0.87,
    trend: getTrendState(0.87),
    description: 'Principal índice da bolsa brasileira, composto pelas ações mais negociadas da B3.',
    educationalSummary:
      'O Ibovespa reúne as ações mais líquidas da B3 e serve como termômetro do mercado acionário brasileiro. Subir o Ibovespa significa que, em média, as ações brasileiras estão valorizando.',
    riskLevel: 'high',
    visualTheme: {
      primaryColor: '#22c55e',
      icon: '📊',
      modelType: 'building',
      buildingType: 'index-monument',
    },
    history: makeHistory(130150, 'ibov'),
    lastUpdated: '2026-05-21T00:00:00Z',
    isMock: true,
  },
  {
    id: 'spx',
    symbol: 'SPX',
    name: 'S&P 500',
    type: 'index',
    country: 'US',
    sector: 'Índice',
    exchange: 'NYSE',
    price: 5320,
    currency: 'pts',
    changePercent: -0.32,
    trend: getTrendState(-0.32),
    description: 'Índice das 500 maiores empresas listadas nas bolsas americanas.',
    educationalSummary:
      'O S&P 500 é o índice de referência para a economia americana. Fundos de investimento passivos ao redor do mundo replicam sua composição, tornando-o o índice mais acompanhado globalmente.',
    riskLevel: 'medium',
    visualTheme: {
      primaryColor: '#60a5fa',
      icon: '🏛️',
      modelType: 'building',
      buildingType: 'index-monument',
    },
    history: makeHistory(5320, 'spx'),
    lastUpdated: '2026-05-21T00:00:00Z',
    isMock: true,
  },
  {
    id: 'ixic',
    symbol: 'IXIC',
    name: 'Nasdaq Composite',
    type: 'index',
    country: 'US',
    sector: 'Índice',
    exchange: 'NASDAQ',
    price: 17150,
    currency: 'pts',
    changePercent: 0.54,
    trend: getTrendState(0.54),
    description: 'Índice com mais de 3.000 empresas listadas na Nasdaq, majoritariamente de tecnologia.',
    educationalSummary:
      'O Nasdaq Composite concentra as grandes empresas de tecnologia americanas como Apple, Microsoft, NVIDIA e Tesla. É mais volátil que o S&P 500 por ter exposição concentrada no setor de tecnologia.',
    riskLevel: 'high',
    visualTheme: {
      primaryColor: '#a78bfa',
      icon: '💹',
      modelType: 'building',
      buildingType: 'index-monument',
    },
    history: makeHistory(17150, 'ixic'),
    lastUpdated: '2026-05-21T00:00:00Z',
    isMock: true,
  },
];

// ── Mock indicators ────────────────────────────────────────────────────────

export const MOCK_INDICATORS: Asset[] = [
  {
    id: 'selic',
    symbol: 'SELIC',
    name: 'Taxa Selic',
    type: 'indicator',
    country: 'BR',
    sector: 'Macro',
    price: 10.50,
    currency: 'pct',
    changePercent: 0.0,
    trend: getTrendState(0.0),
    description: 'Taxa básica de juros do Brasil, definida pelo Comitê de Política Monetária (Copom).',
    educationalSummary:
      'A Selic é a taxa de referência que baliza todos os juros do Brasil. Quando o Banco Central sobe a Selic, o crédito fica mais caro e a inflação tende a cair. Quando cai, a economia aquece mas a inflação pode subir.',
    riskLevel: 'very_low',
    visualTheme: {
      primaryColor: '#f59e0b',
      icon: '🏦',
      modelType: 'institution',
      buildingType: 'macro-tower',
    },
    history: makeHistory(10.50, 'selic'),
    lastUpdated: '2026-05-21T00:00:00Z',
    isMock: true,
  },
  {
    id: 'ipca',
    symbol: 'IPCA',
    name: 'IPCA — Inflação',
    type: 'indicator',
    country: 'BR',
    sector: 'Macro',
    price: 5.53,
    currency: 'pct',
    changePercent: -0.15,
    trend: getTrendState(-0.15),
    description: 'Índice de Preços ao Consumidor Amplo, índice oficial de inflação do Brasil pelo IBGE.',
    educationalSummary:
      'O IPCA mede a variação de preços de uma cesta de produtos consumidos pelas famílias brasileiras. É a métrica que o Banco Central usa como meta de inflação. IPCA acima da meta pode levar a alta da Selic.',
    riskLevel: 'medium',
    visualTheme: {
      primaryColor: '#ef4444',
      icon: '📉',
      modelType: 'institution',
      buildingType: 'indicator-panel',
    },
    history: makeHistory(5.53, 'ipca'),
    lastUpdated: '2026-05-21T00:00:00Z',
    isMock: true,
  },
  {
    id: 'dxy',
    symbol: 'DXY',
    name: 'Dollar Index',
    type: 'indicator',
    country: 'US',
    sector: 'Macro',
    price: 104.30,
    currency: 'pts',
    changePercent: 0.23,
    trend: getTrendState(0.23),
    description: 'Índice que mede a força do dólar americano frente a uma cesta de 6 moedas globais.',
    educationalSummary:
      'O DXY compara o dólar com Euro, Iene, Libra, Dólar Canadense, Coroa Sueca e Franco Suíço. DXY subindo significa dólar forte globalmente — o que tende a pressionar commodities e moedas emergentes como o Real.',
    riskLevel: 'low',
    visualTheme: {
      primaryColor: '#60a5fa',
      icon: '💵',
      modelType: 'institution',
      buildingType: 'macro-tower',
    },
    history: makeHistory(104.30, 'dxy'),
    lastUpdated: '2026-05-21T00:00:00Z',
    isMock: true,
  },
];

export const MOCK_ASSETS: Asset[] = [...MOCK_CURRENCIES, ...MOCK_STOCKS, ...MOCK_INDICES, ...MOCK_INDICATORS];
