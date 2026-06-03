import type { StudyTask, StudyMaterial, StudyTaskType, StudyMaterialType } from '@/types/study-plan';

const TASK_META: Record<StudyTaskType, { icon: string; label: string }> = {
  leitura:  { icon: '📖', label: 'Leitura' },
  video:    { icon: '🎥', label: 'Vídeo' },
  pratica:  { icon: '💻', label: 'Prática' },
  quiz:     { icon: '✅', label: 'Quiz' },
  pesquisa: { icon: '🔍', label: 'Pesquisa' },
  projeto:  { icon: '🏗️', label: 'Projeto' },
  revisao:  { icon: '🔄', label: 'Revisão' },
};

const MATERIAL_META: Record<StudyMaterialType, { icon: string }> = {
  artigo:       { icon: '📄' },
  documentacao: { icon: '📋' },
  video:        { icon: '🎥' },
  livro:        { icon: '📚' },
  curso:        { icon: '🎓' },
  podcast:      { icon: '🎙️' },
  ferramenta:   { icon: '🔧' },
};

interface StudyTaskListProps {
  tasks: StudyTask[];
  materials: StudyMaterial[];
  completedTaskIds: Set<string>;
  onToggleTask: (taskId: string) => void;
}

export function StudyTaskList({
  tasks,
  materials,
  completedTaskIds,
  onToggleTask,
}: StudyTaskListProps) {
  const totalMinutes = tasks.reduce((sum, t) => sum + t.durationMinutes, 0);

  return (
    <div className="space-y-4">
      {/* Tasks */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Tarefas · {totalMinutes} min
        </p>
        <ul className="space-y-1.5">
          {tasks.map((task) => {
            const meta = TASK_META[task.type];
            const done = completedTaskIds.has(task.id);
            return (
              <li key={task.id}>
                <button
                  onClick={() => onToggleTask(task.id)}
                  className={`w-full flex items-start gap-3 py-2 px-3 rounded-md border text-left transition-colors ${
                    done
                      ? 'border-emerald-800/40 bg-emerald-950/10'
                      : 'border-slate-800 bg-slate-800/40 hover:border-slate-700'
                  }`}
                >
                  {/* Checkbox */}
                  <span
                    className={`mt-0.5 shrink-0 w-4 h-4 rounded border flex items-center justify-center text-xs ${
                      done
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'border-slate-600 bg-transparent'
                    }`}
                  >
                    {done && '✓'}
                  </span>

                  {/* Icon + title */}
                  <span className="text-sm shrink-0 mt-0.5">{meta.icon}</span>
                  <span
                    className={`text-sm flex-1 ${
                      done ? 'line-through text-slate-500' : 'text-slate-300'
                    }`}
                  >
                    {task.title}
                  </span>

                  {/* Duration */}
                  <span className="text-xs text-slate-500 shrink-0 whitespace-nowrap">
                    {task.durationMinutes}m
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Materials */}
      {materials.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Materiais</p>
          <ul className="space-y-1.5">
            {materials.map((mat, i) => {
              const meta = MATERIAL_META[mat.type];
              return (
                <li
                  key={i}
                  className="flex items-start gap-3 py-1.5 px-3 rounded-md border border-slate-800/60"
                >
                  <span className="text-sm mt-0.5 shrink-0">{meta.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-300">{mat.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{mat.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
