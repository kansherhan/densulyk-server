import http from "../http.js";
import { getResponseData } from "../helper.js";

class DoctorService {
  async getAllDoctorList() {
    return getResponseData(await http.get("/doctors/all-doctors"));
  }
}

export default new DoctorService();
