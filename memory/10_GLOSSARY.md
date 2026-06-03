# 10 — Glossario do Projeto

## Termos de produto

- **Study Helper** — plataforma de estudos modular (programacao, carreira, financas)
- **Modulo financeiro** — primeira vertical, MVP concluido (sprints 1-8)
- **Modulo programacao** — proxima vertical, foco a partir da sprint 11
- **Modulo carreira** — terceira vertical, planejada para fase 6
- **Interact** — servico de voz/texto educacional (sprint final do bootcamp)
- **API Interact** — backend Java do Interact, em `services/api-interact/`
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

- `EXPLAIN_CONCEPT` — explicar conceito
- `GENERATE_STUDY_PLAN` — gerar plano de estudo
- `SIMULATE_INTERVIEW` — simular entrevista
- `REVIEW_ANSWER` — revisar resposta do usuario
- `OPEN_RESOURCE` — abrir recurso
- `COMPARE_CONCEPTS` — comparar conceitos

## Actions do Interact (Sprint 26)

- `SHOW_EXPLANATION` — abrir explicacao
- `START_STUDY_PLAN` — planejar estudos
- `START_INTERVIEW` — iniciar simulacao
- `OPEN_RESOURCE` — abrir recurso
- `UNKNOWN` — action desconhecida (fallback seguro)

## Chaves de storage (browser)

- `study-helper:planner-context` — contexto do Interact para Study Planner (sessionStorage)
- `study-helper:study-planner:generated-plan` — plano gerado salvo
- `study-helper:study-plan:{plan.id}:progress` — progresso por plano
- `study-helper:interact-history` — historico de interacoes (max 20)

Fontes: `docs/38_API_INTERACT_SPEECH_TO_TEXT.md`, `docs/46_STUDY_PLANNER_SYSTEM.md`, `docs/Rascunho_sprints.md`
