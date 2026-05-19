import type { Scheme } from "@/lib/schema";
import { ExternalLink, FileText, Sparkles } from "lucide-react";

type Props = { scheme: Scheme; index: number };

function isUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

const accentByCategory: Record<string, { from: string; to: string; ring: string }> = {
  Health:               { from: "#ec4899", to: "#f97316", ring: "rgba(236, 72, 153, 0.4)" },
  Education:            { from: "#06b6d4", to: "#3b82f6", ring: "rgba(6, 182, 212, 0.4)" },
  Housing:              { from: "#a855f7", to: "#ec4899", ring: "rgba(168, 85, 247, 0.4)" },
  Employment:           { from: "#10b981", to: "#06b6d4", ring: "rgba(16, 185, 129, 0.4)" },
  Agriculture:          { from: "#10b981", to: "#84cc16", ring: "rgba(16, 185, 129, 0.4)" },
  Pension:              { from: "#3b82f6", to: "#a855f7", ring: "rgba(59, 130, 246, 0.4)" },
  Insurance:            { from: "#ec4899", to: "#a855f7", ring: "rgba(236, 72, 153, 0.4)" },
  "Women & Child":      { from: "#ec4899", to: "#a855f7", ring: "rgba(236, 72, 153, 0.4)" },
  "Skill Development":  { from: "#a855f7", to: "#06b6d4", ring: "rgba(168, 85, 247, 0.4)" },
  "Financial Inclusion":{ from: "#06b6d4", to: "#10b981", ring: "rgba(6, 182, 212, 0.4)" },
  "Social Security":    { from: "#3b82f6", to: "#06b6d4", ring: "rgba(59, 130, 246, 0.4)" },
  "Energy & Utilities": { from: "#f59e0b", to: "#ec4899", ring: "rgba(245, 158, 11, 0.4)" },
};

export function SchemeCard({ scheme, index }: Props) {
  const score = Math.round(scheme.match_score);
  const hasUrl = isUrl(scheme.official_url);
  const accent = accentByCategory[scheme.category] ?? { from: "#a855f7", to: "#06b6d4", ring: "rgba(168, 85, 247, 0.4)" };

  return (
    <article
      className="group relative glass rounded-2xl p-6 sm:p-7 hover:bg-[color:var(--surface-2)] transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 overflow-hidden"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms`, animationFillMode: "backwards" }}
    >
      {/* Glow accent on hover */}
      <div
        aria-hidden
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at 30% 0%, ${accent.ring}, transparent 40%)`,
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-white"
              style={{
                background: `linear-gradient(110deg, ${accent.from}, ${accent.to})`,
              }}
            >
              <Sparkles className="h-3 w-3" />
              {scheme.category}
            </span>
            <span className="inline-flex rounded-full bg-[color:var(--surface-2)] border border-[color:var(--line)] px-2.5 py-1 text-xs text-[color:var(--text-secondary)]">
              {scheme.level}
            </span>
          </div>

          {/* Match score ring */}
          <div className="shrink-0 relative">
            <div className="relative h-14 w-14 sm:h-16 sm:w-16">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <defs>
                  <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={accent.from} />
                    <stop offset="100%" stopColor={accent.to} />
                  </linearGradient>
                </defs>
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke={`url(#grad-${index})`}
                  strokeWidth="3"
                  strokeDasharray={`${score}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                <span className="text-base sm:text-lg font-semibold text-[color:var(--text-primary)]">
                  {score}
                </span>
                <span className="text-[0.55rem] uppercase tracking-wider text-[color:var(--text-muted)] mt-0.5">
                  match
                </span>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[color:var(--text-primary)] text-balance mb-3 leading-tight">
          {scheme.name}
        </h3>

        <p className="text-[color:var(--text-primary)] text-pretty leading-relaxed mb-5">
          {scheme.benefit}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 text-sm mb-5">
          <div>
            <p className="text-xs uppercase tracking-wider text-[color:var(--text-muted)] mb-1.5">
              Why you qualify
            </p>
            <p className="text-[color:var(--text-secondary)] text-pretty leading-relaxed">
              {scheme.why_eligible}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[color:var(--text-muted)] mb-1.5">
              How to apply
            </p>
            <p className="text-[color:var(--text-secondary)] text-pretty leading-relaxed">
              {scheme.how_to_apply}
            </p>
          </div>
        </div>

        {scheme.key_documents.length > 0 && (
          <div className="mb-5">
            <p className="text-xs uppercase tracking-wider text-[color:var(--text-muted)] mb-2 flex items-center gap-1.5">
              <FileText className="h-3 w-3" /> Documents to keep ready
            </p>
            <div className="flex flex-wrap gap-1.5">
              {scheme.key_documents.map((doc) => (
                <span
                  key={doc}
                  className="rounded-full bg-[color:var(--surface-2)] border border-[color:var(--line)] px-2.5 py-1 text-xs text-[color:var(--text-secondary)]"
                >
                  {doc}
                </span>
              ))}
            </div>
          </div>
        )}

        {hasUrl && (
          <a
            href={scheme.official_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white text-[color:var(--background-base)] px-4 py-2 text-sm font-medium hover:bg-[color:var(--text-primary)] hover:shadow-[0_8px_24px_-8px_rgba(255,255,255,0.4)] transition-all"
          >
            Official portal <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </article>
  );
}
