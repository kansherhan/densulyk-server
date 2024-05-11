import http from "../http.js";
import { getResponseData } from "../helper.js";

class UserService {
  async getCurrentUserInfo() {
    return getResponseData(http.get("/users/me"));
  }
}

export default new UserService();
