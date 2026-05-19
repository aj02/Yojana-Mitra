import type { Scheme } from "@/lib/schema";
import { ExternalLink, FileText } from "lucide-react";

type Props = { scheme: Scheme; index: number };

function isUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

const accentByCategory: Record<string, string> = {
  Health: "var(--vermilion)",
  Education: "var(--indigo)",
  Housing: "var(--marigold)",
  Employment: "var(--moss)",
  Agriculture: "var(--moss)",
  Pension: "var(--indigo)",
  Insurance: "var(--vermilion)",
  "Women & Child": "var(--vermilion)",
  "Skill Development": "var(--marigold)",
  "Financial Inclusion": "var(--moss)",
  "Social Security": "var(--indigo)",
  "Energy & Utilities": "var(--marigold)",
};

export function SchemeCard({ scheme, index }: Props) {
  const score = Math.round(scheme.match_score);
  const hasUrl = isUrl(scheme.official_url);
  const accent = accentByCategory[scheme.category] ?? "var(--marigold)";
  const tiltClass = index % 2 === 0 ? "" : "sm:rotate-stamp-r";

  return (
    <article
      className={`relative bg-[color:var(--cream)] text-[color:var(--night)] p-7 sm:p-9 stamp-shadow-night animate-in fade-in slide-in-from-bottom-2 ${tiltClass}`}
      style={{
        animationDelay: `${Math.min(index, 8) * 60}ms`,
        animationFillMode: "backwards",
        borderLeft: `8px solid ${accent}`,
      }}
    >
      {/* Stamp-style match badge */}
      <div
        aria-hidden
        className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-10 inline-flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 border-[3px] rotate-stamp font-mono"
        style={{
          borderColor: accent,
          color: accent,
          background: "var(--cream)",
        }}
      >
        <span className="text-[0.6rem] uppercase tracking-[0.2em]">Match</span>
        <span className="font-display text-3xl sm:text-4xl leading-none italic">{score}</span>
        <span className="text-[0.6rem] uppercase tracking-[0.2em]">/ 100</span>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-5 pr-24">
        <span
          className="font-mono text-[0.65rem] uppercase tracking-[0.25em] px-2.5 py-1 border-2"
          style={{ borderColor: accent, color: accent }}
        >
          {scheme.category}
        </span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] px-2.5 py-1 border-2 border-[color:var(--night)]">
          {scheme.level}
        </span>
      </div>

      <h3 className="font-display text-3xl sm:text-[2rem] leading-[1.05] text-[color:var(--night)] text-balance">
        {scheme.name}
      </h3>

      <div
        className="mt-5 p-4 sm:p-5"
        style={{ background: `${accent}1a` }}
      >
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] mb-1.5" style={{ color: accent }}>
          The benefit
        </p>
        <p className="text-[color:var(--night)] leading-snug text-pretty text-lg font-display">
          {scheme.benefit}
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 text-sm">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[color:var(--night)]/60 mb-1.5">
            Why you qualify
          </p>
          <p className="text-[color:var(--night)]/80 text-pretty leading-relaxed">
            {scheme.why_eligible}
          </p>
        </div>
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[color:var(--night)]/60 mb-1.5">
            How to apply
          </p>
          <p className="text-[color:var(--night)]/80 text-pretty leading-relaxed">
            {scheme.how_to_apply}
          </p>
        </div>
      </div>

      {scheme.key_documents.length > 0 && (
        <div className="mt-6">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[color:var(--night)]/60 mb-2 flex items-center gap-1.5">
            <FileText className="h-3 w-3" /> Documents to keep ready
          </p>
          <div className="flex flex-wrap gap-1.5">
            {scheme.key_documents.map((doc) => (
              <span
                key={doc}
                className="font-mono text-[0.7rem] uppercase tracking-[0.1em] border border-[color:var(--night)]/40 bg-transparent px-2 py-1 text-[color:var(--night)]/80"
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
          className="mt-7 inline-flex items-center gap-2 bg-[color:var(--night)] text-[color:var(--cream)] px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] border-2 border-[color:var(--night)] hover:bg-[color:var(--cream)] hover:text-[color:var(--night)] transition-colors"
        >
          Official portal <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </article>
  );
}
