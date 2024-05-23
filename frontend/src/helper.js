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

export function isSuccessText(success) {
  return success ? "вход" : "попытка";
}

export function createFormDataFromObject(data) {
  const formData = new FormData();

  Object.keys(data).forEach((key) => formData.append(key, data[key]));

  return formData;
}

export function createHeaderBackPage(title, url) {
  return { title, url };
}

export function createDashboardHeaderBackPage() {
  return createHeaderBackPage("Личный кабинет", DASHBOARD_PAGE);
}
