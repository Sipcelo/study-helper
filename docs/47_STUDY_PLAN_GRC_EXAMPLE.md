# 47 — Exemplo de Plano de Estudo: GRC 30 Dias

Classificação: [PLATAFORMA] [CARREIRA]

Documentado na Sprint 13.

---

## O que é este documento

Este documento é o exemplo de referência do Study Planner: um plano de 30 dias para a área de GRC (Governança, Risco e Conformidade) estruturado no formato `StudyPlan`.

Serve para:
1. Validar a estrutura de dados antes de construir a UI
2. Demonstrar como um objetivo vago ("aprender GRC") se transforma em um workspace diário concreto
3. Ser o primeiro exemplo exibido na tela `/meu-plano` (Sprint 14+)

---

## Perfil do estudante-alvo

| Característica | Valor |
|----------------|-------|
| Experiência atual | Profissional de TI (suporte, infra ou dev) |
| Objetivo | Migrar para área de GRC / Segurança da Informação |
| Disponibilidade | 2 horas por dia |
| Duração | 30 dias úteis (~6 semanas) |
| Resultado esperado | Portfólio de artefatos + base para certificação CRISC ou ISO 27001 |

---

## Visão geral do plano

| Semana | Tema | Dias | Foco |
|--------|------|------|------|
| 1 | Fundamentos de GRC | 1–5 | Conceitos: o que é, por que existe, os 3 pilares |
| 2 | Frameworks de GRC | 6–10 | COBIT, ISO 27001, NIST CSF, LGPD |
| 3 | Implementação Prática | 11–15 | Análise de risco, políticas, auditorias, métricas |
| 4 | Carreira e Certificações | 16–20 | Mercado, certificações, LinkedIn, entrevistas |
| 5 | Projeto Final | 21–22 | Programa GRC completo documentado |

**Total estimado: 60 horas de estudo** (2h/dia × 30 dias)

---

## Estrutura de cada dia

Cada dia do plano contém:

```
StudyDay {
  dayNumber: número sequencial
  title: tema do dia
  objective: o que o estudante deve conseguir fazer ao final
  estimatedMinutes: tempo total estimado
  tasks: [
    { type: 'leitura' | 'video' | 'pratica' | 'quiz' | 'pesquisa' | 'projeto' | 'revisao' }
  ]
  materials: [
    { title, type, description }  // referências reais a serem buscadas
  ]
  artifact: {
    title: nome do artefato a entregar
    type: 'documento' | 'planilha' | 'diagrama' | 'portfolio'
    description: o que deve conter
    template?: estrutura sugerida
  }
  reviewQuestions: [
    { question, difficulty }  // perguntas de fixação — sem gabarito imposto
  ]
}
```

---

## Semana 1 — Fundamentos de GRC (resumo)

| Dia | Título | Artefato |
|-----|--------|----------|
| 1 | O que é GRC? | Mapa mental: Os 3 pilares do GRC |
| 2 | Governança de TI | Tabela: Responsabilidades de Governança |
| 3 | Gestão de Riscos | Matriz de Risco pessoal |
| 4 | Conformidade e Regulamentações | Mapa de Obrigações Regulatórias |
| 5 | Revisão + Consolidação | — |

**Ao final da semana 1**, o estudante consegue:
- Explicar o que é GRC em linguagem executiva
- Diferenciar os 3 pilares e sua interdependência
- Construir uma matriz de risco básica

---

## Semana 2 — Frameworks (resumo)

| Dia | Título | Artefato |
|-----|--------|----------|
| 6 | COBIT 2019 | Diagrama: Domínios do COBIT |
| 7 | ISO 27001 | Checklist: Controles do Anexo A |
| 8 | NIST CSF 2.0 | Diagrama: As 6 Funções |
| 9 | LGPD | Mapeamento de dados pessoais |
| 10 | Revisão + Comparativo | Tabela comparativa de frameworks |

**Ao final da semana 2**, o estudante consegue:
- Explicar para que serve cada framework
- Identificar qual framework aplicar em cada contexto
- Fazer uma análise básica de conformidade com a LGPD

---

## Semana 3 — Implementação Prática (resumo)

| Dia | Título | Artefato |
|-----|--------|----------|
| 11 | Análise de Risco na Prática | Relatório de Análise de Risco |
| 12 | Políticas e Procedimentos | Política de Uso Aceitável |
| 13 | Auditorias Internas | Checklist de Auditoria |
| 14 | Indicadores e Métricas | Dashboard de Métricas GRC |
| 15 | Revisão + Simulado de Entrevista | — |

**Ao final da semana 3**, o estudante consegue:
- Executar uma análise de risco usando OCTAVE ou FAIR
- Escrever uma política de segurança profissional
- Conduzir uma auditoria interna básica
- Definir KPIs e KRIs para um programa GRC

---

## Semana 4 — Carreira (resumo)

| Dia | Título | Artefato |
|-----|--------|----------|
| 16 | Mercado de Trabalho | Mapa de Empresas Alvo |
| 17 | Certificações | Roadmap de Certificações |
| 18 | LinkedIn e Portfólio | Portfólio GRC |
| 19 | Simulado de Entrevista | — |
| 20 | Revisão + Planejamento Final | — |

**Ao final da semana 4**, o estudante consegue:
- Identificar empresas alvo e vagas adequadas ao perfil
- Ter um portfólio com 5+ artefatos documentados
- Responder as 20 perguntas mais comuns de entrevista de GRC
- Ter um roadmap de certificações com prazos e custos

---

## Semana 5 — Projeto Final (resumo)

| Dia | Título | Artefato |
|-----|--------|----------|
| 21 | Projeto Final — Parte 1 | Governança + Risco |
| 22 | Projeto Final — Parte 2 | Conformidade + Políticas |

---

## Projeto Final: Programa GRC Simplificado

**Objetivo:** integrar todo o aprendizado em um programa GRC documentado para uma empresa fictícia.

**Entregas obrigatórias:**

| # | Entrega | Formato |
|---|---------|---------|
| 1 | Apresentação executiva (10 slides) | PowerPoint / Google Slides |
| 2 | Relatório de análise de risco (10 riscos) | Planilha |
| 3 | Mapa de conformidade regulatória | Planilha |
| 4 | Política de Segurança da Informação | Documento |
| 5 | Política de Controle de Acesso | Documento |
| 6 | Checklist de auditoria (3 controles) | Planilha |
| 7 | Dashboard de métricas GRC | Planilha |
| 8 | Roadmap de implementação 0-12 meses | Diagrama |

**Estimativa:** 20 horas de trabalho
**Resultado esperado:** portfólio publicável no LinkedIn

---

## Perguntas de entrevista cobertas

O plano prepara o estudante para responder:

**Técnicas:**
- Qual a diferença entre risco inerente e residual?
- O que é uma Declaração de Aplicabilidade (SoA) na ISO 27001?
- Quais são as 6 funções do NIST CSF 2.0?
- Como calcular o nível de risco em uma matriz 5x5?
- O que é um KRI e como difere de um KPI?

**Comportamentais (método STAR):**
- Descreva uma situação onde você identificou um risco antes de ele se materializar.
- Como você convenceria um executivo a investir em segurança da informação?
- Descreva como você implementaria um programa GRC do zero.

---

## Dados mock completos

O plano completo está implementado como `StudyPlan` em:
```
apps/web/src/data/study-plan-examples.ts → GRC_30_DAY_PLAN
```

Contém semanas 1–5 com dias 1–22 detalhados, incluindo tarefas, materiais, artefatos e perguntas de revisão. O projeto final está na propriedade `finalProject`.

---

## Como este plano seria gerado pelo agente

```
1. Usuário: "Quero aprender GRC em 30 dias para mudar de área"

2. Chatbot coleta:
   area: 'seguranca'
   currentLevel: 'iniciante'
   availableHoursPerDay: 2
   durationDays: 30
   targetRole: 'Analista de GRC'

3. Copiloto propõe 5 temas de semana → usuário aprova

4. Agente gera para cada dia:
   - 4 tarefas (leitura + prática + quiz + revisão)
   - 2 materiais (artigo + documentação)
   - 1 artefato com template
   - 2 perguntas de revisão

5. Plano salvo como StudyPlan com status 'ativo'
6. Disponível em /meu-plano
```
