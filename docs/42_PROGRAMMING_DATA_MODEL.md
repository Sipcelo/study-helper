# 42 — Modelo de Dados Conceitual — Módulo Programação

Classificação: [PROGRAMACAO]

Este documento é conceitual. Os tipos TypeScript e entidades Java serão criados quando o módulo for implementado.

---

## Visão geral

```
StudyTrack
  └── StudyTopic[]
        └── StudyLesson[]
              └── CodeExample[]
              └── InterviewQuestion[]
              └── PracticeChallenge[]

StudyProgress (futuro)
  └── userId
  └── trackId
  └── completedTopics[]

VoiceInteraction (futuro — API Interact)
  └── transcription
  └── intent
  └── domain
  └── response
```

---

## StudyTrack — Trilha de Aprendizado

Representa uma trilha completa (ex: "Java Essencial", "Spring Boot").

```typescript
interface StudyTrack {
  id: string                    // 'java-essencial', 'spring-boot'
  slug: string                  // URL-friendly
  title: string                 // 'Java Essencial'
  description: string           // descrição curta para o card
  longDescription: string       // descrição completa da página da trilha
  icon: string                  // emoji ou nome de ícone
  level: TrackLevel             // 'beginner' | 'intermediate' | 'advanced'
  estimatedHours: number        // tempo estimado em horas
  prerequisites: string[]       // ids de trilhas pré-requisito
  tags: string[]                // ['java', 'oop', 'backend']
  topics: StudyTopic[]
  order: number                 // posição na ordem recomendada
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

type TrackLevel = 'beginner' | 'intermediate' | 'advanced'
```

---

## StudyTopic — Tópico dentro de uma Trilha

Representa um tópico individual (ex: "Exceções em Java").

```typescript
interface StudyTopic {
  id: string                    // 'java-excecoes'
  trackId: string               // referência à trilha pai
  slug: string
  title: string                 // 'Exceções em Java'
  subtitle: string              // 'Como lidar com erros sem travar a aplicação'
  order: number                 // posição dentro da trilha
  contextExplanation: string    // "Por que isso existe?"
  conceptSummary: string        // explicação simplificada
  analogyOrDiagram: string      // analogia visual ou diagrama textual
  examples: CodeExample[]
  interviewQuestions: InterviewQuestion[]
  challenges: PracticeChallenge[]
  furtherLinks: ExternalLink[]
  estimatedMinutes: number
  isPublished: boolean
}
```

---

## StudyLesson — Aula dentro de um Tópico (futuro)

Para quando o conteúdo for expandido em sub-aulas.

```typescript
interface StudyLesson {
  id: string
  topicId: string
  title: string
  content: string               // markdown
  order: number
  type: LessonType              // 'reading' | 'video' | 'exercise' | 'quiz'
  durationMinutes: number
}

type LessonType = 'reading' | 'video' | 'exercise' | 'quiz'
```

---

## CodeExample — Exemplo de Código

```typescript
interface CodeExample {
  id: string
  topicId: string
  title: string                 // 'Criando um Controller básico'
  language: CodeLanguage        // 'java' | 'typescript' | 'sql' | 'bash'
  code: string                  // código completo
  explanation: string           // o que o código demonstra
  highlights: string[]          // linhas ou trechos para destacar
  context: string               // 'spring-boot' | 'pure-java' | etc.
  order: number
}

type CodeLanguage = 'java' | 'typescript' | 'sql' | 'bash' | 'json' | 'yaml'
```

---

## InterviewQuestion — Pergunta de Entrevista

```typescript
interface InterviewQuestion {
  id: string
  topicId?: string              // opcional — pode existir sem tópico
  question: string              // 'Qual a diferença entre @Controller e @RestController?'
  answer: string                // resposta completa e didática
  shortAnswer: string           // resposta de 1-2 linhas
  difficulty: QuestionDifficulty
  tags: string[]                // ['spring-boot', 'annotations', 'rest']
  relatedQuestions: string[]    // ids de perguntas relacionadas
  source: string                // 'bootcamp' | 'mercado' | 'comunidade'
}

type QuestionDifficulty = 'easy' | 'medium' | 'hard'
```

---

## PracticeChallenge — Desafio Prático

```typescript
interface PracticeChallenge {
  id: string
  topicId: string
  title: string                 // 'Crie um endpoint GET /produtos'
  description: string           // instrução completa
  difficulty: QuestionDifficulty
  hints: string[]               // dicas progressivas
  solution: string              // código solução (expandível)
  testCriteria: string[]        // como saber se está correto
  type: ChallengeType           // 'code' | 'conceptual' | 'refactor' | 'debug'
}

type ChallengeType = 'code' | 'conceptual' | 'refactor' | 'debug'
```

---

## ExternalLink — Link para Aprofundar

```typescript
interface ExternalLink {
  title: string
  url: string
  type: LinkType               // 'docs' | 'video' | 'article' | 'github'
  language: 'pt' | 'en'
}

type LinkType = 'docs' | 'video' | 'article' | 'github' | 'course'
```

---

## StudyProgress — Progresso do Usuário (futuro)

Depende de autenticação — não implementar no MVP.

```typescript
interface StudyProgress {
  userId: string
  trackId: string
  completedTopicIds: string[]
  startedAt: string
  lastAccessedAt: string
  completionPercent: number     // calculado, não armazenado
}
```

---

## VoiceInteraction — Interação por Voz (futuro — API Interact)

Representa uma sessão de interação com a API Interact.

```typescript
interface VoiceInteraction {
  id: string
  userId?: string               // opcional antes de autenticação
  sessionId: string
  transcription: string         // texto transcrito do áudio
  intent: IntentType            // classificação da intenção
  domain: InteractDomain        // domínio da pergunta
  response: InteractResponse    // resposta estruturada da API
  createdAt: string
}

type IntentType =
  | 'EXPLAIN_CONCEPT'
  | 'GENERATE_STUDY_PLAN'
  | 'SIMULATE_INTERVIEW'
  | 'REVIEW_ANSWER'
  | 'OPEN_RESOURCE'
  | 'COMPARE_CONCEPTS'

type InteractDomain = 'PROGRAMACAO' | 'CARREIRA' | 'ESTUDOS' | 'FINANCAS'

interface InteractResponse {
  type: string
  title: string
  content: string
  relatedConcepts?: string[]
  studyLink?: string
}
```

---

## Dados mockados — estrutura para Fase 1

Para a primeira versão com dados estáticos, os mocks terão:

```
apps/web/src/data/
  programming-tracks.ts    ← MOCK_TRACKS: StudyTrack[]
  programming-topics.ts    ← MOCK_TOPICS: StudyTopic[]
  interview-questions.ts   ← MOCK_INTERVIEW_QUESTIONS: InterviewQuestion[]
```

O mesmo padrão do módulo financeiro (`assets.ts`) será replicado — dados hardcoded com estrutura limpa.

---

## Entidade Java equivalente (API futura)

Para quando o backend Java for implementado:

```java
@Entity
@Table(name = "study_tracks")
public class StudyTrack {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String slug;
    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private TrackLevel level;

    private Integer estimatedHours;
    private Integer order;
    private Boolean isPublished;

    @OneToMany(mappedBy = "track", cascade = CascadeType.ALL)
    private List<StudyTopic> topics;
}
```

Ver direção do backend em: `docs/37_JAVA_BACKEND_DIRECTION.md`
