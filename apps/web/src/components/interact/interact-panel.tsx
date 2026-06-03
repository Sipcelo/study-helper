'use client';

import { useState } from 'react';
import { interactText } from '@/lib/api/interact-client';
import type { InteractDomain, InteractTextResponse } from '@/types/interact';
import { InteractResultCard } from './interact-result-card';

const DOMAINS: { value: InteractDomain; label: string }[] = [
  { value: 'programming', label: 'Programação' },
  { value: 'career', label: 'Carreira' },
  { value: 'finance', label: 'Finanças' },
  { value: 'study', label: 'Estudo' },
];

export function InteractPanel() {
  const [input, setInput] = useState('');
  const [domain, setDomain] = useState<InteractDomain>('programming');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InteractTextResponse | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await interactText(input.trim(), domain);
      setResult(response);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1.5">
            Domínio
          </label>
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value as InteractDomain)}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
          >
            {DOMAINS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1.5">
            Pergunta
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ex: me explica o que é REST"
            rows={3}
            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
        >
          {loading ? 'Consultando API…' : 'Enviar para API Interact'}
        </button>
      </form>

      {error && (
        <div className="bg-red-950/50 border border-red-800/50 rounded-lg px-4 py-3">
          <p className="text-sm text-red-400 font-medium">Erro de rede</p>
          <p className="text-xs text-red-500 mt-0.5">{error}</p>
          <p className="text-xs text-slate-500 mt-2">
            Verifique se o backend Java está rodando em localhost:8080.
          </p>
        </div>
      )}

      {result && <InteractResultCard result={result} />}
    </div>
  );
}
