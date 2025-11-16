import React, { useState } from "react";
import { signup } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await signup(form);
      alert("Sign up successful. Please sign in.");
      navigate("/signin");
    } catch (err) {
      setError(err.message || "Error signing up");
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div><label className="form-label">Name</label><br />
          <input value={form.name} className="form-control" onChange={(e)=>setForm({...form,name:e.target.value})} required />
        </div>
        <div><label className="form-label">Email</label><br />
          <input type="email" className="form-control" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required />
        </div>
        <div><label className="form-label">Password</label><br />
          <input type="password" className="form-control" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required />
        </div>
        <div>
          <label className="form-label">Role</label><br />
          <select className="form-select" value={form.role} onChange={(e)=>setForm({...form,role:e.target.value})}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div style={{ marginTop: 12 }}>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </div>
        {error && <p style={{color:"red"}}>{error}</p>}
      </form>
    </div>
  );
}
