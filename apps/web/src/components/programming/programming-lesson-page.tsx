import Link from 'next/link';
import type { ProgrammingLessonContent } from '@/types/programming-content';
import type { StudyTrack } from '@/types/programming';
import { CodeBlock } from './code-block';
import { CommonMistakes } from './common-mistakes';
import { PracticeChallenge } from './practice-challenge';
import { InterviewQuestions } from './interview-questions';

interface ProgrammingLessonPageProps {
  lesson: ProgrammingLessonContent;
  track: StudyTrack;
  prevLesson?: ProgrammingLessonContent;
  nextLesson?: ProgrammingLessonContent;
}

export function ProgrammingLessonPage({
  lesson,
  track,
  prevLesson,
  nextLesson,
}: ProgrammingLessonPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/programacao" className="hover:text-emerald-400 transition-colors">
            Programação
          </Link>
          <span>/</span>
          <Link href={`/programacao/${track.slug}`} className="hover:text-emerald-400 transition-colors">
            {track.title}
          </Link>
          <span>/</span>
          <span className="text-slate-300">{lesson.title}</span>
        </nav>

        {/* Header */}
        <header className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{track.icon} {track.title}</span>
            <span>·</span>
            <span>Aula {lesson.order}</span>
            <span>·</span>
            <span>{lesson.estimatedMinutes} min</span>
          </div>
          <h1 className="text-3xl font-bold text-white">{lesson.title}</h1>
          <p className="text-slate-400 text-lg leading-relaxed">{lesson.summary}</p>
        </header>

        {/* Explanation */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Conceito</h2>
          <p className="text-slate-300 leading-relaxed">{lesson.explanation}</p>
        </section>

        {/* Sections */}
        {lesson.sections.map((section, i) => (
          <section key={i} className="space-y-3">
            <h2 className="text-xl font-bold text-white">{section.title}</h2>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">{section.content}</p>
          </section>
        ))}

        {/* Code Examples */}
        {lesson.codeExamples.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white">Exemplos de Código</h2>
            {lesson.codeExamples.map((example, i) => (
              <CodeBlock
                key={i}
                code={example.code}
                language={example.language}
                title={example.title}
                explanation={example.explanation}
              />
            ))}
          </section>
        )}

        {/* Common Mistakes */}
        <CommonMistakes mistakes={lesson.commonMistakes} />

        {/* Practice Challenge */}
        <PracticeChallenge challenge={lesson.practiceChallenge} />

        {/* Interview Questions */}
        <InterviewQuestions questions={lesson.interviewQuestions} />

        {/* Next Steps */}
        {lesson.nextSteps.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">Próximos Passos</h2>
            <div className="grid gap-3">
              {lesson.nextSteps.map((step, i) => (
                <Link
                  key={i}
                  href={`/programacao/${track.slug}/${step.slug}`}
                  className="flex items-start gap-3 p-4 rounded-lg border border-slate-700 hover:border-emerald-600 hover:bg-emerald-950/20 transition-colors group"
                >
                  <span className="text-emerald-500 text-lg mt-0.5">→</span>
                  <div>
                    <p className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {step.title}
                    </p>
                    <p className="text-sm text-slate-400">{step.reason}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Prev / Next navigation */}
        <nav className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
          {prevLesson ? (
            <Link
              href={`/programacao/${track.slug}/${prevLesson.topicSlug}`}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <span>←</span>
              <span>{prevLesson.title}</span>
            </Link>
          ) : (
            <Link
              href={`/programacao/${track.slug}`}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <span>←</span>
              <span>Voltar para a trilha</span>
            </Link>
          )}

          {nextLesson ? (
            <Link
              href={`/programacao/${track.slug}/${nextLesson.topicSlug}`}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <span>{nextLesson.title}</span>
              <span>→</span>
            </Link>
          ) : (
            <Link
              href={`/programacao/${track.slug}`}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <span>Trilha completa</span>
              <span>→</span>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
