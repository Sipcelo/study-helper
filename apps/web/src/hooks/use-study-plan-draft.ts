'use client';

import { useState, useEffect, useCallback } from 'react';
import type { StudyPlanFormData } from '@/types/study-plan';
import { loadPlannerContext, clearPlannerContext, domainToArea, extractObjective } from '@/lib/study-planner-context';

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
  const [loadedFromPlannerContext, setLoadedFromPlannerContext] = useState(false);

  // Load on mount — checks localStorage draft first, then Interact context
  useEffect(() => {
    let merged: StudyPlanFormData = { ...INITIAL_FORM };
    let hasContent = false;

    // 1. Try loading from localStorage draft
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed: Partial<StudyPlanFormData> = JSON.parse(raw);
        merged = { ...merged, ...parsed };
        hasContent = merged.area !== '' || merged.objective.trim().length > 0;
      }
    } catch {
      // ignore corrupt storage
    }

    // 2. Try loading from Interact context (sessionStorage) — overrides draft
    const ctx = loadPlannerContext();
    if (ctx) {
      merged.area = domainToArea(ctx.domain) as StudyPlanFormData['area'];
      merged.objective = extractObjective(ctx.input);
      // Preencher topics com o objetivo completo para referencia
      if (!merged.topics) {
        merged.topics = ctx.input;
      }
      hasContent = true;
      setLoadedFromPlannerContext(true);
      // Consumiu o contexto — limpar para nao re-aplicar em proximos loads
      clearPlannerContext();
    }

    if (hasContent) {
      setDraft(merged);
      setLoadedFromStorage(true);
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
    setLoadedFromPlannerContext(false);
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      // ignore
    }
  }, []);

  const hasDraft = isLoaded && (draft.area !== '' || draft.objective.trim().length > 0);

  return {
    draft,
    updateDraft,
    resetDraft,
    hasDraft,
    isLoaded,
    loadedFromStorage,
    loadedFromPlannerContext,
  };
}
