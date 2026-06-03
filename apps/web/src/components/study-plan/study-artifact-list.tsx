import type { StudyArtifact, StudyQuestion, StudyArtifactType, StudyQuestionDifficulty } from '@/types/study-plan';

const ARTIFACT_META: Record<StudyArtifactType, { icon: string; label: string }> = {
  documento:    { icon: '📝', label: 'Documento' },
  diagrama:     { icon: '🗂️', label: 'Diagrama' },
  codigo:       { icon: '💻', label: 'Código' },
  planilha:     { icon: '📊', label: 'Planilha' },
  apresentacao: { icon: '🖥️', label: 'Apresentação' },
  portfolio:    { icon: '🗂️', label: 'Portfólio' },
};

const QUESTION_DIFFICULTY_STYLES: Record<StudyQuestionDifficulty, string> = {
  facil:   'text-emerald-400 bg-emerald-950/40 border-emerald-800',
  medio:   'text-amber-400 bg-amber-950/40 border-amber-800',
  dificil: 'text-red-400 bg-red-950/40 border-red-800',
};

const QUESTION_DIFFICULTY_LABELS: Record<StudyQuestionDifficulty, string> = {
  facil:   'Fácil',
  medio:   'Médio',
  dificil: 'Difícil',
};

interface StudyArtifactListProps {
  artifact?: StudyArtifact;
  reviewQuestions: StudyQuestion[];
  artifactId: string;
  isArtifactCompleted: boolean;
  onToggleArtifact: (artifactId: string) => void;
}

export function StudyArtifactList({
  artifact,
  reviewQuestions,
  artifactId,
  isArtifactCompleted,
  onToggleArtifact,
}: StudyArtifactListProps) {
  return (
    <div className="space-y-4">
      {/* Artifact */}
      {artifact && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Artefato</p>
          <div
            className={`rounded-lg border p-4 space-y-3 ${
              isArtifactCompleted
                ? 'border-amber-700/50 bg-amber-950/15'
                : 'border-amber-800/40 bg-amber-950/10'
            }`}
          >
            {/* Artifact header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span>{ARTIFACT_META[artifact.type].icon}</span>
                <span className="text-xs px-2 py-0.5 rounded border border-amber-800/50 bg-amber-950/30 text-amber-400">
                  {ARTIFACT_META[artifact.type].label}
                </span>
                <span className="font-semibold text-white text-sm">{artifact.title}</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{artifact.description}</p>

            {artifact.template && (
              <div className="p-3 rounded bg-slate-900/60 border border-slate-700">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Template
                </p>
                <p className="text-xs text-slate-400 font-mono leading-relaxed whitespace-pre-wrap">
                  {artifact.template}
                </p>
              </div>
            )}

            {/* Toggle completion */}
            <button
              onClick={() => onToggleArtifact(artifactId)}
              className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded border transition-colors ${
                isArtifactCompleted
                  ? 'border-emerald-700 bg-emerald-950/40 text-emerald-400 hover:bg-emerald-950/60'
                  : 'border-slate-700 text-slate-400 hover:border-amber-600 hover:text-amber-400'
              }`}
            >
              <span className="text-xs">{isArtifactCompleted ? '✓' : '○'}</span>
              {isArtifactCompleted ? 'Artefato entregue' : 'Marcar como entregue'}
            </button>
          </div>
        </div>
      )}

      {/* Review questions */}
      {reviewQuestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Perguntas de Revisão
          </p>
          <ul className="space-y-2">
            {reviewQuestions.map((q, i) => (
              <li
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg border border-slate-800 bg-slate-900/30"
              >
                <span
                  className={`text-xs px-1.5 py-0.5 rounded border shrink-0 mt-0.5 ${
                    QUESTION_DIFFICULTY_STYLES[q.difficulty]
                  }`}
                >
                  {QUESTION_DIFFICULTY_LABELS[q.difficulty]}
                </span>
                <p className="text-sm text-slate-300">{q.question}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
