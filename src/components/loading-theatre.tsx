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
  CheckCircle2,
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

const FACT_INTERVAL = 2800;
const STEP_INTERVAL = 1300;
const TARGET_SCANS = 950;

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
  const [scanned, setScanned] = useState(0);
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
        const el = performance.now() - startRef.current;
        setElapsed(el);
        // Scan counter — ease out toward TARGET_SCANS, capped
        const expected = Math.min(
          TARGET_SCANS,
          Math.round((el / 8000) * TARGET_SCANS + Math.random() * 6)
        );
        setScanned(expected);
      }
    }, 120);
    return () => {
      clearInterval(f);
      clearInterval(s);
      clearInterval(t);
    };
  }, [queue.length]);

  const fact = queue[factIdx];
  const nextFact = queue[(factIdx + 1) % queue.length];
  const accent = CATEGORY_COLORS[fact.category];
  const Icon = ICONS[fact.category];
  const seconds = (elapsed / 1000).toFixed(1);

  return (
    <div className="relative overflow-hidden rounded-3xl glass-strong p-5 sm:p-8">
      {/* Color-shifting ambient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full blur-3xl opacity-70 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle, ${accent.from}, transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full blur-3xl opacity-50 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle, ${accent.to}, transparent 70%)`,
        }}
      />

      <div className="relative">
        {/* Status row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--surface-2)] border border-[color:var(--line)] px-3 py-1.5 text-xs text-[color:var(--text-secondary)]">
            <ScanSearch className="h-3.5 w-3.5 text-[color:var(--violet)] animate-pulse" />
            <span>Matching · {LOADING_STEPS[stepIdx]}</span>
          </div>
          <span className="font-mono text-xs text-[color:var(--text-muted)] tabular-nums">
            {seconds}s
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-[1.1] text-balance">
          <span className="text-gradient-soft">Finding schemes built for </span>
          <span className="text-gradient">you.</span>
        </h2>
        <p className="mt-1 text-sm text-[color:var(--text-secondary)] leading-relaxed">
          While you wait — a glimpse of what India already runs.
        </p>

        {/* Scan counter */}
        <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
          <StatTile
            label="Scanned"
            value={scanned.toString()}
            suffix={`/${TARGET_SCANS}`}
            accent="var(--violet)"
          />
          <StatTile
            label="Eligible"
            value={Math.max(0, Math.floor(scanned * 0.018)).toString()}
            suffix=""
            accent="var(--emerald)"
          />
          <StatTile
            label="Top match"
            value={
              scanned > 50
                ? Math.min(99, 80 + Math.floor(scanned / 60)).toString() + "%"
                : "—"
            }
            suffix=""
            accent="var(--pink)"
          />
        </div>

        {/* 3D Card stack */}
        <div
          className="relative mt-7 mb-6"
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
          {/* Back card (next fact preview) */}
          <div
            aria-hidden
            key={`back-${factIdx}`}
            className="absolute inset-0 mx-6 sm:mx-10 rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] opacity-30 blur-[1px] pointer-events-none animate-in fade-in duration-700"
            style={{
              transform: "translateY(-22px) translateZ(-60px) scale(0.92)",
            }}
          >
            <div className="h-full w-full p-5">
              <div className="h-3 w-24 rounded-full bg-white/10 mb-3" />
              <div className="h-6 w-3/4 rounded-md bg-white/10 mb-2" />
              <div className="h-3 w-1/3 rounded-md bg-white/8" />
            </div>
          </div>

          {/* Active fact card */}
          <div
            key={`active-${factIdx}`}
            className="relative rounded-2xl border bg-[color:var(--surface)] p-6 sm:p-7 animate-in fade-in slide-in-from-bottom-3 duration-500 overflow-hidden"
            style={{
              borderColor: `${accent.from}40`,
              boxShadow: `0 24px 60px -24px ${accent.from}30, 0 0 0 1px ${accent.from}18 inset`,
            }}
          >
            {/* Glow strip on top */}
            <div
              aria-hidden
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent.from}, transparent)`,
              }}
            />

            <div className="flex items-start justify-between gap-4 mb-4">
              <div
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                  boxShadow: `0 8px 24px -8px ${accent.from}`,
                }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-right">
                <span
                  className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: accent.from }}
                >
                  Did you know
                </span>
                <span className="block text-[0.65rem] uppercase tracking-wider text-[color:var(--text-muted)] mt-0.5">
                  Fact · {factIdx + 1} of {queue.length}
                </span>
              </div>
            </div>

            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] leading-[1.1] text-balance">
              {fact.name}
            </p>
            <p className="mt-1 text-xs text-[color:var(--text-muted)] uppercase tracking-[0.12em]">
              {fact.meta}
            </p>

            <div
              className="mt-5 rounded-xl p-4"
              style={{
                background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}10)`,
              }}
            >
              <p
                className="text-[0.65rem] uppercase tracking-[0.18em] mb-1.5 font-semibold"
                style={{ color: accent.from }}
              >
                The benefit
              </p>
              <p className="text-base sm:text-lg font-medium text-[color:var(--text-primary)] leading-snug text-pretty">
                {fact.benefit}
              </p>
            </div>

            <div className="mt-4 flex items-start gap-2.5">
              <CheckCircle2
                className="h-4 w-4 mt-0.5 shrink-0"
                style={{ color: accent.from }}
              />
              <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed text-pretty">
                {fact.fact}
              </p>
            </div>

            {/* Up-next preview */}
            <div className="mt-5 pt-4 border-t border-[color:var(--line)] flex items-center justify-between gap-3">
              <span className="text-[0.65rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                Up next
              </span>
              <span className="text-xs text-[color:var(--text-secondary)] truncate">
                {nextFact.name}
              </span>
            </div>
          </div>
        </div>

        {/* Scheme name ticker */}
        <div className="relative -mx-5 sm:-mx-8 mb-6 border-y border-[color:var(--line)] py-2.5 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[color:var(--background-base)] to-transparent z-10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[color:var(--background-base)] to-transparent z-10"
          />
          <div className="flex gap-6 overflow-hidden whitespace-nowrap">
            <div className="flex gap-6 marquee-track shrink-0">
              {[...SCHEME_FACTS, ...SCHEME_FACTS].map((s, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 shrink-0 text-xs text-[color:var(--text-muted)]"
                >
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{
                      background: CATEGORY_COLORS[s.category].from,
                    }}
                  />
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Step progress */}
        <div className="space-y-3">
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[color:var(--violet)] via-[color:var(--pink)] to-[color:var(--cyan)] transition-all duration-700 ease-out"
              style={{
                width: `${((stepIdx + 1) / LOADING_STEPS.length) * 100}%`,
              }}
            />
            <div className="absolute inset-0 shimmer pointer-events-none" aria-hidden />
          </div>

          <ul className="grid gap-x-3 gap-y-1.5 sm:grid-cols-2 text-xs">
            {LOADING_STEPS.map((label, i) => {
              const done = i < stepIdx;
              const active = i === stepIdx;
              return (
                <li key={label} className="flex items-center gap-2">
                  <span
                    className={
                      "inline-flex h-4 w-4 items-center justify-center rounded-full border transition-all shrink-0 " +
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
                        ? "text-[color:var(--text-secondary)]"
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

        <p className="mt-6 text-xs text-[color:var(--text-muted)] text-center">
          Usually 5–8 seconds. Don&apos;t close the tab.
        </p>
      </div>
    </div>
  );
}

function StatTile({
  label,
  value,
  suffix,
  accent,
}: {
  label: string;
  value: string;
  suffix: string;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] px-3 py-2.5">
      <div className="text-[0.6rem] uppercase tracking-[0.18em] text-[color:var(--text-muted)] font-medium">
        {label}
      </div>
      <div className="flex items-baseline gap-1 mt-0.5">
        <span
          className="text-xl sm:text-2xl font-semibold tabular-nums tracking-tight leading-none"
          style={{ color: accent }}
        >
          {value}
        </span>
        {suffix && (
          <span className="text-xs text-[color:var(--text-muted)] tabular-nums">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
