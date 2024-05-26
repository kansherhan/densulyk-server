import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";

import { LoadingPanel } from "../../../components/panels/LoadingPanel.jsx";
import { TextInput } from "../../../components/ui/TextInput.jsx";
import { genderText, meetedText } from "../../../helper.js";
import PatientService from "../../../services/patient.service.js";
import AdminService from "../../../services/admin.service.js";

export function AdminAllPatientAppointmentsPage() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-all-patient-appointments"],
    queryFn: () => AdminService.getAllAppointments(),
    retry: false,
    staleTime: Infinity,
  });

  if (isLoading) {
    return <LoadingPanel />;
  }

  const columnsTable = [
    {
      name: "№",
      selector: (row) => row.id,
      width: "75px",
      sortable: true,
    },
    {
      name: "ФИО",
      selector: (row) => `${row.user.firstName} ${row.user.lastName}`,
      sortable: true,
    },
    {
      name: "ИИН",
      selector: (row) => row.user.inn,
      sortable: true,
    },
    {
      name: "Поль",
      selector: (row) => genderText(row.user.gender),
      sortable: true,
    },
    {
      name: "Доктор",
      selector: (row) => `${row.doctor.firstName} ${row.doctor.lastName}`,
      sortable: true,
    },
    {
      name: "Статус",
      selector: (row) => meetedText(row.isMeeted),
      sortable: true,
    },
    {
      name: "Дата",
      selector: (row) => moment(row.date).format("YYYY-MM-DD HH:mm:ss"),
      sortable: true,
    },
    {
      name: "",
      selector: (row) => (
        <span
          className="tag cursor:pointer"
          onClick={async () => {
            await PatientService.togglePatientAppointmentMeet(row.id);
            await refetch();
          }}
        >
          Выполнен
        </span>
      ),
    },
  ];

  return (
    <div className="doctor-all-patient-appointments-page">
      <div className="container">
        <div className="display:flex">
          <TextInput placeholder="Поиск..." />
        </div>

        <DataTable
          className="datatable-fix"
          columns={columnsTable}
          data={data}
        />
      </div>
    </div>
  );
}
