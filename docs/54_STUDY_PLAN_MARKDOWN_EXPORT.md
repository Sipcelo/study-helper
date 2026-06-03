# 54 — Exportação de Workspace Markdown

## Objetivo

Permitir que o usuário exporte seu plano de estudos como um conjunto de arquivos Markdown, prontos para uso em editores como Obsidian, Notion, VS Code ou qualquer ferramenta de gestão de conhecimento.

Esta funcionalidade representa a etapa **"Agente"** do fluxo evolutivo da plataforma:

```
Chatbot → Copiloto → Agente (atual: exportação local)
                          ↓
                    futuro: geração real via API Interact (Java)
```

## Arquivos gerados

| Arquivo | Conteúdo |
|---------|----------|
| `README.md` | Metadados do plano, objetivo, como usar o workspace, projeto final |
| `cronograma.md` | Estrutura semanal, objetivos diários, estimativas de tempo e materiais |
| `tarefas.md` | Checklist por semana/dia com tipo e duração de cada tarefa |
| `artefatos.md` | Lista de entregáveis por semana com status e templates |
| `perguntas.md` | Perguntas de revisão únicas por semana com indicador de dificuldade |
| `projeto-final.md` | Objetivo, entregáveis (checklist), critérios de conclusão, espaço para notas |

## Arquitetura

```
src/lib/study-planner/export-study-plan-markdown.ts
  → generateStudyPlanReadme(plan): string
  → generateStudyPlanSchedule(plan): string
  → generateStudyPlanTasks(plan): string
  → generateStudyPlanArtifacts(plan): string
  → generateStudyPlanQuestions(plan): string
  → generateStudyPlanFinalProject(plan): string
  → generateStudyPlanWorkspace(plan): WorkspaceFile[]

src/components/study-plan/study-plan-export.tsx
  → client component
  → recebe plan: StudyPlan
  → gera arquivos com useMemo
  → UX: botão → painel expansível → sidebar de arquivos → preview + ações
```

## UX do componente

1. Botão **"Abrir workspace"** expande o painel
2. Sidebar lista os 6 arquivos com ícone e nome
3. Clicar em um arquivo mostra preview no painel direito
4. Ações disponíveis por arquivo:
   - **Copiar** — copia o conteúdo para clipboard
   - **↓ Baixar** — download do `.md` via Blob
5. Botão **"↓ Baixar tudo"** concatena todos os arquivos em um único `.md`

## Download via Blob (sem dependência)

```typescript
const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.download = filename;
a.href = url;
a.click();
URL.revokeObjectURL(url);
```

Funciona em todos os browsers modernos sem bibliotecas externas.

## Integração

| Rota | Como |
|------|------|
| `/meu-plano` | Server component passa `GRC_30_DAY_PLAN` para `<StudyPlanExport />` |
| `/meu-plano/gerado` | `GeneratedPlanShell` (client) renderiza `<StudyPlanExport plan={plan} />` |

## Funções puras

Todas as funções em `export-study-plan-markdown.ts` são **puras**: recebem `StudyPlan`, retornam string. Sem efeitos colaterais, sem acesso a DOM ou localStorage. Podem ser chamadas em testes unitários diretamente.

## Deduplicação de perguntas

O `generateStudyPlanQuestions` deduplica perguntas por semana (em planos gerados, a mesma fase repete questões em dias diferentes). Apenas perguntas únicas por semana são exibidas.

## Limitações atuais

1. **Sem ZIP real** — o "Baixar tudo" concatena em um único `.md` com separadores, não gera um `.zip` com arquivos individuais
2. **Sem versionamento** — cada export sobrescreve o arquivo anterior no sistema de arquivos do usuário
3. **Sem integração com API Interact** — geração real futura via Java Spring Boot
4. **Sem template de projeto customizado** — o `projeto-final.md` usa critérios genéricos

## Próximos passos

- **Sprint 20** — ZIP real via `JSZip` (se aprovado como dependência) ou API Blob + `showSaveFilePicker`
- **Sprint 19 Java** — conectar gerador ao endpoint real da API Interact para planos dinâmicos via LLM
- Adicionar campo "Notas" por dia no workspace (editor inline)
- Exportar progresso atual (tarefas marcadas) no `tarefas.md`
