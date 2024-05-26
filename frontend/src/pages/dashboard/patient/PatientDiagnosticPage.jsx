import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { InfoPanel } from "../../../components/panels/InfoPanel.jsx";
import { LoadingPanel } from "../../../components/panels/LoadingPanel.jsx";
import PatientService from "../../../services/patient.service.js";

export function PatientDiagnosticPage() {
  const { diagnosticID } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["patient-diagnostic", diagnosticID],
    queryFn: () => PatientService.getDiagnosticByID(diagnosticID),
    retry: false,
  });

  if (isLoading) {
    return <LoadingPanel />;
  }

  return (
    <div className="patient-diagnostic-page">
      <div className="container">
        <InfoPanel
          title={"АНАЛИЗ"}
          items={[
            {
              label: "Анализ",
              value: data.diagnosisName,
            },
            {
              label: "Статус",
              value: data.completed ? "получен" : "не получен",
            },
            {
              label: "Рекомендаций",
              value: data.recommendation,
            },
            {
              label: "Пациент",
              value: `${data.user.firstName} ${data.user.lastName}`,
            },
            {
              label: "Врач",
              value: `${data.doctor.firstName} ${data.doctor.lastName}`,
            },
            {
              label: "Посмотреть",
              value: (
                <a href={"/" + data.documentUrl} className="color:inherit">
                  Открыть
                </a>
              ),
            },
            {
              label: "Назначили",
              value: moment(data.updatedAt).format("YYYY-MM-DD HH:mm"),
            },
          ]}
        />
      </div>
    </div>
  );
}
