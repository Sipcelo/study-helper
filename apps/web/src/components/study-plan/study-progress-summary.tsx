'use client';

import type { ProgressStats } from '@/hooks/use-study-plan-progress';

interface StudyProgressSummaryProps {
  stats: ProgressStats;
  onReset: () => void;
}

interface ProgressBarProps {
  label: string;
  current: number;
  total: number;
  percent: number;
  icon: string;
}

function ProgressBar({ label, current, total, percent, icon }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">
          {icon} {label}
        </span>
        <span className="text-slate-500 tabular-nums">
          {current}/{total} — {percent}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-amber-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export function StudyProgressSummary({ stats, onReset }: StudyProgressSummaryProps) {
  function handleReset() {
    if (window.confirm('Resetar todo o progresso? Esta ação não pode ser desfeita.')) {
      onReset();
    }
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-slate-300">Progresso</h2>
          <span className="text-lg font-bold text-amber-400">{stats.percentOverall}%</span>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-slate-600 hover:text-red-400 transition-colors"
        >
          Resetar progresso
        </button>
      </div>

      {/* Bars */}
      <div className="space-y-3">
        <ProgressBar
          label="Dias concluídos"
          current={stats.completedDays}
          total={stats.totalDays}
          percent={stats.percentDays}
          icon="📆"
        />
        <ProgressBar
          label="Tarefas concluídas"
          current={stats.completedTasks}
          total={stats.totalTasks}
          percent={stats.percentTasks}
          icon="✅"
        />
        <ProgressBar
          label="Artefatos entregues"
          current={stats.completedArtifacts}
          total={stats.totalArtifacts}
          percent={stats.percentArtifacts}
          icon="📄"
        />
      </div>

      {/* Footer note */}
      <p className="text-xs text-slate-600">
        Progresso salvo no navegador via localStorage · Backend Java em desenvolvimento (Fase 4)
      </p>
    </div>
  );
}
