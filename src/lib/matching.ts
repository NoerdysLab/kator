import {
  PoliticalProfile,
  CuratedCandidate,
  MatchResult,
  IssueCategory,
} from "@/types/quiz";

/**
 * Compute match score between a user's political profile and a candidate.
 * Returns 0-100 percentage where 100 = perfect alignment.
 */
export function computeMatch(
  profile: PoliticalProfile,
  candidate: CuratedCandidate
): MatchResult {
  const categoryScores: Record<
    IssueCategory,
    { score: number; agree: boolean }
  > = {} as Record<IssueCategory, { score: number; agree: boolean }>;

  const agreements: IssueCategory[] = [];
  const disagreements: IssueCategory[] = [];

  let totalWeight = 0;
  let weightedMatch = 0;

  for (const position of candidate.positions) {
    const userScore = profile.scores[position.category];
    if (userScore === undefined) continue;

    // Distance between user score and candidate score (both -1 to 1)
    // Max distance is 2.0 (from -1 to +1)
    const distance = Math.abs(userScore - position.score);
    const similarity = 1 - distance / 2; // 0 to 1

    const agree = distance < 0.8; // threshold for agreement

    categoryScores[position.category] = {
      score: Math.round(similarity * 100),
      agree,
    };

    if (agree) {
      agreements.push(position.category);
    } else {
      disagreements.push(position.category);
    }

    totalWeight += 1;
    weightedMatch += similarity;
  }

  const overallScore =
    totalWeight > 0 ? Math.round((weightedMatch / totalWeight) * 100) : 50;

  return {
    candidateId: candidate.id,
    overallScore,
    categoryScores,
    agreements,
    disagreements,
  };
}

/**
 * Match all candidates in a race against a profile, sorted by best match.
 */
export function matchCandidatesInRace(
  profile: PoliticalProfile,
  candidates: CuratedCandidate[]
): MatchResult[] {
  return candidates
    .map((c) => computeMatch(profile, c))
    .sort((a, b) => b.overallScore - a.overallScore);
}

/**
 * Get a color class for a match score.
 */
export function getMatchColor(score: number): string {
  if (score >= 75) return "text-green-600";
  if (score >= 50) return "text-amber-600";
  return "text-red-500";
}

export function getMatchBgColor(score: number): string {
  if (score >= 75) return "bg-green-500";
  if (score >= 50) return "bg-amber-500";
  return "bg-red-400";
}

export function getMatchLabel(score: number): string {
  if (score >= 85) return "Strong Match";
  if (score >= 70) return "Good Match";
  if (score >= 50) return "Moderate Match";
  if (score >= 35) return "Weak Match";
  return "Low Match";
}
