# 51 — Formulário de Planejamento de Estudos

## Sprint 16 + 17

**Módulo:** [PLATAFORMA] [CARREIRA] [PROGRAMACAO]  
**Status:** Concluído  
**Data:** 2026-05-27  
**Rota:** `/planejar-estudos`

---

## Objetivo da página

Permitir que o usuário informe seus parâmetros de estudo (área, objetivo, tempo, duração) e veja imediatamente uma estrutura estimada de plano. A página prepara a base para integração futura com a API Interact (geração real via IA).

---

## Campos do formulário

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `area` | select | Sim* | Área de estudo (programação, carreira, GRC…) |
| `objective` | text | Sim* | Objetivo principal do usuário em linguagem natural |
| `currentLevel` | select | Não | Nível atual (iniciante, básico, intermediário) |
| `availableMinutesPerDay` | range | Não | Minutos disponíveis por dia (15–240, default 60) |
| `durationDays` | select | Não | Duração total em dias (14–90, default 30) |
| `preferredStyle` | select | Não | Estilo de aprendizado (teoria+prática, projeto, entrevista…) |
| `topics` | textarea | Não | Tópicos iniciais separados por vírgula |
| `finalProjectGoal` | text | Não | Descrição do projeto final desejado |

\* `area` + `objective` são obrigatórios para ativar o preview.

---

## Opções de área

| Valor | Label |
|-------|-------|
| `programacao` | Programação |
| `carreira` | Carreira Junior |
| `financeiro` | Finanças |
| `seguranca` | Segurança da Informação / GRC |
| `personalizado` | Personalizado |

---

## Preview em tempo real

O preview aparece assim que `area` e `objective` (≥5 chars) estão preenchidos. Ele mostra:

1. **Objetivo** — exibe o texto do campo objetivo
2. **Stats** — semanas estimadas, carga total em horas, min/dia
3. **Estrutura semanal** — gerada dinamicamente baseada no número de semanas:
   - ≤1 semana: estrutura compacta única
   - 2 semanas: fundamentos + revisão
   - 3 semanas: fundamentos / prática / revisão
   - 4+ semanas: fundamentos → prática → aprofundamento(s) → projeto → revisão
4. **Parâmetros informados** — grid compacto com todos os valores
5. **Aviso** — informa que geração real será via API Interact
6. **CTA** — botão "Gerar plano de exemplo"

---

## Fluxo do CTA

1. Usuário clica "Gerar plano de exemplo"
2. Aparece um card emerald com:
   - Descrição do plano GRC de 30 dias
   - Link para `/meu-plano`

---

## Integração futura com API Interact

Quando a API Interact (Java Spring Boot) estiver disponível:

```
Frontend → POST /api/study-plans/generate
  body: StudyPlanFormData
  → API Interact processa com LLM
  → retorna StudyPlan completo
  → frontend exibe em /meu-plano/{id}
```

Os campos já mapeiam para o tipo `StudyPlanGenerationInput` existente. O campo `objective` equivale a `userGoal`, `availableMinutesPerDay` pode ser convertido para `availableHoursPerDay`.

---

## Limitações atuais

- Não gera plano real: apenas preview mockado com estrutura estimada
- Não persiste o formulário (estado local React, limpa ao recarregar)
- Não faz chamada de API
- Não requer autenticação
- A estrutura semanal é genérica (não considera área ou estilo)
- Sem validação de formulário além dos campos obrigatórios para o preview

---

## Arquivos criados (Sprint 16)

```
apps/web/src/app/planejar-estudos/page.tsx
apps/web/src/components/study-planner/study-plan-form.tsx
apps/web/src/components/study-planner/study-plan-preview.tsx
apps/web/src/components/study-planner/study-plan-input-summary.tsx
```

## Arquivos criados (Sprint 17)

```
apps/web/src/hooks/use-study-plan-draft.ts
apps/web/src/lib/study-planner/generate-study-plan-preview.ts
docs/52_STUDY_PLAN_PREVIEW_ENGINE.md
```

## Arquivos alterados

```
apps/web/src/types/study-plan.ts                              — +StudyPreferredStyle, +StudyFormArea, +StudyFormLevel, +StudyPlanFormData
apps/web/src/components/layout/header.tsx                     — +link Planejar
apps/web/src/components/layout/footer.tsx                     — +link Planejar
apps/web/src/app/meu-plano/page.tsx                           — +link "Criar outro plano"
apps/web/src/components/study-planner/study-plan-form.tsx     — +rascunho local (Sprint 17)
apps/web/src/components/study-planner/study-plan-preview.tsx  — +preview inteligente (Sprint 17)
```
