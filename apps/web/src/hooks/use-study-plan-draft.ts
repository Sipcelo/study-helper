'use client';

import { useState, useEffect, useCallback } from 'react';
import type { StudyPlanFormData } from '@/types/study-plan';

const DRAFT_KEY = 'study-helper:study-planner:draft';

export const INITIAL_FORM: StudyPlanFormData = {
  area: '',
  objective: '',
  currentLevel: '',
  availableMinutesPerDay: 60,
  durationDays: 30,
  preferredStyle: '',
  topics: '',
  finalProjectGoal: '',
};

export function useStudyPlanDraft() {
  const [draft, setDraft] = useState<StudyPlanFormData>(INITIAL_FORM);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);

  // Load on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed: Partial<StudyPlanFormData> = JSON.parse(raw);
        const merged: StudyPlanFormData = { ...INITIAL_FORM, ...parsed };
        const hasContent = merged.area !== '' || merged.objective.trim().length > 0;
        if (hasContent) {
          setDraft(merged);
          setLoadedFromStorage(true);
        }
      }
    } catch {
      // ignore corrupt storage
    }
    setIsLoaded(true);
  }, []);

  // Persist after load
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // ignore storage errors
    }
  }, [isLoaded, draft]);

  const updateDraft = useCallback(<K extends keyof StudyPlanFormData>(
    key: K,
    value: StudyPlanFormData[K],
  ) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(INITIAL_FORM);
    setLoadedFromStorage(false);
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      // ignore
    }
  }, []);

  const hasDraft = isLoaded && (draft.area !== '' || draft.objective.trim().length > 0);

  return { draft, updateDraft, resetDraft, hasDraft, isLoaded, loadedFromStorage };
}
