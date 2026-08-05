'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { StudyPlan } from '@/types/study-plan';
import { getGeneratedPlan, getGeneratedPlanProgressKey } from '@/hooks/use-generated-study-plan';
import { StudyPlanOverview } from './study-plan-overview';
import { StudyPlanShell } from './study-plan-shell';
import { StudyPlanExport } from './study-plan-export';

export function GeneratedPlanShell() {
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPlan(getGeneratedPlan());
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-40 rounded-xl border border-slate-800 bg-slate-900/40 animate-pulse" />;
  }

  if (!plan) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-10 text-center space-y-4">
        <p className="text-3xl">📋</p>
        <p className="text-slate-400">Nenhum plano gerado ainda.</p>
        <p className="text-sm text-slate-500">
          Preencha o formulário de planejamento para criar seu plano personalizado.
        </p>
        <Link
          href="/planejar-estudos"
          className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-amber-700 bg-amber-950/30 text-amber-400 hover:bg-amber-950/50 transition-colors"
        >
          Criar meu plano →
        </Link>
      </div>
    );
  }

  const progressKey = getGeneratedPlanProgressKey(plan.id);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-3 rounded-xl border border-emerald-800/50 bg-emerald-950/20 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-emerald-300">Plano salvo neste navegador</p>
          <p className="text-xs text-emerald-500">
            Ao voltar para esta pagina, o Study Helper carrega este plano e o progresso local.
          </p>
        </div>
        <a
          href="#progresso"
          className="inline-flex items-center justify-center rounded-lg border border-emerald-700 bg-emerald-950/30 px-3 py-2 text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-950/50"
        >
          Continuar progresso
        </a>
      </div>
      <StudyPlanOverview plan={plan} />
      <div id="progresso">
        <StudyPlanShell plan={plan} progressKey={progressKey} />
      </div>
      <StudyPlanExport plan={plan} progressKey={progressKey} />
    </div>
  );
}
