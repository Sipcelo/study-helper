# Prompt para Senior — Auditoria de Recuperação: Mapa Mental das Sprints 25–31

Você está trabalhando no projeto **Study Helper**, uma plataforma educacional modular com frontend em **Next.js** e backend em **Java Spring Boot**.

## Situação atual

Houve perda de parte relevante do projeto.

O usuário suspeita que o repositório remoto:

```text
git@github.com:Sipcelo/study-helper.git
```

talvez **não seja a versão mais atual** ou **não corresponda exatamente à versão local em que estávamos trabalhando**.

Antes de qualquer nova implementação, precisamos fazer uma auditoria técnica e documental.

## Objetivo principal

Criar um **mapa mental consolidado das Sprints 25, 26, 27, 28, 29, 30 e 31**, garantindo que cada sprint tenha sua própria memória em arquivo separado.

Também devemos comparar:

* documentação existente;
* código local;
* Git local;
* Git remoto;
* arquivos perdidos ou ausentes;
* estado real da aplicação.

## Regra principal

Não implementar feature nova.

Não corrigir bug funcional agora.

Não refatorar.

Não fazer deploy.

Não sobrescrever arquivos importantes.

Esta tarefa é apenas de:

* auditoria;
* reconstrução de memória;
* comparação;
* documentação;
* diagnóstico;
* recomendação de recuperação.

## Contexto das Sprints

### Sprint 25 — Voz no Interact

Objetivo esperado:

* adicionar entrada por voz ao Interact usando Web Speech API;
* não alterar backend;
* não criar endpoint de áudio;
* manter `POST /api/interact/text`;
* validar fluxo:

  * voz → transcrição → input → backend → resposta renderizada.

Memória esperada:

```text
docs/sprint25.md
```

Principais arquivos esperados:

```text
apps/web/src/hooks/use-web-speech.ts
apps/web/src/components/interact/interact-panel.tsx
apps/web/src/types/interact.ts
services/study-helper-api/src/main/java/com/studyhelper/api/config/WebConfig.java
docs/61_SPEECH_TO_TEXT_WEB.md
docs/sprint25.md
```

Correções esperadas:

* CORS para `http://localhost:8888`;
* union types com:

  * `SHOW_EXPLANATION`
  * `START_STUDY_PLAN`
  * `START_INTERVIEW`.

---

### Sprint 26 — Interact Actions UX

Objetivo esperado:

* renderizar actions do Interact como botões/links contextuais.

Memória esperada:

```text
docs/sprint26.md
```

Principais arquivos esperados:

```text
apps/web/src/components/interact/interact-result-card.tsx
apps/web/src/types/interact.ts
docs/sprint26.md
```

Actions esperadas:

```text
SHOW_EXPLANATION -> Abrir explicacao
START_STUDY_PLAN -> Planejar estudos
START_INTERVIEW -> Iniciar simulacao
OPEN_RESOURCE -> Abrir recurso
action desconhecida -> fallback seguro
```

---

### Sprint 27 — Interact History

Objetivo esperado:

* criar histórico local das interações do Interact usando `localStorage`.

Memória esperada:

```text
docs/sprint27.md
```

Principais arquivos esperados:

```text
apps/web/src/hooks/use-interact-history.ts
apps/web/src/components/interact/interact-history-list.tsx
apps/web/src/components/interact/interact-panel.tsx
apps/web/src/types/interact.ts
docs/sprint27.md
```

Comportamentos esperados:

* salvar pergunta;
* salvar resposta;
* salvar intent/action/domínio/data;
* listar histórico recente;
* reutilizar pergunta;
* limpar histórico;
* limitar a 20 itens;
* não salvar em erro de backend.

---

### Sprint 28 — Study Planner + Interact

Objetivo esperado:

* conectar action `START_STUDY_PLAN` ao Study Planner;
* transportar contexto do Interact para `/planejar-estudos`.

Memória esperada:

```text
docs/sprint28.md
```

Principais arquivos esperados:

```text
apps/web/src/lib/study-planner-context.ts
apps/web/src/components/interact/interact-result-card.tsx
apps/web/src/hooks/use-study-plan-draft.ts
apps/web/src/components/study-planner/study-plan-form.tsx
docs/sprint28.md
```

Chave esperada:

```text
study-helper:planner-context
```

Decisão técnica esperada:

* usar `sessionStorage`;
* não alterar backend;
* não criar endpoint.

---

### Sprint 29 — Study Planner Preview UX

Objetivo esperado:

* melhorar a experiência visual do preview do Study Planner.

Memória esperada:

```text
docs/sprint29.md
```

Principais arquivos esperados:

```text
apps/web/src/components/study-planner/study-plan-form.tsx
apps/web/src/components/study-planner/study-plan-preview.tsx
docs/sprint29.md
```

Comportamentos esperados:

* empty state melhorado;
* cabeçalho mais claro;
* resumo com área/duração/ritmo/estilo;
* tópicos destacados;
* etapas semanais mais legíveis;
* origem Interact preservada;
* engine `generateStudyPlanPreview()` preservada.

---

### Sprint 30 — Study Planner Save/Continue UX

Objetivo esperado:

* melhorar fluxo de salvar, abrir e continuar plano.

Memória esperada:

```text
docs/sprint30.md
```

Principais arquivos esperados:

```text
apps/web/src/components/study-planner/study-plan-form.tsx
apps/web/src/components/study-planner/study-plan-preview.tsx
apps/web/src/components/study-plan/generated-plan-shell.tsx
docs/sprint30.md
```

Chaves esperadas:

```text
study-helper:study-planner:generated-plan
study-helper:study-plan:{plan.id}:progress
```

Comportamentos esperados:

* CTA “Salvar e abrir este plano”;
* feedback de save;
* confirmação antes de sobrescrever plano salvo;
* empty state claro;
* banner “Plano salvo no navegador”;
* atalho “Continuar progresso”.

---

### Sprint 31 — Study Planner Progress UX

Objetivo esperado:

* melhorar experiência de progresso do plano salvo em `/meu-plano/gerado`.

Memória esperada:

```text
docs/sprint31.md
```

Principais arquivos prováveis:

```text
apps/web/src/components/study-plan/generated-plan-shell.tsx
apps/web/src/hooks/use-study-plan-progress.ts
apps/web/src/lib/study-plan-storage.ts
apps/web/src/types/study-planner.ts
docs/sprint31.md
```

Comportamentos esperados:

* progresso geral;
* contagem ou porcentagem;
* próxima etapa pendente;
* estado nenhuma etapa concluída;
* estado progresso parcial;
* estado plano completo;
* progresso persistindo por `plan.id`.

## Arquivos de memória obrigatórios

Verificar se existem:

```text
docs/sprint25.md
docs/sprint26.md
docs/sprint27.md
docs/sprint28.md
docs/sprint29.md
docs/sprint30.md
docs/sprint31.md
```

Se algum não existir, criar uma memória reconstruída com base em:

* logs existentes;
* arquivos alterados;
* `docs/24_AGENT_SESSION_LOG.md`;
* histórico Git;
* estado atual do código;
* informações deste prompt.

## Mapa mental esperado

Criar arquivo:

```text
docs/sprints25-31-mindmap.md
```

Esse arquivo deve conter:

````md
# Mapa Mental — Sprints 25 a 31

## Visão macro

Interact evoluiu em:
- Sprint 25: voz
- Sprint 26: actions
- Sprint 27: histórico

Study Planner evoluiu em:
- Sprint 28: integração com Interact
- Sprint 29: preview UX
- Sprint 30: salvar/continuar
- Sprint 31: progresso UX

## Mapa

```text
Study Helper
├── Interact
│   ├── Sprint 25 — Voz
│   ├── Sprint 26 — Actions UX
│   └── Sprint 27 — History
│
└── Study Planner
    ├── Sprint 28 — Interact -> Planner
    ├── Sprint 29 — Preview UX
    ├── Sprint 30 — Save/Continue UX
    └── Sprint 31 — Progress UX
````

## Dependências entre sprints

* Sprint 26 depende da Sprint 25.
* Sprint 27 depende das Sprints 25 e 26.
* Sprint 28 depende das Sprints 26 e 27.
* Sprint 29 depende da Sprint 28.
* Sprint 30 depende da Sprint 29.
* Sprint 31 depende da Sprint 30.

## Estado por sprint

Tabela com:

* sprint;
* objetivo;
* arquivos esperados;
* arquivos encontrados;
* status documental;
* status no código;
* status no Git;
* risco.

````

## Auditoria Git obrigatória

Executar comandos locais e registrar resultados.

### 1. Identificar repositório atual

```bash
git remote -v
git branch --show-current
git status --short
git log --oneline -20
````

### 2. Verificar remoto

```bash
git fetch --all --prune
git remote show origin
git log --oneline origin/main -20
```

Se a branch principal não for `main`, identificar a correta.

### 3. Comparar local com remoto

```bash
git status
git branch -vv
git log --oneline --decorate --graph --all -30
```

Verificar:

* commits locais não enviados;
* commits remotos não puxados;
* branch divergente;
* arquivos não rastreados;
* alterações locais não commitadas;
* commits em outra branch.

### 4. Procurar arquivos das sprints

```bash
find docs -iname "sprint*.md"
find apps -iname "*interact*"
find apps -iname "*study*plan*"
```

No PowerShell, usar equivalente:

```powershell
Get-ChildItem docs -Recurse -Filter "sprint*.md"
Get-ChildItem apps -Recurse | Where-Object { $_.Name -match "interact" }
Get-ChildItem apps -Recurse | Where-Object { $_.Name -match "study.*plan|study-plan" }
```

### 5. Verificar arquivos críticos

Confirmar existência e estado de:

```text
apps/web/src/hooks/use-web-speech.ts
apps/web/src/hooks/use-interact-history.ts
apps/web/src/components/interact/interact-history-list.tsx
apps/web/src/components/interact/interact-result-card.tsx
apps/web/src/components/interact/interact-panel.tsx
apps/web/src/lib/study-planner-context.ts
apps/web/src/hooks/use-study-plan-draft.ts
apps/web/src/hooks/use-study-plan-progress.ts
apps/web/src/components/study-planner/study-plan-form.tsx
apps/web/src/components/study-planner/study-plan-preview.tsx
apps/web/src/components/study-plan/generated-plan-shell.tsx
```

## Relatório obrigatório

Criar arquivo:

```text
docs/recovery-audit-sprints25-31.md
```

Com estrutura:

```md
# Recovery Audit — Sprints 25 a 31

## 1. Objetivo

Auditar se o estado local e remoto do projeto contém as entregas das Sprints 25 a 31.

## 2. Remoto Git

- URL:
- Branch atual:
- Branch remota:
- Último commit local:
- Último commit remoto:
- Divergência local/remoto:

## 3. Arquivos de memória

| Sprint | Arquivo | Existe? | Completo? | Observação |
|---|---|---|---|---|

## 4. Arquivos de código esperados

| Área | Arquivo | Existe? | Evidência | Observação |
|---|---|---|---|---|

## 5. Estado por sprint

| Sprint | Status documental | Status no código | Status no Git | Risco |
|---|---|---|---|---|

## 6. O que parece perdido

- ...

## 7. O que existe apenas localmente

- ...

## 8. O que existe apenas no remoto

- ...

## 9. Recomendação de recuperação

- usar local como base;
- usar remoto como base;
- criar branch de recuperação;
- fazer backup antes de merge;
- reconstruir arquivos ausentes;
- outro.

## 10. Próximo passo recomendado

Uma única recomendação objetiva.
```

## Regras de segurança

Antes de qualquer alteração destrutiva:

* não rodar `git reset --hard`;
* não rodar `git clean -fd`;
* não fazer pull com merge automático sem backup;
* não sobrescrever arquivos locais;
* não deletar branch;
* não forçar push;
* não mexer em `.env`;
* não expor secrets.

Se houver divergência local/remoto, primeiro criar backup:

```bash
git branch backup-before-recovery
```

E, se houver alterações não commitadas:

```bash
git status --short
```

Depois orientar o usuário antes de qualquer operação destrutiva.

## Validações técnicas

Se o projeto estiver íntegro o suficiente, rodar:

```bash
pnpm --prefix apps/web typecheck
```

E:

```bash
pnpm --prefix apps/web build:timeboxed
```

Se `build:timeboxed` não existir:

```bash
pnpm --prefix apps/web build
```

Registrar se passou, falhou ou não foi possível executar.

## Entregáveis finais

Ao final, devem existir ou ser atualizados:

```text
docs/sprint25.md
docs/sprint26.md
docs/sprint27.md
docs/sprint28.md
docs/sprint29.md
docs/sprint30.md
docs/sprint31.md
docs/sprints25-31-mindmap.md
docs/recovery-audit-sprints25-31.md
docs/00_INDEX.md
docs/24_AGENT_SESSION_LOG.md
```

## Formato obrigatório da resposta final

Responder exatamente neste formato:

````md
## Auditoria de Recuperação — Sprints 25 a 31

### Status

Concluída / Parcial / Bloqueada

### Git

- Remote:
- Branch local:
- Último commit local:
- Último commit remoto:
- Divergência local/remoto:
- Há arquivos não commitados?:

### Memórias por sprint

| Sprint | Arquivo | Status |
|---|---|---|
| 25 | `docs/sprint25.md` | ... |
| 26 | `docs/sprint26.md` | ... |
| 27 | `docs/sprint27.md` | ... |
| 28 | `docs/sprint28.md` | ... |
| 29 | `docs/sprint29.md` | ... |
| 30 | `docs/sprint30.md` | ... |
| 31 | `docs/sprint31.md` | ... |

### Mapa mental

- `docs/sprints25-31-mindmap.md`: criado / atualizado / pendente

### Relatório de recuperação

- `docs/recovery-audit-sprints25-31.md`: criado / atualizado / pendente

### Arquivos críticos encontrados

- ...

### Arquivos críticos ausentes

- ...

### O que parece perdido

- ...

### O que está só no local

- ...

### O que está só no GitHub/remoto

- ...

### Validações executadas

```bash
comando
````

Resultado:

* passou / falhou / não executado

### Diagnóstico

Explique se o GitHub `git@github.com:Sipcelo/study-helper.git` parece ou não ser a versão mais atual.

### Risco

* ...

### Próximo passo recomendado

Uma única recomendação objetiva.

```

## Regra final

Faça apenas auditoria e reconstrução documental.

Não implemente Sprint 31.

Não avance para Sprint 32.

Não altere backend.

Não altere frontend funcionalmente.

Não faça reset, clean, force push ou pull destrutivo.

O objetivo é descobrir qual versão do projeto é confiável e reconstruir o mapa mental das Sprints 25 a 31.
```
