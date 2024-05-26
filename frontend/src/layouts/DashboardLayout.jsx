import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AUTH_LOGIN_PAGE } from "../constants/pages.js";

export function DashboardLayout() {
  const isAuthorized = useSelector((state) => state.auth.token);
  const is2FAuthorized = useSelector((state) => state.auth.is2FAuthorized);

  if (!isAuthorized || !is2FAuthorized) {
    return <Navigate to={AUTH_LOGIN_PAGE} />;
  }

  return (
    <div className="dashboard-layout">
      <Outlet />
    </div>
  );
}
