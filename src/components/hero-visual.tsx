"use client";

import { useEffect, useRef } from "react";
import { Sparkles, Heart, Home, GraduationCap, Wheat, Shield } from "lucide-react";

type CardSpec = {
  name: string;
  meta: string;
  match: number;
  icon: React.ComponentType<{ className?: string }>;
  from: string;
  to: string;
  /** Position percentages relative to stage */
  x: number;
  y: number;
  /** Z depth in px */
  z: number;
  /** Continuous rotation base */
  rotX: number;
  rotY: number;
  /** Float animation delay (s) */
  delay: number;
};

const CARDS: CardSpec[] = [
  {
    name: "PM-KISAN",
    meta: "Agriculture · Central",
    match: 96,
    icon: Wheat,
    from: "#10b981",
    to: "#84cc16",
    x: 8, y: 12, z: 80,
    rotX: -6, rotY: 14, delay: 0,
  },
  {
    name: "Ayushman Bharat",
    meta: "Health · Central",
    match: 92,
    icon: Heart,
    from: "#ec4899",
    to: "#f97316",
    x: 52, y: 4, z: 160,
    rotX: -3, rotY: -10, delay: 1.6,
  },
  {
    name: "PMAY-G",
    meta: "Housing · Central",
    match: 88,
    icon: Home,
    from: "#a855f7",
    to: "#ec4899",
    x: 20, y: 48, z: 40,
    rotX: 4, rotY: 8, delay: 0.8,
  },
  {
    name: "Ladki Bahin",
    meta: "Women · Maharashtra",
    match: 95,
    icon: Sparkles,
    from: "#06b6d4",
    to: "#3b82f6",
    x: 62, y: 44, z: 120,
    rotX: 2, rotY: -6, delay: 2.2,
  },
  {
    name: "PMJJBY",
    meta: "Insurance · Central",
    match: 78,
    icon: Shield,
    from: "#3b82f6",
    to: "#a855f7",
    x: 4, y: 76, z: 100,
    rotX: 6, rotY: 10, delay: 3.0,
  },
  {
    name: "NMMS Scholarship",
    meta: "Education · Central",
    match: 84,
    icon: GraduationCap,
    from: "#f59e0b",
    to: "#ec4899",
    x: 56, y: 80, z: 60,
    rotX: 5, rotY: -8, delay: 1.2,
  },
];

export function HeroVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    function onMove(e: PointerEvent) {
      const rect = stage!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      targetRef.current.x = px;
      targetRef.current.y = py;
    }
    function onLeave() {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
    }
    function tick() {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.08;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.08;
      if (stage) {
        const rx = -currentRef.current.y * 14;
        const ry = currentRef.current.x * 18;
        stage.style.setProperty("--mx", `${ry}deg`);
        stage.style.setProperty("--my", `${rx}deg`);
        stage.style.setProperty("--px", `${currentRef.current.x * 30}px`);
        stage.style.setProperty("--py", `${currentRef.current.y * 30}px`);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      aria-hidden
      className="hero-stage relative w-full h-[480px] sm:h-[560px] select-none"
      style={
        {
          perspective: "1400px",
          perspectiveOrigin: "50% 45%",
        } as React.CSSProperties
      }
    >
      {/* Ambient orb (light source) */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[360px] w-[360px] sm:h-[420px] sm:w-[420px] rounded-full pointer-events-none orb-pulse"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(168,85,247,0.55), rgba(236,72,153,0.35) 35%, transparent 65%)",
          filter: "blur(40px)",
          transform: "translate(-50%, -50%) translateZ(-200px)",
          transformStyle: "preserve-3d",
        }}
      />

      {/* 3D card stack */}
      <div
        className="absolute inset-0 hero-tilt"
        style={{
          transformStyle: "preserve-3d",
          transform:
            "rotateX(var(--my,0deg)) rotateY(var(--mx,0deg)) translate3d(var(--px,0px), var(--py,0px), 0)",
          transition: "transform 60ms linear",
        }}
      >
        {CARDS.map((c, i) => (
          <FloatCard key={c.name} spec={c} index={i} />
        ))}

        {/* Faint constellation dots in 3D */}
        {Array.from({ length: 14 }).map((_, i) => {
          const seedX = (i * 37) % 100;
          const seedY = (i * 53) % 100;
          const seedZ = ((i * 71) % 220) - 110;
          return (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/30 dot-twinkle"
              style={{
                left: `${seedX}%`,
                top: `${seedY}%`,
                transform: `translateZ(${seedZ}px)`,
                animationDelay: `${(i * 0.3) % 4}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function FloatCard({ spec, index }: { spec: CardSpec; index: number }) {
  const Icon = spec.icon;
  return (
    <div
      className="absolute float-card"
      style={{
        left: `${spec.x}%`,
        top: `${spec.y}%`,
        width: "min(60vw, 230px)",
        transform: `translateZ(${spec.z}px) rotateX(${spec.rotX}deg) rotateY(${spec.rotY}deg)`,
        transformStyle: "preserve-3d",
        animationDelay: `${spec.delay}s`,
        zIndex: 10 + index,
      }}
    >
      <div
        className="relative rounded-2xl p-4 sm:p-5 glass-strong shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
          borderColor: "rgba(255,255,255,0.12)",
        }}
      >
        {/* Gradient halo */}
        <div
          className="absolute -top-10 -right-10 h-24 w-24 rounded-full opacity-70"
          style={{
            background: `radial-gradient(circle, ${spec.from}, transparent 70%)`,
            filter: "blur(20px)",
          }}
        />

        <div className="relative flex items-start justify-between gap-3 mb-3">
          <div
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${spec.from}, ${spec.to})`,
            }}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div className="relative h-10 w-10 shrink-0">
            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
              <defs>
                <linearGradient id={`hg-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={spec.from} />
                  <stop offset="100%" stopColor={spec.to} />
                </linearGradient>
              </defs>
              <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.9155" fill="none"
                stroke={`url(#hg-${index})`}
                strokeWidth="3"
                strokeDasharray={`${spec.match}, 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[0.7rem] font-semibold text-white">
              {spec.match}
            </div>
          </div>
        </div>

        <p className="relative text-sm font-semibold text-white leading-tight">
          {spec.name}
        </p>
        <p className="relative text-[0.7rem] text-white/60 mt-0.5">{spec.meta}</p>

        <div className="relative mt-3 h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${spec.match}%`,
              background: `linear-gradient(90deg, ${spec.from}, ${spec.to})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
