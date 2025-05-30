import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const userRole = localStorage.getItem("role");
  const location = useLocation();

  if (userRole !== allowedRole) {
    alert("Access denied! You do not have permission to view this page.");
    // Redirect to login page with the correct role pre-selected
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
