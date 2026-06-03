# 38 — API Interact — Speech to Text Educacional

## O que e

**API Interact** e o projeto final do Bootcamp AI Java Backend e o primeiro servico Java Spring Boot do Study Helper.

Objetivo: **ouvir, pensar e agir** — transformar audio em acao educacional estruturada.

---

## Pipeline principal

```
USUARIO fala
  ↓
[1] OUVIR — receber audio via endpoint REST
  ↓
[2] TRANSCREVER — Speech to Text (modelo de IA)
  ↓
[3] CLASSIFICAR — identificar intencao educacional
  ↓
[4] AGIR — retornar resposta ou acao estruturada
```

---

## Intencoes suportadas

| Intencao | Trigger de exemplo | Resposta esperada |
|----------|-------------------|-------------------|
| `EXPLAIN_CONCEPT` | "O que e um DTO?" | Explicacao textual do conceito |
| `GENERATE_STUDY_PLAN` | "Quero aprender Java em 3 meses" | Plano de estudos estruturado |
| `SIMULATE_INTERVIEW` | "Simule uma entrevista de Spring Boot" | Pergunta tecnica de entrevista |
| `REVIEW_ANSWER` | "Minha resposta foi: ..." | Avaliacao e feedback |
| `OPEN_RESOURCE` | "Abra a trilha de Java" | Acao de navegacao ou link |
| `COMPARE_CONCEPTS` | "Qual a diferenca entre REST e GraphQL?" | Comparacao didatica |

---

## Dominios de atuacao

A API Interact responde sobre quatro dominios:

| Dominio | Exemplos |
|---------|---------|
| Programacao | Java, Spring Boot, DTOs, REST APIs, Controllers |
| Carreira | Entrevistas tecnicas, portfolio, roadmap junior |
| Estudos | Planos de estudo, revisoes, quiz |
| Financas | Ativos, moedas, indices, mercado |

---

## Arquitetura do servico

```
study-helper/
  services/
    api-interact/
      src/main/java/com/studyhelper/interact/
        InteractApplication.java
        audio/
          controller/
            AudioController.java        ← POST /interact/audio
          service/
            TranscriptionService.java   ← STT
            IntentClassifierService.java ← classificacao
          dto/
            AudioRequestDto.java
            InteractResponseDto.java
        intent/
          model/
            IntentType.java             ← enum de intencoes
          handler/
            ExplainConceptHandler.java
            StudyPlanHandler.java
            InterviewSimulatorHandler.java
            ReviewAnswerHandler.java
            OpenResourceHandler.java
            CompareConceptsHandler.java
      pom.xml
```

---

## Endpoints planejados

### POST /interact/audio

Recebe audio e retorna acao estruturada.

**Request:**
```
Content-Type: multipart/form-data
file: audio.webm | audio.mp3 | audio.ogg
```

**Response:**
```json
{
  "transcription": "O que e um DTO?",
  "intent": "EXPLAIN_CONCEPT",
  "domain": "PROGRAMACAO",
  "response": {
    "type": "explanation",
    "title": "DTO — Data Transfer Object",
    "content": "Um DTO e um objeto usado para transferir dados entre camadas...",
    "relatedConcepts": ["Entity", "Service", "Controller"],
    "studyLink": "/programacao/conceitos/dto"
  }
}
```

### POST /interact/text

Versao texto direto (sem audio), para testes e fallback.

**Request:**
```json
{
  "text": "Simule uma entrevista de Spring Boot"
}
```

---

## Stack tecnologica

| Componente | Tecnologia |
|------------|-----------|
| Framework | Java Spring Boot 3.x |
| API | Spring Web (REST) |
| Speech to Text | OpenAI Whisper API (ou alternativa) |
| Classificacao de intencao | Prompt + modelo de linguagem |
| Validacao | Bean Validation |
| Testes | JUnit 5 + Mockito |
| Container | Docker |

---

## Modelo de classificacao de intencao

A classificacao sera feita via prompt estruturado enviado para modelo de linguagem.

Exemplo de prompt:
```
Texto transcrito: "O que é um Controller no Spring Boot?"

Classifique a intencao em: EXPLAIN_CONCEPT | GENERATE_STUDY_PLAN | SIMULATE_INTERVIEW | REVIEW_ANSWER | OPEN_RESOURCE | COMPARE_CONCEPTS

Dominio: PROGRAMACAO | CARREIRA | ESTUDOS | FINANCAS

Responda em JSON.
```

---

## Relacao com o Study Helper

A API Interact e um servico independente que se integra ao frontend Next.js:

```
Frontend Next.js
  → Componente de voz (botao mic)
    → POST /interact/audio (API Interact — Java)
      → resposta estruturada
        → frontend renderiza explicacao, plano ou simulacao
```

O frontend nao precisa conhecer a logica de classificacao — apenas renderiza a resposta.

---

## Criterios de conclusao (MVP)

- [ ] Estrutura base Spring Boot funcionando
- [ ] Endpoint POST /interact/text operacional
- [ ] Pelo menos 3 intencoes implementadas (EXPLAIN_CONCEPT, SIMULATE_INTERVIEW, GENERATE_STUDY_PLAN)
- [ ] Resposta JSON estruturada e consistente
- [ ] Testes unitarios nos handlers
- [ ] Documentacao de API atualizada em `docs/08_API_SPEC.md`
- [ ] Endpoint POST /interact/audio (com STT integrado)

---

## Relacao com o bootcamp

Este projeto e o **projeto final do Bootcamp AI Java Backend**.

Demonstra dominio de:
- Java Spring Boot (Controllers, Services, Repositories, DTOs)
- Integracao com APIs externas (STT, LLM)
- Arquitetura de servico real
- Testes e documentacao
- Deploy containerizado

Ver contexto do criador em: `docs/02_CREATOR_CONTEXT.md`
Ver direcao do backend em: `docs/37_JAVA_BACKEND_DIRECTION.md`
