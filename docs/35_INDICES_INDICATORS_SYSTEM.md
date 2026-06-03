# 35 — Índices e Indicadores (Sprint 8)

## Objetivo

Expandir o conjunto de ativos do Study Helper com índices de bolsa (IBOV, SPX, IXIC) e indicadores macroeconômicos (SELIC, IPCA, DXY), criando um terceiro distrito visual na cidade e cobertura educacional completa para cada novo ativo.

## Novos tipos de ativo

Sprint 8 introduziu dois novos valores para `AssetType` (em `packages/types/src/index.ts`):

| Tipo        | Descrição                                  | Moeda usada |
|-------------|---------------------------------------------|-------------|
| `'index'`   | Índice de bolsa (cesta de ativos ponderada) | `'pts'`     |
| `'indicator'`| Indicador macroeconômico (taxa, preço)     | `'pct'` ou `'pts'` |

### Moedas especiais

Adicionadas em `src/lib/assets/format-price.ts`:

| Código | Formato de saída   | Exemplo      |
|--------|--------------------|--------------|
| `'pts'`| `N pts`            | `130.150 pts`|
| `'pct'`| `N% a.a.`          | `10.50% a.a.`|

## Novos ativos (Sprint 8)

### Índices de bolsa (MOCK_INDICES)

| ID    | Símbolo | Nome            | Preço      | Var.   | Bolsa   |
|-------|---------|-----------------|------------|--------|---------|
| ibov  | IBOV    | IBOVESPA        | 130.150 pts| +0.87% | B3      |
| spx   | SPX     | S&P 500         | 5.320 pts  | -0.32% | NYSE    |
| ixic  | IXIC    | NASDAQ Composite| 17.150 pts | +0.54% | NASDAQ  |

### Indicadores macroeconômicos (MOCK_INDICATORS)

| ID    | Símbolo | Nome          | Preço       | Var.   |
|-------|---------|---------------|-------------|--------|
| selic | SELIC   | Taxa Selic    | 10.50% a.a. | 0%     |
| ipca  | IPCA    | IPCA          | 5.53% a.a.  | -0.15% |
| dxy   | DXY     | Dollar Index  | 104 pts     | +0.23% |

## Novos building types

Adicionados ao tipo `BuildingType` em `packages/types/src/index.ts`:

| BuildingType       | Usado por           | Visual no mapa         |
|--------------------|---------------------|------------------------|
| `'index-monument'` | IBOV, SPX, IXIC     | Topper de 3 colunas    |
| `'macro-tower'`    | SELIC, DXY          | Topper ponto + agulha  |
| `'indicator-panel'`| IPCA                | Topper parapeito plano |

## Terceiro distrito visual

A cidade agora tem três distritos em dois grupos de linhas:

```
┌─────────────────────────┬──────────────────────────────┐
│  Distrito de Moedas     │  Distrito de Ações           │
│  (currencies)           │  (stocks)                    │
└─────────────────────────┴──────────────────────────────┘
══════════════════════════ Rua ════════════════════════════
┌──────────────────────────────────────────────────────────┐
│  Distrito de Índices e Indicadores (indices)             │
│  (largura total)                                         │
└──────────────────────────────────────────────────────────┘
```

### Mapeamento CityZoneId → AssetType

`CityZoneId` tem 4 valores fixos. Índices e indicadores compartilham a zona `'indices'`:

| CityZoneId  | AssetTypes cobertos             |
|-------------|----------------------------------|
| `currencies`| `'currency'`                    |
| `stocks`    | `'stock'`                       |
| `indices`   | `'index'` **e** `'indicator'`   |
| `library`   | (reservado)                     |

A função `getAssetsByDistrict('indices')` filtra com:
```typescript
a.type === 'index' || a.type === 'indicator'
```

## Funções de acesso

Adicionadas em `src/lib/assets/get-assets.ts`:

```typescript
export function getIndices(): Asset[]      // type === 'index'
export function getIndicators(): Asset[]   // type === 'indicator'
```

A homepage usa:
```typescript
const indices = [...getIndices(), ...getIndicators()];
```

## Novos conceitos no glossário

Adicionados em `src/data/glossary.ts`:

| ID               | Nome                  | Categoria |
|------------------|-----------------------|-----------|
| `indice-mercado` | Índice de Mercado     | Mercado   |
| `bolsa-valores`  | Bolsa de Valores      | Mercado   |
| `dolar-indice`   | Dollar Index (DXY)    | Moedas    |

Esses conceitos são referenciados nos relatedConcepts da educação dos novos ativos.

## Dados educacionais

Todos os 6 novos ativos têm entrada completa em `src/data/asset-education.ts`:

| ID    | relatedConcepts (Visão Geral)                              |
|-------|------------------------------------------------------------|
| ibov  | `indice-mercado`, `bolsa-valores`, `volatilidade`          |
| spx   | `indice-mercado`, `blue-chips`, `volatilidade`             |
| ixic  | `indice-mercado`, `blue-chips`, `volatilidade`             |
| selic | `taxa-selic`, `politica-monetaria`, `inflacao`             |
| ipca  | `inflacao`, `politica-monetaria`, `taxa-selic`             |
| dxy   | `dolar-indice`, `taxa-cambio`, `commodities`               |

## Estrutura de arquivos modificada

```
packages/
├── types/src/index.ts              ← +AssetType 'indicator', +BuildingType x3
├── config/src/index.ts             ← label 'Distrito de Índices e Indicadores'

apps/web/src/
├── data/
│   ├── assets.ts                   ← +MOCK_INDICES, +MOCK_INDICATORS
│   ├── glossary.ts                 ← +3 conceitos
│   └── asset-education.ts          ← +6 blocos educacionais
├── lib/assets/
│   ├── format-price.ts             ← +'pts', +'pct'
│   └── get-assets.ts               ← +getIndices(), +getIndicators()
├── components/city/
│   ├── city-map.tsx                ← +prop indices, Road component, layout 2 linhas
│   └── asset-building.tsx          ← +toppers index-monument, macro-tower, indicator-panel
├── components/
│   ├── asset-detail-panel.tsx      ← badge 4-way type
│   └── asset/
│       └── asset-header-card.tsx   ← badge 4-way type
└── app/page.tsx                    ← +getIndices/getIndicators, indices={indices}
```

## Validação pós-Sprint 8

Checklist verificado em browser:

- [x] `/ativo/ibov` — preço 130.150 pts, tabs educacionais, chips clicáveis
- [x] `/ativo/spx` — preço 5.320 pts, badge Índice, educação completa
- [x] `/ativo/ixic` — preço 17.150 pts, 0 erros no console
- [x] `/ativo/selic` — preço 10.50% a.a., badge Indicador, tabs ok
- [x] `/ativo/ipca` — preço 5.53% a.a., 0 erros no console
- [x] `/ativo/dxy` — preço 104 pts, modal de conceito abre corretamente
- [x] `/ativos` — filtro "Índices" → 3 ativos, "Indicadores" → 3 ativos, total 18
- [x] `/glossario` — continua funcionando sem erros
- [x] Homepage — 3 distritos visíveis, 18 prédios no total
- [x] `pnpm typecheck` — 0 erros
