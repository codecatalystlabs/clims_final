//@ts-nocheck
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const data = JSON.parse(window.localStorage.getItem("userData"));

  useEffect(() => {
    
    if (data && data.token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return null; // or a loading spinner if you prefer
  }

  return data.token ? <Outlet /> : <Navigate to="/" />;
};
