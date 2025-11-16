import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container" style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user/list" element={<PostList />} />
          <Route path="/admin/create" element={<CreatePost />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<RoleRoute requiredRole="user" />}>
              <Route path="/user/*" element={<UserDashboard />} />
            </Route>

            <Route element={<RoleRoute requiredRole="admin" />}>
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
