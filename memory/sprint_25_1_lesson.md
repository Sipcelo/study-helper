# Sprint 25.1 — Lições aprendidas

## Desafio

Recuperar um projeto Next.js sem manifestos de build (package.json, tsconfig, etc.) e alinhar o contrato de API entre front e back que estavam divergentes.

## Erros encontrados e correções

### 1. `VisualTheme` sem `buildingType`
**Erro:** 20+ erros de typecheck porque `data/assets.ts` usava `buildingType` no VisualTheme mas o tipo no packages/types não o declarava.
**Correção:** Adicionado `buildingType: BuildingType` ao VisualTheme (tornado obrigatório pois todos os 18 assets o declaravam).
**Lição:** Auditar o código real antes de criar tipos — o código fonte é a verdade; docs/types desatualizados são secundários.

### 2. `asset-detail-panel.tsx` sem import de `Link`
**Erro:** Componente usava `<Link href={...}>` sem importar `import Link from 'next/link'`.
**Correção:** Adicionado o import no topo.
**Lição:** Sem typecheck, erros de import acumulam silenciosamente. Typecheck é a primeira validação a rodar após reconstruir estrutura.

### 3. ESLint compatibilidade
**Erro:** `eslint-config-next` instalou eslint 9, mas as opções CLI do next@14 esperam eslint 8.
**Status:** Não resolvido — documentado como pendência não-bloqueadora.
**Lição:** Pin de versão do eslint no package.json evitaria o problema. Para sprint de recuperação, typecheck é mais valioso que lint.

### 4. Front tinha actions fantasmas (SHOW_QUIZ, SEARCH)
**Erro:** `types/interact.ts` declarava `InteractActionType` com `SHOW_QUIZ` e `SEARCH` que o backend Java nunca retorna.
**Correção:** Alinhado estritamente com `ActionType.java`.
**Lição:** Nunca confiar nos tipos do front como especificação — o backend é a fonte da verdade do contrato.

## Decisões

1. **pnpm workspace** em vez de npm/turborepo: código já tinha estrutura `apps/` e `packages/` com imports `@study-helper/`. pnpm workspace é o caminho natural.
2. **Next.js 14** (não 15): código usa App Router padrão, sem dependências bleeding-edge. Next 14 é estável e compatível.
3. **Tailwind 3** (não 4): classes usadas no código (`bg-slate-950`, `border-slate-700/50`, etc.) são Tailwind 3. Tailwind 4 quebraria a estilização.
4. **`buildingType` obrigatório**: todos os 18 assets declaravam o campo — torná-lo opcional só esconderia o problema.

## Padrões identificados

- Projeto usa `@/*` para imports internos e `@study-helper/*` para packages compartilhados
- Estilo visual: dark theme com slate-800/900/950, bordas sutis, cantos arredondados
- Provider pattern: `MockMarketProvider` implementa `MarketProvider` interface

## O que funcionou bem

- Auditoria código-first: ler imports reais para determinar dependências é mais confiável que qualquer doc
- `mvn test` passou de primeira — backend estava bem preservado
- `pnpm install` + `tsc --noEmit` como dupla de validação rápida
- Testes curl antes do browser — validou contrato em < 2 min