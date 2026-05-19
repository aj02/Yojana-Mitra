"use client";

import { cn } from "@/lib/utils";

type Props<T extends string> = {
  options: readonly T[];
  value: T | null;
  onChange: (value: T) => void;
  ariaLabel?: string;
};

export function ChipGroup<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: Props<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="flex flex-wrap gap-2"
    >
      {options.map((opt) => {
        const selected = opt === value;
        return (
          <button
            type="button"
            key={opt}
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--terracotta-soft)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--paper)]",
              selected
                ? "border-[color:var(--terracotta)] bg-[color:var(--terracotta)] text-[color:var(--paper-card)]"
                : "border-[color:var(--line)] bg-transparent text-[color:var(--ink-soft)] hover:border-[color:var(--ink-muted)]"
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

type MultiProps<T extends string> = {
  options: readonly T[];
  values: T[];
  onChange: (values: T[]) => void;
  ariaLabel?: string;
};

export function ChipMulti<T extends string>({
  options,
  values,
  onChange,
  ariaLabel,
}: MultiProps<T>) {
  function toggle(opt: T) {
    if (values.includes(opt)) onChange(values.filter((v) => v !== opt));
    else onChange([...values, opt]);
  }
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="flex flex-wrap gap-2"
    >
      {options.map((opt) => {
        const selected = values.includes(opt);
        return (
          <button
            type="button"
            key={opt}
            aria-pressed={selected}
            onClick={() => toggle(opt)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--terracotta-soft)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--paper)]",
              selected
                ? "border-[color:var(--terracotta)] bg-[color:var(--terracotta)] text-[color:var(--paper-card)]"
                : "border-[color:var(--line)] bg-transparent text-[color:var(--ink-soft)] hover:border-[color:var(--ink-muted)]"
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
