import Link from "next/link";
import { LogoMark } from "./ornament";

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-[color:var(--line)] backdrop-blur-xl bg-[color:var(--background-base)]/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8 py-3.5">
        <Link href="/" className="flex items-center gap-2.5 group">
          <LogoMark size={30} />
          <span className="text-base font-semibold tracking-tight text-[color:var(--text-primary)]">
            Yojana Mitra
          </span>
        </Link>
        <div className="hidden sm:flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--surface-2)] border border-[color:var(--line)] px-3 py-1.5 text-xs text-[color:var(--text-secondary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--emerald)] animate-pulse" />
            Live · 950+ schemes indexed
          </span>
        </div>
      </div>
    </header>
  );
}
