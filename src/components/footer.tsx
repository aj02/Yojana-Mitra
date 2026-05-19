import { Ornament } from "./ornament";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[color:var(--line)]">
      <div className="mx-auto max-w-2xl px-6 py-10 sm:px-8 text-sm text-[color:var(--ink-muted)] space-y-4">
        <div className="flex items-center gap-3">
          <Ornament size={18} />
          <span className="font-display text-[color:var(--ink)]">Yojana Mitra</span>
        </div>
        <p className="text-pretty leading-relaxed">
          AI-generated suggestions. Always verify scheme details, eligibility,
          deadlines and application steps on the official Government of India
          and your state portal before applying. This site is not affiliated
          with any government body.
        </p>
        <p className="text-xs">
          Built with public scheme data and large language models. No personal
          data is stored.
        </p>
      </div>
    </footer>
  );
}
