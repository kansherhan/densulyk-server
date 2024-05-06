import { Link } from "react-router-dom";
import { TextInput } from "../../components/TextInput.jsx";
import { AUTH_LOGIN_PAGE } from "../../constants/pages.js";

export function RegistrationPage() {
  return (
    <div className="auth-page">
      <form className="form">
        <h1 className="title">Регистрация</h1>

        <p className="description">
          мы сохраняем полную конфеденциальность ваших <br /> даннных
        </p>

        <TextInput type="email" placeholder="Email" />
        <TextInput type="password" placeholder="Password" />

        <input
          className="submit-button"
          type="submit"
          value="Зарегистрироваться"
        />

        <p className="link">
          <span>Есть аккаунт? </span>
          <Link to={AUTH_LOGIN_PAGE}>Авторизоваться</Link>
        </p>
      </form>
    </div>
  );
}
