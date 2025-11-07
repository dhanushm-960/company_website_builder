import posts from "../../mocks/posts.json";
import { useParams, Link } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();
  const post = posts.find((p) => p.id.toString() === id);

  if (!post) return <div className="text-center">Post not found.</div>;

  return (
    <div className="space-y-14 max-w-3xl mx-auto">

      <Link to="/blog" className="text-gradient font-semibold">
        ← Back to Blog
      </Link>

      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient">
        {post.title}
      </h1>

      <div className="text-white/60 text-sm">{post.date}</div>

      <div className="mt-6 leading-relaxed text-white/80 whitespace-pre-line">
        {post.content}
      </div>

      {/* TAGS */}
      <div className="flex gap-2 flex-wrap mt-8">
        {post.tags.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="glass p-8 text-center rounded-3xl">
        <h3 className="text-xl font-bold">Have thoughts about this?</h3>
        <p className="mt-2 text-white/70">We’d love to discuss.</p>
        <a href="/contact" className="btn btn-primary mt-5">
          Contact Us
        </a>
      </div>
    </div>
  );
}
