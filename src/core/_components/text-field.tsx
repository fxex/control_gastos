import type { InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function TextField({ label, error, id, className = "", ...props }: TextFieldProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-semibold text-[#28463a]">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-[#17382a] outline-none transition placeholder:text-[#9aaba3] focus:border-[#62a985] focus:ring-4 focus:ring-[#d9f1e4] ${error ? "border-[#d26c6c]" : "border-[#dbe6df]"} ${className}`}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="text-xs font-medium text-[#b64f4f]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
