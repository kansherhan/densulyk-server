import http from "../http.js";
import { getResponseData } from "../helper.js";

export class TasksService {
  async getAllAuthReports() {
    return getResponseData(await http.get("/tasks/week-statistic-auth-report"));
  }

  async getAllUserAuthHistory() {
    return getResponseData(await http.get("/tasks/all-auth-history-day"));
  }
}

export default new TasksService();
