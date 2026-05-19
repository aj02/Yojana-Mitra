"use client";

type Props = {
  words: string[];
  className?: string;
};

export function RotatingWord({ words, className }: Props) {
  const list = [...words, words[0]];
  return (
    <span className={`word-flip ${className ?? ""}`}>
      <span>
        {list.map((w, i) => (
          <span key={w + i} className="block text-gradient">
            {w}
          </span>
        ))}
      </span>
    </span>
  );
}
