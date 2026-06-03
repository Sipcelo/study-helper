import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-16 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-2">
        <div className="flex justify-center gap-4 text-xs">
          <Link href="/" className="text-slate-500 hover:text-slate-300 transition-colors">
            Início
          </Link>
          <Link href="/planejar-estudos" className="text-slate-500 hover:text-amber-400 transition-colors">
            Planejar
          </Link>
          <Link href="/meu-plano" className="text-slate-500 hover:text-amber-400 transition-colors">
            Meu Plano
          </Link>
          <Link
            href="/programacao"
            className="text-slate-500 hover:text-emerald-400 transition-colors"
          >
            Programação
          </Link>
          <Link href="/interact" className="text-slate-500 hover:text-violet-400 transition-colors">
            Interact
          </Link>
          <Link href="/ativos" className="text-slate-500 hover:text-slate-300 transition-colors">
            Ativos
          </Link>
          <Link href="/glossario" className="text-slate-500 hover:text-slate-300 transition-colors">
            Glossário
          </Link>
        </div>
        <p className="text-slate-500 text-xs">
          Study Helper · MVP v0.1.0 · Dados mockados para fins educacionais
        </p>
        <p className="text-slate-600 text-xs">
          Conteúdo educacional. Não é recomendação de investimento. Dados podem estar atrasados ou
          ser demonstrativos.
        </p>
      </div>
    </footer>
  );
}
