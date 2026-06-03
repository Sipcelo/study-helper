export type AssetType = 'currency' | 'stock' | 'index' | 'indicator' | 'crypto' | 'commodity';

export type TrendState = 'strong_up' | 'up' | 'neutral' | 'down' | 'strong_down';

export type RiskLevel = 'very_low' | 'low' | 'medium' | 'high' | 'very_high';

export type ModelType = 'building' | 'institution' | 'factory' | 'bank' | 'tower' | 'billboard';

export type BuildingType =
  | 'central-bank'
  | 'currency-house'
  | 'tech-tower'
  | 'bank-tower'
  | 'energy-industrial'
  | 'mining-industrial'
  | 'semiconductor-lab'
  | 'index-monument'
  | 'macro-tower'
  | 'indicator-panel';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface HistoryPoint {
  date: string;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
}

export interface VisualTheme {
  primaryColor: string;
  icon?: string;
  modelType: ModelType;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: AssetType;
  country?: string;
  sector?: string;
  exchange?: string;
  price: number;
  currency: string;
  changePercent: number;
  trend: TrendState;
  description: string;
  educationalSummary: string;
  riskLevel: RiskLevel;
  visualTheme: VisualTheme;
  history: HistoryPoint[];
  lastUpdated: string;
  isMock: true;
}

export interface VisualNode {
  id: string;
  assetId: string;
  cityZone: CityZoneId;
  modelType: ModelType;
  positionX: number;
  positionY: number;
  positionZ: number;
  scale: number;
  colorState: TrendState;
  animationState: 'idle' | 'active' | 'alert';
}

export interface MarketSummary {
  totalAssets: number;
  rising: number;
  falling: number;
  neutral: number;
  bestPerformer: Asset | null;
  worstPerformer: Asset | null;
}

export type CityZoneId = 'currencies' | 'stocks' | 'indices' | 'library';