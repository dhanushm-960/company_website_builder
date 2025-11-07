export default function Login(){
  return (
    <div className="max-w-sm">
      <h1 className="section-title">Admin Login</h1>
      <form className="space-y-3" onSubmit={(e)=>{e.preventDefault(); localStorage.setItem("token","demo"); window.location.href="/admin/dashboard";}}>
        <input className="input" type="email" placeholder="Email" required />
        <input className="input" type="password" placeholder="Password" required />
        <button className="btn btn-primary w-full">Login</button>
      </form>
    </div>
  );
}
