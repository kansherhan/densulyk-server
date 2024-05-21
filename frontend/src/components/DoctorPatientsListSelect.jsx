import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import DoctorService from "../services/doctor.service.js";

export function DoctorPatientsListSelect({ ...props }) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["doctor-all-patient-appointments"],
    queryFn: () => DoctorService.getAllDoctorAppointments(),
    retry: false,
    staleTime: Infinity,
  });

  let options = [];

  if (!isLoading) {
    const key = "id";

    const arrayUniqueByKey = [
      ...new Map(
        data.map((item) => item.user).map((item) => [item[key], item])
      ).values(),
    ];

    options = arrayUniqueByKey.map((user) => ({
      label: `${user.firstName} ${user.lastName} | ${user.inn}`,
      value: user.id,
    }));
  }

  return (
    <Select
      className="input-select margin-bottom:15"
      placeholder="Выберите пациента"
      options={options}
      {...props}
    />
  );
}
