'use client';

import type { Asset } from '@/features/market/types';
import { formatChangePercent, formatPrice, getTrendColor } from '@/features/market/market-utils';
import { TREND_LABELS, RISK_LABELS } from '@study-helper/config';
import { cn } from '@/lib/cn';

interface AssetDetailPanelProps {
  asset: Asset | null;
  onClose?: () => void;
}

export function AssetDetailPanel({ asset, onClose }: AssetDetailPanelProps) {
  if (!asset) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-6 flex flex-col items-center justify-center min-h-[200px]">
        <p className="text-slate-500 text-sm text-center">
          Selecione um ativo para ver os detalhes e notas educacionais.
        </p>
      </div>
    );
  }

  const changeColor = asset.changePercent > 0 ? 'text-green-400' : asset.changePercent < 0 ? 'text-red-400' : 'text-slate-400';

  return (
    <div className="rounded-2xl border border-slate-600 bg-slate-800/80 pl-6 pr-4 py-5 space-y-5 overflow-y-auto max-h-[85vh] lg:max-h-[calc(100vh-8rem)] [scrollbar-gutter:stable]">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono font-bold text-white text-xl">{asset.symbol}</span>
            <span className="text-xs text-slate-400 px-2 py-0.5 bg-slate-700 rounded-full">
              {asset.type === 'currency' ? 'Moeda' : 'Ação'}
            </span>
            {asset.country && (
              <span className="text-xs text-slate-500">{asset.country}</span>
            )}
          </div>
          <p className="text-slate-300 text-sm mt-0.5">{asset.name}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors text-lg leading-none"
            aria-label="Fechar painel"
          >
            ✕
          </button>
        )}
      </div>

      <Link
        href={`/ativo/${asset.id}`}
        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
      >
        Abrir página do ativo →
      </Link>

      <div className="flex items-end gap-3">
        <span className="text-white text-2xl font-bold">
          {formatPrice(asset.price, asset.currency)}
        </span>
        <span className={cn('text-base font-semibold', changeColor)}>
          {formatChangePercent(asset.changePercent)}
        </span>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: getTrendColor(asset.trend) }}
          />
          <span className="text-xs text-slate-300">{TREND_LABELS[asset.trend]}</span>
        </div>
        {asset.sector && (
          <span className="text-xs text-slate-400 bg-slate-700 px-2 py-0.5 rounded-full">
            {asset.sector}
          </span>
        )}
        <span className="text-xs text-slate-400 bg-slate-700 px-2 py-0.5 rounded-full">
          Risco: {RISK_LABELS[asset.riskLevel]}
        </span>
      </div>

      <div className="space-y-1">
        <h4 className="text-slate-400 text-xs font-medium uppercase tracking-wider">Descrição</h4>
        <p className="text-slate-200 text-sm leading-relaxed">{asset.description}</p>
      </div>

      <div className="space-y-1 bg-blue-950/30 border border-blue-900/40 rounded-xl p-4">
        <h4 className="text-blue-400 text-xs font-medium uppercase tracking-wider">
          📖 Nota educacional
        </h4>
        <p className="text-slate-200 text-sm leading-relaxed">{asset.educationalSummary}</p>
      </div>

      <div className="space-y-2">
        <h4 className="text-slate-400 text-xs font-medium uppercase tracking-wider">
          Histórico (30 dias)
        </h4>
        <MiniSparkline history={asset.history} trend={asset.trend} />
      </div>

      <p className="text-slate-600 text-xs">
        ⚠️ Dados mockados — apenas para fins educacionais. Não representam cotações reais.
      </p>
    </div>
  );
}

function MiniSparkline({
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
  const w = 300;
  const h = 48;
  const pad = 2;

  const points = prices.map((p, i) => {
    const x = pad + (i / (prices.length - 1)) * (w - pad * 2);
    const y = pad + ((max - p) / range) * (h - pad * 2);
    return `${x},${y}`;
  });

  const color =
    trend === 'strong_up' || trend === 'up'
      ? '#22c55e'
      : trend === 'strong_down' || trend === 'down'
      ? '#ef4444'
      : '#64748b';

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12" preserveAspectRatio="none">
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