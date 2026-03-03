import {
  BallotData,
  Race,
  BallotMeasure,
  Official,
  ElectionInfo,
  BallotApiResponse,
} from "@/types/ballot";
import { mockBallotData } from "./mock-data";

function categorizeOffice(
  levels: string[] | undefined
): "federal" | "state" | "local" {
  if (!levels || levels.length === 0) return "local";
  if (levels.includes("country")) return "federal";
  if (
    levels.includes("administrativeArea1") ||
    levels.includes("regional")
  )
    return "state";
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
  const { voterInfo, voterInfoError, representatives, representativesError } =
    apiResponse;

  const bothFailed = !voterInfo && !representatives;

  if (bothFailed) {
    return {
      ...mockBallotData,
      address,
      isMockData: true,
      fallbackReason: `Demo mode — both API calls failed. Voter info: ${voterInfoError || "unknown error"}. Representatives: ${representativesError || "unknown error"}.`,
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

  // Parse representatives
  const officials: Official[] = [];
  if (representatives) {
    const rep = representatives as Record<string, unknown>;
    const offices = (rep.offices as Record<string, unknown>[]) || [];
    const officialsList =
      (rep.officials as Record<string, unknown>[]) || [];

    for (const office of offices) {
      const officeName = (office.name as string) || "Unknown Office";
      const levels = office.levels as string[] | undefined;
      const indices = (office.officialIndices as number[]) || [];

      for (const idx of indices) {
        const o = officialsList[idx];
        if (!o) continue;

        officials.push({
          name: (o.name as string) || "Unknown",
          office: officeName,
          level: categorizeOffice(levels),
          party: (o.party as string) || "Unknown",
          phones: (o.phones as string[]) || [],
          urls: ((o.urls as { value: string }[]) || []).map(
            (u) => (typeof u === "string" ? u : u.value) || ""
          ),
          emails: ((o.emails as { value: string }[]) || []).map(
            (e) => (typeof e === "string" ? e : e.value) || ""
          ),
          photoUrl: (o.photoUrl as string) || undefined,
          channels: (o.channels as { type: string; id: string }[]) || undefined,
        });
      }
    }
  }

  const hasActiveElection = !!election;
  const noElectionMessage = voterInfoError
    ? "No upcoming elections found for this address."
    : undefined;

  return {
    election: hasActiveElection ? election : null,
    races,
    measures,
    officials,
    address,
    isMockData: false,
    fallbackReason: noElectionMessage,
  };
}
