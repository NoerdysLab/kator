// Issue categories used across quiz, candidates, and matching
export type IssueCategory =
  | "gun_policy"
  | "abortion"
  | "immigration"
  | "taxes"
  | "education"
  | "transportation"
  | "healthcare"
  | "housing"
  | "public_safety"
  | "environment";

export const ISSUE_LABELS: Record<IssueCategory, string> = {
  gun_policy: "Gun Policy",
  abortion: "Reproductive Rights",
  immigration: "Immigration",
  taxes: "Taxes & Spending",
  education: "Education",
  transportation: "Transportation",
  healthcare: "Healthcare",
  housing: "Housing & Zoning",
  public_safety: "Public Safety",
  environment: "Environment",
};

export const ISSUE_ICONS: Record<IssueCategory, string> = {
  gun_policy: "shield",
  abortion: "heart",
  immigration: "globe",
  taxes: "banknote",
  education: "book",
  transportation: "train",
  healthcare: "stethoscope",
  housing: "home",
  public_safety: "lock",
  environment: "leaf",
};

// Quiz types
export interface QuizOption {
  text: string;
  /** Score from -1.0 (strongly progressive) to +1.0 (strongly conservative) */
  score: number;
}

export interface QuizQuestion {
  id: string;
  category: IssueCategory;
  scenario: string;
  optionA: QuizOption;
  optionB: QuizOption;
}

// Profile generated from quiz
export interface PoliticalProfile {
  scores: Record<IssueCategory, number>;
  labels: Record<IssueCategory, string>;
  completedAt: string;
}

// Candidate types (extended from existing)
export interface CandidatePosition {
  category: IssueCategory;
  position: string;
  /** Score from -1.0 to +1.0 matching the quiz scale */
  score: number;
  source?: string;
  priorPosition?: string;
  priorScore?: number;
}

export interface Endorsement {
  name: string;
  type: "organization" | "official" | "newspaper";
}

export interface VotingRecord {
  bill: string;
  vote: "yes" | "no" | "abstain";
  date: string;
  summary: string;
}

export interface CuratedCandidate {
  id: string;
  name: string;
  party: string;
  photoUrl?: string;
  bio: string;
  isIncumbent: boolean;
  raceId: string;
  positions: CandidatePosition[];
  endorsements: Endorsement[];
  votingHistory: VotingRecord[];
  website?: string;
  socialMedia?: { type: string; url: string }[];
}

// Extended race type for curated data
export interface CuratedRace {
  id: string;
  name: string;
  category: "federal" | "state" | "local" | "judicial";
  description: string;
  whyItMatters: string;
  candidateIds: string[];
  /** e.g. "This school board controls a $500M budget" */
  impactStatement: string;
}

// Extended ballot measure for curated data
export interface CuratedMeasure {
  id: string;
  code: string;
  title: string;
  officialText: string;
  plainEnglish: string;
  summary: string;
  proArguments: string[];
  conArguments: string[];
  fiscalImpact: string;
  personalImpact?: string;
  supporters: string[];
  opponents: string[];
  whyItMatters: string;
}

// Match result computed by matching algorithm
export interface MatchResult {
  candidateId: string;
  overallScore: number;
  categoryScores: Record<IssueCategory, { score: number; agree: boolean }>;
  agreements: IssueCategory[];
  disagreements: IssueCategory[];
}
