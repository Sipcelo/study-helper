'use client';

import type { Asset } from '@/features/market/types';
import { CityDistrict } from './city-district';
import { CityLegend } from './city-legend';

interface CityMapProps {
  currencies: Asset[];
  stocks: Asset[];
  indices: Asset[];
  selectedAssetId?: string;
  onAssetSelect?: (asset: Asset) => void;
}

function Road({ axis }: { axis: 'horizontal' | 'vertical' }) {
  if (axis === 'vertical') {
    return (
      <div className="hidden lg:flex flex-col items-center justify-end bg-slate-950 w-8 pb-5 shrink-0 gap-2">
        <div className="flex flex-col items-center gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-0.5 h-3 bg-slate-700 rounded-full" />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="h-6 flex items-center justify-center bg-slate-950 gap-2">
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} className="h-0.5 w-4 bg-slate-700 rounded-full" />
      ))}
    </div>
  );
}

export function CityMap({ currencies, stocks, indices, selectedAssetId, onAssetSelect }: CityMapProps) {
  return (
    <div className="space-y-0">
      {/* Row 1: currencies + stocks */}
      <div className="flex flex-col lg:flex-row gap-0">
        <div className="flex-1 min-w-0">
          <CityDistrict
            zoneId="currencies"
            assets={currencies}
            selectedAssetId={selectedAssetId}
            onAssetSelect={onAssetSelect}
          />
        </div>
        <Road axis="vertical" />
        <div className="lg:hidden">
          <Road axis="horizontal" />
        </div>
        <div className="flex-1 min-w-0">
          <CityDistrict
            zoneId="stocks"
            assets={stocks}
            selectedAssetId={selectedAssetId}
            onAssetSelect={onAssetSelect}
          />
        </div>
      </div>

      {/* Road between row 1 and row 2 */}
      <Road axis="horizontal" />

      {/* Row 2: indices + indicators (full width) */}
      <CityDistrict
        zoneId="indices"
        assets={indices}
        selectedAssetId={selectedAssetId}
        onAssetSelect={onAssetSelect}
      />

      <div className="mt-4">
        <CityLegend />
      </div>
    </div>
  );
}
