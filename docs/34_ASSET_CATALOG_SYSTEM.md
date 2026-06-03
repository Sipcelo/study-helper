# 34 — Catálogo de Ativos (Sprints 7, 8)

## Rota

```
/ativos
```

Página estática que lista, permite buscar e filtrar todos os ativos disponíveis no Study Helper.

## Estrutura de arquivos

```
apps/web/src/
├── app/
│   └── ativos/
│       └── page.tsx               ← Server Component, generateMetadata, busca assets
├── components/
│   └── asset/
│       └── asset-catalog.tsx      ← 'use client', busca + filtros + grid de cards
```

## Como funciona

### `app/ativos/page.tsx` (Server Component)

1. Chama `getAssets()` — usa o `MarketProvider` ativo (atualmente MockMarketProvider)
2. Passa o array de ativos como props para `<AssetCatalog assets={assets} />`
3. Exporta `metadata` estático com título e descrição da página

### `AssetCatalog` (Client Component)

Recebe `assets: Asset[]` via props e gerencia:

- `search: string` — texto de busca local (useState)
- `filter: FilterId` — filtro ativo (useState)
- `filtered: Asset[]` — resultado calculado via `useMemo`, sem chamadas externas

A filtragem acontece inteiramente no cliente, sem request ao servidor.

### Lógica de filtro

| FilterId     | Critério                        |
|--------------|---------------------------------|
| `all`        | Todos os ativos                 |
| `currencies` | `asset.type === 'currency'`     |
| `stocks`     | `asset.type === 'stock'`        |
| `indices`    | `asset.type === 'index'`        |
| `indicators` | `asset.type === 'indicator'`    |
| `up`         | `asset.changePercent > 0`       |
| `down`       | `asset.changePercent < 0`       |

### Lógica de busca

A busca é case-insensitive e verifica simultaneamente:
- `asset.symbol`
- `asset.name`
- `asset.country`
- `asset.sector`
- tipo textual (`"moeda"`, `"ação"`, `"índice"` ou `"indicador"`)

Busca e filtro são combinados: filtro é aplicado primeiro, busca depois.

### AssetCard

Componente interno (não exportado). Cada card exibe:
- Badge de tipo (Moeda / Ação / Índice / Indicador), país, setor
- Ticker em fonte monospace
- Nome completo
- Preço formatado + variação colorida
- Indicador de tendência (ponto colorido + label)
- Badge de risco
- Link "Estudar ativo →" apontando para `/ativo/${asset.id}`

### Estado vazio

Se `filtered.length === 0`:
- Ícone 🔍
- Mensagem: `"Nenhum ativo encontrado para '${search}'"`
- Botão "Limpar filtros" — reseta search e filter para os valores padrão

## Como um novo ativo aparece automaticamente

1. Adicionar o ativo em `src/data/assets.ts` (MOCK_CURRENCIES, MOCK_STOCKS, MOCK_INDICES ou MOCK_INDICATORS)
2. O `MockMarketProvider` retorna o novo ativo via `getAssets()`
3. `AssetsPage` recebe o array atualizado
4. O novo card aparece em `/ativos` automaticamente — sem alterar rota ou componente

## Navegação integrada

| Local            | Elemento                        | Destino     |
|------------------|---------------------------------|-------------|
| Header           | Link "Ativos"                   | `/ativos`   |
| Footer           | Link "Ativos"                   | `/ativos`   |
| Homepage         | "Ver todos os ativos →"         | `/ativos`   |
| Card do catálogo | "Estudar ativo →"               | `/ativo/[id]` |

## Filtros disponíveis

| Label       | Comportamento                                              |
|-------------|-------------------------------------------------------------|
| Todos       | Exibe todos os 18 ativos                                   |
| Moedas      | Apenas BRL, USD, EUR, JPY, GBP, CNY (6 ativos)             |
| Ações       | Apenas PETR4, VALE3, ITUB4, BBDC4, MGLU3, TSLA (6)         |
| Índices     | Apenas IBOV, SPX, IXIC (3 ativos)                          |
| Indicadores | Apenas SELIC, IPCA, DXY (3 ativos)                         |
| Em alta     | Ativos com `changePercent > 0`                             |
| Em queda    | Ativos com `changePercent < 0`                             |

## SEO — estado atual

**Implementado:**
- `title`: `"Ativos — Study Helper"`
- `description`: `"Explore e estude todos os ativos disponíveis no Study Helper."`

**TODO para SEO completo:**
- Adicionar `openGraph` com imagem da página
- Gerar link canônico
- Incluir `/ativos` no `sitemap.xml`

## Fluxo de dados

```
/ativos
  → page.tsx (Server)
    → getAssets()
      → MarketProvider.getAssets()
        → MockMarketProvider → MOCK_ASSETS
    → <AssetCatalog assets={[18 ativos]} />
      → useMemo filtra/busca no cliente
        → grid de AssetCard
          → Link /ativo/[id]
```
