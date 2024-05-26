import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useQuery } from "@tanstack/react-query";

import AuthService from "../../services/auth.service.js";
import { TextInput } from "../../components/ui/TextInput.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_PAGE } from "../../constants/pages.js";
import { login2FAVerify } from "../../store/slices/auth.slice.js";

export function Account2FAVerifyPage() {
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().min(1).required(),
    }),
    onSubmit: async () => {
      const { isError } = await refetch();

      if (!isError) {
        dispatch(login2FAVerify());
        navigate(DASHBOARD_PAGE);
      }
    },
  });

  const { isLoading, refetch } = useQuery({
    queryKey: ["auth-account-2fa-verify"],
    queryFn: () =>
      AuthService.account2FAVerify(token.userID, formik.values.code),
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
          type="text"
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
