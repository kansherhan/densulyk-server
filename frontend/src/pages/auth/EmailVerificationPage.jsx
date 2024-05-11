import { TextInput } from "../../components/TextInput.jsx";
import { Button } from "../../components/Button.jsx";

export function EmailVerificationPage() {
  return (
    <div className="auth-page">
      <form className="form">
        <h1 className="title">Проверьте почту</h1>

        <p className="description">введите одноразовый код</p>

        <TextInput type="number" placeholder="Код для подтверждения" />

        <Button className="submit-button" type="submit" label="Подтвердить" />
      </form>
    </div>
  );
}
