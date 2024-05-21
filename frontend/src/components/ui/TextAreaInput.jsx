export function TextAreaInput({
  placeholder,
  rows,
  inputTouched,
  errorText,
  ...allProps
}) {
  return (
    <div className="text-input-container">
      <textarea
        className="text-input"
        placeholder={placeholder}
        rows={rows}
        {...allProps}
      />
      {inputTouched && errorText ? (
        <p className="text-input-error">{errorText}</p>
      ) : null}
    </div>
  );
}
