"use client";

import { cn } from "@/lib/utils";

type Props<T extends string> = {
  options: readonly T[];
  value: T | null;
  onChange: (value: T) => void;
  ariaLabel?: string;
};

const baseClass =
  "relative font-mono text-[0.78rem] uppercase tracking-[0.12em] px-4 py-2.5 border-2 transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

export function ChipGroup<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: Props<T>) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className="flex flex-wrap gap-2.5">
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
              baseClass,
              selected
                ? "border-[color:var(--marigold)] bg-[color:var(--marigold)] text-[color:var(--night)] stamp-shadow-cream"
                : "border-[color:var(--cream-soft)] bg-transparent text-[color:var(--cream)] hover:border-[color:var(--marigold)] hover:text-[color:var(--marigold)]"
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
    <div role="group" aria-label={ariaLabel} className="flex flex-wrap gap-2.5">
      {options.map((opt) => {
        const selected = values.includes(opt);
        return (
          <button
            type="button"
            key={opt}
            aria-pressed={selected}
            onClick={() => toggle(opt)}
            className={cn(
              baseClass,
              selected
                ? "border-[color:var(--vermilion)] bg-[color:var(--vermilion)] text-[color:var(--cream)] stamp-shadow-cream"
                : "border-[color:var(--cream-soft)] bg-transparent text-[color:var(--cream)] hover:border-[color:var(--vermilion)] hover:text-[color:var(--vermilion)]"
            )}
          >
            {selected && <span aria-hidden className="mr-1.5">✓</span>}
            {opt}
          </button>
        );
      })}
    </div>
  );
}
