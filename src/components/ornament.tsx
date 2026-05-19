import { Sparkles } from "lucide-react";

export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <svg
        aria-hidden
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        className="relative"
      >
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="30" height="30" rx="9" fill="url(#logo-grad)" />
        <path
          d="M11 11 L21 11 M11 16 L21 16 M11 21 L17 21"
          stroke="rgba(8,8,12,0.85)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function Sparkle({ size = 16, className }: { size?: number; className?: string }) {
  return <Sparkles size={size} className={className} />;
}
