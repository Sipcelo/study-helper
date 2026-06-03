# 03 — Estilo de Prompts

## Estrutura preferida

1. Contexto: quem esta pedindo, em qual projeto
2. Objetivo: o que precisa ser alcancado
3. Restricoes: o que nao pode ser quebrado
4. Entregavel: o que conta como pronto
5. (opcional) Memoria: arquivos que devem ser lidos antes

## Caracteristicas

- Numerar tarefas quando multipla
- Listar arquivos esperados quando gera codigo
- Listar chaves, endpoints, valores quando integra
- Sempre explicitar o que NAO fazer
- Sempre explicitar o que conta como memoria da sprint

## Template base (estilo Sipcelo)

Voce esta trabalhando no projeto Study Helper. Stack: Next.js + TypeScript no front, Java Spring Boot no back.

Objetivo: [verbo] + [oque] + [onde].

Restricoes:
- nao alterar [arquivo/modulo]
- manter compatibilidade com [stack/convencao]
- nao criar [tipo de coisa] sem aprovacao

Entregaveis:
- arquivo A em path/X
- arquivo B em path/Y
- doc de sprint em docs/sprint_NN.md

Memoria esperada: docs/sprint_NN.md

Apos a sprint: criar memory/sprint_NN_lesson.md com desafio, erros, decisoes e aprendizados.

## Anti-patterns

- Prompt vago sem contexto
- Pedido sem entregavel explicito
- Multiplos objetivos em um prompt (dividir)
- Pedido sem restricao (agente inventa direcao)
- Sem clausula de "memoria esperada"

## Exemplos observados

- `docs/Rascunho_sprints.md` mostra o padrao completo de prompt usado nas sprints 25-31
- `docs/15_AGENT_PROMPTS.md` (AUSENTE na recuperacao) era o catalogo formal — recriar quando prioridade exigir
