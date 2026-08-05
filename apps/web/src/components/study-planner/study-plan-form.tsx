'use client';

import { useRouter } from 'next/navigation';
import type { StudyPlanFormData } from '@/types/study-plan';
import { useStudyPlanDraft } from '@/hooks/use-study-plan-draft';
import { generateMockStudyPlan } from '@/lib/study-planner/generate-mock-study-plan';
import { hasGeneratedPlan, saveGeneratedPlan } from '@/hooks/use-generated-study-plan';
import { StudyPlanPreview } from './study-plan-preview';

const AREAS = [
  { value: 'programacao',   label: 'Programação' },
  { value: 'carreira',      label: 'Carreira Junior' },
  { value: 'financeiro',    label: 'Finanças' },
  { value: 'seguranca',     label: 'Segurança da Informação / GRC' },
  { value: 'personalizado', label: 'Personalizado' },
];

const LEVELS = [
  { value: 'iniciante',     label: 'Iniciante' },
  { value: 'basico',        label: 'Básico' },
  { value: 'intermediario', label: 'Intermediário' },
];

const STYLES = [
  { value: 'teoria-pratica', label: 'Teoria + Prática' },
  { value: 'projeto',        label: 'Por Projeto' },
  { value: 'entrevista',     label: 'Foco em Entrevistas' },
  { value: 'revisao',        label: 'Revisão Intensiva' },
  { value: 'intensivo',      label: 'Modo Intensivo' },
];

const DURATIONS = [
  { value: 14, label: '14 dias (2 semanas)' },
  { value: 21, label: '21 dias (3 semanas)' },
  { value: 30, label: '30 dias (1 mês)' },
  { value: 45, label: '45 dias (~6 semanas)' },
  { value: 60, label: '60 dias (2 meses)' },
  { value: 90, label: '90 dias (3 meses)' },
];

const fieldClass =
  'w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/40 transition-colors placeholder:text-slate-600';
const labelClass = 'block text-xs font-medium text-slate-400 mb-1.5';

function isFormValid(data: StudyPlanFormData): boolean {
  return data.area !== '' && data.objective.trim().length >= 5;
}

export function StudyPlanForm() {
  const router = useRouter();
  const {
    draft,
    updateDraft,
    resetDraft,
    hasDraft,
    isLoaded,
    loadedFromStorage,
    loadedFromPlannerContext,
  } = useStudyPlanDraft();

  function update<K extends keyof StudyPlanFormData>(key: K, value: StudyPlanFormData[K]) {
    updateDraft(key, value);
  }

  function handleReset() {
    if (window.confirm('Limpar rascunho? O formulário voltará ao estado inicial.')) {
      resetDraft();
    }
  }

  function handleGeneratePlan() {
    if (!isFormValid(draft)) return;
    if (
      hasGeneratedPlan() &&
      !window.confirm(
        'Ja existe um plano salvo neste navegador. Substituir pelo novo plano? Se voce cancelar, o plano atual sera mantido.',
      )
    ) {
      return;
    }
    const plan = generateMockStudyPlan(draft);
    saveGeneratedPlan(plan);
    router.push('/meu-plano/gerado');
  }

  const previewReady = isFormValid(draft);

  // While localStorage hasn't loaded, render form with defaults to avoid layout shift
  // (isLoaded prevents hydration mismatch — draft values only apply after mount)

  return (
    <div className="space-y-6">
      {/* Draft status bar */}
      {isLoaded && (
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            {hasDraft && (
              <span className="text-xs px-2 py-1 rounded-full border border-slate-700 bg-slate-800/40 text-slate-400">
                💾 Rascunho salvo localmente
              </span>
            )}
            {loadedFromStorage && (
              <span className="text-xs text-slate-500 italic">
                Continuamos de onde você parou.
              </span>
            )}
            {loadedFromPlannerContext && (
              <span className="text-xs px-2 py-1 rounded-full border border-emerald-800/50 bg-emerald-950/20 text-emerald-400">
                Origem Interact
              </span>
            )}
          </div>
          {hasDraft && (
            <button
              onClick={handleReset}
              className="text-xs text-slate-600 hover:text-red-400 transition-colors"
            >
              Limpar rascunho
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form column */}
        <div className="space-y-5">
          {/* Area */}
          <div>
            <label className={labelClass}>
              Área de estudo <span className="text-amber-500">*</span>
            </label>
            <select
              value={draft.area}
              onChange={(e) => update('area', e.target.value as StudyPlanFormData['area'])}
              className={fieldClass}
            >
              <option value="">Selecione uma área…</option>
              {AREAS.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>

          {/* Objective */}
          <div>
            <label className={labelClass}>
              Objetivo principal <span className="text-amber-500">*</span>
            </label>
            <input
              type="text"
              value={draft.objective}
              onChange={(e) => update('objective', e.target.value)}
              placeholder="Ex: aprender Spring Boot para trabalhar como dev backend"
              className={fieldClass}
            />
          </div>

          {/* Level */}
          <div>
            <label className={labelClass}>Nível atual</label>
            <select
              value={draft.currentLevel}
              onChange={(e) =>
                update('currentLevel', e.target.value as StudyPlanFormData['currentLevel'])
              }
              className={fieldClass}
            >
              <option value="">Selecione seu nível…</option>
              {LEVELS.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* Minutes per day */}
          <div>
            <label className={labelClass}>
              Minutos disponíveis por dia:{' '}
              <span className="text-amber-400 font-semibold">
                {draft.availableMinutesPerDay} min
              </span>
            </label>
            <input
              type="range"
              min={15}
              max={240}
              step={15}
              value={draft.availableMinutesPerDay}
              onChange={(e) => update('availableMinutesPerDay', Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-xs text-slate-600 mt-1">
              <span>15 min</span>
              <span>4h</span>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className={labelClass}>Duração total</label>
            <select
              value={draft.durationDays}
              onChange={(e) => update('durationDays', Number(e.target.value))}
              className={fieldClass}
            >
              {DURATIONS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* Preferred style */}
          <div>
            <label className={labelClass}>Estilo de aprendizado</label>
            <select
              value={draft.preferredStyle}
              onChange={(e) =>
                update('preferredStyle', e.target.value as StudyPlanFormData['preferredStyle'])
              }
              className={fieldClass}
            >
              <option value="">Selecione um estilo…</option>
              {STYLES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Topics */}
          <div>
            <label className={labelClass}>Tópicos iniciais (separados por vírgula)</label>
            <textarea
              value={draft.topics}
              onChange={(e) => update('topics', e.target.value)}
              placeholder="Ex: Spring Boot, JPA, REST API, Docker"
              rows={2}
              className={`${fieldClass} resize-none`}
            />
          </div>

          {/* Final project goal */}
          <div>
            <label className={labelClass}>Projeto final desejado</label>
            <input
              type="text"
              value={draft.finalProjectGoal}
              onChange={(e) => update('finalProjectGoal', e.target.value)}
              placeholder="Ex: API REST com autenticação JWT e deploy no Railway"
              className={fieldClass}
            />
          </div>

          <p className="text-xs text-slate-600">
            <span className="text-amber-500">*</span> campos obrigatórios para o preview
          </p>
        </div>

        {/* Preview column */}
        <div>
          {previewReady ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
                Preview do plano
              </p>
              <StudyPlanPreview
                data={draft}
                onGeneratePlan={handleGeneratePlan}
                canGenerate={previewReady}
                source={loadedFromPlannerContext ? 'interact' : 'direct'}
              />
            </div>
          ) : (
            <div className="rounded-xl border border-slate-800/50 bg-slate-900/20 p-8 text-center space-y-2">
              <p className="text-2xl">📋</p>
              <p className="text-sm text-slate-500">
                Preencha a <span className="text-slate-400">área</span> e o{' '}
                <span className="text-slate-400">objetivo</span> para ver o preview do plano.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
