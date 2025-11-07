# app.py  -- single-file enhanced backend for AI-Powered Company Website Builder
# Includes: AI auto builder, portfolio generator, chatbot, SEO analyzer, theme customizer,
# resume parsing & scoring, voice text, and an admin seeding utility for Mastersolis Infotech data.
#
# Run:
#   1) python -m venv venv
#   2) (Windows) venv\Scripts\activate  OR (Mac/Linux) source venv/bin/activate
#   3) pip install flask flask-cors openai python-dotenv
#   4) (optional) set OPENAI_API_KEY in environment or .env
#   5) python app.py
#
# Endpoints:
# /                      GET  - health
# /api/pages/<pagename>  GET  - get page
# /api/admin/pages/<pagename> POST - create/update page
# /api/jobs              GET/POST - list/add jobs
# /api/apply             POST - apply for job (form-data + resume file)
# /api/portfolio/generate POST - upload resume -> create portfolio
# /api/portfolio/<id>    GET - view generated portfolio HTML
# /api/chatbot           POST - ask question
# /api/ai/seo_analyze    POST - SEO analyze text
# /api/ai/theme          POST - theme suggestion
# /api/resume/parse      POST - parse resume + score
# /api/ai/auto_build     POST - auto-build site from brief
# /api/voice/text        POST - rewrite text for narration
# /api/admin/ensure_seed GET/POST - ensure sample Mastersolis Infotech data exists
# /api/admin/applications GET - list all applications (admin)
#
# Note: For production, replace in-memory DB with persistent DB (Postgres) and add auth.

from flask import Flask, request, jsonify
from flask_cors import CORS
import os, re, json, uuid, datetime
from pathlib import Path

# Optional OpenAI integration:
OPENAI_KEY = os.getenv("OPENAI_API_KEY")
USE_OPENAI = bool(OPENAI_KEY)
if USE_OPENAI:
    try:
        import openai
        openai.api_key = OPENAI_KEY
    except Exception:
        USE_OPENAI = False

app = Flask(__name__)
CORS(app)

DATA_DIR = Path("data")
DATA_DIR.mkdir(exist_ok=True)

# In-memory DB (demo). Keys: pages, jobs, applications, portfolios, faq, themes, blog, testimonials, analytics
DB = {
    "pages": {
        "home": {"title":"Mastersolis Infotech", "hero":"AI-driven digital presence"},
        "about": {"mission":"Empowering AI-driven innovation for modern businesses."}
    },
    "jobs": [],
    "applications": [],
    "portfolios": {},
    "faq": [],
    "themes": {},
    "blog": [],
    "testimonials": [],
    "analytics": {}
}

# ----------------------------
# Helpers
# ----------------------------
def run_openai_completion(prompt, max_tokens=200, temperature=0.7):
    """Run OpenAI Completion (davinci) with fallback stub if key is absent."""
    if not USE_OPENAI:
        # Safe stub response for offline demos
        return "OPENAI_KEY not set — stub response. Prompt head: " + (prompt[:200] + "...")
    try:
        resp = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=max_tokens,
            temperature=temperature
        )
        return resp.choices[0].text.strip()
    except Exception as e:
        return f"OpenAI error: {e}"

def parse_resume_text_simple(text):
    """Very simple regex-based resume parsing for demo. Returns name, email, skills, years."""
    skills = re.findall(r"\b(Python|JavaScript|React|Django|Flask|SQL|Node|HTML|CSS|Java|C\+\+|AWS|Docker|TensorFlow)\b", text, flags=re.I)
    years = re.search(r"(\d+)\s+years?", text, flags=re.I)
    email = re.search(r"[\w\.-]+@[\w\.-]+\.\w+", text)
    name = None
    for line in text.splitlines():
        s = line.strip()
        if s and len(s.split()) <= 4 and "@" not in s and not re.search(r"\d", s):
            name = s
            break
    return {
        "name": name or "Unknown",
        "email": email.group(0) if email else None,
        "skills": list({s.lower() for s in skills}),
        "experience_years": int(years.group(1)) if years else 0
    }

def score_resume(parsed, desired_skills=None):
    if not desired_skills:
        desired_skills = []
    desired_lower = [d.strip().lower() for d in desired_skills if d.strip()]
    matched = set(parsed.get("skills", [])) & set(desired_lower)
    skill_score = (len(matched) / max(1, len(desired_lower))) if desired_lower else 0.0
    exp_score = min(parsed.get("experience_years",0) / 5.0, 1.0)
    overall = round((skill_score * 0.7 + exp_score * 0.3) * 100, 1)
    return {"match_percent": overall, "matched_skills": list(matched)}

# ----------------------------
# Basic routes
# ----------------------------
@app.route("/")
def health():
    return jsonify({"message":"AI Website Builder Backend Running", "openai": bool(USE_OPENAI)})

@app.route("/api/pages/<pagename>", methods=["GET"])
def get_page(pagename):
    page = DB["pages"].get(pagename)
    if not page:
        return jsonify({"error":"Page not found"}), 404
    return jsonify(page)

@app.route("/api/admin/pages/<pagename>", methods=["POST"])
def admin_update_page(pagename):
    data = request.get_json() or {}
    DB["pages"][pagename] = data
    # add a simplified FAQ entry for chatbot context
    DB.setdefault("faq", []).append({"q": f"What is on the {pagename} page?", "a": json.dumps(data)})
    return jsonify({"status":"ok", "page": data})

@app.route("/api/jobs", methods=["GET","POST"])
def jobs():
    if request.method == "POST":
        job = request.get_json()
        job['id'] = job.get('id') or str(uuid.uuid4())
        DB.setdefault("jobs", []).append(job)
        return jsonify({"status":"job_added", "job": job})
    return jsonify(DB.get("jobs", []))

@app.route("/api/apply", methods=["POST"])
def apply_job():
    form = request.form.to_dict()
    file = request.files.get("resume")
    saved_path = None
    if file:
        updir = DATA_DIR/"uploads"
        updir.mkdir(exist_ok=True)
        saved_path = str(updir / file.filename)
        file.save(saved_path)
    app_entry = {
        "id": str(uuid.uuid4()),
        "name": form.get("name"),
        "email": form.get("email"),
        "job_title": form.get("job_title"),
        "resume_path": saved_path
    }
    DB.setdefault("applications", []).append(app_entry)
    # parse resume and score (simple)
    parsed = {}
    if saved_path:
        try:
            txt = Path(saved_path).read_text(errors="ignore")
            parsed = parse_resume_text_simple(txt)
        except Exception:
            parsed = {}
    desired_skills = (form.get("desired_skills") or "").split(",") if form.get("desired_skills") else []
    score = score_resume(parsed, desired_skills)
    app_entry['parsed'] = parsed
    app_entry['score'] = score
    # NOTE: Optional: send AI-generated acknowledgment email here (requires SMTP setup)
    return jsonify({"status":"received", "application": app_entry})

# ----------------------------
# Portfolio generator
# ----------------------------
@app.route("/api/portfolio/generate", methods=["POST"])
def portfolio_generate():
    file = request.files.get("resume")
    if not file:
        return jsonify({"error":"Attach resume file (form-data key 'resume')"}), 400
    updir = DATA_DIR/"uploads"
    updir.mkdir(exist_ok=True)
    path = updir / file.filename
    file.save(path)
    text = ""
    try:
        # if it's a text file, read; if binary pdf, still try a text read (may be messy)
        text = path.read_text(errors="ignore")
    except Exception:
        text = ""
    parsed = parse_resume_text_simple(text)
    if USE_OPENAI:
        prompt = f"Create a simple, clean HTML portfolio page for this candidate with name, email, skills, experience and a short intro: {parsed}"
        html = run_openai_completion(prompt, max_tokens=600)
        # sanitize minimal: ensure returned string contains html tag; if not wrap
        if "<html" not in html.lower():
            html = f"<html><body><h1>{parsed.get('name')}</h1><p>Skills: {', '.join(parsed.get('skills',[]))}</p><p>Experience: {parsed.get('experience_years')} years</p></body></html>"
    else:
        html = f"<html><body><h1>{parsed.get('name')}</h1><p>Email: {parsed.get('email') or ''}</p><p>Skills: {', '.join(parsed.get('skills',[]))}</p><p>Experience: {parsed.get('experience_years')} years</p></body></html>"
    pid = str(uuid.uuid4())
    DB.setdefault("portfolios", {})[pid] = {"html": html, "meta": parsed}
    return jsonify({"portfolio_id": pid, "preview_html": html[:800]})

@app.route("/api/portfolio/<pid>", methods=["GET"])
def portfolio_get(pid):
    rec = DB.get("portfolios", {}).get(pid)
    if not rec:
        return jsonify({"error":"Not found"}), 404
    return rec["html"], 200, {"Content-Type":"text/html; charset=utf-8"}

# ----------------------------
# Chatbot (contextual)
# ----------------------------
@app.route("/api/chatbot", methods=["POST"])
def chatbot():
    data = request.get_json() or {}
    q = data.get("question", "")
    if not q:
        return jsonify({"error":"Provide 'question' in body"}), 400
    # Build limited context from pages and faq
    context = []
    for k,v in list(DB.get("pages", {}).items()):
        context.append(f"Page {k}: {json.dumps(v)}")
    for f in DB.get("faq", [])[-10:]:
        context.append(f"FAQ: Q:{f.get('q')} A:{f.get('a')}")
    context_text = "\n\n".join(context)
    if USE_OPENAI:
        prompt = f"Use the following context to answer concisely to the question.\n\nCONTEXT:\n{context_text}\n\nQUESTION: {q}\n\nAnswer:"
        ans = run_openai_completion(prompt, max_tokens=200)
    else:
        # naive fallback
        basic = "; ".join([f"{k}:{str(list(v.keys())[:3])}" for k,v in DB.get("pages", {}).items()])
        ans = f"Demo-mode answer. Pages summary: {basic}"
    return jsonify({"answer": ans})

# ----------------------------
# SEO analyzer
# ----------------------------
@app.route("/api/ai/seo_analyze", methods=["POST"])
def seo_analyze():
    data = request.get_json() or {}
    content = data.get("content", "")
    if not content:
        return jsonify({"error":"Provide 'content' in JSON body"}), 400
    if USE_OPENAI:
        prompt = f"Analyze this blog content for SEO. Provide 5 keyword suggestions, a short SEO score (0-100), and a one-line meta description. Content:\n\n{content}"
        out = run_openai_completion(prompt, max_tokens=200)
        return jsonify({"analysis": out})
    else:
        words = re.findall(r"\w+", content.lower())
        common = {}
        for w in words:
            if len(w)>4:
                common[w] = common.get(w,0)+1
        top = sorted(common.items(), key=lambda x:-x[1])[:5]
        keywords = [t[0] for t in top]
        score = min(85, 50 + len(top)*5)
        meta = (content[:120] + "...") if len(content)>120 else content
        return jsonify({"keywords": keywords, "score": score, "meta": meta})

# ----------------------------
# Theme customizer
# ----------------------------
@app.route("/api/ai/theme", methods=["POST"])
def theme_customize():
    data = request.get_json() or {}
    tone = data.get("tone", "professional")
    prompt = f"Suggest CSS variables for a {tone} website (JSON: primary, secondary, accent, bg, text, button) and 3 Tailwind class groups for hero, button, card."
    if USE_OPENAI:
        out = run_openai_completion(prompt, max_tokens=200)
        try:
            start = out.find("{")
            j = json.loads(out[start:]) if start != -1 else {"suggestion": out}
            DB.setdefault("themes", {})[tone] = j
            return jsonify({"theme": j})
        except Exception:
            return jsonify({"theme_suggestion": out})
    else:
        j = {"primary":"#0b72ff","secondary":"#0b9eff","accent":"#ffb400","bg":"#ffffff","text":"#111827","button":"#0b72ff"}
        DB.setdefault("themes", {})[tone] = j
        return jsonify({"theme": j})

# ----------------------------
# Resume parse + match
# ----------------------------
@app.route("/api/resume/parse", methods=["POST"])
def resume_parse():
    file = request.files.get("resume")
    desired = (request.form.get("desired_skills") or "").split(",") if request.form.get("desired_skills") else []
    if not file:
        return jsonify({"error":"Attach resume file (key name 'resume')"}), 400
    updir = DATA_DIR/"uploads"
    updir.mkdir(exist_ok=True)
    path = updir / file.filename
    file.save(path)
    text = ""
    try:
        text = path.read_text(errors="ignore")
    except:
        text = ""
    parsed = parse_resume_text_simple(text)
    score = score_resume(parsed, desired)
    return jsonify({"parsed": parsed, "score": score})

# ----------------------------
# AI Auto Website Builder
# ----------------------------
@app.route("/api/ai/auto_build", methods=["POST"])
def ai_auto_build():
    payload = request.get_json() or {}
    brief = payload.get("brief", "")
    if not brief:
        return jsonify({"error":"Provide 'brief' in JSON body"}), 400
    prompt = (
        f"Given this company description: {brief}\n\n"
        "Generate a JSON object with keys: name, tagline, about, services (list of 3), "
        "sample_projects (list of 2 with short desc). Return only valid JSON."
    )
    resp = run_openai_completion(prompt, max_tokens=350) if USE_OPENAI else run_openai_completion(prompt)
    try:
        jtext = resp
        start = jtext.find("{")
        if start != -1:
            jtext = jtext[start:]
        obj = json.loads(jtext)
    except Exception:
        # fallback generation
        obj = {
            "name": "Mastersolis Infotech",
            "tagline": "AI-driven digital presence",
            "about": brief or "We build AI solutions.",
            "services": ["Custom AI Solutions","Web Development","Data Analytics"],
            "sample_projects": [
                {"title":"Project A","desc":"AI automation for retail"},
                {"title":"Project B","desc":"Analytics dashboard deployment"}
            ]
        }
    DB.setdefault("pages", {})["home"] = {"title": obj.get("name"), "hero": obj.get("tagline")}
    DB["pages"]["about"] = {"about": obj.get("about"), "services": obj.get("services")}
    DB["pages"]["projects"] = {"projects": obj.get("sample_projects")}
    return jsonify({"generated": obj})

# ----------------------------
# Voice text (rewrite for narration)
# ----------------------------
@app.route("/api/voice/text", methods=["POST"])
def voice_text():
    data = request.get_json() or {}
    text = data.get("text","")
    if not text:
        return jsonify({"error":"Provide 'text' to convert to speech-friendly form"}), 400
    if USE_OPENAI:
        prompt = f"Rewrite the following text as a short friendly spoken introduction (40-70 words):\n\n{text}"
        out = run_openai_completion(prompt, max_tokens=120)
        return jsonify({"speech_text": out})
    else:
        s = re.sub(r"\s+", " ", text).strip()
        return jsonify({"speech_text": s})

# ----------------------------
# Admin seeding utility (idempotent)
# ----------------------------
def ensure_seed_data():
    """Create sample Mastersolis Infotech data if missing (idempotent)."""
    # Home / About
    DB.setdefault("pages", {})
    if not DB["pages"].get("home"):
        DB["pages"]["home"] = {
            "title": "Mastersolis Infotech",
            "hero": "We build AI-driven digital solutions for businesses",
            "tagline": "Automate. Analyze. Accelerate."
        }
    if not DB["pages"].get("about"):
        DB["pages"]["about"] = {
            "mission": "Empower organizations using intelligent automation and actionable insights.",
            "vision": "To be the trusted AI partner for small and medium enterprises.",
            "values": ["Innovation", "Integrity", "Customer-first"],
            "team": [
                {"name":"Asha Patel","role":"CEO","bio":"Product leader with 10+ years in AI"},
                {"name":"Rajan Kumar","role":"CTO","bio":"ML engineer and cloud architect"},
                {"name":"Nisha Rao","role":"Head of Design","bio":"Design thinker and UX lead"}
            ],
            "milestones": [
                {"year":2022,"event":"Founded"},
                {"year":2023,"event":"Launched first AI automation product"},
                {"year":2024,"event":"Served 100+ SME customers"}
            ]
        }
    # Services
    if not DB["pages"].get("services"):
        DB["pages"]["services"] = {
            "services": [
                {"id":"svc_ai_chat","title":"AI Chatbots","desc":"Build intelligent conversational assistants for customer support and sales."},
                {"id":"svc_auto_ops","title":"Automation Ops","desc":"Automate routine processes using RPA + ML pipelines."},
                {"id":"svc_data_analytics","title":"Data Analytics","desc":"Dashboards and insights to drive smarter decisions."}
            ]
        }
    # Projects
    if not DB["pages"].get("projects"):
        DB["pages"]["projects"] = {
            "projects": [
                {"id":"prj_1","title":"SupportBot","tags":["chatbot","automation"],"summary":"Reduced support load by 45% for a retail client."},
                {"id":"prj_2","title":"SalesInsights","tags":["analytics","dashboard"],"summary":"Actionable sales dashboards for 20 stores."},
                {"id":"prj_3","title":"ResumeAI","tags":["hr","nlp"],"summary":"Automated resume scoring and ATS formatting service."}
            ]
        }
    # Testimonials & case studies
    DB.setdefault("testimonials", [])
    if not DB["testimonials"]:
        DB["testimonials"] = [
            {"client":"GreenMart","quote":"Mastersolis built our chatbot - response rates improved dramatically.","author":"Priya S."},
            {"client":"TravelCo","quote":"Their analytics platform helped us optimize promotions.","author":"Arjun V."}
        ]
    # Blog posts
    DB.setdefault("blog", [])
    if not DB["blog"]:
        DB["blog"] = [
            {"id":"b1","title":"How AI Improves Customer Support","content":"Long blog content here...","summary":"AI reduces response time and improves CSAT."},
            {"id":"b2","title":"Top 5 Automation Ideas for SMEs","content":"Long blog content here...","summary":"Practical automation ideas to save time and cost."}
        ]
    # Jobs & applications
    DB.setdefault("jobs", [])
    if not DB["jobs"]:
        DB["jobs"] = [
            {"id":"job-frontend","title":"Frontend Developer","skills":"React, Tailwind, HTML, CSS","description":"Build UI for dashboards and marketing site."},
            {"id":"job-ml","title":"Machine Learning Engineer","skills":"Python, TensorFlow, MLops","description":"Build and deploy ML models."}
        ]
    DB.setdefault("applications", [])
    if not DB["applications"]:
        DB["applications"] = [
            {"id":"app1","name":"Riya Sharma","email":"riya@example.com","job_title":"Frontend Developer","resume_path":None,"parsed":{"name":"Riya Sharma","skills":["react","flask","python"],"experience_years":3},"score":{"match_percent":82.0}},
            {"id":"app2","name":"Siddharth Rao","email":"sid@example.com","job_title":"Machine Learning Engineer","resume_path":None,"parsed":{"name":"Siddharth Rao","skills":["python","tensorflow","aws"],"experience_years":4},"score":{"match_percent":88.0}}
        ]
    # FAQ
    DB.setdefault("faq", [])
    if not DB["faq"]:
        DB["faq"] = [
            {"q":"What services do you offer?","a":"We offer AI chatbots, automation ops, and data analytics."},
            {"q":"How to contact?","a":"Use the Contact page or email contact@mastersolis.com"}
        ]
    # Analytics
    DB.setdefault("analytics", {})
    DB["analytics"] = {"visitors": 1240, "applications": len(DB.get("applications",[])), "popular_pages":["careers","home","projects"]}
    # Themes
    DB.setdefault("themes", {})
    if not DB["themes"]:
        DB["themes"] = {"default":{"primary":"#0b72ff","accent":"#ffb400","bg":"#ffffff","text":"#0f172a"}}
    # Sample portfolio
    DB.setdefault("portfolios", {})
    if not DB["portfolios"]:
        DB["portfolios"]["sample-portfolio-1"] = {
            "html":"<html><body><h1>Riya Sharma</h1><p>Frontend developer (React, Tailwind)</p></body></html>",
            "meta":{"name":"Riya Sharma","skills":["react","tailwind"],"experience_years":3}
        }
    # Mark seed time
    DB.setdefault("_meta", {})["seeded_at"] = datetime.datetime.utcnow().isoformat()

@app.route("/api/admin/ensure_seed", methods=["GET","POST"])
def api_ensure_seed():
    ensure_seed_data()
    return jsonify({"status":"seeded_or_exists","summary": {
        "pages": list(DB.get("pages",{}).keys()),
        "jobs": len(DB.get("jobs",[])),
        "applications": len(DB.get("applications",[])),
        "blog_posts": len(DB.get("blog",[]))
    }})

# Optional admin endpoint to list applications
@app.route("/api/admin/applications", methods=["GET"])
def list_applications():
    return jsonify(DB.get("applications", []))

# ----------------------------
# Run
# ----------------------------
if __name__ == "__main__":
    # Ensure data dir exists
    DATA_DIR.mkdir(exist_ok=True)
    print("Starting AI Website Builder backend. OpenAI enabled:", USE_OPENAI)
    app.run(debug=True, port=5001)
