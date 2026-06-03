'use client';

import Link from 'next/link';
import type { InteractTextResponse } from '@/types/interact';

const INTENT_LABELS: Record<string, string> = {
  EXPLAIN_CONCEPT: 'Explicar conceito',
  QUIZ_ME: 'Quiz',
  NAVIGATE_TO: 'Navegar',
  SEARCH_TOPIC: 'Buscar tópico',
  UNKNOWN: 'Desconhecido',
};

const INTENT_COLORS: Record<string, string> = {
  EXPLAIN_CONCEPT: 'text-blue-400 bg-blue-950/50 border-blue-800/40',
  QUIZ_ME: 'text-amber-400 bg-amber-950/50 border-amber-800/40',
  NAVIGATE_TO: 'text-emerald-400 bg-emerald-950/50 border-emerald-800/40',
  SEARCH_TOPIC: 'text-violet-400 bg-violet-950/50 border-violet-800/40',
  UNKNOWN: 'text-slate-400 bg-slate-800/50 border-slate-700/40',
};

interface InteractResultCardProps {
  result: InteractTextResponse;
}

export function InteractResultCard({ result }: InteractResultCardProps) {
  const intentColor =
    INTENT_COLORS[result.intent] ?? INTENT_COLORS['UNKNOWN'];
  const intentLabel =
    INTENT_LABELS[result.intent] ?? result.intent;

  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-sm font-medium text-slate-300">Resposta da API</h3>
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${intentColor}`}
        >
          {intentLabel}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-slate-500 mb-0.5">Transcrição</p>
          <p className="text-slate-300">{result.transcript}</p>
        </div>
        <div>
          <p className="text-slate-500 mb-0.5">Domínio</p>
          <p className="text-slate-300">{result.domain}</p>
        </div>
      </div>

      <div>
        <p className="text-xs text-slate-500 mb-1.5">Resposta</p>
        <p className="text-sm text-slate-200 leading-relaxed">{result.answer}</p>
      </div>

      {result.action.type !== 'NONE' && result.action.target && (
        <div className="pt-2 border-t border-slate-700/50">
          <p className="text-xs text-slate-500 mb-2">
            Ação: <span className="text-slate-400">{result.action.type}</span>
          </p>
          {result.action.type === 'OPEN_RESOURCE' ? (
            <Link
              href={result.action.target}
              className="inline-flex items-center gap-1.5 text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              Abrir recurso
              <span className="opacity-70">{result.action.target}</span>
            </Link>
          ) : (
            <p className="text-xs text-slate-400 font-mono bg-slate-900/60 px-3 py-1.5 rounded-lg">
              {result.action.target}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
