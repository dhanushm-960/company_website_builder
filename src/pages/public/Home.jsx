import posts from "../../mocks/posts.json";
import services from "../../mocks/services.json";
import projects from "../../mocks/projects.json";

export default function Home(){
  return (
    <div className="space-y-14">
      {/* HERO with hover FX */}
      <section className="group relative overflow-hidden rounded-3xl border border-white/10 p-8 md:p-12 bg-white/5 hover:ring-2 ring-cyan-300/40 transition">
        {/* subtle background blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#22d3ee]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-16 h-96 w-96 rounded-full bg-[#8b5cf6]/20 blur-3xl" />

        {/* neon aura on hover */}
        <div className="hover-aurora absolute inset-0 rounded-3xl -z-10" />

        {/* scanline sweep effect */}
        <div className="scanline absolute inset-0 rounded-3xl" />

        {/* sparkles */}
        <div className="sparkles">
          <div className="spark" style={{left:"22%", top:"68%", animationDelay:"0s"}} />
          <div className="spark violet" style={{left:"60%", top:"30%", animationDelay:".3s"}} />
          <div className="spark pink" style={{left:"78%", top:"62%", animationDelay:".6s"}} />
          <div className="spark" style={{left:"38%", top:"42%", animationDelay:".9s"}} />
        </div>

        {/* content */}
        <div className="relative floaty">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Build with <span className="shine">AI velocity</span>.<br className="hidden md:block" />
            Ship with <span className="shine">neon precision</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Hover to see the neon effects. Tailwind-only animations, no extra libraries.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/projects" className="btn btn-primary">See Projects</a>
            <a href="/services" className="btn btn-outline">Our Services</a>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section>
        <h2 className="section-title">What we do</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.slice(0,3).map(s=>(
            <div key={s.id} className="card group">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-lg">{s.name}</h3>
                <span className="chip">Service</span>
              </div>
              <p className="mt-2 text-white/70">{s.description}</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                {s.tags.map(t=> <span className="chip" key={t}>{t}</span>)}
              </div>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <button className="mt-3 btn btn-outline">Learn more</button>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section>
        <h2 className="section-title">Recent work</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {projects.slice(0,3).map(p=>(
            <div key={p.id} className="card">
              <div className="text-sm text-white/60">Case Study</div>
              <h3 className="mt-1 font-semibold text-lg">{p.title}</h3>
              <p className="mt-2 text-white/70">{p.summary}</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                {p.tags.map(t=> <span className="chip" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section>
        <h2 className="section-title">From the blog</h2>
        <ul className="grid md:grid-cols-3 gap-5">
          {posts.slice(0,3).map(p=>(
            <li key={p.id} className="card hover:shadow-[0_0_50px_rgba(139,92,246,.25)]">
              <div className="text-xs text-white/50">{p.date}</div>
              <h3 className="mt-1 font-semibold">{p.title}</h3>
              <p className="mt-1 text-white/70 line-clamp-2">{p.excerpt}</p>
              <a className="mt-3 inline-block text-gradient font-medium" href={`/blog/${p.id}`}>Read more →</a>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="glass p-8 text-center">
        <h3 className="text-2xl font-bold">Want this site with your content in 24h?</h3>
        <p className="mt-2 text-white/70">Drop a message and we’ll reach out.</p>
        <a className="mt-4 btn btn-primary" href="/contact">Contact us</a>
      </section>
    </div>
  );
}
