'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { StudyPlan } from '@/types/study-plan';

export const GRC_PROGRESS_KEY = 'study-helper:study-plan:grc-30-day:progress';

export interface ProgressStats {
  totalTasks: number;
  completedTasks: number;
  totalArtifacts: number;
  completedArtifacts: number;
  totalDays: number;
  completedDays: number;
  percentTasks: number;
  percentArtifacts: number;
  percentDays: number;
  percentOverall: number;
  isComplete: boolean;
  nextPendingStep: {
    kind: 'task' | 'artifact';
    dayNumber: number;
    dayTitle: string;
    title: string;
  } | null;
}

interface StoredProgress {
  completedTaskIds: string[];
  completedArtifactIds: string[];
}

export function useStudyPlanProgress(plan: StudyPlan, progressKey: string = GRC_PROGRESS_KEY) {
  const [mounted, setMounted] = useState(false);
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(new Set());
  const [completedArtifactIds, setCompletedArtifactIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(progressKey);
      if (raw) {
        const stored: StoredProgress = JSON.parse(raw);
        setCompletedTaskIds(new Set(stored.completedTaskIds ?? []));
        setCompletedArtifactIds(new Set(stored.completedArtifactIds ?? []));
      }
    } catch {
      // ignore corrupt storage
    }
    setMounted(true);
  }, [progressKey]);

  useEffect(() => {
    if (!mounted) return;
    try {
      const stored: StoredProgress = {
        completedTaskIds: Array.from(completedTaskIds),
        completedArtifactIds: Array.from(completedArtifactIds),
      };
      localStorage.setItem(progressKey, JSON.stringify(stored));
    } catch {
      // ignore storage errors
    }
  }, [mounted, progressKey, completedTaskIds, completedArtifactIds]);

  const toggleTask = useCallback((taskId: string) => {
    setCompletedTaskIds((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  }, []);

  const toggleArtifact = useCallback((artifactId: string) => {
    setCompletedArtifactIds((prev) => {
      const next = new Set(prev);
      if (next.has(artifactId)) {
        next.delete(artifactId);
      } else {
        next.add(artifactId);
      }
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setCompletedTaskIds(new Set());
    setCompletedArtifactIds(new Set());
  }, []);

  const isTaskCompleted = useCallback(
    (taskId: string) => completedTaskIds.has(taskId),
    [completedTaskIds],
  );

  const isArtifactCompleted = useCallback(
    (artifactId: string) => completedArtifactIds.has(artifactId),
    [completedArtifactIds],
  );

  const stats = useMemo<ProgressStats>(() => {
    const allDays = plan.weeks.flatMap((w) => w.days);
    const allTasks = allDays.flatMap((d) => d.tasks);
    const daysWithArtifacts = allDays.filter((d) => d.artifact);

    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter((t) => completedTaskIds.has(t.id)).length;

    const totalArtifacts = daysWithArtifacts.length;
    const completedArtifactsCount = daysWithArtifacts.filter((d) =>
      completedArtifactIds.has(`artifact-day-${d.dayNumber}`),
    ).length;

    const totalDays = allDays.length;
    const completedDays = allDays.filter(
      (d) => d.tasks.length > 0 && d.tasks.every((t) => completedTaskIds.has(t.id)),
    ).length;

    const pct = (n: number, total: number) => (total === 0 ? 0 : Math.round((n / total) * 100));

    const percentTasks = pct(completedTasks, totalTasks);
    const percentArtifacts = pct(completedArtifactsCount, totalArtifacts);
    const percentDays = pct(completedDays, totalDays);
    const percentOverall = Math.round((percentTasks + percentArtifacts + percentDays) / 3);
    const isComplete =
      totalTasks > 0 &&
      completedTasks === totalTasks &&
      completedArtifactsCount === totalArtifacts;

    const nextPendingDay = allDays.find((day) => {
      const hasPendingTask = day.tasks.some((task) => !completedTaskIds.has(task.id));
      const hasPendingArtifact =
        Boolean(day.artifact) && !completedArtifactIds.has(`artifact-day-${day.dayNumber}`);
      return hasPendingTask || hasPendingArtifact;
    });

    const nextPendingTask = nextPendingDay?.tasks.find((task) => !completedTaskIds.has(task.id));
    const nextPendingStep = nextPendingDay
      ? nextPendingTask
        ? {
          kind: 'task' as const,
          dayNumber: nextPendingDay.dayNumber,
          dayTitle: nextPendingDay.title,
          title: nextPendingTask.title,
        }
        : nextPendingDay.artifact
          ? {
            kind: 'artifact' as const,
            dayNumber: nextPendingDay.dayNumber,
            dayTitle: nextPendingDay.title,
            title: nextPendingDay.artifact.title,
          }
          : null
      : null;

    return {
      totalTasks,
      completedTasks,
      totalArtifacts,
      completedArtifacts: completedArtifactsCount,
      totalDays,
      completedDays,
      percentTasks,
      percentArtifacts,
      percentDays,
      percentOverall,
      isComplete,
      nextPendingStep,
    };
  }, [plan, completedTaskIds, completedArtifactIds]);

  return {
    completedTaskIds,
    completedArtifactIds,
    toggleTask,
    toggleArtifact,
    resetProgress,
    isTaskCompleted,
    isArtifactCompleted,
    mounted,
    stats,
  };
}
