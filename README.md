# Study Helper

**Study Helper** e uma plataforma web interativa para estudar mercado financeiro usando uma metafora visual de cidade/ecossistema.

O projeto deve transformar moedas, acoes, indices, empresas, paises, instituicoes e indicadores economicos em uma experiencia navegavel, didatica e visual. A prioridade e construir um produto que sirva como:

1. plataforma de estudo;
2. portfolio tecnico forte;
3. base para conteudo, guias, videos e produto futuro;
4. ambiente controlado para testar agente autonomo de desenvolvimento.

Data-base desta documentacao: **2026-05-21**.

---

## Objetivo principal

Criar uma aplicacao web onde o usuario explora uma cidade financeira:

- moedas aparecem como instituicoes, predios ou zonas ligadas ao pais;
- acoes aparecem como sedes, fabricas, torres ou modelos relacionados a empresas;
- variacoes de mercado alteram cor, luz, animacao e estado visual;
- cada ativo tem painel de explicacao, grafico e dados principais;
- o usuario aprende enquanto explora.

---

## Stack definida

| Camada | Decisao |
|---|---|
| Linguagem base | TypeScript |
| Front-end | Next.js + React |
| UI/design | Tailwind CSS + shadcn/ui |
| 3D | React Three Fiber + Three.js + Drei |
| Graficos | Recharts + Lightweight Charts |
| Estado | Zustand |
| Back-end | Node.js + NestJS |
| API | REST inicialmente |
| Banco principal | PostgreSQL |
| ORM | Prisma |
| Cache | Redis / Upstash |
| Infra inicial | Vercel + Neon + Upstash |
| Containers | Docker |
| CI/CD | GitHub Actions |
| Monorepo | pnpm workspaces |

---

## Estrutura esperada

```txt
study-helper/
  apps/
    web/
    api/
  packages/
    db/
    types/
    config/
  docs/
  templates/
  scripts/
  CLAUDE.md
  README.md
  docker-compose.yml
  pnpm-workspace.yaml
```

---

## Ordem recomendada de leitura

1. `docs/00_INDEX.md`
2. `docs/01_PRODUCT_VISION.md`
3. `docs/03_MVP_SCOPE.md`
4. `docs/04_TECH_STACK_DECISION.md`
5. `docs/05_ARCHITECTURE.md`
6. `docs/14_AGENT_RULES.md`
7. `docs/17_TASKS_BACKLOG.md`
8. `docs/99_AGENT_START_PROMPT.md`

---

## Regra de ouro

Nao comecar pelo 3D completo.

A ordem correta e:

1. documentacao e setup;
2. MVP 2D/2.5D com dados mockados;
3. banco e API;
4. 3D leve;
5. dados reais com cache;
6. conteudo educacional;
7. produto publico.

---

## Uso com agente

Este projeto foi documentado para ser trabalhado com agente autonomo ou semi-autonomo. O agente deve sempre:

- ler `CLAUDE.md`;
- respeitar `docs/14_AGENT_RULES.md`;
- trabalhar em sprints pequenas;
- mostrar plano curto antes de alterar arquivos;
- rodar validacoes;
- registrar o que mudou;
- nunca trocar arquitetura sem aprovacao.


## Como iniciar com o agente

1. Copie este pacote para a pasta `study-helper`.
2. Abra o Claude Code ou agente equivalente na raiz do projeto.
3. Cole o conteúdo de `docs/99_AGENT_START_PROMPT.md`.
4. O agente deve executar a Sprint 0: monorepo, app web, mocks e primeira homepage.
5. Se ele parar apenas no plano, envie: `Plano aprovado. Execute a Sprint 0 agora.`