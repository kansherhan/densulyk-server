import DataTable from "react-data-table-component";
import moment from "moment";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { LoadingPanel } from "../../../components/panels/LoadingPanel.jsx";
import { DASHBOARD_PATIENT_DIAGNOSTICS } from "../../../constants/pages.js";
import DoctorService from "../../../services/doctor.service.js";

export function DoctorPatientDiagnosticList() {
  const { isLoading, data } = useQuery({
    queryKey: ["doctor-patient-diagnostic-list"],
    queryFn: () => DoctorService.getAllDiagnostics(),
    retry: false,
    staleTime: Infinity,
  });

  const columnsTable = [
    {
      name: "№",
      selector: (row) => row.id,
      width: "100px",
      sortable: true,
    },
    {
      name: "Пациент",
      selector: (row) => `${row.user.firstName} ${row.user.lastName}`,
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
          Диагностики пациентов
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
