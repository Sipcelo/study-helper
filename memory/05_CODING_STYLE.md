# 05 — Estilo de Codigo

## TypeScript (Next.js)

- Strict mode ativado
- Sem `any` explicito (preferir `unknown` + narrow)
- Types compartilhados em `packages/types/`
- Componentes funcionais com hooks
- Pasta por dominio, nao por tipo (`components/interact/`, nao `components/buttons/`)
- Server components por default, `"use client"` so quando necessario
- Tailwind para estilo, shadcn/ui para primitivos
- Zustand para estado global, `useState` para local
- Path alias `@/` para imports em `apps/web/src/`

## Java (Spring Boot)

- Java 21 LTS (verificar versao no `pom.xml`)
- Spring Boot 3.x
- Pacote base por servico:
  - `com.studyhelper.api` para `services/study-helper-api/`
  - `com.studyhelper.interact` para `services/api-interact/`
- Records para DTOs
- Lombok (provavelmente sim, comum no bootcamp — TUDO)
- JPA com repositories, nao DAO manual
- Migrations com Flyway (TUDO)
- Testes: JUnit 5 + Mockito + Testcontainers para integracao

## Provider Pattern (front)

```ts
interface AssetProvider {
  getAsset(id: string): Promise<Asset>;
  listAssets(): Promise<Asset[]>;
}

class MockAssetProvider implements AssetProvider { ... }
class ApiAssetProvider implements AssetProvider { ... }
```

Trocar de mock para real sem alterar UI.

## Convencoes gerais

- Arquivos: kebab-case (`interact-panel.tsx`)
- Componentes: PascalCase (`InteractPanel`)
- Variaveis/funcoes: camelCase
- Constantes: UPPER_SNAKE_CASE
- Imports absolutos via path alias
- Commits em PT-BR, prefixo semantico:
  - `feat:` nova feature
  - `fix:` correcao de bug
  - `refactor:` mudanca interna sem comportamento
  - `docs:` so documentacao
  - `chore:` manutencao (deps, config)
- Cada sprint = branch dedicada (ou serie de commits na main se escopo pequeno)

## Estrutura de pastas

```
apps/web/src/
  app/             # rotas Next.js
  components/      # por dominio (interact, study-planner, study-plan, asset)
  hooks/           # custom hooks
  lib/             # utils, providers, storage
  types/           # re-export de packages/types
  store/           # zustand stores (se necessario)

services/study-helper-api/src/main/java/com/studyhelper/api/
  config/          # Spring config, CORS, security
  controller/      # endpoints REST
  service/         # regras de negocio
  repository/      # JPA
  domain/          # entidades
  dto/             # records de entrada/saida
```

Fontes esperadas (AUSENTES na recuperacao): `docs/09_FRONTEND_GUIDE.md`, `docs/12_BACKEND_GUIDE.md`, `docs/10_DESIGN_SYSTEM.md`.
