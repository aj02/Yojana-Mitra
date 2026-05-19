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
        {list.map((w) => (
          <span key={w} className="block">
            {w}
          </span>
        ))}
      </span>
    </span>
  );
}
