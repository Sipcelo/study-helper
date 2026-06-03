export type EducationLevel = 'beginner' | 'intermediate' | 'advanced';

export interface EducationConcept {
  id: string;
  label: string;
  explanation: string;
}

export interface StudyQuestion {
  question: string;
  hint?: string;
  level: EducationLevel;
}

export interface AssetEducation {
  assetId: string;
  summary: string;
  whyItMovesUp: string[];
  whyItMovesDown: string[];
  mainRisks: string[];
  relatedConcepts: EducationConcept[];
  beginnerExplanation: string;
  practicalExample: string;
  studyQuestions: StudyQuestion[];
}
