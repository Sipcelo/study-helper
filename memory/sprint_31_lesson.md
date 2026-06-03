# sprint_31_lesson — Study Planner Progress UX

Sprint: 31
Modulo: programacao / carreira
Periodo: 2026-05 (data exata TUDO)

## O que foi feito

- `use-study-plan-progress.ts` (147 linhas) hook completo:
  - `GRC_PROGRESS_KEY` (default) + `progressKey` parametrizado
  - `mounted` flag para evitar hydration mismatch
  - Estado: `completedTaskIds`, `completedArtifactIds`
  - `toggleTask`, `toggleArtifact`, `resetProgress`
  - `isTaskCompleted`, `isArtifactCompleted`
  - Stats calculadas:
    - `percentTasks`, `percentArtifacts`, `percentDays`, `percentOverall`
- `getGeneratedPlanProgressKey(plan.id)` retorna chave por plano
- `StudyProgressSummary` (93 linhas) componente (nao li em detalhe)

## Desafio

- Calcular "dia completo" = todas as tasks do dia marcadas
- "Overall" = media de 3 percentuais (tasks, artifacts, days)
- Suportar multiplos planos salvos com chaves diferentes

## Erros

- A integracao com `generated-plan-shell.tsx` precisa ser validada: o shell precisa passar `progressKey` calculado pelo `getGeneratedPlanProgressKey(plan.id)`, nao o default GRC
- Nao ha teste manual documentado dos 4 estados (zero, parcial, completo, sem plano)

## Decisoes

- Persistencia em `localStorage`
- Chave por `plan.id` para permitir multiplos planos
- `percentOverall` = media aritmetica simples dos 3 percentuais
- Hidratacao segura com `mounted`

## Aprendizados

- Hooks de progresso comecam a ficar compostos (progresso depende do plano). Vale considerar Context API ou Zustand se crescer
- O calculo de "overall" e arbitrario (media simples). Se ficar injusto, mudar para media ponderada
- Para o agente: ao auditar integracoes, SEMPRE seguir a cadeia "shell → hook → storage" para confirmar que o `progressKey` chega certo

## Pendencias

- Validar manualmente `/meu-plano/gerado` com:
  - Plano novo (zero progresso)
  - Plano com 1 task marcada
  - Plano 100% completo
  - Sem plano (empty state)
- Trocar o `GRC_PROGRESS_KEY` default pelo `getGeneratedPlanProgressKey(plan.id)` se ainda nao foi feito
- Considerar mover `GRC_PROGRESS_KEY` para `study-plan-examples.ts` (onde o plano GRC vive)

## Referencias

- `docs/sprint31.md`
- `apps/web/src/hooks/use-study-plan-progress.ts`
- `apps/web/src/components/study-plan/study-progress-summary.tsx`
- `apps/web/src/hooks/use-generated-study-plan.ts` (para `getGeneratedPlanProgressKey`)
- `apps/web/src/components/study-plan/generated-plan-shell.tsx`
