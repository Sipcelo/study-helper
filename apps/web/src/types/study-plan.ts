export type StudyPlanArea =
  | 'programacao'
  | 'carreira'
  | 'financeiro'
  | 'seguranca'
  | 'dados'
  | 'devops'
  | 'gestao'
  | 'personalizado';

export type StudyPlanDifficulty = 'iniciante' | 'intermediario' | 'avancado';

export type StudyTaskType =
  | 'leitura'
  | 'video'
  | 'pratica'
  | 'revisao'
  | 'quiz'
  | 'projeto'
  | 'pesquisa';

export type StudyMaterialType =
  | 'artigo'
  | 'documentacao'
  | 'video'
  | 'livro'
  | 'curso'
  | 'podcast'
  | 'ferramenta';

export type StudyArtifactType =
  | 'documento'
  | 'diagrama'
  | 'codigo'
  | 'planilha'
  | 'apresentacao'
  | 'portfolio';

export type StudyQuestionDifficulty = 'facil' | 'medio' | 'dificil';

export type StudyPlanStatus = 'rascunho' | 'ativo' | 'pausado' | 'concluido';

export type StudyPreferredStyle =
  | 'teoria-pratica'
  | 'projeto'
  | 'entrevista'
  | 'revisao'
  | 'intensivo';

// ─── Componentes atômicos ─────────────────────────────────────────────────────

export interface StudyTask {
  id: string;
  title: string;
  type: StudyTaskType;
  durationMinutes: number;
  description?: string;
  completed: boolean;
}

export interface StudyMaterial {
  title: string;
  type: StudyMaterialType;
  description: string;
  url?: string;
}

export interface StudyArtifact {
  title: string;
  type: StudyArtifactType;
  description: string;
  template?: string;
}

export interface StudyQuestion {
  question: string;
  difficulty: StudyQuestionDifficulty;
  answer?: string;
}

export interface FinalProject {
  title: string;
  description: string;
  deliverables: string[];
  estimatedHours: number;
}

// ─── Estrutura temporal ───────────────────────────────────────────────────────

export interface StudyDay {
  dayNumber: number;
  title: string;
  objective: string;
  tasks: StudyTask[];
  materials: StudyMaterial[];
  artifact?: StudyArtifact;
  reviewQuestions: StudyQuestion[];
  estimatedMinutes: number;
}

export interface StudyWeek {
  weekNumber: number;
  theme: string;
  objective: string;
  days: StudyDay[];
}

// ─── Plano completo ───────────────────────────────────────────────────────────

export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  area: StudyPlanArea;
  targetRole?: string;
  difficulty: StudyPlanDifficulty;
  durationDays: number;
  totalHours: number;
  tags: string[];
  weeks: StudyWeek[];
  finalProject: FinalProject;
  status: StudyPlanStatus;
  createdAt: string;
}

// ─── Contexto de geração (input para o agente) ────────────────────────────────

export interface StudyPlanGenerationInput {
  userGoal: string;
  area: StudyPlanArea;
  currentLevel: StudyPlanDifficulty;
  availableHoursPerDay: number;
  durationDays: number;
  targetRole?: string;
  preferredMaterialTypes?: StudyMaterialType[];
  topics?: string[];
}

// ─── Formulário de planejamento (input do usuário via UI) ────────────────────

export type StudyFormArea =
  | 'programacao'
  | 'carreira'
  | 'financeiro'
  | 'seguranca'
  | 'personalizado';

export type StudyFormLevel = 'iniciante' | 'basico' | 'intermediario';

export interface StudyPlanFormData {
  area: StudyFormArea | '';
  objective: string;
  currentLevel: StudyFormLevel | '';
  availableMinutesPerDay: number;
  durationDays: number;
  preferredStyle: StudyPreferredStyle | '';
  topics: string;
  finalProjectGoal: string;
}

// ─── Workspace (estado de progresso do usuário) ───────────────────────────────

export interface StudyPlanProgress {
  planId: string;
  userId?: string;
  currentWeek: number;
  currentDay: number;
  completedTaskIds: string[];
  completedArtifacts: string[];
  startedAt: string;
  lastAccessedAt: string;
  percentComplete: number;
}
