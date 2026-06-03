# 50 — Progresso Local do Study Planner

## Sprint 15 — Progresso Persistido em localStorage

**Módulo:** [PLATAFORMA]  
**Status:** Concluído  
**Data:** 2026-05-27

---

## Objetivo

Adicionar rastreamento de progresso real na UI do Study Planner em `/meu-plano`, com persistência via localStorage. O usuário pode marcar tarefas e artefatos como concluídos e o progresso sobrevive a recarregamentos de página.

---

## Arquitetura

### Fluxo de dados

```
page.tsx (Server)
  ├── <StudyPlanOverview plan={...} />   ← estático, sem estado
  └── <StudyPlanShell />                 ← Client boundary (único useState)
        ├── useStudyPlanProgress(plan)    ← hook com localStorage
        ├── <StudyProgressSummary stats onReset />
        └── <StudyWeekBrowser weeks completedTaskIds completedArtifactIds onToggleTask onToggleArtifact />
              └── <StudyWeekCard ...>
                    └── <StudyDayCard ...>
                          ├── <StudyTaskList completedTaskIds onToggleTask />
                          └── <StudyArtifactList artifactId isArtifactCompleted onToggleArtifact />
```

### Decisão de arquitetura

Prop-drilling em vez de Context API. Justificativa:
- Hierarquia rasa (máximo 4 níveis)
- Evita overhead de Context para dado que muda com baixa frequência
- Mais fácil de testar e rastrear o fluxo de dados

---

## Hook: `useStudyPlanProgress`

**Arquivo:** `apps/web/src/hooks/use-study-plan-progress.ts`

### Interface pública

```typescript
interface UseStudyPlanProgressReturn {
  completedTaskIds: Set<string>;
  completedArtifactIds: Set<string>;
  toggleTask: (taskId: string) => void;
  toggleArtifact: (artifactId: string) => void;
  resetProgress: () => void;
  isTaskCompleted: (taskId: string) => boolean;
  isArtifactCompleted: (artifactId: string) => boolean;
  mounted: boolean;
  stats: ProgressStats;
}
```

### ProgressStats

```typescript
interface ProgressStats {
  totalTasks: number;
  completedTasks: number;
  totalArtifacts: number;
  completedArtifacts: number;
  totalDays: number;
  completedDays: number;
  percentTasks: number;
  percentArtifacts: number;
  percentDays: number;
  percentOverall: number;
}
```

`percentOverall` = média simples de `percentTasks`, `percentArtifacts` e `percentDays`.

### Prevenção de hydration mismatch

localStorage só existe no browser. Para evitar diferença entre SSR e client:

1. `mounted` inicia como `false`
2. Primeiro `useEffect` lê localStorage e seta `mounted = true`
3. Segundo `useEffect` só escreve localStorage quando `mounted === true`
4. Componentes que dependem do estado real só renderizam após `mounted`

---

## Chave de armazenamento

```
study-helper:study-plan:grc-30-day:progress
```

Formato gravado:
```json
{
  "completedTaskIds": ["grc-1-1", "grc-1-2"],
  "completedArtifactIds": ["artifact-day-1"]
}
```

---

## IDs de artefatos

O modelo `StudyArtifact` não possui campo `id`. IDs são construídos na camada de UI:

```
artifact-day-{dayNumber}
```

Exemplo: `artifact-day-5` = artefato do dia 5.

---

## Componentes atualizados

| Componente | Mudança |
|-----------|---------|
| `StudyPlanShell` | Novo. Client boundary. Chama o hook. |
| `StudyProgressSummary` | Recebe `stats` e `onReset`. Mostra barras reais. Botão reset com `window.confirm`. |
| `StudyWeekBrowser` | Recebe 4 novos props e passa para `StudyWeekCard`. |
| `StudyWeekCard` | Computa `completedTasksInWeek`, `completedDaysInWeek`, `isWeekComplete`. Badge "Concluída ✓". |
| `StudyDayCard` | Computa `isDayComplete`, `isArtifactDone`. Badge "Concluído ✓". |
| `StudyTaskList` | Tasks são botões. Checkbox emerald quando concluída. Texto riscado. |
| `StudyArtifactList` | Botão "Marcar como entregue" / "Artefato entregue". |

---

## UX

- Tarefa concluída: checkbox verde ✓, texto com line-through, borda emerald
- Dia completo: badge "Concluído ✓" no header do card
- Semana completa: badge "Concluída ✓" no header da semana
- Artefato entregue: botão fica verde com texto "Artefato entregue"
- Progresso geral: barra amber em `StudyProgressSummary`
- Reset: `window.confirm` antes de limpar tudo

---

## Arquivos criados / modificados

```
apps/web/src/hooks/use-study-plan-progress.ts          (novo)
apps/web/src/components/study-plan/study-plan-shell.tsx (novo)
apps/web/src/app/meu-plano/page.tsx                    (atualizado)
apps/web/src/components/study-plan/study-progress-summary.tsx
apps/web/src/components/study-plan/study-week-browser.tsx
apps/web/src/components/study-plan/study-week-card.tsx
apps/web/src/components/study-plan/study-day-card.tsx
apps/web/src/components/study-plan/study-task-list.tsx
apps/web/src/components/study-plan/study-artifact-list.tsx
```
