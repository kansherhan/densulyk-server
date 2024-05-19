import { DASHBOARD_PAGE } from "./constants/pages.js";

export function getResponseData(response) {
  return response.data;
}

export function genderText(gender) {
  return !gender ? "Мужкой" : "Женский";
}

export function meetedText(meeted) {
  return !meeted ? "не выполнен" : "выполнен";
}

export function createHeaderBackPage(title, url) {
  return { title, url };
}

export function createDashboardHeaderBackPage() {
  return createHeaderBackPage("Личный кабинет", DASHBOARD_PAGE);
}
