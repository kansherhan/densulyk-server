import http from "../http.js";
import { getResponseData } from "../helper.js";

class AuthService {
  async login(data) {
    return getResponseData(await http.post("/auth/login", data));
  }

  async registration(data) {
    return getResponseData(await http.post("/auth/registration", data));
  }

  async emailVerify(userID, code) {
    return getResponseData(
      await http.post("/auth/email-verify", {
        userID,
        code,
      })
    );
  }
}

export default new AuthService();
