'use client';

import { useState } from 'react';
import type { StudyWeek } from '@/types/study-plan';
import { StudyWeekCard } from './study-week-card';

interface StudyWeekBrowserProps {
  weeks: StudyWeek[];
  completedTaskIds: Set<string>;
  completedArtifactIds: Set<string>;
  onToggleTask: (taskId: string) => void;
  onToggleArtifact: (artifactId: string) => void;
}

export function StudyWeekBrowser({
  weeks,
  completedTaskIds,
  completedArtifactIds,
  onToggleTask,
  onToggleArtifact,
}: StudyWeekBrowserProps) {
  const [activeWeek, setActiveWeek] = useState<number | null>(null);

  const displayed = activeWeek === null ? weeks : weeks.filter((w) => w.weekNumber === activeWeek);

  return (
    <div className="space-y-6">
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveWeek(null)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            activeWeek === null
              ? 'bg-amber-600 border-amber-500 text-white'
              : 'border-slate-700 text-slate-400 hover:border-amber-600 hover:text-amber-400'
          }`}
        >
          Todas as semanas
        </button>
        {weeks.map((w) => (
          <button
            key={w.weekNumber}
            onClick={() => setActiveWeek(w.weekNumber)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              activeWeek === w.weekNumber
                ? 'bg-amber-600 border-amber-500 text-white'
                : 'border-slate-700 text-slate-400 hover:border-amber-600 hover:text-amber-400'
            }`}
          >
            Semana {w.weekNumber}
          </button>
        ))}
      </div>

      {activeWeek !== null && (
        <p className="text-sm text-slate-500">
          Exibindo semana {activeWeek} de {weeks.length}
        </p>
      )}

      {/* Weeks */}
      <div className="space-y-8">
        {displayed.map((week) => (
          <StudyWeekCard
            key={week.weekNumber}
            week={week}
            completedTaskIds={completedTaskIds}
            completedArtifactIds={completedArtifactIds}
            onToggleTask={onToggleTask}
            onToggleArtifact={onToggleArtifact}
          />
        ))}
      </div>
    </div>
  );
}
