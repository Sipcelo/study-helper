import type { Asset } from '@study-helper/types';

export function formatPrice(asset: Asset): string;
export function formatPrice(price: number, currency: string): string;
export function formatPrice(
  assetOrPrice: Asset | number,
  currency?: string,
): string {
  const price = typeof assetOrPrice === 'number' ? assetOrPrice : assetOrPrice.price;
  const curr = typeof assetOrPrice === 'number' ? currency! : assetOrPrice.currency;

  if (curr === 'BRL') {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  }
  if (curr === 'USD') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  }
  if (curr === 'pts') {
    return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(price) + ' pts';
  }
  if (curr === 'pct') {
    return price.toFixed(2) + '% a.a.';
  }
  return `${price.toFixed(4)} ${curr}`;
}

export function formatPercent(value: number): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function formatChangePercent(value: number): string {
  return formatPercent(value);
}

export function formatLargeNumber(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(dateStr));
}
