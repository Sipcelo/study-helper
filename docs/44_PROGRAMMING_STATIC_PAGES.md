# 44 — Módulo Programação: Páginas Estáticas

Classificação: [PROGRAMACAO]

Implementado na Sprint 11.

---

## Como funciona /programacao

```
/programacao                      ← Server Component, busca trilhas, passa para ProgrammingTrackList
  → ProgrammingHero               ← título e subtítulo do módulo
  → ProgrammingTrackList          ← 'use client', busca + filtros + grid de cards
      → ProgrammingTrackCard[]    ← card clicável com nível, estimativa e link
  → Seção "Por que estudar?"      ← três pilares: mercado, entrevista, portfolio
  → Link módulo financeiro        ← integração entre módulos

/programacao/[slug]               ← Server Component, busca trilha pelo slug
  → ProgrammingTrackDetail        ← lista de tópicos, careerRelevance, portfolioOutcome
  → Estado 404                    ← trilha não encontrada com link de volta
```

---

## Arquivos criados

| Arquivo | Tipo | Função |
|---------|------|---------|
| `src/types/programming.ts` | Tipos | StudyTrack, StudyTopic, StudyLesson, CodeExample, InterviewQuestion, PracticeChallenge |
| `src/data/programming-tracks.ts` | Dados | MOCK_TRACKS — 10 trilhas com tópicos completos |
| `src/lib/programming/get-programming-tracks.ts` | Utilitários | getProgrammingTracks, getBySlug, getByLevel, search |
| `src/components/programming/programming-hero.tsx` | Componente | Hero do módulo |
| `src/components/programming/programming-track-card.tsx` | Componente | Card de trilha |
| `src/components/programming/programming-track-list.tsx` | Componente client | Busca + filtros + grid |
| `src/components/programming/programming-track-detail.tsx` | Componente | Página de detalhe da trilha |
| `src/app/programacao/page.tsx` | Rota | /programacao |
| `src/app/programacao/[slug]/page.tsx` | Rota dinâmica | /programacao/[slug] |

---

## Como adicionar uma nova trilha

1. Abrir `apps/web/src/data/programming-tracks.ts`
2. Adicionar o objeto ao array `MOCK_TRACKS`:

```typescript
{
  id: 'nova-trilha',
  slug: 'nova-trilha',
  title: 'Nome da Trilha',
  subtitle: 'Subtítulo curto',
  summary: 'Descrição de 1-2 linhas.',
  icon: '🔧',
  level: 'beginner',           // 'beginner' | 'intermediate' | 'advanced'
  estimatedHours: 6,
  tags: ['java', 'backend'],   // usado pelos filtros
  prerequisites: [],           // slugs de trilhas pré-requisito
  careerRelevance: 'Por que isso importa para conseguir vaga.',
  portfolioOutcome: 'O que o estudante vai construir.',
  order: 11,                   // posição na ordem recomendada
  topics: [
    { id: 'nt-01', slug: 'topico-1', title: 'Tópico 1', description: 'Breve descrição.', order: 1 },
  ],
},
```

3. A trilha aparece automaticamente em `/programacao` — sem alterar componentes.

---

## Como funciona a busca

A busca é client-side dentro de `ProgrammingTrackList`. Verifica simultaneamente:
- `track.title`
- `track.summary`
- `track.tags`
- `topic.title` de cada tópico da trilha

---

## Filtros disponíveis

| Filtro | Critério |
|--------|----------|
| Todos | Todas as trilhas |
| Fundamentos | `tags.includes('fundamentos')` |
| Java | `tags.includes('java')` |
| Spring | `tags.includes('spring')` |
| Carreira | `tags.includes('carreira')` |

Para adicionar um novo filtro: adicionar na constante `FILTERS` de `programming-track-list.tsx` e garantir que a tag correspondente exista nas trilhas.

---

## Página dinâmica [slug]

`/programacao/[slug]` é um Server Component que:

1. Recebe `params.slug` via `await params`
2. Chama `getProgrammingTrackBySlug(slug)`
3. Se encontrar: renderiza `<ProgrammingTrackDetail track={track} />`
4. Se não encontrar: renderiza estado 404 com link de volta

A rota aceita qualquer slug — não crashea para trilhas inexistentes.

`generateStaticParams()` exporta todos os slugs das trilhas para pré-renderização.

---

## Relação com o Bootcamp Java

Cada trilha tem:
- `careerRelevance` — por que aquela trilha importa para vaga
- `portfolioOutcome` — o que o estudante vai construir

As trilhas `java-essencial`, `spring-boot`, `rest-api`, `dto-validacao` e `arquitetura-controller-service-repository` espelham diretamente o conteúdo do Bootcamp AI Java Backend.

A trilha `entrevista-java-junior` conecta o aprendizado ao objetivo final: conseguir a vaga.

---

## Próximos passos

| Sprint | Entrega |
|--------|---------|
| Sprint 12 | Conteúdo real: tópicos individuais com explicação + código |
| Sprint 12 | Componente CodeBlock com syntax highlight |
| Sprint 13 | Banco de perguntas de entrevista filtráveis |
| Sprint 13 | Página /programacao/carreira-junior com checklist |
| Fase 5 | ProgrammingProvider pattern (mock → API Java) |
| Fase 6 | Integração com API Interact (voz) |

---

## Como rodar localmente

```bash
# na raiz do monorepo
pnpm --filter web dev

# acessar
http://localhost:3000/programacao
http://localhost:3000/programacao/java-essencial
http://localhost:3000/programacao/spring-boot
http://localhost:3000/programacao/entrevista-java-junior
http://localhost:3000/programacao/trilha-inexistente
```
