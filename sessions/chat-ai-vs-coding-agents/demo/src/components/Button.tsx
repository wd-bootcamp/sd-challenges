import type { ReactNode } from "react";

type ButtonProps = {
  variant: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit";
  children: ReactNode;
};

export default function Button({
  variant,
  onClick,
  type = "button",
  children,
}: ButtonProps) {
  return (
    <button className={variant} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
