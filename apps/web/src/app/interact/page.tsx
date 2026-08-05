import type { Metadata } from 'next';
import { InteractPanel } from '@/components/interact/interact-panel';

export const metadata: Metadata = {
  title: 'Interact | Study Helper',
  description: 'Converse com a API Interact do Study Helper.',
};

export default function InteractPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-violet-400 bg-violet-950/50 border border-violet-800/40 px-2.5 py-0.5 rounded-full">
            API Interact
          </span>
          <span className="text-xs text-slate-500">Java Spring Boot · localhost:8081</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Interact</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Digite uma pergunta, escolha o domínio e envie para a API Java. A resposta classifica
          sua intenção e sugere uma ação educacional.
        </p>
      </div>

      <InteractPanel />

      <div className="mt-10 p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
        <p className="text-xs text-slate-500 font-medium mb-1">Exemplos de perguntas</p>
        <ul className="text-xs text-slate-400 space-y-1">
          <li>→ me explica o que é REST</li>
          <li>→ me faça um quiz sobre Spring Boot</li>
          <li>→ quero ver exemplos de polimorfismo</li>
          <li>→ buscar conteúdo sobre Docker</li>
        </ul>
      </div>
    </main>
  );
}
