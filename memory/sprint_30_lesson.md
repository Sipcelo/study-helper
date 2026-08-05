# sprint_30_lesson - Study Planner Save/Continue UX

Sprint: 30
Modulo: programacao / carreira
Data de revalidacao: 2026-06-05

## O que foi feito

- Revalidado o fluxo de plano gerado em `/planejar-estudos` e `/meu-plano/gerado`.
- Confirmado que `use-generated-study-plan.ts` centraliza save/get/clear/has em localStorage.
- Confirmado que o progresso do plano gerado usa chave derivada de `plan.id`.
- Corrigida a sobrescrita silenciosa: agora `window.confirm` protege a substituicao do plano ativo.
- Adicionado banner "Plano salvo neste navegador" em `/meu-plano/gerado`.
- Adicionado link "Continuar progresso" apontando para `#progresso`.

## Desafio

- Diferenciar lacunas reais de UX de comportamento ja coberto pela arquitetura localStorage.
- Evitar iniciar Sprint 31: progresso foi apenas continuado/ancorado, sem redesenhar a UX de progresso.
- Trabalhar com limitacao de ambiente Windows, onde `pnpm build` pode travar ou falhar em `.next/trace`.

## Erros corrigidos

- Sobrescrever plano salvo sem confirmacao.
- Rota `/meu-plano/gerado` nao comunicava explicitamente que o plano estava salvo no navegador.
- Nao havia atalho direto para a area de progresso do plano gerado.

## Decisoes

- Manter `localStorage`, nao `sessionStorage`, para o plano gerado.
- Manter apenas um plano ativo salvo em `study-helper:study-planner:generated-plan`.
- Nao adicionar dependencia e nao criar storage novo.
- Usar `window.confirm` como solucao minima e reversivel para sobrescrita.
- Usar `#progresso` como ancora simples, sem alterar a logica de progresso.

## Aprendizados

- Em sprints de revalidacao, primeiro cruzar docs historicos com codigo real antes de implementar.
- "Continuar progresso" nao precisa virar nova feature se o progresso ja esta persistido por `plan.id`; um atalho para a secao correta resolve a lacuna de UX.
- Ao mexer em storage client-side no Next.js, manter leitura depois do mount para evitar hydration mismatch.
- Build local no Windows nao deve ser usado como unico criterio de conclusao quando o bloqueio e ambiental; typecheck + dev server + QA manual sao a trilha valida registrada.

## Referencias

- `docs/sprint30.md`
- `docs/53_GENERATED_STUDY_PLAN.md`
- `apps/web/src/hooks/use-generated-study-plan.ts`
- `apps/web/src/components/study-plan/generated-plan-shell.tsx`
- `apps/web/src/components/study-planner/study-plan-form.tsx`
