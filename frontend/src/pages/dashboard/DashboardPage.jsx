import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import UserService from "../../services/user.service.js";
import { ROLES } from "../../constants/roles.js";
import {
  addBackPage,
  clearBackPage,
} from "../../store/slices/settings.slice.js";
import { NAVIGATIONS } from "../../constants/dashboard.js";
import { LoadingPanel } from "../../components/panels/LoadingPanel.jsx";
import { createDashboardHeaderBackPage } from "../../helper.js";

export function DashboardPage() {
  const dispatch = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => UserService.getCurrentUserInfo(),
    retry: false,
  });

  useEffect(() => {
    dispatch(clearBackPage());
  }, []);

  if (isLoading) {
    return <LoadingPanel />;
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
          {NAVIGATIONS[data.roleID].map((button) => (
            <Link
              key={button.link}
              to={button.link}
              onClick={() =>
                dispatch(addBackPage(createDashboardHeaderBackPage()))
              }
            >
              {button.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
