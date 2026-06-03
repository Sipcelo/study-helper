import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProgrammingHero } from '@/components/programming/programming-hero';
import { ProgrammingTrackList } from '@/components/programming/programming-track-list';
import { getProgrammingTracks } from '@/lib/programming/get-programming-tracks';

export const metadata: Metadata = {
  title: 'Programação — Study Helper',
  description:
    'Trilhas de aprendizado para Java, Spring Boot, REST e carreira junior. Aprenda backend do zero à primeira vaga.',
};

export default function ProgrammingPage() {
  const tracks = getProgrammingTracks();

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        <ProgrammingHero trackCount={tracks.length} />

        {/* Track list with search and filters */}
        <section>
          <ProgrammingTrackList tracks={tracks} />
        </section>

        {/* Why study this */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 space-y-6">
          <h2 className="text-lg font-semibold text-white">Por que estudar isso?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <p className="text-emerald-400 font-medium">☕ Java no mercado</p>
              <p className="text-slate-400">
                Java é a linguagem mais usada em backends corporativos no Brasil. Spring Boot está
                presente na maioria das vagas de backend.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-emerald-400 font-medium">🎯 Foco em entrevista</p>
              <p className="text-slate-400">
                Cada trilha termina com perguntas frequentes de entrevista. Você aprende com o
                destino em mente: conseguir a vaga.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-emerald-400 font-medium">📁 Portfolio real</p>
              <p className="text-slate-400">
                Ao completar as trilhas principais você terá uma API Spring Boot publicada, testada
                e documentada — pronta para o LinkedIn.
              </p>
            </div>
          </div>
        </section>

        {/* Module link */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl border border-slate-800 bg-slate-900/30">
          <div>
            <p className="text-white font-medium text-sm">Outro laboratório de estudo</p>
            <p className="text-slate-400 text-xs mt-0.5">
              Explore o mercado financeiro como uma cidade interativa
            </p>
          </div>
          <Link
            href="/"
            className="shrink-0 text-xs text-blue-400 hover:text-blue-300 transition-colors border border-blue-900/50 hover:border-blue-800 rounded-lg px-4 py-2"
          >
            🏙️ Cidade Financeira →
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
