import messages from "../../mocks/messages.json";
export default function Messages(){
  return (
    <div>
      <h1 className="section-title">Messages</h1>
      <ul className="space-y-3">
        {messages.map(m=>(
          <li key={m.id} className="card">
            <p className="font-semibold">{m.name} • <span className="text-gray-500">{m.email}</span></p>
            <p className="text-sm text-gray-700">{m.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
