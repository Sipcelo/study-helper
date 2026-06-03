# 55 — Exportação de Progresso no Workspace Markdown

## Objetivo

Incluir o estado de progresso do usuário (tarefas e artefatos concluídos) nos arquivos Markdown exportados, tornando o workspace um snapshot fiel do momento real de estudo.

## Como o progresso entra no Markdown

O `StudyPlanExport` captura o progresso via `captureProgress()`, chamada automaticamente ao abrir o painel e manualmente pelo botão "Atualizar progresso":

```typescript
function captureProgress() {
  setExportProgress(readProgress(progressKey));  // lê localStorage agora
  setSnapshotTime(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
}

function handleOpen() {
  captureProgress();
  setOpen(true);
}
```

O `ExportProgress` é repassado para `generateStudyPlanWorkspace(plan, progress)`, que o distribui para os geradores afetados.

## Atualizar progresso sem fechar o painel

O banner interno do painel exibe o botão **"↺ Atualizar progresso"** que re-lê o localStorage sem fechar/reabrir o painel. O timestamp discreto "capturado às HH:mm" confirma quando o snapshot foi feito. Isso permite marcar tarefas e exportar o estado atualizado na mesma sessão.

## Arquivos afetados pelo progresso

| Arquivo | Mudança com progresso |
|---------|----------------------|
| `README.md` | Seção "Progresso Atual" com tabela tarefas/artefatos/% geral |
| `tarefas.md` | `[x]` para tarefas concluídas, `[ ]` para pendentes |
| `artefatos.md` | `[x]` no título e `✅ Entregue` no status para artefatos entregues |
| `cronograma.md` | Sem alteração (informação estrutural) |
| `perguntas.md` | Sem alteração (revisão não tem estado de conclusão) |
| `projeto-final.md` | Sem alteração (critérios são sempre pendentes até conclusão final) |

## Formato no tarefas.md

```markdown
### Dia 3 — Criar endpoint GET /api/items
_Objetivo: Criar endpoints REST..._

- [x] **Configurar JDK 21 e IDE** (Prática · 20min)
- [x] **Criar projeto com Spring Initializr** (Prática · 20min)
- [ ] **Entender estrutura Maven** (Prática · 20min)
```

## Formato no artefatos.md

```markdown
### [x] Dia 7 — CRUD funcional documentado
**Tipo:** codigo

Endpoints CRUD com testes no Postman/Insomnia.

**Status:** ✅ Entregue
```

## ID das entidades no progresso

O mapeamento usa os mesmos IDs gerados pelo `use-study-plan-progress.ts`:

| Entidade | ID usado |
|----------|----------|
| Tarefa | `task.id` (ex: `grc-30-day-w1-d1-t1`) |
| Artefato | `artifact-day-{dayNumber}` (ex: `artifact-day-7`) |

## Progresso por plano (isolamento)

| Plano | progressKey | Fonte |
|-------|-------------|-------|
| GRC | `study-helper:study-plan:grc-30-day:progress` | constante `GRC_PROGRESS_KEY` |
| Gerado | `study-helper:study-plan:generated-{ts}:progress` | `getGeneratedPlanProgressKey(plan.id)` |

Cada plano lê sua própria chave — sem mistura de progresso.

## Diferença entre exportar com e sem progresso

| Comportamento | Sem progressKey | Com progressKey |
|---------------|----------------|----------------|
| `tarefas.md` | todos `[ ]` | `[x]` nos concluídos |
| `artefatos.md` | todos `⬜ Pendente` | `✅ Entregue` nos concluídos |
| `README.md` | sem seção de progresso | tabela com % de conclusão |
| Badge no painel | não aparece | mostra x/y tarefas e artefatos |

## Limitações atuais

1. **Snapshot manual** — o export captura o progresso no momento do clique (abrir ou "↺ Atualizar"). Arquivos já baixados não se atualizam automaticamente.
2. **`projeto-final.md` sem progresso** — os entregáveis do projeto final não têm rastreamento individual (todos ficam `[ ]`).
3. **Sem ZIP** — "Baixar tudo" gera arquivo concatenado, não `.zip`.

## Próximos passos

- **Sprint 21** — Adicionar botão "Atualizar progresso" no painel (re-lê localStorage sem fechar/reabrir).
- **API Interact** — futuramente o snapshot de progresso pode ser enviado ao backend para análise e recomendação de próximos passos via LLM.
