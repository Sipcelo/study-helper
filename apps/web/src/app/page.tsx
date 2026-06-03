'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { getCurrencies, getStocks, getIndices, getIndicators } from '@/lib/assets/get-assets';
import { MARKET_SUMMARY } from '@/data/market-summary';
import { useMarketStore } from '@/features/market/use-market-store';
import { CityMap } from '@/components/city/city-map';
import { MarketSummaryPlaza } from '@/components/city/market-summary-plaza';
import { AssetDetailPanel } from '@/components/asset-detail-panel';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const currencies = getCurrencies();
const stocks = getStocks();
const indices = [...getIndices(), ...getIndicators()];

export default function HomePage() {
  const { selectedAsset, toggleAsset, selectAsset } = useMarketStore();
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (selectedAsset && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedAsset?.id]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Hero */}
        <section className="text-center space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 bg-blue-950/40 border border-blue-800/40 rounded-full px-4 py-1.5 text-sm text-blue-300">
            <span>🏙️</span>
            Plataforma educacional · Sprint 1
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Explore o mercado financeiro
            <br />
            <span className="text-blue-400">como uma cidade viva</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Cada prédio é um ativo. Cada distrito, um mercado. Clique em qualquer prédio para
            aprender sobre o ativo.
          </p>
        </section>

        {/* Plaza */}
        <section>
          <MarketSummaryPlaza summary={MARKET_SUMMARY} />
        </section>

        {/* Educational panel */}
        <section ref={panelRef} className="scroll-mt-20">
          <h3 className="text-slate-300 text-sm font-medium mb-3 uppercase tracking-wider">
            Painel educacional
          </h3>
          <div className="max-w-2xl">
            <AssetDetailPanel asset={selectedAsset} onClose={() => selectAsset(null)} />
          </div>
        </section>

        {/* Module teaser */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl border border-emerald-900/30 bg-emerald-950/10">
          <div>
            <p className="text-white font-medium text-sm">☕ Módulo Programação disponível</p>
            <p className="text-slate-400 text-xs mt-0.5">
              10 trilhas de Java, Spring Boot, REST e carreira junior
            </p>
          </div>
          <Link
            href="/programacao"
            className="shrink-0 text-xs text-emerald-400 hover:text-emerald-300 transition-colors border border-emerald-900/50 hover:border-emerald-800 rounded-lg px-4 py-2"
          >
            Explorar trilhas →
          </Link>
        </section>

        {/* City map */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-300 text-sm font-medium uppercase tracking-wider">
              Cidade financeira
            </h3>
            <Link
              href="/ativos"
              className="text-xs text-slate-500 hover:text-blue-400 transition-colors"
            >
              Ver todos os ativos →
            </Link>
          </div>
          <CityMap
            currencies={currencies}
            stocks={stocks}
            indices={indices}
            selectedAssetId={selectedAsset?.id}
            onAssetSelect={toggleAsset}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
