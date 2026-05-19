import Link from "next/link";
import { Ornament } from "./ornament";

export function Header() {
  return (
    <header className="w-full border-b border-[color:var(--line)]">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <Ornament size={24} />
          <span className="font-display text-lg tracking-tight text-[color:var(--ink)] group-hover:text-[color:var(--terracotta)] transition-colors">
            Yojana Mitra
          </span>
        </Link>
        <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)] hidden sm:block">
          A civic guide
        </span>
      </div>
    </header>
  );
}
