export interface Candidate {
  name: string;
  party: string;
  candidateUrl?: string;
  photoUrl?: string;
  channels?: { type: string; id: string }[];
}

export interface Race {
  id: string;
  name: string;
  category: "federal" | "state" | "local" | "judicial";
  description?: string;
  candidates: Candidate[];
}

export interface BallotMeasure {
  code: string;
  title: string;
  summary: string;
  proArguments: string[];
  conArguments: string[];
  fiscalImpact?: string;
}

export interface Official {
  name: string;
  office: string;
  level: "federal" | "state" | "local";
  party: string;
  phones: string[];
  urls: string[];
  emails: string[];
  photoUrl?: string;
  channels?: { type: string; id: string }[];
}

export interface PollingLocation {
  name: string;
  address: string;
  hours?: string;
  notes?: string;
}

export interface ElectionInfo {
  name: string;
  date: string;
  pollingLocations: PollingLocation[];
}

export interface BallotData {
  election: ElectionInfo | null;
  races: Race[];
  measures: BallotMeasure[];
  officials: Official[];
  address: string;
  isMockData: boolean;
  fallbackReason?: string;
}

export interface BallotApiResponse {
  voterInfo: Record<string, unknown> | null;
  voterInfoError: string | null;
  representatives: Record<string, unknown> | null;
  representativesError: string | null;
}
