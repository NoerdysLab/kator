"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BallotData, BallotApiResponse } from "@/types/ballot";
import { mapApiResponse } from "@/lib/map-api-response";
import { curatedRaces } from "@/lib/curated-data/races";
import { getCandidatesByRace } from "@/lib/curated-data/candidates";
import { curatedMeasures } from "@/lib/curated-data/measures";
import { matchCandidatesInRace } from "@/lib/matching";
import { useQuiz } from "@/context/QuizContext";
import AddressInput from "@/components/AddressInput";
import MockDataBanner from "@/components/MockDataBanner";
import ElectionInfoSidebar from "@/components/ElectionInfoSidebar";
import BallotSection from "@/components/BallotSection";
import CandidateCard from "@/components/CandidateCard";
import DivisionCard from "@/components/DivisionCard";

function BallotContent() {
  const searchParams = useSearchParams();
  const address = searchParams.get("address") || "";
  const [data, setData] = useState<BallotData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { profile } = useQuiz();

  useEffect(() => {
    if (!address) return;

    setLoading(true);
    setError(null);

    fetch(`/api/ballot?address=${encodeURIComponent(address)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((apiResponse: BallotApiResponse) => {
        const ballotData = mapApiResponse(apiResponse, address);
        setData(ballotData);
      })
      .catch((err) => {
        setError(err.message || "Failed to load ballot data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [address]);

  if (!address) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-navy-900 mb-4">
          Look up your ballot
        </h1>
        <p className="text-navy-500 mb-6">
          Enter your address to see races, candidates, and ballot measures.
        </p>
        <AddressInput />
        {!profile && (
          <p className="mt-6 text-sm text-navy-400">
            Want match scores?{" "}
            <Link href="/quiz" className="text-civic-600 hover:underline font-medium">
              Take the quiz first
            </Link>
          </p>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-civic-200" />
          <h1 className="text-xl font-semibold text-navy-700 mb-2">
            Looking up your ballot...
          </h1>
          <p className="text-sm text-navy-400">
            Fetching civic information for your address.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-navy-900 mb-4">
          Something went wrong
        </h1>
        <p className="text-navy-500 mb-6">{error}</p>
        <AddressInput initialAddress={address} />
      </div>
    );
  }

  if (!data) return null;

  // Use curated data for the demo experience
  const useCurated = data.isMockData || true; // Always show curated for now
  const races = useCurated ? curatedRaces : [];
  const measures = useCurated ? curatedMeasures : [];

  const federalRaces = races.filter((r) => r.category === "federal");
  const stateRaces = races.filter((r) => r.category === "state");
  const localRaces = races.filter((r) => r.category === "local");

  const federalDivisions = data.divisions.filter((d) => d.level === "federal");
  const stateDivisions = data.divisions.filter((d) => d.level === "state");
  const localDivisions = data.divisions.filter((d) => d.level === "local");

  const hasRaces = races.length > 0;
  const hasMeasures = measures.length > 0;
  const hasDivisions = data.divisions.length > 0;
  const hasElection = !!data.election;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Address bar */}
      <div className="mb-6">
        <AddressInput initialAddress={address} compact />
      </div>

      {/* Quiz CTA if no profile */}
      {!profile && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-amber-800 text-sm">
              Want to see which candidates match your views?
            </p>
            <p className="text-amber-700 text-xs">
              Take a 3-minute quiz to get personalized match scores.
            </p>
          </div>
          <Link
            href="/quiz"
            className="px-5 py-2 bg-amber-400 text-navy-900 rounded-full text-sm font-semibold hover:bg-amber-300 transition-colors flex-shrink-0"
          >
            Take the Quiz
          </Link>
        </div>
      )}

      {/* Mock data banner */}
      {data.isMockData && <MockDataBanner reason={data.fallbackReason} />}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-navy-900 mb-6">
            {hasElection
              ? `Your Ballot — ${data.election!.name}`
              : "Your Civic Information"}
          </h1>

          {data.fallbackReason && !data.isMockData && (
            <p className="text-navy-500 text-sm mb-6 bg-navy-50 rounded-lg p-3">
              {data.fallbackReason}
            </p>
          )}

          {/* Curated Races */}
          {hasRaces && (
            <>
              {[
                { label: "Federal Races", items: federalRaces, color: "text-blue-600" },
                { label: "State Races", items: stateRaces, color: "text-purple-600" },
                { label: "Local Races", items: localRaces, color: "text-green-600" },
              ]
                .filter((g) => g.items.length > 0)
                .map((group) => (
                  <BallotSection
                    key={group.label}
                    icon={
                      <svg className={`w-6 h-6 ${group.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    }
                    title={group.label}
                    count={group.items.length}
                  >
                    {group.items.map((race) => {
                      const candidates = getCandidatesByRace(race.id);
                      const matches = profile
                        ? matchCandidatesInRace(profile, candidates)
                        : undefined;
                      const matchMap = matches
                        ? Object.fromEntries(
                            matches.map((m) => [m.candidateId, m])
                          )
                        : {};

                      const sortedCandidates = matches
                        ? [...candidates].sort((a, b) => {
                            const aS = matchMap[a.id]?.overallScore ?? 0;
                            const bS = matchMap[b.id]?.overallScore ?? 0;
                            return bS - aS;
                          })
                        : candidates;

                      return (
                        <div key={race.id} className="mb-6 last:mb-0">
                          <div className="flex items-center justify-between mb-2">
                            <Link
                              href={`/race/${race.id}`}
                              className="font-semibold text-navy-900 hover:text-civic-600 transition-colors"
                            >
                              {race.name}
                            </Link>
                            <Link
                              href={`/race/${race.id}`}
                              className="text-xs text-civic-600 hover:underline"
                            >
                              Full details
                            </Link>
                          </div>
                          {/* Why it matters */}
                          <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 mb-3">
                            {race.impactStatement}
                          </p>
                          <div className="space-y-3">
                            {sortedCandidates.map((c) => (
                              <CandidateCard
                                key={c.id}
                                candidate={c}
                                match={matchMap[c.id]}
                                raceId={race.id}
                                compact
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </BallotSection>
                ))}
            </>
          )}

          {/* Ballot Measures */}
          {hasMeasures && (
            <BallotSection
              icon={
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              title="Ballot Measures"
              count={measures.length}
            >
              {measures.map((measure) => (
                <div
                  key={measure.id}
                  className="bg-white rounded-xl border border-navy-100 shadow-sm p-5 mb-4 last:mb-0"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-medium mb-2">
                        {measure.code}
                      </span>
                      <h3 className="font-semibold text-navy-900 mb-1">
                        {measure.title}
                      </h3>
                      <p className="text-sm text-navy-500 mb-2">
                        {measure.summary}
                      </p>
                      {measure.personalImpact && (
                        <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 mb-2">
                          {measure.personalImpact}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <Link
                      href={`/measure/${measure.id}`}
                      className="text-xs text-civic-600 hover:underline font-medium"
                    >
                      Read full explainer
                    </Link>
                    <span className="text-navy-200">|</span>
                    <span className="text-xs text-navy-400">
                      Fiscal: {measure.fiscalImpact.slice(0, 80)}...
                    </span>
                  </div>
                </div>
              ))}
            </BallotSection>
          )}

          {/* Divisions / Districts */}
          {hasDivisions && (
            <BallotSection
              icon={
                <svg className="w-6 h-6 text-civic-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              }
              title="Your Districts"
              count={data.divisions.length}
              defaultOpen={false}
            >
              <p className="text-sm text-navy-500 mb-4">
                These are the political divisions that represent your address.
              </p>
              {[
                { label: "Federal", items: federalDivisions },
                { label: "State", items: stateDivisions },
                { label: "Local", items: localDivisions },
              ]
                .filter((g) => g.items.length > 0)
                .map((group) => (
                  <div key={group.label} className="mb-4">
                    <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wide mb-2">
                      {group.label}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {group.items.map((d) => (
                        <DivisionCard key={d.ocdId} division={d} />
                      ))}
                    </div>
                  </div>
                ))}
            </BallotSection>
          )}

          {/* Nothing found */}
          {!hasRaces && !hasMeasures && !hasDivisions && (
            <div className="text-center py-12">
              <p className="text-navy-500">
                No civic data found for this address. Try a different address.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="lg:sticky lg:top-8 space-y-4">
            <ElectionInfoSidebar
              election={data.election}
              address={data.address}
              fallbackReason={data.fallbackReason}
            />

            {/* Share ballot */}
            <div className="bg-white rounded-xl border border-navy-100 shadow-sm p-4">
              <h3 className="font-semibold text-navy-900 text-sm mb-2">
                Share Your Ballot
              </h3>
              <p className="text-xs text-navy-400 mb-3">
                Help others research their ballot too.
              </p>
              <button
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="w-full px-4 py-2 bg-civic-600 text-white rounded-lg text-sm font-medium hover:bg-civic-700 transition-colors"
              >
                Copy Ballot Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BallotPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-civic-200" />
            <p className="text-navy-400">Loading...</p>
          </div>
        </div>
      }
    >
      <BallotContent />
    </Suspense>
  );
}
