export default function Button({ variant, onClick, children }) {
  return (
    <button className={variant} onClick={onClick}>
      {children}
    </button>
  );
}
