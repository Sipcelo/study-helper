# 37 — Direcao do Backend Java Spring Boot

## Decisao

O backend principal de todos os novos servicos do Study Helper sera **Java Spring Boot**, alinhado ao Bootcamp AI Java Backend em andamento.

Node.js/NestJS permanece ativo apenas no que ja existe e sera substituido gradualmente.

---

## Por que Java Spring Boot

| Razao | Detalhe |
|-------|---------|
| Aprendizado real | O criador esta cursando o Bootcamp AI Java Backend |
| Empregabilidade | Java Spring Boot e amplamente usado no mercado brasileiro |
| Portfolio enterprise | Demonstra stack robusta em processos seletivos |
| Alinhamento com projeto final | A API Interact e o projeto final do bootcamp |
| Maturidade | Ecosistema maduro com Spring Security, JPA, Testing |

---

## Estrutura esperada

```
study-helper/
  services/
    study-helper-api/        ← servico principal Java
      src/
        main/java/com/studyhelper/
          StudyHelperApplication.java
          assets/
            controller/
            service/
            repository/
            dto/
          interact/
            controller/
            service/
            dto/
      pom.xml ou build.gradle
```

---

## Servicos planejados em Java

### Servico 1 — study-helper-api (backend principal)

Responsabilidades:
- endpoints de ativos (moedas, acoes, indices, indicadores)
- historico de precos
- autenticacao e autorizacao
- endpoints do modulo de programacao (trilhas, conceitos)

Stack:
- Spring Boot 3.x
- Spring Web (REST)
- Spring Data JPA
- PostgreSQL
- Spring Security
- Docker

### Servico 2 — API Interact (Speech to Text educacional)

Responsabilidades:
- receber audio do usuario
- transcrever com modelo de Speech to Text
- classificar intencao educacional
- retornar resposta ou acao estruturada

Ver: `docs/38_API_INTERACT_SPEECH_TO_TEXT.md`

---

## Padroes obrigatorios

Seguir os padroes aprendidos no bootcamp:

| Padrao | Descricao |
|--------|-----------|
| DTOs | Separar entidade de modelo de transferencia |
| Controllers | Receber requisicao, delegar para service |
| Services | Regra de negocio, orquestracao |
| Repositories | Acesso a dados via JPA |
| Exception handlers | Tratamento centralizado de erros |
| Validation | Bean Validation (@Valid, @NotNull, etc.) |

---

## Integracao com frontend

O frontend Next.js consome o backend Java via provider pattern.

O `MarketProvider` (e futuros providers de programacao) abstraem a fonte dos dados:

```
Frontend Next.js
  → provider interface (TypeScript)
    → MockProvider (dados mockados, dev)
    → JavaApiProvider (REST, producao)
      → Java Spring Boot API
        → PostgreSQL
```

A troca de mock para API real nao exige alteracao nos componentes React.

---

## Regras para o agente

1. Novos endpoints de backend sempre em Java Spring Boot.
2. Nunca criar novo servico NestJS sem aprovacao explicita.
3. Nomear servicos Java com pacote `com.studyhelper.*`.
4. Seguir estrutura Controller → Service → Repository em todos os modulos.
5. DTOs separados de entidades JPA sempre.
6. Documentar endpoints novos em `docs/08_API_SPEC.md`.

---

## Cronograma esperado

| Fase | Entrega |
|------|---------|
| Fase 2 do roadmap | Estrutura base Spring Boot + endpoints de ativos |
| Fase 2 do roadmap | API Interact — Speech to Text inicial |
| Fase 3 do roadmap | Endpoints do modulo de programacao |
| Fase 5 do roadmap | Dados financeiros reais (provider real) |

Ver roadmap completo em: `docs/16_ROADMAP.md`
