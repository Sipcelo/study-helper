export type ContentLanguage = 'java' | 'typescript' | 'sql' | 'bash' | 'json' | 'yaml';
export type LessonDifficulty = 'easy' | 'medium' | 'hard';

export interface LessonSection {
  title: string;
  content: string;
}

export interface LessonCodeExample {
  title: string;
  language: ContentLanguage;
  code: string;
  explanation: string;
}

export interface CommonMistake {
  title: string;
  wrong: string;
  correct: string;
  explanation: string;
}

export interface LessonChallenge {
  title: string;
  description: string;
  hints: string[];
  solution: string;
}

export interface LessonQuestion {
  question: string;
  answer: string;
  difficulty: LessonDifficulty;
}

export interface NextStep {
  title: string;
  slug: string;
  reason: string;
}

export interface ProgrammingLessonContent {
  id: string;
  trackSlug: string;
  topicSlug: string;
  title: string;
  summary: string;
  explanation: string;
  sections: LessonSection[];
  codeExamples: LessonCodeExample[];
  commonMistakes: CommonMistake[];
  practiceChallenge: LessonChallenge;
  interviewQuestions: LessonQuestion[];
  nextSteps: NextStep[];
  estimatedMinutes: number;
  order: number;
}
