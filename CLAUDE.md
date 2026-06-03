# CLAUDE.md — Regras de operacao do agente no Study Helper

Este arquivo deve ser lido antes de qualquer alteracao no projeto.

## Identidade do projeto

Voce esta trabalhando no **Study Helper**, uma plataforma web interativa para estudo do mercado financeiro baseada em uma cidade/ecossistema visual.

A aplicacao deve ensinar mercado financeiro de forma visual, clara e exploravel, misturando:

- moedas;
- acoes;
- indices;
- indicadores economicos;
- modelos visuais;
- paineis didaticos;
- graficos;
- conteudo de estudo.

## Objetivo do criador

O criador (Sipcelo) esta no Bootcamp AI Java Backend. A plataforma reflete esse aprendizado, com Java Spring Boot nos servicos de backend novos. Modulos: financeiro (MVP pronto), programacao (proximo), carreira (futuro). Detalhes em `docs/02_CREATOR_CONTEXT.md`.

## Cerebro em nuvem (memory/)

O diretorio `memory/` e o cerebro em nuvem do projeto. Ele documenta preferencias, regras, decisoes, padroes e aprendizados para treinar o agente pessoal de Sipcelo. Conteudo atual em `memory/00_INDEX.md`.

Regras:

1. Ler `memory/00_INDEX.md` no inicio de cada sessao para localizar o topico certo.
2. Antes de cada alteracao, identificar se algo no cerebro precisa ser atualizado (preferencia, decisao, licao, padrao).
3. Ao final de cada sprint, criar `memory/sprint_NN_lesson.md` (template em `11_SPRINT_LESSONS.md`) e atualizar o indice.
4. Ao tomar decisao de arquitetura, abrir ADR em `docs/23_DECISION_LOG.md` e registrar o padrao em `07_DECISION_PATTERN.md`.
5. Toda preferencia nova do usuario vai em `02_PREFERENCES.md` (com data).
6. Toda terminologia nova do projeto vai em `10_GLOSSARY.md`.
7. Nao criar arquivo de cerebro fora da numeracao (proximo numero livre) e sempre atualizar `00_INDEX.md`.

## Modulos da plataforma

Toda feature deve ser classificada por modulo antes de executar:

- **financeiro**: moedas, acoes, indices, indicadores, cidade visual
- **programacao**: trilhas, topicos, perguntas, carreira junior
- **carreira**: roadmap junior → pleno, portfolio, entrevistas
- **cross**: recursos que tocam mais de um modulo

## Stack e arquitetura

Resumo rapido (detalhes em `memory/09_TECH_STACK.md` e `docs/16_ROADMAP.md`):

- Front: Next.js + TypeScript + Tailwind + shadcn/ui + R3F
- Back: Java Spring Boot 3 (novo) + Node/NestJS (legado)
- Banco: PostgreSQL (Neon em dev)
- Cache: Redis / Upstash
- Provider pattern: mock ↔ real trocavel sem mudar UI

## Leitura minima ao iniciar sessao

1. `CLAUDE.md` (este)
2. `memory/00_INDEX.md`
3. `memory/01_PROFILE.md`
4. `memory/02_PREFERENCES.md`
5. `memory/06_AGENT_RULES.md`
6. `docs/16_ROADMAP.md`
7. Licao de sprint mais recente em `memory/sprint_*_lesson.md`

## Regras de execucao

- Etapas pequenas com checkpoint.
- Plano curto antes de alterar arquivos.
- Validacoes (typecheck, lint, testes) apos cada mudanca.
- Status explicito: OK / FALHO / BLOQUEADO / PARCIAL.
- Diff antes de sobrescrever arquivo.
- Nao trocar arquitetura sem aprovacao humana.
- Nao inventar resultado de comando, API ou teste.

## Memoria da sprint

Toda sprint gera dois arquivos:

- `docs/sprint_NN.md` — memoria formal (entregas, arquivos, contexto)
- `memory/sprint_NN_lesson.md` — licao (desafio, erros, decisoes, aprendizados)

Criar os dois ao fechar a sprint.

## Origem dos dados

- Stack, ADRs e contexto do criador: `docs/` (estado parcial — varios docs ausentes na recuperacao)
- Cérebro do agente: `memory/` (este arquivo e o ponto de entrada)
