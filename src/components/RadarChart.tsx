"use client";

import { PoliticalProfile, IssueCategory, ISSUE_LABELS } from "@/types/quiz";

interface Props {
  profile: PoliticalProfile;
  size?: number;
}

export default function RadarChart({ profile, size = 300 }: Props) {
  const categories = Object.keys(profile.scores) as IssueCategory[];
  const n = categories.length;
  if (n === 0) return null;

  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.38;

  // Generate points for a regular polygon
  const getPoint = (index: number, radius: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  // Create grid rings (3 levels)
  const rings = [0.33, 0.66, 1.0];
  const gridPaths = rings.map((r) => {
    const points = Array.from({ length: n }, (_, i) =>
      getPoint(i, maxR * r)
    );
    return (
      points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") +
      " Z"
    );
  });

  // Create data polygon
  // Map scores from [-1, 1] to [0.15, 1.0] for radius (min radius so shape is visible)
  const dataPoints = categories.map((cat, i) => {
    const score = profile.scores[cat];
    const normalized = (Math.abs(score) + 0.15) / 1.15; // stronger opinions = larger
    return getPoint(i, maxR * Math.max(normalized, 0.15));
  });

  const dataPath =
    dataPoints
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
      .join(" ") + " Z";

  // Label positions (slightly outside the chart)
  const labelPoints = categories.map((_, i) => getPoint(i, maxR + 28));

  return (
    <div className="flex justify-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width="100%"
        style={{ maxWidth: size }}
        className="overflow-visible"
      >
        {/* Grid lines from center to vertices */}
        {categories.map((_, i) => {
          const p = getPoint(i, maxR);
          return (
            <line
              key={`spoke-${i}`}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={1}
            />
          );
        })}

        {/* Grid rings */}
        {gridPaths.map((d, i) => (
          <path
            key={`ring-${i}`}
            d={d}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={1}
          />
        ))}

        {/* Data polygon */}
        <path
          d={dataPath}
          fill="rgba(59,130,246,0.25)"
          stroke="rgba(59,130,246,0.8)"
          strokeWidth={2}
        />

        {/* Data points */}
        {dataPoints.map((p, i) => (
          <circle
            key={`dot-${i}`}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="#3b82f6"
            stroke="white"
            strokeWidth={1.5}
          />
        ))}

        {/* Labels */}
        {categories.map((cat, i) => {
          const p = labelPoints[i];
          return (
            <text
              key={`label-${i}`}
              x={p.x}
              y={p.y}
              textAnchor={
                Math.abs(p.x - cx) < 10
                  ? "middle"
                  : p.x > cx
                    ? "start"
                    : "end"
              }
              dominantBaseline={
                Math.abs(p.y - cy) < 10
                  ? "middle"
                  : p.y > cy
                    ? "hanging"
                    : "auto"
              }
              className="fill-white/60 text-[10px] sm:text-[11px]"
            >
              {ISSUE_LABELS[cat]}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
