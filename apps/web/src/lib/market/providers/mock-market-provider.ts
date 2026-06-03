import type { Asset } from '@study-helper/types';
import type {
  AssetHistoryPoint,
  AssetQuote,
  HistoryPeriod,
  MarketDataProvider,
  MarketDataProviderResult,
  MarketDataProviderStatus,
} from '@/types/market-provider';
import { MOCK_ASSETS } from '@/data/assets';

export const MockMarketProvider: MarketDataProvider = {
  name: 'mock',

  getAssets(): Asset[] {
    return MOCK_ASSETS;
  },

  getAssetById(id: string): Asset | undefined {
    return MOCK_ASSETS.find((a) => a.id === id);
  },

  getQuote(symbol: string): MarketDataProviderResult<AssetQuote> {
    const asset = MOCK_ASSETS.find(
      (a) => a.symbol.toLowerCase() === symbol.toLowerCase(),
    );
    if (!asset) {
      return {
        ok: false,
        error: { code: 'not_found', message: `Symbol "${symbol}" not found in mock data.` },
      };
    }
    return {
      ok: true,
      data: {
        id: asset.id,
        symbol: asset.symbol,
        price: asset.price,
        changePercent: asset.changePercent,
        currency: asset.currency,
        lastUpdated: asset.lastUpdated,
      },
    };
  },

  getHistory(
    symbol: string,
    _period: HistoryPeriod,
  ): MarketDataProviderResult<AssetHistoryPoint[]> {
    const asset = MOCK_ASSETS.find(
      (a) => a.symbol.toLowerCase() === symbol.toLowerCase(),
    );
    if (!asset) {
      return {
        ok: false,
        error: { code: 'not_found', message: `Symbol "${symbol}" not found in mock data.` },
      };
    }
    return { ok: true, data: asset.history };
  },

  getProviderStatus(): MarketDataProviderStatus {
    return 'demo';
  },
};
