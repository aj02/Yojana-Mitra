type Props = {
  className?: string;
  size?: number;
};

export function Ornament({ className, size = 28 }: Props) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      style={{ color: "var(--ink-muted)" }}
    >
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="8"
        y="8"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="1"
        transform="rotate(45 20 20)"
      />
      <rect
        x="14"
        y="14"
        width="12"
        height="12"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="20" cy="20" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function OrnamentDivider({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 my-12 ${className ?? ""}`}>
      <span aria-hidden className="h-px flex-1 max-w-[8rem] bg-[color:var(--line)]" />
      <Ornament size={22} />
      <span aria-hidden className="h-px flex-1 max-w-[8rem] bg-[color:var(--line)]" />
    </div>
  );
}
