# 46 — Study Planner System

Classificação: [PLATAFORMA] [PROGRAMACAO] [CARREIRA]

Documentado na Sprint 13.

---

## Visão Geral

O Study Planner é o sistema central do Study Helper. Ele transforma um objetivo do usuário ("quero aprender GRC em 30 dias") em um plano de estudo estruturado, com tarefas diárias, materiais, artefatos práticos e perguntas de entrevista.

O sistema é inspirado no fluxo **Chatbot → Copiloto → Agente** do repositório da DIO e nos princípios de workspace contextual de agentes de IA.

---

## Fluxo: Chatbot → Copiloto → Agente

```
┌─────────────────────────────────────────────────────────────┐
│  USUÁRIO                                                    │
│  "Quero aprender GRC em 30 dias para mudar de área"         │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│  CHATBOT (Nível 1)                                          │
│  • Coleta intenção e contexto                               │
│  • Faz perguntas de refinamento:                            │
│    - Qual sua experiência atual?                            │
│    - Quantas horas por dia pode estudar?                    │
│    - Tem prazo ou certificação em mente?                    │
│  • Classifica: área, nível, duração, objetivo final         │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│  COPILOTO (Nível 2)                                         │
│  • Sugere estrutura do plano (semanas e temas)              │
│  • Apresenta preview para aprovação do usuário              │
│  • Ajusta com feedback ("mais prático", "menos teoria")     │
│  • Valida coerência do plano com o objetivo                 │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│  AGENTE (Nível 3)                                           │
│  • Gera o workspace completo:                               │
│    - Dias com tarefas detalhadas                            │
│    - Materiais recomendados                                 │
│    - Templates de artefatos                                 │
│    - Perguntas de revisão                                   │
│    - Projeto final com entregas                             │
│  • Persiste o plano no banco de dados                       │
│  • Disponibiliza via /meu-plano                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Etapas detalhadas

### Etapa 1 — Chatbot: Captura de Intenção

O usuário expressa seu objetivo em linguagem natural. O chatbot usa perguntas guiadas para coletar:

| Campo | Exemplo |
|-------|---------|
| `userGoal` | "Quero aprender GRC para conseguir emprego" |
| `area` | `seguranca` |
| `currentLevel` | `iniciante` |
| `availableHoursPerDay` | 2 |
| `durationDays` | 30 |
| `targetRole` | "Analista de GRC" |
| `preferredMaterialTypes` | `['artigo', 'video']` |

Saída: `StudyPlanGenerationInput`

### Etapa 2 — Copiloto: Estrutura de Alto Nível

O copiloto propõe a divisão em semanas com temas:

```
Plano GRC 30 dias — Proposta:

Semana 1: Fundamentos de GRC (o que é, pilares, mercado)
Semana 2: Frameworks (COBIT, ISO 27001, NIST, LGPD)
Semana 3: Implementação prática (análise de risco, políticas, auditorias)
Semana 4: Carreira e certificações
Semana 5 (parcial): Projeto final

Você aprova essa estrutura ou quer ajustar?
```

### Etapa 3 — Agente: Geração do Workspace

Para cada semana aprovada, o agente gera os dias com:
- Tarefas com tipo e tempo estimado
- Materiais reais com descrições
- Template de artefato prático
- Perguntas de revisão contextualizadas

O resultado é um `StudyPlan` completo salvo no banco.

---

## Estrutura de Dados

```typescript
// Entrada do usuário
StudyPlanGenerationInput {
  userGoal: string
  area: StudyPlanArea          // 'programacao' | 'carreira' | 'seguranca' | ...
  currentLevel: StudyPlanDifficulty
  availableHoursPerDay: number
  durationDays: number
  targetRole?: string
  preferredMaterialTypes?: StudyMaterialType[]
}

// Plano gerado
StudyPlan {
  id, title, description, area, difficulty, durationDays, totalHours
  weeks: StudyWeek[]
  finalProject: FinalProject
  status: 'rascunho' | 'ativo' | 'pausado' | 'concluido'
}

// Semana temática
StudyWeek {
  weekNumber, theme, objective
  days: StudyDay[]
}

// Dia de estudo
StudyDay {
  dayNumber, title, objective, estimatedMinutes
  tasks: StudyTask[]
  materials: StudyMaterial[]
  artifact?: StudyArtifact
  reviewQuestions: StudyQuestion[]
}

// Componentes atômicos
StudyTask    { id, title, type, durationMinutes, completed }
StudyMaterial { title, type, description, url? }
StudyArtifact { title, type, description, template? }
StudyQuestion { question, difficulty, answer? }
FinalProject  { title, description, deliverables[], estimatedHours }
```

Tipos completos em `apps/web/src/types/study-plan.ts`.

---

## Áreas cobertas pelo Study Planner

| Área | Exemplos de planos |
|------|--------------------|
| `programacao` | Java Essencial 45 dias, Spring Boot 30 dias, React 21 dias |
| `carreira` | Entrevista junior Java, Portfólio técnico, LinkedIn para devs |
| `seguranca` | GRC 30 dias, ISO 27001 Lead Auditor, Pentest fundamentals |
| `financeiro` | Análise de FIIs, Renda fixa, Tesouro Direto |
| `dados` | SQL avançado, Python para dados, Power BI |
| `devops` | Docker + Kubernetes, CI/CD, AWS fundamentals |
| `gestao` | Gestão de projetos ágeis, OKRs, Liderança técnica |

---

## Integração com o resto do Study Helper

### Módulo de Programação

Os tópicos da trilha `java-essencial` em `programming-tracks.ts` já existem. O Study Planner pode gerar um `StudyPlan` que mapeia esses tópicos como `StudyDay.tasks`, conectando a progressão de trilha com o plano de estudo diário.

```
Trilha java-essencial (sem plano)  →  Estudo sequencial livre
Trilha java-essencial + Study Plan  →  Estudo com ritmo, prazo e artefatos
```

### API Interact (futuro)

O usuário fala: "Explique o risco residual do dia 11 do meu plano". O API Interact usa a intenção `EXPLAIN_CONCEPT` + o contexto do `StudyPlan` ativo do usuário para responder contextualmente.

### Módulo Financeiro

Um plano "Renda fixa em 21 dias" usaria os ativos mockados do módulo financeiro como materiais de estudo e os dados de mercado como base para os artefatos práticos.

---

## Fases de implementação

| Fase | Entrega | Sprint estimada |
|------|---------|-----------------|
| **Fase 1 (atual)** | Documentação, tipos, exemplos mockados | Sprint 13 |
| **Fase 2** | UI: `/meu-plano` com plano estático GRC | Sprint 14-15 |
| **Fase 3** | Geração via formulário (sem IA, regras fixas) | Sprint 16-17 |
| **Fase 4** | Integração com API Java backend | Sprint 18-20 |
| **Fase 5** | Geração com IA (API Interact + LLM) | Fase 6 do roadmap |

---

## Referências

- DIO: Fluxo Chatbot → Copiloto → Agente (repositório interno)
- Exemplo base: Plano GRC 30 dias (ver `docs/47_STUDY_PLAN_GRC_EXAMPLE.md`)
- Tipos: `apps/web/src/types/study-plan.ts`
- Dados mockados: `apps/web/src/data/study-plan-examples.ts`
