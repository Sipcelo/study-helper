# sprint_26_lesson — Interact Actions UX

Sprint: 26
Modulo: cross
Periodo: 2026-05-31 (data do `sprint26.md` remoto)

## O que foi feito (segundo o remoto)

- Renderizacao de `SHOW_EXPLANATION`, `START_STUDY_PLAN`, `START_INTERVIEW` como botoes/links
- Fallback para action desconhecida
- Validacao manual no Chrome em `http://localhost:8888/interact`

## O que foi encontrado (no local)

- `interact-result-card.tsx` existe, mas renderiza apenas `OPEN_RESOURCE` como link
- `types/interact.ts` declara `OPEN_RESOURCE | SHOW_QUIZ | SEARCH | NONE`
- O back (Java) tem `ActionType` com 5 valores: `OPEN_RESOURCE | SHOW_EXPLANATION | START_STUDY_PLAN | START_INTERVIEW | NONE`
- Apenas `OPEN_RESOURCE` e `NONE` coincidem entre front e back

## Desafio

- Mismatch entre o que o front sabe renderizar e o que o back pode retornar
- A implementacao documentada no remoto e mais avancada do que o codigo local

## Erros

- O codigo local ficou atras da documentacao remota
- Os types do front nao foram sincronizados com os enums do back

## Decisoes tomadas

- Backend NAO deve ser alterado (ja tem 5 actions suficientes)
- Front deve ampliar o union de `InteractActionType` para incluir `SHOW_EXPLANATION | START_STUDY_PLAN | START_INTERVIEW`
- Remover do front `SHOW_QUIZ | SEARCH` (o back nunca retorna) ou manter como no-op explicito

## Aprendizados

- O contrato front/back deve ser uma unica fonte de verdade. Ideal: gerar types do front a partir do enum do back (OpenAPI, JSON Schema, ou gerador Java→TS)
- Documentacao de sprint que valida "passou" no Chrome NAO garante que o codigo esteja versionado. Validacao e commit sao passos separados
- Para o agente: ao auditar, comparar `types/*.ts` (front) com `domain/*.java` (back) para detectar mismatches. Foi assim que achei este problema

## Referencias

- `docs/sprint26.md` (local, reconstruido)
- `docs/sprint26.md` (remoto, ac3e02b)
- `apps/web/src/components/interact/interact-result-card.tsx`
- `apps/web/src/types/interact.ts`
- `services/study-helper-api/src/main/java/com/studyhelper/api/domain/ActionType.java`
- `services/study-helper-api/src/main/java/com/studyhelper/api/service/InteractActionResolverService.java`
