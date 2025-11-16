import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function RoleRoute({ requiredRole }) {
  const userStr = localStorage.getItem("currentUser");
  if (!userStr) return <Navigate to="/signin" replace />;
  const user = JSON.parse(userStr);
  if (user.role !== requiredRole) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/user"} replace />;
  }
  return <Outlet />;
}
