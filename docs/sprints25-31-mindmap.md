# Mapa Mental - Sprints 25 a 31

## Visao macro

O objetivo das sprints 25-31 era evoluir o Interact (voz, actions UX, historico) e integra-lo ao Study Planner (contexto, preview melhorado, save/continue, progresso).

Estado atual apos revalidacoes de 2026-06-05:

- Sprint 25: CONCLUIDA - revalidada contra codigo.
- Sprint 26: CONCLUIDA - revalidada e ajustada contra codigo.
- Sprint 27: CONCLUIDA - implementada e validada manualmente.
- Sprint 28: CONCLUIDA - implementada e validada manualmente.
- Sprint 29: CONCLUIDA - codigo revalidado, origem Interact adicionada, typecheck passou, QA manual executado via dev server.
- Sprint 30: CONCLUIDA - save/continue revalidado, sobrescrita protegida por confirmacao, QA manual executado.
- Sprint 31: HISTORICO - nao verificada contra codigo atual.

## Mapa

```text
Study Helper
|-- Interact
|   |-- Sprint 25 - Voz                 [CONCLUIDA]
|   |-- Sprint 26 - Actions UX           [CONCLUIDA]
|   `-- Sprint 27 - History              [CONCLUIDA]
|
`-- Study Planner
    |-- Sprint 28 - Interact -> Planner  [CONCLUIDA]
    |-- Sprint 29 - Preview UX           [CONCLUIDA]
    |-- Sprint 30 - Save/Continue UX     [CONCLUIDA]
    `-- Sprint 31 - Progress UX          [HISTORICO]
```

## Dependencias entre sprints

- Sprint 26 depende da Sprint 25.
- Sprint 27 depende das Sprints 25 e 26.
- Sprint 28 depende das Sprints 26 e 27.
- Sprint 29 depende da Sprint 28.
- Sprint 30 depende da Sprint 29.
- Sprint 31 depende da Sprint 30.

## Estado real por sprint

| Sprint | Objetivo | Status apos revalidacao |
|--------|----------|--------------------------|
| 25 | Voz no Interact (Web Speech API, sem audio endpoint) | CONCLUIDA - hook criado, painel com microfone, auto-submit, CORS OK |
| 26 | Renderizar actions como botoes/links | CONCLUIDA - 5 actions alinhadas ao backend, fallback seguro |
| 27 | Historico local em localStorage | CONCLUIDA - validada manualmente no browser |
| 28 | Contexto Interact -> Planner | CONCLUIDA - contexto salvo via sessionStorage e consumido no planner |
| 29 | Preview rico do Study Planner | CONCLUIDA - codigo/typecheck OK, badge origem Interact validado, QA manual completo |
| 30 | Save/clear/get de plano gerado | CONCLUIDA - plano salvo em localStorage, estado vazio, confirmacao de sobrescrita, banner salvo e link continuar progresso validados |
| 31 | Progresso por plan.id com percentuais | HISTORICO - nao verificado contra codigo atual |

## Riscos atuais

- `pnpm build` segue com risco de travar/falhar no Windows por lock/permissao em `.next/trace`.
- O script `pnpm dev -- -p 8888` conflita com `next dev -p 3000` fixo no `package.json`; para QA foi usado `pnpm exec next dev -p 8888`.
- Sprint 31 continua como historico nao verificado contra codigo atual.

## Referencias

- `docs/sprint25.md` - fonte oficial Sprint 25.
- `docs/sprint26.md` - fonte oficial Sprint 26.
- `docs/sprint27.md` - fonte oficial Sprint 27.
- `docs/sprint28.md` - fonte oficial Sprint 28.
- `docs/sprint29.md` - fonte oficial Sprint 29.
- `docs/sprint30.md` - fonte oficial Sprint 30.
- `docs/sprint31.md` - historico/reconstruido, nao verificado.
- `docs/recovery-audit-sprints25-31.md` - auditoria atualizada.
- `docs/Rascunho_sprints.md` - draft original.
