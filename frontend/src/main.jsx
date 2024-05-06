import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./assets/scss/index.scss";

import {
  AUTH_EMAIL_VERIFICATION_PAGE,
  AUTH_LOGIN_PAGE,
  AUTH_REGISTRATION_PAGE,
  INDEX_PAGE,
} from "./constants/pages.js";

import { AppLayout } from "./layouts/AppLayout.jsx";

import { IndexPage } from "./pages/IndexPage.jsx";
import { LoginPage } from "./pages/auth/LoginPage.jsx";
import { RegistrationPage } from "./pages/auth/RegistrationPage.jsx";
import { EmailVerificationPage } from "./pages/auth/EmailVerificationPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}>
        <Route index path={INDEX_PAGE} element={<IndexPage />} />

        <Route path={AUTH_LOGIN_PAGE} element={<LoginPage />} />
        <Route path={AUTH_REGISTRATION_PAGE} element={<RegistrationPage />} />
        <Route
          path={AUTH_EMAIL_VERIFICATION_PAGE}
          element={<EmailVerificationPage />}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
