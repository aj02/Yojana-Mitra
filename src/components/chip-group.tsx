"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type Props<T extends string> = {
  options: readonly T[];
  value: T | null;
  onChange: (value: T) => void;
  ariaLabel?: string;
};

const base =
  "relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-all duration-200 border";

export function ChipGroup<T extends string>({ options, value, onChange, ariaLabel }: Props<T>) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className="flex flex-wrap gap-2">
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
              base,
              selected
                ? "bg-white text-[color:var(--background-base)] border-white shadow-[0_4px_24px_-4px_rgba(255,255,255,0.4)]"
                : "bg-[color:var(--surface)] text-[color:var(--text-secondary)] border-[color:var(--line)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--surface-2)] hover:border-white/20"
            )}
          >
            {selected && <Check className="h-3.5 w-3.5" />}
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

export function ChipMulti<T extends string>({ options, values, onChange, ariaLabel }: MultiProps<T>) {
  function toggle(opt: T) {
    if (values.includes(opt)) onChange(values.filter((v) => v !== opt));
    else onChange([...values, opt]);
  }
  return (
    <div role="group" aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const selected = values.includes(opt);
        return (
          <button
            type="button"
            key={opt}
            aria-pressed={selected}
            onClick={() => toggle(opt)}
            className={cn(
              base,
              selected
                ? "bg-gradient-to-r from-[color:var(--violet)] to-[color:var(--pink)] text-white border-transparent shadow-[0_4px_24px_-4px_rgba(168,85,247,0.6)]"
                : "bg-[color:var(--surface)] text-[color:var(--text-secondary)] border-[color:var(--line)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--surface-2)] hover:border-white/20"
            )}
          >
            {selected && <Check className="h-3.5 w-3.5" />}
            {opt}
          </button>
        );
      })}
    </div>
  );
}
