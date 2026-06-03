# 39 — Plano do Módulo de Programação

Classificação: [PROGRAMACAO] [CARREIRA]

---

## Objetivo do módulo

Criar a segunda vertical do Study Helper: um ambiente visual e guiado para estudar programação backend, evoluir a carreira junior e se preparar para entrevistas técnicas.

O módulo de programação é o **núcleo real do produto** — o módulo financeiro validou o conceito visual, e agora o foco volta para o público principal: estudantes e juniors de tecnologia.

---

## Público-alvo

| Perfil | Situação | O que busca |
|--------|----------|-------------|
| Estudante iniciante | Nunca programou profissionalmente | Por onde começar, trilha clara |
| Junior em busca de vaga | 0 a 2 anos de experiência | Preparação para entrevista, portfolio |
| Dev em transição | Vem de outra linguagem | Aprender Java/Spring Boot com contexto |
| Bootcamp student | Cursando bootcamp de backend | Complemento visual ao que está aprendendo |

---

## Problemas que resolve

1. **Fragmentação de conteúdo**: o estudante precisa de 5 plataformas para aprender backend — aqui tudo fica conectado.
2. **Falta de trilha clara**: não sabe o que aprender antes do quê — o módulo define a ordem.
3. **Ausência de contexto real**: aprende conceitos sem entender onde se aplicam — aqui cada tópico tem caso de uso.
4. **Preparação fraca para entrevistas**: não sabe o que vão perguntar — o módulo tem seção dedicada de entrevista junior.
5. **Portfolio vazio**: aprende mas não tem como mostrar — o módulo guia o que construir.

---

## Trilhas iniciais

Ver detalhes completos em: `docs/40_PROGRAMMING_LEARNING_PATHS.md`

| Trilha | Foco | Alinhamento |
|--------|------|-------------|
| Fundamentos de Backend | HTTP, APIs, cliente-servidor | Universal |
| Java Essencial | Sintaxe, OOP, coleções | Bootcamp AI Java Backend |
| Spring Boot | Framework, autoconfiguração, beans | Bootcamp AI Java Backend |
| APIs REST | Endpoints, verbos, status codes | Bootcamp + mercado |
| Banco de Dados | SQL, PostgreSQL, modelagem | Mercado junior |
| DTOs e Validação | Padrões de camada, Bean Validation | Bootcamp AI Java Backend |
| Controller-Service-Repository | Arquitetura em camadas | Bootcamp AI Java Backend |
| Testes | JUnit, Mockito, pirâmide de testes | Mercado |
| Deploy | Docker, Vercel, Render, Railway | Portfolio |
| Entrevista Java Junior | Perguntas frequentes, respostas modelo | Vaga emprego |

---

## Estrutura de páginas

Ver wireframe em: `docs/41_PROGRAMMING_AREA_WIREFRAME.md`

```
/programacao                  ← hub visual do módulo
/programacao/java             ← trilha Java
/programacao/spring-boot      ← trilha Spring Boot
/programacao/rest-api         ← trilha REST
/programacao/carreira-junior  ← guia de carreira
/programacao/entrevista       ← banco de perguntas de entrevista
/programacao/[trilha]/[topico] ← página de tópico individual
```

---

## Metáfora visual

O módulo financeiro usou a metáfora da **cidade financeira**.

O módulo de programação pode usar uma das seguintes metáforas:

| Opção | Conceito | Prós |
|-------|----------|------|
| Mapa de trilhas | Cada tecnologia é um caminho num mapa | Claro, familiar (roadmap.sh), navegável |
| Academia de Backend | Cada módulo é uma sala de treino | Gamificado, progressivo |
| Cidade do Conhecimento | Extensão da cidade financeira | Consistência visual com o resto do produto |
| Laboratório | Ambiente técnico, visual de código | Alinhado com dev culture |

**Decisão inicial**: usar **mapa de trilhas** como metáfora — familiar, navegável e consistente com o conceito de roadmap que o público já conhece. Pode evoluir para cidade do conhecimento quando o produto estiver mais maduro.

---

## Relação com o Bootcamp AI Java Backend

O módulo de programação é a aplicação prática do bootcamp no produto.

| Conteúdo do bootcamp | Equivalente no módulo |
|---------------------|----------------------|
| Aulas de Java | Trilha Java Essencial |
| Spring Boot | Trilha Spring Boot |
| DTOs, Controllers | Trilha Arquitetura em Camadas |
| APIs REST | Trilha REST |
| PostgreSQL + JPA | Trilha Banco de Dados |
| Projeto final | API Interact Speech to Text |

O estudante que usa o Study Helper durante o bootcamp tem um mapa visual do que está aprendendo.

---

## Relação com API Interact

A API Interact (`docs/38_API_INTERACT_SPEECH_TO_TEXT.md`) se integrará ao módulo de programação no futuro:

| Intenção | Uso no módulo de programação |
|----------|------------------------------|
| `EXPLAIN_CONCEPT` | Explicar Controller, DTO, Repository por voz |
| `SIMULATE_INTERVIEW` | Simular pergunta de entrevista Java |
| `GENERATE_STUDY_PLAN` | Criar plano personalizado de trilha |
| `REVIEW_ANSWER` | Avaliar resposta de entrevista do usuário |
| `COMPARE_CONCEPTS` | "Qual a diferença entre @Service e @Component?" |

A integração com voz não é prioridade agora, mas a arquitetura do módulo deve deixar espaço para ela.

---

## Princípios de design do módulo

1. **Trilha antes de tópico**: o usuário vê o caminho completo antes de entrar em qualquer assunto.
2. **Contexto antes de código**: cada tópico começa com "por que isso existe?" antes de mostrar sintaxe.
3. **Exemplo real antes de abstrato**: Java com Spring Boot, não pseudocódigo genérico.
4. **Entrevista como destino**: o usuário sempre sabe que está aprendendo para conseguir uma vaga.
5. **Portfolio como subproduto**: completar trilhas gera evidência pública de aprendizado.
