import { TextInput } from "../../components/TextInput.jsx";

export function EmailVerificationPage() {
  return (
    <div className="auth-page">
      <form className="form">
        <h1 className="title">Проверьте почту</h1>

        <p className="description">введите одноразовый код</p>

        <TextInput type="number" placeholder="Код для подтверждения" />

        <input className="submit-button" type="submit" value="Подтвердить" />
      </form>
    </div>
  );
}
