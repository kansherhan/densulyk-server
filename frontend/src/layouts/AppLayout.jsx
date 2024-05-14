import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { AUTH_LOGIN_PAGE } from "../constants/pages.js";

export function AppLayout() {
  const token = useSelector((state) => state.auth.token);

  if (token === null) {
    return <Navigate to={AUTH_LOGIN_PAGE} />;
  }

  return (
    <div className="root-container">
      <Header />

      <main className="root-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
