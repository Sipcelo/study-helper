# 40 — Trilhas de Aprendizado — Módulo Programação

Classificação: [PROGRAMACAO]

---

## Visão geral

Cada trilha é uma sequência ordenada de tópicos com explicação didática, exemplos de código e perguntas de entrevista relacionadas.

A ordem recomendada para o público principal (junior Java):

```
Fundamentos de Backend
  → Java Essencial
    → Spring Boot
      → APIs REST
        → Banco de Dados
          → DTOs e Validação
            → Arquitetura em Camadas
              → Testes
                → Deploy
                  → Entrevista Java Junior
```

---

## Trilha 1 — Fundamentos de Backend

**Objetivo**: entender o que é backend antes de escrever uma linha de código.

**Tópicos**:
1. O que é uma aplicação backend?
2. Como funciona HTTP — requisição e resposta
3. O que é uma API?
4. Cliente e servidor — quem faz o quê
5. JSON — o formato de dados da web
6. Verbos HTTP — GET, POST, PUT, DELETE
7. Status codes — 200, 201, 400, 401, 404, 500
8. O que é REST?
9. O ciclo completo de uma requisição

**Para quem**: quem nunca trabalhou com backend. Sem pré-requisito.

---

## Trilha 2 — Java Essencial

**Objetivo**: dominar a linguagem antes do framework.

**Tópicos**:
1. Por que Java? Mercado e empregabilidade
2. Tipos primitivos e wrappers
3. Strings e manipulação de texto
4. Condicionais e loops
5. Arrays e coleções (List, Map, Set)
6. Orientação a Objetos — classes e objetos
7. Herança e polimorfismo
8. Interfaces e classes abstratas
9. Exceções — try, catch, throw, finally
10. Generics
11. Streams e lambda
12. Optional

**Para quem**: iniciantes em Java. Requer lógica de programação básica.

---

## Trilha 3 — Spring Boot

**Objetivo**: criar aplicações Spring Boot do zero com confiança.

**Tópicos**:
1. O que é Spring Framework?
2. Por que Spring Boot?
3. Criando o primeiro projeto (Spring Initializr)
4. Entendendo o pom.xml / build.gradle
5. Anotações fundamentais — @SpringBootApplication, @Bean
6. Injeção de dependência — @Autowired, @Component
7. Perfis e configuração — application.properties / yaml
8. Ciclo de vida do bean
9. Spring Web — @RestController, @RequestMapping
10. Tratamento de exceções — @ControllerAdvice
11. Actuator e monitoramento

**Para quem**: quem já sabe Java Essencial.

---

## Trilha 4 — APIs REST

**Objetivo**: criar APIs RESTful profissionais.

**Tópicos**:
1. Princípios REST — recursos, representações, stateless
2. Criando endpoints com @GetMapping, @PostMapping, @PutMapping, @DeleteMapping
3. @PathVariable e @RequestParam
4. @RequestBody e serialização JSON
5. @ResponseStatus e ResponseEntity
6. Paginação e ordenação com Pageable
7. HATEOAS — opcional
8. Documentação com Springdoc / Swagger UI
9. Versionamento de API
10. Boas práticas de design de API

**Para quem**: quem já sabe Spring Boot básico.

---

## Trilha 5 — Banco de Dados

**Objetivo**: persistir dados com SQL e JPA.

**Tópicos**:
1. O que é um banco de dados relacional?
2. SQL — CREATE, INSERT, SELECT, UPDATE, DELETE
3. JOINs e relacionamentos
4. PostgreSQL — instalação e uso local
5. Spring Data JPA — o que é e por que usar
6. @Entity, @Id, @GeneratedValue
7. JpaRepository — findAll, findById, save, delete
8. @OneToMany, @ManyToOne, @ManyToMany
9. JPQL e queries customizadas
10. Migrations com Flyway ou Liquibase
11. Transações — @Transactional

**Para quem**: quem já sabe REST básico.

---

## Trilha 6 — DTOs e Validação

**Objetivo**: separar camadas e garantir dados limpos.

**Tópicos**:
1. Por que DTOs existem?
2. Request DTO vs Response DTO
3. Separando Entity de DTO
4. ModelMapper ou MapStruct
5. Bean Validation — @NotNull, @NotBlank, @Size, @Email
6. @Valid e @Validated em controllers
7. Criando validações customizadas
8. Mensagens de erro padronizadas
9. Padrão de resposta de erro da API

**Para quem**: quem já usa Spring Data JPA.

---

## Trilha 7 — Arquitetura Controller-Service-Repository

**Objetivo**: organizar código como um profissional.

**Tópicos**:
1. Por que separar em camadas?
2. A responsabilidade de cada camada
3. Controller — receber, delegar, responder
4. Service — regra de negócio e orquestração
5. Repository — acesso a dados
6. DTO entre camadas — o que passa para quem
7. Exceções de negócio vs exceções técnicas
8. Quando criar um novo Service?
9. Refatorando código procedural para em camadas
10. Code smell — Controller gordo, Service anêmico

**Para quem**: quem já usa Spring Boot + JPA.

---

## Trilha 8 — Testes

**Objetivo**: testar com confiança e qualidade.

**Tópicos**:
1. Por que testar?
2. Pirâmide de testes
3. JUnit 5 — @Test, @BeforeEach, @AfterEach
4. Assertions — assertEquals, assertTrue, assertThrows
5. Mockito — @Mock, @InjectMocks, when().thenReturn()
6. Testando Services com mocks
7. @SpringBootTest e testes de integração
8. MockMvc — testando controllers
9. @DataJpaTest — testando repositories
10. Cobertura de testes e relatórios
11. TDD — conceito e prática

**Para quem**: quem já tem aplicação funcionando com camadas.

---

## Trilha 9 — Deploy

**Objetivo**: publicar a aplicação para o mundo ver.

**Tópicos**:
1. O que é deploy?
2. Variáveis de ambiente e segredos
3. Docker — Dockerfile para Spring Boot
4. Docker Compose — app + banco local
5. Opções de cloud gratuitas — Render, Railway, Fly.io
6. Deploy no Render com PostgreSQL
7. Health checks e logs em produção
8. CI/CD básico com GitHub Actions
9. Documentando a API pública

**Para quem**: quem tem aplicação testada pronta para publicar.

---

## Trilha 10 — Entrevista Java Junior

**Objetivo**: conseguir a primeira vaga como desenvolvedor Java.

**Tópicos**:
1. O que as empresas esperam de um junior Java
2. Perguntas frequentes sobre Java OOP
3. Perguntas frequentes sobre Spring Boot
4. Perguntas frequentes sobre REST e HTTP
5. Perguntas frequentes sobre banco de dados
6. Perguntas comportamentais — como responder
7. Como apresentar o projeto (API Interact)
8. Revisão de código ao vivo — o que avaliam
9. Construindo o README do projeto
10. GitHub profile e portfolio

**Para quem**: quem concluiu as trilhas anteriores e quer uma vaga.

---

## Formato de cada tópico

Cada tópico individual deve ter:

```
Título
  ↓
Por que isso existe? (contexto real)
  ↓
Conceito simplificado (sem jargão)
  ↓
Exemplo de código (Java/Spring Boot)
  ↓
Analogia visual ou diagrama textual
  ↓
Perguntas de entrevista relacionadas
  ↓
Links para aprofundar
```

---

## Dados mockados iniciais

Para a Fase 1 (páginas estáticas), cada trilha terá:
- nome e descrição
- lista de tópicos com título e status
- tempo estimado de estudo
- nível de dificuldade (iniciante / intermediário / avançado)
- tags (java, spring, backend, entrevista, etc.)

Ver modelo de dados em: `docs/42_PROGRAMMING_DATA_MODEL.md`
