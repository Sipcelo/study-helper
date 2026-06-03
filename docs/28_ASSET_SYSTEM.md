# 28 — Sistema de Dados de Ativos (Sprint 2)

## Visão geral

O sistema de ativos do Study Helper é organizado em três camadas:

```
packages/types/src/index.ts     ← tipos compartilhados (monorepo)
apps/web/src/types/asset.ts     ← re-exports + aliases semânticos
apps/web/src/data/assets.ts     ← dados mockados dos ativos
apps/web/src/data/market-summary.ts  ← sumário pré-computado
apps/web/src/lib/assets/
  get-trend-state.ts            ← lógica de tendência
  format-price.ts               ← formatação de preço e percentual
  get-market-summary.ts         ← agregação de mercado
  get-assets.ts                 ← provider de ativos (mock → API futura)
```

## Tipos principais

| Tipo | Origem | Uso |
|------|--------|-----|
| `Asset` | `@study-helper/types` | Ativo completo |
| `BuildingType` | `@study-helper/types` | Tipo visual do prédio |
| `TrendState` / `AssetTrend` | `@study-helper/types` | Tendência (strong_up…strong_down) |
| `RiskLevel` / `AssetRiskLevel` | `@study-helper/types` | Nível de risco |
| `HistoryPoint` / `PricePoint` | `@study-helper/types` | Ponto de histórico de preço |
| `CityZoneId` / `AssetDistrict` | `@study-helper/types` | Distrito da cidade |
| `AssetSector` | `apps/web/src/types/asset.ts` | Setor da empresa |
| `AssetCurrency` | `apps/web/src/types/asset.ts` | Código da moeda |

## BuildingType — mapeamento visual

| BuildingType | Descrição | Topper |
|---|---|---|
| `central-bank` | Banco Central (ex: BRL) | Parapeito |
| `currency-house` | Casa de câmbio (ex: USD, EUR) | Nenhum |
| `tech-tower` | Torre tecnológica (ex: AAPL) | Antena |
| `bank-tower` | Torre bancária (ex: ITUB4) | Parapeito |
| `energy-industrial` | Industrial de energia (ex: PETR4, TSLA) | Chaminé |
| `mining-industrial` | Industrial de mineração (ex: VALE3) | Chaminé |
| `semiconductor-lab` | Laboratório de chips (ex: NVDA) | Antena |

## Como adicionar um novo ativo

### 1. Abrir `apps/web/src/data/assets.ts`

### 2. Adicionar o objeto ao array correto

```typescript
// Para moedas → MOCK_CURRENCIES
// Para ações → MOCK_STOCKS
{
  id: 'mglu3',                         // único, lowercase
  symbol: 'MGLU3',                     // símbolo de mercado
  name: 'Magazine Luiza ON',
  type: 'stock',                       // 'currency' | 'stock'
  country: 'BR',
  sector: 'Varejo',                    // opcional para stocks
  exchange: 'B3',                      // opcional para stocks
  price: 12.50,
  currency: 'BRL',                     // moeda do preço
  changePercent: -0.80,
  trend: getTrendState(-0.80),         // gerado automaticamente
  description: 'Ação ordinária do Magazine Luiza.',
  educationalSummary: 'Nota educacional em português...',
  riskLevel: 'high',                   // very_low | low | medium | high | very_high
  visualTheme: {
    primaryColor: '#ef4444',
    icon: '🛒',
    modelType: 'building',             // para 3D futuro
    buildingType: 'tech-tower',        // controla o topper do prédio 2D
  },
  history: makeHistory(12.50),         // 30 dias simulados
  lastUpdated: '2026-05-21T00:00:00Z',
  isMock: true,
},
```

### 3. Verificar no browser

O ativo aparecerá automaticamente no distrito correto da cidade.
O painel educacional, tooltip e histórico funcionam sem alteração de componentes.

## Funções utilitárias

```typescript
import { formatPrice } from '@/lib/assets/format-price';
import { getTrendState } from '@/lib/assets/get-trend-state';
import { getMarketSummary, getRiskLevel, filterAssets } from '@/lib/assets/get-market-summary';
import { getAssets, getCurrencies, getStocks, getAssetsByDistrict, getAssetById } from '@/lib/assets/get-assets';

formatPrice(asset)                  // → "R$ 38,42" ou "$1,087.42"
formatPrice(38.42, 'BRL')           // mesma saída (sobrecarga)
formatPercent(-1.30)                // → "-1.30%"
formatChangePercent(2.15)           // → "+2.15%"
getTrendState(2.15)                 // → 'up'
getTrendState(3.71)                 // → 'strong_up'
getRiskLevel(asset)                 // → "Alto" (em português)
getAssetsByDistrict()               // → { currencies: [...], stocks: [...], ... }
getAssetById('nvda')                // → Asset | undefined
```

## Preparação para API real (Sprint 3+)

`get-assets.ts` é o único ponto de entrada para dados. Para conectar uma API real:

```typescript
// get-assets.ts — trocar o mock por fetch
export async function getAssets(): Promise<Asset[]> {
  const res = await fetch('/api/assets');
  return res.json();
}
```

Os componentes não mudam — apenas o provider.

## Compatibilidade retroativa

`apps/web/src/features/market/` mantém re-exports para todos os arquivos existentes.
Não é necessário alterar imports em componentes que ainda apontam para `@/features/market/*`.
