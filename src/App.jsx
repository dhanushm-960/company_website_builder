import { Routes, Route, Navigate } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import AdminLayout from "./layouts/AdminLayout";

// public pages
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import Projects from "./pages/public/Projects";
import BlogList from "./pages/public/BlogList";
import BlogPost from "./pages/public/BlogPost";
import Contact from "./pages/public/Contact";
import Careers from "./pages/public/Careers";
import Apply from "./pages/public/Apply";

// admin pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Posts from "./pages/admin/Posts";
import Jobs from "./pages/admin/Jobs";
import Applications from "./pages/admin/Applications";
import Messages from "./pages/admin/Messages";

function isAuthed() {
  return !!localStorage.getItem("token");
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/apply/:jobId" element={<Apply />} />
      </Route>

      <Route path="/admin/login" element={<SiteLayout><Login /></SiteLayout>} />

      <Route element={isAuthed() ? <AdminLayout /> : <Navigate to="/admin/login" replace />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/posts" element={<Posts />} />
        <Route path="/admin/jobs" element={<Jobs />} />
        <Route path="/admin/applications" element={<Applications />} />
        <Route path="/admin/messages" element={<Messages />} />
      </Route>

      <Route path="*" element={<SiteLayout><div className="py-12"><h1 className="text-2xl font-bold">404</h1><p className="text-gray-600">Page not found.</p></div></SiteLayout>} />
    </Routes>
  );
}

