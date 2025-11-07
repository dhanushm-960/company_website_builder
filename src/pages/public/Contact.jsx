export default function Contact() {
  return (
    <div className="space-y-16 max-w-4xl mx-auto">

      {/* Title */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gradient">
          Contact Us
        </h1>
        <p className="mt-4 text-white/70 text-lg leading-relaxed">
          We respond fast. Tell us what you're thinking — let's build something great.
        </p>
      </section>

      {/* Form + Info */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* Form */}
        <form className="glass p-8 rounded-3xl space-y-4">
          <input className="input" type="text" placeholder="Your Name" required />
          <input className="input" type="email" placeholder="Email Address" required />
          <textarea className="textarea" rows="5" placeholder="Message"></textarea>
          <button className="btn btn-primary w-full">Send Message</button>
        </form>

        {/* Contact Info */}
        <div className="grid gap-6 place-content-center">
          <div className="card p-6 text-center">
            <h3 className="text-lg font-semibold">Email</h3>
            <p className="text-white/60 mt-1 text-sm">team@mastersolis.tech</p>
          </div>
          <div className="card p-6 text-center">
            <h3 className="text-lg font-semibold">Location</h3>
            <p className="text-white/60 mt-1 text-sm">Bengaluru, India</p>
          </div>
        </div>
      </div>
    </div>
  );
}
