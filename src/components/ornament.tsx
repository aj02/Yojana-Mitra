type Props = {
  className?: string;
  size?: number;
  color?: string;
};

export function Ornament({ className, size = 48, color = "currentColor" }: Props) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      style={{ color }}
    >
      <g stroke="currentColor" strokeWidth="1.5" fill="none">
        <circle cx="40" cy="40" r="36" />
        <circle cx="40" cy="40" r="22" />
        <circle cx="40" cy="40" r="8" />
        <path d="M40 4 V76 M4 40 H76 M14.6 14.6 L65.4 65.4 M14.6 65.4 L65.4 14.6" />
        <path d="M40 18 L48 30 L62 32 L52 42 L54 56 L40 50 L26 56 L28 42 L18 32 L32 30 Z" />
      </g>
      <circle cx="40" cy="40" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function StarBurst({ className, size = 28, color = "currentColor" }: Props) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      style={{ color }}
    >
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M16 2 V30 M2 16 H30 M5.5 5.5 L26.5 26.5 M5.5 26.5 L26.5 5.5" />
      </g>
    </svg>
  );
}

export function BlockPrintBand({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`flex items-center gap-3 overflow-hidden whitespace-nowrap ${className ?? ""}`}
    >
      <div className="marquee-track flex gap-8 shrink-0 text-[color:var(--cream-soft)]">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex gap-8 items-center shrink-0">
            {[
              "PENSIONS",
              "HOUSING",
              "SCHOLARSHIPS",
              "CASH TRANSFERS",
              "HEALTH COVER",
              "INSURANCE",
              "SKILL TRAINING",
              "MUDRA LOANS",
              "FREE LPG",
              "MATERNITY BENEFITS",
              "FARMER SUPPORT",
              "DISABILITY AID",
            ].map((w) => (
              <span key={w} className="flex items-center gap-3 shrink-0">
                <StarBurst size={14} />
                <span className="font-mono text-sm tracking-[0.2em]">{w}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CornerMark({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[color:var(--cream-soft)] ${className ?? ""}`}
    >
      <span className="h-px w-6 bg-[color:var(--cream-soft)]" />
      {label}
      <span className="h-px w-6 bg-[color:var(--cream-soft)]" />
    </div>
  );
}
