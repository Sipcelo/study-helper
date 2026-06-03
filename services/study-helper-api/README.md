# study-helper-api

Java Spring Boot backend do Study Helper. Primeiro serviço Java da plataforma — responsável pela API Interact (classificação de intenção educacional).

## Stack

- Java 17+
- Spring Boot 3.3.4
- Maven 3.x
- Porta padrão: `8080`

## Pré-requisitos

- [JDK 17+](https://adoptium.net/) instalado e no PATH
- [Maven 3.9+](https://maven.apache.org/download.cgi) instalado e no PATH

Verificar instalação:
```bash
java -version
mvn -version
```

## Rodar localmente

```bash
cd services/study-helper-api
mvn spring-boot:run
```

Servidor disponível em: `http://localhost:8080`

## Endpoints disponíveis

### Health

```
GET /api/health
```

Resposta:
```json
{
  "status": "UP",
  "service": "study-helper-api",
  "version": "0.0.1"
}
```

### Info

```
GET /api/info
```

Resposta:
```json
{
  "name": "Study Helper API",
  "description": "Backend do Study Helper — serviço Java Spring Boot de interação educacional",
  "version": "0.0.1",
  "endpoints": [
    "GET  /api/health",
    "GET  /api/info",
    "POST /api/interact/text"
  ]
}
```

### Interact — Texto

```
POST /api/interact/text
Content-Type: application/json

{
  "input": "me explica o que é REST",
  "domain": "programming"
}
```

Resposta:
```json
{
  "transcript": "me explica o que é REST",
  "intent": "EXPLAIN_CONCEPT",
  "domain": "programming",
  "answer": "REST (Representational State Transfer) é um estilo de arquitetura...",
  "action": {
    "type": "OPEN_RESOURCE",
    "target": "/programacao/me-explica-o-que-e-rest"
  }
}
```

**Intenções classificadas:**

| Intent | Palavras-chave |
|---|---|
| `EXPLAIN_CONCEPT` | explica, o que é, conceito, como funciona |
| `GENERATE_STUDY_PLAN` | quero estudar, plano, roadmap, quiz, praticar |
| `SIMULATE_INTERVIEW` | entrevista, simula entrevista, processo seletivo |
| `REVIEW_ANSWER` | revisa, corrige, minha resposta, feedback |
| `OPEN_RESOURCE` | abrir, navegar, ver, mostrar |
| `COMPARE_CONCEPTS` | comparar, vs, versus, qual melhor, diferença entre |
| `UNKNOWN` | qualquer outra entrada |

**Ações retornadas:**

| ActionType | Quando |
|---|---|
| `SHOW_EXPLANATION` | EXPLAIN_CONCEPT, REVIEW_ANSWER |
| `START_STUDY_PLAN` | GENERATE_STUDY_PLAN → /planejar-estudos |
| `START_INTERVIEW` | SIMULATE_INTERVIEW |
| `OPEN_RESOURCE` | OPEN_RESOURCE, COMPARE_CONCEPTS |
| `NONE` | UNKNOWN |

## Rodar testes

```bash
mvn test
```

41 testes em 4 classes:
- `IntentClassifierServiceTest` — 12 testes de classificação
- `ResourceResolverServiceTest` — 11 testes de resolução de catálogo
- `InteractActionResolverServiceTest` — 9 testes de resolução de ação
- `InteractServiceTest` — 9 testes de integração da facade

## Estrutura de pacotes

```
src/main/java/com/studyhelper/api/
├── StudyHelperApiApplication.java
├── config/
│   └── WebConfig.java
├── controller/
│   ├── HealthController.java
│   └── InteractController.java
├── domain/
│   ├── Intent.java          # 7 intenções
│   ├── ActionType.java      # 5 tipos de ação
│   ├── Domain.java          # 5 domínios + basePath()
│   ├── ResourceType.java    # tipos de recurso do catálogo
│   └── ResourceEntry.java   # entrada do catálogo (record)
├── dto/
│   ├── HealthResponse.java
│   ├── InfoResponse.java
│   ├── InteractRequest.java
│   ├── InteractResponse.java
│   ├── InteractAction.java
│   └── ResourceMatchResult.java  # resultado da resolução de recurso
└── service/
    ├── IntentClassifierService.java         # classifica intenção por regex
    ├── ResourceCatalogService.java          # catálogo em memória (~20 recursos)
    ├── ResourceResolverService.java         # encontra recurso por alias
    ├── InteractActionResolverService.java   # resolve ação via catálogo
    └── InteractService.java                # facade com respostas enriquecidas
```

## CORS

Configurado para aceitar requisições de:
- `http://localhost:3000` (frontend Next.js padrão)
- `http://localhost:3001` (porta alternativa)

## Próximos passos

- Integrar frontend Next.js via `fetch('/api/interact/text')`
- Adicionar Speech-to-Text (Web Speech API no frontend → texto → backend)
- Substituir classificador regex por modelo de linguagem
- Adicionar banco de dados (PostgreSQL + Spring Data JPA)
- Adicionar autenticação (Sprint futura)
