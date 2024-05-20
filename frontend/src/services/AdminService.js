import http from "../http.js";

export class AdminService {
  async createNewDoctor(data) {
    return await http.post("/doctors/create-doctor", data);
  }
}

export default new AdminService();
