import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import peopleIcon from "../assets/svg/pages/main/people.svg";
import servicesBannerImage from "/images/main-page-services-banner.png";
import { clearBackPage } from "../store/slices/settings.slice.js";
import {
  AUTH_LOGIN_PAGE,
  DASHBOARD_PATIENT_SUBSCRIBE_APPOINTMENT,
} from "../constants/pages.js";

export function IndexPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  const is2FAuthorized = useSelector((state) => state.auth.is2FAuthorized);

  const onSubscribeUs = () => {
    if (isAuthorized && is2FAuthorized) {
      navigate(DASHBOARD_PATIENT_SUBSCRIBE_APPOINTMENT);
    } else {
      navigate(AUTH_LOGIN_PAGE);
    }
  };

  useEffect(() => {
    dispatch(clearBackPage());
  }, []);

  return (
    <div className="main-page">
      <section className="hero">
        <div className="container">
          <h1>
            Вместе к здоровой
            <br /> жизни
          </h1>
          <p>Профессионализм, забота, результат</p>
          <a href="#about">Почитать подробнее</a>
        </div>
      </section>

      <section id="about" className="welcome">
        <div className="subscribe-us" onClick={onSubscribeUs}>
          <img src={peopleIcon} alt="people" />
          <p>ЗАПИШИСЬ К НАМ</p>
        </div>

        <div className="container">
          <div className="inner">
            <h2>Добро пожаловать</h2>

            <h4>Медицинская организация &quot;Densaulyk&quot;</h4>

            <p>
              современный медицинский центр, который оказывает качественные
              медицинские услуги с 2024 года. Мы стремимся предоставлять
              высококлассную медицинскую помощь населению Казахстана, сочетая
              передовые технологии с человеческим подходом к каждому пациенту.
            </p>
          </div>
        </div>
      </section>

      <section className="services">
        <img className="banner" src={servicesBannerImage} alt="doctors" />

        <div className="container">
          <div className="inner">
            <h2 className="title">наш сервис</h2>

            <ol className="recommendations">
              <li className="item">онлайн рекомендации и созвоны</li>
              <li className="item">Онлайн доступ к результатам анализов</li>
              <li className="item">Электронная медицинская карта</li>
              <li className="item">Врачебные консилиумы</li>
              <li className="item">Поддержка пациентов</li>
              <li className="item">Онлайн запись на консультации</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mission">
        <div className="container">
          <h2 className="title">наша миссия</h2>

          <p>
            Наша миссия - сохранение и улучшение здоровья наших пациентов,
            предоставляя им доступ к самым эффективным и современным методам
            диагностики, лечения и реабилитации. Мы ценим каждого пациента и
            стремимся к высоким стандартам качества и безопасности в оказании
            медицинской помощи.
          </p>
        </div>
      </section>
    </div>
  );
}
