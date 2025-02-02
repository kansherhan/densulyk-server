import { getResponseData } from "../helper.js";
import http from "../http.js";

class PatientService {
  async getDiagnosticByID(id) {
    return getResponseData(await http.get(`/patients/diagnostics/${id}`));
  }

  async getAllDiagnostics() {
    return getResponseData(await http.get("/patients/patient-all-diagnostic"));
  }

  async subscribeAppointment(data) {
    return getResponseData(
      await http.post("/patients/create-patient-appointment", data)
    );
  }

  async getAllAppointments() {
    return getResponseData(await http.get("/patients/patient-all-appointment"));
  }

  async getPatientDiagnostic() {
    return getResponseData(await http.get("/"));
  }

  async togglePatientAppointmentMeet(appointmentID) {
    return getResponseData(
      await http.post(
        `/patients/toggle-patient-appointment-meet/${appointmentID}`
      )
    );
  }
}

export default new PatientService();
