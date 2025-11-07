import jobs from "../../mocks/jobs.json";
import { Link } from "react-router-dom";

export default function Careers() {
  return (
    <div className="space-y-16">

      {/* Title */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gradient tracking-tight">
          Careers
        </h1>
        <p className="mt-4 text-white/70 text-lg leading-relaxed">
          We are a fast execution team. If you like to build high-quality products quickly,
          you’ll fit right in.
        </p>
      </section>

      {/* Jobs List */}
      <section className="space-y-6">
        {jobs.map(job => (
          <div
            key={job.id}
            className="group relative card p-6 hover:scale-[1.02] transition cursor-pointer"
          >
            {/* Neon Aura */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 blur-2xl group-hover:opacity-60 transition pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 180deg at 50% 50%, #22d3ee, #8b5cf6, #f472b6, #22d3ee)"
              }}
            />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-white/60 text-sm mt-1">{job.location} • {job.type}</p>
              </div>

              {/* ✅ Correct route */}
              <Link to={`/apply/${job.id}`} className="btn btn-outline">
                Apply →
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="glass p-10 text-center rounded-3xl">
        <h3 className="text-2xl font-bold">Don’t see a role that fits?</h3>
        <p className="mt-2 text-white/70">Send us your profile anyway — we reply fast.</p>
        <a href="/contact" className="btn btn-primary mt-5">
          Contact us
        </a>
      </section>
    </div>
  );
}
