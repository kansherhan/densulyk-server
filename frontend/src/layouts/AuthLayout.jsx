import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { DASHBOARD_PAGE } from "../constants/pages.js";

export function AuthLayout() {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  if (isAuthorized) {
    return <Navigate to={DASHBOARD_PAGE} />;
  }

  return <Outlet />;
}
