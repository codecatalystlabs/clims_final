//@ts-nocheck
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const PublicRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("userData"));
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

  return isAuthenticated ? (
    <Navigate to={location.state?.from} />
  ) : (
    <Outlet />
  );
};
