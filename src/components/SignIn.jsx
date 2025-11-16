import React, { useState } from "react";
import { signin } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const user = await signin(form);
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setError(err.message || "Error signing in");
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div><label className="form-label">Email</label><br />
          <input type="email" className="form-control" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required />
        </div>
        <div><label className="form-label">Password</label><br />
          <input type="password" className="form-control" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required />
        </div>
        <div style={{ marginTop: 12 }}>
          <button type="submit" className="btn btn-primary">Sign In</button>
        </div>
        {error && <p style={{color:"red"}}>{error}</p>}
      </form>
    </div>
  );
}
