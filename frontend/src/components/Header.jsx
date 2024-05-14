import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  AUTH_LOGIN_PAGE,
  DASHBOARD_PAGE,
  INDEX_PAGE,
} from "../constants/pages.js";

import logoIcon from "../assets/svg/logo.svg";

import callIcon from "../assets/svg/header/call.svg";
import timeIcon from "../assets/svg/header/time.svg";
import locationIcon from "../assets/svg/header/location.svg";

export function Header() {
  const token = useSelector((state) => state.auth.token);

  return (
    <header className="root-header">
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
            <nav className="navigations">
              <Link to={INDEX_PAGE} className="link-text">
                Главная страница
              </Link>
              <a href="#about" className="link-text">
                О Нас
              </a>
              <a href="#contacts" className="link-text">
                Контакты
              </a>
            </nav>

            {!token ? (
              <Link to={AUTH_LOGIN_PAGE} className="link-text">
                Войти
              </Link>
            ) : (
              <Link to={DASHBOARD_PAGE} className="link-text">
                Личный кабинет
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
