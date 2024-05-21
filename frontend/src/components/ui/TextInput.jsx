export function TextInput({
  type,
  placeholder,
  inputTouched,
  errorText,
  ...allProps
}) {
  return (
    <div className="text-input-container">
      <input
        className="text-input"
        type={type}
        placeholder={placeholder}
        {...allProps}
      />
      {inputTouched && errorText ? (
        <p className="text-input-error">{errorText}</p>
      ) : null}
    </div>
  );
}
