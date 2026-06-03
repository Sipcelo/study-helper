export type InteractDomain = 'programming' | 'career' | 'finance' | 'study' | 'general';

export type InteractIntent =
  | 'EXPLAIN_CONCEPT'
  | 'QUIZ_ME'
  | 'NAVIGATE_TO'
  | 'SEARCH_TOPIC'
  | 'UNKNOWN';

export type InteractActionType = 'OPEN_RESOURCE' | 'SHOW_QUIZ' | 'SEARCH' | 'NONE';

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
