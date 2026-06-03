# 32 — Market Provider System (Sprint 5)

## Por que existe o provider pattern

O Study Helper usa dados mockados agora, mas precisará de dados reais futuramente (BrAPI, Yahoo Finance, etc.). Sem o provider pattern, a UI estaria acoplada diretamente à fonte de dados — trocar de mock para API real exigiria alterar dezenas de componentes.

Com o provider pattern:
- A UI importa apenas `getAssets()`, `getAssetById()` etc. da camada `lib/assets/`
- A camada `lib/assets/` delega para o provider ativo via `getMarketProvider()`
- Trocar de mock para API real = mudar **um arquivo** (`lib/market/market-provider.ts`)

## Estrutura de arquivos

```
apps/web/src/
├── types/
│   └── market-provider.ts          ← interfaces e tipos do sistema de providers
├── lib/
│   └── market/
│       ├── market-provider.ts       ← registry/factory — retorna o provider ativo
│       └── providers/
│           ├── mock-market-provider.ts              ← provider padrão (dados estáticos)
│           └── brapi-market-provider.placeholder.ts ← contrato e TODOs para BrAPI
```

## Tipos principais

```typescript
interface MarketDataProvider {
  readonly name: MarketDataProviderName;          // 'mock' | 'brapi' | ...
  getAssets(): Asset[];
  getAssetById(id: string): Asset | undefined;
  getQuote(symbol: string): MarketDataProviderResult<AssetQuote>;
  getHistory(symbol: string, period: HistoryPeriod): MarketDataProviderResult<AssetHistoryPoint[]>;
  getProviderStatus(): MarketDataProviderStatus;  // 'online' | 'offline' | 'degraded' | 'demo'
}

type MarketDataProviderResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: MarketDataError };
```

## Como o mock funciona

`MockMarketProvider` lê diretamente de `data/assets.ts` (array estático, sem I/O):
- `getAssets()` → retorna todos os `MOCK_ASSETS`
- `getAssetById(id)` → `.find()` por id
- `getQuote(symbol)` → extrai price/changePercent do asset correspondente
- `getHistory(symbol, period)` → retorna `asset.history` (ignora o `period` por ora)
- `getProviderStatus()` → sempre `'demo'`

## Como trocar para um provider real

1. Implementar o contrato `MarketDataProvider` (ver o placeholder da BrAPI)
2. Em `lib/market/market-provider.ts`, substituir `MockMarketProvider`:

```typescript
// Antes:
export function getMarketProvider(): MarketDataProvider {
  return MockMarketProvider;
}

// Depois (exemplo com variável de ambiente):
export function getMarketProvider(): MarketDataProvider {
  if (process.env.NEXT_PUBLIC_MARKET_PROVIDER === 'brapi') {
    return BrapiMarketProvider;
  }
  return MockMarketProvider; // fallback sempre presente
}
```

3. Definir `NEXT_PUBLIC_MARKET_PROVIDER=brapi` em `.env.local`
4. **Nunca remover** o `MockMarketProvider` — ele é o fallback para dev/CI/staging

## Campos obrigatórios em Asset

Um provider real precisa preencher:

| Campo | Fonte sugerida | Obrigatório |
|---|---|---|
| id | symbol.toLowerCase() | sim |
| symbol | API | sim |
| name | API ou config fixa | sim |
| price | API | sim |
| changePercent | API | sim |
| currency | API | sim |
| trend | derivar de changePercent | sim |
| history | endpoint separado ou mock | sim (≥ 30 pontos) |
| description | config fixa por ativo | sim |
| educationalSummary | config fixa por ativo | sim |
| riskLevel | config fixa por ativo | sim |
| visualTheme | config fixa por ativo | sim |
| lastUpdated | API | sim |
| isMock | sempre `true` para mock, `false` para real | sim |

> Campos fixos por ativo (description, riskLevel, visualTheme, etc.) devem ser mantidos em uma
> tabela de configuração separada — não virão da API. A API fornece apenas cotação e histórico.

## Fallback para mock

Sempre que um provider real falhar, retornar resultado com `ok: false` e `error.code`:
- `'provider_offline'` → API fora do ar
- `'rate_limit'` → limite de chamadas atingido
- `'not_found'` → símbolo não encontrado
- `'unknown'` → erro inesperado

A camada `lib/assets/get-assets.ts` pode verificar o resultado e fazer fallback para mock:

```typescript
// exemplo de fallback futuro em get-assets.ts
const result = provider.getQuote('NVDA');
if (!result.ok) {
  return MockMarketProvider.getAssetById('nvda');
}
```

## Riscos de API externa

| Risco | Mitigação sugerida |
|---|---|
| Rate limit (plano gratuito BrAPI) | Cache com TTL de 60s em memória |
| Atraso de 15–20min nos dados | Exibir `lastUpdated` na UI |
| Dados inconsistentes entre endpoints | Validar com `validateAssets()` |
| Token exposto no cliente | Usar rota `/api/market` em vez de chamar direto |
| Downtime da API | Fallback para MockMarketProvider |

## Indicador de provider na UI

A `MarketSummaryPlaza` exibe o provider ativo e o status:
```
Praça do Mercado
Visão geral · provider: mock · demo
```

Quando um provider real estiver ativo, mostrará:
```
Visão geral · provider: brapi · online
```
