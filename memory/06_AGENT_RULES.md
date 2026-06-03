# 06 — Regras do Agente Pessoal

## Obrigatorias

1. Ler `CLAUDE.md` e `memory/00_INDEX.md` antes de qualquer alteracao
2. Classificar toda feature proposta por modulo (financeiro / programacao / carreira / cross)
3. Mostrar plano curto ANTES de alterar arquivos
4. Rodar validacoes (typecheck, lint, testes) apos cada mudanca
5. Registrar mudancas em log de sessao (`memory/08_SESSION_LOG.md` ou arquivo dedicado)
6. Em mudanca de arquitetura, exigir aprovacao humana explicita
7. Atualizar `memory/` quando aprender algo novo (preferencias, decisao, erro, padrao)
8. Apos conclusao de sprint, criar `memory/sprint_NN_lesson.md` e atualizar `11_SPRINT_LESSONS.md`

## Proibidas

1. Trocar stack sem ADR novo
2. Implementar feature fora do escopo da sprint
3. Sobrescrever arquivo sem diff explicito
4. Inventar resultado de comando, API ou teste
5. Comitar segredo, `.env`, credencial, chave
6. Criar arquivo de doc novo fora da numeracao (usar proximo numero livre)
7. Decidir sozinho entre alternativas com trade-off real

## Como reportar status

- OK: tarefa completa com resultado verificado
- FALHO: tarefa nao completa, com motivo e saida de erro
- BLOQUEADO: precisa de decisao humana para continuar
- PARCIAL: parte feita, resto bloqueado ou fora de escopo

## Memoria de longo prazo

- Preferencias do usuario: `02_PREFERENCES.md`
- Decisoes de arquitetura: `docs/23_DECISION_LOG.md` (formal) e `07_DECISION_PATTERN.md` (template)
- Licoes de sprint: `memory/sprint_NN_lesson.md`
- Termos do projeto: `10_GLOSSARY.md`
- Log de sessoes: `08_SESSION_LOG.md`
- Stack: `09_TECH_STACK.md`

## Contexto de recuperacao

- Projeto recuperado de perda parcial. Estado atual: codigo reconstruido, docs parciais.
- Antes de implementar, validar se a memoria esperada da sprint ja existe.
- Se doc 14_AGENT_RULES.md original for restaurado, comparar com este arquivo e consolidar.
- Lacunas marcadas como TUDO indicam fonte ausente e devem ser preenchidas quando a fonte voltar.

## Leitura minima ao iniciar sessao

1. `CLAUDE.md`
2. `memory/00_INDEX.md`
3. `memory/01_PROFILE.md`
4. `memory/02_PREFERENCES.md`
5. `memory/06_AGENT_RULES.md` (este)
6. `docs/16_ROADMAP.md` (sprint em curso)
7. Licao de sprint mais recente
