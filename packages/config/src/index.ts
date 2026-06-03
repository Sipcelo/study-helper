import type { CityZoneId } from '@study-helper/types';

export const PROJECT_NAME = 'Study Helper';
export const MVP_VERSION = '0.1.0';
export const IS_MVP = true;

export const CITY_ZONES: CityZoneId[] = ['currencies', 'stocks', 'indices', 'library'];

export const CITY_ZONE_LABELS: Record<CityZoneId, string> = {
  currencies: 'Distrito de Moedas',
  stocks: 'Distrito de Ações',
  indices: 'Distrito de Índices e Indicadores',
  library: 'Biblioteca',
};

export const TREND_LABELS = {
  strong_up: 'Alta forte',
  up: 'Alta',
  neutral: 'Neutro',
  down: 'Queda',
  strong_down: 'Queda forte',
} as const;

export const TREND_COLORS = {
  strong_up: '#16a34a',
  up: '#22c55e',
  neutral: '#64748b',
  down: '#ef4444',
  strong_down: '#b91c1c',
} as const;

export const RISK_LABELS = {
  very_low: 'Muito baixo',
  low: 'Baixo',
  medium: 'Médio',
  high: 'Alto',
  very_high: 'Muito alto',
} as const;