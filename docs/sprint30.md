# Sprint 30 - Study Planner Save/Continue UX

## Status

**CONCLUIDA com observacoes tecnicas** em 2026-06-05.

A Sprint 30 foi revalidada contra o codigo atual, recebeu ajuste minimo de UX e foi validada via QA manual no dev server.

## Escopo

- Revalidar o fluxo de salvar, abrir e continuar plano gerado.
- Preservar o Study Planner local, sem backend e sem dependencia nova.
- Corrigir apenas lacunas reais de UX no fluxo Save/Continue.
- Nao iniciar Sprint 31.

## Arquivos revalidados

- `apps/web/src/app/planejar-estudos/page.tsx`
- `apps/web/src/app/meu-plano/page.tsx`
- `apps/web/src/app/meu-plano/gerado/page.tsx`
- `apps/web/src/components/study-planner/study-plan-form.tsx`
- `apps/web/src/components/study-planner/study-plan-preview.tsx`
- `apps/web/src/components/study-plan/generated-plan-shell.tsx`
- `apps/web/src/components/study-plan/study-plan-shell.tsx`
- `apps/web/src/hooks/use-generated-study-plan.ts`
- `apps/web/src/hooks/use-study-plan-draft.ts`
- `apps/web/src/hooks/use-study-plan-progress.ts`
- `apps/web/src/lib/study-planner-context.ts`
- `apps/web/src/lib/study-planner/generate-mock-study-plan.ts`
- `apps/web/src/types/study-plan.ts`

Observacao: `apps/web/src/lib/study-plan-storage.ts` nao existe. A persistencia do plano gerado esta centralizada em `apps/web/src/hooks/use-generated-study-plan.ts`.

## Implementacao confirmada

### Plano salvo

`apps/web/src/hooks/use-generated-study-plan.ts` gerencia o plano ativo salvo em localStorage:

- `STORAGE_KEY = 'study-helper:study-planner:generated-plan'`
- `saveGeneratedPlan(plan)`
- `getGeneratedPlan()`
- `clearGeneratedPlan()`
- `hasGeneratedPlan()`
- `getGeneratedPlanProgressKey(planId)`

### Criacao do plano

Em `/planejar-estudos`, `StudyPlanForm` valida `area` e `objective`, gera um `StudyPlan` via `generateMockStudyPlan(draft)`, salva com `saveGeneratedPlan(plan)` e redireciona para `/meu-plano/gerado`.

### Continuacao do plano

`GeneratedPlanShell` le o plano salvo apos mount, evitando hydration mismatch. Se nao houver plano, mostra estado vazio com link para `/planejar-estudos`. Se houver plano, renderiza:

- `StudyPlanOverview`
- banner "Plano salvo neste navegador"
- link "Continuar progresso"
- `StudyPlanShell` com `progressKey` derivada do `plan.id`
- `StudyPlanExport` com a mesma `progressKey`

### Isolamento de progresso

O progresso do plano gerado usa:

```text
study-helper:study-plan:{plan.id}:progress
```

Isso separa o plano gerado do plano GRC estatico (`study-helper:study-plan:grc-30-day:progress`) e evita mistura entre planos.

## Ajustes aplicados

### Confirmacao antes de sobrescrever

Arquivo: `apps/web/src/components/study-planner/study-plan-form.tsx`

Antes de salvar um novo plano, o formulario chama `hasGeneratedPlan()`. Se ja existir plano salvo, `window.confirm` pergunta se o usuario deseja substituir.

- Cancelar: preserva o plano anterior e nao redireciona.
- Confirmar: salva o novo plano e redireciona para `/meu-plano/gerado`.

### Banner de plano salvo

Arquivo: `apps/web/src/components/study-plan/generated-plan-shell.tsx`

Quando existe plano salvo, a rota `/meu-plano/gerado` mostra:

- "Plano salvo neste navegador"
- texto explicando que a pagina carrega plano e progresso locais
- link "Continuar progresso" apontando para `#progresso`

## QA manual final

### Cenario 1 - Estado vazio

`/meu-plano/gerado` sem plano salvo exibe estado vazio claro com mensagem "Nenhum plano gerado ainda." e link "Criar meu plano" para `/planejar-estudos`.

Status: OK.

### Cenario 2 - Criar plano manual

Em `/planejar-estudos`, o formulario atualiza o preview em tempo real. A acao "Gerar meu plano" salva o plano no `localStorage` e redireciona para `/meu-plano/gerado`.

Status: OK.

### Cenario 3 - Sobrescrita de plano existente

Ao tentar salvar um novo plano com plano ativo existente, `window.confirm` e exibido.

- Cancelar preserva o plano anterior.
- Confirmar salva o novo plano e redireciona para `/meu-plano/gerado`.

Status: OK.

### Cenario 4 - Banner de plano salvo

`/meu-plano/gerado` exibe banner "Plano salvo neste navegador", texto explicativo e link "Continuar progresso".

Status: OK.

### Cenario 5 - Continuar progresso

O link `#progresso` direciona para a secao de progresso do plano.

Status: OK.

### Cenario 6 - Fluxo vindo do Interact

O contexto `study-helper:planner-context` e salvo no `sessionStorage` e consumido em `/planejar-estudos`.

Campos validados:

- Area: Programacao
- Objetivo: Spring Boot
- Topicos: input original como fallback
- Badge: Origem Interact

Status: OK.

### Cenario 7 - Responsividade mobile

Layout validado em mobile:

- `grid-cols-1 lg:grid-cols-2`
- `grid-cols-2 sm:grid-cols-4`
- banner com `flex-col sm:flex-row`
- tags com `flex-wrap`
- abas com `flex-wrap`

Sem overflow horizontal observado.

Status: OK.

## Validacoes

```bash
cd apps/web
npx tsc --noEmit
```

Resultado: OK, 0 erros.

## Observacoes tecnicas

- `pnpm build` foi tentado com timeout curto, mas a execucao foi interrompida durante a sessao. Permanece o risco tecnico ja registrado no Windows: build pode travar/falhar por ambiente em `.next/trace`.
- A QA final foi feita via dev server em `pnpm run dev:8888`.
- Foram observados processos Node escutando em `3000` e `8888`; nenhum processo foi encerrado nesta etapa porque a linha de comando completa nao pode ser inspecionada sem permissao elevada.
- Nenhum backend foi alterado.
- Nenhuma dependencia foi adicionada.
- Sprint 31 nao foi iniciada.

## Licao

Ver `memory/sprint_30_lesson.md`.
