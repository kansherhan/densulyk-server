import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import DatePicker from "react-date-picker";
import Toggle from "react-toggle";
import { TbManFilled } from "react-icons/tb";
import { TbWomanFilled } from "react-icons/tb";

import {
  AUTH_EMAIL_VERIFICATION_PAGE,
  AUTH_LOGIN_PAGE,
} from "../../constants/pages.js";
import AuthService from "../../services/auth.service.js";
import { register } from "../../store/slices/auth.slice.js";
import { TextInput } from "../../components/ui/TextInput.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { genderText } from "../../helper.js";

export function RegistrationPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      inn: "",
      birthdate: new Date(),
      gender: false,
      address: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().min(2).max(30).required(),
      lastName: Yup.string().min(2).max(30).required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).max(255).required(),
      inn: Yup.string().min(12).max(12).required(),
      birthdate: Yup.date().required(),
      gender: Yup.bool().required(),
      address: Yup.string().required(),
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

        <TextInput
          id="inn"
          name="inn"
          type="text"
          placeholder="ИНН"
          inputTouched={formik.touched.inn}
          errorText={formik.errors.inn}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.inn}
        />

        <DatePicker
          id="birthdate"
          name="birthdate"
          onChange={(value) => formik.setFieldValue("birthdate", value)}
          onBlur={formik.handleBlur}
          value={formik.values.birthdate}
        />

        <div className="input-with-text">
          <Toggle
            id="gender"
            name="gender"
            icons={{
              checked: <TbWomanFilled size={21} color={"#fff"} />,
              unchecked: <TbManFilled size={21} color={"#fff"} />,
            }}
            defaultChecked={formik.values.gender}
            onChange={(e) => formik.setFieldValue("gender", e.target.checked)}
          />

          <span className="text">{genderText(formik.values.gender)}</span>
        </div>

        <TextInput
          id="address"
          name="address"
          type="text"
          placeholder="Адрес проживания"
          inputTouched={formik.touched.address}
          errorText={formik.errors.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
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
