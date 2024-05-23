import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { useQuery } from "@tanstack/react-query";

import AuthService from "../../services/auth.service.js";
import { TextInput } from "../../components/ui/TextInput.jsx";
import { Button } from "../../components/ui/Button.jsx";

export function Account2FAVerifyPage() {
  const token = useSelector((state) => state.auth.token);

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.number().required(),
    }),
    onSubmit: async () => {},
  });

  const { isLoading } = useQuery({
    queryKey: ["auth-account-2fa-verify"],
    queryFn: () => AuthService.emailVerify(token.userID, formik.values.code),
    enabled: false,
    retry: false,
    staleTime: Infinity,
  });

  return (
    <div className="auth-page">
      <form className="form" onSubmit={formik.handleSubmit}>
        <h1 className="title">
          Проверка ключа от
          <br /> аккаунта для 2FA
        </h1>

        <p className="description">введите код</p>

        <TextInput
          id="code"
          name="code"
          type="number"
          placeholder="Код для подтверждения"
          inputTouched={formik.touched.code}
          errorText={formik.errors.code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.code}
        />

        <Button
          className="submit-button"
          type="submit"
          label="Подтвердить"
          loading={isLoading}
        />
      </form>
    </div>
  );
}
