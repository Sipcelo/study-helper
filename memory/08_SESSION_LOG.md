# 08 — Log de Sessao

## Formato

Cada sessao do agente gera um bloco aqui (ou em arquivo dedicado `sessions/YYYY-MM-DD.md` se preferir) com:

- Data e hora
- Duracao estimada
- Modulo / sprint em foco
- Comandos executados
- Arquivos criados / alterados
- Decisoes tomadas
- Pendencias para proxima sessao
- Licoes aprendidas (link para sprint_lesson se aplicavel)

## Template

```markdown
## Sessao YYYY-MM-DD HH:MM

Modulo: financeiro | programacao | carreira | cross
Sprint: N (se aplicavel)
Duracao estimada: X min

Comandos:
- `cmd 1` (resultado: OK | FALHO | BLOQUEADO)
- `cmd 2` (resultado: OK)

Arquivos:
- criado: path/A
- alterado: path/B
- deletado: path/C

Decisoes:
- ADR-XXXX aberto ou revisado
- escolha local com motivo (se houver)

Pendencias:
- [ ] item 1
- [ ] item 2

Licoes:
- memory/sprint_NN_lesson.md criado
- preferencia nova registrada em 02_PREFERENCES.md
```

## Quando criar

- Inicio de sprint (estado inicial)
- Fim de sprint (consolidado + licao)
- Decisao arquitetural relevante
- Bloco grande de trabalho (mais de 1h)

## Onde armazenar

- Bloco curto (menos de 1h): append direto neste arquivo, na secao da data
- Bloco longo: arquivo dedicado em `memory/sessions/YYYY-MM-DD-HHMM.md`

## Observacao

O `docs/24_AGENT_SESSION_LOG.md` original foi perdido na recuperacao. Este arquivo assume a funcao ate o original voltar. Quando voltar, comparar e mesclar, mantendo este como ponte.
