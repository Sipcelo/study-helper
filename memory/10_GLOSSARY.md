# 10 — Glossario do Projeto

## Termos de produto

- **Study Helper** — plataforma de estudos modular (programacao, carreira, financas)
- **Modulo financeiro** — primeira vertical, MVP concluido (sprints 1-8)
- **Modulo programacao** — proxima vertical, foco a partir da sprint 11
- **Modulo carreira** — terceira vertical, planejada para fase 6
- **Interact** — servico de voz/texto educacional (sprint final do bootcamp)
- **API Interact** — backend Java do Interact, em `services/study-helper-api/` (unico servico Java existente)
- **Study Planner** — gerador de plano de estudos a partir de formulario ou voz
- **Cerebro** — pasta `memory/`, base de conhecimento do agente pessoal

## Termos tecnicos

- **Provider pattern** — interface + implementacoes (mock, real) trocadas sem mudar UI
- **Mock provider** — implementacao com dados estaticos
- **Real provider** — implementacao que chama API real
- **Sprint** — unidade de trabalho documentada em `docs/sprint_NN.md`
- **Lesson** — licao aprendida de uma sprint, em `memory/sprint_NN_lesson.md`
- **ADR** — Architectural Decision Record, registrado em `docs/23_DECISION_LOG.md`
- **Bootcamp** — Bootcamp AI Java Backend, contexto de aprendizado atual
- **Cidade** — visualizacao 2D/2.5D (futuramente 3D) dos ativos no modulo financeiro

## Termos de UI (modulo financeiro)

- **Cidade** — visualizacao dos ativos
- **Ativo** — moeda, acao, indice ou indicador
- **Catalogo** — pagina de listagem de ativos
- **Painel lateral** — drawer que abre ao clicar em ativo
- **Pagina individual** — rota `/ativo/[id]`
- **Landing** — pagina inicial `/`

## Estados de mercado

- **alta** — variacao positiva
- **queda** — variacao negativa
- **estavel** — variacao proxima de zero

## Intencoes do Interact

**Front** (`apps/web/src/types/interact.ts`):
- `EXPLAIN_CONCEPT` — explicar conceito
- `QUIZ_ME` — quiz
- `NAVIGATE_TO` — navegar
- `SEARCH_TOPIC` — buscar topico
- `UNKNOWN` — desconhecido

**Back** (`services/study-helper-api/src/main/java/com/studyhelper/api/domain/Intent.java`):
- `EXPLAIN_CONCEPT` — explicar conceito
- `GENERATE_STUDY_PLAN` — gerar plano de estudo
- `SIMULATE_INTERVIEW` — simular entrevista
- `REVIEW_ANSWER` — revisar resposta
- `OPEN_RESOURCE` — abrir recurso
- `COMPARE_CONCEPTS` — comparar conceitos
- `UNKNOWN` — desconhecido

**DIVERGENCIA FRONT/BACK**: apenas `EXPLAIN_CONCEPT` e `UNKNOWN` coincidem.

## Acoes do Interact

**Front** (`apps/web/src/types/interact.ts`):
- `OPEN_RESOURCE` — abrir recurso (renderizado como link)
- `SHOW_QUIZ` — mostrar quiz
- `SEARCH` — busca
- `NONE` — sem acao

**Back** (`services/study-helper-api/src/main/java/com/studyhelper/api/domain/ActionType.java`):
- `OPEN_RESOURCE` — abrir recurso
- `SHOW_EXPLANATION` — exibir explicacao
- `START_STUDY_PLAN` — ir para `/planejar-estudos`
- `START_INTERVIEW` — ir para `/programacao/entrevista-java-junior`
- `NONE` — sem acao

**DIVERGENCIA FRONT/BACK**: front e back nao compartilham o mesmo conjunto de actions. Apenas `OPEN_RESOURCE` e `NONE` coincidem. Front nao sabe renderizar `SHOW_EXPLANATION`, `START_STUDY_PLAN`, `START_INTERVIEW`. Back nunca retorna `SHOW_QUIZ` ou `SEARCH`.

## Chaves de storage (browser)

Em uso:
- `study-helper:study-planner:draft` — rascunho do formulario (localStorage)
- `study-helper:study-planner:generated-plan` — plano gerado salvo (localStorage)
- `study-helper:study-plan:{plan.id}:progress` — progresso por plano (localStorage)
- `study-helper:study-plan:grc-30-day:progress` — progresso do plano GRC 30 dias (default)

NAO existem (Sprint 27-28):
- `study-helper:planner-context` — contexto Interact → Planner (sessionStorage)
- `study-helper:interact-history` — historico de interacoes (max 20)

Fontes: `docs/38_API_INTERACT_SPEECH_TO_TEXT.md`, `docs/46_STUDY_PLANNER_SYSTEM.md`, `docs/Rascunho_sprints.md`, leitura direta de `apps/web/src/types/interact.ts` e `services/study-helper-api/src/main/java/com/studyhelper/api/domain/Intent.java` + `ActionType.java`
