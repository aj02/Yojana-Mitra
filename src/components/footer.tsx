import { BlockPrintBand, Ornament } from "./ornament";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-[color:var(--line)]">
      <div className="border-y border-[color:var(--line)] py-4">
        <BlockPrintBand />
      </div>
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10 grid gap-10 sm:grid-cols-3 text-sm">
        <div className="space-y-3">
          <div className="text-[color:var(--marigold)]">
            <Ornament size={28} />
          </div>
          <p className="font-display italic text-2xl text-[color:var(--cream)]">
            Yojana Mitra
          </p>
          <p className="text-[color:var(--cream-soft)] text-pretty leading-relaxed">
            A discovery layer for Indian welfare. Built so that more of what
            you&apos;re owed actually reaches you.
          </p>
        </div>
        <div className="space-y-3">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[color:var(--marigold)]">
            Disclaimer
          </p>
          <p className="text-[color:var(--cream-soft)] text-pretty leading-relaxed">
            AI-generated. Eligibility, deadlines, and amounts change. Always
            verify on the official Government of India or your state portal
            before applying. Not affiliated with any government body.
          </p>
        </div>
        <div className="space-y-3">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[color:var(--marigold)]">
            Privacy
          </p>
          <p className="text-[color:var(--cream-soft)] text-pretty leading-relaxed">
            No accounts. No tracking pixels. Profile data is sent once to
            generate matches and is not stored.
          </p>
        </div>
      </div>
      <div className="border-t border-[color:var(--line)]">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 py-4 flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[color:var(--cream-soft)]">
            © 2026 · Civic open-source
          </span>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[color:var(--cream-soft)]">
            Made with उम्मीद
          </span>
        </div>
      </div>
    </footer>
  );
}
