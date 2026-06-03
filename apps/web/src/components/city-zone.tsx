'use client';

import type { Asset, CityZoneId } from '@/features/market/types';
import { AssetCard } from './asset-card';
import { CITY_ZONE_LABELS } from '@study-helper/config';
import { cn } from '@/lib/cn';

interface CityZoneProps {
  zoneId: CityZoneId;
  assets: Asset[];
  selectedAssetId?: string;
  onAssetSelect?: (asset: Asset) => void;
}

const ZONE_ACCENT: Record<CityZoneId, string> = {
  currencies: 'border-amber-800/60 bg-amber-950/20',
  stocks: 'border-blue-800/60 bg-blue-950/20',
  indices: 'border-purple-800/60 bg-purple-950/20',
  library: 'border-teal-800/60 bg-teal-950/20',
};

const ZONE_TITLE_COLOR: Record<CityZoneId, string> = {
  currencies: 'text-amber-400',
  stocks: 'text-blue-400',
  indices: 'text-purple-400',
  library: 'text-teal-400',
};

const ZONE_ICON: Record<CityZoneId, string> = {
  currencies: '💱',
  stocks: '📈',
  indices: '📊',
  library: '📚',
};

export function CityZone({ zoneId, assets, selectedAssetId, onAssetSelect }: CityZoneProps) {
  return (
    <div className={cn('rounded-2xl border p-5', ZONE_ACCENT[zoneId])}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">{ZONE_ICON[zoneId]}</span>
        <h3 className={cn('font-semibold text-sm', ZONE_TITLE_COLOR[zoneId])}>
          {CITY_ZONE_LABELS[zoneId]}
        </h3>
        <span className="ml-auto text-xs text-slate-500">{assets.length} ativos</span>
      </div>

      {assets.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-4">Nenhum ativo nesta zona.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {assets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              selected={selectedAssetId === asset.id}
              onClick={onAssetSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}