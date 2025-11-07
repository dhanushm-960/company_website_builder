import posts from "../../mocks/posts.json";
import { Link } from "react-router-dom";

export default function BlogList() {
  return (
    <div className="space-y-16">

      {/* TITLE */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gradient">
          Blog
        </h1>
        <p className="mt-4 text-white/70 text-lg leading-relaxed">
          Insights, opinions, practical learnings — documented cleanly.
        </p>
      </section>

      {/* POSTS GRID */}
      <section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {posts.map((p) => (
            <Link
              to={`/blog/${p.id}`}
              key={p.id}
              className="group relative card p-6 transition hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(244,114,182,.35)]"
            >
              {/* Neon Aura */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 blur-2xl transition pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 180deg at 50% 50%, #f472b6, #8b5cf6, #22d3ee, #f472b6)",
                }}
              />

              <div className="text-xs text-white/50">{p.date}</div>
              <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-white/70 leading-relaxed text-sm line-clamp-3">
                {p.excerpt}
              </p>

              <div className="mt-4 inline-block text-gradient font-medium">Read More →</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
