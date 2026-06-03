import { getMarketSummary } from '../lib/assets/get-market-summary';
import { getAssets } from '../lib/assets/get-assets';

export const MARKET_SUMMARY = getMarketSummary(getAssets());
