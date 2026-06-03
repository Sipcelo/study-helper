# Recovery Audit — Sprints 25 a 31

## 1. Objetivo

Auditar se o estado local e remoto do projeto contem as entregas das Sprints 25 a 31, identificar gaps, e propor um plano de recuperacao baseado em evidencia, nao em palpite.

## 2. Remoto Git

- URL: https://github.com/Sipcelo/study-helper.git
- Branch atual: main
- Branch remota: main
- Ultimo commit local: 8858e45 (chore: bootstrap do cerebro)
- Ultimo commit remoto: ac3e02b (Add Sprint 26 documentation and guidelines)
- Divergencia local/remoto: local 1 commit ATRAS do remoto
- Arquivos nao commitados: nenhum

Sequencia de commits:

```text
8858e45 (HEAD -> main)  chore: bootstrap do cerebro
ac3e02b (origin/main)   Add Sprint 26 documentation and guidelines
d056d71                 Recuperacao: codigo reconstruido a partir dos transcripts do Claude Code
```

## 3. Arquivos de memoria por sprint

| Sprint | Arquivo esperado | Existe no local? | Existe no remoto? | Observacao |
|--------|------------------|------------------|-------------------|-----------|
| 25 | `docs/sprint25.md` | criado (reconstruido) | nao | reconstruido nesta auditoria |
| 26 | `docs/sprint26.md` | criado (reconstruido) | SIM, em `origin/main` (raiz, 372 linhas) | divergencia de localizacao: remoto na raiz, esperado em `docs/` |
| 27 | `docs/sprint27.md` | criado (reconstruido) | nao | reconstruido |
| 28 | `docs/sprint28.md` | criado (reconstruido) | nao | reconstruido |
| 29 | `docs/sprint29.md` | criado (reconstruido) | nao | reconstruido |
| 30 | `docs/sprint30.md` | criado (reconstruido) | nao | reconstruido |
| 31 | `docs/sprint31.md` | criado (reconstruido) | nao | reconstruido |

## 4. Arquivos de codigo esperados

### Interact

| Arquivo | Existe? | Evidencia | Observacao |
|---------|---------|-----------|-----------|
| `apps/web/src/components/interact/interact-panel.tsx` | SIM | 96 linhas, textarea + select dominio + submit | SEM voz |
| `apps/web/src/components/interact/interact-result-card.tsx` | SIM | 81 linhas, render OPEN_RESOURCE como link | outras actions como texto |
| `apps/web/src/hooks/use-web-speech.ts` | NAO | - | esperado na Sprint 25 |
| `apps/web/src/hooks/use-interact-history.ts` | NAO | - | esperado na Sprint 27 |
| `apps/web/src/components/interact/interact-history-list.tsx` | NAO | - | esperado na Sprint 27 |
| `apps/web/src/lib/api/interact-client.ts` | SIM | 23 linhas, POST /api/interact/text | OK |
| `apps/web/src/types/interact.ts` | SIM | 28 linhas | intents/actions com divergencia |

### Study Planner

| Arquivo | Existe? | Evidencia | Observacao |
|---------|---------|-----------|-----------|
| `apps/web/src/lib/study-planner-context.ts` | NAO | - | esperado na Sprint 28 |
| `apps/web/src/hooks/use-study-plan-draft.ts` | SIM | 73 linhas, draft em `study-helper:study-planner:draft` | sem leitura de contexto Interact |
| `apps/web/src/hooks/use-generated-study-plan.ts` | SIM | 41 linhas, save/get/clear em `study-helper:study-planner:generated-plan` | OK |
| `apps/web/src/hooks/use-study-plan-progress.ts` | SIM | 147 linhas, default GRC key | parametriza plan.id |
| `apps/web/src/components/study-planner/study-plan-form.tsx` | SIM | 272 linhas | OK |
| `apps/web/src/components/study-planner/study-plan-preview.tsx` | SIM | 148 linhas, preview rico | sem badge "origem Interact" |
| `apps/web/src/components/study-plan/generated-plan-shell.tsx` | SIM | 51 linhas, empty state + load | OK |

### Backend Java

| Arquivo | Existe? | Evidencia | Observacao |
|---------|---------|-----------|-----------|
| `services/study-helper-api/src/main/java/com/studyhelper/api/StudyHelperApiApplication.java` | SIM | - | OK |
| `services/study-helper-api/src/main/java/com/studyhelper/api/config/WebConfig.java` | SIM | 20 linhas, CORS para 3000 e 3001 | **FALTA 8888** |
| `services/study-helper-api/src/main/java/com/studyhelper/api/controller/InteractController.java` | SIM | POST /api/interact/text | OK |
| `services/study-helper-api/src/main/java/com/studyhelper/api/controller/HealthController.java` | SIM | - | OK |
| `services/study-helper-api/src/main/java/com/studyhelper/api/domain/Intent.java` | SIM | 7 intents | OK |
| `services/study-helper-api/src/main/java/com/studyhelper/api/domain/ActionType.java` | SIM | 5 actions | OK |
| `services/study-helper-api/src/main/java/com/studyhelper/api/service/InteractService.java` | SIM | orquestra classify + resolve | OK |
| `services/study-helper-api/src/main/java/com/studyhelper/api/service/IntentClassifierService.java` | SIM | regex para 6 intents | OK |
| `services/study-helper-api/src/main/java/com/studyhelper/api/service/InteractActionResolverService.java` | SIM | switch em Intent | OK |
| `services/study-helper-api/src/main/java/com/studyhelper/api/service/ResourceResolverService.java` | SIM | catalogo de recursos | OK |
| `services/study-helper-api/src/main/java/com/studyhelper/api/service/ResourceCatalogService.java` | SIM | - | OK |
| Tests (4 classes, 363 linhas) | SIM | IntentClassifier, InteractAction, Interact, ResourceResolver | OK |

## 5. Estado por sprint

| Sprint | Status documental | Status no codigo | Status no Git | Risco |
|--------|--------------------|------------------|---------------|-------|
| 25 | reconstruido nesta auditoria | PARCIAL (sem hook, sem CORS 8888) | codigo no local, sem doc | medio |
| 26 | reconstruido + doc oficial no remoto | PARCIAL com divergencia | codigo no local atrasado em relacao a doc | alto |
| 27 | reconstruido | NAO FEITA | sem codigo | medio |
| 28 | reconstruido | NAO FEITA | sem codigo | medio |
| 29 | reconstruido | PARCIAL (engine boa) | codigo OK | baixo |
| 30 | reconstruido | FEITA | codigo OK | baixo |
| 31 | reconstruido | PARCIAL (integracao a validar) | codigo OK | baixo |

## 6. O que parece perdido

- `apps/web/src/hooks/use-web-speech.ts` (Sprint 25)
- `apps/web/src/hooks/use-interact-history.ts` (Sprint 27)
- `apps/web/src/components/interact/interact-history-list.tsx` (Sprint 27)
- `apps/web/src/lib/study-planner-context.ts` (Sprint 28)
- Adicao de `http://localhost:8888` no CORS do `WebConfig.java` (Sprint 25)
- Renderizacao completa de `SHOW_EXPLANATION | START_STUDY_PLAN | START_INTERVIEW` no `interact-result-card.tsx` (Sprint 26)

## 7. O que existe apenas localmente

- Memoria desta auditoria (`docs/sprint25.md` ... `docs/sprint31.md`)
- Cerebro em `memory/` (12 arquivos)
- `docs/Rascunho_sprints.md` (draft original, agora versionado)
- `docs/recovery-audit-sprints25-31.md` e `docs/sprints25-31-mindmap.md` (esta auditoria)
- `README.md` e `CLAUDE.md` reescritos

## 8. O que existe apenas no remoto

- `sprint26.md` na RAIZ do projeto (372 linhas), commit ac3e02b
- O commit ac3e02b nao esta no local

## 9. Recomendacao de recuperacao

1. **Sincronizar com remoto**: rodar `git pull origin main` (sem `--force`, sem `--rebase` agressivo) para obter o `sprint26.md` do remoto. Avaliar se o `sprint26.md` da raiz deve ser movido para `docs/sprint26.md` em um commit separado.

2. **Decidir a direcao das Sprints 25-31**:
   - Opcao A: Implementar as features faltantes no estado atual do codigo (concluir 25, 26, 27, 28).
   - Opcao B: Aceitar o estado atual e seguir para a Sprint 11 real (modulo programacao), deixando 25-31 como "a fazer depois".
   - Opcao C: Usar o codigo do `sprint26.md` remoto como referencia para alinhar o front com o back (mover actions do front para `SHOW_EXPLANATION | START_STUDY_PLAN | START_INTERVIEW`).

3. **Resolver mismatch front/back**: em qualquer opcao, alinhar `types/interact.ts` com `ActionType.java` para que o front saiba renderizar todas as actions que o back pode retornar.

4. **Adicionar `localhost:8888` ao CORS**: resolver junto, ja que e um one-liner.

## 10. Proximo passo recomendado

Sincronizar com o remoto, mover `sprint26.md` para `docs/`, e abrir uma sprint dedicada a **alinhamento do contrato Interact front/back** (resolver mismatch de intents/actions) antes de qualquer implementacao de feature nova. Isso destrava as Sprints 26-28 com esforco minimo e elimina a maior fonte de risco tecnico identificada nesta auditoria.

## 11. Validacoes executadas

- `git log --oneline --all -10` — executado, mostrou 3 commits
- `git fetch --all --prune` — executado, sem erros
- `git remote -v` — executado, `https://github.com/Sipcelo/study-helper.git`
- `git status` — executado, working tree limpo antes desta auditoria
- `find apps packages services -type f` — executado, listou ~125 arquivos de codigo
- Leitura de 20+ arquivos chave (interact, study-planner, study-plan, backend)
- `git show origin/main:sprint26.md` — executado, mostrou doc avancada

Validacoes NAO executadas (justificativa: tarefa e apenas auditoria):

- `pnpm --prefix apps/web typecheck` — nao executado (nao estamos implementando)
- `pnpm --prefix apps/web build` — nao executado
- `mvn test` — nao executado (sem mudanca no back)
- `pnpm --prefix apps/web lint` — nao executado (e ja tem limitacao conhecida do SWC no Windows, ver `origin/main:sprint26.md`)

## 12. Diagnostico final

O repositorio remoto em `https://github.com/Sipcelo/study-helper.git` esta **A FRENTE** do estado local. A documentacao do remoto (`sprint26.md`) ja descreve uma implementacao mais avancada do que a do codigo local. O codigo local foi reconstruido de transcripts em um estado intermediario, antes da implementacao completa das Sprints 25-31.

Recomendacao objetiva: **fazer `git pull` para sincronizar, e seguir a Opcao C** (alinhar o contrato Interact) antes de qualquer implementacao de feature nova.
