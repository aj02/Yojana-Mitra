type Props = {
  number: string;
  title: string;
  hint?: string;
};

export function SectionHeader({ number, title, hint }: Props) {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex items-center gap-3 mb-3">
        <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-[color:var(--surface-2)] border border-[color:var(--line)] text-xs font-mono text-[color:var(--text-secondary)]">
          {number}
        </span>
        <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-muted)] font-medium">
          Step {number}
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[color:var(--text-primary)] text-balance">
        {title}
      </h2>
      {hint && (
        <p className="mt-2 text-[color:var(--text-secondary)] text-pretty leading-relaxed max-w-prose">
          {hint}
        </p>
      )}
    </div>
  );
}
