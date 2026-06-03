export type StudyTrackLevel = 'beginner' | 'intermediate' | 'advanced';
export type StudyTopicStatus = 'not_started' | 'in_progress' | 'completed';
export type CodeLanguage = 'java' | 'typescript' | 'sql' | 'bash' | 'json' | 'yaml';
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';
export type ChallengeType = 'code' | 'conceptual' | 'refactor' | 'debug';

export interface StudyTopic {
  id: string;
  slug: string;
  title: string;
  description: string;
  order: number;
}

export interface StudyTrack {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  icon: string;
  level: StudyTrackLevel;
  estimatedHours: number;
  tags: string[];
  prerequisites: string[];
  careerRelevance: string;
  portfolioOutcome: string;
  topics: StudyTopic[];
  order: number;
}

export interface StudyLesson {
  id: string;
  topicId: string;
  title: string;
  content: string;
  order: number;
  type: 'reading' | 'video' | 'exercise' | 'quiz';
  durationMinutes: number;
}

export interface CodeExample {
  id: string;
  topicId: string;
  title: string;
  language: CodeLanguage;
  code: string;
  explanation: string;
  order: number;
}

export interface InterviewQuestion {
  id: string;
  topicId?: string;
  question: string;
  answer: string;
  shortAnswer: string;
  difficulty: QuestionDifficulty;
  tags: string[];
}

export interface PracticeChallenge {
  id: string;
  topicId: string;
  title: string;
  description: string;
  difficulty: QuestionDifficulty;
  hints: string[];
  type: ChallengeType;
}
