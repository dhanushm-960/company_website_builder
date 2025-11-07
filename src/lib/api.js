// Toggle mocks vs backend easily
const USE_MOCKS = true;
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function fetchJSON(path) {
  const res = await fetch(path);
  return res.json();
}

export async function getPosts() {
  return USE_MOCKS ? fetchJSON("/src/mocks/posts.json") : fetch(`${BASE_URL}/api/posts`).then(r=>r.json());
}
export async function getJobs() {
  return USE_MOCKS ? fetchJSON("/src/mocks/jobs.json") : fetch(`${BASE_URL}/api/jobs`).then(r=>r.json());
}
// Add similar functions as backend is ready: createPost, applyJob, sendContact, etc.
