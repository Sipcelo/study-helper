'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  getGlossaryByCategory,
  getGlossaryConcept,
  searchGlossaryConcepts,
} from '@/lib/education/get-glossary-concept';
import type { GlossaryConcept, GlossaryCategory } from '@/types/glossary';

const CATEGORY_ORDER: GlossaryCategory[] = [
  'Mercado',
  'Moedas',
  'Ações',
  'Risco',
  'Macroeconomia',
  'Tecnologia e Setores',
];

// ── Main page ─────────────────────────────────────────────────────────────────

export default function GlossarioPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <Suspense fallback={<GlossarioSkeleton />}>
        <GlossarioContent />
      </Suspense>
      <Footer />
    </div>
  );
}

function GlossarioSkeleton() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="h-8 w-48 bg-slate-800 rounded animate-pulse mb-4" />
      <div className="h-4 w-96 bg-slate-800/60 rounded animate-pulse" />
    </main>
  );
}

// ── Content (reads search params) ─────────────────────────────────────────────

function GlossarioContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>(() => searchParams.get('search') ?? '');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const byCategory = useMemo(() => getGlossaryByCategory(), []);
  const searchResults = useMemo(
    () => (query.trim() ? searchGlossaryConcepts(query) : null),
    [query],
  );

  function toggleExpanded(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Breadcrumb + title */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <Link href="/" className="hover:text-slate-300 transition-colors flex items-center gap-1">
            ← Cidade financeira
          </Link>
          <span>›</span>
          <span className="text-slate-400">Glossário</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Glossário Financeiro</h1>
        <p className="text-slate-400 text-sm max-w-xl">
          Definições dos principais termos do mercado financeiro. Clique em qualquer termo para
          ver a explicação completa.
        </p>
      </section>

      {/* Search */}
      <section>
        <input
          type="search"
          placeholder="Buscar: inflação, dividendos, GPU, câmbio..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setExpandedId(null);
          }}
          className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
        />
      </section>

      {/* Results or category list */}
      {searchResults ? (
        <section className="space-y-3">
          <p className="text-slate-500 text-xs">
            {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} para &ldquo;
            {query}&rdquo;
          </p>
          {searchResults.length === 0 ? (
            <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-5 space-y-2">
              <p className="text-slate-300 text-sm">
                Nenhum conceito encontrado para &ldquo;{query}&rdquo;.
              </p>
              <p className="text-slate-500 text-xs">
                Tente buscar por{' '}
                {['inflação', 'dividendos', 'câmbio'].map((s, i, arr) => (
                  <span key={s}>
                    <button
                      type="button"
                      onClick={() => setQuery(s)}
                      className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2"
                    >
                      {s}
                    </button>
                    {i < arr.length - 1 ? ', ' : '.'}
                  </span>
                ))}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {searchResults.map((c) => (
                <ConceptCard
                  key={c.id}
                  concept={c}
                  expanded={expandedId === c.id}
                  onToggle={() => toggleExpanded(c.id)}
                />
              ))}
            </div>
          )}
        </section>
      ) : (
        CATEGORY_ORDER.map((cat) => {
          const concepts = byCategory[cat];
          if (!concepts || concepts.length === 0) return null;
          return (
            <section key={cat} className="space-y-3">
              <h2 className="text-slate-400 text-xs font-medium uppercase tracking-wider border-b border-slate-800 pb-2">
                {cat}
              </h2>
              <div className="space-y-2">
                {concepts.map((c) => (
                  <ConceptCard
                    key={c.id}
                    concept={c}
                    expanded={expandedId === c.id}
                    onToggle={() => toggleExpanded(c.id)}
                  />
                ))}
              </div>
            </section>
          );
        })
      )}

      <p className="text-slate-600 text-xs text-center pb-4">
        ⚠️ Conteúdo educacional — não é recomendação de investimento.
      </p>
    </main>
  );
}

// ── Concept card ──────────────────────────────────────────────────────────────

interface ConceptCardProps {
  concept: GlossaryConcept;
  expanded: boolean;
  onToggle: () => void;
}

function ConceptCard({ concept, expanded, onToggle }: ConceptCardProps) {
  return (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="w-full text-left px-4 py-3 flex items-start justify-between gap-3 hover:bg-slate-800/60 transition-colors"
      >
        <div className="space-y-0.5 min-w-0">
          <span className="text-white text-sm font-medium">{concept.title}</span>
          <p className="text-slate-400 text-xs leading-relaxed">{concept.shortDefinition}</p>
        </div>
        <span className="text-slate-600 text-xs shrink-0 mt-0.5 select-none">
          {expanded ? '▲' : '▼'}
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-700/40 pt-3">
          <p className="text-slate-200 text-sm leading-relaxed">{concept.fullExplanation}</p>

          {concept.example && (
            <div className="bg-slate-700/25 border border-slate-600/30 rounded-lg p-3 space-y-1">
              <p className="text-slate-400 text-xs font-medium">💡 Exemplo</p>
              <p className="text-slate-300 text-sm leading-relaxed">{concept.example}</p>
            </div>
          )}

          {concept.relatedTerms.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
                Termos relacionados
              </p>
              <div className="flex flex-wrap gap-1.5">
                {concept.relatedTerms.map((termId) => {
                  const term = getGlossaryConcept(termId);
                  return (
                    <span
                      key={termId}
                      className="text-xs text-slate-400 bg-slate-700/40 border border-slate-600/30 px-2.5 py-0.5 rounded-full"
                    >
                      {term?.title ?? termId}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
