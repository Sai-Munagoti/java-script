import React from "react";
import SideNav from "../components/SideNav";
import { useNavigate } from "react-router-dom";
import { signout } from "../services/auth";

export default function UserDashboard() {
  const navigate = useNavigate();
  const links = [
    { to: "/user/list", label: "PostList" },
    { to: "/user/my-posts", label: "My Posts" }
  ];

  function handleLogout() {
    signout();
    navigate("/signin");
  }

  return (
    <div style={{ display: "flex" }}>
      <SideNav links={links} />
      <main style={{ padding: 24, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>User Dashboard</h2>
          {/* <button onClick={handleLogout}>Logout</button> */}
        </div>

        <section>
          <h3>Welcome, regular user</h3>
          <p>This is the user area.</p>
        </section>
      </main>
    </div>
  );
}
