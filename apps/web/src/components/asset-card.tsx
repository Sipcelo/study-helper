'use client';

import type { Asset } from '@/features/market/types';
import { formatChangePercent, formatPrice, getTrendColor } from '@/features/market/market-utils';
import { TREND_LABELS } from '@study-helper/config';
import { cn } from '@/lib/cn';

interface AssetCardProps {
  asset: Asset;
  selected?: boolean;
  onClick?: (asset: Asset) => void;
}

export function AssetCard({ asset, selected = false, onClick }: AssetCardProps) {
  const changeColor = asset.changePercent > 0
    ? 'text-green-400'
    : asset.changePercent < 0
    ? 'text-red-400'
    : 'text-slate-400';

  const borderColor = asset.changePercent > 0
    ? 'border-green-800'
    : asset.changePercent < 0
    ? 'border-red-900'
    : 'border-slate-700';

  return (
    <button
      onClick={() => onClick?.(asset)}
      className={cn(
        'w-full text-left rounded-xl border p-4 transition-all duration-200',
        'bg-slate-800/60 hover:bg-slate-700/80 hover:scale-[1.02]',
        borderColor,
        selected && 'ring-2 ring-blue-500 bg-slate-700/80',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-white text-sm">{asset.symbol}</span>
            <span className="text-xs text-slate-400 px-1.5 py-0.5 bg-slate-700 rounded">
              {asset.type === 'currency' ? 'Moeda' : 'Ação'}
            </span>
          </div>
          <p className="text-slate-300 text-xs mt-0.5 truncate max-w-[120px]">{asset.name}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-white font-semibold text-sm">
            {formatPrice(asset.price, asset.currency)}
          </p>
          <p className={cn('text-xs font-medium', changeColor)}>
            {formatChangePercent(asset.changePercent)}
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ backgroundColor: getTrendColor(asset.trend) }}
        />
        <span className="text-xs text-slate-400">{TREND_LABELS[asset.trend]}</span>
      </div>
    </button>
  );
}