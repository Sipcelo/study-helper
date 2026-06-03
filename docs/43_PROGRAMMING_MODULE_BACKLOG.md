# 43 — Backlog do Módulo de Programação

Classificação: [PROGRAMACAO] [CARREIRA]

---

## Fase 1 — Páginas estáticas com conteúdo mockado

**Objetivo**: existir. Ter a URL `/programacao` funcionando com estrutura visual clara.

**Critério de aceite**: usuário consegue acessar `/programacao`, ver as trilhas e clicar em uma delas.

### Tarefas

| ID | Tarefa | Arquivos | Estimativa |
|----|--------|----------|------------|
| P1-01 | Criar `apps/web/src/data/programming-tracks.ts` com MOCK_TRACKS (10 trilhas) | `data/` | P |
| P1-02 | Criar `apps/web/src/data/interview-questions.ts` com 20 perguntas mock | `data/` | P |
| P1-03 | Criar página `/programacao` — hub visual com grid de trilhas | `app/programacao/` | M |
| P1-04 | Criar componente `TrackCard` — card de trilha com nível, estimativa e tag | `components/programming/` | P |
| P1-05 | Criar componente `TrackProgressBar` — barra de progresso visual | `components/programming/` | P |
| P1-06 | Criar página `/programacao/[trilha]` — página da trilha com lista de tópicos | `app/programacao/[track]/` | M |
| P1-07 | Adicionar link "Programação" no header principal | `components/layout/` | P |
| P1-08 | Adicionar seção de programação na homepage | `app/page.tsx` | P |
| P1-09 | SEO: metadata para /programacao e /programacao/[trilha] | `app/programacao/` | P |

Estimativa: P = pequena (~1h), M = média (~2-3h), G = grande (~4h+)

---

## Fase 2 — Trilhas e tópicos

**Objetivo**: cada trilha tem conteúdo real navegável. O usuário consegue ler tópicos em sequência.

**Critério de aceite**: usuário entra em `/programacao/java/excecoes` e vê explicação, conceito e exemplo de código.

### Tarefas

| ID | Tarefa | Arquivos | Estimativa |
|----|--------|----------|------------|
| P2-01 | Criar `apps/web/src/data/programming-topics.ts` com tópicos das trilhas Java e Spring | `data/` | G |
| P2-02 | Criar página `/programacao/[trilha]/[topico]` — página de tópico individual | `app/programacao/[track]/[topic]/` | M |
| P2-03 | Componente `TopicContent` — explicação + conceito + analogia | `components/programming/` | M |
| P2-04 | Componente `TopicNavigation` — botões anterior/próximo dentro da trilha | `components/programming/` | P |
| P2-05 | Componente `TopicSidebar` — sumário da trilha com progresso | `components/programming/` | M |
| P2-06 | Conteúdo real: trilha Java Essencial (12 tópicos completos) | `data/` | G |
| P2-07 | Conteúdo real: trilha Spring Boot (11 tópicos completos) | `data/` | G |
| P2-08 | Breadcrumb de navegação: Programação > Java > Exceções | `components/programming/` | P |

---

## Fase 3 — Exemplos de código

**Objetivo**: cada tópico tem exemplos de código Java com syntax highlight.

**Critério de aceite**: o usuário vê código Java formatado e legível dentro do tópico.

### Tarefas

| ID | Tarefa | Arquivos | Estimativa |
|----|--------|----------|------------|
| P3-01 | Adicionar biblioteca de syntax highlight (ex: Prism.js ou Shiki) | `package.json` | P |
| P3-02 | Componente `CodeBlock` — código com highlight, linguagem e botão copiar | `components/ui/` | M |
| P3-03 | Criar `data/code-examples.ts` com exemplos por tópico | `data/` | G |
| P3-04 | Integrar `CodeBlock` nas páginas de tópico | `app/programacao/` | P |
| P3-05 | Exemplos de código: Java Essencial (pelo menos 3 por tópico) | `data/` | G |
| P3-06 | Exemplos de código: Spring Boot (pelo menos 3 por tópico) | `data/` | G |

---

## Fase 4 — Perguntas de entrevista

**Objetivo**: banco de perguntas de entrevista Java junior navegável e pesquisável.

**Critério de aceite**: usuário em `/programacao/entrevista` vê perguntas, filtra por tema e expande respostas.

### Tarefas

| ID | Tarefa | Arquivos | Estimativa |
|----|--------|----------|------------|
| P4-01 | Expandir `interview-questions.ts` para 60+ perguntas | `data/` | G |
| P4-02 | Criar página `/programacao/entrevista` | `app/programacao/entrevista/` | M |
| P4-03 | Componente `QuestionCard` — pergunta expansível com resposta e dificuldade | `components/programming/` | M |
| P4-04 | Filtros de entrevista por tema (Java, Spring, SQL, REST, Comportamental) | `components/programming/` | M |
| P4-05 | Busca dentro das perguntas (client-side, sem servidor) | `components/programming/` | P |
| P4-06 | Criar página `/programacao/carreira-junior` | `app/programacao/carreira-junior/` | M |
| P4-07 | Checklist de portfolio (componente interativo com localStorage) | `components/programming/` | M |
| P4-08 | Roadmap visual Junior → Pleno → Senior | `components/programming/` | G |

---

## Fase 5 — Integração com API Java

**Objetivo**: substituir dados mockados por API real Java Spring Boot.

**Pré-requisito**: Fase 2 do roadmap (backend Java) estar implementada.

**Critério de aceite**: trilhas e tópicos carregam da API, não do arquivo estático.

### Tarefas

| ID | Tarefa | Arquivos | Estimativa |
|----|--------|----------|------------|
| P5-01 | Criar `ProgrammingProvider` interface (similar ao MarketProvider) | `lib/programming/` | P |
| P5-02 | Criar `MockProgrammingProvider` (usa dados estáticos) | `lib/programming/` | P |
| P5-03 | Criar `JavaApiProgrammingProvider` (consome API Java) | `lib/programming/` | M |
| P5-04 | Implementar endpoints Java: GET /tracks, GET /tracks/:id/topics | `services/study-helper-api/` | G |
| P5-05 | Implementar endpoints Java: GET /interview-questions | `services/study-helper-api/` | M |
| P5-06 | Migrar páginas de programação para usar o provider | `app/programacao/` | M |

---

## Fase 6 — Interação por voz (API Interact)

**Objetivo**: integrar API Interact para explicar conceitos e simular entrevista por voz.

**Pré-requisito**: API Interact (Sprint 38) implementada com pelo menos 3 intençoes.

**Critério de aceite**: usuário fala "O que é um DTO?" e recebe resposta em áudio ou texto.

### Tarefas

| ID | Tarefa | Arquivos | Estimativa |
|----|--------|----------|------------|
| P6-01 | Componente `VoiceButton` — botão de microfone com estados (idle, listening, processing) | `components/ui/` | M |
| P6-02 | Hook `useVoiceInteract` — grava áudio e envia para API Interact | `hooks/` | G |
| P6-03 | Componente `InteractResponsePanel` — exibe resposta estruturada da API | `components/programming/` | M |
| P6-04 | Integrar voz nas páginas de tópico (explicar conceito por voz) | `app/programacao/` | M |
| P6-05 | Integrar voz na página de entrevista (simular por voz) | `app/programacao/entrevista/` | M |
| P6-06 | Feedback de progresso: "Você explicou corretamente!" | `components/programming/` | G |

---

## Critérios de aceite globais do módulo

Antes de considerar o módulo de programação "completo" para MVP:

- [ ] `/programacao` carrega em menos de 2s
- [ ] Pelo menos 2 trilhas com conteúdo real (Java + Spring Boot)
- [ ] Pelo menos 30 perguntas de entrevista
- [ ] Mobile responsivo (testado em 375px)
- [ ] SEO: metadata em todas as páginas do módulo
- [ ] Link no header e na homepage
- [ ] Não quebrou nenhuma feature do módulo financeiro

---

## O que NÃO entra no MVP do módulo

- Autenticação e progresso persistido (requer banco + auth)
- Certificados de conclusão
- Comentários ou fórum
- Sistema de quiz interativo com pontuação
- Vídeos embutidos
- Interação por voz (é Fase 6, pós API Interact)
- Trilhas completas de TypeScript, SQL, Deploy (Fase 2 e 3)
