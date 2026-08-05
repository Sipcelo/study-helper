# Sprint 25.1 — Recuperação Executável e Alinhamento Interact

**Data:** 03/06/2026
**Status:** CONCLUIDA
**Tipo:** Recuperação / Código-first

## Objetivo

Transformar o estado recuperado do Study Helper em um projeto executável e validar o contrato real entre front Next.js e backend Java, seguindo o checklist de `docs/Ajustes.md`.

## Entregas

### 1. Estrutura executável do front (criada do zero)

O front não tinha manifestos de projeto. Foram criados:

- `apps/web/package.json` — dependências: next 14, react 18, zustand 4, tailwindcss 3, clsx, tailwind-merge
- `apps/web/tsconfig.json` — alias `@/*` -> `./src/*`, paths para `@study-helper/types` e `@study-helper/config`
- `apps/web/next.config.js` — transpilePackages para os pacotes locais
- `apps/web/tailwind.config.ts`
- `apps/web/postcss.config.js`
- `apps/web/.eslintrc.json` — extends next/core-web-vitals
- `apps/web/src/app/globals.css` — @tailwind directives (importado por layout.tsx)
- `apps/web/src/lib/cn.ts` — utilitário clsx + tailwind-merge (11 componentes importavam)

Pacotes do monorepo:

- `pnpm-workspace.yaml` — raiz
- `packages/types/package.json`
- `packages/config/package.json` — depende de @study-helper/types

### 2. Alinhamento do contrato Interact

**Arquivo:** `apps/web/src/types/interact.ts`

InteractIntent alinhado com `Intent.java`:

| Antes (front) | Depois (front = back) |
|---|---|
| EXPLAIN_CONCEPT | EXPLAIN_CONCEPT |
| QUIZ_ME | GENERATE_STUDY_PLAN |
| NAVIGATE_TO | SIMULATE_INTERVIEW |
| SEARCH_TOPIC | REVIEW_ANSWER |
| UNKNOWN | OPEN_RESOURCE |
| | COMPARE_CONCEPTS |
| | UNKNOWN |

InteractActionType alinhado com `ActionType.java`:

| Antes (front) | Depois (front = back) |
|---|---|
| OPEN_RESOURCE | OPEN_RESOURCE |
| SHOW_QUIZ | SHOW_EXPLANATION |
| SEARCH | START_STUDY_PLAN |
| NONE | START_INTERVIEW |
| | NONE |

### 3. Renderização de todas as actions

**Arquivo:** `apps/web/src/components/interact/interact-result-card.tsx`

- Labels e cores para todos os 7 intents do backend
- Labels para todos os 5 action types
- CTAs navegáveis:
  - `OPEN_RESOURCE` → Link para target
  - `START_STUDY_PLAN` → Link para `/planejar-estudos`
  - `START_INTERVIEW` → Link para target
- `SHOW_EXPLANATION` → bloco textual sem target cru
- `NONE` → sem bloco de ação

### 4. CORS localhost:8888

**Arquivo:** `services/study-helper-api/.../config/WebConfig.java`

Adicionado `http://localhost:8888` em allowedOrigins.

### 5. Correções de tipos

**Arquivo:** `packages/types/src/index.ts`

- `VisualTheme.buildingType` adicionado (era referenciado em 11 componentes mas ausente no tipo)

**Arquivo:** `apps/web/src/components/asset-detail-panel.tsx`

- Adicionado `import Link from 'next/link'` (usava `<Link>` sem import)

## Validações executadas

| Validação | Resultado |
|---|---|
| `mvn test` (backend) | OK — 41 testes, 0 falhas |
| `pnpm install` | OK — 118 pacotes resolvidos |
| `pnpm typecheck` | OK — 0 erros |
| `pnpm lint` | PARCIAL — erro de compatibilidade ESLint (next@14 vs eslint 9), não bloqueador |
| curl `/api/interact/text` cenário 1: "me explica REST" | EXPLAIN_CONCEPT + SHOW_EXPLANATION |
| curl `/api/interact/text` cenário 2: "estudar Spring Boot" | GENERATE_STUDY_PLAN + START_STUDY_PLAN |
| curl `/api/interact/text` cenário 3: "entrevista Java junior" | SIMULATE_INTERVIEW + START_INTERVIEW |
| curl `/api/interact/text` cenário 4: "compara REST e SOAP" | COMPARE_CONCEPTS + OPEN_RESOURCE |
| CORS OPTIONS com Origin: localhost:8888 | Access-Control-Allow-Origin: http://localhost:8888 |
| Browser `/interact` — UI renderiza | OK |
| Browser `/interact` — input REST → resposta | OK — badge "Explicar conceito", ação "Explicação" |
| Browser `/interact` — input Spring Boot → CTA | OK — badge "Gerar plano de estudos", link "Iniciar plano de estudos" |

## Arquivos alterados/criados

Criados (11):
- `apps/web/package.json`
- `apps/web/tsconfig.json`
- `apps/web/next.config.js`
- `apps/web/tailwind.config.ts`
- `apps/web/postcss.config.js`
- `apps/web/.eslintrc.json`
- `apps/web/src/app/globals.css`
- `apps/web/src/lib/cn.ts`
- `pnpm-workspace.yaml`
- `packages/types/package.json`
- `packages/config/package.json`

Alterados (5):
- `apps/web/src/types/interact.ts`
- `apps/web/src/components/interact/interact-result-card.tsx`
- `apps/web/src/components/asset-detail-panel.tsx`
- `services/study-helper-api/src/main/java/com/studyhelper/api/config/WebConfig.java`
- `packages/types/src/index.ts`

## Pendências

1. **ESLint**: next@14 + eslint 9 tem conflito de opções. Resolver com downgrade do eslint ou upgrade do next config.
2. **Health endpoint 500**: `/api/health` retorna 500 (provavelmente falta um controller). Não é bloqueador para o Interact.
3. **Lint não rodou**: typecheck passou, mas lint não validou estilo de código.

## Próximo passo recomendado

A sprint 25.1 entrega o projeto executável com contrato Interact alinhado. Próxima sprint pode:
- Corrigir ESLint
- Implementar TTS (voz)
- Adicionar histórico de Interact
- Ou seguir com features do módulo financeiro/programação