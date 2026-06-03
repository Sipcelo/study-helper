import Link from 'next/link';
import type { StudyTrack } from '@/types/programming';
import { getProgrammingLessonsByTrack } from '@/lib/programming/get-programming-lessons';
import { cn } from '@/lib/cn';

const LEVEL_LABEL: Record<StudyTrack['level'], string> = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
};

const LEVEL_COLOR: Record<StudyTrack['level'], string> = {
  beginner: 'text-emerald-400 bg-emerald-950/50 border-emerald-800/40',
  intermediate: 'text-amber-400 bg-amber-950/50 border-amber-800/40',
  advanced: 'text-red-400 bg-red-950/50 border-red-800/40',
};

interface ProgrammingTrackDetailProps {
  track: StudyTrack;
}

export function ProgrammingTrackDetail({ track }: ProgrammingTrackDetailProps) {
  const lessons = getProgrammingLessonsByTrack(track.slug);
  const lessonSlugs = new Set(lessons.map((l) => l.topicSlug));

  return (
    <div className="space-y-8">
      {/* Back */}
      <Link
        href="/programacao"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
      >
        ← Voltar para Programação
      </Link>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-3xl">{track.icon}</span>
          <span
            className={cn(
              'text-xs font-medium border rounded-full px-2.5 py-0.5',
              LEVEL_COLOR[track.level],
            )}
          >
            {LEVEL_LABEL[track.level]}
          </span>
          <span className="text-xs text-slate-500 bg-slate-800 border border-slate-700 rounded-full px-2.5 py-0.5">
            ~{track.estimatedHours}h
          </span>
          <span className="text-xs text-slate-500 bg-slate-800 border border-slate-700 rounded-full px-2.5 py-0.5">
            {track.topics.length} tópicos
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{track.title}</h1>
        <p className="text-slate-400 text-base">{track.subtitle}</p>
        <p className="text-slate-300 leading-relaxed">{track.summary}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {track.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-slate-400 bg-slate-800 border border-slate-700 rounded-md px-2.5 py-1"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Topics list */}
        <div className="md:col-span-2 space-y-2">
          <h2 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-4">
            Tópicos da trilha
          </h2>
          {track.topics.map((topic) => {
            const hasLesson = lessonSlugs.has(topic.slug);
            const inner = (
              <>
                <span className="text-slate-600 text-xs font-mono mt-0.5 min-w-[1.5rem]">
                  {String(topic.order).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm font-medium', hasLesson ? 'text-slate-200' : 'text-slate-500')}>
                    {topic.title}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">{topic.description}</p>
                </div>
                {hasLesson ? (
                  <span className="text-xs text-emerald-500 shrink-0">Estudar →</span>
                ) : (
                  <span className="text-xs text-slate-700 shrink-0">Em breve</span>
                )}
              </>
            );

            return hasLesson ? (
              <Link
                key={topic.id}
                href={`/programacao/${track.slug}/${topic.slug}`}
                className="flex items-start gap-3 p-4 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-emerald-700/60 hover:bg-emerald-950/20 transition-colors"
              >
                {inner}
              </Link>
            ) : (
              <div
                key={topic.id}
                className="flex items-start gap-3 p-4 rounded-lg border border-slate-800 bg-slate-900/30 opacity-60"
              >
                {inner}
              </div>
            );
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Career relevance */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 space-y-2">
            <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              🎯 Relevância para carreira
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">{track.careerRelevance}</p>
          </div>

          {/* Portfolio outcome */}
          <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-5 space-y-2">
            <h3 className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
              📁 O que você vai construir
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">{track.portfolioOutcome}</p>
          </div>

          {/* Prerequisites */}
          {track.prerequisites.length > 0 && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 space-y-2">
              <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Pré-requisitos
              </h3>
              <ul className="space-y-1">
                {track.prerequisites.map((prereq) => (
                  <li key={prereq}>
                    <Link
                      href={`/programacao/${prereq}`}
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      → {prereq.replace(/-/g, ' ')}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Lesson count notice */}
      {lessons.length > 0 && (
        <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/10 p-4 text-center text-emerald-500 text-sm">
          {lessons.length} aula{lessons.length > 1 ? 's' : ''} disponíve{lessons.length > 1 ? 'is' : 'l'} nessa trilha · Mais em breve
        </div>
      )}
      {lessons.length === 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4 text-center text-slate-500 text-sm">
          Conteúdo detalhado em breve
        </div>
      )}
    </div>
  );
}
