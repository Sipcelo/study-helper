'use client';

import { useState } from 'react';
import type { LessonChallenge } from '@/types/programming-content';
import { CodeBlock } from './code-block';

interface PracticeChallengeProps {
  challenge: LessonChallenge;
}

export function PracticeChallenge({ challenge }: PracticeChallengeProps) {
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-white">Mini Desafio</h2>
      <div className="rounded-lg border border-emerald-700/50 bg-emerald-950/20 overflow-hidden">
        <div className="px-4 py-3 bg-emerald-900/30 border-b border-emerald-700/50">
          <h3 className="font-semibold text-emerald-300">{challenge.title}</h3>
        </div>
        <div className="p-4 space-y-4">
          <p className="text-slate-300">{challenge.description}</p>

          <div className="flex gap-3">
            <button
              onClick={() => setShowHints(!showHints)}
              className="text-sm px-3 py-1.5 rounded border border-slate-600 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 transition-colors"
            >
              {showHints ? 'Ocultar dicas' : `Ver dicas (${challenge.hints.length})`}
            </button>
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-sm px-3 py-1.5 rounded border border-slate-600 text-slate-300 hover:border-amber-500 hover:text-amber-400 transition-colors"
            >
              {showSolution ? 'Ocultar solução' : 'Ver solução'}
            </button>
          </div>

          {showHints && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Dicas</p>
              <ul className="space-y-1">
                {challenge.hints.map((hint, i) => (
                  <li key={i} className="text-sm text-slate-300 flex gap-2">
                    <span className="text-emerald-500 shrink-0">{i + 1}.</span>
                    {hint}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showSolution && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-amber-400 uppercase tracking-wide">Solução</p>
              <CodeBlock code={challenge.solution} language="java" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
