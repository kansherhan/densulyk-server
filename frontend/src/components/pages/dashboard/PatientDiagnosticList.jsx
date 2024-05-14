import { useQuery } from "@tanstack/react-query";

import PatientService from "../../../services/patient.service.js";

export function PatientDiagnosticList() {
  const { isLoading, data } = useQuery({
    queryKey: ["patient-diagnostic-list"],
    queryFn: () => PatientService.getAllDiagnostics(),
    retry: false,
  });

  if (isLoading) {
    return <p>Patient diagnostic loading...</p>;
  }

  return (
    <div className="patient-diagnostic-list">
      <h3>Диагностики пациента:</h3>

      <div className="lists">
        {data.length ? (
          data.map((diagnostic) => (
            <div className="item" key={diagnostic.id}>
              <p>
                Doctor: {diagnostic.doctor.firstName}{" "}
                {diagnostic.doctor.lastName} |{" "}
                {diagnostic.doctor.doctor.speciality}
              </p>
              <p>Диагноз: {diagnostic.diagnosis_name}</p>
              <p>Диагноз: {diagnostic.recommendation}</p>
              <p>Диагноз: {diagnostic.updatedAt}</p>
            </div>
          ))
        ) : (
          <>У вас нет диагностиков</>
        )}
      </div>
    </div>
  );
}
