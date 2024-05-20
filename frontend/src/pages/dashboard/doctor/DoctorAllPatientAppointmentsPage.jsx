import { useQuery } from "@tanstack/react-query";
import DoctorService from "../../../services/doctor.service.js";
import { LoadingPanel } from "../../../components/LoadingPanel.jsx";
import DataTable from "react-data-table-component";
import { TextInput } from "../../../components/TextInput.jsx";
import { genderText, meetedText } from "../../../helper.js";
import moment from "moment";
import PatientService from "../../../services/patient.service.js";

export function DoctorAllPatientAppointmentsPage() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["doctor-all-patient-appointments"],
    queryFn: () => DoctorService.getAllDoctorAppointments(),
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
          Изменить статус
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
