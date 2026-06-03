# Sprint 28 — Study Planner + Interact

## Status

**NAO FEITA** — nenhum dos arquivos esperados foi encontrado.

## O que era esperado

- `apps/web/src/lib/study-planner-context.ts` — modulo para gerenciar contexto Interact → Planner
- `apps/web/src/components/interact/interact-result-card.tsx` — salvar contexto quando action for `START_STUDY_PLAN`
- `apps/web/src/hooks/use-study-plan-draft.ts` — ler contexto no mount
- `apps/web/src/components/study-planner/study-plan-form.tsx` — preencher formulario a partir do contexto
- Chave `study-helper:planner-context` no `sessionStorage`

## O que foi encontrado

- `apps/web/src/lib/` tem `study-planner/` com `export-study-plan-markdown.ts`, `generate-mock-study-plan.ts`, `generate-study-plan-preview.ts`. **Nenhum `study-planner-context.ts`**.
- `apps/web/src/hooks/use-study-plan-draft.ts` (73 linhas) existe mas NAO le contexto do Interact
- `apps/web/src/components/study-planner/study-plan-form.tsx` (272 linhas) tem fluxo proprio, nao importa contexto
- Nenhuma chave `study-helper:planner-context` no codigo

## Como implementar

1. Criar `apps/web/src/lib/study-planner-context.ts`:
   - Tipo `PlannerContext` com `area`, `objective`, `domain`
   - Funcoes `savePlannerContext(ctx)`, `loadPlannerContext()`, `clearPlannerContext()`
   - Persistencia em `sessionStorage` (nao `localStorage`)
2. Em `interact-result-card.tsx`: quando action for `START_STUDY_PLAN`, salvar contexto antes de navegar
3. Em `use-study-plan-draft.ts`: ao montar, tentar carregar contexto e mesclar com `INITIAL_FORM`
4. Em `study-plan-form.tsx`: ja recebe via draft; nenhum trabalho extra alem de garantir que o draft inicial reflete o contexto

## Licao

Ver `memory/sprint_28_lesson.md`.
