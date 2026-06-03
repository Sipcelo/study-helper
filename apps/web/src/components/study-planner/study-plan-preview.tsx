import type { StudyPlanFormData } from '@/types/study-plan';
import type { IntensityLevel } from '@/lib/study-planner/generate-study-plan-preview';
import { generateStudyPlanPreview } from '@/lib/study-planner/generate-study-plan-preview';
import { StudyPlanInputSummary } from './study-plan-input-summary';

const INTENSITY_COLORS: Record<IntensityLevel, string> = {
  leve:      'text-emerald-400 border-emerald-800/50 bg-emerald-950/20',
  moderada:  'text-blue-400 border-blue-800/50 bg-blue-950/20',
  forte:     'text-amber-400 border-amber-800/50 bg-amber-950/20',
  intensiva: 'text-red-400 border-red-800/50 bg-red-950/20',
};

interface StudyPlanPreviewProps {
  data: StudyPlanFormData;
  onGeneratePlan: () => void;
  canGenerate: boolean;
}

export function StudyPlanPreview({ data, onGeneratePlan, canGenerate }: StudyPlanPreviewProps) {
  const result = generateStudyPlanPreview(data);
  const { weeklyStructure, estimatedTotalHours, intensityLevel, intensityLabel, recommendedPace,
    suggestedArtifacts, suggestedFinalOutcome, warnings } = result;

  return (
    <div className="space-y-5">
      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="space-y-1.5">
          {warnings.map((w, i) => (
            <div
              key={i}
              className="flex items-start gap-2 rounded-lg border border-amber-800/40 bg-amber-950/15 px-3 py-2"
            >
              <span className="text-amber-500 shrink-0 text-xs mt-0.5">⚠</span>
              <p className="text-xs text-amber-300">{w}</p>
            </div>
          ))}
        </div>
      )}

      {/* Objective recap */}
      <div className="rounded-lg border border-slate-700/50 bg-slate-800/20 p-4 space-y-1">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Objetivo</p>
        <p className="text-sm text-slate-200 leading-relaxed">
          {data.objective || <span className="text-slate-500 italic">Aguardando objetivo…</span>}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Semanas', value: String(weeklyStructure.length) },
          { label: 'Total', value: `~${estimatedTotalHours}h` },
          { label: 'Min/dia', value: `${data.availableMinutesPerDay}` },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="col-span-1 rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-center"
          >
            <p className="text-lg font-bold text-amber-400">{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        ))}
        {/* Intensity badge */}
        <div
          className={`col-span-1 rounded-lg border p-3 text-center ${INTENSITY_COLORS[intensityLevel]}`}
        >
          <p className="text-sm font-bold">{intensityLabel}</p>
          <p className="text-xs opacity-70">intensidade</p>
        </div>
      </div>

      {/* Pace */}
      <p className="text-xs text-slate-500 italic">{recommendedPace}</p>

      {/* Weekly structure */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Estrutura sugerida
        </p>
        <ul className="space-y-1.5">
          {weeklyStructure.map(({ weekNumber, theme }) => (
            <li key={weekNumber} className="flex items-start gap-2">
              <span className="text-xs text-amber-600 font-mono shrink-0 mt-0.5">
                {String(weekNumber).padStart(2, '0')}
              </span>
              <span className="text-sm text-slate-300">{theme}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested artifacts */}
      {suggestedArtifacts.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Artefatos sugeridos
          </p>
          <div className="flex flex-wrap gap-1.5">
            {suggestedArtifacts.map((a) => (
              <span
                key={a}
                className="text-xs px-2 py-0.5 rounded border border-slate-700 bg-slate-800/40 text-slate-400"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Final outcome */}
      {suggestedFinalOutcome && (
        <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-3 space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Resultado esperado
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">{suggestedFinalOutcome}</p>
        </div>
      )}

      {/* Params summary */}
      <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-4 space-y-3">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Parâmetros informados
        </p>
        <StudyPlanInputSummary data={data} />
      </div>

      {/* API notice */}
      <div className="rounded-lg border border-slate-700/40 bg-slate-800/15 p-3">
        <p className="text-xs text-slate-600 leading-relaxed">
          ⚙️ Geração real será conectada à{' '}
          <span className="text-slate-500">API Interact (Java Spring Boot)</span> futuramente.
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={onGeneratePlan}
        disabled={!canGenerate}
        className="w-full py-3 rounded-lg border border-amber-700 bg-amber-950/30 text-amber-400 text-sm font-semibold hover:bg-amber-950/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Gerar meu plano →
      </button>
    </div>
  );
}
