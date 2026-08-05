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
}

function ProgressBar({ label, current, total, percent }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="text-slate-500 tabular-nums">
          {current}/{total} - {percent}%
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
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
    if (window.confirm('Resetar todo o progresso? Esta acao nao pode ser desfeita.')) {
      onReset();
    }
  }

  return (
    <div className="space-y-5 rounded-xl border border-slate-800 bg-slate-900/40 p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-slate-300">Progresso</h2>
          <span className="text-lg font-bold text-amber-400">{stats.percentOverall}%</span>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-slate-600 transition-colors hover:text-red-400"
        >
          Resetar progresso
        </button>
      </div>

      <div className="space-y-3">
        <ProgressBar
          label="Dias concluidos"
          current={stats.completedDays}
          total={stats.totalDays}
          percent={stats.percentDays}
        />
        <ProgressBar
          label="Tarefas concluidas"
          current={stats.completedTasks}
          total={stats.totalTasks}
          percent={stats.percentTasks}
        />
        <ProgressBar
          label="Artefatos entregues"
          current={stats.completedArtifacts}
          total={stats.totalArtifacts}
          percent={stats.percentArtifacts}
        />
      </div>

      {stats.isComplete ? (
        <div className="rounded-lg border border-emerald-800/50 bg-emerald-950/20 px-3 py-2">
          <p className="text-sm font-semibold text-emerald-300">Plano completo</p>
          <p className="text-xs text-emerald-500">
            Todas as tarefas e artefatos deste plano foram concluidos.
          </p>
        </div>
      ) : stats.nextPendingStep ? (
        <div className="rounded-lg border border-amber-800/40 bg-amber-950/15 px-3 py-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-500">
            Proximo passo
          </p>
          <p className="text-sm text-slate-300">
            Dia {stats.nextPendingStep.dayNumber} - {stats.nextPendingStep.title}
          </p>
          <p className="text-xs text-slate-500">
            {stats.nextPendingStep.kind === 'task' ? 'Tarefa pendente' : 'Artefato pendente'} em{' '}
            {stats.nextPendingStep.dayTitle}
          </p>
        </div>
      ) : null}

      <p className="text-xs text-slate-600">
        Progresso salvo no navegador via localStorage. Backend Java em desenvolvimento (Fase 4).
      </p>
    </div>
  );
}
