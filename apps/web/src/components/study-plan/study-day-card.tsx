'use client';

import { useState } from 'react';
import type { StudyDay } from '@/types/study-plan';
import { StudyTaskList } from './study-task-list';
import { StudyArtifactList } from './study-artifact-list';

interface StudyDayCardProps {
  day: StudyDay;
  completedTaskIds: Set<string>;
  completedArtifactIds: Set<string>;
  onToggleTask: (taskId: string) => void;
  onToggleArtifact: (artifactId: string) => void;
}

function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

export function StudyDayCard({
  day,
  completedTaskIds,
  completedArtifactIds,
  onToggleTask,
  onToggleArtifact,
}: StudyDayCardProps) {
  const [expanded, setExpanded] = useState(false);

  const artifactId = `artifact-day-${day.dayNumber}`;
  const isArtifactDone = completedArtifactIds.has(artifactId);
  const completedDayTasks = day.tasks.filter((t) => completedTaskIds.has(t.id)).length;
  const isDayComplete =
    day.tasks.length > 0 && completedDayTasks === day.tasks.length;

  return (
    <div
      className={`rounded-lg border overflow-hidden ${
        isDayComplete
          ? 'border-emerald-800/40 bg-emerald-950/10'
          : 'border-slate-800 bg-slate-900/40'
      }`}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-4 py-3 flex items-start justify-between gap-3 hover:bg-slate-800/30 transition-colors"
      >
        <div className="flex items-start gap-3 min-w-0">
          <span className="text-xs font-mono text-slate-600 mt-0.5 shrink-0 min-w-[2rem]">
            {String(day.dayNumber).padStart(2, '0')}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-slate-200">{day.title}</p>
              {isDayComplete && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-400">
                  Concluído ✓
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{day.objective}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {day.artifact && (
            <span
              className={`text-xs px-1.5 py-0.5 rounded border hidden sm:block ${
                isArtifactDone
                  ? 'border-amber-700 text-amber-500 bg-amber-950/30'
                  : 'border-slate-700 text-slate-600'
              }`}
            >
              artefato
            </span>
          )}
          <span className="text-xs text-slate-500 tabular-nums">
            {completedDayTasks}/{day.tasks.length}
          </span>
          <span className="text-xs text-slate-500">{formatMinutes(day.estimatedMinutes)}</span>
          <span className="text-slate-600 text-xs">{expanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-slate-800 pt-4 space-y-5">
          <p className="text-sm text-slate-400 leading-relaxed">{day.objective}</p>
          <StudyTaskList
            tasks={day.tasks}
            materials={day.materials}
            completedTaskIds={completedTaskIds}
            onToggleTask={onToggleTask}
          />
          <StudyArtifactList
            artifact={day.artifact}
            reviewQuestions={day.reviewQuestions}
            artifactId={artifactId}
            isArtifactCompleted={isArtifactDone}
            onToggleArtifact={onToggleArtifact}
          />
        </div>
      )}
    </div>
  );
}
