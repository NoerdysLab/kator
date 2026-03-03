import {
  BallotData,
  Race,
  BallotMeasure,
  Division,
  ElectionInfo,
  BallotApiResponse,
} from "@/types/ballot";
import { mockBallotData } from "./mock-data";

function categorizeDivision(
  ocdId: string
): "federal" | "state" | "local" {
  if (ocdId === "ocd-division/country:us") return "federal";
  // State-level: has /state:xx but nothing after
  if (/\/state:\w+$/.test(ocdId)) return "state";
  // Has /state:xx but also more specific divisions after
  if (/\/state:\w+\//.test(ocdId)) return "local";
  // Country-level subdivisions without state
  if (ocdId.startsWith("ocd-division/country:us")) return "federal";
  return "local";
}

function categorizeRace(
  level: string | undefined,
  roles: string[] | undefined
): "federal" | "state" | "local" | "judicial" {
  if (roles?.some((r) => r.toLowerCase().includes("judge"))) return "judicial";
  if (!level) return "local";
  if (level === "country") return "federal";
  if (level === "administrativeArea1" || level === "regional") return "state";
  return "local";
}

export function mapApiResponse(
  apiResponse: BallotApiResponse,
  address: string
): BallotData {
  const { voterInfo, voterInfoError, divisions: divisionsData, divisionsError } =
    apiResponse;

  const bothFailed = !voterInfo && !divisionsData;

  if (bothFailed) {
    // Only fall back to mock data if we got nothing at all
    // "Election unknown" on voterInfo is expected and means voterInfo is null
    const voterInfoIsExpected =
      voterInfoError === "Election unknown" ||
      voterInfoError?.includes("Election unknown");

    if (voterInfoIsExpected && divisionsError) {
      // No election (expected) + divisions failed = show message, not mock data
      return {
        election: null,
        races: [],
        measures: [],
        officials: [],
        divisions: [],
        address,
        isMockData: false,
        fallbackReason:
          "No upcoming elections found for this address. District information is temporarily unavailable.",
      };
    }

    return {
      ...mockBallotData,
      address,
      isMockData: true,
      fallbackReason: `Demo mode — API calls returned no data. Voter info: ${voterInfoError || "unknown error"}. Divisions: ${divisionsError || "unknown error"}.`,
    };
  }

  // Parse election info from voterInfo
  let election: ElectionInfo | null = null;
  const races: Race[] = [];
  const measures: BallotMeasure[] = [];

  if (voterInfo) {
    const vi = voterInfo as Record<string, unknown>;

    // Election info
    const electionData = vi.election as
      | Record<string, string>
      | undefined;
    if (electionData) {
      const pollingLocations = (
        (vi.pollingLocations as Record<string, unknown>[]) || []
      ).map((loc) => {
        const addr = loc.address as Record<string, string> | undefined;
        return {
          name: (loc.name as string) || (addr?.locationName as string) || "Polling Location",
          address: addr
            ? [addr.line1, addr.line2, addr.city, addr.state, addr.zip]
                .filter(Boolean)
                .join(", ")
            : "Address not available",
          hours: (loc.pollingHours as string) || undefined,
          notes: (loc.notes as string) || undefined,
        };
      });

      election = {
        name: electionData.name || "Election",
        date: electionData.electionDay || "",
        pollingLocations,
      };
    }

    // Contests / races
    const contests = (vi.contests as Record<string, unknown>[]) || [];
    for (const contest of contests) {
      const type = contest.type as string;

      if (type === "Referendum") {
        measures.push({
          code: (contest.referendumBallotResponses as string) || (contest.referendumTitle as string) || "Measure",
          title: (contest.referendumTitle as string) || "Ballot Measure",
          summary:
            (contest.referendumText as string) ||
            "No summary available.",
          proArguments: [],
          conArguments: [],
        });
      } else {
        const candidates = (
          (contest.candidates as Record<string, unknown>[]) || []
        ).map((c) => ({
          name: (c.name as string) || "Unknown",
          party: (c.party as string) || "Unknown",
          candidateUrl: (c.candidateUrl as string) || undefined,
          photoUrl: (c.photoUrl as string) || undefined,
          channels: (c.channels as { type: string; id: string }[]) || undefined,
        }));

        const levels = contest.level as string[] | undefined;
        const roles = contest.roles as string[] | undefined;

        races.push({
          id:
            (contest.referendumTitle as string) ||
            (contest.office as string) ||
            `race-${races.length}`,
          name: (contest.office as string) || "Unknown Race",
          category: categorizeRace(levels?.[0], roles),
          description: (contest.office as string) || undefined,
          candidates,
        });
      }
    }
  }

  // Parse divisions from divisionsByAddress
  const divisions: Division[] = [];
  if (divisionsData) {
    const divs = divisionsData as Record<string, unknown>;
    const divisionsMap = (divs.divisions || {}) as Record<
      string,
      { name: string; officeIndices?: number[]; alsoKnownAs?: string[] }
    >;

    for (const [ocdId, divData] of Object.entries(divisionsMap)) {
      divisions.push({
        ocdId,
        name: divData.name || ocdId,
        level: categorizeDivision(ocdId),
      });
    }

    // Sort: federal first, then state, then local
    const levelOrder = { federal: 0, state: 1, local: 2 };
    divisions.sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);
  }

  const hasActiveElection = !!election;
  const noElectionMessage = voterInfoError
    ? "No upcoming elections found for this address."
    : undefined;

  return {
    election: hasActiveElection ? election : null,
    races,
    measures,
    officials: [],
    divisions,
    address,
    isMockData: false,
    fallbackReason: noElectionMessage,
  };
}
