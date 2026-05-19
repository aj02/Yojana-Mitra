"use client";

import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RotatingWord } from "@/components/rotating-word";
import { HeroVisual } from "@/components/hero-visual";
import { ProfileForm } from "@/components/profile-form";
import { LoadingTheatre } from "@/components/loading-theatre";
import { ResultsView } from "@/components/results-view";
import type { SchemesResponse } from "@/lib/schema";
import { Sparkles, ArrowDown, Zap, Lock, Languages, Wallet, Layers, Timer } from "lucide-react";

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

  useEffect(() => {
    if (loading && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [loading]);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex min-h-full flex-col">
      <Header />

      {!results && (
        <main className="flex-1">
          {/* HERO */}
          <section className="relative overflow-hidden">
            <div className="aurora" aria-hidden />
            <div className="absolute inset-0 grid-overlay" aria-hidden />

            <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-12 sm:pt-20 pb-16 sm:pb-20">
              <div className="grid gap-10 lg:gap-16 lg:grid-cols-12 items-center">
                {/* TEXT COLUMN */}
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-[color:var(--text-secondary)] mb-6">
                    <Sparkles className="h-3.5 w-3.5 text-[color:var(--violet)]" />
                    AI-matched · Central + State · India
                  </div>

                  <h1 className="text-[2.75rem] sm:text-6xl lg:text-[5rem] font-semibold tracking-[-0.03em] leading-[0.96] text-balance">
                    <span className="text-gradient-soft">Find the </span>
                    <RotatingWord words={ROTATING_BENEFITS} />
                    <br />
                    <span className="text-gradient-soft">you&apos;re owed.</span>
                  </h1>

                  <p className="mt-6 text-lg text-[color:var(--text-secondary)] text-pretty leading-relaxed max-w-xl">
                    Tens of thousands of crores in Indian welfare go unclaimed
                    every year. PMAY, PM-KISAN, Ayushman Bharat, Ladki Bahin
                    and 900+ more. The bottleneck is rarely eligibility — it
                    is discovery.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <button
                      onClick={scrollToForm}
                      className="group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-medium bg-gradient-to-r from-[color:var(--violet)] via-[color:var(--pink)] to-[color:var(--cyan)] text-white shadow-[0_8px_32px_-8px_rgba(168,85,247,0.7)] hover:shadow-[0_16px_48px_-12px_rgba(236,72,153,0.7)] hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Find my schemes
                      <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    </button>
                    <div className="flex items-center gap-3 text-xs text-[color:var(--text-muted)]">
                      <span className="inline-flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5" /> Under 1 min
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Lock className="h-3.5 w-3.5" /> No login
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Languages className="h-3.5 w-3.5" /> Free
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3D VISUAL COLUMN */}
                <div className="lg:col-span-5">
                  <HeroVisual />
                </div>
              </div>
            </div>
          </section>

          {/* FEATURE CARDS */}
          <section className="relative mx-auto max-w-5xl px-5 sm:px-8 pb-20 sm:pb-24">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  num: "₹70K",
                  unit: "Cr+",
                  label: "Unclaimed welfare in 2024",
                  Icon: Wallet,
                  from: "#a855f7",
                  to: "#ec4899",
                },
                {
                  num: "950",
                  unit: "+",
                  label: "Active central & state schemes",
                  Icon: Layers,
                  from: "#ec4899",
                  to: "#f97316",
                },
                {
                  num: "<8",
                  unit: "sec",
                  label: "Profile to matched schemes",
                  Icon: Timer,
                  from: "#06b6d4",
                  to: "#3b82f6",
                },
              ].map(({ num, unit, label, Icon, from, to }) => (
                <div
                  key={label}
                  className="group relative glass rounded-2xl p-6 overflow-hidden flex flex-col justify-between min-h-[170px] hover:bg-[color:var(--surface-2)] transition-colors"
                >
                  <div
                    aria-hidden
                    className="absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `radial-gradient(circle, ${from}, transparent 70%)`,
                    }}
                  />
                  <div className="relative flex items-center justify-between">
                    <div
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${from}, ${to})`,
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="relative mt-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-5xl sm:text-6xl font-semibold tracking-tight text-gradient-soft tabular-nums leading-none">
                        {num}
                      </span>
                      <span className="text-xl sm:text-2xl font-semibold tracking-tight text-[color:var(--text-secondary)] leading-none">
                        {unit}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-[color:var(--text-secondary)] leading-snug">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FORM / LOADING */}
          <section ref={formRef} className="relative">
            <div className="aurora aurora-pink opacity-40" aria-hidden />
            <div className="relative mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-24">
              {loading ? (
                <LoadingTheatre />
              ) : (
                <div className="rounded-3xl glass-strong p-6 sm:p-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--surface-2)] border border-[color:var(--line)] px-3 py-1.5 text-xs text-[color:var(--text-secondary)] mb-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--violet)]" />
                    Three quick sections · about a minute
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.02] text-balance">
                    <span className="text-gradient-soft">Tell us about </span>
                    <span className="text-gradient">you.</span>
                  </h2>
                  <p className="mt-3 text-[color:var(--text-secondary)] text-pretty leading-relaxed max-w-xl mb-10">
                    The more accurate your answers, the better the match.
                    Nothing is stored.
                  </p>

                  <ProfileForm
                    onResults={setResults}
                    onLoadingChange={setLoading}
                    loading={loading}
                  />
                </div>
              )}
            </div>
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
