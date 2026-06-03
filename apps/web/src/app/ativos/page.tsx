import type { Metadata } from 'next';
import Link from 'next/link';
import { getAssets } from '@/lib/assets/get-assets';
import { AssetCatalog } from '@/components/asset/asset-catalog';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Ativos — Study Helper',
  description: 'Explore e estude todos os ativos disponíveis no Study Helper.',
};

export default function AssetsPage() {
  const assets = getAssets();

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="space-y-1">
          <nav className="text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-300 transition-colors">
              ← Cidade financeira
            </Link>
          </nav>
          <h1 className="text-white text-2xl font-bold">Catálogo de Ativos</h1>
          <p className="text-slate-400 text-sm">
            Explore todos os ativos disponíveis. Clique em qualquer card para estudar o ativo em
            detalhes.
          </p>
        </div>

        <AssetCatalog assets={assets} />
      </main>
      <Footer />
    </div>
  );
}
