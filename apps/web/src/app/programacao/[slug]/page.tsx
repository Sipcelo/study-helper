import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProgrammingTrackDetail } from '@/components/programming/programming-track-detail';
import {
  getProgrammingTrackBySlug,
  getProgrammingTracks,
} from '@/lib/programming/get-programming-tracks';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tracks = getProgrammingTracks();
  return tracks.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const track = getProgrammingTrackBySlug(slug);
  if (!track) {
    return { title: 'Trilha não encontrada — Study Helper' };
  }
  return {
    title: `${track.title} — Study Helper`,
    description: track.summary,
  };
}

export default async function TrackPage({ params }: Props) {
  const { slug } = await params;
  const track = getProgrammingTrackBySlug(slug);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {track ? (
          <ProgrammingTrackDetail track={track} />
        ) : (
          <div className="text-center py-24 space-y-4">
            <p className="text-4xl">🔍</p>
            <h1 className="text-xl font-semibold text-white">Trilha não encontrada</h1>
            <p className="text-slate-400 text-sm">
              A trilha{' '}
              <span className="font-mono text-slate-300">&quot;{slug}&quot;</span> não existe.
            </p>
            <Link
              href="/programacao"
              className="inline-block mt-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              ← Ver todas as trilhas
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
