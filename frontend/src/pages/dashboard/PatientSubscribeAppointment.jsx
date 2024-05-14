import DatePicker from "react-date-picker";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";

import { TextInput } from "../../components/TextInput.jsx";
import { Button } from "../../components/Button.jsx";
import PatientService from "../../services/patient.service.js";

export function PatientSubscribeAppointment() {
  const formik = useFormik({
    initialValues: {
      doctorID: -1,
      date: new Date(),
      user_comment: "",
    },
    onSubmit: async () => {
      const { data } = await refetch();
      console.log("daf", data);
    },
  });

  const { isLoading, refetch } = useQuery({
    queryKey: ["patient-subscribe-appointment"],
    queryFn: () => PatientService.subscribeAppointment(formik.values),
    enabled: false,
    retry: false,
  });

  return (
    <div className="patient-subscribe-appointment">
      <div className="container">
        <form onSubmit={formik.handleSubmit} className="form">
          <h1 className="title">Записаться на запись к врачу</h1>

          <TextInput
            id="user_comment"
            name="user_comment"
            type="text"
            placeholder="Комментарий"
            inputTouched={formik.touched.user_comment}
            errorText={formik.errors.user_comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.user_comment}
          />

          <DatePicker
            onChange={(value) => formik.setFieldValue("date", value)}
            onBlur={formik.handleBlur}
            value={formik.values.date}
          />

          <Button
            className="submit-button"
            type="submit"
            label="Войти"
            loading={isLoading}
          />
        </form>
      </div>
    </div>
  );
}
