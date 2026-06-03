# sprint_30_lesson — Study Planner Save/Continue UX

Sprint: 30
Modulo: programacao / carreira
Periodo: 2026-05 (data exata TUDO)

## O que foi feito

- `use-generated-study-plan.ts` (41 linhas):
  - `STORAGE_KEY = 'study-helper:study-planner:generated-plan'`
  - `saveGeneratedPlan`, `getGeneratedPlan`, `clearGeneratedPlan`, `hasGeneratedPlan`
  - `getGeneratedPlanProgressKey(planId)` retorna `study-helper:study-plan:{planId}:progress`

- `generated-plan-shell.tsx` (51 linhas):
  - Estado `mounted` (evita hydration mismatch)
  - Empty state com CTA "Criar meu plano →"
  - Carrega plano e renderiza Overview + Shell + Export

- `study-plan-form.tsx` ja chama `saveGeneratedPlan(plan)` antes de redirecionar

## Desafio

- Hidratacao no Next.js: `localStorage` nao existe no server, entao tudo que le localStorage precisa de `useEffect` + flag `mounted`
- Coordenar `mounted` com UX (mostrar placeholder vs empty state)

## Erros

- Nao ha confirmacao antes de sobrescrever plano salvo (usuario clica "Gerar meu plano" novamente e perde o anterior sem aviso)

## Decisoes

- `localStorage` (nao `sessionStorage`) para que o plano persista entre sessoes
- Chave de progresso derivada do `plan.id` para suportar multiplos planos salvos
- Empty state explicito no `/meu-plano/gerado` quando nao ha plano

## Aprendizados

- Toda leitura de `localStorage` em Next.js precisa de `useEffect` + guard `mounted`
- "Continuar progresso" pode ser derivado: `/meu-plano/gerado` ja carrega o ultimo plano salvo
- Para o agente: ao criar hooks com storage, exportar o nome da chave como `const STORAGE_KEY` no topo (ja e o padrao da casa)

## Melhorias futuras

- Confirmacao antes de sobrescrever: `if (hasGeneratedPlan()) confirm('Sobrescrever plano salvo?')`
- Banner "Plano salvo agora" com timestamp
- Lista de planos antigos (hoje so guarda o ultimo)

## Referencias

- `docs/sprint30.md`
- `apps/web/src/hooks/use-generated-study-plan.ts`
- `apps/web/src/components/study-plan/generated-plan-shell.tsx`
- `apps/web/src/components/study-planner/study-plan-form.tsx`
