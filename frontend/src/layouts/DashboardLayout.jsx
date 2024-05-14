import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AUTH_LOGIN_PAGE } from "../constants/pages.js";

export function DashboardLayout() {
  const isAuthorized = useSelector((state) => state.auth.token);

  if (!isAuthorized) {
    return <Navigate to={AUTH_LOGIN_PAGE} />;
  }

  return (
    <div className="dashboard-layout">
      <Outlet />
    </div>
  );
}
