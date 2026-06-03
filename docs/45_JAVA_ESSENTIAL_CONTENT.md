# 45 — Conteúdo Real: Trilha Java Essencial

Classificação: [PROGRAMACAO]

Implementado na Sprint 12. Auditado na Sprint 12.1.

---

## Objetivo

Criar páginas individuais de aula para a trilha `java-essencial`, com conteúdo didático completo:
- explicação conceitual
- seções aprofundadas
- exemplos de código com syntax highlight
- erros comuns (errado × correto)
- mini desafio interativo com dicas e solução
- perguntas de entrevista com accordion de resposta
- navegação entre aulas (anterior / próxima)

---

## Arquivos criados

| Arquivo | Tipo | Função |
|---------|------|--------|
| `src/types/programming-content.ts` | Tipos | ProgrammingLessonContent e tipos auxiliares |
| `src/data/programming-lessons/java-essential-lessons.ts` | Dados | 6 aulas completas da trilha java-essencial |
| `src/lib/programming/get-programming-lessons.ts` | Utilitários | getProgrammingLesson, getNextLesson, etc. |
| `src/app/programacao/[slug]/[lessonSlug]/page.tsx` | Rota | /programacao/:track/:lesson |
| `src/components/programming/programming-lesson-page.tsx` | Componente | Layout completo da aula |
| `src/components/programming/code-block.tsx` | Componente | Bloco de código com copiar |
| `src/components/programming/common-mistakes.tsx` | Componente | Seção de erros comuns |
| `src/components/programming/practice-challenge.tsx` | Componente | Mini desafio com dicas/solução |
| `src/components/programming/interview-questions.tsx` | Componente | Perguntas de entrevista com accordion |

---

## Arquivos atualizados

| Arquivo | O que mudou |
|---------|-------------|
| `src/components/programming/programming-track-detail.tsx` | Tópicos com aula viram links; tópicos sem aula ficam opacos com "Em breve" |

---

## 6 Aulas da trilha java-essencial

| # | Slug | Título | Tempo |
|---|------|--------|-------|
| 1 | `tipos-e-variaveis` | Tipos e Variáveis | 25 min |
| 2 | `strings` | Strings | 30 min |
| 3 | `condicionais-e-loops` | Condicionais e Loops | 30 min |
| 4 | `arrays-e-colecoes` | Arrays e Coleções | 35 min |
| 5 | `oop` | Orientação a Objetos | 40 min |
| 6 | `excecoes` | Exceções | 35 min |

Total: ~195 minutos de conteúdo

---

## URLs geradas

```
/programacao/java-essencial/tipos-e-variaveis
/programacao/java-essencial/strings
/programacao/java-essencial/condicionais-e-loops
/programacao/java-essencial/arrays-e-colecoes
/programacao/java-essencial/oop
/programacao/java-essencial/excecoes
```

---

## Estrutura de cada aula (ProgrammingLessonContent)

```typescript
{
  id: string;
  trackSlug: string;       // 'java-essencial'
  topicSlug: string;       // slug usado na URL
  title: string;
  summary: string;         // exibido no header da aula
  explanation: string;     // conceito principal
  sections: LessonSection[];       // 3 seções aprofundadas
  codeExamples: LessonCodeExample[]; // 3 exemplos com código + explicação
  commonMistakes: CommonMistake[];   // 3 erros comuns (errado × correto)
  practiceChallenge: LessonChallenge; // 1 desafio com dicas e solução
  interviewQuestions: LessonQuestion[]; // 2-3 perguntas de entrevista
  nextSteps: NextStep[];           // 2 próximos passos
  estimatedMinutes: number;
  order: number;
}
```

---

## Componentes interativos

### CodeBlock
- Exibe código com fonte mono, fundo `slate-900`
- Botão "Copiar" com feedback "Copiado!" via clipboard API
- Label da linguagem (Java, TypeScript, etc.)
- Explicação opcional abaixo do bloco

### PracticeChallenge
- Toggle para mostrar/ocultar dicas numeradas
- Toggle separado para mostrar/ocultar solução
- Solução renderizada via CodeBlock

### InterviewQuestions
- Accordion: clique para revelar resposta
- Badge de dificuldade (Fácil / Médio / Difícil) com cores distintas

---

## Navegação entre aulas

A página de aula exibe:
- Breadcrumb: Programação → Nome da Trilha → Nome da Aula
- Header com ícone da trilha, número da aula, tempo estimado
- Rodapé com links anterior / próximo (ou "Voltar para a trilha" se for a primeira/última)

---

## Como adicionar uma nova aula

1. Abrir o arquivo de dados da trilha correspondente (ex: `java-essential-lessons.ts`)
2. Adicionar o objeto `ProgrammingLessonContent` ao array com `order` correto
3. O `topicSlug` deve corresponder ao `slug` do tópico em `programming-tracks.ts`
4. Registrar a trilha em `get-programming-lessons.ts` se for uma trilha nova:

```typescript
const TRACK_LESSONS: Record<string, ProgrammingLessonContent[]> = {
  'java-essencial': JAVA_ESSENTIAL_LESSONS,
  'nova-trilha': NOVA_TRILHA_LESSONS, // adicionar aqui
};
```

---

## Como adicionar uma nova trilha com aulas

1. Criar `src/data/programming-lessons/nome-trilha-lessons.ts`
2. Exportar `NOME_TRILHA_LESSONS` (array) e `NOME_TRILHA_LESSON_MAP` (Record)
3. Registrar em `get-programming-lessons.ts` nas duas constantes (TRACK_LESSONS e TRACK_LESSON_MAPS)
4. A rota `/programacao/[slug]/[lessonSlug]` já suporta qualquer trilha automaticamente

---

## Auditoria Sprint 12.1 — Inconsistências encontradas e corrigidas

### Discrepância de slugs (documentação vs implementação)

A Sprint 12.1 referenciou os slugs de validação:
`variaveis-e-tipos`, `operadores`, `condicionais`, `loops`, `metodos`, `orientacao-a-objetos-basica`

Os slugs reais implementados na Sprint 12 são:
`tipos-e-variaveis`, `strings`, `condicionais-e-loops`, `arrays-e-colecoes`, `oop`, `excecoes`

Os slugs reais refletem os `slug` definidos nos tópicos em `programming-tracks.ts` — que é a fonte da verdade.

### Bug corrigido: nextStep com slug de outra trilha

`excecoes` tinha `nextSteps[1] = { slug: 'spring-boot' }`. Isso gerava o link `/programacao/java-essencial/spring-boot` (inválido — Spring Boot é uma trilha separada, não uma lição de java-essencial). Removido.

### Criado: página not-found global

`apps/web/src/app/not-found.tsx` — exibida quando qualquer rota não existe. Importante porque forward references em `nextSteps` (ex: `heranca-e-polimorfismo`) ainda não têm lição e levam a 404. Agora o 404 é estilizado e direciona o usuário de volta para `/programacao`.

### Estado dos links na página da trilha

| Tópico | Status |
|--------|--------|
| `por-que-java` | Em breve (opaco) |
| `tipos-e-variaveis` | Link ativo → `/programacao/java-essencial/tipos-e-variaveis` |
| `strings` | Link ativo |
| `condicionais-e-loops` | Link ativo |
| `arrays-e-colecoes` | Link ativo |
| `oop` | Link ativo |
| `heranca-e-polimorfismo` | Em breve (opaco) |
| `interfaces` | Em breve (opaco) |
| `excecoes` | Link ativo |
| `generics` | Em breve (opaco) |
| `streams-e-lambda` | Em breve (opaco) |
| `optional` | Em breve (opaco) |

### Arquivos alterados na Sprint 12.1

| Arquivo | Alteração |
|---------|-----------|
| `src/data/programming-lessons/java-essential-lessons.ts` | Removido nextStep `spring-boot` da lição `excecoes` |
| `src/app/not-found.tsx` | Criado — página 404 estilizada global |

---

## Próximos passos

| Sprint | Entrega |
|--------|---------|
| Sprint 13 | Banco de perguntas de entrevista filtráveis por trilha e dificuldade |
| Sprint 13 | Página /programacao/carreira-junior com checklist de vaga junior |
| Sprint 14 | Trilha spring-boot com aulas reais |
| Sprint 14 | Trilha rest-api com aulas reais |
| Fase 5 | ProgrammingProvider pattern (mock → API Java) |
| Fase 6 | Integração com API Interact (voz) |

---

## Como rodar localmente

```bash
pnpm --filter web dev

# Acessar
http://localhost:3000/programacao/java-essencial
http://localhost:3000/programacao/java-essencial/tipos-e-variaveis
http://localhost:3000/programacao/java-essencial/strings
http://localhost:3000/programacao/java-essencial/condicionais-e-loops
http://localhost:3000/programacao/java-essencial/arrays-e-colecoes
http://localhost:3000/programacao/java-essencial/oop
http://localhost:3000/programacao/java-essencial/excecoes
```
