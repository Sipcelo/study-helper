# 61 — Roadmap Checklist (Auditado contra codigo real)

Data: 03/06/2026
Base: docs/16_ROADMAP.md x codigo real (auditoria completa)

Legenda:
  [OK] Completo e funcional
  [~] Parcial — funciona mas falta algo
  [ ] Nao implementado / ausente
  [--] Fora de escopo / nao se aplica

═════════════════════════════════════════════════
FASE 0 — Documentacao e setup
═════════════════════════════════════════════════

Status no roadmap: CONCLUIDA
Status real:       ~90% — concluida, com lacunas

  [OK] docs numeradas 00-60 — 43 arquivos em docs/
  [OK] CLAUDE.md — presente
  [OK] AGENTS.md — presente
  [OK] monorepo (pnpm workspace) — funcional
  [OK] app web (Next.js 14) — builda e roda
  [OK] Tailwind 3 — configurado e usado
  [OK] shadcn/ui — presente
  [OK] README — atualizado
  [~] typecheck (tsc --noEmit) — funcional
  [ ] eslint — quebrado (incompatibilidade eslint 8/9)
  [ ] docs 14_AGENT_RULES, 17-22 — ausentes (lacunas)

GAP: eslint quebrado, docs intermediarias ausentes

═════════════════════════════════════════════════
FASE 1 — MVP visual financeiro (modulo 1)
═════════════════════════════════════════════════

Status no roadmap: EM ANDAMENTO (sprint 11 "proximo")
Status real:       ~95% CONCLUIDO — muito alem do roadmap

  [OK] landing page — hero + praca + cidade + painel
  [OK] cidade 2.5D — CityMap + CityDistrict + AssetBuilding
  [OK] ativos mockados — 18 ativos (6 moedas, 6 acoes, 3 indices, 3 indicadores)
  [OK] painel lateral de ativo — AssetDetailPanel
  [~] graficos simples — apenas sparklines SVG (sem candlestick/area/zoom)
  [OK] filtros — 7 categorias + busca textual
  [OK] estados de alta/queda — 5 niveis com thresholds e cores
  [OK] pagina individual de ativo — /ativo/[id] com educacao
  [OK] catalogo de ativos — /ativos com busca + filtros
  [OK] indices e indicadores — 3 indices + 3 indicadores nos dados
  [OK] glossario financeiro — /glossario com busca e categorias
  [OK] sistema educacional — EducationSection 5 abas + ConceptModal
  [OK] provider pattern — interface + MockProvider + placeholder BrAPI

GAP: graficos interativos (candlestick, area) ausentes
GAP: provider BrAPI real nao implementado (placeholder apenas)
GAP: filtros da MarketStore (Zustand) nao conectados ao AssetCatalog

CONCLUSÃO: Fase 1 esta 95% feita. O roadmap diz "em andamento"
mas o codigo ja entregou muito alem do previsto. Sprint 11
no roadmap corresponde a um estado anterior a recuperacao.

═════════════════════════════════════════════════
FASE 2 — Backend Java Spring Boot
═════════════════════════════════════════════════

Status no roadmap: NAO INICIADA (2a e 2b)
Status real:       ~30% — so API Interact existe

 2a — Estrutura base:

  [OK] projeto Spring Boot — services/study-helper-api/ existe
  [OK] pom.xml com Spring Boot 3.3.4 + Java 17
  [OK] CORS configurado
  [ ] endpoints de assets (moedas, acoes, indices, indicadores)
  [ ] endpoints de historico de preco
  [ ] PostgreSQL + Spring Data JPA
  [ ] Docker local
  [ ] consumo no front (provider pattern mock -> real)

  2b — API Interact:

  [OK] endpoint POST /api/interact/text — funcional
  [OK] 5 servicos implementados e testados
  [OK] 41 testes unitarios — todos passando
  [OK] classificacao por regex com 7 intencoes
  [OK] catalogo de recursos com 13 entries
  [ ] speech-to-text (POST /api/speech)
  [ ] servico separado services/api-interact/
  [ ] integracao com front /interact ja existe

GAP GRAVE: endpoints de assets nao existem
GAP GRAVE: sem JPA, sem banco, sem persistencia
GAP: API Interact vive dentro do study-helper-api, nao como
     servico separado conforme o roadmap preve
GAP: speech-to-text nao implementado

CONCLUSÃO: Backend tem base e API Interact, mas falta o
principal: endpoints de dados financeiros e banco.

═════════════════════════════════════════════════
FASE 3 — Modulo de Programacao
═════════════════════════════════════════════════

Status no roadmap: PROXIMO (sprint 11 era para iniciar 3a)
Status real:       ~25% — estrutura montada, conteudo faltando

  3a — Paginas estaticas:

  [OK] /programacao — rota existe com hero e lista de trilhas
  [OK] /programacao/[slug] — pagina de trilha com topicos
  [OK] /programacao/[slug]/[lessonSlug] — pagina de aula
  [OK] 9 componentes — ProgrammingHero, TrackList, TrackCard,
       TrackDetail, LessonPage, CodeBlock, CommonMistakes,
       PracticeChallenge, InterviewQuestions
  [OK] 10 trilhas definidas — 97 topicos no total
  [OK] trilha Java Essencial — 12 aulas com conteudo REAL
  [ ] 9 trilhas restantes — topicos listados mas "Em breve"
  [ ] conteudo educacional so para 12/97 topicos

  3b — Trilhas completas:

  [ ] trilha REST, BD, DTOs, Arquitetura, Testes, Deploy
  [ ] secao de entrevista junior (60+ perguntas com filtros)
  [ ] /carreira-junior — rota inexistente

  3c — Integracao com API Java:

  [ ] provider pattern replicado do modulo financeiro
  [ ] endpoints GET /tracks, /topics, /interview-questions
  [ ] substituicao de mocks por dados reais

GAP GRAVE: conteudo educacional so existe para 1/10 trilhas
GAP: /carreira-junior nao existe
GAP: nenhuma integracao backend

═════════════════════════════════════════════════
FASE 4 — 3D leve (R3F)
═════════════════════════════════════════════════

Status no roadmap: FUTURO
Status real:       NAO INICIADO — cidade e 2.5D CSS puro

  [ ] React Three Fiber
  [ ] cena basica
  [ ] predios geometricos
  [ ] clique em objetos
  [ ] camera controlada
  [OK] fallback 2D — ja existe (cidade 2.5D CSS)

GAP: nenhum, fase ainda nao comecou

═════════════════════════════════════════════════
FASE 5 — Dados reais (financeiro)
═════════════════════════════════════════════════

Status no roadmap: FUTURO
Status real:       NAO INICIADO

  [~] provider interface — existe (MarketDataProvider)
  [OK] mock provider — funcional
  [ ] provider real (Yahoo Finance, Alpha Vantage, BrAPI)
  [ ] cache Redis / Upstash
  [ ] snapshots periodicos
  [ ] rankings

GAP: placeholder BrAPI existe mas nunca foi implementado

═════════════════════════════════════════════════
FASE 6 — Modulo de Carreira
═════════════════════════════════════════════════

Status real: NAO INICIADO

  [ ] /carreira — rota inexistente
  [ ] roadmap visual junior -> pleno -> senior
  [ ] checklist de portfolio
  [ ] guia de entrevistas
  [ ] recursos de networking

═════════════════════════════════════════════════
FASE 7 — Produto publico
═════════════════════════════════════════════════

Status real: NAO INICIADO

  [ ] deploy estavel
  [ ] pagina sobre o projeto
  [ ] SEO
  [ ] analytics
  [ ] performance
  [ ] conteudo para redes sociais

═════════════════════════════════════════════════
FASE 8 — IA educacional com API Interact
═════════════════════════════════════════════════

Status real: ~10% — API existe mas nao integrada

  [OK] endpoint API Interact — funcional
  [ ] botao de microfone nas paginas de topico
  [ ] intencao EXPLAIN_CONCEPT integrada
  [ ] intencao SIMULATE_INTERVIEW integrada
  [ ] intencao GENERATE_STUDY_PLAN integrada
  [ ] intencao REVIEW_ANSWER integrada
  [ ] painel de resposta estruturada

═════════════════════════════════════════════════
SINTESE — O QUE ESTA ATRASADO
═════════════════════════════════════════════════

O roadmap e o codigo estao DESSINCRONIZADOS. O roadmap
ainda reflete o planejamento ORIGINAL (sprint 11 como
"proxima"), mas o codigo atual ja passou por 31 sprints
e uma recuperacao.

Fase 1 esta 95% pronta — deveria estar marcada como
CONCLUIDA no roadmap.

Fase 2 esta 30% — API Interact funciona, mas endpoints
de assets e banco nao existem. Esse e o maior gap de
infraestrutura.

Fase 3 esta 25% — estrutura de paginas excelente, mas
conteudo educacional real so para 12/97 topicos. O resto
e "Em breve".

Fases 4 a 8 nao comecaram — o que e esperado, mas o
roadmap precisa refletir a ordem real de prioridade.

═════════════════════════════════════════════════
PRIORIDADES RECOMENDADAS (baseado no estado real)
═════════════════════════════════════════════════

1. CONTEUDO PROGRAMACAO — escrever aulas para as 9 trilhas
   restantes. Maior impacto com menor complexidade tecnica.
   (85 topicos com "Em breve" vs 12 com conteudo real)

2. ENDPOINTS DE ASSETS no backend — criar controllers,
   services, JPA entities para dados financeiros. Desbloqueia
   o provider pattern real.

3. GRAFICOS INTERATIVOS — adicionar recharts ou chart.js
   para candlestick/area na pagina de ativo.

4. CORRIGIR ROADMAP — atualizar docs/16_ROADMAP.md para
   refletir o estado real do codigo, nao o planejamento
   original de 31 sprints atras.

5. ESLINT — resolver incompatibilidade eslint 8/9.

═════════════════════════════════════════════════
CORRECAO (03/06/2026)
═════════════════════════════════════════════════

Este checklist foi atualizado apos correcao do usuario.
Erro: eu disse que sprints 12-24 eram "dados perdidos".
Correcao: os docs numerados (docs/28 a docs/60) documentam
cada sprint individualmente. A tabela correta esta em
docs/16_ROADMAP.md.

O verdadeiro problema e que docs/16_ROADMAP.md parou de ser
atualizado na Sprint 11 — as entregas continuaram, os docs
foram criados, mas o arquivo roadmap ficou congelado.
