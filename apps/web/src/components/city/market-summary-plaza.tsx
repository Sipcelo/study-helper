import type { MarketSummary } from '@/features/market/types';
import { formatChangePercent } from '@/features/market/market-utils';
import { getActiveProviderName, getMarketProviderStatus } from '@/lib/market/market-provider';

interface MarketSummaryPlazaProps {
  summary: MarketSummary;
}

export function MarketSummaryPlaza({ summary }: MarketSummaryPlazaProps) {
  const providerName = getActiveProviderName();
  const providerStatus = getMarketProviderStatus();

  return (
    <div className="relative rounded-2xl border border-slate-700/60 bg-slate-900/60 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/25 to-transparent pointer-events-none" />

      <div className="relative px-5 py-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🏛️</span>
          <div>
            <h3 className="text-white font-semibold text-sm">Praça do Mercado</h3>
            <p className="text-slate-500 text-xs">
              Visão geral · provider: {providerName} · {providerStatus}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <PlazaStat label="Total" value={String(summary.totalAssets)} note="ativos" />
          <PlazaStat
            label="Em alta"
            value={String(summary.rising)}
            note="ativos"
            color="text-green-400"
          />
          <PlazaStat
            label="Em queda"
            value={String(summary.falling)}
            note="ativos"
            color="text-red-400"
          />
          {summary.bestPerformer && (
            <PlazaStat
              label="Destaque"
              value={summary.bestPerformer.symbol}
              note={formatChangePercent(summary.bestPerformer.changePercent)}
              color="text-green-300"
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface PlazaStatProps {
  label: string;
  value: string;
  note?: string;
  color?: string;
}

function PlazaStat({ label, value, note, color = 'text-white' }: PlazaStatProps) {
  return (
    <div className="bg-slate-800/60 rounded-xl px-3 py-2.5 border border-slate-700/40">
      <p className="text-slate-400 text-xs mb-1">{label}</p>
      <p className={`font-bold text-lg leading-none ${color}`}>{value}</p>
      {note && <p className="text-slate-500 text-xs mt-0.5">{note}</p>}
    </div>
  );
}
