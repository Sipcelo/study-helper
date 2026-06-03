# 49 — Study Planner UI: /meu-plano

Classificação: [PLATAFORMA] [CARREIRA] [PROGRAMACAO]

Implementado na Sprint 14.

---

## Como /meu-plano funciona

`/meu-plano` é uma página Server Component que carrega o plano mockado `GRC_30_DAY_PLAN` diretamente do arquivo de dados TypeScript e o renderiza em uma interface com overview, progresso e navegação por semanas.

```
apps/web/src/app/meu-plano/page.tsx (Server Component)
  ├── StudyPlanOverview      ← título, badges, stats, tags, projeto final
  ├── StudyProgressSummary   ← barras de progresso (0/N — dados mockados)
  └── StudyWeekBrowser       ← filtro de semanas + lista de semanas (client)
        └── StudyWeekCard[]  ← uma card por semana com dias expandíveis
              └── StudyDayCard[] (client) ← accordion: tarefas, materiais, artefatos, perguntas
```

---

## Como o GRC_30_DAY_PLAN é renderizado

```typescript
// page.tsx
import { GRC_30_DAY_PLAN } from '@/data/study-plan-examples';
const plan = GRC_30_DAY_PLAN;

// Dados passados como props para os componentes:
<StudyPlanOverview plan={plan} />        // estatísticas calculadas do objeto
<StudyProgressSummary plan={plan} />     // conta total de dias/tarefas/artefatos
<StudyWeekBrowser weeks={plan.weeks} />  // lista com filtro client-side
```

As estatísticas são calculadas no servidor a partir do objeto TypeScript — sem chamada a API, sem hydration de dados, resultado imediato.

### Cálculo de estatísticas

```typescript
function countPlanStats(plan: StudyPlan) {
  const allDays = plan.weeks.flatMap(w => w.days);
  return {
    totalWeeks:     plan.weeks.length,           // 5
    totalDays:      allDays.length,              // 22
    totalTasks:     allDays.flatMap(d => d.tasks).length, // 81
    totalArtifacts: allDays.filter(d => d.artifact).length, // 16
  };
}
```

---

## Componentes criados

| Componente | Arquivo | Tipo | Função |
|------------|---------|------|--------|
| `StudyPlanOverview` | `study-plan-overview.tsx` | Server | Título, badges (área/dificuldade/role), stats grid 4 colunas, tags, projeto final |
| `StudyProgressSummary` | `study-progress-summary.tsx` | Server | 3 barras de progresso (dias/tarefas/artefatos) com 0% atual |
| `StudyWeekBrowser` | `study-week-browser.tsx` | **Client** | Filtro por semana (useState) + lista de `StudyWeekCard` |
| `StudyWeekCard` | `study-week-card.tsx` | Server/Client* | Header da semana (tema, objetivo, contagens) + lista de `StudyDayCard` |
| `StudyDayCard` | `study-day-card.tsx` | **Client** | Accordion expansível: título do dia, objetivo, tempo, `StudyTaskList`, `StudyArtifactList` |
| `StudyTaskList` | `study-task-list.tsx` | Server | Lista de tarefas com ícone por tipo + duração; lista de materiais |
| `StudyArtifactList` | `study-artifact-list.tsx` | Server | Card de artefato com type badge e template; perguntas de revisão com badge de dificuldade |

*`StudyWeekCard` não declara `'use client'` mas é usado dentro de `StudyWeekBrowser` (client), então opera no contexto client.

---

## Acento visual do Study Planner

| Elemento | Classe Tailwind |
|----------|----------------|
| Badge de área | `amber-400, amber-950/50, amber-800/50` |
| Filtro ativo | `amber-600` |
| Projeto final | `amber-800/30, amber-950/10` |
| Artefato | `amber-800/40, amber-950/10` |
| Progresso | `amber-500` |
| Header "Meu Plano" | `hover:text-amber-400` |

O amber diferencia visualmente o Study Planner do módulo de Programação (emerald) e do módulo Financeiro (blue).

---

## Navegação

Adicionado em header e footer:

```tsx
// header.tsx — primeiro link antes de Programação
<Link href="/meu-plano" className="... hover:text-amber-400 ...">
  Meu Plano
</Link>

// footer.tsx — segundo link, após Início
<Link href="/meu-plano" className="... hover:text-amber-400 ...">
  Meu Plano
</Link>
```

---

## Comportamento dos componentes interativos

### StudyWeekBrowser
- Estado: `activeWeek: number | null`
- `null` → exibe todas as semanas
- `number` → exibe apenas a semana correspondente
- Botões: "Todas as semanas" + "Semana 1" a "Semana 5"

### StudyDayCard
- Estado: `expanded: boolean` (padrão: `false`)
- Clique no header → toggle expand/collapse
- Expandido: mostra objetivo completo, tarefas, materiais, artefato, perguntas
- Colapsado: mostra apenas número do dia, título, tempo estimado e badge de artefato (se houver)

---

## O que será persistido futuramente

| Dado | Onde persistir | Quando |
|------|---------------|--------|
| `completedTaskIds` | banco Java API | Fase 4 |
| `completedArtifacts` | banco Java API | Fase 4 |
| `currentDay` e `currentWeek` | banco Java API | Fase 4 |
| `percentComplete` | calculado no servidor | Fase 4 |
| Histórico de respostas às perguntas | banco Java API | Fase 5 |
| Plano gerado dinamicamente | LLM via API Interact | Fase 6 |

O tipo `StudyPlanProgress` já está definido em `apps/web/src/types/study-plan.ts` para quando a persistência for implementada.

---

## Arquivos criados

| Arquivo | Tipo |
|---------|------|
| `apps/web/src/app/meu-plano/page.tsx` | Rota principal |
| `apps/web/src/components/study-plan/study-plan-overview.tsx` | Componente |
| `apps/web/src/components/study-plan/study-progress-summary.tsx` | Componente |
| `apps/web/src/components/study-plan/study-week-browser.tsx` | Componente (client) |
| `apps/web/src/components/study-plan/study-week-card.tsx` | Componente |
| `apps/web/src/components/study-plan/study-day-card.tsx` | Componente (client) |
| `apps/web/src/components/study-plan/study-task-list.tsx` | Componente |
| `apps/web/src/components/study-plan/study-artifact-list.tsx` | Componente |

## Arquivos alterados

| Arquivo | Alteração |
|---------|-----------|
| `apps/web/src/components/layout/header.tsx` | Adicionado link "Meu Plano" com hover amber |
| `apps/web/src/components/layout/footer.tsx` | Adicionado link "Meu Plano" com hover amber |
| `docs/00_INDEX.md` | Entrada adicionada |

---

## Próximos passos

| Sprint | Entrega |
|--------|---------|
| Sprint 15 | Checkbox de tarefa concluída (localStorage como persistência temporária) |
| Sprint 15 | Visual "dia concluído" na semana |
| Sprint 16 | Formulário para gerar plano por área (sem IA, regras fixas) |
| Sprint 17 | Múltiplos planos na mesma página |
| Fase 4 | Integração com backend Java para persistência real |
| Fase 6 | Geração de plano via API Interact (IA) |
