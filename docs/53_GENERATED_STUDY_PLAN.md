# 53 — Plano Gerado pelo Study Planner

## Objetivo

Permitir que o usuário preencha o formulário em `/planejar-estudos`, gere um plano real de estudos localmente (sem backend, sem IA) e visualize-o em `/meu-plano/gerado` com progresso rastreado por localStorage.

## Fluxo completo

```
/planejar-estudos
  → usuário preenche form (área + objetivo obrigatórios)
  → preview inteligente atualiza em tempo real
  → clica "Gerar meu plano" (habilitado só quando form válido)
    → generateMockStudyPlan(formData): StudyPlan
    → saveGeneratedPlan(plan) → localStorage["study-helper:study-planner:generated-plan"]
    → router.push('/meu-plano/gerado')

/meu-plano/gerado
  → GeneratedPlanShell monta (client component)
  → getGeneratedPlan() → lê localStorage
  → se null: empty state + link para /planejar-estudos
  → se existe: StudyPlanOverview + StudyPlanShell(plan, progressKey)
    → progressKey = "study-helper:study-plan:{plan.id}:progress"
    → plan.id = "generated-{timestamp}"
```

## Arquitetura de arquivos

| Arquivo | Papel |
|---------|-------|
| `src/lib/study-planner/generate-mock-study-plan.ts` | Função pura: gera `StudyPlan` a partir de `StudyPlanFormData` |
| `src/hooks/use-generated-study-plan.ts` | Utilitários de persistência: save/get/clear/has + getProgressKey |
| `src/hooks/use-study-plan-draft.ts` | Persiste rascunho do formulário entre sessões |
| `src/components/study-plan/generated-plan-shell.tsx` | Client shell: lê plano, empty state ou render com progresso |
| `src/app/meu-plano/gerado/page.tsx` | Rota server com metadata, renders GeneratedPlanShell |
| `src/components/study-planner/study-plan-form.tsx` | Form com handleGeneratePlan → gera, salva, redireciona |
| `src/components/study-planner/study-plan-preview.tsx` | CTA "Gerar meu plano →" com prop canGenerate |

## Storage keys (todas as chaves usadas)

| Chave | Conteúdo | Quem usa |
|-------|---------|---------|
| `study-helper:study-planner:generated-plan` | `StudyPlan` serializado | `use-generated-study-plan.ts` |
| `study-helper:study-planner:draft` | `StudyPlanFormData` rascunho | `use-study-plan-draft.ts` |
| `study-helper:study-plan:generated-{timestamp}:progress` | `{ completedTaskIds, completedArtifactIds }` | `use-study-plan-progress.ts` |
| `study-helper:study-plan:grc-30-day:progress` | Progresso GRC (separado) | `use-study-plan-progress.ts` |

## Campos de entrada e uso no gerador

| Campo | Tipo | Aplicação no gerador |
|-------|------|---------------------|
| `area` | `StudyFormArea` | Seleciona `AREA_PHASES[area]` e `FINAL_DELIVERABLES[area]` |
| `objective` | `string` | Vira `plan.title` |
| `currentLevel` | `StudyFormLevel` | `mapDifficulty()` → `plan.difficulty` |
| `availableMinutesPerDay` | `number` | Determina `tasksPerDay()`, `minutesPerTask()` e `totalHours` |
| `durationDays` | `number` | Calcula `numWeeks`, `daysPerWeek`, `plan.durationDays` |
| `preferredStyle` | `StudyPreferredStyle` | `resolveTaskType()` → sobrescreve tipo das tarefas por semana |
| `topics` | `string` | Split por vírgula → pool extra de títulos de tarefas |
| `finalProjectGoal` | `string` | Vira `plan.targetRole`, `plan.finalProject.title/description` |

## Lógica do gerador

```
numWeeks = ceil(durationDays / 7)
daysPerWeek = min(7, ceil(durationDays / numWeeks))
tCount = tasksPerDay(availableMinutesPerDay)   // 2, 3 ou 4 tarefas/dia
minsPerTask = max(10, round(availableMinutesPerDay / tCount))
phase = AREA_PHASES[area][phaseForWeek(wIdx, numWeeks)]   // 4 fases ao longo do plano
taskType = resolveTaskType(phase.taskType, preferredStyle) // aplica estilo do usuário
totalHours = round((availableMinutesPerDay * durationDays) / 60)
```

### resolveTaskType (preferredStyle → tipo de tarefa)

| preferredStyle | taskType resultante |
|---------------|---------------------|
| `''` (não informado) | tipo da fase (padrão) |
| `teoria-pratica` | tipo da fase (padrão) |
| `projeto` | `projeto` |
| `entrevista` | `revisao` |
| `revisao` | `revisao` |
| `intensivo` | `pratica` |

## Isolamento de progresso

- Plano GRC: chave fixa `GRC_PROGRESS_KEY` → nunca mistura com gerados
- Plano gerado: chave `study-helper:study-plan:generated-{timestamp}:progress`
- Cada nova geração cria ID único via `Date.now()` → progresso antigo permanece (chave distinta)

## Hidratação (SSR-safe)

`GeneratedPlanShell` usa `mounted` state:
1. Render inicial (server/first paint): skeleton animado
2. Após `useEffect`: lê localStorage, decide entre empty state e render completo
3. Nunca lê localStorage no servidor

## Validação do formulário

Botão "Gerar meu plano" habilitado quando:
- `area !== ''`
- `objective.trim().length >= 5`

## Próximos passos sugeridos

- **Sprint 19** — Conectar geração real via API Interact (Java Spring Boot)
- Adicionar botão "Regenerar plano" em `/meu-plano/gerado` para sobrescrever com novo plano
- Exportar plano como PDF ou compartilhar via URL hash
- Adicionar indicador visual do estilo de aprendizado no `StudyPlanOverview` quando gerado
