import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "../services/auth";

export default function NavBar() {
  const userStr = localStorage.getItem("currentUser");
  const user = userStr ? JSON.parse(userStr) : null;
  const navigate = useNavigate();

  function handleLogout() {
    signout();
    navigate("/signin");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/" style={{color:"white"}}>
          Coding Tutor
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin" style={{color:"white"}}>Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" style={{color:"white"}}>Sign Up</Link>
                </li>
              </>
            )}

            {user && (
              <>
                <li className="nav-item">
                  <span className="nav-link" style={{color:"white"}}>Hello, {user.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
