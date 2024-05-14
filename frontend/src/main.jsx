import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import "./assets/scss/index.scss";

import {
  AUTH_EMAIL_VERIFICATION_PAGE,
  AUTH_LOGIN_PAGE,
  AUTH_REGISTRATION_PAGE,
  DASHBOARD_PAGE,
  INDEX_PAGE,
} from "./constants/pages.js";

import { store } from "./store/index.jsx";

import { AppLayout } from "./layouts/AppLayout.jsx";

import { IndexPage } from "./pages/IndexPage.jsx";
import { DashboardPage } from "./pages/DashboardPage.jsx";

import { LoginPage } from "./pages/auth/LoginPage.jsx";
import { RegistrationPage } from "./pages/auth/RegistrationPage.jsx";
import { EmailVerificationPage } from "./pages/auth/EmailVerificationPage.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path={INDEX_PAGE} element={<IndexPage />} />

            <Route path={DASHBOARD_PAGE} element={<DashboardPage />} />

            <Route path={AUTH_LOGIN_PAGE} element={<LoginPage />} />
            <Route
              path={AUTH_REGISTRATION_PAGE}
              element={<RegistrationPage />}
            />
            <Route
              path={AUTH_EMAIL_VERIFICATION_PAGE}
              element={<EmailVerificationPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);
