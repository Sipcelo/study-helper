interface ProgrammingHeroProps {
  trackCount: number;
}

export function ProgrammingHero({ trackCount }: ProgrammingHeroProps) {
  return (
    <section className="text-center space-y-4 pt-4">
      <div className="inline-flex items-center gap-2 bg-emerald-950/40 border border-emerald-800/40 rounded-full px-4 py-1.5 text-sm text-emerald-300">
        <span>☕</span>
        Módulo Programação · Java Backend
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-white">
        Aprenda Java e Spring Boot
        <br />
        <span className="text-emerald-400">do zero à primeira vaga</span>
      </h1>
      <p className="text-slate-400 max-w-xl mx-auto text-base">
        Trilhas ordenadas de backend. Cada tópico com contexto real, exemplos e perguntas de
        entrevista. Foco em Java, Spring Boot, REST e carreira junior.
      </p>
      <div className="flex items-center justify-center gap-6 text-sm text-slate-400 pt-1">
        <span>
          <span className="text-white font-semibold">{trackCount}</span> trilhas
        </span>
        <span className="text-slate-700">·</span>
        <span>
          <span className="text-white font-semibold">Java</span> + Spring Boot
        </span>
        <span className="text-slate-700">·</span>
        <span>
          <span className="text-white font-semibold">Bootcamp</span> AI Java Backend
        </span>
      </div>
    </section>
  );
}
