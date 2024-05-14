import moment from "moment";
import { useQuery } from "@tanstack/react-query";

import { InfoPanel } from "../../components/InfoPanel.jsx";
import UserService from "../../services/user.service.js";

export function UserInfo() {
  const { isLoading, data } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => UserService.getCurrentUserInfo(),
    retry: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <div className="user-info-page">
      <div className="container">
        <InfoPanel
          title={"Данные о пользователе"}
          items={[
            {
              label: "Адресс",
              value: data.patient.address,
            },
            {
              label: "Номер",
              value: data.patient.phone,
            },
            {
              label: "Пол",
              value: !data.patient.gender ? "Мужкой" : "Женский",
            },
            {
              label: "Рост",
              value: data.patient.height,
            },
            {
              label: "Вес",
              value: data.patient.whole,
            },
            {
              label: "Данные обновились",
              value: moment(data.patient.updatedAt).format(
                "HH:mm:ss DD.MM.YYYY"
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
