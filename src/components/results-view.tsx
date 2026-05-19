"use client";

import { useMemo, useState } from "react";
import type { SchemesResponse } from "@/lib/schema";
import { SchemeCard } from "@/components/scheme-card";
import { Sparkles, ArrowLeft, ShieldAlert } from "lucide-react";

type Props = {
  data: SchemesResponse;
  onReset: () => void;
};

type Filter = "all" | "top";

export function ResultsView({ data, onReset }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(data.schemes.map((s) => s.category));
    return Array.from(set);
  }, [data.schemes]);

  const filtered = useMemo(() => {
    return data.schemes.filter((s) => {
      if (filter === "top" && s.match_score < 85) return false;
      if (activeCategory && s.category !== activeCategory) return false;
      return true;
    });
  }, [data.schemes, filter, activeCategory]);

  return (
    <div className="relative">
      <div className="aurora opacity-50" aria-hidden />

      <section className="relative mx-auto max-w-5xl px-5 sm:px-8 pt-14 sm:pt-20 pb-10">
        <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-[color:var(--text-secondary)] mb-6">
          <Sparkles className="h-3.5 w-3.5 text-[color:var(--violet)]" />
          {data.schemes.length} schemes matched
        </div>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
          <span className="text-gradient-soft">Schemes built for </span>
          <span className="text-gradient">your situation.</span>
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-[color:var(--text-secondary)] text-pretty leading-relaxed max-w-3xl">
          {data.summary}
        </p>
      </section>

      <div className="sticky top-[57px] z-20 backdrop-blur-xl bg-[color:var(--background-base)]/80 border-b border-[color:var(--line)]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 py-3 flex flex-wrap items-center gap-2 overflow-x-auto">
          <FilterChip active={filter === "all" && !activeCategory} onClick={() => { setFilter("all"); setActiveCategory(null); }}>
            All · {data.schemes.length}
          </FilterChip>
          <FilterChip active={filter === "top"} onClick={() => setFilter(filter === "top" ? "all" : "top")}>
            ★ Top match
          </FilterChip>
          <span className="h-5 w-px bg-[color:var(--line)] mx-1.5" />
          {categories.map((c) => (
            <FilterChip
              key={c}
              active={activeCategory === c}
              onClick={() => setActiveCategory(activeCategory === c ? null : c)}
            >
              {c}
            </FilterChip>
          ))}
        </div>
      </div>

      <section className="relative mx-auto max-w-5xl px-5 sm:px-8 py-12 sm:py-16">
        {filtered.length === 0 ? (
          <div className="rounded-2xl glass p-12 text-center">
            <p className="text-[color:var(--text-secondary)]">
              No schemes match these filters. Clear them to see all matches.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:gap-6">
            {filtered.map((scheme, i) => (
              <SchemeCard key={scheme.name + i} scheme={scheme} index={i} />
            ))}
          </div>
        )}
      </section>

      <section className="relative mx-auto max-w-5xl px-5 sm:px-8 pb-16">
        <div className="rounded-2xl glass border-[color:var(--pink)]/30 p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--pink)] to-[color:var(--violet)] text-white">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-[color:var(--text-primary)]">Verify before you apply</p>
              <p className="text-[color:var(--text-secondary)] text-pretty leading-relaxed">
                These are AI-generated matches. Scheme eligibility, benefits,
                deadlines, and application steps change. Always confirm details
                on the official Government of India or your state portal. Your
                nearest Common Service Centre (CSC), panchayat office, or
                municipal ward can help.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-5xl px-5 sm:px-8 pb-20 flex items-center justify-between">
        <button
          onClick={onReset}
          className="group inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--surface-2)] transition-all"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          New profile
        </button>
        <p className="text-xs text-[color:var(--text-muted)]">
          Showing {filtered.length} of {data.schemes.length}
        </p>
      </section>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "shrink-0 rounded-full px-3 py-1.5 text-xs transition-all border " +
        (active
          ? "bg-white text-[color:var(--background-base)] border-white shadow-[0_4px_16px_-4px_rgba(255,255,255,0.3)]"
          : "bg-[color:var(--surface)] text-[color:var(--text-secondary)] border-[color:var(--line)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--surface-2)] hover:border-white/20")
      }
    >
      {children}
    </button>
  );
}
