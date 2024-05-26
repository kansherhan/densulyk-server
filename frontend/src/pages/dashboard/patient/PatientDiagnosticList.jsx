import DataTable from "react-data-table-component";
import moment from "moment";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import PatientService from "../../../services/patient.service.js";
import { LoadingPanel } from "../../../components/panels/LoadingPanel.jsx";
import { DASHBOARD_PATIENT_DIAGNOSTICS } from "../../../constants/pages.js";

export function PatientDiagnosticList() {
  const { isLoading, data } = useQuery({
    queryKey: ["patient-diagnostic-list"],
    queryFn: () => PatientService.getAllDiagnostics(),
    retry: false,
  });

  const columnsTable = [
    {
      name: "№",
      selector: (row) => row.id,
      width: "100px",
      sortable: true,
    },
    {
      name: "Доктор",
      selector: (row) => `${row.doctor.firstName} ${row.doctor.lastName}`,
      sortable: true,
    },
    {
      name: "Анализ",
      selector: (row) => row.diagnosisName,
      sortable: true,
    },
    {
      name: "Статус",
      selector: (row) => (!row.completed ? "получен" : "не получен"),
      sortable: true,
    },
    {
      name: "Создан",
      selector: (row) => moment(row.updatedAt).format("YYYY-MM-DD HH:mm"),
      sortable: true,
    },
    {
      name: "Посмотреть",
      selector: (row) => (
        <Link
          to={`${DASHBOARD_PATIENT_DIAGNOSTICS}/${row.id}`}
          className="color:inherit"
        >
          Открыть
        </Link>
      ),
      sortable: true,
    },
  ];

  if (isLoading) {
    return <LoadingPanel />;
  }

  return (
    <div className="patient-diagnostic-list">
      <div className="container">
        <h2 className="f:32 margin-bottom:45 text-align:center">
          Диагностики пациента
        </h2>

        <div className="lists">
          {data.length ? (
            <DataTable
              className="datatable-fix"
              columns={columnsTable}
              data={data}
            />
          ) : (
            <>У вас нет диагностиков</>
          )}
        </div>
      </div>
    </div>
  );
}
