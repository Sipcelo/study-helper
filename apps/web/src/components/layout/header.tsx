import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏙️</span>
          <div>
            <Link href="/" className="text-white font-bold text-lg leading-none hover:text-blue-300 transition-colors">
              Study Helper
            </Link>
            <p className="text-slate-400 text-xs">Cidade Financeira Interativa</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/planejar-estudos"
            className="text-xs text-slate-400 hover:text-amber-400 transition-colors hidden sm:block"
          >
            Planejar
          </Link>
          <Link
            href="/meu-plano"
            className="text-xs text-slate-400 hover:text-amber-400 transition-colors hidden sm:block"
          >
            Meu Plano
          </Link>
          <Link
            href="/programacao"
            className="text-xs text-slate-400 hover:text-emerald-300 transition-colors hidden sm:block"
          >
            Programação
          </Link>
          <Link
            href="/interact"
            className="text-xs text-slate-400 hover:text-violet-400 transition-colors hidden sm:block"
          >
            Interact
          </Link>
          <Link
            href="/ativos"
            className="text-xs text-slate-400 hover:text-white transition-colors hidden sm:block"
          >
            Ativos
          </Link>
          <Link
            href="/glossario"
            className="text-xs text-slate-400 hover:text-white transition-colors hidden sm:block"
          >
            Glossário
          </Link>
          <span className="text-xs text-amber-400 bg-amber-950/60 border border-amber-800/40 px-2.5 py-1 rounded-full">
            ⚠️ MVP · Dados mockados
          </span>
        </div>
      </div>
    </header>
  );
}
