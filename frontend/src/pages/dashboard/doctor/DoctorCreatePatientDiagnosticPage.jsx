import { useFormik } from "formik";
import { useQuery } from "@tanstack/react-query";
import * as Yup from "yup";

import { Button } from "../../../components/ui/Button.jsx";
import DoctorService from "../../../services/doctor.service.js";
import { TextInput } from "../../../components/ui/TextInput.jsx";
import { TextAreaInput } from "../../../components/ui/TextAreaInput.jsx";
import { DoctorPatientsListSelect } from "../../../components/DoctorPatientsListSelect.jsx";

export function DoctorCreatePatientDiagnosticPage() {
  const formik = useFormik({
    initialValues: {
      userID: null,
      recommendation: "",
      diagnosisName: "",
      file: null,
    },
    validationSchema: Yup.object({
      userID: Yup.mixed().nonNullable().required(),
      diagnosisName: Yup.string().min(3).required(),
      recommendation: Yup.string().min(3).required(),
      file: Yup.mixed().nonNullable().required(),
    }),
    onSubmit: async () => {
      const { isError } = await refetch();

      if (!isError) {
        alert("Анализ создан!");
      }
    },
  });

  const { isLoading, refetch } = useQuery({
    queryKey: ["doctor-create-patient-diagnostic"],
    queryFn: () =>
      DoctorService.createPatientDiagnostic({
        userID: formik.values.userID.value,
        recommendation: formik.values.recommendation,
        diagnosisName: formik.values.diagnosisName,
        file: formik.values.file,
      }),
    enabled: false,
    retry: false,
  });

  return (
    <div className="doctor-create-patient-diagnostic-page">
      <div className="container">
        <form className="form" onSubmit={formik.handleSubmit}>
          <h1 className="title margin-bottom:45">
            Составить анализ для пацинта на приеме
          </h1>

          <DoctorPatientsListSelect
            id="userID"
            name="userID"
            onChange={(newValue) => formik.setFieldValue("userID", newValue)}
            value={formik.values.userID}
            onBlur={formik.handleBlur}
          />

          <TextInput
            id="diagnosisName"
            name="diagnosisName"
            type="text"
            placeholder="Диагноз"
            inputTouched={formik.touched.diagnosisName}
            errorText={formik.errors.diagnosisName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.diagnosisName}
          />

          <TextAreaInput
            rows={5}
            id="recommendation"
            name="recommendation"
            type="text"
            placeholder="Рекомендаций"
            inputTouched={formik.touched.recommendation}
            errorText={formik.errors.recommendation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.recommendation}
          />

          <input
            type="file"
            id="file"
            name="file"
            onChange={(e) => formik.setFieldValue("file", e.target.files[0])}
            onBlur={formik.handleBlur}
          />

          <Button
            className="submit-button margin-top:35"
            type="submit"
            label="Создать"
            loading={isLoading}
          />
        </form>
      </div>
    </div>
  );
}
