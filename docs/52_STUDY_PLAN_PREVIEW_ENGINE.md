# 52 — Motor de Preview do Study Planner

## Sprint 17 — Rascunho Local e Preview Inteligente

**Módulo:** [PLATAFORMA] [CARREIRA] [PROGRAMACAO]  
**Status:** Concluído  
**Data:** 2026-05-27

---

## Objetivo

Tornar o preview em `/planejar-estudos` inteligente: variar a estrutura sugerida por área, estilo e duração, calcular intensidade, gerar artefatos sugeridos, resultado esperado e alertas contextuais. Persistir o formulário como rascunho via localStorage.

---

## Hook: `useStudyPlanDraft`

**Arquivo:** `apps/web/src/hooks/use-study-plan-draft.ts`  
**Chave localStorage:** `study-helper:study-planner:draft`

### Estados

| Estado | Tipo | Descrição |
|--------|------|-----------|
| `draft` | `StudyPlanFormData` | Dados atuais do formulário |
| `isLoaded` | `boolean` | `true` após leitura do localStorage |
| `loadedFromStorage` | `boolean` | `true` se encontrou rascunho salvo |

### Funções exportadas

| Função | Descrição |
|--------|-----------|
| `updateDraft(key, value)` | Atualiza um campo e persiste |
| `resetDraft()` | Limpa tudo (state + localStorage) |
| `hasDraft` | `true` se area ou objective preenchidos |
| `isLoaded` | `true` após hidratação do cliente |
| `loadedFromStorage` | Indica se veio de sessão anterior |

### Prevenção de hydration mismatch

O formulário renderiza com `INITIAL_FORM` no servidor. O `useEffect` que lê o localStorage só roda no cliente. Enquanto `isLoaded === false`, os badges de rascunho não aparecem. Depois da primeira renderização, o estado atualiza silenciosamente com os valores salvos.

---

## Utilitário: `generateStudyPlanPreview`

**Arquivo:** `apps/web/src/lib/study-planner/generate-study-plan-preview.ts`

### Input

```typescript
generateStudyPlanPreview(data: StudyPlanFormData): StudyPlanPreviewResult
```

### Output: `StudyPlanPreviewResult`

```typescript
{
  weeklyStructure: WeekPreview[];     // [{weekNumber, theme}]
  estimatedTotalHours: number;        // (minutos/dia × dias) / 60
  intensityLevel: IntensityLevel;     // leve | moderada | forte | intensiva
  intensityLabel: string;             // label em português
  recommendedPace: string;            // descrição do ritmo
  suggestedArtifacts: string[];       // até 4 artefatos por área
  suggestedFinalOutcome: string;      // resultado esperado por área
  warnings: string[];                 // alertas contextuais
}
```

---

## Fases por área

| Área | Fase 1 | Fase 2 | Fase 3 | Fase 4 |
|------|--------|--------|--------|--------|
| Programação | Fundamentos e sintaxe | Prática com código | Mini projeto | Revisão e entrevista técnica |
| Carreira Junior | Posicionamento pessoal | Currículo e LinkedIn | Portfólio e projetos | Simulações de entrevista |
| Finanças | Conceitos fundamentais | Leitura de indicadores | Estudo de ativos | Análise e carteira final |
| Segurança / GRC | Fundamentos técnicos | Riscos e controles | Frameworks (ISO/NIST/GRC) | Relatório e comunicação |
| Personalizado | Fundamentos | Prática guiada | Projeto pessoal | Revisão e consolidação |

### Distribuição por semanas

- 1 semana: fase 1 + fase 4 comprimidas
- 2 semanas: fase 1 + fase 4
- 3 semanas: fases 1, 2, 4
- 4 semanas: todas as 4 fases
- 5+ semanas: fases 2 e 3 expandidas nas semanas intermediárias

---

## Overlay de estilo

| Estilo | Modificação aplicada |
|--------|---------------------|
| `projeto` | Semanas intermediárias recebem sufixo "· entregável" |
| `entrevista` | Última semana vira "Simulações e revisão técnica" |
| Demais | Sem modificação de tema |

---

## Níveis de intensidade

| Nível | Condição (min/dia) | Label | Ritmo sugerido |
|-------|-------------------|-------|----------------|
| `leve` | < 30 | Leve | 1–2 tópicos por dia, ritmo tranquilo |
| `moderada` | 30–59 | Moderada | 2–3 tópicos por dia com exercícios práticos |
| `forte` | 60–120 | Forte | 3–4 tópicos com projeto paralelo |
| `intensiva` | > 120 | Intensiva | Imersão total — blocos de tempo contínuos |

---

## Alertas gerados

| Condição | Alerta |
|----------|--------|
| `availableMinutesPerDay <= 15` | "Com apenas 15 min/dia, reduza o escopo ou aumente a duração." |
| `availableMinutesPerDay < 30` | "Menos de 30 min/dia — o aprendizado será mais lento." |
| `preferredStyle === 'intensivo'` | "Plano intensivo: reserve tempo obrigatório para revisão." |
| `intensivo + < 60 min/dia` | "Modo intensivo com pouco tempo — pode ser difícil manter o ritmo." |
| `durationDays < 14` | "Duração muito curta para cobrir muitos tópicos." |
| Objetivo > 12 palavras + ≤ 21 dias | "Objetivo amplo para poucos dias — considere focar em um aspecto específico." |

---

## Limitações atuais

- Estrutura não considera tópicos informados pelo usuário
- Artefatos são fixos por área (não variam por objetivo)
- Sem variação de fase por nível atual
- Preview é mockado — não há chamada de API real
- O motor não persiste: recalcula a cada render

---

## Conexão futura com API Interact

Quando disponível, a API Interact receberá `StudyPlanFormData` e retornará um `StudyPlan` completo. O motor atual serve como fallback e referência de estrutura esperada. A função `generateStudyPlanPreview` pode ser mantida como preview client-side enquanto a geração real processa no backend.
