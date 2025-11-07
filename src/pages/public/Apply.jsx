import { useParams } from "react-router-dom";
import { useState } from "react";
import jobs from "../../mocks/jobs.json";

export default function Apply() {
  // ✅ Match the router: /apply/:jobId
  const { jobId } = useParams();
  const job = jobs.find(j => String(j.id) === String(jobId));
  const [ok, setOk] = useState(false);

  // graceful fallback if someone hits a bad URL
  if (!job) {
    return (
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-3xl font-bold">Job not found</h1>
        <p className="text-white/70">The role you’re trying to apply for doesn’t exist.</p>
        <a className="btn btn-outline" href="/careers">← Back to Careers</a>
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-3xl mx-auto">

      <h1 className="text-4xl md:text-5xl font-extrabold text-gradient tracking-tight text-center">
        Apply — {job.title}
      </h1>
      <p className="text-center text-white/60">{job.location} • {job.type}</p>

      <form
        className="glass p-8 rounded-3xl grid gap-5"
        onSubmit={(e)=>{ e.preventDefault(); setOk(true); window.scrollTo({top:0, behavior:"smooth"}); }}
      >
        <input className="input" type="text" placeholder="Full Name" required />
        <input className="input" type="email" placeholder="Email Address" required />
        <input className="input" type="text" placeholder="Phone" />
        <input className="input" type="text" placeholder="Skills (comma separated)" />
        <label className="text-white/80 text-sm">Upload Resume (PDF)</label>
        <input type="file" className="input" accept="application/pdf,.pdf" />
        <textarea className="textarea" rows="5" placeholder="Cover letter (optional)"></textarea>

        <button type="submit" className="btn btn-primary w-full">Submit Application</button>
      </form>

      {ok && (
        <div className="card">
          <p className="text-green-400 font-medium">Application submitted! (mock)</p>
          <p className="text-white/60 text-sm mt-1">
            Thanks for applying — we’ll get back to you soon.
          </p>
        </div>
      )}
    </div>
  );
}

