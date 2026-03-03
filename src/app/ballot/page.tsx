"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BallotData, BallotApiResponse } from "@/types/ballot";
import { mapApiResponse } from "@/lib/map-api-response";
import AddressInput from "@/components/AddressInput";
import MockDataBanner from "@/components/MockDataBanner";
import ElectionInfoSidebar from "@/components/ElectionInfoSidebar";
import BallotSection from "@/components/BallotSection";
import RaceCard from "@/components/RaceCard";
import MeasureCard from "@/components/MeasureCard";
import OfficialCard from "@/components/OfficialCard";

function BallotContent() {
  const searchParams = useSearchParams();
  const address = searchParams.get("address") || "";
  const [data, setData] = useState<BallotData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        <AddressInput />
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

  const federalRaces = data.races.filter((r) => r.category === "federal");
  const stateRaces = data.races.filter((r) => r.category === "state");
  const localRaces = data.races.filter((r) => r.category === "local");
  const judicialRaces = data.races.filter((r) => r.category === "judicial");

  const federalOfficials = data.officials.filter((o) => o.level === "federal");
  const stateOfficials = data.officials.filter((o) => o.level === "state");
  const localOfficials = data.officials.filter((o) => o.level === "local");

  const hasRaces = data.races.length > 0;
  const hasMeasures = data.measures.length > 0;
  const hasOfficials = data.officials.length > 0;
  const hasElection = !!data.election;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Address bar */}
      <div className="mb-6">
        <AddressInput initialAddress={address} compact />
      </div>

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

          {/* Races */}
          {hasRaces && (
            <>
              {federalRaces.length > 0 && (
                <BallotSection
                  icon={
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                      />
                    </svg>
                  }
                  title="Federal Races"
                  count={federalRaces.length}
                >
                  {federalRaces.map((race) => (
                    <RaceCard key={race.id} race={race} />
                  ))}
                </BallotSection>
              )}

              {stateRaces.length > 0 && (
                <BallotSection
                  icon={
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  }
                  title="State Races"
                  count={stateRaces.length}
                >
                  {stateRaces.map((race) => (
                    <RaceCard key={race.id} race={race} />
                  ))}
                </BallotSection>
              )}

              {localRaces.length > 0 && (
                <BallotSection
                  icon={
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  }
                  title="Local Races"
                  count={localRaces.length}
                >
                  {localRaces.map((race) => (
                    <RaceCard key={race.id} race={race} />
                  ))}
                </BallotSection>
              )}

              {judicialRaces.length > 0 && (
                <BallotSection
                  icon={
                    <svg
                      className="w-6 h-6 text-amber-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                  }
                  title="Judicial Races"
                  count={judicialRaces.length}
                >
                  {judicialRaces.map((race) => (
                    <RaceCard key={race.id} race={race} />
                  ))}
                </BallotSection>
              )}
            </>
          )}

          {/* Ballot Measures */}
          {hasMeasures && (
            <BallotSection
              icon={
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              }
              title="Ballot Measures"
              count={data.measures.length}
            >
              {data.measures.map((measure, i) => (
                <MeasureCard key={i} measure={measure} />
              ))}
            </BallotSection>
          )}

          {/* Officials */}
          {hasOfficials && (
            <>
              {federalOfficials.length > 0 && (
                <BallotSection
                  icon={
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  }
                  title="Federal Officials"
                  count={federalOfficials.length}
                  defaultOpen={!hasRaces}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {federalOfficials.map((official, i) => (
                      <OfficialCard key={i} official={official} />
                    ))}
                  </div>
                </BallotSection>
              )}

              {stateOfficials.length > 0 && (
                <BallotSection
                  icon={
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  }
                  title="State Officials"
                  count={stateOfficials.length}
                  defaultOpen={!hasRaces}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stateOfficials.map((official, i) => (
                      <OfficialCard key={i} official={official} />
                    ))}
                  </div>
                </BallotSection>
              )}

              {localOfficials.length > 0 && (
                <BallotSection
                  icon={
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  }
                  title="Local Officials"
                  count={localOfficials.length}
                  defaultOpen={!hasRaces}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {localOfficials.map((official, i) => (
                      <OfficialCard key={i} official={official} />
                    ))}
                  </div>
                </BallotSection>
              )}
            </>
          )}

          {/* Nothing found */}
          {!hasRaces && !hasMeasures && !hasOfficials && (
            <div className="text-center py-12">
              <p className="text-navy-500">
                No ballot or representative data found for this address. Try a
                different address.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="lg:sticky lg:top-8">
            <ElectionInfoSidebar
              election={data.election}
              address={data.address}
              fallbackReason={data.fallbackReason}
            />
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
