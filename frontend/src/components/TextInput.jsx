export function TextInput({ type, placeholder, ...allProps }) {
  return (
    <input
      className="text-input"
      type={type}
      placeholder={placeholder}
      {...allProps}
    />
  );
}
