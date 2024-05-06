import peopleIcon from "../assets/svg/pages/main/people.svg";
import servicesBannerImage from "/images/main-page-services-banner.png";

export function IndexPage() {
  return (
    <div className="main-page">
      <section className="hero">
        <div className="container">
          <h1>
            Вместе к здоровой
            <br /> жизни
          </h1>
          <p>Профессионализм, забота, результат</p>
          <button>Почитать подробнее</button>
        </div>
      </section>

      <section className="welcome">
        <div className="subscribe-us">
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
