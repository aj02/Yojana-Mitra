"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  searchable?: boolean;
  id?: string;
  ariaLabel?: string;
  invalid?: boolean;
  /** When set, renders as a floating-label field (matches FloatingInput). */
  label?: string;
};

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select",
  searchable = false,
  id,
  ariaLabel,
  invalid = false,
  label,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const filtered = useMemo(() => {
    if (!searchable || !query.trim()) return [...options];
    const q = query.toLowerCase().trim();
    return options.filter((o) => o.toLowerCase().includes(q));
  }, [options, query, searchable]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLLIElement>(
      `[data-idx="${activeIdx}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx, open]);

  function openMenu() {
    const idx = options.findIndex((o) => o === value);
    setActiveIdx(idx >= 0 ? idx : 0);
    setQuery("");
    setOpen(true);
    if (searchable) setTimeout(() => searchRef.current?.focus(), 0);
  }
  function closeMenu(returnFocus = false) {
    setOpen(false);
    setQuery("");
    if (returnFocus) triggerRef.current?.focus();
  }
  function toggleMenu() {
    if (open) closeMenu();
    else openMenu();
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setActiveIdx(0);
  }

  function pick(v: string) {
    onChange(v);
    closeMenu(true);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIdx(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIdx(filtered.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = filtered[activeIdx];
      if (opt) pick(opt);
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeMenu(true);
    }
  }

  function handleTriggerKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openMenu();
    }
  }

  const hasFloating = !!label;
  const showFloating = hasFloating && (open || !!value);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        id={id}
        aria-label={ariaLabel ?? label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggleMenu}
        onKeyDown={handleTriggerKey}
        className={cn(
          "relative w-full rounded-xl bg-[color:var(--surface)] border px-4 pr-11 text-left flex items-center transition-all duration-200 outline-none",
          hasFloating ? "h-14 pt-5 pb-1" : "h-14",
          "hover:bg-[color:var(--surface-2)]",
          open
            ? "border-[color:var(--violet)] bg-[color:var(--surface-2)] shadow-[0_0_0_4px_rgba(168,85,247,0.18)]"
            : invalid
            ? "border-[color:var(--pink)]/60"
            : "border-[color:var(--line)] hover:border-white/20",
          value
            ? "text-[color:var(--text-primary)]"
            : hasFloating
            ? "text-transparent"
            : "text-[color:var(--text-muted)]"
        )}
      >
        {hasFloating && (
          <span
            className={cn(
              "pointer-events-none absolute left-4 transition-all duration-200 origin-left",
              showFloating
                ? "top-1.5 text-[0.65rem] uppercase tracking-[0.12em] font-medium"
                : "top-1/2 -translate-y-1/2 text-base",
              open
                ? "text-[color:var(--violet)]"
                : invalid
                ? "text-[color:var(--pink)]"
                : "text-[color:var(--text-muted)]"
            )}
          >
            {label}
          </span>
        )}
        <span className="truncate w-full">
          {value || (hasFloating ? "" : placeholder)}
        </span>
        <ChevronDown
          className={cn(
            "absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 transition-all duration-200",
            open
              ? "rotate-180 text-[color:var(--violet)]"
              : "text-[color:var(--text-muted)]"
          )}
        />
      </button>

      {open && (
        <div className="absolute z-[60] left-0 right-0 mt-2 rounded-xl border border-[color:var(--line)] bg-[#14141a] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)_inset] overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {searchable && (
            <div className="relative border-b border-[color:var(--line)]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[color:var(--text-muted)] pointer-events-none" />
              <input
                ref={searchRef}
                value={query}
                onChange={handleSearchChange}
                onKeyDown={handleKey}
                placeholder="Search…"
                aria-label="Search options"
                className="h-11 w-full bg-transparent pl-10 pr-10 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveIdx(0);
                    searchRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded-md text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] hover:bg-white/5"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}
          <ul
            ref={listRef}
            role="listbox"
            tabIndex={-1}
            onKeyDown={handleKey}
            className="max-h-72 overflow-auto py-1.5 outline-none combobox-scroll"
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-[color:var(--text-muted)]">
                No matches for &ldquo;{query}&rdquo;
              </li>
            ) : (
              filtered.map((opt, idx) => {
                const selected = opt === value;
                const active = idx === activeIdx;
                return (
                  <li
                    key={opt}
                    data-idx={idx}
                    role="option"
                    aria-selected={selected}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => pick(opt)}
                    className={cn(
                      "mx-1.5 flex items-center gap-2 rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors",
                      active &&
                        !selected &&
                        "bg-white/[0.06] text-[color:var(--text-primary)]",
                      selected &&
                        "bg-gradient-to-r from-[color:var(--violet)]/25 to-[color:var(--pink)]/15 text-[color:var(--text-primary)]",
                      !active &&
                        !selected &&
                        "text-[color:var(--text-secondary)]"
                    )}
                  >
                    <Check
                      className={cn(
                        "h-3.5 w-3.5 shrink-0",
                        selected
                          ? "text-[color:var(--violet)]"
                          : "opacity-0"
                      )}
                    />
                    <span className="truncate">{opt}</span>
                  </li>
                );
              })
            )}
          </ul>
          {searchable && filtered.length > 0 && (
            <div className="border-t border-[color:var(--line)] px-3 py-1.5 flex items-center justify-between text-[0.65rem] text-[color:var(--text-muted)]">
              <span>
                {filtered.length} of {options.length}
              </span>
              <span className="font-mono">↑↓ navigate · ↵ select · esc close</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
