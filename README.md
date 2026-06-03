# Study Helper

Plataforma web de estudos modular para programacao, carreira e financas. A primeira vertical e o modulo financeiro, construido como uma cidade visual 2D/2.5D (3D planejado). O eixo de aprendizado atual e o Bootcamp AI Java Backend, e os servicos novos de backend sao escritos em Java Spring Boot.

Criador: Sipcelo. Repositorio: github.com/Sipcelo/study-helper.

---

## Modulos

- **financeiro** — moedas, acoes, indices, indicadores visualizados como cidade. MVP concluido (sprints 1-8). Em manutencao.
- **programacao** — trilhas, topicos, perguntas, carreira junior. Proxima vertical (a partir da sprint 11).
- **carreira** — roadmap junior → pleno, portfolio, entrevistas. Planejado para fase 6.

Toda feature deve ser classificada por modulo antes de executar (regra do agente em `CLAUDE.md`).

---

## Stack

| Camada | Escolha | Status |
|--------|---------|--------|
| Linguagem base | TypeScript | ativo |
| Front | Next.js + React | ativo (`apps/web/`) |
| UI | Tailwind CSS + shadcn/ui | ativo |
| 3D | React Three Fiber + Three.js + Drei | planejado (fase 4) |
| Graficos | Recharts + Lightweight Charts | ativo |
| Estado | Zustand | ativo |
| Back principal | Java 21 + Spring Boot 3 | ativo (`services/study-helper-api/`) |
| Back legado | Node.js + NestJS | em manutencao, sem novas features |
| Banco | PostgreSQL (Neon em dev) | ativo |
| ORM | Prisma (Node) / Spring Data JPA (Java) | ativo |
| Cache | Redis / Upstash | ativo |
| Voz (browser) | Web Speech API | ativo (Sprint 25) |
| Containers | Docker | ativo |
| CI/CD | GitHub Actions | ativo |
| Monorepo | pnpm workspaces | ativo |
| Front host | Vercel | ativo |

Decisoes formais: `docs/23_DECISION_LOG.md`.

---

## Estrutura do repositorio

```
study-helper/
  apps/
    web/                # Next.js + TypeScript (front principal)
  packages/
    db/                 # prisma client
    types/              # tipos compartilhados TS
    config/             # config compartilhada
  services/
    study-helper-api/   # Java Spring Boot (back principal)
  docs/                 # documentacao do projeto
  memory/               # cerebro do agente pessoal (ver secao abaixo)
  CLAUDE.md             # regras de operacao do agente
  README.md             # este arquivo
```

---

## Estado atual

- Codigo reconstruido a partir de transcripts do Claude Code (commit unico de recuperacao).
- Documentacao parcial: docs 03-15, 17-22, 24-27 estao ausentes e precisam ser recriados quando prioridade exigir.
- Sprints 1-8 (modulo financeiro) concluidas no escopo antigo.
- Sprints 25-31 estao documentadas apenas em `docs/Rascunho_sprints.md` (draft) e precisam de auditoria antes de qualquer implementacao.
- Proxima sprint planejada: sprint 11 (modulo programacao, paginas estaticas de `/programacao`).

Roadmap completo: `docs/16_ROADMAP.md`.

---

## Cerebro do agente (memory/)

O diretorio `memory/` e o cerebro em nuvem do projeto. Documenta preferencias, regras, decisoes, padroes e licoes aprendidas para treinar o agente pessoal de Sipcelo.

Conteudo atual:

- `00_INDEX.md` — indice do cerebro
- `01_PROFILE.md` — quem e Sipcelo e como trabalha
- `02_PREFERENCES.md` — idioma, formato, tom, atalhos
- `03_PROMPTS_STYLE.md` — como prompts sao escritos
- `04_SECURITY_AUDIT.md` — checklist de seguranca
- `05_CODING_STYLE.md` — convencoes TS e Java
- `06_AGENT_RULES.md` — regras obrigatorias do agente
- `07_DECISION_PATTERN.md` — modelo de ADR
- `08_SESSION_LOG.md` — modelo de log de sessao
- `09_TECH_STACK.md` — stack detalhado
- `10_GLOSSARY.md` — termos, acoes, chaves
- `11_SPRINT_LESSONS.md` — template e registro de licoes

A cada conclusao de sprint, criar `memory/sprint_NN_lesson.md` (template em `11_SPRINT_LESSONS.md`) com o que foi feito, desafio, erros, decisoes e aprendizados.

---

## Ordem de leitura

Para humanos entrando no projeto:

1. `CLAUDE.md` — regras do agente
2. `memory/00_INDEX.md` — indice do cerebro
3. `memory/01_PROFILE.md` — perfil do criador
4. `memory/09_TECH_STACK.md` — stack
5. `memory/10_GLOSSARY.md` — termos
6. `docs/02_CREATOR_CONTEXT.md` — contexto do criador
7. `docs/16_ROADMAP.md` — roadmap
8. `docs/23_DECISION_LOG.md` — decisoes formais
9. `docs/01_PRODUCT_VISION.md` — visao de produto
10. `docs/36_STUDY_PLATFORM_DIRECTION.md` — direcao da plataforma
11. `docs/Rascunho_sprints.md` — drafts das sprints 25-31 (auditar)

Para agentes:

1. `CLAUDE.md`
2. `memory/00_INDEX.md`
3. `memory/01_PROFILE.md`
4. `memory/02_PREFERENCES.md`
5. `memory/06_AGENT_RULES.md`
6. `docs/16_ROADMAP.md`
7. Licao de sprint mais recente

---

## Como retomar o projeto

```bash
# Estado do repo
cd study-helper
git status
git log --oneline -10

# Ver cerebro do agente
ls memory/

# Ver docs existentes
ls docs/

# Auditar sprints 25-31
cat docs/Rascunho_sprints.md
```

Auditoria das sprints 25-31 (drafts em `docs/Rascunho_sprints.md`):

- Verificar arquivos esperados em `apps/web/src/` e `services/study-helper-api/src/`
- Verificar arquivos de memoria em `docs/sprint25.md` a `docs/sprint31.md` (criar os que faltam)
- Comparar local com `origin/main` (possivel divergencia)
- Criar `docs/recovery-audit-sprints25-31.md` com diagnostico
- Criar `docs/sprints25-31-mindmap.md` com mapa mental

Antes de implementar a proxima sprint real:

1. Confirmar se a memoria esperada da sprint ja existe.
2. Classificar a feature por modulo.
3. Apresentar plano curto antes de alterar arquivos.
4. Apos conclusao, criar `docs/sprint_NN.md` e `memory/sprint_NN_lesson.md`.

---

## Comandos uteis

```bash
# Front
cd apps/web
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck
pnpm lint

# Back Java
cd services/study-helper-api
./mvnw spring-boot:run    # ou mvn spring-boot:run
./mvnw test

# Auditoria
npm audit
mvn dependency-check:check
gitleaks detect
```

Origem dos dados: `docs/` (parcial) + `memory/` (cerebro) + `CLAUDE.md` (regras do agente).
