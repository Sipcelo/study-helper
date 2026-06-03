import type { Asset, MarketSummary, TrendState } from '@study-helper/types';
import { RISK_LABELS } from '@study-helper/config';

export function getMarketSummary(assets: Asset[]): MarketSummary {
  const rising = assets.filter((a) => a.changePercent > 0).length;
  const falling = assets.filter((a) => a.changePercent < 0).length;
  const neutral = assets.length - rising - falling;
  const sorted = [...assets].sort((a, b) => b.changePercent - a.changePercent);

  return {
    totalAssets: assets.length,
    rising,
    falling,
    neutral,
    bestPerformer: sorted[0] ?? null,
    worstPerformer: sorted[sorted.length - 1] ?? null,
  };
}

export function getRiskLevel(asset: Asset): string {
  return RISK_LABELS[asset.riskLevel];
}

export function filterAssets(
  assets: Asset[],
  type?: string,
  trend?: TrendState | 'all',
  search?: string,
): Asset[] {
  return assets.filter((a) => {
    if (type && type !== 'all' && a.type !== type) return false;
    if (trend && trend !== 'all' && a.trend !== trend) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!a.symbol.toLowerCase().includes(q) && !a.name.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}
