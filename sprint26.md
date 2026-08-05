# Sprint 26 - Memoria, Regras e Controle

## 1. Estado inicial

A Sprint 26 comeca apos a conclusao da Sprint 25.

A Sprint 25 entregou entrada por voz no Interact usando Web Speech API, sem alterar a arquitetura do backend e sem criar endpoint de audio.

Arquivo de referencia:

- `docs/sprint25.md`

## 2. Decisao do usuario

O usuario definiu que a Sprint 26 deve seguir o mesmo padrao de controle da Sprint 25.

Decisao registrada:

> Toda sprint deve ter uma memoria consolidada em `docs/`, contendo comportamento esperado do agente, decisoes do usuario, regras, prompts e validacoes, para manter o padrao nas proximas execucoes.

## 3. Comportamento obrigatorio do agente

O agente deve:

- ler a documentacao antes de alterar codigo;
- trabalhar em etapas pequenas;
- pedir ou aguardar escopo quando a sprint ainda nao estiver definida;
- nao implementar fora do escopo;
- nao avancar para outra sprint sem autorizacao;
- nao fazer refatoracao ampla sem necessidade comprovada;
- registrar decisoes do usuario;
- registrar problemas com evidencia;
- rodar validacoes;
- atualizar documentacao;
- responder sempre com status, arquivos alterados, validacoes e proximo passo.

## 4. Regras herdadas da Sprint 25

- Nao alterar arquitetura sem necessidade comprovada.
- Nao criar endpoints sem autorizacao explicita.
- Nao adicionar dependencias sem justificativa tecnica.
- Nao implementar feature nova fora do escopo.
- Nao mascarar erro real com mensagem generica.
- Nao declarar sprint concluida sem validacao.
- Nao ignorar falhas de build, typecheck ou testes.
- Separar problema de ambiente de problema de aplicacao.
- Documentar limitacoes conhecidas.
- Registrar decisoes e comportamento esperado.

## 5. Padrao de execucao da Sprint 26

Toda tarefa da Sprint 26 deve seguir:

1. Ler documentacao obrigatoria.
2. Confirmar escopo.
3. Inspecionar arquivos relevantes.
4. Aplicar alteracao minima.
5. Rodar validacoes.
6. Atualizar documentacao.
7. Responder com resumo tecnico.
8. Parar.

## 6. Padrao de validacao

Sempre que aplicavel, rodar:

```bash
pnpm --prefix apps/web typecheck
pnpm --prefix apps/web build
```

Se houver backend alterado:

```bash
mvn test
```

Se houver lint disponivel e ambiente permitir:

```bash
pnpm --prefix apps/web lint
```

Observacao conhecida herdada da Sprint 25:

- `next lint` pode falhar no Windows por crash nativo do SWC.
- Essa falha deve ser registrada separadamente como limitacao de ambiente, nao confundida com erro funcional da aplicacao.

## 7. Padrao de documentacao

Sempre que houver decisao, correcao ou diagnostico relevante, atualizar:

- `docs/sprint26.md`

Se aplicavel, atualizar tambem:

- `docs/24_AGENT_SESSION_LOG.md`
- documentacao especifica da funcionalidade alterada.

## 8. Escopo da Sprint 26

Status atual: **definido**.

Objetivo principal:

- Melhorar a renderizacao e o comportamento das actions retornadas pela API Interact.

Escopo aprovado:

- `SHOW_EXPLANATION`: exibir botao/link para recurso educacional.
- `START_STUDY_PLAN`: direcionar para `/planejar-estudos`.
- `START_INTERVIEW`: exibir acao contextual para iniciar entrevista/simulacao.
- fallback seguro para action desconhecida.
- manter `interactText()`.
- nao alterar backend salvo bug comprovado.

A Sprint 26 so deve implementar itens ligados a esse escopo enquanto nao houver nova decisao do usuario.

Possiveis formatos aceitos de escopo:

- correcao tecnica;
- melhoria de UX;
- nova integracao;
- melhoria no Interact;
- melhoria no Study Planner;
- melhoria no modulo de programacao;
- melhoria de documentacao;
- hardening de QA;
- preparacao de Sprint futura.

## 9. Fora de escopo ate nova decisao

Enquanto o usuario nao redefinir o escopo da Sprint 26, o agente nao deve:

- alterar backend;
- criar endpoints;
- alterar banco;
- adicionar dependencias;
- modificar arquitetura;
- iniciar Sprint 27;
- fazer deploy.

## 10. Prompts reutilizaveis da Sprint 26

### Prompt base para iniciar tarefa

```md
Voce esta na Sprint 26 do Study Helper.

Antes de implementar, leia `docs/sprint26.md` e siga suas regras.

Execute apenas a tarefa solicitada pelo usuario.
Nao avance para outra tarefa.
Nao altere arquitetura.
Nao implemente fora do escopo.
Rode validacoes aplicaveis.
Atualize documentacao se houver decisao, correcao ou diagnostico relevante.
Responda com status, arquivos alterados, validacoes e proximo passo.
```

### Prompt base para correcao tecnica

```md
Investigue o problema informado dentro do escopo da Sprint 26.

Primeiro reproduza ou confirme o problema.
Depois isole a causa.
Aplique a menor correcao possivel.
Rode validacoes.
Documente o diagnostico em `docs/sprint26.md`.
Nao faca refatoracao ampla.
```

### Prompt base para implementacao

```md
Implemente somente o item solicitado para a Sprint 26.

Preserve padroes existentes.
Nao altere backend, frontend ou contrato fora do necessario.
Rode typecheck/build/testes aplicaveis.
Atualize `docs/sprint26.md`.
Pare ao concluir o item.
```

## 11. Decisoes tomadas durante a Sprint 26

Registrar aqui cada decisao relevante no formato:

```md
### Decisao YYYY-MM-DD - titulo

Decisao:
- ...

Motivo:
- ...

Impacto:
- ...
```

### Decisao 2026-05-31 - memoria obrigatoria por sprint

Decisao:
- A Sprint 26 deve iniciar com uma memoria propria em `docs/sprint26.md`.
- Nenhuma implementacao funcional deve iniciar antes da definicao clara de escopo.

Motivo:
- Criar um historico consolidado por sprint, funcionando como memoria operacional do projeto.

Impacto:
- Agentes futuros devem ler este arquivo antes de executar tarefas da Sprint 26.

### Decisao 2026-05-31 - Interact Actions UX

Decisao:
- A Sprint 26 passa a ter como escopo melhorar a UX das actions retornadas pela API Interact.
- O frontend deve renderizar links/botoes para `SHOW_EXPLANATION`, `START_STUDY_PLAN` e `START_INTERVIEW`.
- Actions desconhecidas devem ter fallback seguro.
- `interactText()` deve continuar sendo usado.
- Backend nao deve ser alterado sem bug comprovado.

Motivo:
- A Sprint 25 alinhou voz e contrato; a Sprint 26 melhora a utilidade da resposta renderizada no painel.

Impacto:
- O foco imediato fica em `apps/web/src/components/interact/interact-result-card.tsx` e tipos relacionados.

## 12. Validacoes executadas

Registrar aqui validacoes importantes no formato:

```md
### Validacao YYYY-MM-DD - titulo

Comandos:

```bash
...
```

Resultado:

- passou / falhou / travou

Observacoes:

- ...
```

### Validacao 2026-05-31 - bootstrap documental

Comandos:

```bash
pnpm --prefix apps/web typecheck
```

Resultado:

- passou.

Observacoes:

- Esta tarefa e apenas documental; build nao e obrigatorio.

### Validacao 2026-05-31 - Interact Actions UX

Comandos:

```bash
pnpm --prefix apps/web typecheck
pnpm --prefix apps/web build
```

Resultado:

- passou.

Observacoes:

- `next dev` precisou ser parado antes do build para evitar lock conhecido em `.next/trace`.
- Build manteve warning conhecido do SWC nativo Windows, usando fallback WASM.
- Warnings preexistentes de lint apareceram durante o build em `src/app/page.tsx` e `mock-market-provider.ts`.

### Validacao 2026-05-31 - Checklist manual automatizado no Chrome

Comandos/ferramentas:

```text
Chrome com DevTools Protocol em http://localhost:8888/interact
Backend Java em http://localhost:8080
Frontend Next em http://localhost:8888
```

Resultado:

- passou.

Observacoes:

- `me explica REST` retornou `SHOW_EXPLANATION`.
- Botao `Abrir explicacao` apareceu.
- Link navegou para `/programacao/rest-api`.
- `quero estudar Spring Boot` retornou `START_STUDY_PLAN`.
- Botao `Planejar estudos` apareceu.
- Link navegou para `/planejar-estudos`.
- `simula entrevista Java Junior` retornou `START_INTERVIEW`.
- Botao `Iniciar simulacao` apareceu.
- Link navegou para `/programacao/entrevista-java-junior` sem tela de erro.
- `OPEN_RESOURCE` continuou funcionando com `comparar NVDA e TSLA`, navegando para `/programacao`.
- Fallback de action desconhecida foi simulado com `FUTURE_ACTION` e exibiu `Acao nao reconhecida` sem quebrar a UI.

## 13. Pendencias

Registrar pendencias da Sprint 26:

- [x] Escopo principal da Sprint 26 definido: Interact Actions UX.
- [x] Renderizar actions conhecidas como links/botoes contextuais.
- [x] Adicionar fallback seguro para action desconhecida.
- [x] Validar manualmente no navegador os fluxos `SHOW_EXPLANATION`, `START_STUDY_PLAN` e `START_INTERVIEW`.
- [x] Validar `OPEN_RESOURCE` apos a nova renderizacao.
- [x] Validar fallback seguro para action desconhecida.

## 14. Estado final

Status: **Concluida com observacoes tecnicas**

A Sprint 26 implementou e validou a UX das actions do Interact.

Actions validadas:

- `SHOW_EXPLANATION`
- `START_STUDY_PLAN`
- `START_INTERVIEW`
- `OPEN_RESOURCE`
- fallback para action desconhecida

Validacao manual realizada no Chrome em:

```text
http://localhost:8888/interact
```

Resultado: fluxo aprovado.

Arquivos de implementacao:

```text
apps/web/src/components/interact/interact-result-card.tsx
apps/web/src/types/interact.ts
```

Arquivos de documentacao:

```text
docs/sprint26.md
docs/24_AGENT_SESSION_LOG.md
```

Observacao tecnica:

```text
next lint pode falhar no Windows por crash nativo do SWC.
```

Como `typecheck`, `build` e validacao manual passaram, isso nao bloqueia a Sprint 26.

Proximo passo:

- Arquivar a Sprint 26 e definir o escopo da Sprint 27 antes de qualquer implementacao.
