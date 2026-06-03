import type { TrendState } from '@study-helper/types';

export function getTrendState(changePercent: number): TrendState {
  if (changePercent >= 2.5) return 'strong_up';
  if (changePercent > 0.2) return 'up';
  if (changePercent >= -0.2) return 'neutral';
  if (changePercent > -2.5) return 'down';
  return 'strong_down';
}
