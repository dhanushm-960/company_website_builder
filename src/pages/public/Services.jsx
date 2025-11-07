import services from "../../mocks/services.json";

export default function Services() {
  return (
    <div className="space-y-16">

      {/* TITLE SECTION */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gradient">
          Our Services
        </h1>
        <p className="mt-4 text-white/70 text-lg leading-relaxed">
          We specialize in building fast, scalable, and intelligent products with a sharp
          focus on UI/UX and business practicality. Whatever we build — it ships clean.
        </p>
      </section>

      {/* SERVICES GRID */}
      <section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

          {services.map((s, idx) => (
            <div
              key={idx}
              className="group relative card p-6 cursor-pointer transition hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,.3)]"
            >
              {/* Neon conic glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 blur-2xl transition pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 180deg at 50% 50%, #22d3ee, #8b5cf6, #f472b6, #22d3ee)",
                }}
              />

              {/* Service Icon Placeholder */}
              <div className="h-14 w-14 mx-auto mb-4 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl text-white/80 group-hover:text-neon-2 group-hover:border-neon-2 transition">
                ✦
              </div>

              <h3 className="text-lg font-semibold text-center">{s.name}</h3>

              <p className="mt-2 text-white/60 text-sm text-center leading-relaxed">
                {s.description}
              </p>

              {/* Tags */}
              <div className="mt-4 flex justify-center gap-2 flex-wrap">
                {s.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* CTA Button */}
              <button className="mt-4 btn btn-outline w-full group-hover:border-neon-2 group-hover:text-neon-2 transition">
                Learn More
              </button>
            </div>
          ))}

        </div>
      </section>

      {/* CTA BANNER */}
      <section className="glass p-10 text-center rounded-3xl">
        <h3 className="text-2xl font-bold">Need a custom solution?</h3>
        <p className="mt-2 text-white/70">We build from scratch, fast & clean.</p>
        <a href="/contact" className="btn btn-primary mt-5">Start a conversation</a>
      </section>

    </div>
  );
}
