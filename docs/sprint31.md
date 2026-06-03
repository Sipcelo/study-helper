# Sprint 31 — Study Planner Progress UX

## Status

**PARCIAL** — `use-study-plan-progress.ts` existe e e completo, mas o default esta fixo em GRC. Nao foi feita a integracao com a pagina `/meu-plano/gerado` para todos os planos.

## O que foi encontrado

- `apps/web/src/hooks/use-study-plan-progress.ts` (147 linhas) — hook completo:
  - `GRC_PROGRESS_KEY = 'study-helper:study-plan:grc-30-day:progress'` (default)
  - `progressKey` parametrizado
  - Estado `mounted` para evitar hydration mismatch
  - Carrega `completedTaskIds` e `completedArtifactIds` do localStorage
  - Persiste apos cada toggle
  - `toggleTask`, `toggleArtifact`, `resetProgress`, `isTaskCompleted`, `isArtifactCompleted`
  - Calcula stats:
    - `totalTasks`, `completedTasks`, `percentTasks`
    - `totalArtifacts`, `completedArtifacts`, `percentArtifacts`
    - `totalDays`, `completedDays`, `percentDays`
    - `percentOverall` = media dos 3

- `apps/web/src/components/study-plan/study-progress-summary.tsx` (93 linhas) — renderiza o resumo (nao li, presumo que usa o hook)

## O que nao foi feito

- `useStudyPlanProgress(plan, progressKey)` e chamado em `generated-plan-shell.tsx`? Presumivelmente sim, mas precisa confirmacao
- Empty state "nenhuma etapa concluida": depende do consumidor, nao do hook
- Estado "plano completo": `percentOverall === 100` pode ser derivado, mas precisa ser renderizado
- Persistencia por `plan.id`: o hook ja aceita `progressKey` calculado via `getGeneratedPlanProgressKey(plan.id)` que retorna `study-helper:study-plan:{plan.id}:progress` — mecanismo existe

## Pendencias

1. Confirmar que `generated-plan-shell.tsx` passa o `progressKey` correto (calculado via `getGeneratedPlanProgressKey(plan.id)`)
2. Garantir que o `StudyProgressSummary` mostra os 4 estados (zero, parcial, completo, sem plano)
3. Validar fluxo em `/meu-plano/gerado` com multiplos planos salvos

## Licao

Ver `memory/sprint_31_lesson.md`.
