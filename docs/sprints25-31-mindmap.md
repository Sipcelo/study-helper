# Mapa Mental — Sprints 25 a 31

## Visao macro

O objetivo das sprints 25-31 era evoluir o Interact (voz, actions UX, historico) e integra-lo ao Study Planner (contexto, preview melhorado, save/continue, progresso).

A recuperacao do projeto capturou um estado parcial. Algumas sprints estao feitas, outras nao.

## Mapa

```text
Study Helper
├── Interact
│   ├── Sprint 25 — Voz              [PARCIAL: hook e CORS faltam]
│   ├── Sprint 26 — Actions UX        [PARCIAL: divergence front/back]
│   └── Sprint 27 — History           [NAO FEITA]
│
└── Study Planner
    ├── Sprint 28 — Interact -> Planner  [NAO FEITA]
    ├── Sprint 29 — Preview UX           [PARCIAL: engine boa, origem Interact depende da 28]
    ├── Sprint 30 — Save/Continue UX     [FEITA]
    └── Sprint 31 — Progress UX          [PARCIAL: hook completo, integracao precisa validar]
```

## Dependencias entre sprints

- Sprint 26 depende da Sprint 25 (voz).
- Sprint 27 depende das Sprints 25 e 26 (tem que gravar transcricao e action).
- Sprint 28 depende das Sprints 26 e 27 (action START_STUDY_PLAN + historico opcional).
- Sprint 29 depende da Sprint 28.
- Sprint 30 depende da Sprint 29.
- Sprint 31 depende da Sprint 30.

## Estado real por sprint

| Sprint | Objetivo | Front | Back | Status |
|--------|----------|-------|------|--------|
| 25 | Voz no Interact (Web Speech API, sem audio endpoint) | NAO (sem use-web-speech) | OK (nada a fazer) | PARCIAL |
| 26 | Renderizar actions como botoes/links | PARCIAL (result-card existe, actions divergentes) | OK (ActionType cobre 5 valores) | PARCIAL com divergencia |
| 27 | Historico local em localStorage | NAO (sem hook, sem lista) | N/A | NAO FEITA |
| 28 | Contexto Interact → Planner em sessionStorage | NAO (sem study-planner-context) | N/A | NAO FEITA |
| 29 | Preview rico com intensidade, semanas, etc. | OK (preview completo, sem badge "origem Interact") | N/A | PARCIAL |
| 30 | Save/clear/get de plano gerado | OK (use-generated-study-plan, generated-plan-shell) | N/A | FEITA |
| 31 | Progresso por plan.id com percentuais | OK (use-study-plan-progress, getProgressKey) | N/A | PARCIAL (integracao a validar) |

## Riscos identificados

- **CORS**: `WebConfig.java` permite apenas `localhost:3000` e `3001`. Sprint 25/26 esperam `localhost:8888`.
- **Mismatch de actions**: front declara `OPEN_RESOURCE | SHOW_QUIZ | SEARCH | NONE`. Back retorna `OPEN_RESOURCE | SHOW_EXPLANATION | START_STUDY_PLAN | START_INTERVIEW | NONE`. Apenas 2 actions coincidem.
- **Mismatch de intents**: front declara `EXPLAIN_CONCEPT | QUIZ_ME | NAVIGATE_TO | SEARCH_TOPIC | UNKNOWN`. Back retorna 7 intents diferentes. Apenas 2 coincidem.
- **Sem persistencia de origem**: Sprint 28 nao feita, entao nenhum plano gerado pelo Interact chega ao Planner com contexto.
- **Sem voz**: input do Interact e apenas textarea.

## Referencias

- `docs/sprint25.md` ... `docs/sprint31.md` — memorias reconstruidas
- `docs/recovery-audit-sprints25-31.md` — relatorio completo
- `docs/Rascunho_sprints.md` — draft original usado como referencia
- `docs/sprint26.md` (em `origin/main`, ac3e02b) — documentacao avancada, nao no local
