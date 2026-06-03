import type { StudyPlan } from '@/types/study-plan';

export interface WorkspaceFile {
  filename: string;
  content: string;
}

export interface ExportProgress {
  completedTaskIds: Set<string>;
  completedArtifactIds: Set<string>;
}

// ─── Label maps ───────────────────────────────────────────────────────────────

const AREA_LABELS: Record<string, string> = {
  programacao:   'Programação',
  carreira:      'Carreira',
  financeiro:    'Financeiro',
  seguranca:     'Segurança da Informação',
  dados:         'Dados',
  devops:        'DevOps',
  gestao:        'Gestão',
  personalizado: 'Personalizado',
};

const DIFFICULTY_LABELS: Record<string, string> = {
  iniciante:     'Iniciante',
  intermediario: 'Intermediário',
  avancado:      'Avançado',
};

const TASK_TYPE_LABELS: Record<string, string> = {
  leitura:  'Leitura',
  video:    'Vídeo',
  pratica:  'Prática',
  revisao:  'Revisão',
  quiz:     'Quiz',
  projeto:  'Projeto',
  pesquisa: 'Pesquisa',
};

const DIFFICULTY_EMOJI: Record<string, string> = {
  facil:   '🟢',
  medio:   '🟡',
  dificil: '🔴',
};

// ─── Progress helpers ─────────────────────────────────────────────────────────

function pct(n: number, total: number): number {
  return total === 0 ? 0 : Math.round((n / total) * 100);
}

function buildProgressSummary(plan: StudyPlan, progress: ExportProgress): string {
  const allDays            = plan.weeks.flatMap((w) => w.days);
  const allTasks           = allDays.flatMap((d) => d.tasks);
  const daysWithArtifacts  = allDays.filter((d) => d.artifact);

  const completedTasks = allTasks.filter((t) =>
    progress.completedTaskIds.has(t.id),
  ).length;

  const completedArtifacts = daysWithArtifacts.filter((d) =>
    progress.completedArtifactIds.has(`artifact-day-${d.dayNumber}`),
  ).length;

  const ptasks     = pct(completedTasks, allTasks.length);
  const partifacts = pct(completedArtifacts, daysWithArtifacts.length);
  const overall    = Math.round((ptasks + partifacts) / 2);

  return [
    '## Progresso Atual',
    '',
    '| Métrica | Concluído | Total | % |',
    '|---------|-----------|-------|---|',
    `| Tarefas | ${completedTasks} | ${allTasks.length} | ${ptasks}% |`,
    `| Artefatos | ${completedArtifacts} | ${daysWithArtifacts.length} | ${partifacts}% |`,
    `| **Geral** | — | — | **${overall}%** |`,
    '',
    '_Snapshot do progresso no momento da exportação._',
    '',
  ].join('\n');
}

// ─── Individual generators ────────────────────────────────────────────────────

export function generateStudyPlanReadme(plan: StudyPlan, progress?: ExportProgress): string {
  const area       = AREA_LABELS[plan.area] ?? plan.area;
  const difficulty = DIFFICULTY_LABELS[plan.difficulty] ?? plan.difficulty;
  const createdAt  = new Date(plan.createdAt).toLocaleDateString('pt-BR');

  const deliverablesList = plan.finalProject.deliverables
    .map((d, i) => `${i + 1}. ${d}`)
    .join('\n');

  const tagsList = plan.tags.length > 0
    ? plan.tags.map((t) => `\`${t}\``).join(' ')
    : '';

  const progressSection = progress ? buildProgressSummary(plan, progress) : '';

  return [
    `# ${plan.title}`,
    '',
    '> Workspace gerado pelo Study Helper — use este conjunto de arquivos como guia de estudo.',
    '',
    '## Metadados',
    '',
    '| Campo | Valor |',
    '|-------|-------|',
    `| **Área** | ${area} |`,
    `| **Duração** | ${plan.durationDays} dias |`,
    `| **Carga total** | ~${plan.totalHours}h |`,
    `| **Dificuldade** | ${difficulty} |`,
    `| **Semanas** | ${plan.weeks.length} |`,
    `| **Criado em** | ${createdAt} |`,
    '',
    '## Objetivo',
    '',
    plan.description,
    '',
    ...(progressSection ? [progressSection] : []),
    ...(tagsList ? ['## Tags', '', tagsList, ''] : []),
    '## Como usar este workspace',
    '',
    '1. Consulte `cronograma.md` para a estrutura semanal completa',
    '2. Use `tarefas.md` como checklist diário de progresso',
    '3. Produza os entregáveis listados em `artefatos.md`',
    '4. Revise seu aprendizado com as perguntas em `perguntas.md`',
    '5. Finalize o ciclo com o `projeto-final.md`',
    '',
    '## Projeto Final',
    '',
    `### ${plan.finalProject.title}`,
    '',
    plan.finalProject.description,
    '',
    `**Tempo estimado:** ~${plan.finalProject.estimatedHours}h`,
    '',
    '### Entregáveis',
    '',
    deliverablesList,
    '',
    '---',
    '',
    `_Gerado pelo [Study Helper](https://study-helper.vercel.app) em ${createdAt}._`,
  ].join('\n');
}

export function generateStudyPlanSchedule(plan: StudyPlan): string {
  const lines: string[] = ['# Cronograma de Estudos', ''];

  for (const week of plan.weeks) {
    lines.push(`## Semana ${week.weekNumber} — ${week.theme}`, '');
    lines.push(`**Objetivo:** ${week.objective}`, '');

    for (const day of week.days) {
      lines.push(`### Dia ${day.dayNumber} — ${day.title}`);
      lines.push(`- ⏱ Estimativa: **${day.estimatedMinutes} min**`);
      lines.push(`- 🎯 ${day.objective}`);
      if (day.materials.length > 0) {
        lines.push(`- 📚 Material: ${day.materials.map((m) => m.title).join(', ')}`);
      }
      if (day.artifact) {
        lines.push(`- 📄 Artefato: **${day.artifact.title}**`);
      }
      lines.push('');
    }
  }

  return lines.join('\n');
}

export function generateStudyPlanTasks(plan: StudyPlan, progress?: ExportProgress): string {
  const lines: string[] = [
    '# Tarefas',
    '',
    '> Use este arquivo como checklist diário de progresso.',
    '',
  ];

  for (const week of plan.weeks) {
    lines.push(`## Semana ${week.weekNumber} — ${week.theme}`, '');

    for (const day of week.days) {
      lines.push(`### Dia ${day.dayNumber} — ${day.title}`);
      lines.push(`_Objetivo: ${day.objective}_`, '');
      for (const task of day.tasks) {
        const type  = TASK_TYPE_LABELS[task.type] ?? task.type;
        const check = progress?.completedTaskIds.has(task.id) ? 'x' : ' ';
        lines.push(`- [${check}] **${task.title}** (${type} · ${task.durationMinutes}min)`);
      }
      lines.push('');
    }
  }

  return lines.join('\n');
}

export function generateStudyPlanArtifacts(plan: StudyPlan, progress?: ExportProgress): string {
  const lines: string[] = [
    '# Artefatos e Entregáveis',
    '',
    '> Cada semana termina com um entregável. Produza e documente cada um.',
    '',
  ];

  for (const week of plan.weeks) {
    const daysWithArtifacts = week.days.filter((d) => d.artifact);
    if (daysWithArtifacts.length === 0) continue;

    lines.push(`## Semana ${week.weekNumber} — ${week.theme}`, '');

    for (const day of daysWithArtifacts) {
      const artifact   = day.artifact!;
      const artifactId = `artifact-day-${day.dayNumber}`;
      const isDone     = progress?.completedArtifactIds.has(artifactId) ?? false;
      const check      = isDone ? 'x' : ' ';

      lines.push(`### [${check}] Dia ${day.dayNumber} — ${artifact.title}`);
      lines.push(`**Tipo:** ${artifact.type}`, '');
      lines.push(artifact.description);
      if (artifact.template) {
        lines.push('', '**Template sugerido:**', '', artifact.template);
      }
      lines.push('', `**Status:** ${isDone ? '✅ Entregue' : '⬜ Pendente'}`, '');
    }
  }

  return lines.join('\n');
}

export function generateStudyPlanQuestions(plan: StudyPlan): string {
  const lines: string[] = [
    '# Perguntas de Revisão',
    '',
    '> Use estas perguntas para testar seu entendimento após cada bloco de estudo.',
    '',
  ];

  for (const week of plan.weeks) {
    const allQ   = week.days.flatMap((d) => d.reviewQuestions);
    const unique = allQ.filter(
      (q, idx, arr) => arr.findIndex((x) => x.question === q.question) === idx,
    );

    if (unique.length === 0) continue;

    lines.push(`## Semana ${week.weekNumber} — ${week.theme}`, '');
    for (const q of unique) {
      const emoji = DIFFICULTY_EMOJI[q.difficulty] ?? '⚪';
      lines.push(`- ${emoji} ${q.question}`);
      if (q.answer) lines.push(`  > _${q.answer}_`);
    }
    lines.push('');
  }

  lines.push('---', '', '**Legenda:** 🟢 Fácil · 🟡 Médio · 🔴 Difícil');

  return lines.join('\n');
}

export function generateStudyPlanFinalProject(plan: StudyPlan): string {
  const deliverablesList = plan.finalProject.deliverables
    .map((d, i) => `${i + 1}. [ ] ${d}`)
    .join('\n');

  return [
    `# Projeto Final — ${plan.finalProject.title}`,
    '',
    '## Descrição',
    '',
    plan.finalProject.description,
    '',
    `**Tempo estimado:** ~${plan.finalProject.estimatedHours}h`,
    '',
    '## Entregáveis',
    '',
    deliverablesList,
    '',
    '## Critérios de conclusão',
    '',
    '- [ ] Todos os entregáveis produzidos e documentados',
    '- [ ] Código/artefatos publicados (GitHub, Notion, Drive ou equivalente)',
    '- [ ] README do projeto completo com instruções de uso',
    '- [ ] Todas as perguntas de revisão respondidas (ver `perguntas.md`)',
    '- [ ] Revisão final do cronograma concluída',
    '',
    '## Notas e aprendizados',
    '',
    '> _Registre aqui os principais aprendizados ao concluir o projeto._',
    '',
    '---',
    '',
    `_Plano: **${plan.title}** · ${plan.durationDays} dias · ~${plan.totalHours}h_`,
  ].join('\n');
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function generateStudyPlanWorkspace(
  plan: StudyPlan,
  progress?: ExportProgress,
): WorkspaceFile[] {
  return [
    { filename: 'README.md',        content: generateStudyPlanReadme(plan, progress) },
    { filename: 'cronograma.md',    content: generateStudyPlanSchedule(plan) },
    { filename: 'tarefas.md',       content: generateStudyPlanTasks(plan, progress) },
    { filename: 'artefatos.md',     content: generateStudyPlanArtifacts(plan, progress) },
    { filename: 'perguntas.md',     content: generateStudyPlanQuestions(plan) },
    { filename: 'projeto-final.md', content: generateStudyPlanFinalProject(plan) },
  ];
}
