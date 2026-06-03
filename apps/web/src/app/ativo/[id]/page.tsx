import type { Metadata } from 'next';
import Link from 'next/link';
import { getAssetById } from '@/lib/assets/get-assets';
import { AssetStudyPage } from '@/components/asset/asset-study-page';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const asset = getAssetById(id);
  if (!asset) {
    return { title: 'Ativo não encontrado — Study Helper' };
  }
  return {
    title: `${asset.symbol} — Study Helper`,
    description: `Estude ${asset.name} no Study Helper`,
  };
}

export default async function AssetPage({ params }: PageProps) {
  const { id } = await params;
  const asset = getAssetById(id);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      {asset ? (
        <AssetStudyPage asset={asset} />
      ) : (
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center space-y-4">
          <p className="text-5xl">🔍</p>
          <h1 className="text-white text-xl font-bold">Ativo não encontrado</h1>
          <p className="text-slate-400 text-sm">
            Não existe um ativo com o id{' '}
            <code className="text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded text-xs">
              {id}
            </code>
            .
          </p>
          <Link
            href="/"
            className="inline-block mt-4 text-blue-400 hover:text-blue-300 transition-colors text-sm"
          >
            ← Voltar para a cidade
          </Link>
        </main>
      )}
      <Footer />
    </div>
  );
}
