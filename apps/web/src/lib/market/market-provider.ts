import type {
  MarketDataProvider,
  MarketDataProviderName,
  MarketDataProviderStatus,
} from '@/types/market-provider';
import { MockMarketProvider } from './providers/mock-market-provider';

// To switch providers, replace MockMarketProvider with a real implementation.
// See providers/brapi-market-provider.placeholder.ts for the expected contract.
export function getMarketProvider(): MarketDataProvider {
  return MockMarketProvider;
}

export function getActiveProviderName(): MarketDataProviderName {
  return MockMarketProvider.name;
}

export function getMarketProviderStatus(): MarketDataProviderStatus {
  return MockMarketProvider.getProviderStatus();
}
