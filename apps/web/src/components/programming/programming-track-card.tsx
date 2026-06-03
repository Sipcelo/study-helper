import Link from 'next/link';
import type { StudyTrack } from '@/types/programming';
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

interface ProgrammingTrackCardProps {
  track: StudyTrack;
}

export function ProgrammingTrackCard({ track }: ProgrammingTrackCardProps) {
  return (
    <Link
      href={`/programacao/${track.slug}`}
      className={cn(
        'group block rounded-xl border bg-slate-900/60 p-5 transition-all duration-200',
        'border-slate-800 hover:border-emerald-800/60 hover:bg-slate-900',
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-2xl">{track.icon}</span>
        <span
          className={cn(
            'text-xs font-medium border rounded-full px-2.5 py-0.5',
            LEVEL_COLOR[track.level],
          )}
        >
          {LEVEL_LABEL[track.level]}
        </span>
      </div>

      <h3 className="text-white font-semibold text-base group-hover:text-emerald-300 transition-colors mb-1">
        {track.title}
      </h3>
      <p className="text-slate-500 text-xs mb-3">{track.subtitle}</p>
      <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">{track.summary}</p>

      <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-800">
        <span>{track.topics.length} tópicos</span>
        <span>~{track.estimatedHours}h</span>
      </div>
    </Link>
  );
}
