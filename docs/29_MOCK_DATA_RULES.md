# 29 — Regras dos Dados Mockados (Sprint 2.1)

## Localização dos dados

Todos os ativos mockados ficam em:
```
apps/web/src/data/assets.ts
```

## Histórico determinístico

Cada ativo gera 31 pontos de preço (30 dias + ponto inicial) usando um gerador pseudoaleatório com seed fixa e uma **data de referência fixa**.

**Algoritmo:**
1. O `id` do ativo (ex: `'nvda'`) é convertido num `uint32` via hash FNV-1a.
2. Esse número vira a seed do gerador Mulberry32.
3. A constante `MOCK_HISTORY_END_DATE = '2026-05-21'` é usada como âncora de datas.
4. A função `makeHistory(basePrice, assetId)` produz sempre a mesma série de preços e datas para o mesmo `assetId`.

**Resultado:** Recarregar a página, reiniciar o servidor ou mudar o dia do sistema não altera o histórico mockado.

**Data fixa:** `MOCK_HISTORY_END_DATE = '2026-05-21'`
Para avançar a janela de datas dos mocks, atualize essa constante em `apps/web/src/data/assets.ts`.

**Exemplo:**
```typescript
makeHistory(1087.42, 'nvda')  // sempre os mesmos 31 pontos, datas 2026-04-21 → 2026-05-21
makeHistory(1087.42, 'aapl')  // série diferente, mas igualmente estável
```

## Campos obrigatórios por ativo

| Campo | Tipo | Notas |
|---|---|---|
| `id` | `string` | lowercase, único, sem espaços |
| `symbol` | `string` | ticker em maiúsculas (ex: `PETR4`) |
| `name` | `string` | nome completo |
| `type` | `'currency' \| 'stock'` | determina o distrito |
| `currency` | `string` | moeda do preço (`BRL`, `USD`, etc.) |
| `price` | `number` | preço atual |
| `changePercent` | `number` | variação percentual (pode ser negativa) |
| `trend` | `TrendState` | usar `getTrendState(changePercent)` |
| `visualTheme.buildingType` | `BuildingType` | controla topper do prédio |
| `history` | array ≥ 30 pontos | usar `makeHistory(price, id)` |

## Como validar novos ativos

A validação roda automaticamente em `NODE_ENV=development` ao importar `get-assets.ts`.

Para validar manualmente:
```typescript
import { validateAssets } from '@/lib/assets/validate-assets';
import { MOCK_ASSETS } from '@/data/assets';

const warnings = validateAssets(MOCK_ASSETS);
console.table(warnings); // lista campo + mensagem por ativo
```

Warnings aparecem apenas no console — não quebram a aplicação nem afetam a UI.

## Exemplo completo de novo ativo

```typescript
// em apps/web/src/data/assets.ts, dentro de MOCK_STOCKS:
{
  id: 'mglu3',
  symbol: 'MGLU3',
  name: 'Magazine Luiza ON',
  type: 'stock',
  country: 'BR',
  sector: 'Varejo',
  exchange: 'B3',
  price: 12.50,
  currency: 'BRL',
  changePercent: -0.80,
  trend: getTrendState(-0.80),        // gerado automaticamente
  description: 'Ação ordinária do Magazine Luiza.',
  educationalSummary: 'MGLU3 é exemplo de ação de varejo...',
  riskLevel: 'high',
  visualTheme: {
    primaryColor: '#ef4444',
    icon: '🛒',
    modelType: 'building',
    buildingType: 'tech-tower',       // escolha o tipo visual
  },
  history: makeHistory(12.50, 'mglu3'),  // seed = 'mglu3'
  lastUpdated: '2026-05-21T00:00:00Z',
  isMock: true,
},
```

## buildingType disponíveis

| Valor | Exemplo | Topper |
|---|---|---|
| `central-bank` | BRL | Parapeito |
| `currency-house` | USD, EUR | Flat |
| `tech-tower` | AAPL | Antena |
| `bank-tower` | ITUB4 | Parapeito |
| `energy-industrial` | PETR4, TSLA | Chaminé |
| `mining-industrial` | VALE3 | Chaminé |
| `semiconductor-lab` | NVDA | Antena |
