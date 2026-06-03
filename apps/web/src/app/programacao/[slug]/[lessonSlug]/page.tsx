import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProgrammingTrackBySlug } from '@/lib/programming/get-programming-tracks';
import { getProgrammingLesson, getNextLesson, getPreviousLesson, getProgrammingLessonsByTrack } from '@/lib/programming/get-programming-lessons';
import { ProgrammingLessonPage } from '@/components/programming/programming-lesson-page';

interface PageProps {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export async function generateStaticParams() {
  const { getProgrammingTracks } = await import('@/lib/programming/get-programming-tracks');
  const tracks = getProgrammingTracks();
  const params: { slug: string; lessonSlug: string }[] = [];

  for (const track of tracks) {
    const lessons = getProgrammingLessonsByTrack(track.slug);
    for (const lesson of lessons) {
      params.push({ slug: track.slug, lessonSlug: lesson.topicSlug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, lessonSlug } = await params;
  const lesson = getProgrammingLesson(slug, lessonSlug);
  if (!lesson) return { title: 'Aula não encontrada' };
  return {
    title: `${lesson.title} | Study Helper`,
    description: lesson.summary,
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { slug, lessonSlug } = await params;

  const track = getProgrammingTrackBySlug(slug);
  if (!track) notFound();

  const lesson = getProgrammingLesson(slug, lessonSlug);
  if (!lesson) notFound();

  const prevLesson = getPreviousLesson(slug, lessonSlug);
  const nextLesson = getNextLesson(slug, lessonSlug);

  return (
    <ProgrammingLessonPage
      lesson={lesson}
      track={track}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
    />
  );
}
