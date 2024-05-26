import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { DASHBOARD_PAGE } from "../constants/pages.js";

export function AuthLayout() {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  const is2FAuthorized = useSelector((state) => state.auth.is2FAuthorized);

  if (isAuthorized && is2FAuthorized) {
    return <Navigate to={DASHBOARD_PAGE} />;
  }

  return <Outlet />;
}
