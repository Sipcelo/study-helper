export type InteractDomain = 'programming' | 'career' | 'finance' | 'study' | 'general';

// Alinhado com Intent.java:
// EXPLAIN_CONCEPT, GENERATE_STUDY_PLAN, SIMULATE_INTERVIEW,
// REVIEW_ANSWER, OPEN_RESOURCE, COMPARE_CONCEPTS, UNKNOWN
export type InteractIntent =
  | 'EXPLAIN_CONCEPT'
  | 'GENERATE_STUDY_PLAN'
  | 'SIMULATE_INTERVIEW'
  | 'REVIEW_ANSWER'
  | 'OPEN_RESOURCE'
  | 'COMPARE_CONCEPTS'
  | 'UNKNOWN';

// Alinhado com ActionType.java:
// OPEN_RESOURCE, SHOW_EXPLANATION, START_STUDY_PLAN, START_INTERVIEW, NONE
export type InteractActionType =
  | 'OPEN_RESOURCE'
  | 'SHOW_EXPLANATION'
  | 'START_STUDY_PLAN'
  | 'START_INTERVIEW'
  | 'NONE';

export interface InteractAction {
  type: InteractActionType;
  target: string | null;
}

export interface InteractTextRequest {
  input: string;
  domain: InteractDomain;
}

export interface InteractTextResponse {
  transcript: string;
  intent: InteractIntent;
  domain: string;
  answer: string;
  action: InteractAction;
}

export interface InteractHistoryItem {
  id: string;
  input: string;
  domain: string;
  intent: InteractIntent;
  actionType: InteractActionType;
  resourceUrl: string | null;
  createdAt: string;
}