# 48 — Geração de Workspace pelo Agente

Classificação: [PLATAFORMA] [API-INTERACT]

Documentado na Sprint 13.

---

## O que é o Workspace

O workspace é o estado de trabalho ativo do usuário dentro de um plano de estudo. Vai além da lista de tarefas: é o contexto completo que permite ao agente entender onde o estudante está, o que já aprendeu e o que precisa agora.

```
Plano de Estudo (estático, gerado uma vez)
  └── Workspace (dinâmico, evolui com o usuário)
        ├── Progresso: semana atual, dia atual, tarefas completadas
        ├── Artefatos entregues
        ├── Histórico de perguntas e respostas
        └── Contexto para o próximo passo
```

---

## Fluxo detalhado de geração

### Fase 1 — Input (Chatbot)

```
Chatbot coleta → StudyPlanGenerationInput

Campos obrigatórios:
  userGoal: string              → intenção natural do usuário
  area: StudyPlanArea           → classificado automaticamente
  currentLevel: difficulty      → iniciante | intermediario | avancado
  availableHoursPerDay: number  → define profundidade por dia
  durationDays: number          → define número de semanas

Campos opcionais:
  targetRole?: string           → personaliza perguntas de entrevista
  preferredMaterialTypes?       → prioriza vídeo ou leitura
  topics?: string[]             → tópicos obrigatórios a incluir
```

### Fase 2 — Estruturação (Copiloto)

O copiloto recebe o `StudyPlanGenerationInput` e:

1. Divide `durationDays` em semanas temáticas
2. Define `theme` e `objective` por semana
3. Estima `days` por semana (padrão: 5 dias úteis)
4. Apresenta o outline para aprovação:

```
Preview aprovado pelo usuário:

Semana 1: [tema] — [objetivo em 1 frase]
Semana 2: [tema] — [objetivo em 1 frase]
...
Semana N: Projeto Final

Tempo total: ~X horas | X dias
```

5. Aceita feedback e ajusta o outline antes de gerar o plano completo

### Fase 3 — Geração (Agente)

Para cada `StudyWeek` aprovada, o agente gera cada `StudyDay`:

```
Para cada dia:
  1. Definir title e objective com base no tema da semana
  2. Selecionar tipos de tarefa (leitura + vídeo + prática + quiz/revisão)
  3. Distribuir durationMinutes por tarefa, respeitando availableHoursPerDay × 60
  4. Buscar materiais relevantes (fase futura: pesquisa real via RAG)
  5. Gerar template de artefato prático contextualizado
  6. Criar 2 perguntas de revisão com dificuldade progressiva
  7. Calcular estimatedMinutes total do dia

Para o plano completo:
  1. Calcular totalHours
  2. Gerar FinalProject com deliverables baseados nos artefatos das semanas
  3. Salvar StudyPlan com status 'rascunho'
  4. Confirmar com usuário antes de ativar
```

---

## Padrão de tarefas por tipo de dia

### Dia de conteúdo novo (padrão)
```
tasks: [
  { type: 'leitura',  durationMinutes: 30–50 },
  { type: 'video',    durationMinutes: 20–40 },
  { type: 'pratica',  durationMinutes: 30–45 },
  { type: 'quiz',     durationMinutes: 15–20 },
]
artifact: 1 artefato obrigatório
reviewQuestions: 2 perguntas (1 fácil + 1 média)
```

### Dia de revisão (toda sexta ou dia 5 da semana)
```
tasks: [
  { type: 'revisao',  durationMinutes: 20–30 },
  { type: 'quiz',     durationMinutes: 30–40 },
  { type: 'pratica',  durationMinutes: 20–30 },
]
artifact: consolidação dos artefatos da semana
reviewQuestions: 2 perguntas (1 média + 1 difícil)
```

### Dia de projeto
```
tasks: [
  { type: 'projeto',  durationMinutes: 60–90 },
  { type: 'revisao',  durationMinutes: 20–30 },
]
artifact: entrega do projeto ou parte dele
reviewQuestions: 1 pergunta reflexiva
```

---

## Algoritmo de distribuição de tempo

```
disponívelPorDia = availableHoursPerDay × 60 (minutos)

# Alocação padrão para dia de conteúdo:
leitura:  30% do disponível
prática:  30% do disponível
vídeo:    20% do disponível
quiz:     10% do disponível
revisão:  10% do disponível

# Arredonda para múltiplos de 5
# Garante mínimo de 15 min por tarefa
# Garante máximo de 60 min por tarefa (fatias maiores dividem em subtarefas)
```

---

## Geração de artefatos

Cada artefato é gerado com:

```typescript
StudyArtifact {
  title:       "[Verbo de entrega] + [contexto do dia]"
  type:        inferido pelo conteúdo (planilha para dados, documento para texto...)
  description: o que o estudante deve produzir (2-4 frases)
  template:    estrutura sugerida como string (colunas, seções, etc.)
}
```

**Padrão de titles:**
- Dia de conceito → "Mapa mental: [tema]"
- Dia de processo → "Fluxograma: [processo]"
- Dia de análise → "Relatório de [análise]"
- Dia de criação → "[Documento criado]"
- Dia de avaliação → "Checklist: [avaliação]"

**Regra de negócio:** Todo dia deve ter no máximo 1 artefato. Dias de revisão podem não ter artefato. O projeto final acumula múltiplas entregas.

---

## Progresso e workspace do usuário

```typescript
StudyPlanProgress {
  planId:            string   // referência ao StudyPlan
  userId?:           string   // futuro: após auth
  currentWeek:       number
  currentDay:        number
  completedTaskIds:  string[] // IDs das tarefas concluídas
  completedArtifacts: string[] // títulos dos artefatos entregues
  startedAt:         string  // ISO date
  lastAccessedAt:    string  // ISO date
  percentComplete:   number  // calculado: completedTasks / totalTasks × 100
}
```

O workspace é atualizado pelo usuário via checkbox de tarefas e confirmação de artefato entregue. O `percentComplete` é recalculado a cada update.

---

## Integração com API Interact (futuro)

Quando o usuário usa voz ou chat dentro do workspace:

```
Usuário: "Não entendi o conceito de risco residual do dia 11"
↓
API Interact detecta intenção: EXPLAIN_CONCEPT
↓
Contexto injetado na chamada ao LLM:
  - Plano ativo: GRC 30 dias
  - Dia atual: 11
  - Tópico do dia: Análise de Risco na Prática
  - Artefato do dia: Relatório de Análise de Risco
↓
LLM responde contextualizado ao plano do usuário
```

As intents relevantes para o Study Planner:

| Intent | Uso no Planner |
|--------|---------------|
| `EXPLAIN_CONCEPT` | Explicar um tópico do dia atual |
| `GENERATE_STUDY_PLAN` | Criar um novo plano |
| `SIMULATE_INTERVIEW` | Praticar perguntas do dia 15 ou 19 |
| `REVIEW_ANSWER` | Avaliar resposta do usuário a uma pergunta |
| `OPEN_RESOURCE` | Abrir material recomendado do dia |
| `COMPARE_CONCEPTS` | Comparar frameworks (ex: COBIT vs NIST) |

---

## Workspace em outras áreas

### Programação

```
Input: "Quero aprender Spring Boot do zero"
Copiloto: mapeia trilhas programacao-tracks.ts
Agente:   gera StudyPlan com days referenciando tópicos das trilhas
Resultado: /meu-plano → mostra progresso por tópico + aulas linkadas
```

### Carreira

```
Input: "Quero me preparar para entrevistas Java em 3 semanas"
Copiloto: foca em perguntas de entrevista + portfólio
Agente:   gera 15 dias com simulados diários + artefatos de CV/LinkedIn
Resultado: /meu-plano → checklist de entrevista + scorecard de respostas
```

### Finanças

```
Input: "Quero entender investimentos em renda fixa em 2 semanas"
Copiloto: usa dados mockados do módulo financeiro como base
Agente:   gera 10 dias com conceitos + análise dos ativos do portfólio
Resultado: /meu-plano → plano conectado com /ativos do módulo financeiro
```

---

## Limitações da fase atual (Sprint 13)

| Limitação | Como será resolvida |
|-----------|---------------------|
| Geração é manual (dados mockados) | Sprint 16-17: formulário gera plano por regras |
| Sem persistência de progresso | Sprint 18: banco de dados via Java API |
| Sem IA real na geração | Fase 6: integração com LLM via API Interact |
| Sem personalização por histórico | Fase 6: RAG com histórico do usuário |

---

## Arquivos relacionados

| Arquivo | Conteúdo |
|---------|----------|
| `docs/46_STUDY_PLANNER_SYSTEM.md` | Visão geral do sistema e fases |
| `docs/47_STUDY_PLAN_GRC_EXAMPLE.md` | Exemplo estruturado: GRC 30 dias |
| `docs/48_AGENT_WORKSPACE_GENERATION.md` | Este documento |
| `apps/web/src/types/study-plan.ts` | Tipos TypeScript completos |
| `apps/web/src/data/study-plan-examples.ts` | Dado mock: GRC_30_DAY_PLAN |
| `docs/38_API_INTERACT_SPEECH_TO_TEXT.md` | Intents do API Interact |
