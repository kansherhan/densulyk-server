import moment from "moment";
import { useQuery } from "@tanstack/react-query";

import { InfoPanel } from "../../components/panels/InfoPanel.jsx";
import UserService from "../../services/user.service.js";
import { decodeText, genderText } from "../../helper.js";
import { ROLES } from "../../constants/roles.js";

export function UserInfo() {
  const { isLoading, data } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => UserService.getCurrentUserInfo(),
    retry: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-info-page">
      <div className="container">
        <InfoPanel
          title={"Данные о пользователе"}
          items={[
            {
              label: "ИИН",
              value: decodeText(data.inn),
            },
            {
              label: "Имя",
              value: data.firstName,
            },
            {
              label: "Фамилия",
              value: data.lastName,
            },
            {
              label: "Пол",
              value: genderText(data.gender),
            },
            {
              label: "Роль",
              value: ROLES[data.roleID - 1],
            },
            {
              label: "Специальность",
              value: data.doctor?.speciality,
              hidden: data.roleID !== 2,
            },
            {
              label: "Дата рождения",
              value: moment(data.birthdate).format("DD.MM.YYYY"),
            },
            {
              label: "Адрес проживания",
              value: data.address,
            },
          ]}
        />
      </div>
    </div>
  );
}
