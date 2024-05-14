import moment from "moment";

export function PatientInfo({ patientInfo }) {
  return (
    <div className="patient-info">
      <p>Адресс: {patientInfo.address}</p>
      <p>Phone: {patientInfo.phone}</p>
      <p>Gender: {patientInfo.gender}</p>
      <p>Height: {patientInfo.height}</p>
      <p>Whole: {patientInfo.whole}</p>
      <p>
        Updated: {moment(patientInfo.updatedAt).format("HH:mm:ss DD.MM.YYYY")}
      </p>
    </div>
  );
}
