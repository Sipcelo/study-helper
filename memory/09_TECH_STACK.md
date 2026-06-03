# 09 — Stack Tecnologica

## Front-end (apps/web)

| Camada | Escolha | Motivo |
|--------|---------|--------|
| Linguagem | TypeScript | Tipagem, manutencao, contrato com back |
| Framework | Next.js | SSR, ecossistema, portfolio |
| UI base | Tailwind CSS | Produtividade, compativel com shadcn |
| Componentes | shadcn/ui | Copia-e-customiza, sem lock-in |
| 3D | React Three Fiber + Three.js + Drei | Padrao R3F no ecossistema React |
| Graficos | Recharts + Lightweight Charts | Recharts geral, Lightweight para financeiro |
| Estado | Zustand | Leve, sem boilerplate |
| Voz (browser) | Web Speech API | Sem backend, dev rapido |

## Back-end Node (legado / auxiliar)

| Camada | Escolha |
|--------|---------|
| Linguagem | Node.js + TypeScript |
| Framework | NestJS |
| ORM | Prisma |

Status: em manutencao, sem novas features. Substituir gradualmente por Java (ADR-0002).

## Back-end Java (principal novo)

| Camada | Escolha | ADR |
|--------|---------|-----|
| Linguagem | Java 21 LTS | ADR-0002 |
| Framework | Spring Boot 3.x | ADR-0002 |
| ORM | Spring Data JPA | - |
| Migrations | Flyway (TUDO — confirmar) | - |
| Servico principal | `services/study-helper-api/` | - |
| Servico final bootcamp | `services/api-interact/` (planejado) | - |

## Banco

| Item | Escolha |
|------|---------|
| Principal | PostgreSQL |
| ORM Node | Prisma |
| ORM Java | Spring Data JPA |
| Host dev | Neon (PostgreSQL serverless) |

## Cache / Fila

| Item | Escolha |
|------|---------|
| Cache | Redis / Upstash |
| Fila | nao definida |

## Infra

| Item | Escolha |
|------|---------|
| Front host | Vercel |
| CI/CD | GitHub Actions |
| Containers | Docker |
| Monorepo | pnpm workspaces |

## Estrutura do monorepo

```
study-helper/
  apps/
    web/                # Next.js
    api/                # NestJS (legado)
  packages/
    db/                 # prisma client
    types/              # tipos compartilhados TS
    config/             # config compartilhada
  services/
    study-helper-api/   # Java Spring Boot
    api-interact/       # Java Spring Boot (planejado)
  docs/                 # documentacao do projeto
  memory/               # cerebro do agente pessoal
```

## Pendencias

- Confirmar versao exata do Java no `pom.xml` (TUDO)
- Confirmar uso de Lombok (TUDO)
- Confirmar uso de Flyway vs Liquibase (TUDO)
- Definir host de producao do servico Java (nao sera Vercel)
- Definir provedor de STT real (alem do Web Speech API) para a API Interact

Fontes: `docs/16_ROADMAP.md`, `README.md`, ADR-0001, ADR-0002
