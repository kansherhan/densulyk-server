import http from "../http.js";
import { getResponseData } from "../helper.js";

export class AdminService {
  async createNewDoctor(data) {
    return await http.post("/doctors/create-doctor", data);
  }

  async getAllAppointments() {
    return getResponseData(await http.get("/doctors/get-all-appointments"));
  }

  async getAllDiagnostics() {
    return getResponseData(
      await http.get("/patients/get-admin-patient-all-diagnostic")
    );
  }
}

export default new AdminService();
