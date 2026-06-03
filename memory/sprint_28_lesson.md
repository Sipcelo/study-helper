# sprint_28_lesson — Study Planner + Interact

Sprint: 28
Modulo: cross
Periodo: NAO FEITA

## O que era esperado

- `apps/web/src/lib/study-planner-context.ts` — modulo de contexto
- Salvar contexto quando action for `START_STUDY_PLAN`
- Chave `study-helper:planner-context` no `sessionStorage` (NAO `localStorage`)
- Formulario do Planner pre-preencher com contexto salvo

## Desafio

- Decidir granularidade do contexto: so `{area, objective}` ou algo mais?
- Como evitar que contexto "velho" preencha formulario de nova sessao (por isso sessionStorage)
- Como limpar contexto apos uso (sucesso do submit)

## Erros

- Sprint nao implementada no codigo recuperado
- Nao ha `study-planner-context.ts` em `lib/`
- `use-study-plan-draft.ts` nao le nenhum contexto externo

## Decisoes propostas

- `PlannerContext` = `{ area: StudyFormArea, objective: string, source: 'interact' | 'form', createdAt: string }`
- `sessionStorage` (e nao `localStorage`) para que o contexto morra com a aba
- Limpar contexto apos submit bem-sucedido em `/planejar-estudos`
- Visual: badge "Vindo do Interact" no topo do formulario quando contexto existir

## Aprendizados

- `sessionStorage` e o lugar certo para "contexto temporario entre paginas" (diferente de `localStorage` que e para "estado duravel")
- O fluxo Interact → Planner e um exemplo classico de "bridge" entre dois modulos. Vale documentar o contrato do `PlannerContext` no `10_GLOSSARY.md`
- Para o agente: ao implementar integracoes entre paginas, primeiro perguntar: "isso deve persistir entre sessoes ou morrer com a aba?"

## Referencias

- `docs/sprint28.md`
- `docs/Rascunho_sprints.md` (linhas 162-196)
- `apps/web/src/lib/study-planner/` (estrutura existente)
- `apps/web/src/hooks/use-study-plan-draft.ts`
