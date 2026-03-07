"use client";

import { getMatchBgColor, getMatchLabel } from "@/lib/matching";

interface Props {
  score: number;
  size?: "sm" | "md" | "lg";
}

export default function MatchBadge({ score, size = "md" }: Props) {
  const bgColor = getMatchBgColor(score);
  const label = getMatchLabel(score);

  const sizeClasses = {
    sm: "w-10 h-10 text-xs",
    md: "w-14 h-14 text-sm",
    lg: "w-20 h-20 text-lg",
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${sizeClasses[size]} ${bgColor} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}
      >
        {score}%
      </div>
      {size !== "sm" && (
        <span className="text-xs text-navy-400 font-medium">{label}</span>
      )}
    </div>
  );
}
