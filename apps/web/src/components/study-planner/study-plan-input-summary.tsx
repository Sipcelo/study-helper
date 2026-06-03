import type { StudyPlanFormData } from '@/types/study-plan';

const AREA_LABELS: Record<string, string> = {
  programacao: 'Programação',
  carreira:    'Carreira Junior',
  financeiro:  'Finanças',
  seguranca:   'Segurança / GRC',
  personalizado: 'Personalizado',
};

const LEVEL_LABELS: Record<string, string> = {
  iniciante:    'Iniciante',
  basico:       'Básico',
  intermediario: 'Intermediário',
};

const STYLE_LABELS: Record<string, string> = {
  'teoria-pratica': 'Teoria + Prática',
  projeto:   'Por Projeto',
  entrevista: 'Foco em Entrevistas',
  revisao:   'Revisão Intensiva',
  intensivo: 'Modo Intensivo',
};

interface StudyPlanInputSummaryProps {
  data: StudyPlanFormData;
}

export function StudyPlanInputSummary({ data }: StudyPlanInputSummaryProps) {
  const totalHours = Math.round((data.availableMinutesPerDay * data.durationDays) / 60);
  const weeks = Math.ceil(data.durationDays / 7);

  const items = [
    { label: 'Área', value: data.area ? AREA_LABELS[data.area] : '—' },
    { label: 'Nível', value: data.currentLevel ? LEVEL_LABELS[data.currentLevel] : '—' },
    { label: 'Estilo', value: data.preferredStyle ? STYLE_LABELS[data.preferredStyle] : '—' },
    { label: 'Disponibilidade', value: `${data.availableMinutesPerDay} min/dia` },
    { label: 'Duração', value: `${data.durationDays} dias (${weeks} sem.)` },
    { label: 'Carga total', value: `~${totalHours}h` },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
      {items.map(({ label, value }) => (
        <div key={label}>
          <p className="text-xs text-slate-500">{label}</p>
          <p className="text-xs font-medium text-slate-300">{value}</p>
        </div>
      ))}
    </div>
  );
}
