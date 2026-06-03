import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <p className="text-6xl font-bold text-slate-700">404</p>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-slate-200">Página não encontrada</h1>
          <p className="text-slate-400 text-sm">
            Este conteúdo ainda não existe ou foi movido.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/programacao"
            className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-medium transition-colors"
          >
            Ver trilhas de programação
          </Link>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 text-sm font-medium transition-colors"
          >
            Ir para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
