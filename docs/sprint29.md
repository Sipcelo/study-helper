# Sprint 29 — Study Planner Preview UX

## Status

**PARCIAL** — `study-plan-preview.tsx` existe e e rico, mas nao pode exibir "origem Interact" porque a Sprint 28 nao foi feita.

## O que foi encontrado

- `apps/web/src/components/study-planner/study-plan-preview.tsx` (148 linhas) — preview completo com:
  - Warnings (intensidade alta, duracao curta, etc.)
  - Resumo do objetivo
  - Stats: semanas, total de horas, min/dia
  - Badge de intensidade (leve, moderada, forte, intensiva) com cor
  - Pace recomendado
  - Estrutura semanal sugerida
  - Artefatos sugeridos
  - Resultado esperado
  - Parametros informados (via `StudyPlanInputSummary`)
  - Notice "Geracao real sera conectada a API Interact futuramente"
  - CTA "Gerar meu plano"

- `apps/web/src/lib/study-planner/generate-study-plan-preview.ts` — engine que produz o preview (chamada de `study-plan-preview.tsx`)
- `apps/web/src/lib/study-planner/generate-mock-study-plan.ts` — engine que produz o plano completo ao clicar no CTA
- `apps/web/src/components/study-planner/study-plan-input-summary.tsx` — resumo dos inputs

## O que nao foi feito

- "Origem Interact preservada" no preview — depende da Sprint 28 (contexto Interact → Planner)
- Sem isso, o preview nao sabe se foi iniciado por voz/texto ou direto pelo formulario

## O que ja cumpre o objetivo da sprint

- Empty state melhorado: study-plan-form mostra placeholder com emoji 📋 quando campos obrigatorios estao vazios
- Cabecalho mais claro: "Preview do plano" em uppercase
- Resumo com area/duracao/ritmo/estilo: presente em `StudyPlanInputSummary`
- Topicos destacados: o textarea permite informar, e o preview reflete
- Etapas semanais mais legiveis: lista numerada com tema
- Engine `generateStudyPlanPreview()`: preservada e em uso

## Como completar a parte de "origem Interact"

1. Concluir Sprint 28 (criar `study-planner-context.ts`)
2. Adicionar um badge "Vindo do Interact" no preview quando contexto existir
3. Marcar a area/objetivo como "pre-preenchidos" com estilo diferente

## Licao

Ver `memory/sprint_29_lesson.md`.
