import moment from "moment";
import { useQuery } from "@tanstack/react-query";

import PatientService from "../../../services/patient.service.js";
import { LoadingPanel } from "../../../components/panels/LoadingPanel.jsx";
import { AppointmentCard } from "../../../components/AppointmentCard.jsx";
import { SpacePanel } from "../../../components/panels/SpacePanel.jsx";

export function PatientAppointmentsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["patient-appointments"],
    queryFn: () => PatientService.getAllAppointments(),
    retry: false,
  });

  if (isLoading) {
    return <LoadingPanel />;
  }

  return (
    <div className="patient-appointments">
      <div className="container">
        <h2 className="f:32 margin-bottom:45 text-align:center">
          Ваши премы к врачу
        </h2>

        {data.length ? (
          <div className="items">
            {data
              .sort((a, b) => b.id - a.id)
              .filter(
                (value) =>
                  !value.isMeeted &&
                  moment().add(1, "day").toDate() > moment(value.date).toDate()
              )
              .map((item) => (
                <div key={item.id} className="margin-bottom:20">
                  <AppointmentCard
                    data={item}
                    doctor={item.doctor}
                    patient={null}
                  />
                </div>
              ))}
          </div>
        ) : (
          <SpacePanel text="У вас нет приемов к врачу" />
        )}
      </div>
    </div>
  );
}
