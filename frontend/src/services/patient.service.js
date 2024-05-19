import { getResponseData } from "../helper.js";
import http from "../http.js";

class PatientService {
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
}

export default new PatientService();
