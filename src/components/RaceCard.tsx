"use client";

import { useState } from "react";
import { Race } from "@/types/ballot";

const categoryColors: Record<string, string> = {
  federal: "bg-blue-100 text-blue-800",
  state: "bg-purple-100 text-purple-800",
  local: "bg-green-100 text-green-800",
  judicial: "bg-amber-100 text-amber-800",
};

export default function RaceCard({ race }: { race: Race }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-navy-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 hover:bg-navy-50 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[race.category] || "bg-gray-100 text-gray-800"}`}
              >
                {race.category}
              </span>
              <span className="text-xs text-navy-400">
                {race.candidates.length} candidate
                {race.candidates.length !== 1 ? "s" : ""}
              </span>
            </div>
            <h3 className="font-semibold text-navy-900 text-base">
              {race.name}
            </h3>
          </div>
          <svg
            className={`w-5 h-5 text-navy-400 flex-shrink-0 transition-transform mt-1 ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-navy-100 p-4">
          {race.description && (
            <p className="text-sm text-navy-600 mb-4">{race.description}</p>
          )}
          <div className="space-y-3">
            {race.candidates.map((candidate, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-navy-50 rounded-lg"
              >
                <div className="w-10 h-10 rounded-full bg-navy-200 flex items-center justify-center text-navy-600 font-semibold text-sm flex-shrink-0">
                  {candidate.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-navy-900 text-sm">
                    {candidate.name}
                  </p>
                  <p className="text-xs text-navy-500">{candidate.party}</p>
                </div>
                {candidate.candidateUrl && (
                  <a
                    href={candidate.candidateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-civic-600 hover:text-civic-700 underline flex-shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Website
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
