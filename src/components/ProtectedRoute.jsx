import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const userStr = localStorage.getItem("currentUser");
  if (!userStr) return <Navigate to="/signin" replace />;
  return <Outlet />;
}
