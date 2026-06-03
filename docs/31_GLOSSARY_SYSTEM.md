# 31 — Sistema de Glossário (Sprint 4 + 4.1)

## Visão geral

O glossário é uma camada leve de definições financeiras, separada dos dados de ativos e do sistema educacional. Seu objetivo é explicar termos que aparecem nos chips de conceitos e que o usuário pode explorar em `/glossario`.

## Estrutura de arquivos

```
apps/web/src/types/glossary.ts                    ← tipos TypeScript
apps/web/src/data/glossary.ts                     ← dados dos conceitos
apps/web/src/lib/education/get-glossary-concept.ts ← funções de acesso
apps/web/src/components/education/concept-modal.tsx ← modal de detalhe
apps/web/src/app/glossario/page.tsx               ← página pública
```

## Tipos

```typescript
type GlossaryCategory =
  | 'Mercado' | 'Moedas' | 'Ações' | 'Risco' | 'Macroeconomia' | 'Tecnologia e Setores';

interface GlossaryConcept {
  id: string;
  title: string;
  shortDefinition: string;   // ≤ 120 caracteres
  fullExplanation: string;   // 3–5 frases
  category: GlossaryCategory;
  example: string;           // caso real com números
  relatedTerms: string[];    // IDs de outros GlossaryConcepts
}
```

## Como adicionar um novo conceito

### 1. Adicionar entrada em `src/data/glossary.ts`

```typescript
'meu-conceito': {
  id: 'meu-conceito',
  title: 'Nome do Conceito',
  shortDefinition: 'Definição em uma frase, máximo 120 caracteres.',
  fullExplanation: 'Explicação em 3 a 5 frases. Sem jargão não explicado.',
  category: 'Mercado',
  example: 'Exemplo concreto com números reais.',
  relatedTerms: ['inflacao', 'selic'],
},
```

O objeto `GLOSSARY_CONCEPTS` é atualizado automaticamente via `Object.values(GLOSSARY)`.

### 2. Relacionar com um ativo (opcional)

Em `src/data/asset-education.ts`, adicionar o id na lista `relatedConcepts` do ativo:

```typescript
relatedConcepts: [
  {
    id: 'meu-conceito',
    label: 'Nome do Conceito',
    explanation: 'Resumo de uma linha exibido no chip.',
  },
],
```

O chip passará a abrir o modal com o conteúdo completo do glossário automaticamente. Se o id não existir no glossário, o modal exibe o fallback com a `explanation` do chip.

## Fluxo ativo → conceito → glossário (Sprint 4.1)

O usuário pode navegar de forma contínua do ativo até o glossário completo:

```
Cidade → clica no prédio NVDA
  → Painel abre com aba "Visão Geral"
    → Chips "GPU", "IA Generativa", "Data Center"
      → clica no chip "GPU"
        → ConceptModal abre com explicação completa
          → clica "Ver no glossário →"
            → /glossario?search=GPU (busca pré-preenchida)
```

### Detalhes da integração

- `ConceptChips` (`components/education/concept-chips.tsx`) renderiza cada `relatedConcept` como um `<button>`. Ao clicar, abre o `ConceptModal`.
- `ConceptModal` busca o conceito pelo id em `getGlossaryConcept(id)`. Se encontrado, exibe conteúdo completo do glossário. Se não encontrado, exibe o `fallback.explanation` do chip.
- O rodapé do modal exibe o link **"Ver no glossário →"** que aponta para `/glossario?search=<título do conceito>`.
- A página `/glossario` lê o query param `?search=` via `useSearchParams()` e inicializa a busca com o valor, mostrando os resultados imediatamente.

### Busca por URL

`/glossario?search=GPU` → exibe resultados para "GPU" com a barra de busca pré-preenchida.

A busca é case-insensitive e verifica `title`, `shortDefinition` e `fullExplanation`.

### Estado vazio

Quando a busca não encontra resultados, o painel exibe botões de sugestão clicáveis ("inflação", "dividendos", "câmbio") que atualizam a busca diretamente.

## Como o modal funciona

O `ConceptModal` é renderizado via `createPortal(modal, document.body)`, escapando de qualquer container com `overflow: auto`. Ele fecha com:
- clique no backdrop
- tecla `Escape`
- botão `✕`

## Regras de linguagem

1. **Português claro**: sem anglicismos desnecessários.
2. **shortDefinition ≤ 120 caracteres**: deve caber em uma linha de card.
3. **fullExplanation: 3–5 frases**: nem muito curto (superficial) nem longo demais (cansativo).
4. **Exemplo com números reais**: contexto histórico é mais didático que abstrações.
5. **relatedTerms**: apontar apenas IDs que existem em `GLOSSARY`. Máximo 4 por conceito.
6. **Sem recomendações**: usar "pode subir quando", "tende a cair se". Nunca "é um bom investimento".

## Aviso obrigatório

O modal e a página `/glossario` exibem:
> ⚠️ Conteúdo educacional — não é recomendação de investimento.

Ao criar conteúdo, evitar frases como "você deve comprar" ou "invista em".

## Conceitos disponíveis (Sprint 4 — 24 conceitos)

| ID | Título | Categoria |
|---|---|---|
| inflacao | Inflação | Macroeconomia |
| selic | Taxa Selic | Macroeconomia |
| juros | Juros | Macroeconomia |
| banco-central | Banco Central | Macroeconomia |
| politica-monetaria | Política Monetária | Macroeconomia |
| fed | Federal Reserve (Fed) | Macroeconomia |
| cambio | Taxa de Câmbio | Moedas |
| reserva-valor | Moeda de Reserva | Moedas |
| commodities | Commodities | Mercado |
| liquidez | Liquidez | Mercado |
| oferta-demanda | Oferta e Demanda | Mercado |
| dividendos | Dividendos | Ações |
| receita | Receita | Ações |
| lucro | Lucro | Ações |
| market-cap | Market Cap | Ações |
| valuation | Valuation | Ações |
| blue-chip | Blue Chip | Ações |
| crescimento | Ação de Crescimento | Ações |
| volatilidade | Volatilidade | Risco |
| risco-cambial | Risco Cambial | Risco |
| semicondutores | Semicondutores | Tecnologia e Setores |
| gpu | GPU | Tecnologia e Setores |
| ia-generativa | IA Generativa | Tecnologia e Setores |
| data-center | Data Center | Tecnologia e Setores |
