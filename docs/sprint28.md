# Sprint 28 — Interact → Study Planner

## Status

**CONCLUIDA** — implementada e validada manualmente no browser (03/06/2026).

## Fonte da verdade

Codigo validado no browser. Evidencias em `docs/sprint28.md` (QA manual).

## Objetivo

Conectar a action `START_STUDY_PLAN` do Interact ao Study Planner,
transportando contexto (input, dominio, intent) para preencher automaticamente
o formulario de planejamento.

## Decisao tecnica

**sessionStorage** em vez de query params ou localStorage.

Motivos:
- O contexto so e relevante durante a sessao de navegacao (mesma aba).
- Nao persiste entre abas (diferente de localStorage).
- Nao aparece na URL (diferente de query params).
- E limpo apos o consumo (clearPlannerContext apos load).

Chave: `study-helper:planner-context`

## Estrutura do contexto

```ts
type PlannerContext = {
  source: "interact";
  input: string;
  domain: string;
  intent: string;
  actionType: string;
  createdAt: string;
};
```

## Mapeamento Interact → Formulario

| Interact | Formulario | Regra |
|----------|-----------|-------|
| `domain` | `area` | Mapeamento fixo (programming→programacao, career→carreira, etc.) |
| `input` | `objective` | Prefixos removidos ("quero estudar X" → "X") via `extractObjective()` |
| `input` | `topics` | Input original preservado como topicos de referencia |

## Arquivos criados/alterados

| Arquivo | Tipo | Funcao |
|---------|------|--------|
| `apps/web/src/lib/study-planner-context.ts` | Criado | `savePlannerContext()`, `loadPlannerContext()`, `clearPlannerContext()`, `domainToArea()`, `extractObjective()` |
| `apps/web/src/components/interact/interact-panel.tsx` | Alterado | Salva contexto via `savePlannerContext()` apos resposta valida (tanto submit manual quanto voz) |
| `apps/web/src/hooks/use-study-plan-draft.ts` | Alterado | Carrega e consome contexto no mount, com fallback para draft localStorage |

## Comportamentos validados

| Comportamento | Status | Evidencia |
|---------------|--------|-----------|
| START_STUDY_PLAN navega para /planejar-estudos | OK | Link ja existia desde a Sprint 26 |
| Contexto salvo no sessionStorage | OK | Verificado apos submit: `sessionStorage.getItem(...)` retorna objeto valido |
| Contexto consumido no planner | OK | Area preenchida (Programacao), objetivo extraido (Spring Boot), topicos preenchidos |
| Contexto limpo apos consumo | OK | `loadPlannerContext()` chama `clearPlannerContext()` — verificado via console |
| Uso direto do planner sem contexto | OK | Pagina carrega com formulario vazio, sem erros |
| Contexto invalido ignorado | OK | JSON invalido em sessionStorage nao quebra a pagina |
| Preservacao Sprint 25 (voz) | OK | Microfone presente |
| Preservacao Sprint 26 (actions) | OK | SHOW_EXPLANATION, START_STUDY_PLAN, START_INTERVIEW, OPEN_RESOURCE — todos renderizando |
| Preservacao Sprint 27 (historico) | OK | Historico salva apos submit, itens visiveis |

## Validacoes

| Validacao | Resultado |
|-----------|-----------|
| `npx tsc --noEmit` em `apps/web` | 0 erros |
| Zero dependencias externas adicionadas | OK |
| Nenhuma alteracao no backend | OK |

## QA Manual

### Ambiente

| Item | Valor |
|------|-------|
| Backend | localhost:8080 (Java Spring Boot) |
| Frontend | localhost:8888 (Next.js 14) |
| Browser | Chrome (headless via Hermes) |

### Testes

| Caso | Resultado |
|------|-----------|
| Texto START_STUDY_PLAN: "quero estudar Spring Boot" | OK — resposta, link, contexto salvo, planner preenche |
| Voz START_STUDY_PLAN | NAO TESTADO (microfone indisponivel) |
| Uso direto do planner | OK — formulario vazio, sem erros |
| Contexto invalido (JSON corrompido) | OK — ignorado, formulario vazio |
| Regressao Interact: "me explica REST" | OK — SHOW_EXPLANATION renderiza |
| Historico Sprint 27 | OK — 2 itens salvos |

## Observacoes tecnicas

- A abordagem de salvar contexto no `interact-panel.tsx` (apos resposta) foi escolhida em vez de
  `onClick` no Link porque o accessibility tree nao dispara eventos React synthetic em Links
  do Next.js de forma confiavel.
- O contexto e sobrescrito a cada nova resposta. O ultimo contexto e o que vale.
- O `loadPlannerContext()` ja chama `clearPlannerContext()` internamente, entao o contexto
  nunca e aplicado duas vezes.
- O draft em localStorage continua funcionando como fallback persistente.

## Proximo passo

Sprint 29 — Study Planner Preview UX (preview rico). Documentacao em `docs/sprint29.md`
precisa ser revalidada antes de implementar.