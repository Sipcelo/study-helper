import type { Metadata } from 'next';
import Link from 'next/link';
import { StudyPlanForm } from '@/components/study-planner/study-plan-form';

export const metadata: Metadata = {
  title: 'Planejar Estudos | Study Helper',
  description: 'Defina seu objetivo, área e disponibilidade e veja uma estrutura de plano sugerida.',
};

export default function PlanejarEstudosPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-amber-400 transition-colors">Início</Link>
          <span>/</span>
          <span className="text-slate-300">Planejar Estudos</span>
        </nav>

        {/* Header */}
        <div className="space-y-2 max-w-2xl">
          <h1 className="text-2xl font-bold text-white">Planejar Estudos</h1>
          <p className="text-slate-400 leading-relaxed">
            Informe sua área, objetivo e disponibilidade. O preview mostra uma estrutura estimada
            de semanas e carga total. A geração real com IA será conectada à API Interact
            futuramente.
          </p>
        </div>

        {/* Form + Preview */}
        <StudyPlanForm />

        {/* Footer note */}
        <div className="border-t border-slate-800 pt-6">
          <p className="text-xs text-slate-600">
            Funcionalidade em desenvolvimento · Fase 3 do Study Helper ·{' '}
            <Link href="/meu-plano" className="text-amber-600 hover:text-amber-400 transition-colors">
              Ver plano GRC de exemplo
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
