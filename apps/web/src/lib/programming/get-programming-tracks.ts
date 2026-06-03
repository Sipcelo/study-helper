import { MOCK_TRACKS } from '@/data/programming-tracks';
import type { StudyTrack, StudyTrackLevel } from '@/types/programming';

export function getProgrammingTracks(): StudyTrack[] {
  return MOCK_TRACKS.slice().sort((a, b) => a.order - b.order);
}

export function getProgrammingTrackBySlug(slug: string): StudyTrack | undefined {
  return MOCK_TRACKS.find((t) => t.slug === slug);
}

export function getProgrammingTracksByLevel(level: StudyTrackLevel): StudyTrack[] {
  return MOCK_TRACKS.filter((t) => t.level === level).sort((a, b) => a.order - b.order);
}

export function searchProgrammingTracks(query: string): StudyTrack[] {
  const q = query.trim().toLowerCase();
  if (!q) return getProgrammingTracks();
  return MOCK_TRACKS.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.summary.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      t.topics.some((topic) => topic.title.toLowerCase().includes(q)),
  ).sort((a, b) => a.order - b.order);
}
