import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Welcome</h1>
      <p>
        Use <Link to="/signin" style={{color:"white"}}>Sign In</Link> or <Link to="/signup" style={{color:"white"}}>Sign Up</Link>.
      </p>
    </div>
  );
}
