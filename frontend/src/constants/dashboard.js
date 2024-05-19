import {
  DASHBOARD_PATIENT_APPOINTMENT,
  DASHBOARD_PATIENT_DIAGNOSTICS,
  DASHBOARD_PATIENT_SUBSCRIBE_APPOINTMENT,
  DASHBOARD_USER_INFO_PAGE,
} from "./pages.js";

import { PATIENT, DOCTOR, ADMIN } from "./roles.js";

export const NAVIGATIONS = {
  [PATIENT]: [
    {
      link: DASHBOARD_USER_INFO_PAGE,
      text: "Личные данные",
    },
    {
      link: DASHBOARD_PATIENT_DIAGNOSTICS,
      text: "АНАЛИЗЫ",
    },
    {
      link: DASHBOARD_PATIENT_APPOINTMENT,
      text: "пРИЕМЫ",
    },
    {
      link: DASHBOARD_PATIENT_SUBSCRIBE_APPOINTMENT,
      text: "Записаться на Прием",
    },
  ],
  [DOCTOR]: [],
  [ADMIN]: [],
};
