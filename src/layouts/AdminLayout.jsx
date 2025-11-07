import { Link, NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const nav = [
    ["Dashboard", "/admin/dashboard"],
    ["Posts", "/admin/posts"],
    ["Jobs", "/admin/jobs"],
    ["Applications", "/admin/applications"],
    ["Messages", "/admin/messages"],
  ];

  return (
    <div className="min-h-screen grid md:grid-cols-[260px_1fr] bg-[#07070c]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col gap-4 p-5 border-r border-white/10 bg-white/[.03] backdrop-blur-xl">
        <Link to="/" className="text-gradient font-extrabold text-lg">← Back to site</Link>
        <nav className="flex flex-col gap-1">
          {nav.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({isActive}) =>
                `px-3 py-2 rounded-xl transition ${
                  isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          className="btn btn-outline mt-2"
          onClick={()=>{ localStorage.removeItem("token"); window.location.href="/admin/login"; }}
        >
          Logout
        </button>
      </aside>

      {/* Main */}
      <div className="min-h-screen">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#07070c]/70 backdrop-blur-xl">
          <div className="px-5 h-14 flex items-center justify-between">
            <div className="font-semibold text-white/80">Admin</div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 glass px-3 py-1.5">
                <div className="w-2 h-2 rounded-full bg-[#22d3ee] animate-pulse"></div>
                <span className="text-xs text-white/70">Live preview</span>
              </div>
              <Link to="/" className="btn btn-outline">Site</Link>
            </div>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
