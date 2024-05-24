import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import moment from "moment";
import "moment/dist/locale/ru";

import "@master/css";

import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";

import "react-toggle/style.css";

import "./assets/scss/index.scss";

import {
  AUTH_EMAIL_2FA_VERIFY_PAGE,
  AUTH_EMAIL_VERIFICATION_PAGE,
  AUTH_LOGIN_PAGE,
  AUTH_REGISTRATION_PAGE,
  DASHBOARD_ADMIN_CREATE_NEW_DOCTOR,
  DASHBOARD_ADMIN_STATISTIC_2FA,
  DASHBOARD_DOCTOR_ALL_APPOINTMENT,
  DASHBOARD_DOCTOR_CREATE_PATIENT_DIAGNOSTIC,
  DASHBOARD_PAGE,
  DASHBOARD_PATIENT_APPOINTMENT,
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
import { PatientSubscribeAppointmentPage } from "./pages/dashboard/patient/PatientSubscribeAppointmentPage.jsx";
import { PatientAppointmentsPage } from "./pages/dashboard/patient/PatientAppointmentsPage.jsx";
import { Statistic2FAPage } from "./pages/dashboard/admin/Statistic2FAPage.jsx";
import { DoctorAllPatientAppointmentsPage } from "./pages/dashboard/doctor/DoctorAllPatientAppointmentsPage.jsx";
import { AdminCreateNewDoctorPage } from "./pages/dashboard/admin/AdminCreateNewDoctorPage.jsx";
import { DoctorCreatePatientDiagnosticPage } from "./pages/dashboard/doctor/DoctorCreatePatientDiagnosticPage.jsx";
import { Account2FAVerifyPage } from "./pages/auth/Account2FAVerifyPage.jsx";

moment.locale("ru");

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

              {/*patient pages*/}

              <Route
                path={DASHBOARD_PATIENT_SUBSCRIBE_APPOINTMENT}
                element={<PatientSubscribeAppointmentPage />}
              />
              <Route
                path={DASHBOARD_PATIENT_APPOINTMENT}
                element={<PatientAppointmentsPage />}
              />

              {/*doctor pages*/}

              <Route
                path={DASHBOARD_DOCTOR_CREATE_PATIENT_DIAGNOSTIC}
                element={<DoctorCreatePatientDiagnosticPage />}
              />

              <Route
                path={DASHBOARD_DOCTOR_ALL_APPOINTMENT}
                element={<DoctorAllPatientAppointmentsPage />}
              />

              {/*admin pages*/}

              <Route
                path={DASHBOARD_ADMIN_CREATE_NEW_DOCTOR}
                element={<AdminCreateNewDoctorPage />}
              />

              <Route
                path={DASHBOARD_ADMIN_STATISTIC_2FA}
                element={<Statistic2FAPage />}
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
              <Route
                path={AUTH_EMAIL_2FA_VERIFY_PAGE}
                element={<Account2FAVerifyPage />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);
