"use client";

import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Ornament, BlockPrintBand, CornerMark } from "@/components/ornament";
import { RotatingWord } from "@/components/rotating-word";
import { ProfileForm } from "@/components/profile-form";
import { ResultsView } from "@/components/results-view";
import type { SchemesResponse } from "@/lib/schema";

const ROTATING_BENEFITS = [
  "pensions",
  "housing",
  "scholarships",
  "cash transfers",
  "health cover",
];

export default function Home() {
  const [results, setResults] = useState<SchemesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results]);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex min-h-full flex-col">
      <Header />

      {!results && (
        <main className="flex-1">
          {/* HERO — typographic poster */}
          <section className="relative overflow-hidden border-b border-[color:var(--line)]">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 sm:-top-24 sm:-right-16 text-[color:var(--marigold)]/12 opacity-40"
            >
              <Ornament size={460} />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -left-16 text-[color:var(--vermilion)]/10 opacity-30 rotate-12"
            >
              <Ornament size={360} />
            </div>

            <div className="relative mx-auto max-w-6xl px-6 sm:px-10 pt-14 sm:pt-24 pb-16 sm:pb-28">
              <CornerMark label="An aid for unclaimed welfare" className="mb-10" />

              <div className="grid gap-10 sm:grid-cols-12 items-end">
                <div className="sm:col-span-9">
                  <h1 className="font-display leading-[0.92] text-balance text-[clamp(3rem,9vw,7rem)]">
                    <span className="block text-[color:var(--cream)]">Find the</span>
                    <span className="block italic text-[color:var(--marigold)]">
                      <RotatingWord words={ROTATING_BENEFITS} />
                    </span>
                    <span className="block text-[color:var(--cream)]">
                      you&apos;re owed.
                    </span>
                  </h1>
                </div>
                <div className="sm:col-span-3 flex sm:justify-end">
                  <div
                    aria-hidden
                    className="inline-flex flex-col items-center justify-center w-28 h-28 sm:w-36 sm:h-36 border-2 border-[color:var(--vermilion)] rotate-stamp font-mono"
                  >
                    <span className="text-[0.6rem] uppercase tracking-[0.25em] text-[color:var(--vermilion)]">
                      Government
                    </span>
                    <span className="font-display italic text-3xl sm:text-4xl text-[color:var(--vermilion)] my-1">
                      Bharat
                    </span>
                    <span className="text-[0.6rem] uppercase tracking-[0.25em] text-[color:var(--vermilion)]">
                      Welfare · 2026
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-12 grid gap-8 sm:grid-cols-12 items-start">
                <div className="sm:col-span-7 space-y-5">
                  <p className="text-lg sm:text-xl leading-relaxed text-[color:var(--cream-soft)] text-pretty">
                    Tens of thousands of crores in Indian welfare benefits go
                    unclaimed every year. PMAY. PM-KISAN. Ayushman Bharat.
                    Ladki Bahin. Hundreds of schemes. The bottleneck is rarely
                    eligibility &mdash; it is{" "}
                    <span className="text-[color:var(--marigold)]">discovery</span>.
                  </p>
                  <p className="text-lg sm:text-xl leading-relaxed text-[color:var(--cream-soft)] text-pretty">
                    Answer eight questions. We return the central and state
                    schemes you most likely qualify for, with how to apply.
                  </p>
                </div>
                <div className="sm:col-span-5">
                  <button
                    onClick={scrollToForm}
                    className="group inline-flex items-center justify-center gap-3 px-7 py-5 bg-[color:var(--cream)] text-[color:var(--night)] font-display text-2xl border-2 border-[color:var(--cream)] stamp-shadow w-full sm:w-auto transition-all duration-150 hover:bg-[color:var(--marigold)] hover:border-[color:var(--marigold)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                  >
                    Begin
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-[color:var(--cream-soft)]">
                      ① ~ 1 min
                    </div>
                    <div className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-[color:var(--cream-soft)]">
                      ② No login
                    </div>
                    <div className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-[color:var(--cream-soft)]">
                      ③ Free
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* MARQUEE divider */}
          <div className="border-b border-[color:var(--line)] py-3">
            <BlockPrintBand />
          </div>

          {/* STAT STRIP */}
          <section className="border-b border-[color:var(--line)]">
            <div className="mx-auto max-w-6xl grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[color:var(--line)]">
              {[
                { stat: "₹70,000 Cr+", label: "Unclaimed welfare in 2024", accent: "var(--marigold)" },
                { stat: "950+", label: "Active central & state schemes", accent: "var(--vermilion)" },
                { stat: "< 8 sec", label: "From your profile to matches", accent: "var(--cream)" },
              ].map((s) => (
                <div key={s.label} className="px-6 sm:px-10 py-8">
                  <div
                    className="font-display italic text-5xl sm:text-6xl leading-none"
                    style={{ color: s.accent }}
                  >
                    {s.stat}
                  </div>
                  <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-[color:var(--cream-soft)]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FORM */}
          <section ref={formRef} className="mx-auto max-w-3xl px-6 sm:px-10 py-20 sm:py-28">
            <CornerMark label="Eight questions" className="mb-8" />
            <h2 className="font-display text-5xl sm:text-6xl leading-[0.98] text-balance text-[color:var(--cream)] mb-4">
              Tell us about <span className="italic text-[color:var(--marigold)]">you</span>.
            </h2>
            <p className="text-[color:var(--cream-soft)] text-lg leading-relaxed text-pretty max-w-xl mb-14">
              The more accurate your answers, the better the match. Nothing is
              stored.
            </p>
            <ProfileForm
              onResults={setResults}
              onLoadingChange={setLoading}
              loading={loading}
            />
          </section>
        </main>
      )}

      {results && (
        <main ref={resultsRef} className="flex-1">
          <ResultsView data={results} onReset={() => setResults(null)} />
        </main>
      )}

      <Footer />
    </div>
  );
}
