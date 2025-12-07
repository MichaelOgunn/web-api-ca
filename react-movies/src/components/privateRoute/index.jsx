
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../contexts/authContext";

const PrivateRoute = ({ children }) => {
  const context = useContext(AuthContext);
  const location = useLocation();

  if (!context.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
