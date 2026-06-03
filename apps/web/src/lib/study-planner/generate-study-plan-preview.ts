import type { StudyPlanFormData } from '@/types/study-plan';

// ─── Output types ─────────────────────────────────────────────────────────────

export type IntensityLevel = 'leve' | 'moderada' | 'forte' | 'intensiva';

export interface WeekPreview {
  weekNumber: number;
  theme: string;
}

export interface StudyPlanPreviewResult {
  weeklyStructure: WeekPreview[];
  estimatedTotalHours: number;
  intensityLevel: IntensityLevel;
  intensityLabel: string;
  recommendedPace: string;
  suggestedArtifacts: string[];
  suggestedFinalOutcome: string;
  warnings: string[];
}

// ─── Data tables ──────────────────────────────────────────────────────────────

const AREA_PHASES: Record<string, [string, string, string, string]> = {
  programacao:   ['Fundamentos e sintaxe', 'Prática com código', 'Mini projeto', 'Revisão e entrevista técnica'],
  carreira:      ['Posicionamento pessoal', 'Currículo e LinkedIn', 'Portfólio e projetos', 'Simulações de entrevista'],
  financeiro:    ['Conceitos fundamentais', 'Leitura de indicadores', 'Estudo de ativos', 'Análise e carteira final'],
  seguranca:     ['Fundamentos técnicos', 'Riscos e controles', 'Frameworks (ISO/NIST/GRC)', 'Relatório e comunicação'],
  personalizado: ['Fundamentos', 'Prática guiada', 'Projeto pessoal', 'Revisão e consolidação'],
};

const AREA_ARTIFACTS: Record<string, string[]> = {
  programacao:   ['Repositório GitHub', 'API REST funcional', 'README técnico', 'Diagrama de arquitetura'],
  carreira:      ['Currículo atualizado', 'LinkedIn otimizado', 'Portfólio online', 'Script para entrevistas'],
  financeiro:    ['Planilha de análise', 'Relatório de ativos', 'Simulação de carteira'],
  seguranca:     ['Relatório de risco', 'Matriz de controles', 'Política de segurança', 'Apresentação executiva'],
  personalizado: ['Documento de resultado', 'Portfólio pessoal'],
};

const AREA_OUTCOMES: Record<string, string> = {
  programacao:   'Desenvolvedor capaz de criar e publicar APIs REST com Java/Spring Boot',
  carreira:      'Candidato posicionado para vagas junior com portfólio e currículo atualizados',
  financeiro:    'Investidor capaz de analisar ativos e construir uma carteira diversificada',
  seguranca:     'Profissional com base sólida em GRC e capacidade de comunicar riscos',
  personalizado: 'Objetivo pessoal alcançado com estrutura e artefatos documentados',
};

const INTENSITY_LABELS: Record<IntensityLevel, string> = {
  leve:      'Leve',
  moderada:  'Moderada',
  forte:     'Forte',
  intensiva: 'Intensiva',
};

const INTENSITY_PACE: Record<IntensityLevel, string> = {
  leve:      '1–2 tópicos por dia, ritmo tranquilo',
  moderada:  '2–3 tópicos por dia com exercícios práticos',
  forte:     '3–4 tópicos com projeto paralelo',
  intensiva: 'Imersão total — blocos de tempo contínuos',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeIntensity(minutesPerDay: number): IntensityLevel {
  if (minutesPerDay < 30) return 'leve';
  if (minutesPerDay < 60) return 'moderada';
  if (minutesPerDay <= 120) return 'forte';
  return 'intensiva';
}

function distributePhases(phases: [string, string, string, string], weeks: number): string[] {
  if (weeks <= 1) return [`${phases[0]} · ${phases[3]}`];
  if (weeks === 2) return [phases[0], phases[3]];
  if (weeks === 3) return [phases[0], phases[1], phases[3]];
  if (weeks === 4) return [...phases];

  // > 4 weeks: anchor first/last, expand middle two phases
  const result: string[] = [phases[0]];
  const middleWeeks = weeks - 2;
  for (let i = 0; i < middleWeeks; i++) {
    const ratio = i / middleWeeks;
    result.push(ratio < 0.5 ? phases[1] : phases[2]);
  }
  result.push(phases[3]);
  return result;
}

function applyStyleOverlay(themes: string[], style: string): string[] {
  const out = [...themes];
  if (style === 'entrevista' && out.length > 0) {
    out[out.length - 1] = 'Simulações e revisão técnica';
  }
  if (style === 'projeto') {
    for (let i = Math.floor(out.length / 2); i < out.length - 1; i++) {
      out[i] = out[i] + ' · entregável';
    }
  }
  return out;
}

function computeWarnings(data: StudyPlanFormData): string[] {
  const warns: string[] = [];
  const { availableMinutesPerDay, durationDays, preferredStyle, objective } = data;

  if (availableMinutesPerDay <= 15) {
    warns.push('Com apenas 15 min/dia, reduza o escopo ou aumente a duração.');
  } else if (availableMinutesPerDay < 30) {
    warns.push('Menos de 30 min/dia — o aprendizado será mais lento.');
  }
  if (preferredStyle === 'intensivo') {
    warns.push('Plano intensivo: reserve tempo obrigatório para revisão.');
    if (availableMinutesPerDay < 60) {
      warns.push('Modo intensivo com pouco tempo disponível — pode ser difícil manter o ritmo.');
    }
  }
  if (durationDays < 14) {
    warns.push('Duração muito curta para cobrir muitos tópicos.');
  }
  if (objective.trim().split(/\s+/).length > 12 && durationDays <= 21) {
    warns.push('Objetivo amplo para poucos dias — considere focar em um aspecto específico.');
  }
  return warns;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function generateStudyPlanPreview(data: StudyPlanFormData): StudyPlanPreviewResult {
  const area = data.area || 'personalizado';
  const style = data.preferredStyle || '';
  const weeks = Math.ceil(data.durationDays / 7);
  const totalHours = Math.round((data.availableMinutesPerDay * data.durationDays) / 60);
  const intensity = computeIntensity(data.availableMinutesPerDay);

  const phases = AREA_PHASES[area] ?? AREA_PHASES.personalizado;
  const distributed = distributePhases(phases, weeks);
  const themed = applyStyleOverlay(distributed, style);

  const weeklyStructure: WeekPreview[] = themed.map((theme, i) => ({
    weekNumber: i + 1,
    theme,
  }));

  return {
    weeklyStructure,
    estimatedTotalHours: totalHours,
    intensityLevel: intensity,
    intensityLabel: INTENSITY_LABELS[intensity],
    recommendedPace: INTENSITY_PACE[intensity],
    suggestedArtifacts: (AREA_ARTIFACTS[area] ?? []).slice(0, 4),
    suggestedFinalOutcome: AREA_OUTCOMES[area] ?? '',
    warnings: computeWarnings(data),
  };
}
