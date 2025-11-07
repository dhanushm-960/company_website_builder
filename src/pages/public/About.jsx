export default function About() {
  const team = [
    {
      name: "Aarav Mehta",
      role: "Frontend Developer",
      img: "https://i.pravatar.cc/200?img=4",
      links: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Isha R",
      role: "Backend Engineer",
      img: "https://i.pravatar.cc/200?img=10",
      links: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Rohit Sharma",
      role: "AI / ML Engineer",
      img: "https://i.pravatar.cc/200?img=12",
      links: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Ananya Patel",
      role: "UI/UX / Product",
      img: "https://i.pravatar.cc/200?img=8",
      links: {
        linkedin: "#",
        github: "#"
      }
    }
  ];

  return (
    <div className="space-y-16">
      
      {/* INTRO SECTION */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gradient">
          About Us
        </h1>
        <p className="mt-4 text-white/70 text-lg leading-relaxed">
          We're a small but elite build team specializing in fast execution, clean UI,
          and practical AI integration. Our goal is to turn ideas into smooth-working,
          scalable products — quickly.
        </p>
      </section>

      {/* TEAM SECTION */}
      <section>
        <h2 className="section-title text-center">Meet the Team</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

          {team.map((person, i) => (
            <div key={i} className="group relative card p-6 text-center cursor-pointer transition hover:scale-[1.02]">

              {/* Neon border aura */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 blur-2xl transition pointer-events-none"
                style={{
                  background: "conic-gradient(from 180deg at 50% 50%, #22d3ee, #8b5cf6, #f472b6, #22d3ee)"
                }}
              />

              {/* Profile Image */}
              <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border border-white/20 mb-4 group-hover:shadow-[0_0_28px_rgba(139,92,246,.6)] transition">
                <img src={person.img} alt={person.name} className="w-full h-full object-cover" />
              </div>

              <h3 className="text-lg font-semibold">{person.name}</h3>
              <p className="text-white/60 text-sm">{person.role}</p>

              {/* Social Links */}
              <div className="flex justify-center gap-4 mt-4 opacity-80 group-hover:opacity-100 transition">
                <a href={person.links.linkedin} className="hover:text-[#22d3ee] transition text-sm">LinkedIn</a>
                <a href={person.links.github} className="hover:text-[#8b5cf6] transition text-sm">GitHub</a>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="glass p-10 text-center rounded-3xl">
        <h3 className="text-2xl font-bold">We love building new things.</h3>
        <p className="mt-2 text-white/70">Got an idea worth shipping?</p>
        <a href="/contact" className="btn btn-primary mt-5">Contact Us</a>
      </section>

    </div>
  );
}
