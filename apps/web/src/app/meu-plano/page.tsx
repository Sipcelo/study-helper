import type { Metadata } from 'next';
import Link from 'next/link';
import { GRC_30_DAY_PLAN } from '@/data/study-plan-examples';
import { GRC_PROGRESS_KEY } from '@/hooks/use-study-plan-progress';
import { StudyPlanOverview } from '@/components/study-plan/study-plan-overview';
import { StudyPlanShell } from '@/components/study-plan/study-plan-shell';
import { StudyPlanExport } from '@/components/study-plan/study-plan-export';

export const metadata: Metadata = {
  title: 'Meu Plano de Estudo | Study Helper',
  description: 'Plano de estudo estruturado com tarefas diárias, artefatos e projeto final.',
};

export default function MeuPlanoPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <nav className="flex items-center justify-between gap-2 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Início</Link>
            <span>/</span>
            <span className="text-slate-300">Meu Plano</span>
          </div>
          <Link
            href="/planejar-estudos"
            className="text-xs text-slate-500 hover:text-amber-400 transition-colors"
          >
            + Criar outro plano
          </Link>
        </nav>

        {/* Server: título, estatísticas estáticas, tags, projeto final */}
        <StudyPlanOverview plan={GRC_30_DAY_PLAN} />

        {/* Client: progresso real + cronograma interativo */}
        <StudyPlanShell plan={GRC_30_DAY_PLAN} progressKey={GRC_PROGRESS_KEY} />

        {/* Client: exportar workspace Markdown com progresso atual */}
        <StudyPlanExport plan={GRC_30_DAY_PLAN} progressKey={GRC_PROGRESS_KEY} />

      </div>
    </div>
  );
}
