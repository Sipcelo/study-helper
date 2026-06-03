import type { Metadata } from 'next';
import Link from 'next/link';
import { GeneratedPlanShell } from '@/components/study-plan/generated-plan-shell';

export const metadata: Metadata = {
  title: 'Meu Plano Gerado | Study Helper',
  description: 'Seu plano de estudo personalizado com tarefas diárias, artefatos e projeto final.',
};

export default function MeuPlanoGeradoPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <nav className="flex items-center justify-between gap-2 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Início</Link>
            <span>/</span>
            <Link href="/planejar-estudos" className="hover:text-amber-400 transition-colors">Planejar</Link>
            <span>/</span>
            <span className="text-slate-300">Meu Plano</span>
          </div>
          <Link
            href="/planejar-estudos"
            className="text-xs text-slate-500 hover:text-amber-400 transition-colors"
          >
            + Criar novo plano
          </Link>
        </nav>

        <GeneratedPlanShell />

      </div>
    </div>
  );
}
