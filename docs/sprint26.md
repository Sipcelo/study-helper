# Sprint 26 — Interact Actions UX

## Status

**PARCIAL com divergencia** — o `interact-result-card.tsx` existe e renderiza a action retornada, mas ha mismatch entre as actions que o front sabe renderizar e as que o back retorna.

## Estado divergente

**Codigo local (recuperado):**

- `apps/web/src/components/interact/interact-result-card.tsx` (81 linhas) — renderiza botao/label para action vinda do back. Rendeiza link para `OPEN_RESOURCE`. Para outras actions, mostra apenas o nome.
- `apps/web/src/types/interact.ts`:
  ```ts
  export type InteractActionType = 'OPEN_RESOURCE' | 'SHOW_QUIZ' | 'SEARCH' | 'NONE';
  ```

- `services/study-helper-api/src/main/java/com/studyhelper/api/domain/ActionType.java`:
  ```java
  public enum ActionType {
      OPEN_RESOURCE,
      SHOW_EXPLANATION,
      START_STUDY_PLAN,
      START_INTERVIEW,
      NONE
  }
  ```

- `services/study-helper-api/src/main/java/com/studyhelper/api/service/InteractActionResolverService.java` resolve intents em actions e targets:
  - `GENERATE_STUDY_PLAN` → `START_STUDY_PLAN` → `/planejar-estudos`
  - `SIMULATE_INTERVIEW` → `START_INTERVIEW` → `/programacao/entrevista-java-junior`
  - `COMPARE_CONCEPTS` → `OPEN_RESOURCE` → `/ativos` (finance) ou `/programacao`
  - `EXPLAIN_CONCEPT`, `REVIEW_ANSWER` → `SHOW_EXPLANATION`
  - outros → `OPEN_RESOURCE`

**Codigo documentado no remoto (sprint26.md, ac3e02b):**

O arquivo `sprint26.md` no `origin/main` documenta a Sprint 26 como concluida, com validacao manual no Chrome em `http://localhost:8888/interact`. As actions validadas foram:

- `SHOW_EXPLANATION` → botao "Abrir explicacao" → link para `/programacao/rest-api`
- `START_STUDY_PLAN` → botao "Planejar estudos" → link para `/planejar-estudos`
- `START_INTERVIEW` → botao "Iniciar simulacao" → link para `/programacao/entrevista-java-junior`
- `OPEN_RESOURCE` → link para `/programacao`
- Fallback para action desconhecida (testado com `FUTURE_ACTION`)

**Divergencia:**

O codigo local NAO renderiza `SHOW_EXPLANATION`, `START_STUDY_PLAN`, `START_INTERVIEW` como botoes. Ele renderiza apenas `OPEN_RESOURCE` como link; as outras sao mostradas como texto. A implementacao documentada no remoto e mais avancada do que o codigo local recuperado.

## O que provavelmente aconteceu

O commit de recuperacao (d056d71) capturou o codigo em um estado anterior a implementacao completa do Sprint 26. A documentacao no remoto (ac3e02b) reflete o estado mais avancado, mas o codigo ficou para tras.

## Correcoes necessarias para concluir a sprint

1. Atualizar `InteractActionType` em `types/interact.ts` para incluir `SHOW_EXPLANATION | START_STUDY_PLAN | START_INTERVIEW`
2. Atualizar `interact-result-card.tsx` para renderizar labels e links/botoes para essas actions
3. Garantir CORS para `localhost:8888` (ver Sprint 25)
4. Adicionar fallback explicito para action desconhecida (mostrar "Acao nao reconhecida" sem quebrar UI)

## Licao

Ver `memory/sprint_26_lesson.md`.
