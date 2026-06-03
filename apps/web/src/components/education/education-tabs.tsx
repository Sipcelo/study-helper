'use client';

import { useState } from 'react';
import type { AssetEducation } from '@/types/education';
import { cn } from '@/lib/cn';
import { ConceptChips } from './concept-chips';

const TABS = [
  { id: 'overview', label: 'Visão Geral' },
  { id: 'moves', label: 'Sobe/Cai' },
  { id: 'risks', label: 'Riscos' },
  { id: 'example', label: 'Exemplo' },
  { id: 'questions', label: 'Perguntas' },
] as const;

type TabId = (typeof TABS)[number]['id'];

interface EducationTabsProps {
  education: AssetEducation;
}

export function EducationTabs({ education: edu }: EducationTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  return (
    <div className="space-y-3 border-t border-slate-700/60 pt-4">
      <h4 className="text-slate-400 text-xs font-medium uppercase tracking-wider">
        Análise educacional
      </h4>

      <div role="tablist" aria-label="Análise educacional" className="flex gap-1 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'text-xs px-2.5 py-1 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 bg-slate-700/50 hover:bg-slate-700 hover:text-slate-200',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="min-h-[100px]">
        {activeTab === 'overview' && (
          <div className="space-y-3">
            <p className="text-slate-200 text-sm leading-relaxed">{edu.beginnerExplanation}</p>
            <ConceptChips concepts={edu.relatedConcepts} />
          </div>
        )}

        {activeTab === 'moves' && (
          <div className="space-y-2.5">
            <EduBlock
              icon="↑"
              title="Por que pode subir"
              items={edu.whyItMovesUp}
              colorClass="text-green-400"
              bgClass="bg-green-950/25 border-green-900/30"
            />
            <EduBlock
              icon="↓"
              title="Por que pode cair"
              items={edu.whyItMovesDown}
              colorClass="text-red-400"
              bgClass="bg-red-950/25 border-red-900/30"
            />
          </div>
        )}

        {activeTab === 'risks' && (
          <EduBlock
            icon="⚠"
            title="Riscos principais"
            items={edu.mainRisks}
            colorClass="text-amber-400"
            bgClass="bg-amber-950/25 border-amber-900/30"
          />
        )}

        {activeTab === 'example' && (
          <div className="bg-slate-700/25 border border-slate-600/30 rounded-xl p-3 space-y-1">
            <h5 className="text-slate-300 text-xs font-medium">💡 Exemplo prático</h5>
            <p className="text-slate-300 text-sm leading-relaxed">{edu.practicalExample}</p>
          </div>
        )}

        {activeTab === 'questions' && edu.studyQuestions.length > 0 && (
          <div className="space-y-2">
            {edu.studyQuestions.map((q, i) => (
              <div
                key={i}
                className="bg-slate-800/60 border border-slate-700/40 rounded-lg px-3 py-2.5 space-y-1"
              >
                <p className="text-slate-200 text-sm leading-snug">{q.question}</p>
                {q.hint && (
                  <p className="text-slate-500 text-xs">
                    <span className="text-slate-600">Dica:</span> {q.hint}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface EduBlockProps {
  icon: string;
  title: string;
  items: string[];
  colorClass: string;
  bgClass: string;
}

function EduBlock({ icon, title, items, colorClass, bgClass }: EduBlockProps) {
  if (items.length === 0) return null;
  return (
    <div className={cn('rounded-xl border p-3 space-y-1.5', bgClass)}>
      <h5 className={cn('text-xs font-medium', colorClass)}>
        {icon} {title}
      </h5>
      <ul className="space-y-0.5">
        {items.map((item, i) => (
          <li key={i} className="text-slate-300 text-sm flex gap-2">
            <span className={cn('shrink-0 mt-0.5 leading-none', colorClass)}>·</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
