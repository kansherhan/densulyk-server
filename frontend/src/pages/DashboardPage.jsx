import { useQuery } from "@tanstack/react-query";

import UserService from "../services/user.service.js";
import { ROLES } from "../constants/roles.js";

export function DashboardPage() {
  const { isLoading, data } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => UserService.getCurrentUserInfo(),
    retry: false,
  });

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
      </div>
    </div>
  );
}
