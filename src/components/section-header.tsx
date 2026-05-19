type Props = {
  number: string;
  title: string;
  hint?: string;
};

export function SectionHeader({ number, title, hint }: Props) {
  return (
    <div className="mb-10 sm:mb-12">
      <div className="flex items-start gap-5 sm:gap-6">
        <div className="shrink-0 inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 border-2 border-[color:var(--marigold)] bg-transparent rotate-stamp">
          <span className="font-display italic text-2xl sm:text-3xl text-[color:var(--marigold)]">
            {number}
          </span>
        </div>
        <div className="flex-1 pt-1">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[color:var(--cream-soft)] mb-1">
            Section · {number}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl leading-[1.05] text-[color:var(--cream)] text-balance">
            {title}
          </h2>
          {hint && (
            <p className="mt-3 text-[color:var(--cream-soft)] text-pretty leading-relaxed max-w-prose">
              {hint}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
