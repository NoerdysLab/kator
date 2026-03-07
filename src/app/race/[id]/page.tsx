"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getRaceById } from "@/lib/curated-data/races";
import { getCandidatesByRace } from "@/lib/curated-data/candidates";
import { useQuiz } from "@/context/QuizContext";
import { matchCandidatesInRace } from "@/lib/matching";
import CandidateCard from "@/components/CandidateCard";
import { ISSUE_LABELS, IssueCategory } from "@/types/quiz";

const categoryColors: Record<string, string> = {
  federal: "bg-blue-100 text-blue-700",
  state: "bg-purple-100 text-purple-700",
  local: "bg-green-100 text-green-700",
  judicial: "bg-amber-100 text-amber-700",
};

export default function RaceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { profile } = useQuiz();

  const race = getRaceById(id);
  const candidates = getCandidatesByRace(id);

  if (!race) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-navy-900 mb-4">
          Race Not Found
        </h1>
        <p className="text-navy-500 mb-6">
          This race isn&apos;t in our curated database yet.
        </p>
        <Link href="/ballot" className="text-civic-600 hover:underline">
          Back to Ballot
        </Link>
      </div>
    );
  }

  const matches = profile
    ? matchCandidatesInRace(profile, candidates)
    : undefined;

  const matchMap = matches
    ? Object.fromEntries(matches.map((m) => [m.candidateId, m]))
    : {};

  // Sort candidates by match score if available
  const sortedCandidates = matches
    ? [...candidates].sort((a, b) => {
        const aScore = matchMap[a.id]?.overallScore ?? 0;
        const bScore = matchMap[b.id]?.overallScore ?? 0;
        return bScore - aScore;
      })
    : candidates;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-navy-400 mb-6">
        <Link href="/" className="hover:text-navy-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/ballot" className="hover:text-navy-600">
          Ballot
        </Link>
        <span>/</span>
        <span className="text-navy-600">{race.name}</span>
      </nav>

      {/* Race header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${categoryColors[race.category]}`}
          >
            {race.category}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-navy-900 mb-3">{race.name}</h1>
        <p className="text-navy-600 text-lg">{race.description}</p>
      </div>

      {/* Why it matters */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
        <h2 className="font-semibold text-amber-800 text-sm mb-2 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Why This Matters To You
        </h2>
        <p className="text-amber-900 text-sm">{race.whyItMatters}</p>
        <p className="text-amber-700 text-xs mt-2 italic">
          {race.impactStatement}
        </p>
      </div>

      {/* Quiz CTA if no profile */}
      {!profile && (
        <div className="bg-civic-50 border border-civic-200 rounded-xl p-5 mb-8 text-center">
          <p className="text-civic-800 text-sm mb-3">
            Take the quiz to see which candidate best matches your views
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-civic-600 text-white rounded-full text-sm font-semibold hover:bg-civic-700 transition-colors"
          >
            Find Your Match
          </Link>
        </div>
      )}

      {/* Candidates */}
      <h2 className="text-xl font-bold text-navy-900 mb-4">
        Candidates ({sortedCandidates.length})
      </h2>
      <div className="space-y-4 mb-12">
        {sortedCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            match={matchMap[candidate.id]}
            raceId={id}
          />
        ))}
      </div>

      {/* Side-by-side comparison */}
      {sortedCandidates.length >= 2 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-navy-900 mb-4">
            Side-by-Side Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-navy-200">
                  <th className="text-left py-3 pr-4 text-navy-500 font-medium w-1/4">
                    Issue
                  </th>
                  {sortedCandidates.map((c) => (
                    <th
                      key={c.id}
                      className="text-left py-3 px-2 text-navy-900 font-semibold"
                    >
                      {c.name}
                      {matchMap[c.id] && (
                        <span className="ml-2 text-xs font-normal text-navy-400">
                          ({matchMap[c.id].overallScore}% match)
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(
                  Array.from(new Set(
                    sortedCandidates.flatMap((c) =>
                      c.positions.map((p) => p.category)
                    )
                  )) as IssueCategory[]
                ).map((cat) => (
                  <tr key={cat} className="border-b border-navy-50">
                    <td className="py-3 pr-4 text-navy-500 font-medium align-top">
                      {ISSUE_LABELS[cat]}
                    </td>
                    {sortedCandidates.map((c) => {
                      const pos = c.positions.find(
                        (p) => p.category === cat
                      );
                      const catMatch =
                        matchMap[c.id]?.categoryScores[cat];
                      return (
                        <td key={c.id} className="py-3 px-2 align-top">
                          <div className="flex items-start gap-1.5">
                            {catMatch && (
                              <span
                                className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                                  catMatch.agree
                                    ? "bg-green-400"
                                    : "bg-red-400"
                                }`}
                              />
                            )}
                            <span className="text-navy-600">
                              {pos?.position || "—"}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-navy-400 text-center mt-8 mb-4">
        Candidate positions are based on publicly available statements,
        campaign materials, and voting records. Match scores are estimates
        based on your quiz responses.
      </p>
    </div>
  );
}
