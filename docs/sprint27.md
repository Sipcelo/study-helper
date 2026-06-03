# Sprint 27 — Interact History

## Status

**NAO FEITA** — nenhum dos arquivos esperados foi encontrado.

## O que era esperado

- `apps/web/src/hooks/use-interact-history.ts` — hook para gerenciar historico em `localStorage`
- `apps/web/src/components/interact/interact-history-list.tsx` — componente que lista o historico
- `apps/web/src/components/interact/interact-panel.tsx` — integrar o historico
- `apps/web/src/types/interact.ts` — tipos do historico
- Chave `study-helper:interact-history` no localStorage (max 20 itens)
- Salvar pergunta, resposta, intent, action, dominio, data
- Reutilizar pergunta, limpar historico
- NAO salvar em caso de erro de backend

## O que foi encontrado

- `apps/web/src/hooks/` tem apenas 3 hooks: `use-generated-study-plan.ts`, `use-study-plan-draft.ts`, `use-study-plan-progress.ts`
- `apps/web/src/components/interact/` tem apenas 2 componentes: `interact-panel.tsx` e `interact-result-card.tsx`
- Nenhuma chave `study-helper:interact-history` no codigo

## Como implementar

1. Criar `apps/web/src/hooks/use-interact-history.ts`:
   - Estado em `useState`
   - Carregar de `localStorage` no mount
   - Persistir apos cada mudanca
   - Limitar a 20 itens
   - Expor `addItem`, `clear`, `items`
2. Criar `apps/web/src/components/interact/interact-history-list.tsx`:
   - Lista os itens mais recentes
   - Botao "reutilizar" que preenche o textarea
   - Botao "limpar historico"
3. Integrar em `interact-panel.tsx`:
   - Chamar `addItem` no sucesso de `interactText`
   - NAO chamar em erro
4. Adicionar tipo `InteractHistoryItem` em `types/interact.ts`

## Licao

Ver `memory/sprint_27_lesson.md`.
