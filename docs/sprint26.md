# Sprint 26 — Interact Actions UX

## Status

**CONCLUIDA** — revalidada e ajustada contra codigo real (03/06/2026).

## Fonte da verdade

Codigo validado no estado atual do projeto.

## Objetivo

Renderizar actions do Interact como botoes/links contextuais, alinhadas ao backend `ActionType.java`.

## Actions suportadas

| Action | Renderizacao | Comportamento |
|--------|-------------|---------------|
| `SHOW_EXPLANATION` | Link "Abrir explicacao" (azul) se target existir; div com texto da resposta se nao | Link para `action.target` |
| `START_STUDY_PLAN` | Link "Iniciar plano de estudos" (verde) | `action.target \|\| '/planejar-estudos'` |
| `START_INTERVIEW` | Link "Iniciar entrevista" (âmbar) | `action.target \|\| '/interact'` |
| `OPEN_RESOURCE` | Link "Abrir recurso" (violeta) com target visivel | Link para `action.target` |
| `NONE` | Nao renderiza bloco de acao | — |
| Unknown | Div "Acao nao reconhecida" (cinza, borda sutil) | Nao navega, nao quebra UI |

## Arquivos principais

| Arquivo | Funcao |
|---------|--------|
| `apps/web/src/types/interact.ts` | `InteractActionType` com 5 valores alinhados ao backend |
| `apps/web/src/components/interact/interact-result-card.tsx` | Renderizacao de intents (7) e actions (5) com labels, cores e CTAs |
| `services/study-helper-api/.../domain/ActionType.java` | Enum backend: OPEN_RESOURCE, SHOW_EXPLANATION, START_STUDY_PLAN, START_INTERVIEW, NONE |
| `services/study-helper-api/.../service/InteractActionResolverService.java` | Mapeamento Intent → ActionType + target URL |

## Mapeamento backend (InteractActionResolverService)

| Intent | Action | Target |
|--------|--------|--------|
| `EXPLAIN_CONCEPT` | `SHOW_EXPLANATION` | Catalog match ou fallback de dominio |
| `GENERATE_STUDY_PLAN` | `START_STUDY_PLAN` | `/planejar-estudos` |
| `SIMULATE_INTERVIEW` | `START_INTERVIEW` | `/programacao/entrevista-java-junior` |
| `REVIEW_ANSWER` | `SHOW_EXPLANATION` | Catalog match ou fallback |
| `OPEN_RESOURCE` | `OPEN_RESOURCE` | Catalog match |
| `COMPARE_CONCEPTS` | `OPEN_RESOURCE` | `/ativos` (finance) ou `/programacao` |
| `UNKNOWN` | `NONE` | null |

## Validacoes

| Validacao | Resultado |
|-----------|-----------|
| `npx tsc --noEmit` em `apps/web` | 0 erros |
| Tipos frontend vs backend | 5 actions alinhadas |
| SHOW_EXPLANATION com target | Link clicavel |
| SHOW_EXPLANATION sem target | Div textual com `result.answer` |
| Action desconhecida | Fallback seguro, sem quebra |
| Preservacao Sprint 25 (voz, auto-submit) | Nao alterado |

## Observacoes tecnicas

- O front ja estava funcional para todas as 5 actions desde a sprint 25.1 (alinhamento de tipos).
- SHOW_EXPLANATION foi ajustado: com target vira link azul "Abrir explicacao"; sem target exibe o texto da resposta.
- Fallback generico adicionado: qualquer action type nao listada nas 4 conhecidas exibe "Acao nao reconhecida" sem navegar.
- Nenhuma alteracao no backend foi necessaria.

## Proximo passo

Sprint 27 — Interact History (historico local em localStorage) — so comecar apos validacao da Sprint 26.