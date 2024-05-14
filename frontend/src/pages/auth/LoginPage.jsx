import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import {
  AUTH_EMAIL_VERIFICATION_PAGE,
  AUTH_REGISTRATION_PAGE,
  DASHBOARD_PAGE,
} from "../../constants/pages.js";
import { TextInput } from "../../components/TextInput.jsx";
import { Button } from "../../components/Button.jsx";
import AuthService from "../../services/auth.service.js";
import { login } from "../../store/slices/auth.slice.js";
import { AxiosError } from "axios";
import { HTTP_STATUS_EMAIL_NOT_VERIFY } from "../../constants/http-status.js";

export function LoginPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).max(255).required(),
    }),
    onSubmit: async () => {
      const { data, error, isError } = await refetch();

      if (
        error instanceof AxiosError &&
        error.response.status === HTTP_STATUS_EMAIL_NOT_VERIFY
      ) {
        dispatch(login(data));

        navigate(AUTH_EMAIL_VERIFICATION_PAGE);
      } else if (!isError) {
        dispatch(login(data));

        navigate(DASHBOARD_PAGE);
      }
    },
  });

  const { isLoading, refetch } = useQuery({
    queryKey: ["auth-login"],
    queryFn: () => AuthService.login(formik.values),
    enabled: false,
    retry: false,
  });

  return (
    <div className="auth-page">
      <form onSubmit={formik.handleSubmit} className="form">
        <h1 className="title">Войти</h1>

        <p className="description">
          мы сохраняем полную конфеденциальность ваших <br /> даннных
        </p>

        <TextInput
          id="email"
          name="email"
          type="email"
          placeholder="Почта"
          inputTouched={formik.touched.email}
          errorText={formik.errors.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />

        <TextInput
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          inputTouched={formik.touched.password}
          errorText={formik.errors.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />

        <Button
          className="submit-button"
          type="submit"
          label="Войти"
          loading={isLoading}
        />

        <p className="link">
          <span>Нет аккаунта? </span>
          <Link to={AUTH_REGISTRATION_PAGE}>Зарегестрируйся</Link>
        </p>
      </form>
    </div>
  );
}
