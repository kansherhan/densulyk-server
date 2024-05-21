import { useFormik } from "formik";
import * as Yup from "yup";

import { TextInput } from "../../../components/ui/TextInput.jsx";
import { useQuery } from "@tanstack/react-query";
import AdminService from "../../../services/admin.service.js";
import { Button } from "../../../components/ui/Button.jsx";

export function AdminCreateNewDoctorPage() {
  const formik = useFormik({
    initialValues: {
      email: "",
      speciality: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      speciality: Yup.string().min(1).required(),
    }),
    onSubmit: async () => {
      const { isError } = await refetch();

      if (!isError) {
        alert("Новый доктор создан и готов к работе!");
      }
    },
  });

  const { isLoading, refetch } = useQuery({
    queryKey: ["new-doctor-create"],
    queryFn: () => AdminService.createNewDoctor(formik.values),
    enabled: false,
    retry: false,
  });

  return (
    <div className="admin-create-new-doctor-page">
      <div className="container">
        <form className="form" onSubmit={formik.handleSubmit}>
          <h1 className="title margin-bottom:45">
            Назначит нового врача в мед.центр
          </h1>

          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="Почта нового доктора"
            inputTouched={formik.touched.email}
            errorText={formik.errors.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />

          <TextInput
            id="speciality"
            name="speciality"
            type="text"
            placeholder="Названия специальности"
            inputTouched={formik.touched.speciality}
            errorText={formik.errors.speciality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.speciality}
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
