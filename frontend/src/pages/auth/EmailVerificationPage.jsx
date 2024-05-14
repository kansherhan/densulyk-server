import { TextInput } from "../../components/TextInput.jsx";
import { Button } from "../../components/Button.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import AuthService from "../../services/auth.service.js";
import { useDispatch, useSelector } from "react-redux";
import { emailVerify } from "../../store/slices/auth.slice.js";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_PAGE } from "../../constants/pages.js";

export function EmailVerificationPage() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.number().required(),
    }),
    onSubmit: async () => {
      const { isError } = await refetch();

      if (!isError) {
        dispatch(emailVerify());
        navigate(DASHBOARD_PAGE);
      }
    },
  });

  const { isLoading, refetch } = useQuery({
    queryKey: ["auth-email-verify"],
    queryFn: () => AuthService.emailVerify(token.userID, formik.values.code),
    enabled: false,
    retry: false,
  });

  return (
    <div className="auth-page">
      <form className="form" onSubmit={formik.handleSubmit}>
        <h1 className="title">Проверьте почту</h1>

        <p className="description">введите одноразовый код</p>

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
