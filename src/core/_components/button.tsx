import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  const styles = {
    primary: "bg-[#143d2b] text-white hover:bg-[#1c553b]",
    secondary: "bg-[#d9f1e4] text-[#143d2b] hover:bg-[#c7e8d6]",
    ghost: "text-[#527267] hover:bg-[#edf4ef] hover:text-[#143d2b]",
  };

  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center rounded-xl px-5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`}
      {...props}
    />
  );
}
