export default function Input({
  labelText,
  placeholder,
  name,
  value,
  onChange,
  required,
}) {
  return (
    <>
      <label htmlFor={name}>{labelText}</label>
      <input
        className="input"
        id={name}
        name={name}
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={onChange}
        required={required}
      />
    </>
  );
}
