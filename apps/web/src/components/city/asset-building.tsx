'use client';

import type { Asset } from '@/features/market/types';
import type { BuildingType } from '@study-helper/types';
import { formatChangePercent, formatPrice } from '@/features/market/market-utils';
import { cn } from '@/lib/cn';

interface AssetBuildingProps {
  asset: Asset;
  selected?: boolean;
  heightPx: number;
  onClick?: (asset: Asset) => void;
}

const BODY: Record<string, string> = {
  strong_up: 'bg-green-700 border-green-500',
  up: 'bg-green-800 border-green-700',
  neutral: 'bg-slate-700 border-slate-500',
  down: 'bg-red-800 border-red-700',
  strong_down: 'bg-red-900 border-red-800',
};

const ROOF_CLASS: Record<string, string> = {
  strong_up: 'bg-green-500',
  up: 'bg-green-600',
  neutral: 'bg-slate-500',
  down: 'bg-red-600',
  strong_down: 'bg-red-700',
};

const WINDOW: Record<string, string> = {
  strong_up: 'bg-yellow-100/60',
  up: 'bg-yellow-100/40',
  neutral: 'bg-slate-300/30',
  down: 'bg-orange-100/30',
  strong_down: 'bg-orange-100/20',
};

const GLOW_SHADOW: Record<string, string> = {
  strong_up: '0 0 16px rgba(34,197,94,0.45), 4px 6px 12px rgba(0,0,0,0.6)',
  up: '4px 6px 12px rgba(0,0,0,0.55)',
  neutral: '3px 5px 10px rgba(0,0,0,0.45)',
  down: '4px 6px 12px rgba(0,0,0,0.55)',
  strong_down: '0 0 16px rgba(239,68,68,0.4), 4px 6px 12px rgba(0,0,0,0.6)',
};

// Building silhouette extras by semantic building type
function BuildingTopper({ buildingType, trend }: { buildingType: BuildingType; trend: string }) {
  if (buildingType === 'energy-industrial' || buildingType === 'mining-industrial') {
    return (
      <div className="absolute -top-5 right-1.5 flex gap-0.5">
        <div className="w-1.5 h-5 bg-slate-600 border border-slate-500 rounded-t" />
      </div>
    );
  }
  if (buildingType === 'bank-tower' || buildingType === 'central-bank') {
    return (
      <div
        className={cn(
          'absolute -top-2 -inset-x-1 h-2 rounded-t',
          ROOF_CLASS[trend],
          'opacity-80',
        )}
      />
    );
  }
  if (buildingType === 'tech-tower' || buildingType === 'semiconductor-lab') {
    return (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-slate-400/50 rounded-full" />
    );
  }
  if (buildingType === 'index-monument') {
    return (
      <div className="absolute -top-3 inset-x-1 flex gap-0.5 items-end">
        <div className="flex-1 h-3 bg-slate-400/60 rounded-t" />
        <div className="flex-1 h-2 bg-slate-400/40 rounded-t" />
        <div className="flex-1 h-3 bg-slate-400/60 rounded-t" />
      </div>
    );
  }
  if (buildingType === 'macro-tower') {
    return (
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
        <div className="w-1 h-1 rounded-full bg-amber-400/70" />
        <div className="w-px h-4 bg-slate-400/50 rounded-full" />
      </div>
    );
  }
  if (buildingType === 'indicator-panel') {
    return (
      <div className="absolute -top-2 -inset-x-0.5 h-2 rounded-t bg-slate-400/40" />
    );
  }
  // currency-house: flat institutional silhouette, no topper
  return null;
}

function WindowRow({ trend }: { trend: string }) {
  return (
    <div className="flex justify-evenly">
      <span className={cn('w-1.5 h-1 rounded-sm', WINDOW[trend])} />
      <span className={cn('w-1.5 h-1 rounded-sm', WINDOW[trend])} />
    </div>
  );
}

export function AssetBuilding({ asset, selected, heightPx, onClick }: AssetBuildingProps) {
  const { trend } = asset;
  const { buildingType } = asset.visualTheme;

  const changeColor =
    asset.changePercent > 0
      ? 'text-green-400'
      : asset.changePercent < 0
      ? 'text-red-400'
      : 'text-slate-400';

  const tooltipChangeColor =
    asset.changePercent > 0
      ? 'text-green-400'
      : asset.changePercent < 0
      ? 'text-red-400'
      : 'text-slate-400';

  const boxShadow = selected
    ? `${GLOW_SHADOW[trend]}, 0 0 0 2px #60a5fa, 0 0 0 5px rgba(96,165,250,0.15)`
    : GLOW_SHADOW[trend];

  return (
    <div className="flex flex-col items-center gap-1.5 flex-shrink-0 group">

      {/* Tooltip + building in a positioned container */}
      <div className="relative flex flex-col items-center">

        {/* ── Tooltip ─────────────────────────────────────── */}
        <div
          className={cn(
            'absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-30 w-40',
            'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100',
            'pointer-events-none transition-opacity duration-150',
            'bg-slate-800/95 border border-slate-600/80 rounded-xl px-3 py-2.5',
            'shadow-2xl backdrop-blur-sm text-left',
          )}
        >
          <p className="font-bold text-white text-xs leading-snug">{asset.name}</p>
          <p className="font-mono text-slate-400 text-[10px]">{asset.symbol}</p>
          <p className="text-white font-semibold text-xs mt-1.5">
            {formatPrice(asset.price, asset.currency)}
          </p>
          <p className={cn('text-xs font-medium', tooltipChangeColor)}>
            {formatChangePercent(asset.changePercent)}
          </p>
          <p className="text-slate-500 text-[10px] mt-1">
            {asset.type === 'currency'
              ? 'Moeda'
              : asset.type === 'stock'
                ? 'Ação'
                : asset.type === 'index'
                  ? 'Índice'
                  : 'Indicador'}
          </p>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-600/80" />
        </div>

        {/* ── Topper (chimney / antenna / parapet) ────────── */}
        <div className="relative w-full flex justify-center">
          <BuildingTopper buildingType={buildingType} trend={trend} />
        </div>

        {/* ── Building button ──────────────────────────────── */}
        <button
          onClick={() => onClick?.(asset)}
          aria-label={`${asset.symbol} — ${asset.name} — ${formatChangePercent(asset.changePercent)}`}
          style={{ height: `${heightPx}px`, boxShadow }}
          className={cn(
            'relative w-9 sm:w-11 border rounded-t transition-all duration-200 cursor-pointer',
            'hover:brightness-125 hover:-translate-y-1',
            BODY[trend],
            selected && 'brightness-125 -translate-y-1',
          )}
        >
          {/* Right-side wall — 2.5D depth illusion */}
          <div
            className="absolute top-0 right-0 bottom-0 w-1.5 rounded-tr pointer-events-none"
            style={{ background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.45))' }}
          />

          {/* Roof stripe */}
          <div className={cn('absolute inset-x-0 top-0 h-2 rounded-t', ROOF_CLASS[trend])} />

          {/* Windows */}
          {heightPx >= 76 && (
            <div className="absolute inset-x-1.5 top-4 bottom-7 flex flex-col justify-evenly pointer-events-none">
              <WindowRow trend={trend} />
              {heightPx >= 102 && <WindowRow trend={trend} />}
              {heightPx >= 126 && <WindowRow trend={trend} />}
            </div>
          )}

          {/* Icon — larger at base */}
          <div className="absolute inset-x-0 bottom-1 flex justify-center text-sm leading-none select-none">
            {asset.visualTheme.icon}
          </div>
        </button>
      </div>

      {/* Label below building */}
      <div className="text-center leading-none space-y-0.5">
        <p className="font-mono font-bold text-white text-[11px]">{asset.symbol}</p>
        <p className={cn('text-[10px] font-medium', changeColor)}>
          {formatChangePercent(asset.changePercent)}
        </p>
      </div>
    </div>
  );
}
