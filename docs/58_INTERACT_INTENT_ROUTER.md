# 58 — Interact Intent Router

**Módulo:** `[API-INTERACT]` `[PROGRAMACAO]` `[PLATAFORMA]`  
**Sprint:** 23  
**Status:** Implementado

---

## Objetivo

Refatorar o backend Java da API Interact para separar a classificação de intenção da resolução de ação, organizando o código em serviços especializados com testes independentes.

---

## Arquitetura

```
POST /api/interact/text
    └─ InteractController
         └─ InteractService (facade)
              ├─ IntentClassifierService   → classifica intenção
              ├─ InteractActionResolverService → resolve ação
              └─ Domain (enum)             → normaliza domínio
```

---

## Enums

### Intent

| Valor | Quando |
|-------|--------|
| `EXPLAIN_CONCEPT` | explica, o que é, conceito, como funciona |
| `GENERATE_STUDY_PLAN` | quero estudar, plano, roadmap, quiz, praticar |
| `SIMULATE_INTERVIEW` | entrevista, simula entrevista, processo seletivo |
| `REVIEW_ANSWER` | revisa, corrige, minha resposta, feedback |
| `OPEN_RESOURCE` | abrir, navegar, ver, mostrar |
| `COMPARE_CONCEPTS` | comparar, vs, versus, qual melhor, diferença entre |
| `UNKNOWN` | entrada não reconhecida |

### ActionType

| Valor | Significado |
|-------|-------------|
| `SHOW_EXPLANATION` | Abre página de explicação do conceito |
| `START_STUDY_PLAN` | Redireciona para /planejar-estudos |
| `START_INTERVIEW` | Abre modo de entrevista |
| `OPEN_RESOURCE` | Abre recurso/seção do domínio |
| `NONE` | Nenhuma ação disponível |

### Domain

| Valor | basePath() |
|-------|-----------|
| `PROGRAMMING` | /programacao |
| `CAREER` | /carreira |
| `FINANCE` | /ativos |
| `STUDY` | /planejar-estudos |
| `GENERAL` | /programacao |

---

## Exemplos de resposta

### "me explica o que e REST" + programming
```json
{
  "transcript": "me explica o que e REST",
  "intent": "EXPLAIN_CONCEPT",
  "domain": "programming",
  "answer": "Explicação sobre o tema solicitado...",
  "action": { "type": "SHOW_EXPLANATION", "target": "/programacao/me-explica-o-que-e-rest" }
}
```

### "quero estudar Spring Boot" + programming
```json
{
  "intent": "GENERATE_STUDY_PLAN",
  "action": { "type": "START_STUDY_PLAN", "target": "/planejar-estudos" }
}
```

### "simula entrevista Java Junior" + programming
```json
{
  "intent": "SIMULATE_INTERVIEW",
  "action": { "type": "START_INTERVIEW", "target": "/programacao/entrevista-simula-entrevista-java" }
}
```

### "me explica Selic" + finance
```json
{
  "intent": "EXPLAIN_CONCEPT",
  "action": { "type": "SHOW_EXPLANATION", "target": "/glossario?search=me-explica-selic" }
}
```

### "comparar NVDA e TSLA" + finance
```json
{
  "intent": "COMPARE_CONCEPTS",
  "action": { "type": "OPEN_RESOURCE", "target": "/ativos" }
}
```

### "banana azul"
```json
{
  "intent": "UNKNOWN",
  "action": { "type": "NONE", "target": null }
}
```

---

## Serviços

### IntentClassifierService

Responsabilidade única: classifica a intenção dado um input normalizado.

- Normaliza texto (remove acentos, lowercase)
- Aplica padrões regex em ordem de prioridade:
  1. COMPARE_CONCEPTS (mais específico — evita conflito com EXPLAIN_CONCEPT)
  2. SIMULATE_INTERVIEW
  3. GENERATE_STUDY_PLAN
  4. REVIEW_ANSWER
  5. EXPLAIN_CONCEPT
  6. OPEN_RESOURCE
  7. UNKNOWN (fallback)

### InteractActionResolverService

Responsabilidade única: dado input + domain + intent, retorna `InteractAction`.

- Para `EXPLAIN_CONCEPT` + `FINANCE` → `/glossario?search={slug}`
- Para `EXPLAIN_CONCEPT` + outros → `/{basePath}/{slug}`
- Para `COMPARE_CONCEPTS` + `FINANCE` → `/ativos`
- Para `COMPARE_CONCEPTS` + outros → `/programacao`
- Para `GENERATE_STUDY_PLAN` → sempre `/planejar-estudos`
- Para `SIMULATE_INTERVIEW` → `/{basePath}/entrevista-{slug}`

---

## Testes

| Classe | Testes |
|--------|--------|
| `IntentClassifierServiceTest` | 12 casos |
| `InteractActionResolverServiceTest` | 8 casos |
| `InteractServiceTest` | 7 casos (integração facade) |
| **Total** | **27 testes, 0 falhas** |

---

## Limitações

- Classificação por regex — sem NLP real
- Slug gerado do input completo (inclui palavras da intenção, ex: "me-explica-o-que-e-rest")
- Respostas `answer` são genéricas — sem conteúdo real por tópico
- Sem histórico de sessão
- Sem autenticação

---

## Próximos passos

- Sprint 24: Speech-to-Text (Web Speech API → texto → API Interact)
- Sprint futura: substituir regex por modelo de linguagem (Claude API)
- Sprint futura: respostas `answer` com conteúdo real por conceito

---

## Relacionado

- `docs/56_JAVA_BACKEND_BASE.md` — base do backend Java
- `docs/57_FRONTEND_INTERACT_INTEGRATION.md` — integração frontend
- `docs/38_API_INTERACT_SPEECH_TO_TEXT.md` — visão de voz
