'use client';

import { useState } from 'react';
import type { LessonQuestion, LessonDifficulty } from '@/types/programming-content';

interface InterviewQuestionsProps {
  questions: LessonQuestion[];
}

const DIFFICULTY_STYLES: Record<LessonDifficulty, string> = {
  easy: 'text-emerald-400 bg-emerald-950/40 border-emerald-800',
  medium: 'text-amber-400 bg-amber-950/40 border-amber-800',
  hard: 'text-red-400 bg-red-950/40 border-red-800',
};

const DIFFICULTY_LABELS: Record<LessonDifficulty, string> = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
};

function QuestionItem({ question }: { question: LessonQuestion }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="rounded-lg border border-slate-700 overflow-hidden">
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="w-full text-left px-4 py-3 flex items-start justify-between gap-3 hover:bg-slate-800/50 transition-colors"
      >
        <span className="text-slate-200 font-medium">{question.question}</span>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded border ${DIFFICULTY_STYLES[question.difficulty]}`}>
            {DIFFICULTY_LABELS[question.difficulty]}
          </span>
          <span className="text-slate-500 text-sm">{showAnswer ? '▲' : '▼'}</span>
        </div>
      </button>
      {showAnswer && (
        <div className="px-4 py-3 bg-slate-800/40 border-t border-slate-700">
          <p className="text-sm text-slate-300 leading-relaxed">{question.answer}</p>
        </div>
      )}
    </div>
  );
}

export function InterviewQuestions({ questions }: InterviewQuestionsProps) {
  if (questions.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold text-white">Perguntas de Entrevista</h2>
        <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
          {questions.length} pergunta{questions.length > 1 ? 's' : ''}
        </span>
      </div>
      <p className="text-sm text-slate-400">Clique para revelar a resposta.</p>
      <div className="space-y-3">
        {questions.map((q, i) => (
          <QuestionItem key={i} question={q} />
        ))}
      </div>
    </section>
  );
}
