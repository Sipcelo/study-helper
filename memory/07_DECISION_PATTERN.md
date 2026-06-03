# 07 — Padrao de Decisao (ADR)

## Quando abrir

- Mudanca de stack
- Mudanca de banco
- Mudanca de provider de dados
- Nova dependencia pesada
- Escolha entre alternativas com trade-off real
- Reversao ou correcao de decisao anterior

## Nao precisa de ADR

- Correcao de bug
- Refatoracao interna sem mudanca de comportamento
- Adicionar dep pequena e comum
- Ajustar config de baixo risco
- Cosméticos

## Template

```markdown
## ADR-XXXX — Titulo curto

Data: YYYY-MM-DD

Contexto:
- Qual problema / situacao motivou
- Restricoes relevantes

Opcoes consideradas:
- Opcao 1 — resumo
- Opcao 2 — resumo
- Opcao 3 — resumo (se houver)

Decisao:
- O que foi decidido, em uma frase

Motivos:
- Por que esta opcao venceu
- Criterio de desempate usado

Consequencias:
- O que muda a partir de agora
- O que fica mais facil
- O que fica mais dificil ou arriscado

Revisar em:
- Quando rever (evento, data ou marco)
```

## Registros existentes

| ADR | Titulo | Data | Status |
|-----|--------|------|--------|
| 0001 | Stack principal | 2026-05-21 | Ativo |
| 0002 | Backend Java Spring Boot | 2026-05-26 | Ativo |
| 0003 | Plataforma de estudos, nao so financas | 2026-05-26 | Ativo |
| 0004 | Sprint 9 reposicionamento | 2026-05-26 | Ativo |
| 0005 | Priorizar modulo programacao | 2026-05-26 | Ativo |

Registro formal: `docs/23_DECISION_LOG.md`

## Numeracao

- Sequencial, com zero a esquerda (0001, 0002, ...)
- Nao reusar numero
- Numeros nao podem ser apagados quando o ADR vira obsoleto — marcar como Superseded e indicar substituto
