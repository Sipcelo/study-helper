# sprint_29_lesson — Study Planner Preview UX

Sprint: 29
Modulo: programacao / carreira
Periodo: 2026-05 (data exata TUDO)

## O que foi feito

- `study-plan-preview.tsx` (148 linhas) rico:
  - Warnings de intensidade
  - Resumo do objetivo
  - Stats (semanas, total horas, min/dia)
  - Badge de intensidade (leve, moderada, forte, intensiva)
  - Pace recomendado
  - Estrutura semanal
  - Artefatos sugeridos
  - Resultado esperado
  - Parametros informados
  - Notice "API Interact futuramente"
  - CTA "Gerar meu plano"

- `generate-study-plan-preview.ts` engine por tras do preview

## Desafio

- Mostrar informacoes densas sem poluir
- Lidar com 4 niveis de intensidade (4 cores, 4 labels)

## Erros

- "Origem Interact preservada" nao funciona porque Sprint 28 nao foi feita
- Nao ha indicacao visual de quando o plano foi gerado a partir de voz/texto do Interact

## Decisoes

- Preview em coluna ao lado do formulario (grid 1:1 em lg)
- Empty state minimalista com emoji 📋
- Engine separada (`generateStudyPlanPreview`) para permitir reuso e testes

## Aprendizados

- Preview engines merecem arquivo proprio, nao inline no componente
- A logica de "intensidade" (calculo baseado em horas/dia vs duracao) e reutilizavel; vale documentar a formula
- Para o agente: ao implementar preview, SEMPRE dar empty state explicito (senao o usuario fica confuso sobre o que preencher)

## Referencias

- `docs/sprint29.md`
- `apps/web/src/components/study-planner/study-plan-preview.tsx`
- `apps/web/src/lib/study-planner/generate-study-plan-preview.ts`
- `apps/web/src/components/study-planner/study-plan-input-summary.tsx`
