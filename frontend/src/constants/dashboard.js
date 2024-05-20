import {
  DASHBOARD_ADMIN_ALL_APPOINTMENT,
  DASHBOARD_ADMIN_ALL_DIAGNOSTICS,
  DASHBOARD_ADMIN_CREATE_NEW_DOCTOR,
  DASHBOARD_ADMIN_STATISTIC_2FA,
  DASHBOARD_DOCTOR_ALL_APPOINTMENT,
  DASHBOARD_DOCTOR_ALL_DIAGNOSTIC,
  DASHBOARD_DOCTOR_CREATE_PATIENT_DIAGNOSTIC,
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
  [DOCTOR]: [
    {
      link: DASHBOARD_USER_INFO_PAGE,
      text: "Личные данные",
    },
    {
      link: DASHBOARD_DOCTOR_ALL_APPOINTMENT,
      text: "Список пациентов на прием к Вам",
    },
    {
      link: DASHBOARD_DOCTOR_ALL_DIAGNOSTIC,
      text: "Список всех ваших анализов пациентов",
    },
    {
      link: DASHBOARD_DOCTOR_CREATE_PATIENT_DIAGNOSTIC,
      text: "Составить анализ для пацинта на приеме",
    },
  ],
  [ADMIN]: [
    {
      link: DASHBOARD_USER_INFO_PAGE,
      text: "Личные данные",
    },
    {
      link: DASHBOARD_ADMIN_STATISTIC_2FA,
      text: "Статистика эффективности 2FA с блокчейном",
    },
    {
      link: DASHBOARD_ADMIN_CREATE_NEW_DOCTOR,
      text: "Назначить нового доктора",
    },
    {
      link: DASHBOARD_ADMIN_ALL_DIAGNOSTICS,
      text: "Список всех анализов от врачей",
    },
    {
      link: DASHBOARD_ADMIN_ALL_APPOINTMENT,
      text: "Список всех приемов к врачам",
    },
  ],
};
