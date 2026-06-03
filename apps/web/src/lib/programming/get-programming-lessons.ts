import { JAVA_ESSENTIAL_LESSONS, JAVA_ESSENTIAL_LESSON_MAP } from '@/data/programming-lessons/java-essential-lessons';
import type { ProgrammingLessonContent } from '@/types/programming-content';

const TRACK_LESSONS: Record<string, ProgrammingLessonContent[]> = {
  'java-essencial': JAVA_ESSENTIAL_LESSONS,
};

const TRACK_LESSON_MAPS: Record<string, Record<string, ProgrammingLessonContent>> = {
  'java-essencial': JAVA_ESSENTIAL_LESSON_MAP,
};

export function getProgrammingLessonsByTrack(trackSlug: string): ProgrammingLessonContent[] {
  return TRACK_LESSONS[trackSlug] ?? [];
}

export function getProgrammingLesson(
  trackSlug: string,
  lessonSlug: string
): ProgrammingLessonContent | undefined {
  return TRACK_LESSON_MAPS[trackSlug]?.[lessonSlug];
}

export function getNextLesson(
  trackSlug: string,
  lessonSlug: string
): ProgrammingLessonContent | undefined {
  const lessons = getProgrammingLessonsByTrack(trackSlug);
  const current = lessons.findIndex((l) => l.topicSlug === lessonSlug);
  if (current === -1 || current === lessons.length - 1) return undefined;
  return lessons[current + 1];
}

export function getPreviousLesson(
  trackSlug: string,
  lessonSlug: string
): ProgrammingLessonContent | undefined {
  const lessons = getProgrammingLessonsByTrack(trackSlug);
  const current = lessons.findIndex((l) => l.topicSlug === lessonSlug);
  if (current <= 0) return undefined;
  return lessons[current - 1];
}
