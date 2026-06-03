export {
  getTrendState,
} from '../../lib/assets/get-trend-state';

export {
  formatPrice,
  formatPercent,
  formatChangePercent,
  formatLargeNumber,
  formatDate,
} from '../../lib/assets/format-price';

export {
  getMarketSummary,
  getRiskLevel,
  filterAssets,
} from '../../lib/assets/get-market-summary';

import { TREND_COLORS } from '@study-helper/config';
import type { TrendState } from '@study-helper/types';

export function getTrendColor(trend: TrendState): string {
  return TREND_COLORS[trend];
}
