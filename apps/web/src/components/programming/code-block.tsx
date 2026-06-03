'use client';

import { useState } from 'react';
import type { ContentLanguage } from '@/types/programming-content';

interface CodeBlockProps {
  code: string;
  language: ContentLanguage;
  title?: string;
  explanation?: string;
}

const LANGUAGE_LABELS: Record<ContentLanguage, string> = {
  java: 'Java',
  typescript: 'TypeScript',
  sql: 'SQL',
  bash: 'Bash',
  json: 'JSON',
  yaml: 'YAML',
};

export function CodeBlock({ code, language, title, explanation }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-lg border border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          {title && <span className="text-sm font-medium text-slate-200">{title}</span>}
          <span className="text-xs px-2 py-0.5 rounded bg-slate-700 text-emerald-400 font-mono">
            {LANGUAGE_LABELS[language]}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto bg-slate-900 text-sm">
        <code className="text-slate-200 font-mono leading-relaxed">{code}</code>
      </pre>
      {explanation && (
        <div className="px-4 py-3 bg-slate-800/50 border-t border-slate-700">
          <p className="text-sm text-slate-400">{explanation}</p>
        </div>
      )}
    </div>
  );
}
