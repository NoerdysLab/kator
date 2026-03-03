"use client";

import { useState } from "react";
import { BallotMeasure } from "@/types/ballot";

export default function MeasureCard({ measure }: { measure: BallotMeasure }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-navy-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 hover:bg-navy-50 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <span className="inline-block px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium mb-1">
              {measure.code}
            </span>
            <h3 className="font-semibold text-navy-900 text-base">
              {measure.title}
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
        <div className="border-t border-navy-100 p-4 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-navy-700 mb-1">
              Summary
            </h4>
            <p className="text-sm text-navy-600">{measure.summary}</p>
          </div>

          {measure.fiscalImpact && (
            <div className="p-3 bg-amber-50 rounded-lg">
              <h4 className="text-sm font-semibold text-amber-800 mb-1">
                Fiscal Impact
              </h4>
              <p className="text-sm text-amber-700">{measure.fiscalImpact}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {measure.proArguments.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-2">
                  Arguments For
                </h4>
                <ul className="space-y-1">
                  {measure.proArguments.map((arg, i) => (
                    <li
                      key={i}
                      className="text-sm text-navy-600 flex items-start gap-2"
                    >
                      <span className="text-green-500 mt-0.5 flex-shrink-0">
                        +
                      </span>
                      {arg}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {measure.conArguments.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-red-700 mb-2">
                  Arguments Against
                </h4>
                <ul className="space-y-1">
                  {measure.conArguments.map((arg, i) => (
                    <li
                      key={i}
                      className="text-sm text-navy-600 flex items-start gap-2"
                    >
                      <span className="text-red-500 mt-0.5 flex-shrink-0">
                        -
                      </span>
                      {arg}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
