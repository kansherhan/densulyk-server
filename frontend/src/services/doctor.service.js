import http from "../http.js";
import { createFormDataFromObject, getResponseData } from "../helper.js";

class DoctorService {
  async getAllDoctorList() {
    return getResponseData(await http.get("/doctors/all-doctors"));
  }

  async getAllDoctorAppointments() {
    return getResponseData(
      await http.get("/doctors/get-doctor-patient-appointments")
    );
  }

  async getAllDiagnostics() {
    return getResponseData(
      await http.get("/patients/get-doctor-patient-all-diagnostic")
    );
  }

  async createPatientDiagnostic(data) {
    console.log(data);
    const formData = createFormDataFromObject(data);

    return getResponseData(
      await http.post("/patients/create-diagnostic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  }
}

export default new DoctorService();
