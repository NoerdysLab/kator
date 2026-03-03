"use client";

import { ElectionInfo } from "@/types/ballot";

interface ElectionInfoSidebarProps {
  election: ElectionInfo | null;
  address: string;
  fallbackReason?: string;
}

export default function ElectionInfoSidebar({
  election,
  address,
  fallbackReason,
}: ElectionInfoSidebarProps) {
  const hasElection = !!election;

  return (
    <div className="bg-white rounded-lg border border-navy-100 shadow-sm p-5">
      <h2 className="text-lg font-bold text-navy-900 mb-4">
        {hasElection ? "Election Info" : "Civic Info"}
      </h2>

      <div className="space-y-4">
        {/* Address */}
        <div>
          <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wide mb-1">
            Your Address
          </h3>
          <p className="text-sm text-navy-700">{address}</p>
        </div>

        {hasElection ? (
          <>
            {/* Election Name */}
            <div>
              <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wide mb-1">
                Election
              </h3>
              <p className="text-sm font-medium text-navy-900">
                {election.name}
              </p>
            </div>

            {/* Election Date */}
            <div>
              <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wide mb-1">
                Date
              </h3>
              <p className="text-sm text-navy-700">
                {new Date(election.date + "T00:00:00").toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            </div>

            {/* Polling Locations */}
            {election.pollingLocations.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wide mb-2">
                  Polling Location{election.pollingLocations.length > 1 ? "s" : ""}
                </h3>
                {election.pollingLocations.map((loc, i) => (
                  <div
                    key={i}
                    className="p-3 bg-navy-50 rounded-lg mb-2 last:mb-0"
                  >
                    <p className="text-sm font-medium text-navy-900">
                      {loc.name}
                    </p>
                    <p className="text-xs text-navy-600 mt-1">{loc.address}</p>
                    {loc.hours && (
                      <p className="text-xs text-navy-500 mt-1">
                        Hours: {loc.hours}
                      </p>
                    )}
                    {loc.notes && (
                      <p className="text-xs text-navy-400 mt-1 italic">
                        {loc.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="p-3 bg-navy-50 rounded-lg">
            <p className="text-sm text-navy-600">
              {fallbackReason ||
                "No upcoming elections found for this address. Your elected officials are shown below."}
            </p>
          </div>
        )}

        {/* Registration link */}
        <div className="pt-2 border-t border-navy-100">
          <a
            href="https://www.vote.org/register-to-vote/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-civic-600 hover:text-civic-700 font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Check voter registration
          </a>
        </div>
      </div>
    </div>
  );
}
