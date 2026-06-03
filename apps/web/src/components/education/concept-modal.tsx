'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import type { GlossaryConcept } from '@/types/glossary';
import type { EducationConcept } from '@/types/education';
import { getGlossaryConcept } from '@/lib/education/get-glossary-concept';

interface ConceptModalProps {
  concept: GlossaryConcept | null;
  fallback: EducationConcept;
  onClose: () => void;
}

export function ConceptModal({ concept, fallback, onClose }: ConceptModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="concept-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            {concept && (
              <span className="text-xs text-slate-500 uppercase tracking-wider mb-1 block">
                {concept.category}
              </span>
            )}
            <h2
              id="concept-modal-title"
              className="text-white font-semibold text-lg leading-snug"
            >
              {concept ? concept.title : fallback.label}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="text-slate-500 hover:text-white transition-colors shrink-0 mt-0.5"
          >
            ✕
          </button>
        </div>

        {concept ? (
          <>
            <p className="text-slate-300 text-sm font-medium leading-snug">
              {concept.shortDefinition}
            </p>

            <div className="space-y-1">
              <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                Explicação
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed">{concept.fullExplanation}</p>
            </div>

            {concept.example && (
              <div className="bg-slate-800/60 border border-slate-700/40 rounded-xl p-3 space-y-1">
                <h3 className="text-slate-400 text-xs font-medium">💡 Exemplo</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{concept.example}</p>
              </div>
            )}

            {concept.relatedTerms.length > 0 && (
              <div className="space-y-1.5">
                <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                  Termos relacionados
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {concept.relatedTerms.map((termId) => {
                    const term = getGlossaryConcept(termId);
                    return (
                      <span
                        key={termId}
                        className="text-xs text-slate-400 bg-slate-800/60 border border-slate-700/50 px-2.5 py-0.5 rounded-full"
                      >
                        {term?.title ?? termId}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-slate-200 text-sm leading-relaxed">{fallback.explanation}</p>
        )}

        <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-800">
          {concept ? (
            <Link
              href={`/glossario?search=${encodeURIComponent(concept.title)}`}
              onClick={onClose}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Ver no glossário →
            </Link>
          ) : (
            <span />
          )}
          <p className="text-slate-600 text-xs shrink-0">⚠️ Apenas educacional</p>
        </div>
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modal, document.body);
}
