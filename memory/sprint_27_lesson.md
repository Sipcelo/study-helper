# sprint_27_lesson — Interact History

Sprint: 27
Modulo: cross
Periodo: NAO FEITA

## O que era esperado

- Hook `use-interact-history` com localStorage
- Componente `interact-history-list`
- Chave `study-helper:interact-history` (max 20 itens)
- Salvar pergunta, resposta, intent, action, dominio, data
- Reutilizar pergunta, limpar historico
- NAO salvar em caso de erro de backend

## Desafio

- Decidir o que fazer quando o usuario recarrega a pagina: carregar tudo ou apenas os 5 mais recentes?
- Como serializar Date de forma robusta (string ISO e parse)
- Como evitar salvar items duplicados consecutivos

## Erros

- Sprint nao foi implementada no codigo recuperado

## Decisoes tomadas (propostas)

- Limite de 20 itens, FIFO
- Persistencia em localStorage (chave `study-helper:interact-history`)
- Tipo `InteractHistoryItem`:
  ```ts
  interface InteractHistoryItem {
    id: string;          // uuid ou timestamp
    input: string;
    response: InteractTextResponse;
    domain: InteractDomain;
    createdAt: string;   // ISO
  }
  ```
- Filtro: nao salvar quando `interactText` lanca erro
- Acao "reutilizar" preenche o textarea com `input` e dispara o submit

## Aprendizados

- Historico local e um hook transversal (independente de UI). Componentes consomem via `useInteractHistory()`
- Manter o historico agnóstico ao formato de exibicao; o componente de lista decide como renderizar
- Para o agente: ao criar hooks de storage, sempre parametrize o nome da chave no inicio do arquivo para facilitar busca e manutencao

## Referencias

- `docs/sprint27.md`
- `docs/Rascunho_sprints.md` (linhas 126-160)
- Hooks existentes como referencia de estilo: `apps/web/src/hooks/use-study-plan-draft.ts`
