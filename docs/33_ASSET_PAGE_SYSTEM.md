# 33 — Página Individual de Ativo (Sprints 6, 6.1, 8)

## Rota

```
/ativo/[id]
```

Exemplos:
- `/ativo/nvda` → NVIDIA Corporation
- `/ativo/brl` → Real Brasileiro
- `/ativo/petr4` → Petrobras PN
- `/ativo/ibov` → IBOVESPA (index)
- `/ativo/selic` → Taxa Selic (indicator)
- `/ativo/id-inexistente` → tela "Ativo não encontrado"

## Estrutura de arquivos

```
apps/web/src/
├── app/
│   └── ativo/
│       └── [id]/
│           └── page.tsx               ← Server Component, generateMetadata, busca asset
├── components/
│   └── asset/
│       ├── asset-study-page.tsx       ← 'use client', layout de estudo completo
│       └── asset-header-card.tsx      ← ticker, nome, preço, variação, badges
```

## Como funciona

### `app/ativo/[id]/page.tsx` (Server Component)

1. Recebe `params.id` da URL
2. Chama `getAssetById(id)` — usa o `MarketProvider` ativo (atualmente MockMarketProvider)
3. Se não encontrar: renderiza tela "Ativo não encontrado" com link de volta
4. Se encontrar: renderiza `<AssetStudyPage asset={asset} />`
5. Exporta `generateMetadata` com título e descrição dinâmicos

### `AssetStudyPage` (Client Component)

Recebe o `Asset` via props e renderiza:
- Breadcrumb: "← Cidade financeira › SYMBOL"
- `AssetHeaderCard`: ícone, ticker, tipo, país, exchange, preço, variação, tendência, setor, risco
- Seção Descrição
- Seção Nota Educacional (box azul)
- Sparkline 30 dias
- `EducationSection` (abas: Visão Geral, Sobe/Cai, Riscos, Exemplo, Perguntas) — se existir educação para o ativo; caso contrário, exibe aviso "Conteúdo educacional ainda não disponível"
- ConceptChips clicáveis → ConceptModal com link "Ver no glossário →"
- Aviso "⚠️ Dados mockados"

### `AssetHeaderCard`

Componente puro (sem estado) que exibe o cabeçalho rico do ativo. Reutilizável em contextos futuros (listas, comparações, etc.).

## Como adicionar um ativo novo e ter página automática

1. Adicionar o ativo em `src/data/assets.ts` (MOCK_CURRENCIES, MOCK_STOCKS, MOCK_INDICES ou MOCK_INDICATORS)
2. A página `/ativo/[id]` é criada automaticamente — sem alteração de rotas
3. Opcionalmente, adicionar dados educacionais em `src/data/asset-education.ts`
4. A EducationSection aparece automaticamente se houver entrada para o `asset.id`

### Tipos de ativo suportados

| AssetType    | Badge exibido | Moeda padrão |
|--------------|---------------|--------------|
| `currency`   | Moeda         | `'BRL'`, `'USD'`, etc. |
| `stock`      | Ação          | `'BRL'`, `'USD'` |
| `index`      | Índice        | `'pts'` (pontos) |
| `indicator`  | Indicador     | `'pct'` (% a.a.) ou `'pts'` |

## Integração com a homepage

O `AssetDetailPanel` (painel lateral na homepage) exibe o link:
```
Abrir página do ativo →
```
Que leva para `/ativo/${asset.id}`. O link é discreto e não substitui o painel.

## SEO — estado atual e próximos passos

**Implementado:**
- `title`: `"NVDA — Study Helper"`
- `description`: `"Estude NVIDIA Corporation no Study Helper"`

**TODO para SEO completo:**
- Adicionar `openGraph` com imagem por ativo
- Adicionar `canonical` URL
- Gerar `sitemap.xml` com todas as rotas `/ativo/[id]`
- Considerar `robots.txt` com `Allow: /ativo/`
- Adicionar dados estruturados (JSON-LD) quando houver dados reais

## Fluxo de dados

```
URL /ativo/nvda
  → page.tsx (Server)
    → getAssetById('nvda')
      → MarketProvider.getAssetById('nvda')
        → MockMarketProvider → MOCK_ASSETS
    → <AssetStudyPage asset={nvda} />
      → AssetHeaderCard (render)
      → getAssetEducation('nvda') → EducationSection
        → EducationTabs → ConceptChips → ConceptModal
```

## Estado "não encontrado"

`/ativo/id-inexistente` renderiza:
```
🔍
Ativo não encontrado
Não existe um ativo com o id "id-inexistente".
← Voltar para a cidade
```
