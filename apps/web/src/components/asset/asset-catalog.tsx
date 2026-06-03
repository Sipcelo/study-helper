'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Asset } from '@/features/market/types';
import { formatPrice, formatChangePercent, getTrendColor } from '@/features/market/market-utils';
import { TREND_LABELS, RISK_LABELS } from '@study-helper/config';
import { cn } from '@/lib/cn';

type FilterId = 'all' | 'currencies' | 'stocks' | 'indices' | 'indicators' | 'up' | 'down';

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'currencies', label: 'Moedas' },
  { id: 'stocks', label: 'Ações' },
  { id: 'indices', label: 'Índices' },
  { id: 'indicators', label: 'Indicadores' },
  { id: 'up', label: 'Em alta' },
  { id: 'down', label: 'Em queda' },
];

interface AssetCatalogProps {
  assets: Asset[];
}

export function AssetCatalog({ assets }: AssetCatalogProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterId>('all');

  const filtered = useMemo(() => {
    let result = assets;

    if (filter === 'currencies') result = result.filter((a) => a.type === 'currency');
    else if (filter === 'stocks') result = result.filter((a) => a.type === 'stock');
    else if (filter === 'indices') result = result.filter((a) => a.type === 'index');
    else if (filter === 'indicators') result = result.filter((a) => a.type === 'indicator');
    else if (filter === 'up') result = result.filter((a) => a.changePercent > 0);
    else if (filter === 'down') result = result.filter((a) => a.changePercent < 0);

    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (a) =>
          a.symbol.toLowerCase().includes(q) ||
          a.name.toLowerCase().includes(q) ||
          (a.country ?? '').toLowerCase().includes(q) ||
          (a.sector ?? '').toLowerCase().includes(q) ||
          (a.type === 'currency'
            ? 'moeda'
            : a.type === 'stock'
              ? 'ação'
              : a.type === 'index'
                ? 'índice'
                : 'indicador'
          ).includes(q)
      );
    }

    return result;
  }, [assets, search, filter]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none">
          🔍
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por ticker, nome, país ou setor..."
          className="w-full bg-slate-800/60 border border-slate-700 rounded-xl pl-9 pr-10 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-600 focus:bg-slate-800 transition-colors"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors text-sm leading-none"
            aria-label="Limpar busca"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
              filter === f.id
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
            )}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-slate-500 text-xs">
          {filtered.length} {filtered.length === 1 ? 'ativo' : 'ativos'}
        </span>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16 space-y-3">
          <p className="text-4xl">🔍</p>
          <p className="text-slate-400 text-sm">
            Nenhum ativo encontrado{search ? ` para "${search}"` : ''}.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setFilter('all');
            }}
            className="text-blue-400 hover:text-blue-300 text-xs transition-colors"
          >
            Limpar filtros
          </button>
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </div>
  );
}

function AssetCard({ asset }: { asset: Asset }) {
  const changeColor =
    asset.changePercent > 0
      ? 'text-green-400'
      : asset.changePercent < 0
        ? 'text-red-400'
        : 'text-slate-400';

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 hover:bg-slate-800/70 hover:border-slate-600 transition-colors p-4 flex flex-col gap-3">
      {/* Type + country/sector badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-400 bg-slate-700/60 px-2 py-0.5 rounded-full">
          {asset.type === 'currency'
            ? 'Moeda'
            : asset.type === 'stock'
              ? 'Ação'
              : asset.type === 'index'
                ? 'Índice'
                : 'Indicador'}
        </span>
        {asset.country && (
          <span className="text-xs text-slate-500">{asset.country}</span>
        )}
        {asset.sector && (
          <span className="text-xs text-slate-500 truncate max-w-[120px]">{asset.sector}</span>
        )}
      </div>

      {/* Ticker + name */}
      <div>
        <p className="font-mono font-bold text-white text-xl leading-none">{asset.symbol}</p>
        <p className="text-slate-400 text-xs mt-1 truncate">{asset.name}</p>
      </div>

      {/* Price + change */}
      <div className="flex items-end gap-2">
        <span className="text-white font-bold text-lg leading-none">
          {formatPrice(asset.price, asset.currency)}
        </span>
        <span className={cn('text-sm font-semibold', changeColor)}>
          {formatChangePercent(asset.changePercent)}
        </span>
      </div>

      {/* Trend + risk */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: getTrendColor(asset.trend) }}
          />
          <span className="text-xs text-slate-300">{TREND_LABELS[asset.trend]}</span>
        </div>
        <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded-full ml-auto">
          Risco: {RISK_LABELS[asset.riskLevel]}
        </span>
      </div>

      {/* CTA */}
      <Link
        href={`/ativo/${asset.id}`}
        className="mt-auto block w-full text-center text-xs font-medium bg-blue-900/40 hover:bg-blue-800/60 border border-blue-800/40 hover:border-blue-700 text-blue-300 hover:text-blue-200 rounded-lg py-2 transition-colors"
      >
        Estudar ativo →
      </Link>
    </div>
  );
}
