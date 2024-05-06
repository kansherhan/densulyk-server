import { Link } from "react-router-dom";
import { TextInput } from "../../components/TextInput.jsx";
import { AUTH_REGISTRATION_PAGE } from "../../constants/pages.js";

export function LoginPage() {
  return (
    <div className="auth-page">
      <form className="form">
        <h1 className="title">Войти</h1>

        <p className="description">
          мы сохраняем полную конфеденциальность ваших <br /> даннных
        </p>

        <TextInput type="email" placeholder="Email" />
        <TextInput type="password" placeholder="Password" />

        <input className="submit-button" type="submit" value="Войти" />

        <p className="link">
          <span>Нет аккаунта? </span>
          <Link to={AUTH_REGISTRATION_PAGE}>Зарегестрируйся</Link>
        </p>
      </form>
    </div>
  );
}
