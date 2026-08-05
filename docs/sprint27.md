# Sprint 27 — Interact History

## Status

**CONCLUIDA** — implementada e validada manualmente no browser (03/06/2026).

Validadas: texto manual, reutilizar pergunta, limpar historico, backend desligado,
limite 20 itens, acoes Sprint 26 preservadas.

Nao testado: voz (requer microfone fisico em headless browser).

## Fonte da verdade

Codigo validado no browser. Evidencias documentadas em `docs/sprint27.md` (sessao QA manual).

## Objetivo

Historico local das interacoes do Interact usando `localStorage`, max 20 itens.

## Chave localStorage

`study-helper:interact-history`

## Limite

20 itens. O mais antigo e descartado quando o limite e atingido.

## Arquivos criados/alterados

| Arquivo | Tipo | Funcao |
|---------|------|--------|
| `apps/web/src/types/interact.ts` | Tipagem | `InteractHistoryItem` adicionado (id, input, domain, intent, actionType, resourceUrl, createdAt) |
| `apps/web/src/hooks/use-interact-history.ts` | Hook | Carrega/salva localStorage, addItem (com slice 20), clearHistory, protecao SSR, fallback JSON invalido |
| `apps/web/src/components/interact/interact-history-list.tsx` | Componente | Lista de itens recentes, reutilizar pergunta (preenche input sem enviar), limpar historico, estado vazio, max-height scroll |
| `apps/web/src/components/interact/interact-panel.tsx` | Integracao | Importa hook e lista, chama addItem no sucesso de handleSubmit e handleVoiceSubmit, NAO salva em erro, exibe lista abaixo do resultado |

## Comportamentos validados

| Comportamento | Status | Evidencia |
|---------------|--------|-----------|
| Salvar apos resposta valida | OK | addItem chamado no then() do interactText |
| NAO salvar em erro | OK | Backend desligado: 0 novos itens, UI intacta |
| Salvar intent/action/dominio/data | OK | localStorage confirma todos os campos |
| Reutilizar pergunta | OK | Textarea preenchido, sem auto-envio |
| Limpar historico | OK | Lista some, localStorage limpo, estado vazio aparece |
| Limite 20 itens | OK | 20 itens salvos, item mais antigo descartado |
| Protecao SSR | OK | guard typeof window |
| JSON invalido | OK | try/catch com fallback [] |
| Preservacao Sprint 25 (voz) | OK | Microfone visivel, botao funcional |
| Preservacao Sprint 26 (actions) | OK | SHOW_EXPLANATION, START_STUDY_PLAN, START_INTERVIEW, OPEN_RESOURCE — todos renderizando |

## QA Manual

### Ambiente

| Item | Valor |
|------|-------|
| Backend | localhost:8080 (Java Spring Boot) |
| Frontend | localhost:8888 (Next.js 14) |
| Browser | Chrome (headless via Hermes) |

### Checklist manual

| Teste | Resultado |
|-------|-----------|
| Texto manual salva historico | OK — "me explica REST" salvo com intent/action/data |
| Voz salva historico | NAO TESTADO — requer microfone fisico |
| Reutilizar pergunta sem autoenvio | OK — textarea preenchido, sem request automatica |
| Limpar historico | OK — lista some, localStorage limpo, estado vazio |
| Backend desligado nao salva | OK — erro controlado, 0 novos itens, UI intacta |
| Limite de 20 itens | OK — 20 itens no localStorage, mais antigo descartado |
| Actions Sprint 26 preservadas | OK — todas as 4 actions renderizam corretamente |

### LocalStorage

| Item | Valor |
|------|-------|
| Chave | `study-helper:interact-history` |
| Quantidade final | 20 itens (apos teste de limite) |
| Comportamento ao limpar | Lista some, localStorage vazio |
| Comportamento em erro | Nenhum item adicionado |

## Validacoes

| Validacao | Resultado |
|-----------|-----------|
| `npx tsc --noEmit` em `apps/web` | 0 erros |
| Hook sem dependencias externas | OK — zero deps |
| Dados serializaveis via JSON | OK — todos os campos sao string/primitive |

## Observacoes tecnicas

- `handleSubmit` e `handleVoiceSubmit` foram convertidos para `useCallback` para manter estabilidade de referencia com o hook de historico.
- O `addItem` do hook e estavel (useCallback vazio), nao causa re-render infinito.
- A lista de historico fica abaixo do resultado, separada por borda sutil.
- Voz nao foi testada (microfone indisponivel em headless), mas o codigo e identico ao do submit manual no que tange a salvamento de historico.
- Nenhuma alteracao no backend foi necessaria.

## Proximo passo

Sprint 28 — Interact → Planner (contexto do Interact para o Study Planner).