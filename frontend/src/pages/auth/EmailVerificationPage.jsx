import { TextInput } from "../../components/ui/TextInput.jsx";
import { Button } from "../../components/ui/Button.jsx";
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
    onSubmit: async () => await refetch(),
  });

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["auth-email-verify"],
    queryFn: () => AuthService.emailVerify(token.userID, formik.values.code),
    enabled: false,
    retry: false,
    staleTime: Infinity,
  });

  return (
    <div className="auth-page">
      <form className="form" onSubmit={formik.handleSubmit}>
        <h1 className="title">Проверьте почту</h1>

        <p className="description">введите одноразовый код</p>

        {data === undefined && (
          <>
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
          </>
        )}

        {data && (
          <div className="width:100%">
            <p className="margin-bottom:10 text-align:center f:#d12323">
              Запомните код! Восстановить его невозможно!
            </p>

            <TextInput
              type="text"
              placeholder="Код 2FA"
              defaultValue={data.code2FA}
              readonly={true}
            />

            <Button
              className="submit-button"
              label="Открыть кабинет"
              onClick={() => {
                dispatch(emailVerify());
                navigate(DASHBOARD_PAGE);
              }}
            />
          </div>
        )}
      </form>
    </div>
  );
}
