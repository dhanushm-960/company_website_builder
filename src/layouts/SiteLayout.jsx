import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

export default function SiteLayout({ children }) {
  const nav = [
    ["Home", "/"],
    ["About", "/about"],
    ["Services", "/services"],
    ["Projects", "/projects"],
    ["Blog", "/blog"],
    ["Careers", "/careers"],
    ["Contact", "/contact"],
  ];
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-neon-radials">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#07070c]/60 border-b border-white/10">
        <div className="container-page h-16 flex items-center justify-between">
          <Link to="/" className="text-gradient font-extrabold text-xl">Mastersolis</Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 text-sm">
            {nav.map(([label, to]) => {
              const active = pathname === to || (to !== "/" && pathname.startsWith(to));
              return (
                <NavLink
                  key={to} to={to} end={to === "/"}
                  className={active ? "nav-link-active" : "nav-link"}
                >
                  {label}
                </NavLink>
              );
            })}
          </nav>

          <div className="hidden md:flex gap-3">
            <Link to="/admin/login" className="btn btn-outline">Admin</Link>
            <Link to="/careers" className="btn btn-primary">We’re hiring</Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden btn btn-outline" onClick={()=>setOpen(v=>!v)}>
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden border-t border-white/10">
            <div className="container-page py-3 flex flex-col gap-2">
              {nav.map(([label,to])=>(
                <NavLink key={to} to={to} onClick={()=>setOpen(false)} className="nav-link">{label}</NavLink>
              ))}
              <div className="pt-2 flex gap-3">
                <Link to="/admin/login" onClick={()=>setOpen(false)} className="btn btn-outline w-full">Admin</Link>
                <Link to="/careers" onClick={()=>setOpen(false)} className="btn btn-primary w-full">We’re hiring</Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="container-page py-10 flex-1">
        {children ?? <Outlet />}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="container-page py-8 grid md:grid-cols-3 gap-6 text-sm text-white/70">
          <div>
            <div className="text-gradient font-extrabold text-lg">Mastersolis</div>
            <p className="mt-2">AI-powered products. Crafted fast, shipped clean.</p>
          </div>
          <div>
            <div className="font-semibold text-white/90 mb-2">Company</div>
            <ul className="space-y-1">
              <li><Link className="nav-link" to="/about">About</Link></li>
              <li><Link className="nav-link" to="/projects">Projects</Link></li>
              <li><Link className="nav-link" to="/blog">Blog</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white/90 mb-2">Legal</div>
            <ul className="space-y-1">
              <li><Link className="nav-link" to="/privacy">Privacy</Link></li>
              <li><Link className="nav-link" to="/terms">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Mastersolis Infotech
        </div>
      </footer>
    </div>
  );
}
