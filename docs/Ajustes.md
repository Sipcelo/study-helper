# Ajustes — Sprint de Recuperacao Executavel e Contrato Interact

## Objetivo

Transformar o estado recuperado do Study Helper em um projeto executavel e validar o contrato real entre front Next.js e backend Java.

Esta sprint deve priorizar codigo real sobre documentacao antiga. Use docs e memory apenas como contexto, nao como autoridade quando houver conflito com o codigo.

## Estado confirmado pelo review

- Backend Java em `services/study-helper-api/` esta executavel.
- `mvn test` passou com 41 testes, 0 falhas.
- Front em `apps/web/src/` tem codigo fonte, mas nao esta executavel porque faltam manifestos do projeto.
- Nao existe `package.json` na raiz.
- Nao existe `apps/web/package.json`.
- Nao existe `pnpm-workspace.yaml`.
- Contrato Interact esta divergente entre front e back.
- CORS do backend libera apenas `localhost:3000` e `localhost:3001`.

## Regras para o Hermes

1. Trabalhar codigo-first.
2. Nao assumir que README/docs antigos estao corretos quando conflitarem com o codigo.
3. Fazer mudancas pequenas e validaveis.
4. Antes de editar, mostrar plano curto.
5. Depois de cada bloco, rodar a validacao possivel.
6. Nao trocar stack.
7. Nao criar feature nova antes de recuperar o app executavel e alinhar Interact.

## Checklist da sprint

### 1. Recuperar estrutura executavel do front

- [ ] Verificar imports reais em `apps/web/src`.
- [ ] Criar ou restaurar `package.json` da raiz.
- [ ] Criar ou restaurar `apps/web/package.json`.
- [ ] Criar ou restaurar `pnpm-workspace.yaml`.
- [ ] Garantir scripts minimos:
  - `dev`
  - `typecheck`
  - `lint`
  - `build`
- [ ] Garantir dependencias compativeis com o codigo:
  - Next.js
  - React
  - TypeScript
  - Tailwind
  - Zustand
  - Recharts
  - Lightweight Charts
  - Three.js / React Three Fiber, se imports exigirem
- [ ] Validar alias `@/*` apontando para `apps/web/src/*`.
- [ ] Rodar `pnpm install`, se necessario.
- [ ] Rodar `pnpm --filter web typecheck` ou comando equivalente.
- [ ] Rodar `pnpm --filter web lint` ou comando equivalente.

### 2. Alinhar contrato Interact front/back

Arquivos principais:

- `apps/web/src/types/interact.ts`
- `services/study-helper-api/src/main/java/com/studyhelper/api/domain/Intent.java`
- `services/study-helper-api/src/main/java/com/studyhelper/api/domain/ActionType.java`
- `apps/web/src/components/interact/interact-result-card.tsx`

Back retorna intents:

- `EXPLAIN_CONCEPT`
- `GENERATE_STUDY_PLAN`
- `SIMULATE_INTERVIEW`
- `REVIEW_ANSWER`
- `OPEN_RESOURCE`
- `COMPARE_CONCEPTS`
- `UNKNOWN`

Back retorna actions:

- `OPEN_RESOURCE`
- `SHOW_EXPLANATION`
- `START_STUDY_PLAN`
- `START_INTERVIEW`
- `NONE`

Tarefas:

- [ ] Atualizar `InteractIntent` no front para aceitar todos os intents do back.
- [ ] Atualizar `InteractActionType` no front para aceitar todas as actions do back.
- [ ] Remover ou isolar actions antigas do front que o back nao retorna:
  - `SHOW_QUIZ`
  - `SEARCH`
- [ ] Atualizar labels e cores de intents no `interact-result-card.tsx`.
- [ ] Renderizar CTA navegavel para:
  - `OPEN_RESOURCE`
  - `START_STUDY_PLAN`
  - `START_INTERVIEW`
- [ ] Renderizar `SHOW_EXPLANATION` como resposta textual sem target cru.
- [ ] Renderizar `NONE` sem bloco de acao.
- [ ] Evitar mostrar target tecnico cru quando a action for de navegacao.

### 3. Ajustar CORS local

Arquivo:

- `services/study-helper-api/src/main/java/com/studyhelper/api/config/WebConfig.java`

Tarefas:

- [ ] Adicionar `http://localhost:8888` em `allowedOrigins`.
- [ ] Manter `http://localhost:3000`.
- [ ] Manter `http://localhost:3001`.
- [ ] Rodar `mvn test`.

### 4. Validar backend

- [ ] Rodar `mvn test` em `services/study-helper-api/`.
- [ ] Confirmar que continuam passando 41 testes ou justificar mudanca no numero.
- [ ] Se alterar comportamento de action, adicionar ou ajustar testes em:
  - `InteractActionResolverServiceTest`
  - `InteractServiceTest`

### 5. Validar fluxo integrado

Quando front estiver executavel:

- [ ] Subir backend Java em `localhost:8080`.
- [ ] Subir front em `localhost:3000` ou `localhost:8888`.
- [ ] Abrir `/interact`.
- [ ] Testar input: `me explica o que e REST`.
- [ ] Testar input: `quero estudar Spring Boot`.
- [ ] Testar input: `simula entrevista Java junior`.
- [ ] Testar input: `compara REST e SOAP`.
- [ ] Confirmar que a resposta aparece.
- [ ] Confirmar que o CTA aparece corretamente quando houver action.
- [ ] Confirmar que nao ha erro de CORS no navegador.

### 6. Nao fazer nesta sprint

- [ ] Nao implementar voz/Web Speech ainda.
- [ ] Nao implementar historico Interact.
- [ ] Nao implementar contexto Interact -> Planner.
- [ ] Nao migrar backend para banco.
- [ ] Nao alterar arquitetura.
- [ ] Nao iniciar nova vertical.

Esses itens podem virar sprint posterior depois que o projeto estiver executavel e o contrato Interact estiver correto.

## Criterio de aceite

A sprint so termina quando:

- Front tem estrutura minima para instalar dependencias e rodar validacoes.
- Backend continua com testes passando.
- Tipos do front refletem o contrato real do backend.
- Card de resultado do Interact renderiza todas as actions do backend de forma amigavel.
- CORS permite `localhost:3000`, `localhost:3001` e `localhost:8888`.
- Fluxo `/interact` foi validado manualmente ou a impossibilidade foi documentada com motivo tecnico.

## Resultado esperado

Ao final, o Study Helper deve estar pronto para uma proxima sprint funcional, sem bloquear em estrutura ausente ou contrato Interact quebrado.
