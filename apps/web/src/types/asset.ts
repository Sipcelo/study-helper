export type {
  Asset,
  AssetType,
  TrendState,
  RiskLevel,
  ModelType,
  BuildingType,
  HistoryPoint,
  VisualTheme,
  VisualNode,
  MarketSummary,
  CityZoneId,
} from '@study-helper/types';

export type { TrendState as AssetTrend } from '@study-helper/types';
export type { RiskLevel as AssetRiskLevel } from '@study-helper/types';
export type { HistoryPoint as PricePoint } from '@study-helper/types';
export type { CityZoneId as AssetDistrict } from '@study-helper/types';

export type AssetSector =
  | 'Financeiro'
  | 'Energia'
  | 'Mineração'
  | 'Tecnologia'
  | 'Tecnologia/EV'
  | 'Semicondutores'
  | (string & {});

export type AssetCurrency = 'BRL' | 'USD' | 'EUR' | 'JPY' | 'GBP' | 'CNY' | (string & {});
