"use client";

import { useMemo, useState } from "react";
import type { SchemesResponse } from "@/lib/schema";
import { SchemeCard } from "@/components/scheme-card";
import { BlockPrintBand, CornerMark, Ornament } from "@/components/ornament";

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
      <section className="mx-auto max-w-5xl px-6 sm:px-10 pt-14 sm:pt-20 pb-10">
        <CornerMark label={`${data.schemes.length} matches · sorted by fit`} className="mb-6" />
        <div className="grid gap-10 sm:grid-cols-12 items-start">
          <div className="sm:col-span-9">
            <h1 className="font-display text-4xl sm:text-6xl leading-[0.98] text-balance">
              <span className="text-[color:var(--cream)]">Schemes for</span>
              <br />
              <span className="text-[color:var(--marigold)] italic">your situation.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[color:var(--cream-soft)] text-pretty leading-relaxed max-w-2xl">
              {data.summary}
            </p>
          </div>
          <div className="sm:col-span-3 flex sm:justify-end">
            <div className="text-[color:var(--vermilion)] opacity-60">
              <Ornament size={96} />
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-[color:var(--line)] py-3">
        <BlockPrintBand />
      </div>

      {/* Filter bar */}
      <div className="sticky top-0 z-20 bg-[color:var(--night)]/95 backdrop-blur border-b border-[color:var(--line)]">
        <div className="mx-auto max-w-5xl px-6 sm:px-10 py-4 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[color:var(--cream-soft)] mr-2">
            Filter ·
          </span>
          <FilterChip active={filter === "all" && !activeCategory} onClick={() => { setFilter("all"); setActiveCategory(null); }}>
            All ({data.schemes.length})
          </FilterChip>
          <FilterChip active={filter === "top"} onClick={() => setFilter(filter === "top" ? "all" : "top")}>
            Top match ≥85
          </FilterChip>
          <span className="h-5 w-px bg-[color:var(--line)] mx-1" />
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

      <section className="mx-auto max-w-5xl px-6 sm:px-10 py-12 sm:py-16">
        {filtered.length === 0 ? (
          <p className="font-display italic text-2xl text-[color:var(--cream-soft)]">
            No schemes match these filters. Clear them to see all matches.
          </p>
        ) : (
          <div className="grid gap-8 sm:gap-10">
            {filtered.map((scheme, i) => (
              <SchemeCard key={scheme.name + i} scheme={scheme} index={i} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-5xl px-6 sm:px-10 pb-16">
        <div className="border-2 border-[color:var(--vermilion)] p-6 sm:p-8 stamp-shadow-vermilion">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[color:var(--vermilion)] mb-3">
            ⚠ A note before you apply
          </p>
          <p className="text-[color:var(--cream)] text-pretty leading-relaxed text-base sm:text-lg">
            These are AI-generated matches. Scheme eligibility, benefits,
            deadlines, and application steps change.{" "}
            <strong className="text-[color:var(--marigold)]">
              Always verify on the official Government of India or your state
              government portal
            </strong>{" "}
            before applying. Your nearest Common Service Centre (CSC),
            panchayat office, or municipal ward can help.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 sm:px-10 pb-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={onReset}
          className="group inline-flex items-center gap-3 font-display italic text-xl sm:text-2xl text-[color:var(--marigold)] hover:text-[color:var(--vermilion)] transition-colors"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          Different profile
        </button>
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-[color:var(--cream-soft)]">
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
        "font-mono text-[0.7rem] uppercase tracking-[0.15em] px-3 py-1.5 border-2 transition-colors " +
        (active
          ? "border-[color:var(--marigold)] bg-[color:var(--marigold)] text-[color:var(--night)]"
          : "border-[color:var(--cream-soft)]/50 text-[color:var(--cream-soft)] hover:border-[color:var(--marigold)] hover:text-[color:var(--marigold)]")
      }
    >
      {children}
    </button>
  );
}
