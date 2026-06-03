# 11 — Licoes de Sprint

## Indice de licoes

| Sprint | Licao | Concluida em | Resumo |
|--------|-------|--------------|--------|
| 25 | `memory/sprint_25_lesson.md` | NAO (parcial) | Voz no Interact: hook e CORS 8888 faltam |
| 26 | `memory/sprint_26_lesson.md` | NAO (parcial com divergencia) | Actions UX: front nao renderiza 3 das 5 actions do back |
| 27 | `memory/sprint_27_lesson.md` | NAO | Interact history: hook, componente e chave nao existem |
| 28 | `memory/sprint_28_lesson.md` | NAO | Interact → Planner: contexto em sessionStorage nao existe |
| 29 | `memory/sprint_29_lesson.md` | PARCIAL | Preview UX: engine rica, falta badge "origem Interact" |
| 30 | `memory/sprint_30_lesson.md` | SIM | Save/continue: saveGeneratedPlan + generated-plan-shell completos |
| 31 | `memory/sprint_31_lesson.md` | PARCIAL | Progress UX: hook completo, integracao precisa validar |

Auditoria completa: `docs/recovery-audit-sprints25-31.md`
Mapa mental: `docs/sprints25-31-mindmap.md`

## Template de licao

```markdown
# sprint_NN_lesson — Titulo curto da sprint

Sprint: NN
Modulo: financeiro | programacao | carreira | cross
Periodo: YYYY-MM-DD → YYYY-MM-DD

## O que foi feito

- item 1
- item 2

## Desafio

- o que parecia dificil ou incerto no inicio

## Erros

- o que deu errado e como foi resolvido
- comando / arquivo / decisao que falhou

## Decisoes tomadas

- ADR-XXXX aberto ou revisado
- escolha local com motivo

## Aprendizados

- o que eu (Sipcelo) ou o agente aprendeu
- o que fazer diferente na proxima vez
- padrao novo identificado (registrar em 05_CODING_STYLE.md ou 03_PROMPTS_STYLE.md se reutilizavel)

## Referencias

- `docs/sprint_NN.md`
- arquivos do codigo relevantes
- ADR relacionado
```

## Como criar

1. Ao fechar a sprint, copiar template acima
2. Salvar como `memory/sprint_NN_lesson.md`
3. Atualizar indice acima
4. Atualizar `docs/16_ROADMAP.md` (status da sprint)
5. Se algum aprendizado for padrao reutilizavel, espelhar em 03/05/06

## Convencoes

- Licoes sao imutaveis depois de escritas. Se evoluir, abrir nova licao referenciando a anterior.
- Numeracao segue o numero da sprint (`sprint_11_lesson.md`, `sprint_12_lesson.md`, ...) mesmo que pule numeros.
- Toda licao cita o `docs/sprint_NN.md` correspondente (quando existir).
