"use client";

import { useState } from "react";
import Link from "next/link";
import { CuratedCandidate, ISSUE_LABELS } from "@/types/quiz";
import { MatchResult } from "@/types/quiz";
import MatchBadge from "./MatchBadge";

interface Props {
  candidate: CuratedCandidate;
  match?: MatchResult;
  raceId: string;
  compact?: boolean;
}

export default function CandidateCard({
  candidate,
  match,
  raceId,
  compact = false,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="bg-white rounded-xl border border-navy-100 shadow-sm overflow-hidden">
      <div
        className="p-4 sm:p-5 flex items-start gap-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-navy-100 flex items-center justify-center text-navy-500 font-bold text-sm flex-shrink-0">
          {initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-navy-900">{candidate.name}</h3>
            {candidate.isIncumbent && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-navy-100 text-navy-500 font-medium">
                Incumbent
              </span>
            )}
          </div>
          <p className="text-sm text-navy-400">
            {candidate.party}
          </p>
          {!compact && (
            <p className="text-sm text-navy-500 mt-1 line-clamp-2">
              {candidate.bio}
            </p>
          )}

          {/* Agreement/disagreement pills */}
          {match && !compact && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {match.agreements.slice(0, 3).map((cat) => (
                <span
                  key={cat}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200"
                >
                  {ISSUE_LABELS[cat]}
                </span>
              ))}
              {match.disagreements.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200"
                >
                  {ISSUE_LABELS[cat]}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Match badge */}
        {match && <MatchBadge score={match.overallScore} size={compact ? "sm" : "md"} />}

        {/* Expand arrow */}
        <svg
          className={`w-5 h-5 text-navy-300 flex-shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 sm:px-5 pb-5 border-t border-navy-50">
          {/* Issue positions */}
          <div className="mt-4">
            <h4 className="text-xs font-semibold text-navy-400 uppercase tracking-wide mb-3">
              Issue Positions
            </h4>
            <div className="space-y-2">
              {candidate.positions.map((pos) => {
                const catMatch = match?.categoryScores[pos.category];
                return (
                  <div key={pos.category} className="flex items-start gap-2">
                    {catMatch && (
                      <span
                        className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                          catMatch.agree ? "bg-green-400" : "bg-red-400"
                        }`}
                      />
                    )}
                    <div>
                      <span className="text-xs font-medium text-navy-500">
                        {ISSUE_LABELS[pos.category]}:
                      </span>{" "}
                      <span className="text-xs text-navy-600">
                        {pos.position}
                      </span>
                      {pos.priorPosition && (
                        <span className="text-xs text-amber-600 ml-1">
                          (Previously: {pos.priorPosition})
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Endorsements */}
          {candidate.endorsements.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-navy-400 uppercase tracking-wide mb-2">
                Endorsements
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {candidate.endorsements.map((e) => (
                  <span
                    key={e.name}
                    className="text-xs px-2 py-0.5 rounded-full bg-navy-50 text-navy-600"
                  >
                    {e.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Voting history */}
          {candidate.votingHistory.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-navy-400 uppercase tracking-wide mb-2">
                Voting Record
              </h4>
              <div className="space-y-2">
                {candidate.votingHistory.map((v) => (
                  <div
                    key={v.bill}
                    className="text-xs flex items-start gap-2"
                  >
                    <span
                      className={`mt-0.5 px-1.5 py-0.5 rounded text-white font-medium ${
                        v.vote === "yes"
                          ? "bg-green-500"
                          : v.vote === "no"
                            ? "bg-red-500"
                            : "bg-gray-400"
                      }`}
                    >
                      {v.vote.toUpperCase()}
                    </span>
                    <div>
                      <span className="font-medium text-navy-700">
                        {v.bill}
                      </span>
                      <span className="text-navy-400 ml-1">
                        — {v.summary}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="mt-4 flex gap-3">
            {candidate.website && (
              <a
                href={candidate.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-civic-600 hover:underline"
              >
                Campaign Website
              </a>
            )}
            <Link
              href={`/race/${raceId}`}
              className="text-xs text-civic-600 hover:underline"
            >
              Full Race Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
