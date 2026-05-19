import Link from "next/link";
import { Ornament } from "./ornament";

export function Header() {
  return (
    <header className="relative w-full border-b border-[color:var(--line)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="text-[color:var(--marigold)] transition-transform group-hover:rotate-90 duration-500">
            <Ornament size={32} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display italic text-2xl tracking-tight text-[color:var(--cream)]">
              Yojana
            </span>
            <span className="font-display italic text-2xl tracking-tight text-[color:var(--marigold)] -mt-1">
              Mitra
            </span>
          </div>
        </Link>
        <div className="hidden sm:flex items-center gap-4">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[color:var(--cream-soft)]">
            Est. 2026 · A civic guide
          </span>
          <span className="h-8 w-px bg-[color:var(--line)]" />
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[color:var(--marigold)]">
            For Bharat
          </span>
        </div>
      </div>
    </header>
  );
}
