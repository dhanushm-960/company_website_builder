import posts from "../../mocks/posts.json";
export default function Posts(){
  return (
    <div>
      <h1 className="section-title">Manage Posts</h1>
      <table className="table">
        <thead><tr><th>Title</th><th>Date</th><th>Tags</th></tr></thead>
        <tbody>
          {posts.map(p=>(
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.date}</td>
              <td>{p.tags.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
