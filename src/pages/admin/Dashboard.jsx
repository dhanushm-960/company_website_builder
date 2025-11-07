import posts from "../../mocks/posts.json";
import projects from "../../mocks/projects.json";
import jobs from "../../mocks/jobs.json";
import applications from "../../mocks/applications.json";

export default function Dashboard(){
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <div className="kpi">Posts <span>{posts.length}</span></div>
      <div className="kpi">Projects <span>{projects.length}</span></div>
      <div className="kpi">Jobs <span>{jobs.length}</span></div>
      <div className="kpi">Applications <span>{applications.length}</span></div>
    </div>
  );
}
