'use client';

import type { InteractHistoryItem } from '@/types/interact';

interface InteractHistoryListProps {
  items: InteractHistoryItem[];
  onSelect: (input: string) => void;
  onClear: () => void;
}

const ACTION_LABELS: Record<string, string> = {
  OPEN_RESOURCE: 'Abrir recurso',
  SHOW_EXPLANATION: 'Explicação',
  START_STUDY_PLAN: 'Plano de estudos',
  START_INTERVIEW: 'Entrevista',
  NONE: '',
};

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max) + '…' : text;
}

export function InteractHistoryList({ items, onSelect, onClear }: InteractHistoryListProps) {
  if (items.length === 0) {
    return (
      <div className="text-xs text-slate-500 bg-slate-900/30 border border-slate-800/50 rounded-lg px-4 py-3">
        Nenhuma interação recente.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500 font-medium">
          Histórico ({items.length})
        </p>
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-slate-500 hover:text-red-400 transition-colors"
        >
          Limpar histórico
        </button>
      </div>

      <div className="space-y-1 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.input)}
            className="w-full text-left bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800/40 rounded-lg px-3 py-2 transition-colors"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-slate-300 truncate">
                {truncate(item.input, 40)}
              </span>
              <span className="text-[10px] text-slate-600 whitespace-nowrap">
                {formatTime(item.createdAt)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] text-slate-600 bg-slate-800/60 px-1.5 py-0.5 rounded">
                {item.domain}
              </span>
              {item.actionType !== 'NONE' && (
                <span className="text-[10px] text-slate-600 bg-slate-800/60 px-1.5 py-0.5 rounded">
                  {ACTION_LABELS[item.actionType] || item.actionType}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}