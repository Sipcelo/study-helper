import type { StudyWeek } from '@/types/study-plan';
import { StudyDayCard } from './study-day-card';

interface StudyWeekCardProps {
  week: StudyWeek;
  completedTaskIds: Set<string>;
  completedArtifactIds: Set<string>;
  onToggleTask: (taskId: string) => void;
  onToggleArtifact: (artifactId: string) => void;
}

export function StudyWeekCard({
  week,
  completedTaskIds,
  completedArtifactIds,
  onToggleTask,
  onToggleArtifact,
}: StudyWeekCardProps) {
  const totalTasks = week.days.reduce((sum, d) => sum + d.tasks.length, 0);
  const completedTasksInWeek = week.days
    .flatMap((d) => d.tasks)
    .filter((t) => completedTaskIds.has(t.id)).length;
  const completedDaysInWeek = week.days.filter(
    (d) => d.tasks.length > 0 && d.tasks.every((t) => completedTaskIds.has(t.id)),
  ).length;
  const isWeekComplete = completedDaysInWeek === week.days.length && week.days.length > 0;
  const totalMinutes = week.days.reduce((sum, d) => sum + d.estimatedMinutes, 0);
  const totalHours = Math.round(totalMinutes / 60);

  return (
    <div className="space-y-3">
      {/* Week header */}
      <div
        className={`rounded-xl border px-5 py-4 space-y-2 ${
          isWeekComplete
            ? 'border-emerald-800/50 bg-emerald-950/10'
            : 'border-slate-700 bg-slate-900/60'
        }`}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-slate-500">S{week.weekNumber}</span>
              <h3 className="font-bold text-white">{week.theme}</h3>
              {isWeekComplete && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-400">
                  Concluída ✓
                </span>
              )}
            </div>
            <p className="text-sm text-slate-400">{week.objective}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-xs text-slate-500">
            <span>
              <span className={completedDaysInWeek > 0 ? 'text-amber-400' : ''}>
                {completedDaysInWeek}
              </span>
              /{week.days.length} dias
            </span>
            <span>·</span>
            <span>
              <span className={completedTasksInWeek > 0 ? 'text-amber-400' : ''}>
                {completedTasksInWeek}
              </span>
              /{totalTasks} tarefas
            </span>
            <span>·</span>
            <span>~{totalHours}h</span>
          </div>
        </div>
      </div>

      {/* Day cards */}
      <div className="space-y-2 pl-2 sm:pl-4 border-l-2 border-slate-800">
        {week.days.map((day) => (
          <StudyDayCard
            key={day.dayNumber}
            day={day}
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
