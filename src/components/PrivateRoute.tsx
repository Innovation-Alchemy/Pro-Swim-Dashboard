import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./utils/auth.tsx"; // Path to your utility functions

const PrivateRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;