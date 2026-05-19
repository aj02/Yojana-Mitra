"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  SCHEME_FACTS,
  CATEGORY_COLORS,
  LOADING_STEPS,
  type SchemeFact,
} from "@/lib/scheme-facts";
import {
  Heart,
  Wheat,
  Home,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  Wallet,
  Flame,
  Hammer,
  Crown,
  ScanSearch,
} from "lucide-react";

const ICONS: Record<SchemeFact["category"], React.ComponentType<{ className?: string }>> = {
  health: Heart,
  agri: Wheat,
  housing: Home,
  pension: Crown,
  insurance: ShieldCheck,
  women: Sparkles,
  youth: GraduationCap,
  banking: Wallet,
  energy: Flame,
  skill: Hammer,
};

const FACT_INTERVAL = 2600; // ms per fact
const STEP_INTERVAL = 1300; // ms per step pulse

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function LoadingTheatre() {
  const queue = useMemo(() => shuffle(SCHEME_FACTS), []);
  const [factIdx, setFactIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = performance.now();
    const f = setInterval(() => {
      setFactIdx((i) => (i + 1) % queue.length);
    }, FACT_INTERVAL);
    const s = setInterval(() => {
      setStepIdx((i) => Math.min(LOADING_STEPS.length - 1, i + 1));
    }, STEP_INTERVAL);
    const t = setInterval(() => {
      if (startRef.current != null) {
        setElapsed(performance.now() - startRef.current);
      }
    }, 200);
    return () => {
      clearInterval(f);
      clearInterval(s);
      clearInterval(t);
    };
  }, [queue.length]);

  const fact = queue[factIdx];
  const accent = CATEGORY_COLORS[fact.category];
  const Icon = ICONS[fact.category];
  const seconds = (elapsed / 1000).toFixed(1);

  return (
    <div className="relative overflow-hidden rounded-3xl glass-strong p-6 sm:p-10">
      {/* Ambient gradient that shifts color */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full blur-3xl opacity-60 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${accent.from}, transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full blur-3xl opacity-50 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${accent.to}, transparent 70%)`,
        }}
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--surface-2)] border border-[color:var(--line)] px-3 py-1.5 text-xs text-[color:var(--text-secondary)]">
            <ScanSearch className="h-3.5 w-3.5 text-[color:var(--violet)] animate-pulse" />
            Matching in progress
          </div>
          <span className="font-mono text-xs text-[color:var(--text-muted)] tabular-nums">
            {seconds}s
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.05] text-balance mb-2">
          <span className="text-gradient-soft">Finding the schemes built for </span>
          <span className="text-gradient">you.</span>
        </h2>
        <p className="text-[color:var(--text-secondary)] text-pretty leading-relaxed">
          While you wait, a glimpse of what India already runs.
        </p>

        {/* Rotating fact card */}
        <div
          key={factIdx}
          className="relative mt-8 rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-5 sm:p-6 animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg shrink-0"
              style={{
                background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
              }}
            >
              <Icon className="h-4.5 w-4.5" />
            </div>
            <span
              className="text-xs font-medium uppercase tracking-[0.12em]"
              style={{ color: accent.from }}
            >
              Did you know?
            </span>
          </div>

          <p className="text-xl sm:text-2xl font-semibold tracking-tight text-[color:var(--text-primary)] leading-tight text-balance">
            {fact.name}
          </p>
          <p className="mt-1 text-xs text-[color:var(--text-muted)] uppercase tracking-wider">
            {fact.meta}
          </p>

          <p className="mt-4 text-[color:var(--text-primary)] leading-relaxed text-pretty">
            {fact.benefit}
          </p>
          <p
            className="mt-3 border-l-2 pl-3 text-sm text-[color:var(--text-secondary)] text-pretty leading-relaxed"
            style={{ borderColor: accent.from }}
          >
            {fact.fact}
          </p>
        </div>

        {/* Step progress */}
        <div className="mt-8 space-y-4">
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/8">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[color:var(--violet)] via-[color:var(--pink)] to-[color:var(--cyan)] transition-all duration-700"
              style={{
                width: `${((stepIdx + 1) / LOADING_STEPS.length) * 100}%`,
              }}
            />
            <div className="absolute inset-0 shimmer" aria-hidden />
          </div>

          <ul className="grid gap-1.5 sm:grid-cols-2">
            {LOADING_STEPS.map((label, i) => {
              const done = i < stepIdx;
              const active = i === stepIdx;
              return (
                <li
                  key={label}
                  className="flex items-center gap-2 text-xs"
                >
                  <span
                    className={
                      "inline-flex h-4 w-4 items-center justify-center rounded-full border transition-all " +
                      (done
                        ? "bg-gradient-to-br from-[color:var(--emerald)] to-[color:var(--cyan)] border-transparent text-white"
                        : active
                        ? "border-[color:var(--violet)] bg-[color:var(--violet)]/20 text-[color:var(--violet)] animate-pulse"
                        : "border-[color:var(--line)] text-[color:var(--text-muted)]")
                    }
                  >
                    {done ? (
                      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
                        <path
                          d="M2 6 L5 9 L10 3"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    )}
                  </span>
                  <span
                    className={
                      done
                        ? "text-[color:var(--text-secondary)] line-through decoration-[color:var(--line)]"
                        : active
                        ? "text-[color:var(--text-primary)]"
                        : "text-[color:var(--text-muted)]"
                    }
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-8 text-xs text-[color:var(--text-muted)] text-center">
          This usually takes 5–8 seconds. Don&apos;t close the tab.
        </p>
      </div>
    </div>
  );
}
