import type { CommonMistake } from '@/types/programming-content';
import { CodeBlock } from './code-block';

interface CommonMistakesProps {
  mistakes: CommonMistake[];
}

export function CommonMistakes({ mistakes }: CommonMistakesProps) {
  if (mistakes.length === 0) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-white">Erros Comuns</h2>
      <div className="space-y-6">
        {mistakes.map((mistake, index) => (
          <div key={index} className="rounded-lg border border-slate-700 overflow-hidden">
            <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
              <h3 className="font-semibold text-white">{mistake.title}</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-red-400 uppercase tracking-wide">Errado</p>
                <CodeBlock code={mistake.wrong} language="java" />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Correto</p>
                <CodeBlock code={mistake.correct} language="java" />
              </div>
              <p className="text-sm text-slate-300 bg-slate-800/60 rounded p-3 border border-slate-700">
                {mistake.explanation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
