"use client";

import { forwardRef, useId, useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label: string;
  hint?: string;
  invalid?: boolean;
  isValid?: boolean;
  onClear?: () => void;
};

export const FloatingInput = forwardRef<HTMLInputElement, Props>(function FloatingInput(
  { label, hint, invalid, isValid, onClear, value, id, className, onFocus, onBlur, ...rest },
  ref
) {
  const reactId = useId();
  const inputId = id ?? `f-${reactId}`;
  const [focused, setFocused] = useState(false);
  const hasValue = value !== undefined && value !== null && String(value).length > 0;
  const float = focused || hasValue;

  return (
    <div className="relative">
      <input
        {...rest}
        id={inputId}
        ref={ref}
        value={value as string | number | readonly string[] | undefined}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        placeholder=" "
        className={cn(
          "peer h-14 w-full rounded-xl bg-[color:var(--surface)] border px-4 pt-5 pb-1 text-base text-[color:var(--text-primary)] outline-none transition-all duration-200",
          "hover:bg-[color:var(--surface-2)]",
          focused
            ? "border-[color:var(--violet)] bg-[color:var(--surface-2)] shadow-[0_0_0_4px_rgba(168,85,247,0.18)]"
            : invalid
            ? "border-[color:var(--pink)]/60"
            : "border-[color:var(--line)] hover:border-white/20",
          className
        )}
      />
      <label
        htmlFor={inputId}
        className={cn(
          "pointer-events-none absolute left-4 transition-all duration-200 origin-left",
          float
            ? "top-1.5 text-[0.65rem] uppercase tracking-[0.12em] font-medium"
            : "top-1/2 -translate-y-1/2 text-base",
          focused
            ? "text-[color:var(--violet)]"
            : invalid
            ? "text-[color:var(--pink)]"
            : "text-[color:var(--text-muted)]"
        )}
      >
        {label}
      </label>

      {/* trailing icon: clear (when value + onClear) OR success check */}
      {hasValue && onClear && !isValid && (
        <button
          type="button"
          onClick={onClear}
          aria-label={`Clear ${label}`}
          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-md text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] hover:bg-white/5"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      {isValid && (
        <span
          className="absolute right-3.5 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--emerald)] to-[color:var(--cyan)] text-white shadow-[0_4px_16px_-4px_rgba(16,185,129,0.5)]"
          aria-hidden
        >
          <Check className="h-3.5 w-3.5" />
        </span>
      )}

      {hint && !invalid && (
        <p className="mt-1.5 text-xs text-[color:var(--text-muted)]">{hint}</p>
      )}
      {invalid && hint && (
        <p className="mt-1.5 text-xs text-[color:var(--pink)]">{hint}</p>
      )}
    </div>
  );
});
