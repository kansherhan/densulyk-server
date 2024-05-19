import { useQuery } from "@tanstack/react-query";
import Select from "react-select";

import DoctorService from "../services/doctor.service.js";

export function DoctorListSelect({ ...props }) {
  const { isLoading, data } = useQuery({
    queryKey: ["doctor-list"],
    queryFn: () => DoctorService.getAllDoctorList(),
    retry: false,
  });

  let options = [];

  if (!isLoading) {
    options = data.map((item) => ({
      label: `${item.firstName} ${item.lastName} | ${item.doctor.speciality}`,
      value: item.id,
    }));
  }

  return (
    <Select
      className="input-select"
      placeholder="Выберите доктора"
      options={options}
      {...props}
    />
  );
}
