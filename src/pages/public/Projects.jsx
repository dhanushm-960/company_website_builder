import projects from "../../mocks/projects.json";

export default function Projects() {
  return (
    <div className="space-y-16">

      {/* TITLE */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gradient">
          Our Projects
        </h1>
        <p className="mt-4 text-white/70 text-lg leading-relaxed">
          Real work. Real impact. We design and deliver products that scale,
          perform, and feel sharp.
        </p>
      </section>

      {/* GRID */}
      <section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

          {projects.map((p, idx) => (
            <div
              key={idx}
              className="group relative card p-6 cursor-pointer transition hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(139,92,246,.35)]"
            >
              {/* Neon Aura */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 blur-2xl transition pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 180deg at 50% 50%, #22d3ee, #8b5cf6, #f472b6, #22d3ee)",
                }}
              />

              {/* Title */}
              <h3 className="text-lg font-semibold">{p.title}</h3>

              {/* Summary */}
              <p className="mt-3 text-white/65 leading-relaxed text-sm">
                {p.summary}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <button className="mt-4 btn btn-outline w-full">View Details</button>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}
