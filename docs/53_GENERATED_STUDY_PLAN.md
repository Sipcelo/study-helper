# 53 - Plano Gerado pelo Study Planner

## Objetivo

Permitir que o usuario preencha o formulario em `/planejar-estudos`, gere um plano real de estudos localmente, sem backend e sem IA, e visualize o resultado em `/meu-plano/gerado` com progresso rastreado por localStorage.

## Fluxo completo

```text
/planejar-estudos
  -> usuario preenche form (area + objetivo obrigatorios)
  -> preview inteligente atualiza em tempo real
  -> clica "Gerar meu plano" (habilitado so quando form valido)
    -> se ja existir plano salvo, confirma substituicao com window.confirm
    -> generateMockStudyPlan(formData): StudyPlan
    -> saveGeneratedPlan(plan) -> localStorage["study-helper:study-planner:generated-plan"]
    -> router.push('/meu-plano/gerado')

/meu-plano/gerado
  -> GeneratedPlanShell monta (client component)
  -> getGeneratedPlan() -> le localStorage
  -> se null: empty state + link para /planejar-estudos
  -> se existe: banner "Plano salvo neste navegador" + StudyPlanOverview + StudyPlanShell(plan, progressKey)
    -> progressKey = "study-helper:study-plan:{plan.id}:progress"
    -> plan.id = "generated-{timestamp}"
```

## Arquitetura de arquivos

| Arquivo | Papel |
|---------|-------|
| `src/lib/study-planner/generate-mock-study-plan.ts` | Funcao pura: gera `StudyPlan` a partir de `StudyPlanFormData` |
| `src/hooks/use-generated-study-plan.ts` | Utilitarios de persistencia: save/get/clear/has + getProgressKey |
| `src/hooks/use-study-plan-draft.ts` | Persiste rascunho do formulario entre sessoes e consome contexto Interact |
| `src/components/study-plan/generated-plan-shell.tsx` | Client shell: le plano, empty state ou render com progresso |
| `src/app/meu-plano/gerado/page.tsx` | Rota server com metadata, renders GeneratedPlanShell |
| `src/components/study-planner/study-plan-form.tsx` | Form com handleGeneratePlan -> confirma sobrescrita, gera, salva, redireciona |
| `src/components/study-planner/study-plan-preview.tsx` | CTA "Gerar meu plano" com prop `canGenerate` |

## Storage keys

| Chave | Conteudo | Quem usa |
|-------|----------|----------|
| `study-helper:study-planner:generated-plan` | `StudyPlan` serializado | `use-generated-study-plan.ts` |
| `study-helper:study-planner:draft` | `StudyPlanFormData` rascunho | `use-study-plan-draft.ts` |
| `study-helper:planner-context` | contexto temporario Interact -> Planner | `study-planner-context.ts` |
| `study-helper:study-plan:generated-{timestamp}:progress` | `{ completedTaskIds, completedArtifactIds }` | `use-study-plan-progress.ts` |
| `study-helper:study-plan:grc-30-day:progress` | progresso GRC separado | `use-study-plan-progress.ts` |

## Campos de entrada e uso no gerador

| Campo | Tipo | Aplicacao no gerador |
|-------|------|----------------------|
| `area` | `StudyFormArea` | seleciona `AREA_PHASES[area]` e `FINAL_DELIVERABLES[area]` |
| `objective` | `string` | vira `plan.title` |
| `currentLevel` | `StudyFormLevel` | `mapDifficulty()` -> `plan.difficulty` |
| `availableMinutesPerDay` | `number` | determina `tasksPerDay()`, `minutesPerTask()` e `totalHours` |
| `durationDays` | `number` | calcula `numWeeks`, `daysPerWeek`, `plan.durationDays` |
| `preferredStyle` | `StudyPreferredStyle` | `resolveTaskType()` sobrescreve tipo das tarefas por semana |
| `topics` | `string` | split por virgula -> pool extra de titulos de tarefas |
| `finalProjectGoal` | `string` | vira `plan.targetRole`, `plan.finalProject.title/description` |

## Logica do gerador

```text
numWeeks = ceil(durationDays / 7)
daysPerWeek = min(7, ceil(durationDays / numWeeks))
tCount = tasksPerDay(availableMinutesPerDay)   // 2, 3 ou 4 tarefas/dia
minsPerTask = max(10, round(availableMinutesPerDay / tCount))
phase = AREA_PHASES[area][phaseForWeek(wIdx, numWeeks)]
taskType = resolveTaskType(phase.taskType, preferredStyle)
totalHours = round((availableMinutesPerDay * durationDays) / 60)
```

## Isolamento de progresso

- Plano GRC: chave fixa `GRC_PROGRESS_KEY`, nunca mistura com gerados.
- Plano gerado: chave `study-helper:study-plan:generated-{timestamp}:progress`.
- Cada nova geracao cria ID unico via `Date.now()`, entao progresso antigo permanece em chave distinta.

## Hidratacao SSR-safe

`GeneratedPlanShell` usa `mounted` state:

1. Render inicial: skeleton animado.
2. Apos `useEffect`: le localStorage e decide entre empty state e render completo.
3. Nunca le localStorage no servidor.

## Validacao do formulario

Botao "Gerar meu plano" habilitado quando:

- `area !== ''`
- `objective.trim().length >= 5`

## Sobrescrita de plano ativo

Se `hasGeneratedPlan()` retornar `true`, o formulario pergunta se o usuario deseja substituir o plano salvo no navegador.

- Cancelar mantem o plano anterior e nao redireciona.
- Confirmar salva o novo plano e redireciona para `/meu-plano/gerado`.

## Continuar progresso

Quando existe plano salvo, `/meu-plano/gerado` exibe banner "Plano salvo neste navegador" e link "Continuar progresso" para `#progresso`.

O progresso segue isolado pela chave `study-helper:study-plan:{plan.id}:progress`.

## Limitacoes atuais

- O navegador guarda apenas um plano ativo por vez em `study-helper:study-planner:generated-plan`.
- Planos antigos podem deixar chaves de progresso no localStorage, mas nao aparecem em uma lista de planos.
- Geracao real via API Interact/Java ainda e futura.

## Proximos passos sugeridos

- Conectar geracao real via API Interact quando a etapa Java for retomada.
- Adicionar lista de planos antigos, se o produto decidir manter historico local.
- Exportar plano como PDF ou compartilhar via URL hash.
- Adicionar indicador visual do estilo de aprendizado no `StudyPlanOverview` quando gerado.
