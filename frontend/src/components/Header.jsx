import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { IoIosArrowBack } from "react-icons/io";

import {
  AUTH_LOGIN_PAGE,
  DASHBOARD_PAGE,
  INDEX_PAGE,
} from "../constants/pages.js";

import logoIcon from "../assets/svg/logo.svg";

import callIcon from "../assets/svg/header/call.svg";
import timeIcon from "../assets/svg/header/time.svg";
import locationIcon from "../assets/svg/header/location.svg";
import { logout } from "../store/slices/auth.slice.js";
import { backPage } from "../store/slices/settings.slice.js";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryClient = useQueryClient();

  const token = useSelector((state) => state.auth.token);
  const headersBackPage = useSelector(
    (state) => state.settings.headersBackPage
  );
  const dispatch = useDispatch();

  const navigationLinks = [
    {
      label: "Главная страница",
      url: "#",
    },
    {
      label: "О Нас",
      url: "#about",
    },
    {
      label: "Контакты",
      url: "#contacts",
    },
  ];

  const onExitAccount = (e) => {
    e.preventDefault();

    queryClient.clear();
    dispatch(logout());
  };

  const getLastBackPageItem = () => headersBackPage[headersBackPage.length - 1];

  return (
    <header className={"root-header " + (headersBackPage ? "back-page" : "")}>
      <div className="top">
        <div className="container">
          <div className="inner">
            <div className="logo">
              <img src={logoIcon} alt="logo" />
              <h2>DENSAULYK</h2>
            </div>

            <div className="infos">
              <div className="item">
                <img src={callIcon} alt="call, phone" />

                <div className="text">
                  <span className="label">Экстренный звонок:</span>
                  <span className="value">+7 777 777 77 77</span>
                </div>
              </div>

              <div className="item">
                <img src={timeIcon} alt="call, phone" />

                <div className="text">
                  <span className="label">Рабочие часы:</span>
                  <span className="value">8:00-22:00</span>
                </div>
              </div>

              <div className="item">
                <img src={locationIcon} alt="call, phone" />

                <div className="text">
                  <span className="label">Местоположение:</span>
                  <span className="value">st. Zhandosova Manasa 34/1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom">
        <div className="container">
          <div className="inner">
            {headersBackPage.length ? (
              <Link
                to={getLastBackPageItem().url}
                className="link-text display:flex align-items:center"
                onClick={() => dispatch(backPage())}
              >
                <IoIosArrowBack size={21} className="margin-right:15" />
                <span>{getLastBackPageItem().title}</span>
              </Link>
            ) : (
              <>
                <nav className="navigations">
                  {navigationLinks.map((nav) => (
                    <a
                      key={nav.url}
                      href={nav.url}
                      className="link-text"
                      onClick={() => navigate(INDEX_PAGE)}
                    >
                      {nav.label}
                    </a>
                  ))}
                </nav>

                {!token ? (
                  <Link to={AUTH_LOGIN_PAGE} className="link-text">
                    Войти
                  </Link>
                ) : (
                  <>
                    {location.pathname !== DASHBOARD_PAGE ? (
                      <Link to={DASHBOARD_PAGE} className="link-text">
                        Личный кабинет
                      </Link>
                    ) : (
                      <a className="link-text" onClick={onExitAccount}>
                        Выйти из аккаунта
                      </a>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
