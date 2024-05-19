import DatePicker from "react-date-picker";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";

import { TextInput } from "../../../components/TextInput.jsx";
import { Button } from "../../../components/Button.jsx";
import PatientService from "../../../services/patient.service.js";
import { DoctorListSelect } from "../../../components/DoctorListSelect.jsx";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_PATIENT_APPOINTMENT } from "../../../constants/pages.js";
import * as Yup from "yup";

export function PatientSubscribeAppointment() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      doctorID: null,
      date: new Date(),
      userComment: "",
    },
    validationSchema: Yup.object({
      doctorID: Yup.object().nonNullable().required(),
      date: Yup.date().required(),
      userComment: Yup.string().required(),
    }),
    onSubmit: async () => {
      const { isError } = await refetch();

      if (!isError) {
        alert("Вы записались к врачу");

        navigate(DASHBOARD_PATIENT_APPOINTMENT);
      }
    },
  });

  const { isLoading, refetch } = useQuery({
    queryKey: ["patient-subscribe-appointment"],
    queryFn: () =>
      PatientService.subscribeAppointment({
        doctorID: formik.values.doctorID.value,
        date: formik.values.date,
        userComment: formik.values.userComment,
      }),
    enabled: false,
    retry: false,
  });

  return (
    <div className="patient-subscribe-appointment">
      <div className="container">
        <form onSubmit={formik.handleSubmit} className="form">
          <h1 className="title margin-bottom:45">
            Записаться на запись к врачу
          </h1>

          <div className="margin-bottom:15">
            <DoctorListSelect
              id="doctorID"
              name="doctorID"
              onChange={(newValue) =>
                formik.setFieldValue("doctorID", newValue)
              }
              value={formik.values.doctorID}
              onBlur={formik.handleBlur}
            />
          </div>

          <DatePicker
            id="date"
            name="date"
            onChange={(value) => formik.setFieldValue("date", value)}
            onBlur={formik.handleBlur}
            value={formik.values.date}
          />

          <TextInput
            id="userComment"
            name="userComment"
            type="text"
            placeholder="Комментарий"
            inputTouched={formik.touched.userComment}
            errorText={formik.errors.userComment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userComment}
          />

          <Button
            className="submit-button margin-top:35"
            type="submit"
            label="Записаться"
            loading={isLoading}
          />
        </form>
      </div>
    </div>
  );
}
