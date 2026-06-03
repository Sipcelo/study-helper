# 59 — Interact Resource Resolver

**Módulo:** `[API-INTERACT]` `[PROGRAMACAO]` `[PLATAFORMA]`  
**Sprint:** 24  
**Status:** Implementado

---

## Objetivo

Resolver inputs do usuário para rotas reais do Study Helper antes de gerar a action. A API deixou de gerar slugs genéricos baseados no input literal e passou a usar um catálogo de recursos conhecidos.

---

## Arquitetura

```
POST /api/interact/text
    └─ InteractService
         ├─ IntentClassifierService       → classifica intenção
         ├─ ResourceResolverService       → encontra recurso no catálogo
         │    └─ ResourceCatalogService   → lista em memória de ResourceEntry
         └─ InteractActionResolverService → constrói action
              └─ ResourceResolverService  → usa match para definir targetPath
```

---

## Catálogo de recursos

### Programação

| Recurso | Aliases principais | Target |
|---------|-------------------|--------|
| APIs REST | rest, api rest, restful | `/programacao/rest-api` |
| Spring Boot | spring boot, springboot | `/programacao/spring-boot` |
| Java Essencial | java essencial, java basico | `/programacao/java-essencial` |
| Java | java | `/programacao/java-essencial` |
| DTO e Validação | dto, data transfer object | `/programacao/dto-validacao` |
| REST Controller | controller, endpoint | `/programacao/spring-boot` |
| Camada de Serviço | service layer, camada de serviço | `/programacao/spring-boot` |
| Repository JPA | repository, spring data | `/programacao/spring-boot` |

### Carreira

| Recurso | Aliases principais | Target |
|---------|-------------------|--------|
| Entrevista Java Junior | entrevista java junior, java junior | `/programacao/entrevista-java-junior` |
| Carreira Junior | curriculo, linkedin, portfolio | `/programacao/carreira-junior` |

### Study Planner

| Recurso | Aliases principais | Target |
|---------|-------------------|--------|
| Planejar Estudos | plano de estudos, cronograma, estudos | `/planejar-estudos` |

### Finanças

| Recurso | Aliases principais | Target |
|---------|-------------------|--------|
| Taxa Selic | selic, taxa selic | `/ativo/selic` |
| IPCA | ipca, inflação ipca | `/ativo/ipca` |
| DXY | dxy, dollar index | `/ativo/dxy` |
| NVDA | nvda, nvidia | `/ativo/nvda` |
| TSLA | tsla, tesla | `/ativo/tsla` |
| Ibovespa | ibovespa, ibov, b3 | `/ativo/ibov` |
| Inflação | inflacao, inflação | `/glossario?search=inflação` |
| Dividendos | dividendos, yield | `/glossario?search=dividendos` |

---

## Tabela de resolução: input → intent → target

| Input | Intent | Target |
|-------|--------|--------|
| "me explica REST" | EXPLAIN_CONCEPT | `/programacao/rest-api` |
| "quero estudar Spring Boot" | GENERATE_STUDY_PLAN | `/planejar-estudos` |
| "simula entrevista Java Junior" | SIMULATE_INTERVIEW | `/programacao/entrevista-java-junior` |
| "me explica Selic" | EXPLAIN_CONCEPT | `/ativo/selic` |
| "o que é inflação" | EXPLAIN_CONCEPT | `/glossario?search=inflação` |
| "comparar NVDA e TSLA" | COMPARE_CONCEPTS | `/ativos` (domain fallback) |
| "banana azul" | UNKNOWN | `null` |

---

## Lógica de resolução

### ResourceResolverService

1. Ignora intents `UNKNOWN` e `COMPARE_CONCEPTS` → retorna `noMatch()`
2. Normaliza o input (remove acentos, lowercase)
3. Remove prefixos de intenção ("me explica", "quero estudar", "simula entrevista", ...)
4. Busca cada alias do catálogo no texto limpo (contains)
5. Retorna a entrada com o alias mais longo (maior confidence)

**Confidence:** `alias.length / cleanedInput.length` — aliases mais longos e específicos vencem.

### InteractActionResolverService

| Intent | Comportamento |
|--------|--------------|
| GENERATE_STUDY_PLAN | Sempre `/planejar-estudos` (ignora catálogo) |
| COMPARE_CONCEPTS | Domain base path (ignora catálogo) |
| UNKNOWN | `NONE`, target null |
| Demais | Usa catálogo; fallback se não encontrar |

**Fallback para SIMULATE_INTERVIEW sem match:** `/programacao/entrevista-java-junior`  
**Fallback para outros:** `domain.basePath()`

### InteractService — respostas enriquecidas

- Match encontrado: `"Encontrei {title} no Study Helper. {description}"`
- Sem match: resposta genérica por intent

---

## Testes

| Classe | Testes |
|--------|--------|
| `IntentClassifierServiceTest` | 12 |
| `InteractActionResolverServiceTest` | 9 |
| `InteractServiceTest` | 9 |
| `ResourceResolverServiceTest` | 11 |
| **Total** | **41 testes, 0 falhas** |

---

## Limitações

- Catálogo estático em memória — não persiste e não é editável em tempo de execução
- Matching por substring simples — sem fuzzy matching ou NLP
- GENERATE_STUDY_PLAN ignora o recurso encontrado — vai sempre para /planejar-estudos
- COMPARE_CONCEPTS não resolve recursos individuais — retorna domain base path
- Sem ranking por domínio — uma busca de "java" em domínio finance ainda encontraria Java Essencial

---

## Próximos passos

- Sprint 25: Speech-to-Text — Web Speech API no browser → texto → API Interact
- Sprint futura: substituir catálogo estático por banco de dados
- Sprint futura: substituir substring matching por embedding semântico
- Sprint futura: COMPARE_CONCEPTS retorna dois recursos e link para `/comparar?a=X&b=Y`

---

## Relacionado

- `docs/58_INTERACT_INTENT_ROUTER.md` — intent router (Sprint 23)
- `docs/57_FRONTEND_INTERACT_INTEGRATION.md` — integração frontend
- `docs/56_JAVA_BACKEND_BASE.md` — base do backend Java
