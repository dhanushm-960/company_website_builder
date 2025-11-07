import applications from "../../mocks/applications.json";
import jobs from "../../mocks/jobs.json";
export default function Applications(){
  return (
    <div>
      <h1 className="section-title">Applications</h1>
      <table className="table">
        <thead><tr><th>Name</th><th>Job</th><th>Email</th><th>Status</th></tr></thead>
        <tbody>
          {applications.map(a=>(
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{jobs.find(j=>j.id===a.jobId)?.title || "-"}</td>
              <td>{a.email}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
