import type { Asset } from '@study-helper/types';

export type MarketDataProviderName = 'mock' | 'brapi' | 'yahoo' | 'alpha-vantage';

export type MarketDataProviderStatus = 'online' | 'offline' | 'degraded' | 'demo';

export type HistoryPeriod = '7d' | '30d' | '90d' | '1y';

export interface AssetQuote {
  id: string;
  symbol: string;
  price: number;
  changePercent: number;
  currency: string;
  lastUpdated: string;
}

export interface AssetHistoryPoint {
  date: string;
  price: number;
}

export type MarketDataError = {
  code: 'not_found' | 'rate_limit' | 'provider_offline' | 'invalid_symbol' | 'unknown';
  message: string;
};

export type MarketDataProviderResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: MarketDataError };

export interface MarketDataProvider {
  readonly name: MarketDataProviderName;
  getAssets(): Asset[];
  getAssetById(id: string): Asset | undefined;
  getQuote(symbol: string): MarketDataProviderResult<AssetQuote>;
  getHistory(symbol: string, period: HistoryPeriod): MarketDataProviderResult<AssetHistoryPoint[]>;
  getProviderStatus(): MarketDataProviderStatus;
}
