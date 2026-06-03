'use client';

import { useState } from 'react';
import type { EducationConcept } from '@/types/education';
import { getGlossaryConcept } from '@/lib/education/get-glossary-concept';
import { ConceptModal } from './concept-modal';

interface ConceptChipsProps {
  concepts: EducationConcept[];
}

export function ConceptChips({ concepts }: ConceptChipsProps) {
  const [open, setOpen] = useState<EducationConcept | null>(null);

  if (concepts.length === 0) return null;
  return (
    <div className="space-y-1.5">
      <h5 className="text-slate-400 text-xs font-medium uppercase tracking-wider">
        Conceitos relacionados
      </h5>
      <div className="flex flex-wrap gap-1.5">
        {concepts.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setOpen(c)}
            aria-label={`Ver conceito: ${c.label}`}
            className="select-none text-xs text-slate-400 bg-slate-800/60 border border-slate-700/50 px-2.5 py-0.5 rounded-full hover:border-slate-600 hover:text-slate-300 transition-colors cursor-pointer"
          >
            {c.label}
          </button>
        ))}
      </div>

      {open && (
        <ConceptModal
          concept={getGlossaryConcept(open.id)}
          fallback={open}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}
