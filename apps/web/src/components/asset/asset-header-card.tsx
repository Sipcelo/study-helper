import type { Asset } from '@/features/market/types';
import { formatPrice, formatChangePercent, getTrendColor } from '@/features/market/market-utils';
import { TREND_LABELS, RISK_LABELS } from '@study-helper/config';
import { cn } from '@/lib/cn';

interface AssetHeaderCardProps {
  asset: Asset;
}

export function AssetHeaderCard({ asset }: AssetHeaderCardProps) {
  const changeColor =
    asset.changePercent > 0
      ? 'text-green-400'
      : asset.changePercent < 0
        ? 'text-red-400'
        : 'text-slate-400';

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 px-5 py-4 space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        {asset.visualTheme.icon && (
          <span className="text-2xl leading-none">{asset.visualTheme.icon}</span>
        )}
        <span className="font-mono font-bold text-white text-2xl">{asset.symbol}</span>
        <span className="text-xs text-slate-400 px-2 py-0.5 bg-slate-700 rounded-full">
          {asset.type === 'currency'
            ? 'Moeda'
            : asset.type === 'stock'
              ? 'Ação'
              : asset.type === 'index'
                ? 'Índice'
                : 'Indicador'}
        </span>
        {asset.country && (
          <span className="text-xs text-slate-500">{asset.country}</span>
        )}
        {asset.exchange && (
          <span className="text-xs text-slate-500 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full">
            {asset.exchange}
          </span>
        )}
      </div>

      <p className="text-slate-300 text-base">{asset.name}</p>

      <div className="flex items-end gap-3">
        <span className="text-white text-3xl font-bold leading-none">
          {formatPrice(asset.price, asset.currency)}
        </span>
        <span className={cn('text-lg font-semibold pb-0.5', changeColor)}>
          {formatChangePercent(asset.changePercent)}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
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
    </div>
  );
}
