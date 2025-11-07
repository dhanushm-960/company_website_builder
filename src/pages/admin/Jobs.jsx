import jobs from "../../mocks/jobs.json";
export default function Jobs(){
  return (
    <div>
      <h1 className="section-title">Manage Jobs</h1>
      <table className="table">
        <thead><tr><th>Title</th><th>Type</th><th>Location</th></tr></thead>
        <tbody>
          {jobs.map(j=>(
            <tr key={j.id}>
              <td>{j.title}</td>
              <td>{j.type}</td>
              <td>{j.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
