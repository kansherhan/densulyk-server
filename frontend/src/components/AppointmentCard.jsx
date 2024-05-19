import moment from "moment";

import { meetedText } from "../helper.js";

export function AppointmentCard({
  data,
  doctor,
  patient,
  bottomComponent,
  ...props
}) {
  return (
    <div className="appointment-card" {...props}>
      <h3 className="font:heavy f:24 margin-bottom:15">#{data.id}</h3>

      {patient && (
        <p className="font:bold">
          ФИО пациента:{" "}
          <span className="font:medium">
            {patient.firstName} {patient.lastName}
          </span>
        </p>
      )}

      {doctor && (
        <p className="font:bold">
          ФИО доктора:{" "}
          <span className="font:medium">
            {doctor.firstName} {doctor.lastName}
          </span>
        </p>
      )}

      <p className="font:bold">
        Дата:{" "}
        <span className="font:medium">
          {moment(data.date).format("YYYY-MM-DD")}
        </span>
      </p>

      <p className="font:bold">
        Статус приема:{" "}
        <span className="font:medium">{meetedText(data.isMeeted)}</span>{" "}
      </p>

      <p className="font:bold">
        Заключение: <span className="font:medium"> {data.userComment}</span>{" "}
      </p>

      {bottomComponent && <bottomComponent />}
    </div>
  );
}
