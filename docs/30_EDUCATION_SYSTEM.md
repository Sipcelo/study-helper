# 30 — Sistema Educacional (Sprint 3 + 3.1 + 6.1)

## Visão geral

O sistema educacional transforma o Study Helper de um dashboard visual em uma plataforma de estudo. Cada ativo possui um conjunto estruturado de conteúdo didático separado dos dados financeiros.

## Estrutura de arquivos

```
apps/web/src/types/education.ts              ← tipos TypeScript
apps/web/src/data/asset-education.ts         ← conteúdo educacional por ativo
apps/web/src/lib/education/
  get-asset-education.ts                     ← funções de acesso + dispara warnings dev
  validate-asset-education.ts               ← validação de integridade (Sprint 6.1)
apps/web/src/components/education/
  education-section.tsx                      ← wrapper → EducationTabs
  education-tabs.tsx                         ← navegação por abas (Sprint 3.1)
  concept-chips.tsx                          ← chips de conceitos relacionados (Sprint 3.1)
```

## Painel educacional — estrutura de abas (Sprint 3.1)

O `EducationTabs` divide o conteúdo em 5 abas para evitar scroll excessivo:

| Aba | Conteúdo |
|---|---|
| Visão Geral | `beginnerExplanation` + `relatedConcepts` como chips |
| Sobe/Cai | `whyItMovesUp` + `whyItMovesDown` |
| Riscos | `mainRisks` |
| Exemplo | `practicalExample` |
| Perguntas | `studyQuestions` com dica opcional |

### ConceptChips

Os `relatedConcepts` são renderizados como chips com tooltip nativo (atributo `title`). A explicação do conceito aparece no hover. Nenhuma modal ou popover é necessário nesta sprint. O tooltip inclui: `"(Glossário em sprint futura)"` para sinalizar ao usuário que haverá mais detalhes no futuro.

### Limites recomendados por ativo

- `whyItMovesUp`: 3–5 itens
- `whyItMovesDown`: 3–5 itens
- `mainRisks`: 2–4 itens
- `relatedConcepts`: 2–4 chips
- `studyQuestions`: 2–3 perguntas

## Tipos

```typescript
type EducationLevel = 'beginner' | 'intermediate' | 'advanced';

interface StudyQuestion {
  question: string;
  hint?: string;
  level: EducationLevel;
}

interface EducationConcept {
  id: string;
  label: string;
  explanation: string;
}

interface AssetEducation {
  assetId: string;
  summary: string;
  whyItMovesUp: string[];
  whyItMovesDown: string[];
  mainRisks: string[];
  relatedConcepts: EducationConcept[];
  beginnerExplanation: string;
  practicalExample: string;
  studyQuestions: StudyQuestion[];
}
```

## Diferença: dado financeiro vs. conteúdo educacional

| Dado financeiro (`Asset`) | Conteúdo educacional (`AssetEducation`) |
|---|---|
| Preço atual | Por que o preço sobe ou cai |
| Variação percentual | Riscos que o investidor deve conhecer |
| Histórico de 30 dias | Exemplo prático e contextualizado |
| Setor e bolsa | Perguntas para aprofundamento |

O `Asset` descreve **o que é** o ativo. O `AssetEducation` explica **como pensar** sobre ele.

## Como adicionar conteúdo educacional para um novo ativo

### 1. Adicionar o ativo em `src/data/assets.ts`

Ver documentação em `docs/29_MOCK_DATA_RULES.md`.

### 2. Adicionar entrada em `src/data/asset-education.ts`

```typescript
mglu3: {
  assetId: 'mglu3',
  summary: 'Uma frase resumindo o ativo.',
  beginnerExplanation: 'Explicação simples em 2-3 frases, sem jargão.',
  whyItMovesUp: [
    'Fator 1 que faz o preço subir',
    'Fator 2',
  ],
  whyItMovesDown: [
    'Fator 1 que faz o preço cair',
    'Fator 2',
  ],
  mainRisks: [
    'Risco principal 1',
    'Risco principal 2',
  ],
  relatedConcepts: [
    {
      id: 'varejo',
      label: 'Setor de varejo',
      explanation: 'Empresas que vendem produtos diretamente ao consumidor final.',
    },
  ],
  practicalExample: 'Um exemplo com números reais que ajude a entender o ativo.',
  studyQuestions: [
    {
      question: 'Uma pergunta que estimule reflexão?',
      hint: 'Uma dica sem dar a resposta direta.',
      level: 'beginner',
    },
  ],
},
```

### 3. O painel exibe automaticamente

O componente `EducationSection` é renderizado pelo `AssetDetailPanel` sempre que `getAssetEducation(asset.id)` retornar dados.

## Regras de linguagem

1. **Português claro**: sem anglicismos desnecessários. Use "variação" em vez de "performance".
2. **Sem jargão não explicado**: se usar um termo técnico, explique em seguida.
3. **Exemplos com números reais**: contexto histórico ou valores concretos são mais didáticos que abstrações.
4. **Perguntas abertas**: as perguntas de estudo devem estimular reflexão, não ter resposta de sim/não.
5. **Nível coerente**: `beginner` para conceitos do dia a dia; `advanced` para mercados de derivativos e macro.

## Validação de integridade (Sprint 6.1)

`validate-asset-education.ts` exporta duas funções:

- `validateAssetEducation()` — retorna lista de ativos com IDs de `relatedConcepts` ausentes do glossário.
- `logAssetEducationWarnings(assetIds)` — emite `console.warn` em `NODE_ENV=development` para cada problema encontrado.

`get-asset-education.ts` chama `logAssetEducationWarnings` na inicialização do módulo, então os warnings aparecem automaticamente no terminal do dev server quando houver inconsistências.

### Regra de integridade

Todo `relatedConcept.id` em `asset-education.ts` **deve existir** como chave em `data/glossary.ts`. Se não existir, adicione o conceito ao glossário antes de referenciar.

## Aviso obrigatório

Todo conteúdo educacional deve deixar claro que **não é recomendação de investimento**.
O painel exibe este aviso ao final:
> ⚠️ Dados mockados — apenas para fins educacionais. Não representam cotações reais.

Ao criar conteúdo, evite frases como "você deve comprar" ou "é um bom investimento". Use sempre "pode subir quando" ou "historicamente, quando X acontece, Y tende a ocorrer".
