'use client';

import Link from 'next/link';
import type { Asset } from '@/features/market/types';
import { getAssetEducation } from '@/lib/education/get-asset-education';
import { EducationSection } from '@/components/education/education-section';
import { AssetHeaderCard } from './asset-header-card';

interface AssetStudyPageProps {
  asset: Asset;
}

export function AssetStudyPage({ asset }: AssetStudyPageProps) {
  const education = getAssetEducation(asset.id);

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <nav className="flex items-center gap-2 text-slate-500 text-xs">
        <Link href="/" className="hover:text-slate-300 transition-colors">
          ← Cidade financeira
        </Link>
        <span>›</span>
        <span className="text-slate-400">{asset.symbol}</span>
      </nav>

      <AssetHeaderCard asset={asset} />

      <section className="space-y-1">
        <h2 className="text-slate-400 text-xs font-medium uppercase tracking-wider">Descrição</h2>
        <p className="text-slate-200 text-sm leading-relaxed">{asset.description}</p>
      </section>

      <section className="bg-blue-950/30 border border-blue-900/40 rounded-xl p-4 space-y-1">
        <h2 className="text-blue-400 text-xs font-medium uppercase tracking-wider">
          📖 Nota educacional
        </h2>
        <p className="text-slate-200 text-sm leading-relaxed">{asset.educationalSummary}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-slate-400 text-xs font-medium uppercase tracking-wider">
          Histórico (30 dias)
        </h2>
        <StudySparkline history={asset.history} trend={asset.trend} />
      </section>

      {education ? (
        <EducationSection education={education} />
      ) : (
        <section className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 text-center space-y-1">
          <p className="text-slate-500 text-sm">Conteúdo educacional ainda não disponível para este ativo.</p>
        </section>
      )}

      <p className="text-slate-600 text-xs text-center pb-4">
        ⚠️ Dados mockados — apenas para fins educacionais. Não representam cotações reais.
      </p>
    </main>
  );
}

function StudySparkline({
  history,
  trend,
}: {
  history: { date: string; price: number }[];
  trend: Asset['trend'];
}) {
  if (history.length < 2) return null;

  const prices = history.map((h) => h.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const W = 300;
  const H = 64;
  const pad = 2;

  const points = prices.map((p, i) => {
    const x = pad + (i / (prices.length - 1)) * (W - pad * 2);
    const y = pad + ((max - p) / range) * (H - pad * 2);
    return `${x},${y}`;
  });

  const color =
    trend === 'strong_up' || trend === 'up'
      ? '#22c55e'
      : trend === 'strong_down' || trend === 'down'
        ? '#ef4444'
        : '#64748b';

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-16 rounded-lg overflow-hidden"
      preserveAspectRatio="none"
      role="img"
      aria-label="Gráfico de variação de preço dos últimos 30 dias"
    >
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
