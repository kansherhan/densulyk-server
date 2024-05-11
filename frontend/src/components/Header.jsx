import { useState } from "react";
import { Link } from "react-router-dom";

import { AUTH_LOGIN_PAGE, INDEX_PAGE } from "../constants/pages.js";

import logoIcon from "../assets/svg/logo.svg";

import callIcon from "../assets/svg/header/call.svg";
import timeIcon from "../assets/svg/header/time.svg";
import locationIcon from "../assets/svg/header/location.svg";

export function Header() {
  const [navigations] = useState([
    {
      label: "Главная",
      url: INDEX_PAGE,
    },
    {
      label: "О Нас",
      url: `${INDEX_PAGE}#about`,
    },
    {
      label: "Контакты",
      url: `#contacts`,
    },
  ]);

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
                  <span className="label">Energency Call:</span>
                  <span className="value">+7 777 777 77 77</span>
                </div>
              </div>

              <div className="item">
                <img src={timeIcon} alt="call, phone" />

                <div className="text">
                  <span className="label">Work Hours:</span>
                  <span className="value">8:00-22:00 everyday</span>
                </div>
              </div>

              <div className="item">
                <img src={locationIcon} alt="call, phone" />

                <div className="text">
                  <span className="label">Location:</span>
                  <span className="value">Zhandosova Manasa</span>
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
              {navigations.map((nav) => (
                <Link key={nav.url} to={nav.url} className="link-text">
                  {nav.label}
                </Link>
              ))}
            </nav>

            <Link to={AUTH_LOGIN_PAGE} className="link-text">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
