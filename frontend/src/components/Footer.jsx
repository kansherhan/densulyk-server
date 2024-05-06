import lightLogoIcon from "../assets/svg/light-logo.svg";

export function Footer() {
  return (
    <footer className="root-footer">
      <div className="top">
        <div className="container">
          <div className="inner">
            <div className="logo">
              <img src={lightLogoIcon} alt="light logo" />

              <h1>DENSULYK</h1>
              <p>medical center</p>

              <p className="text">
                забота, профессионализм,
                <br /> результат{" "}
              </p>
            </div>

            <div className="links">
              <h4 className="title">Важные Ссылки</h4>

              <a href="#">Главная</a>
              <a href="#">О Нас</a>
              <a href="#">Контакты</a>
            </div>

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
