import { useLocation } from "react-router-dom";

import lightLogoIcon from "../assets/svg/light-logo.svg";
import { INDEX_PAGE } from "../constants/pages.js";

export function Footer() {
  const location = useLocation();

  return (
    <footer id="contacts" className="root-footer">
      <div className="top">
        <div className="container">
          <div className="inner">
            <div className="logo">
              <img src={lightLogoIcon} alt="light logo" />

              <h1>DENSAULYK</h1>
              <p>medical center</p>

              <p className="text">
                забота, профессионализм,
                <br /> результат{" "}
              </p>
            </div>

            {location.pathname === INDEX_PAGE && (
              <div className="links">
                <h4 className="title">Важные Ссылки</h4>

                <a href="#">Главная</a>
                <a href="#about">О Нас</a>
                <a href="#contacts">Контакты</a>
              </div>
            )}

            <div className="contacts links">
              <h4 className="title">Контакты</h4>

              <a href="#">Телефон: 7 (775) 018 32 03</a>
              <a href="#">Почта: densulyk@iitu.edu.kz</a>
              <a href="#">Адрес: st. Manasa</a>
            </div>

            <div className="support-contacts links">
              <h4 className="title">Служба Поддержки</h4>

              <a href="#">Телефон: 7 (775) 018 32 03</a>
              <a href="#">Почта: support@iitu.edu.kz</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom">
        <div className="container">
          <div className="inner">
            <p>
              © 2024 for DIPLOMA PROJECT by Sadykova Aruzhan, Nurmukha Ulbosyn,
              Otarbayev Kuat.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
