import type { StudyPlan } from '@/types/study-plan';

const STORAGE_KEY = 'study-helper:study-planner:generated-plan';

export function saveGeneratedPlan(plan: StudyPlan): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  } catch {
    // ignore storage errors
  }
}

export function getGeneratedPlan(): StudyPlan | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StudyPlan;
  } catch {
    return null;
  }
}

export function clearGeneratedPlan(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function hasGeneratedPlan(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

export function getGeneratedPlanProgressKey(planId: string): string {
  return `study-helper:study-plan:${planId}:progress`;
}
