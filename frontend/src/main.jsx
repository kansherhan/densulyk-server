import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import "./assets/scss/index.scss";

import {
  AUTH_EMAIL_VERIFICATION_PAGE,
  AUTH_LOGIN_PAGE,
  AUTH_REGISTRATION_PAGE,
  DASHBOARD_PAGE,
  DASHBOARD_PATIENT_SUBSCRIBE_APPOINTMENT,
  DASHBOARD_USER_INFO_PAGE,
  INDEX_PAGE,
} from "./constants/pages.js";

import { store } from "./store/index.jsx";

import { AppLayout } from "./layouts/AppLayout.jsx";
import { AuthLayout } from "./layouts/AuthLayout.jsx";

import { IndexPage } from "./pages/IndexPage.jsx";
import { DashboardPage } from "./pages/dashboard/DashboardPage.jsx";

import { LoginPage } from "./pages/auth/LoginPage.jsx";
import { RegistrationPage } from "./pages/auth/RegistrationPage.jsx";
import { EmailVerificationPage } from "./pages/auth/EmailVerificationPage.jsx";
import { DashboardLayout } from "./layouts/DashboardLayout.jsx";
import { UserInfo } from "./pages/dashboard/UserInfo.jsx";
import { PatientSubscribeAppointment } from "./pages/dashboard/PatientSubscribeAppointment.jsx";

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

            <Route element={<DashboardLayout />}>
              <Route path={DASHBOARD_PAGE} element={<DashboardPage />} />

              <Route path={DASHBOARD_USER_INFO_PAGE} element={<UserInfo />} />

              <Route
                path={DASHBOARD_PATIENT_SUBSCRIBE_APPOINTMENT}
                element={<PatientSubscribeAppointment />}
              />
            </Route>

            <Route element={<AuthLayout />}>
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
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);
