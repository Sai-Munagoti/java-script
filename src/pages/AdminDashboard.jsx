import React from "react";
import SideNav from "../components/SideNav";
import { useNavigate } from "react-router-dom";
import { signout } from "../services/auth";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const links = [
    { to: "/user/list", label: "PostList" },
    { to: "/admin/create", label: "Create Post" }
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
          <h2>Admin Dashboard</h2>
          {/* <button onClick={handleLogout}>Logout</button> */}
        </div>

        <section>
          <h3>Admin area</h3>
          <p>Manage users and settings here.</p>
        </section>
      </main>
    </div>
  );
}
