# 56 — Java Backend Base: study-helper-api

**Módulo:** `[API-INTERACT]` `[PLATAFORMA]`  
**Sprint:** 21  
**Status:** Implementado (validação local pendente — requer Java 17+ e Maven)

---

## Objetivo

Criar a base do backend Java Spring Boot do Study Helper. Primeiro serviço Java da plataforma, responsável pela API Interact — classificação de intenção educacional a partir de texto.

Este documento registra decisões de design, estrutura e próximos passos.

---

## Localização

```
services/
└── study-helper-api/          ← raiz do serviço Java
    ├── pom.xml
    ├── README.md
    └── src/
        ├── main/java/com/studyhelper/api/
        │   ├── StudyHelperApiApplication.java
        │   ├── config/WebConfig.java
        │   ├── controller/
        │   │   ├── HealthController.java
        │   │   └── InteractController.java
        │   ├── domain/
        │   │   ├── Intent.java
        │   │   └── ActionType.java
        │   ├── dto/
        │   │   ├── HealthResponse.java
        │   │   ├── InfoResponse.java
        │   │   ├── InteractRequest.java
        │   │   ├── InteractAction.java
        │   │   └── InteractResponse.java
        │   └── service/
        │       └── InteractService.java
        └── test/java/com/studyhelper/api/
            └── service/
                └── InteractServiceTest.java
```

---

## Decisões de design

### Maven vs Gradle

Escolhido **Maven** (`pom.xml`) por:
- Alinhamento ao Bootcamp AI Java Backend (usa Maven)
- XML declarativo e previsível para projetos Spring Boot
- Tooling mais maduro no ecossistema Spring

### Java Records para DTOs

Todos os DTOs são `record` (Java 16+):
- Imutáveis por padrão
- `toString`, `equals`, `hashCode` gerados automaticamente
- Sintaxe compacta sem boilerplate

### Injeção por construtor

Nenhum `@Autowired` em campo. `InteractService` é injetado no construtor de `InteractController`. Testável sem framework.

### CORS configurado via WebMvcConfigurer

Aceita requisições de `localhost:3000` e `localhost:3001` (frontend Next.js). Configurado em `WebConfig.java`.

### Classificação por regex (mock)

`InteractService` usa `String.matches()` com padrões regex para classificar a intenção. Sem IA real — substituível por chamada a modelo de linguagem em sprint futura.

---

## Endpoints

| Método | Path | Descrição |
|--------|------|-----------|
| `GET` | `/api/health` | Status do serviço |
| `GET` | `/api/info` | Nome, versão e endpoints disponíveis |
| `POST` | `/api/interact/text` | Classifica intenção de texto educacional |

### POST /api/interact/text

**Request:**
```json
{
  "input": "me explica o que é REST",
  "domain": "programming"
}
```

**Response:**
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

---

## Intenções classificadas

| Intent | Keywords detectadas |
|--------|---------------------|
| `EXPLAIN_CONCEPT` | explica, explique, o que é, define, conceito, como funciona, diferença entre |
| `QUIZ_ME` | quiz, perguntas, teste me, exercício, treinar, praticar |
| `NAVIGATE_TO` | abrir, navegar, ir para, mostrar, ver |
| `SEARCH_TOPIC` | buscar, procurar, encontrar, pesquisar |
| `UNKNOWN` | entrada não reconhecida |

---

## Ações retornadas

| ActionType | Quando |
|------------|--------|
| `OPEN_RESOURCE` | EXPLAIN_CONCEPT, NAVIGATE_TO |
| `SHOW_QUIZ` | QUIZ_ME |
| `SEARCH` | SEARCH_TOPIC |
| `NONE` | UNKNOWN |

---

## Testes

4 testes unitários em `InteractServiceTest`:

```
shouldClassifyExplainConceptIntent   → "me explica o que é REST" → EXPLAIN_CONCEPT
shouldClassifyQuizIntent             → "me faça um quiz sobre Spring Boot" → QUIZ_ME
shouldReturnUnknownForUnrecognizedInput → "olá tudo bem" → UNKNOWN
shouldHandleNullDomain               → domain null → normaliza para "general"
```

Rodar: `mvn test`

---

## Validação local (requer Java + Maven instalados)

```bash
# 1. Iniciar o servidor
cd services/study-helper-api
mvn spring-boot:run

# 2. Testar health
curl http://localhost:8080/api/health

# 3. Testar interact
curl -X POST http://localhost:8080/api/interact/text \
  -H "Content-Type: application/json" \
  -d '{"input": "me explica o que é REST", "domain": "programming"}'
```

**Instalação do Java:** https://adoptium.net/  
**Instalação do Maven:** https://maven.apache.org/download.cgi

Após instalar, verificar com:
```bash
java -version   # deve exibir 17 ou superior
mvn -version
```

---

## Próximos passos (sprints futuras)

1. **Integração frontend → backend**: `fetch('http://localhost:8080/api/interact/text')` no Next.js
2. **Speech-to-Text**: Web Speech API no frontend captura voz → envia texto ao backend
3. **Banco de dados**: PostgreSQL + Spring Data JPA para persistir histórico de interações
4. **IA real**: Substituir classificador regex por chamada ao Claude API ou modelo local
5. **Autenticação**: Spring Security + JWT
6. **Deploy**: Docker + Railway/Render ou EC2

---

## Relacionado

- `docs/37_JAVA_BACKEND_DIRECTION.md` — decisão de usar Java Spring Boot
- `docs/38_API_INTERACT_SPEECH_TO_TEXT.md` — visão do produto para API Interact
- `services/study-helper-api/README.md` — guia de uso rápido
