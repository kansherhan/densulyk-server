import http from "../http.js";
import { getResponseData } from "../helper.js";

class DoctorService {
  async getAllDoctorList() {
    return getResponseData(await http.get("/doctors/all-doctors"));
  }

  async getAllDoctorAppointments() {
    return getResponseData(
      await http.get("/doctors/get-doctor-patient-appointments")
    );
  }
}

export default new DoctorService();
