'use client';

import { useState, useMemo } from 'react';
import type { StudyPlan } from '@/types/study-plan';
import {
  generateStudyPlanWorkspace,
  type WorkspaceFile,
  type ExportProgress,
} from '@/lib/study-planner/export-study-plan-markdown';

// ─── localStorage reader ──────────────────────────────────────────────────────

function readProgress(progressKey: string | undefined): ExportProgress | undefined {
  if (!progressKey) return undefined;
  try {
    const raw = localStorage.getItem(progressKey);
    if (!raw) return undefined;
    const stored = JSON.parse(raw) as {
      completedTaskIds?: string[];
      completedArtifactIds?: string[];
    };
    return {
      completedTaskIds:    new Set(stored.completedTaskIds ?? []),
      completedArtifactIds: new Set(stored.completedArtifactIds ?? []),
    };
  } catch {
    return undefined;
  }
}

// ─── Browser download helpers ─────────────────────────────────────────────────

function downloadFile(file: WorkspaceFile) {
  const blob = new Blob([file.content], { type: 'text/markdown;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = file.filename;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadAll(files: WorkspaceFile[], planTitle: string) {
  const sep      = '─'.repeat(60);
  const combined = files
    .map((f) => `${sep}\n# ${f.filename}\n${sep}\n\n${f.content}`)
    .join('\n\n');
  const slug = planTitle.slice(0, 40).replace(/\s+/g, '-').toLowerCase();
  const blob = new Blob([combined], { type: 'text/markdown;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `workspace-${slug}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FILE_ICONS: Record<string, string> = {
  'README.md':        '📋',
  'cronograma.md':    '📅',
  'tarefas.md':       '✅',
  'artefatos.md':     '📄',
  'perguntas.md':     '❓',
  'projeto-final.md': '🏆',
};

// ─── Component ────────────────────────────────────────────────────────────────

interface StudyPlanExportProps {
  plan: StudyPlan;
  progressKey?: string;
}

export function StudyPlanExport({ plan, progressKey }: StudyPlanExportProps) {
  const [open, setOpen]               = useState(false);
  const [activeFile, setActiveFile]   = useState<string | null>(null);
  const [copied, setCopied]           = useState<string | null>(null);
  const [exportProgress, setExportProgress] = useState<ExportProgress | undefined>(undefined);
  const [snapshotTime, setSnapshotTime]     = useState<string | null>(null);

  function captureProgress() {
    setExportProgress(readProgress(progressKey));
    setSnapshotTime(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
  }

  // Read progress fresh from localStorage when the panel opens so it captures
  // any tasks the user checked after the component first mounted.
  function handleOpen() {
    captureProgress();
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setActiveFile(null);
  }

  const files       = useMemo(() => generateStudyPlanWorkspace(plan, exportProgress), [plan, exportProgress]);
  const selectedFile = files.find((f) => f.filename === activeFile) ?? null;

  // Progress stats for the UI badge
  const progressStats = useMemo(() => {
    if (!exportProgress) return null;
    const allDays           = plan.weeks.flatMap((w) => w.days);
    const allTasks          = allDays.flatMap((d) => d.tasks);
    const daysWithArtifacts = allDays.filter((d) => d.artifact);
    return {
      completedTasks:     allTasks.filter((t) => exportProgress.completedTaskIds.has(t.id)).length,
      totalTasks:         allTasks.length,
      completedArtifacts: daysWithArtifacts.filter((d) =>
        exportProgress.completedArtifactIds.has(`artifact-day-${d.dayNumber}`),
      ).length,
      totalArtifacts: daysWithArtifacts.length,
    };
  }, [plan, exportProgress]);

  const hasProgress = progressStats !== null &&
    (progressStats.completedTasks > 0 || progressStats.completedArtifacts > 0);

  function handleCopy(file: WorkspaceFile) {
    navigator.clipboard.writeText(file.content).then(() => {
      setCopied(file.filename);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/30">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-slate-400">Exportar workspace</span>
          <span className="text-xs border border-slate-800 rounded px-2 py-0.5 text-slate-600">
            {files.length} arquivos .md
          </span>
          {open && hasProgress && progressStats && (
            <span className="text-xs border border-emerald-800/50 bg-emerald-950/20 rounded px-2 py-0.5 text-emerald-400">
              {progressStats.completedTasks}/{progressStats.totalTasks} tarefas ·{' '}
              {progressStats.completedArtifacts}/{progressStats.totalArtifacts} artefatos
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {open && (
            <button
              onClick={() => downloadAll(files, plan.title)}
              className="text-xs px-3 py-1.5 rounded border border-slate-700 text-slate-400 hover:text-amber-400 hover:border-amber-700 transition-colors"
            >
              ↓ Baixar tudo
            </button>
          )}
          <button
            onClick={open ? handleClose : handleOpen}
            className="text-xs px-3 py-1.5 rounded border border-amber-700/70 bg-amber-950/20 text-amber-400 hover:bg-amber-950/40 transition-colors"
          >
            {open ? 'Fechar' : 'Abrir workspace'}
          </button>
        </div>
      </div>

      {/* Expandable panel */}
      {open && (
        <div className="border-t border-slate-800">
          {/* Progress notice */}
          <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-slate-800 bg-slate-900/60 flex-wrap">
            <div className="flex items-center gap-2">
              {hasProgress && progressStats ? (
                <>
                  <span className="text-emerald-400 text-xs">✓</span>
                  <p className="text-xs text-emerald-400">
                    <span className="text-emerald-300 font-medium">
                      {progressStats.completedTasks}/{progressStats.totalTasks} tarefas
                    </span>{' '}
                    ·{' '}
                    <span className="text-emerald-300 font-medium">
                      {progressStats.completedArtifacts}/{progressStats.totalArtifacts} artefatos
                    </span>{' '}
                    concluídos
                  </p>
                </>
              ) : (
                <p className="text-xs text-slate-600">Nenhum progresso registrado ainda.</p>
              )}
              {snapshotTime && (
                <span className="text-[10px] text-slate-600 italic">
                  capturado às {snapshotTime}
                </span>
              )}
            </div>
            {progressKey && (
              <button
                onClick={captureProgress}
                className="text-xs px-2.5 py-1 rounded border border-slate-700 text-slate-500 hover:text-slate-200 hover:border-slate-600 transition-colors shrink-0"
              >
                ↺ Atualizar progresso
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] min-h-[260px]">
            {/* File list sidebar */}
            <div className="border-b sm:border-b-0 sm:border-r border-slate-800 py-1">
              <p className="text-[10px] text-slate-600 uppercase tracking-widest px-3 py-2">
                Arquivos
              </p>
              {files.map((file) => (
                <button
                  key={file.filename}
                  onClick={() => setActiveFile((p) => (p === file.filename ? null : file.filename))}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors ${
                    activeFile === file.filename
                      ? 'bg-slate-800/70 text-amber-400'
                      : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/30'
                  }`}
                >
                  <span className="text-sm">{FILE_ICONS[file.filename] ?? '📝'}</span>
                  <span className="font-mono text-xs">{file.filename}</span>
                </button>
              ))}
            </div>

            {/* Preview pane */}
            <div className="p-4">
              {selectedFile ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="font-mono text-xs text-amber-400">
                      {FILE_ICONS[selectedFile.filename]} {selectedFile.filename}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(selectedFile)}
                        className="text-xs px-2.5 py-1 rounded border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        {copied === selectedFile.filename ? '✓ Copiado' : 'Copiar'}
                      </button>
                      <button
                        onClick={() => downloadFile(selectedFile)}
                        className="text-xs px-2.5 py-1 rounded border border-slate-700 text-slate-400 hover:text-amber-400 hover:border-amber-700 transition-colors"
                      >
                        ↓ Baixar
                      </button>
                    </div>
                  </div>
                  <pre className="text-xs text-slate-400 leading-relaxed whitespace-pre-wrap font-mono bg-slate-950/60 border border-slate-800/80 rounded-lg p-4 max-h-72 overflow-y-auto">
                    {selectedFile.content}
                  </pre>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-10 space-y-2 text-center">
                  <p className="text-2xl">📂</p>
                  <p className="text-sm text-slate-500">Selecione um arquivo para visualizar</p>
                  <p className="text-xs text-slate-600">
                    {files.length} arquivos prontos para download
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
