type Props = {
  number: string;
  title: string;
  hint?: string;
};

export function SectionHeader({ number, title, hint }: Props) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-baseline gap-3">
        <span
          className="font-display italic text-3xl sm:text-4xl"
          style={{ color: "var(--terracotta)" }}
        >
          {number}
        </span>
        <h2 className="font-display text-xl sm:text-2xl text-[color:var(--ink)]">
          {title}
        </h2>
      </div>
      {hint && (
        <p className="mt-2 text-sm text-[color:var(--ink-muted)]">{hint}</p>
      )}
    </div>
  );
}
