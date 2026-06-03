import type { StudyPlan, StudyPlanArea, StudyPlanDifficulty } from '@/types/study-plan';

const AREA_LABELS: Record<StudyPlanArea, string> = {
  programacao:   'Programação',
  carreira:      'Carreira',
  financeiro:    'Financeiro',
  seguranca:     'Segurança da Informação',
  dados:         'Dados',
  devops:        'DevOps',
  gestao:        'Gestão',
  personalizado: 'Personalizado',
};

const DIFFICULTY_LABELS: Record<StudyPlanDifficulty, string> = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
};

function countPlanStats(plan: StudyPlan) {
  const allDays = plan.weeks.flatMap((w) => w.days);
  return {
    totalWeeks: plan.weeks.length,
    totalDays: allDays.length,
    totalTasks: allDays.flatMap((d) => d.tasks).length,
    totalArtifacts: allDays.filter((d) => d.artifact).length,
  };
}

interface StatCardProps {
  value: number | string;
  label: string;
  icon: string;
}

function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-center space-y-1">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-slate-500">{icon} {label}</p>
    </div>
  );
}

interface StudyPlanOverviewProps {
  plan: StudyPlan;
}

export function StudyPlanOverview({ plan }: StudyPlanOverviewProps) {
  const stats = countPlanStats(plan);

  return (
    <div className="space-y-6">
      {/* Badges + Title */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-950/50 border border-amber-800/50 text-amber-400 font-medium">
            {AREA_LABELS[plan.area]}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400">
            {DIFFICULTY_LABELS[plan.difficulty]}
          </span>
          {plan.targetRole && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400">
              🎯 {plan.targetRole}
            </span>
          )}
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400">
            {plan.durationDays} dias · {plan.totalHours}h
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{plan.title}</h1>
        <p className="text-slate-400 leading-relaxed max-w-3xl">{plan.description}</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard value={stats.totalWeeks} label="Semanas" icon="📅" />
        <StatCard value={stats.totalDays} label="Dias" icon="📆" />
        <StatCard value={stats.totalTasks} label="Tarefas" icon="✅" />
        <StatCard value={stats.totalArtifacts} label="Artefatos" icon="📄" />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {plan.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-slate-400 bg-slate-800 border border-slate-700 rounded-md px-2.5 py-1"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Final project */}
      <div className="rounded-xl border border-amber-800/30 bg-amber-950/10 p-5 space-y-3">
        <div className="flex items-center gap-2">
          <span>🏆</span>
          <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-wide">Projeto Final</h2>
          <span className="text-xs text-slate-500">~{plan.finalProject.estimatedHours}h</span>
        </div>
        <h3 className="font-bold text-white">{plan.finalProject.title}</h3>
        <p className="text-sm text-slate-300 leading-relaxed">{plan.finalProject.description}</p>
        <div className="space-y-1.5">
          {plan.finalProject.deliverables.map((item, i) => (
            <div key={i} className="flex gap-2.5 text-sm">
              <span className="text-amber-600 shrink-0 font-mono text-xs mt-0.5">{i + 1}.</span>
              <span className="text-slate-400">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
