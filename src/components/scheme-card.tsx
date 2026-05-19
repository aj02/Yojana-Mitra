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

export function SchemeCard({ scheme, index }: Props) {
  const score = Math.round(scheme.match_score);
  const hasUrl = isUrl(scheme.official_url);

  return (
    <article
      className="rounded-lg border border-[color:var(--line)] bg-[color:var(--paper-card)] p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-2"
      style={{ animationDelay: `${Math.min(index, 8) * 50}ms`, animationFillMode: "backwards" }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[color:var(--terracotta)] px-3 py-1 text-xs font-medium text-[color:var(--paper-card)]">
            {score}% match
          </span>
          <span className="rounded-full border border-[color:var(--line)] px-3 py-1 text-xs text-[color:var(--ink-soft)]">
            {scheme.category}
          </span>
          <span className="rounded-full bg-[color:var(--accent)] px-3 py-1 text-xs text-[color:var(--ink)]">
            {scheme.level}
          </span>
        </div>
      </div>

      <h3 className="font-display text-2xl sm:text-[1.625rem] leading-tight text-[color:var(--ink)] text-balance">
        {scheme.name}
      </h3>

      <p className="mt-4 border-l-2 border-[color:var(--terracotta)] pl-4 text-[color:var(--ink-soft)] text-pretty leading-relaxed">
        {scheme.benefit}
      </p>

      <div className="mt-6 space-y-4 text-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--ink-muted)] mb-1">
            Why you qualify
          </p>
          <p className="text-[color:var(--ink-soft)] text-pretty leading-relaxed">
            {scheme.why_eligible}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--ink-muted)] mb-1">
            How to apply
          </p>
          <p className="text-[color:var(--ink-soft)] text-pretty leading-relaxed">
            {scheme.how_to_apply}
          </p>
        </div>

        {scheme.key_documents.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--ink-muted)] mb-2 flex items-center gap-1.5">
              <FileText className="h-3 w-3" /> Documents you&apos;ll likely need
            </p>
            <div className="flex flex-wrap gap-1.5">
              {scheme.key_documents.map((doc) => (
                <span
                  key={doc}
                  className="rounded-md border border-[color:var(--line)] bg-[color:var(--paper)] px-2 py-1 text-xs text-[color:var(--ink-soft)]"
                >
                  {doc}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {hasUrl && (
        <a
          href={scheme.official_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--ink)] px-4 py-2 text-sm text-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-[color:var(--paper-card)] transition-colors"
        >
          Official portal <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </article>
  );
}
