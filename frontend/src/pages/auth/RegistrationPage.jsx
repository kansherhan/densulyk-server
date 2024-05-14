import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import {
  AUTH_EMAIL_VERIFICATION_PAGE,
  AUTH_LOGIN_PAGE,
} from "../../constants/pages.js";
import AuthService from "../../services/auth.service.js";
import { register } from "../../store/slices/auth.slice.js";
import { TextInput } from "../../components/TextInput.jsx";
import { Button } from "../../components/Button.jsx";

export function RegistrationPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().min(2).max(30).required(),
      lastName: Yup.string().min(2).max(30).required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).max(255).required(),
    }),
    onSubmit: async () => {
      const { data } = await refetch();

      dispatch(register(data));

      navigate(AUTH_EMAIL_VERIFICATION_PAGE);
    },
  });

  const { isLoading, refetch } = useQuery({
    queryKey: ["auth-register"],
    queryFn: () => AuthService.registration(formik.values),
    enabled: false,
    retry: false,
  });

  return (
    <div className="auth-page">
      <form onSubmit={formik.handleSubmit} className="form">
        <h1 className="title">Регистрация</h1>

        <p className="description">
          мы сохраняем полную конфеденциальность ваших <br /> даннных
        </p>

        <TextInput
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Имя"
          inputTouched={formik.touched.firstName}
          errorText={formik.errors.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />

        <TextInput
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Фамилия"
          inputTouched={formik.touched.lastName}
          errorText={formik.errors.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />

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
          label="Зарегистрироваться"
          loading={isLoading}
        />

        <p className="link">
          <span>Есть аккаунт? </span>
          <Link to={AUTH_LOGIN_PAGE}>Авторизоваться</Link>
        </p>
      </form>
    </div>
  );
}
