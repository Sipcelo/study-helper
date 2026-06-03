# 16 — Roadmap

## Visao geral

O roadmap do Study Helper e organizado em duas dimensoes:

1. **Evolucao tecnica**: infraestrutura, backend Java, API, banco;
2. **Evolucao de modulos**: financeiro (atual) → programacao → carreira.

---

## Fase 0 — Documentacao e setup

Status: **concluida**

Entregas:

- docs completas;
- CLAUDE.md;
- monorepo;
- app web;
- lint/typecheck;
- Tailwind;
- shadcn/ui;
- README atualizado.

---

## Fase 1 — MVP visual financeiro (modulo 1)

Status: **em andamento**

Objetivo: validar conceito visual com dados mockados.

Entregas:

- landing page;
- cidade 2D/2.5D;
- ativos mockados (moedas, acoes);
- painel lateral de ativo;
- graficos simples;
- filtros;
- estados de alta/queda;
- pagina individual de ativo;
- catalogo de ativos;
- indices e indicadores (sprint 8).

---

## Fase 2 — Backend Java Spring Boot

Objetivo: substituir mocks por API real usando Java e iniciar o projeto final do bootcamp.

### 2a — Estrutura base

- projeto Spring Boot em `services/study-helper-api/`;
- endpoints de assets (moedas, acoes, indices, indicadores);
- endpoints de historico de preco;
- PostgreSQL + Spring Data JPA;
- Docker local;
- consumo no front Next.js via provider pattern (mock → real sem quebrar UI).

### 2b — API Interact (projeto final do bootcamp)

Servico separado em `services/api-interact/`.

Pipeline: **ouvir → transcrever → classificar intencao → agir**.

Intencoes: `EXPLAIN_CONCEPT`, `GENERATE_STUDY_PLAN`, `SIMULATE_INTERVIEW`, `REVIEW_ANSWER`, `OPEN_RESOURCE`, `COMPARE_CONCEPTS`.

Dominios: programacao, carreira, estudos, financas.

Ver especificacao completa em: `docs/38_API_INTERACT_SPEECH_TO_TEXT.md`

---

## Fase 3 — Modulo de Programacao

Objetivo: criar a segunda vertical da plataforma — o modulo central do produto.

Plano detalhado em: `docs/39_PROGRAMMING_MODULE_PLAN.md`
Trilhas definidas em: `docs/40_PROGRAMMING_LEARNING_PATHS.md`
Wireframe conceitual em: `docs/41_PROGRAMMING_AREA_WIREFRAME.md`
Modelo de dados em: `docs/42_PROGRAMMING_DATA_MODEL.md`
Backlog completo em: `docs/43_PROGRAMMING_MODULE_BACKLOG.md`

### Fase 3a — Páginas estáticas (dados mockados)

- pagina /programacao com grid de trilhas;
- trilha Java Essencial (12 topicos);
- trilha Spring Boot (11 topicos);
- pagina de topico individual com explicacao + codigo + perguntas;
- conteudo educacional real por topico.

### Fase 3b — Trilhas completas

- trilha REST, Banco de Dados, DTOs, Arquitetura, Testes, Deploy;
- secao de entrevista junior — 60+ perguntas com filtros;
- pagina /carreira-junior — checklist de portfolio e roadmap junior → pleno.

### Fase 3c — Integracao com API Java

- provider pattern replicado do modulo financeiro;
- endpoints Java: GET /tracks, GET /topics, GET /interview-questions;
- substituicao dos mocks por dados reais sem alterar componentes.

---

## Fase 4 — 3D leve

Objetivo: criar experiencia interativa 3D na cidade financeira.

Entregas:

- React Three Fiber;
- cena basica;
- predios geometricos;
- clique em objetos;
- camera controlada;
- fallback 2D.

---

## Fase 5 — Dados reais (financeiro)

Objetivo: conectar providers financeiros reais.

Entregas:

- provider interface consolidada;
- mock provider mantido;
- provider real inicial (Yahoo Finance, Alpha Vantage ou similar);
- cache Redis;
- snapshots periodicos;
- rankings.

---

## Fase 6 — Modulo de Carreira

Objetivo: terceira vertical da plataforma.

Entregas:

- pagina /carreira;
- roadmap visual de evolucao (junior → pleno → senior);
- checklist de portfolio;
- guia de entrevistas;
- recursos de networking.

---

## Fase 7 — Produto publico

Objetivo: publicar como portfolio e produto.

Entregas:

- deploy estavel;
- pagina sobre o projeto;
- SEO;
- analytics;
- performance;
- conteudo para redes sociais.

---

## Fase 8 — IA educacional com API Interact

Objetivo: integrar a API Interact ao modulo de programacao.

Ver especificacao da API Interact em: `docs/38_API_INTERACT_SPEECH_TO_TEXT.md`

Entregas:

- botao de microfone nas paginas de topico;
- intencao EXPLAIN_CONCEPT — explicar conceito por voz;
- intencao SIMULATE_INTERVIEW — simular entrevista tecnica;
- intencao GENERATE_STUDY_PLAN — plano personalizado por voz;
- intencao REVIEW_ANSWER — feedback sobre resposta do usuario;
- painel de resposta estruturada da API.

Nao implementar antes do MVP de pelo menos dois modulos estar maduro e a API Interact estar operacional.

---

## Sprints documentadas

| Sprint | Entrega | Status |
|--------|---------|--------|
| Sprint 0 | Bootstrap do monorepo | Concluida |
| Sprint 1-4 | Cidade financeira, ativos, painel | Concluida |
| Sprint 5-7 | Catalogo de ativos, pagina individual | Concluida |
| Sprint 8 | Indices e indicadores | Concluida |
| Sprint 9 | Reposicionamento estrategico (documentacao) | Concluida |
| Sprint 10 | Plano do modulo de programacao (documentacao) | Concluida |
| Sprint 11 | Implementacao: paginas estaticas /programacao | Proximo |
