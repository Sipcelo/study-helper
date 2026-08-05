'use client';

import Link from 'next/link';
import type { InteractTextResponse } from '@/types/interact';

const INTENT_LABELS: Record<string, string> = {
  EXPLAIN_CONCEPT: 'Explicar conceito',
  GENERATE_STUDY_PLAN: 'Gerar plano de estudos',
  SIMULATE_INTERVIEW: 'Simular entrevista',
  REVIEW_ANSWER: 'Revisar resposta',
  OPEN_RESOURCE: 'Abrir recurso',
  COMPARE_CONCEPTS: 'Comparar conceitos',
  UNKNOWN: 'Desconhecido',
};

const INTENT_COLORS: Record<string, string> = {
  EXPLAIN_CONCEPT: 'text-blue-400 bg-blue-950/50 border-blue-800/40',
  GENERATE_STUDY_PLAN: 'text-emerald-400 bg-emerald-950/50 border-emerald-800/40',
  SIMULATE_INTERVIEW: 'text-amber-400 bg-amber-950/50 border-amber-800/40',
  REVIEW_ANSWER: 'text-rose-400 bg-rose-950/50 border-rose-800/40',
  OPEN_RESOURCE: 'text-violet-400 bg-violet-950/50 border-violet-800/40',
  COMPARE_CONCEPTS: 'text-cyan-400 bg-cyan-950/50 border-cyan-800/40',
  UNKNOWN: 'text-slate-400 bg-slate-800/50 border-slate-700/40',
};

const ACTION_LABELS: Record<string, string> = {
  OPEN_RESOURCE: 'Abrir recurso',
  SHOW_EXPLANATION: 'Explicação',
  START_STUDY_PLAN: 'Iniciar plano de estudos',
  START_INTERVIEW: 'Iniciar entrevista',
  NONE: '',
};

interface InteractResultCardProps {
  result: InteractTextResponse;
}

export function InteractResultCard({ result }: InteractResultCardProps) {
  const intentColor =
    INTENT_COLORS[result.intent] ?? INTENT_COLORS['UNKNOWN'];
  const intentLabel =
    INTENT_LABELS[result.intent] ?? result.intent;

  const action = result.action;
  const hasAction = action.type !== 'NONE';

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

      {hasAction && (
        <div className="pt-2 border-t border-slate-700/50">
          <p className="text-xs text-slate-500 mb-2">
            Ação: <span className="text-slate-400">{ACTION_LABELS[action.type] || action.type}</span>
          </p>

          {/* OPEN_RESOURCE: link navegavel */}
          {action.type === 'OPEN_RESOURCE' && action.target && (
            <Link
              href={action.target}
              className="inline-flex items-center gap-1.5 text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              {ACTION_LABELS['OPEN_RESOURCE']}
              <span className="opacity-70">{action.target}</span>
            </Link>
          )}

          {/* START_STUDY_PLAN: CTA navegavel */}
          {action.type === 'START_STUDY_PLAN' && (
            <Link
              href={action.target || '/planejar-estudos'}
              className="inline-flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              {ACTION_LABELS['START_STUDY_PLAN']}
            </Link>
          )}

          {/* START_INTERVIEW: CTA navegavel */}
          {action.type === 'START_INTERVIEW' && (
            <Link
              href={action.target || '/interact'}
              className="inline-flex items-center gap-1.5 text-xs bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              {ACTION_LABELS['START_INTERVIEW']}
            </Link>
          )}

          {/* SHOW_EXPLANATION: link se target existir, senao texto da resposta */}
          {action.type === 'SHOW_EXPLANATION' && action.target && (
            <Link
              href={action.target}
              className="inline-flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              Abrir explicação
              <span className="opacity-70">{action.target}</span>
            </Link>
          )}
          {action.type === 'SHOW_EXPLANATION' && !action.target && (
            <div className="text-xs text-slate-300 bg-slate-900/60 px-3 py-2 rounded-lg leading-relaxed">
              {result.answer}
            </div>
          )}

          {/* Fallback para action desconhecida */}
          {!['OPEN_RESOURCE', 'START_STUDY_PLAN', 'START_INTERVIEW', 'SHOW_EXPLANATION'].includes(action.type) && (
            <div className="text-xs text-slate-500 bg-slate-900/30 px-3 py-2 rounded-lg border border-slate-700/30">
              Ação não reconhecida
            </div>
          )}
        </div>
      )}
    </div>
  );
}