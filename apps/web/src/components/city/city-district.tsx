'use client';

import type { Asset, CityZoneId } from '@/features/market/types';
import { CITY_ZONE_LABELS } from '@study-helper/config';
import { AssetBuilding } from './asset-building';
import { cn } from '@/lib/cn';

interface CityDistrictProps {
  zoneId: CityZoneId;
  assets: Asset[];
  selectedAssetId?: string;
  onAssetSelect?: (asset: Asset) => void;
}

const DISTRICT: Record<
  CityZoneId,
  { border: string; headerBg: string; titleColor: string; ground: string; icon: string }
> = {
  currencies: {
    border: 'border-amber-800/50',
    headerBg: 'bg-amber-950/30',
    titleColor: 'text-amber-400',
    ground: 'bg-amber-950/50',
    icon: '💱',
  },
  stocks: {
    border: 'border-blue-800/50',
    headerBg: 'bg-blue-950/30',
    titleColor: 'text-blue-400',
    ground: 'bg-blue-950/50',
    icon: '📈',
  },
  indices: {
    border: 'border-purple-800/50',
    headerBg: 'bg-purple-950/30',
    titleColor: 'text-purple-400',
    ground: 'bg-purple-950/50',
    icon: '📊',
  },
  library: {
    border: 'border-teal-800/50',
    headerBg: 'bg-teal-950/30',
    titleColor: 'text-teal-400',
    ground: 'bg-teal-950/50',
    icon: '📚',
  },
};

const MIN_H = 56;
const MAX_H = 136;

function buildingHeight(changePercent: number, maxChange: number): number {
  const ratio = maxChange > 0 ? Math.abs(changePercent) / maxChange : 0;
  return Math.round(MIN_H + ratio * (MAX_H - MIN_H));
}

export function CityDistrict({ zoneId, assets, selectedAssetId, onAssetSelect }: CityDistrictProps) {
  const d = DISTRICT[zoneId];
  const maxChange = Math.max(...assets.map((a) => Math.abs(a.changePercent)), 0.1);

  return (
    <div className={cn('rounded-2xl border overflow-hidden', d.border)}>
      {/* District header */}
      <div className={cn('flex items-center gap-2 px-4 py-3', d.headerBg)}>
        <span className="text-lg">{d.icon}</span>
        <h3 className={cn('font-semibold text-sm tracking-wide', d.titleColor)}>
          {CITY_ZONE_LABELS[zoneId]}
        </h3>
        <span className="ml-auto text-xs text-slate-500">{assets.length} ativos</span>
      </div>

      {/* Skyline */}
      <div className="bg-slate-900/80 px-5 pt-12">
        <div className="flex items-end justify-around gap-3 min-h-[160px]">
          {assets.map((asset) => (
            <AssetBuilding
              key={asset.id}
              asset={asset}
              selected={selectedAssetId === asset.id}
              heightPx={buildingHeight(asset.changePercent, maxChange)}
              onClick={onAssetSelect}
            />
          ))}
        </div>

        {/* Ground / pavement strip */}
        <div
          className={cn('h-5 mt-1 border-t border-slate-600/40 rounded-b', d.ground)}
          style={{ boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.4)' }}
        />
      </div>
    </div>
  );
}
