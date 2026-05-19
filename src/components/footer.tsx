import { LogoMark } from "./ornament";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[color:var(--line)]">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-12 grid gap-10 sm:grid-cols-3 text-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <LogoMark size={28} />
            <span className="text-base font-semibold tracking-tight text-[color:var(--text-primary)]">
              Yojana Mitra
            </span>
          </div>
          <p className="text-[color:var(--text-secondary)] leading-relaxed text-pretty">
            A discovery layer for Indian welfare. Built so that more of what
            you&apos;re owed actually reaches you.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-[color:var(--text-muted)] font-medium">
            Disclaimer
          </p>
          <p className="text-[color:var(--text-secondary)] leading-relaxed text-pretty">
            AI-generated. Eligibility, deadlines, and amounts change. Always
            verify on the official Government of India or your state portal
            before applying.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-[color:var(--text-muted)] font-medium">
            Privacy
          </p>
          <p className="text-[color:var(--text-secondary)] leading-relaxed text-pretty">
            No accounts. No tracking pixels. Profile data is sent once to
            generate matches and is never stored.
          </p>
        </div>
      </div>
      <div className="border-t border-[color:var(--line)]">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[color:var(--text-muted)]">
          <span>© 2026 · Civic open-source</span>
          <span>Made for Bharat</span>
        </div>
      </div>
    </footer>
  );
}
