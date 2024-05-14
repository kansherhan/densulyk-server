import { useQuery } from "@tanstack/react-query";

import {
  DASHBOARD_PATIENT_APPOINTMENT,
  DASHBOARD_PATIENT_SUBSCRIBE_APPOINTMENT,
  DASHBOARD_USER_INFO_PAGE,
} from "../../constants/pages.js";
import UserService from "../../services/user.service.js";
import { ROLES } from "../../constants/roles.js";
import { Link } from "react-router-dom";

export function DashboardPage() {
  const { isLoading, data } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => UserService.getCurrentUserInfo(),
    retry: false,
  });

  const navigationButtons = [
    {
      link: DASHBOARD_USER_INFO_PAGE,
      text: "Личные данные",
    },
    {
      link: DASHBOARD_PATIENT_SUBSCRIBE_APPOINTMENT,
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
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="user-info">
          <div className="name">
            <h1 className="fullname">
              {data.firstName} {data.lastName}
            </h1>

            <h3 className="email">{data.email}</h3>
          </div>

          <div className="role">
            <span className="tag">{ROLES[data.roleID - 1]}</span>
          </div>
        </div>

        <div className="navigation-buttons">
          {navigationButtons.map((button) => (
            <Link key={button.link} to={button.link}>
              {button.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
