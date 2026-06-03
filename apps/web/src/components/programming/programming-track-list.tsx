'use client';

import { useState, useMemo } from 'react';
import type { StudyTrack } from '@/types/programming';
import { ProgrammingTrackCard } from './programming-track-card';
import { cn } from '@/lib/cn';

type FilterId = 'all' | 'fundamentos' | 'java' | 'spring' | 'carreira';

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'fundamentos', label: 'Fundamentos' },
  { id: 'java', label: 'Java' },
  { id: 'spring', label: 'Spring' },
  { id: 'carreira', label: 'Carreira' },
];

interface ProgrammingTrackListProps {
  tracks: StudyTrack[];
}

export function ProgrammingTrackList({ tracks }: ProgrammingTrackListProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterId>('all');

  const filtered = useMemo(() => {
    let result = tracks;

    if (filter !== 'all') {
      result = result.filter((t) => t.tags.includes(filter));
    }

    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.summary.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.includes(q)) ||
          t.topics.some((topic) => topic.title.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [tracks, search, filter]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-md">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
        <input
          type="text"
          placeholder="Buscar trilha ou tópico..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-700 transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'text-xs px-3 py-1.5 rounded-full border transition-colors',
              filter === f.id
                ? 'bg-emerald-900/60 border-emerald-700 text-emerald-300'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((track) => (
            <ProgrammingTrackCard key={track.id} track={track} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-500 space-y-3">
          <p className="text-2xl">🔍</p>
          <p className="text-sm">
            {search
              ? `Nenhuma trilha encontrada para "${search}"`
              : 'Nenhuma trilha nesta categoria.'}
          </p>
          <button
            onClick={() => {
              setSearch('');
              setFilter('all');
            }}
            className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}
