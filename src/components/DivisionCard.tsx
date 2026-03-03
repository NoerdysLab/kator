"use client";

import { Division } from "@/types/ballot";

const levelColors: Record<string, string> = {
  federal: "bg-blue-100 text-blue-800",
  state: "bg-purple-100 text-purple-800",
  local: "bg-green-100 text-green-800",
};

const levelIcons: Record<string, string> = {
  federal: "USA",
  state: "ST",
  local: "LOC",
};

export default function DivisionCard({ division }: { division: Division }) {
  return (
    <div className="bg-white rounded-lg border border-navy-100 shadow-sm p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center text-navy-500 font-semibold text-xs flex-shrink-0">
          {levelIcons[division.level] || "DIV"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${levelColors[division.level] || "bg-gray-100 text-gray-800"}`}
            >
              {division.level}
            </span>
          </div>
          <h3 className="font-medium text-navy-900 text-sm">
            {division.name}
          </h3>
          <p className="text-xs text-navy-400 font-mono mt-0.5 truncate">
            {division.ocdId}
          </p>
        </div>
      </div>
    </div>
  );
}
