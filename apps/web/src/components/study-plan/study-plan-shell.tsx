'use client';

import type { StudyPlan } from '@/types/study-plan';
import { useStudyPlanProgress, GRC_PROGRESS_KEY } from '@/hooks/use-study-plan-progress';
import { StudyProgressSummary } from './study-progress-summary';
import { StudyWeekBrowser } from './study-week-browser';

interface StudyPlanShellProps {
  plan: StudyPlan;
  progressKey?: string;
}

export function StudyPlanShell({ plan, progressKey = GRC_PROGRESS_KEY }: StudyPlanShellProps) {
  const progress = useStudyPlanProgress(plan, progressKey);

  return (
    <div className="space-y-8">
      <StudyProgressSummary stats={progress.stats} onReset={progress.resetProgress} />
      <StudyWeekBrowser
        weeks={plan.weeks}
        completedTaskIds={progress.completedTaskIds}
        completedArtifactIds={progress.completedArtifactIds}
        onToggleTask={progress.toggleTask}
        onToggleArtifact={progress.toggleArtifact}
      />
    </div>
  );
}
