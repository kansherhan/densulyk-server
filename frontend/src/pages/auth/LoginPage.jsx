import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import {
  AUTH_REGISTRATION_PAGE,
  DASHBOARD_PAGE,
} from "../../constants/pages.js";
import { TextInput } from "../../components/TextInput.jsx";
import { Button } from "../../components/Button.jsx";
import AuthService from "../../services/auth.service.js";
import { login } from "../../store/slices/auth.slice.js";

export function LoginPage() {
  const token = useSelector((state) => state.auth.token);
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
      const { data } = await refetch();

      dispatch(login(data));

      navigate(DASHBOARD_PAGE);
    },
  });

  const { isLoading, refetch } = useQuery({
    queryKey: ["auth-login"],
    queryFn: () => AuthService.login(formik.values),
    enabled: false,
    retry: false,
  });

  if (token !== null) {
    return <Navigate to={DASHBOARD_PAGE} />;
  }

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
