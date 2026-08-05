'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { interactText } from '@/lib/api/interact-client';
import type { InteractDomain, InteractTextResponse } from '@/types/interact';
import { InteractResultCard } from './interact-result-card';
import { InteractHistoryList } from './interact-history-list';
import { useWebSpeech } from '@/hooks/use-web-speech';
import { useInteractHistory } from '@/hooks/use-interact-history';
import { savePlannerContext } from '@/lib/study-planner-context';

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

  const {
    transcript,
    isListening: voiceListening,
    isSupported: voiceSupported,
    error: voiceError,
    startListening,
    stopListening,
  } = useWebSpeech();

  const { items, addItem, clearHistory } = useInteractHistory();

  const prevTranscriptRef = useRef('');

  const handleVoiceSubmit = useCallback(async (text: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await interactText(text, domain);
      setResult(response);
      addItem(text, domain, response);
      savePlannerContext({
        source: 'interact',
        input: text,
        domain: response.domain,
        intent: response.intent,
        actionType: response.action.type,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [domain, addItem]);

  // When voice transcript changes, fill the textarea and auto-submit
  useEffect(() => {
    if (transcript && transcript !== prevTranscriptRef.current) {
      prevTranscriptRef.current = transcript;
      setInput(transcript);
      if (transcript.trim()) {
        handleVoiceSubmit(transcript.trim());
      }
    }
  }, [transcript, handleVoiceSubmit]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await interactText(input.trim(), domain);
      setResult(response);
      addItem(input.trim(), domain, response);
      savePlannerContext({
        source: 'interact',
        input: input.trim(),
        domain: response.domain,
        intent: response.intent,
        actionType: response.action.type,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [input, domain, addItem]);

  function handleMicClick() {
    if (voiceListening) {
      stopListening();
    } else {
      prevTranscriptRef.current = '';
      startListening();
    }
  }

  function handleHistorySelect(text: string) {
    setInput(text);
    // Não enviar automaticamente — usuario pode editar antes
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
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ex: me explica o que é REST"
              rows={3}
              className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 resize-none"
            />
            {voiceSupported && (
              <button
                type="button"
                onClick={handleMicClick}
                disabled={loading}
                title={voiceListening ? 'Parar gravação' : 'Falar pergunta'}
                className={`absolute right-2 bottom-2 p-2 rounded-lg transition-colors ${
                  voiceListening
                    ? 'bg-red-600 hover:bg-red-500 text-white animate-pulse'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.93V20H8a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-3v-3.07A7 7 0 0 0 19 10Z" />
                </svg>
              </button>
            )}
          </div>
          {voiceListening && (
            <p className="text-xs text-green-400 mt-1.5 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Gravando... fale sua pergunta
            </p>
          )}
          {voiceError && (
            <p className="text-xs text-amber-400 mt-1.5">{voiceError}</p>
          )}
          {!voiceSupported && (
            <p className="text-xs text-slate-500 mt-1.5">
              Reconhecimento de voz não disponível neste navegador. Use Chrome ou Edge.
            </p>
          )}
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
            Verifique se o backend Java está rodando em localhost:8081.
          </p>
        </div>
      )}

      {result && <InteractResultCard result={result} />}

      <div className="pt-4 border-t border-slate-800/50">
        <InteractHistoryList
          items={items}
          onSelect={handleHistorySelect}
          onClear={clearHistory}
        />
      </div>
    </div>
  );
}