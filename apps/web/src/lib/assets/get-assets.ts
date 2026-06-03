import type { Asset, CityZoneId } from '@study-helper/types';
import { getMarketProvider } from '../market/market-provider';
import { logAssetWarnings } from './validate-assets';

const provider = getMarketProvider();

// dev-only validation — no-op in production
logAssetWarnings(provider.getAssets());

export function getAssets(): Asset[] {
  return provider.getAssets();
}

export function getCurrencies(): Asset[] {
  return provider.getAssets().filter((a) => a.type === 'currency');
}

export function getStocks(): Asset[] {
  return provider.getAssets().filter((a) => a.type === 'stock');
}

export function getIndices(): Asset[] {
  return provider.getAssets().filter((a) => a.type === 'index');
}

export function getIndicators(): Asset[] {
  return provider.getAssets().filter((a) => a.type === 'indicator');
}

export function getAssetsByDistrict(): Record<CityZoneId, Asset[]> {
  const assets = provider.getAssets();
  return {
    currencies: assets.filter((a) => a.type === 'currency'),
    stocks: assets.filter((a) => a.type === 'stock'),
    indices: assets.filter((a) => a.type === 'index' || a.type === 'indicator'),
    library: [],
  };
}

export function getAssetById(id: string): Asset | undefined {
  return provider.getAssetById(id);
}
