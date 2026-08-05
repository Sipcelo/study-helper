# Sprint 29 - Study Planner Preview UX

## Status

**CONCLUIDA** - revalidada contra codigo atual em 2026-06-05 na Sprint 29.1.

O QA manual obrigatorio foi executado via dev server em `http://localhost:8888`
apos limpeza de ambiente. O build segue classificado como bloqueio de ambiente
no Windows, mas nao bloqueia a Sprint 29 porque os criterios obrigatorios
passaram via dev server e `npx tsc --noEmit`.

## Fonte da verdade

Codigo atual validado por leitura direta, `npx tsc --noEmit` e QA manual em navegador real via Chrome headless/CDP.

Docs antigos sao referencia historica. O diagnostico antigo que dizia que a Sprint 28 nao existia esta obsoleto: a Sprint 28 ja esta concluida e o contexto Interact -> Planner existe no codigo.

## Objetivo

Revalidar e sincronizar a UX do preview do Study Planner em `/planejar-estudos`.

O preview deve continuar local, sem backend, preservando a engine `generateStudyPlanPreview()` e o contexto da Sprint 28 quando o fluxo vem do Interact.

## Decisao tecnica

- O preview e renderizado em `apps/web/src/components/study-planner/study-plan-preview.tsx`.
- A engine local `generateStudyPlanPreview()` foi preservada sem alteracao.
- O estado vazio e tratado em `study-plan-form.tsx`: quando `area` e `objective` ainda nao validam, aparece um card orientando o usuario a preencher os campos.
- A integracao da Sprint 28 e consumida por `use-study-plan-draft.ts`, que le `study-helper:planner-context` via `loadPlannerContext()`, preenche `area`, `objective` e `topics`, e limpa o contexto apos consumo.
- Foi adicionada uma flag `loadedFromPlannerContext` no hook para a UI exibir a origem Interact.

## Arquivos principais

| Arquivo | Estado |
|---------|--------|
| `apps/web/src/app/planejar-estudos/page.tsx` | Existe, renderiza `StudyPlanForm` |
| `apps/web/src/components/study-planner/study-plan-form.tsx` | Formulario, estado vazio, preview e badge de origem Interact |
| `apps/web/src/components/study-planner/study-plan-preview.tsx` | Preview rico com objetivo, stats, intensidade, semanas, artefatos, resultado, parametros e CTA |
| `apps/web/src/hooks/use-study-plan-draft.ts` | Draft localStorage + consumo de contexto Interact |
| `apps/web/src/lib/study-planner-context.ts` | sessionStorage `study-helper:planner-context` |
| `apps/web/src/lib/study-planner/generate-study-plan-preview.ts` | Engine local preservada |
| `apps/web/src/types/study-plan.ts` | Tipos do formulario e plano |

## Classificacao do docs/sprint29.md antigo

| Item antigo | Classificacao atual |
|-------------|---------------------|
| `study-plan-preview.tsx` existe e e rico | Confirmado no codigo |
| `generateStudyPlanPreview()` existe e e usado | Confirmado no codigo |
| Estado vazio claro | Confirmado no codigo |
| Cabecalho "Preview do plano" | Confirmado no codigo |
| Resumo de parametros | Confirmado no codigo |
| Origem Interact ausente porque Sprint 28 nao foi feita | Obsoleto |
| Sprint 28 depende de implementacao futura | Obsoleto |
| Badge origem Interact ausente | Corrigido nesta revalidacao |

## Comportamentos validados por codigo

| Comportamento | Status |
|---------------|--------|
| `/planejar-estudos` existe | Confirmado |
| Formulario carrega via `StudyPlanForm` | Confirmado |
| Uso direto sem contexto nao depende de backend | Confirmado por codigo |
| Preview possui estado vazio | Confirmado |
| Preview possui cabecalho claro | Confirmado |
| Preview mostra objetivo | Confirmado |
| Preview mostra duracao/carga/minutos por dia | Confirmado |
| Preview mostra ritmo/intensidade | Confirmado |
| Preview mostra estilo via `StudyPlanInputSummary` | Confirmado |
| Preview organiza etapas semanais | Confirmado |
| Preview mostra artefatos sugeridos | Confirmado |
| Preview mostra resultado esperado | Confirmado |
| Engine local preservada | Confirmado |
| Contexto Sprint 28 consumido | Confirmado por codigo |
| Badge origem Interact | Implementado nesta revalidacao |

## Arquivos alterados

- `apps/web/src/hooks/use-study-plan-draft.ts`: adicionada flag `loadedFromPlannerContext`.
- `apps/web/src/components/study-planner/study-plan-form.tsx`: exibe badge "Origem Interact" e passa `source` ao preview.
- `apps/web/src/components/study-planner/study-plan-preview.tsx`: aceita `source` e exibe badge "Origem Interact" quando aplicavel.
- `docs/sprint29.md`: memoria oficial da Sprint 29; historico parcial de 2026-06-03 preservado e conclusao registrada na Sprint 29.1.

## Validacoes

```bash
cd apps/web
npx tsc --noEmit
```

Resultado: passou, 0 erros.

```bash
cd apps/web
pnpm build
```

Resultado em 2026-06-03: falhou por ambiente/permissao:

```text
EPERM: operation not permitted, open '...apps/web/.next/trace'
```

Resultado em 2026-06-05: nao aguardado indefinidamente. A execucao anterior
do `pnpm build` ficou bloqueada/travada no Windows e a validacao da Sprint 29.1
foi feita por `npx tsc --noEmit` + dev server.

## Testes manuais - bloqueio anterior de 2026-06-03

Ambiente tentado:

- Backend: `http://localhost:8080` - health OK, API Interact OK.
- Frontend esperado pelo prompt: `http://localhost:8888` - porta ocupada por processo que retorna 404 em `/planejar-estudos` e `/interact`.
- Frontend alternativo tentado: `http://localhost:3000` e `http://localhost:3002` - Next abriu socket, mas ficou preso em `Starting` e nao serviu as paginas durante a janela de validacao.
- Browser: browser embutido indisponivel (`iab` nao disponivel).

Resultado dos casos:

| Caso | Resultado |
|------|-----------|
| Uso direto sem contexto | Nao validado manualmente; bloqueado pelo dev server |
| Preview manual | Nao validado manualmente; bloqueado pelo dev server |
| Fluxo vindo do Interact | API validada; UI nao validada manualmente |
| Responsividade basica | Nao validada manualmente |
| Regressao Interact | API validada; UI nao validada manualmente |
| Historico Sprint 27 | Nao validado manualmente nesta sprint |

## Sprint 29.1 - Environment Cleanup + QA Manual

Data: 2026-06-05.

### Objetivo

Limpar o ambiente local do Next.js, subir o frontend corretamente e executar
o QA manual obrigatorio da Sprint 29 sem iniciar Sprint 30.

### Ambiente testado

- Backend: `http://localhost:8080/api/health` respondeu 200 (`UP`).
- Frontend: `http://localhost:8888`.
- Porta usada: 8888.
- Browser: Chrome headless isolado via CDP, porque o browser embutido (`iab`) estava indisponivel.
- Node: `v20.18.1`.
- pnpm: `10.33.4`.

### Processos e portas

- Portas verificadas antes da limpeza: 8888, 3000, 3002.
- 8888 estava ocupada pelo dev server anterior, PID `23744`.
- 3000 e 3002 estavam livres na retomada de 2026-06-05.
- Processo encerrado: PID `23744` (`taskkill /PID 23744 /F`, com elevacao).
- Portas apos limpeza: 8888, 3000 e 3002 sem `LISTENING`.
- Dev server final: PID `22604` ouvindo em 8888.

### Limpeza executada

- `.next` removido somente depois de encerrar o PID da porta 8888.
- Primeira tentativa de `Remove-Item -Recurse -Force apps/web/.next` falhou por EPERM em cache/trace.
- Remocao elevada restrita a `apps/web/.next` passou.

### Comandos executados

```bash
npx tsc --noEmit
```

Resultado: passou, 0 erros.

```bash
pnpm dev -- -p 8888
```

Resultado: falhou porque o script local ja contem `next dev -p 3000` e o Next
interpretou `-p` como diretorio (`Invalid project directory ... apps/web/-p`).

```bash
pnpm exec next dev -p 8888
```

Resultado: passou. Next.js 14.2.35 ficou `Ready` em `http://localhost:8888`.

### QA manual executado

| Caso | Resultado |
|------|-----------|
| Uso direto sem contexto | OK - `/planejar-estudos` abriu, formulario apareceu, estado vazio claro, sem badge `Origem Interact`. |
| Preview manual | OK - area Programacao, objetivo Spring Boot e topicos Java/REST/Spring Boot geraram preview com cabecalho, objetivo, estrutura, artefatos e resultado esperado. |
| Fluxo vindo do Interact | OK - `/interact` aceitou "quero estudar Spring Boot", mostrou action `Iniciar plano de estudos`, navegou para `/planejar-estudos`, preencheu area/objetivo/topicos, exibiu badge `Origem Interact` e limpou sessionStorage. |
| Responsividade basica | OK - largura 390px, preview legivel, sem overflow horizontal (`scrollWidth = 390`), botao acessivel. |
| Regressao Interact | OK - `me explica REST`, `simula entrevista Java Junior` e `comparar NVDA e TSLA` mantiveram actions funcionais. |
| Historico Sprint 27 | OK - 3 interacoes salvas em `study-helper:interact-history`. |

### Resultado do QA

Todos os criterios obrigatorios da Sprint 29 passaram via dev server.

O build permanece como limitacao de ambiente Windows (`pnpm build` travado/bloqueado
e historico de EPERM em `.next/trace`), mas o frontend foi validado em runtime
real pelo dev server.

## Bugs encontrados

1. Documentacao antiga da Sprint 29 estava obsoleta sobre a Sprint 28.
2. A UI consumia contexto Interact, mas nao expunha origem Interact no preview/status.
3. Ambiente local de validacao apresentou bloqueios:
   - `pnpm build` falhou por `EPERM` em `.next/trace`.
   - `next dev` ficou preso em `Starting` nas portas 3000 e 3002.
   - porta 8888 estava ocupada por outro processo que respondia 404 para as rotas relevantes.

## Correcoes aplicadas

- Adicionado `loadedFromPlannerContext` ao retorno de `useStudyPlanDraft()`.
- Adicionado badge "Origem Interact" no status bar do formulario.
- Adicionado badge "Origem Interact" no preview quando `source === 'interact'`.
- Engine de preview preservada.
- Backend nao alterado.
- Nenhuma dependencia adicionada.

## Pendencias

- Nenhuma pendencia obrigatoria da Sprint 29.
- Build de producao ainda precisa ser revalidado em ambiente Windows limpo, fora do criterio de conclusao desta Sprint 29.1.

## Riscos restantes

- `pnpm build` pode voltar a travar/falhar no Windows por lock/permissao em `.next/trace`.
- O comando `pnpm dev -- -p 8888` nao funciona porque `package.json` fixa `next dev -p 3000` no script `dev`; usar o script explicito `pnpm run dev:8888`.

## Proximo passo

Sprint 29 encerrada. Proximo passo liberado: planejar Sprint 30 sem alterar backend ou Study Planner fora de spec.

## Sprint 29.2 - Dev Script Port Cleanup

Data: 2026-06-05.

### Objetivo

Garantir que o frontend possa subir em porta controlada, principalmente `8888`,
sem alterar codigo de produto e sem iniciar Sprint 30.

### Scripts verificados

Arquivo: `apps/web/package.json`.

Scripts atuais:

```json
{
  "dev": "next dev -p 3000",
  "dev:8888": "next dev -p 8888",
  "build": "next build",
  "start": "next start",
  "typecheck": "tsc --noEmit",
  "lint": "next lint"
}
```

### Decisao

- `dev` foi preservado em `next dev -p 3000` para nao quebrar fluxos existentes.
- `dev:8888` ja existia e e o script oficial para QA em `localhost:8888`.
- Nenhuma dependencia adicionada.
- Nenhum backend, componente ou logica do Study Planner alterados.

### Comando recomendado

```bash
cd apps/web
pnpm run dev:8888
```

Evitar:

```bash
pnpm dev -- -p 8888
```

Esse formato continua invalido porque concatena argumentos sobre um script que
ja define `-p 3000`.

### Validacao

```bash
cd apps/web
npx tsc --noEmit
```

Resultado: passou, 0 erros.
