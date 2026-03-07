import { CuratedRace } from "@/types/quiz";

export const curatedRaces: CuratedRace[] = [
  {
    id: "us-senate",
    name: "U.S. Senate",
    category: "federal",
    description:
      "One of California's two seats in the U.S. Senate. Senators serve 6-year terms and vote on federal legislation, confirm Supreme Court justices, and ratify treaties.",
    whyItMatters:
      "Your U.S. Senator will vote on the federal budget, Supreme Court confirmations, and legislation that affects healthcare, immigration, and taxes nationwide.",
    impactStatement:
      "This Senator will represent 39 million Californians and vote on every major federal issue for the next 6 years.",
    candidateIds: ["senate-rivera", "senate-chen", "senate-ellis"],
  },
  {
    id: "us-house-ca11",
    name: "U.S. Representative — CA-11",
    category: "federal",
    description:
      "California's 11th Congressional District covering San Francisco and parts of San Mateo County. Representatives serve 2-year terms.",
    whyItMatters:
      "Your House Representative authors and votes on all federal spending bills, including funding for local projects, schools, and infrastructure.",
    impactStatement:
      "This Representative controls your voice in the House on all federal legislation and secures funding for San Francisco's priorities.",
    candidateIds: ["house-washington", "house-nakamura"],
  },
  {
    id: "state-senate-11",
    name: "State Senate — District 11",
    category: "state",
    description:
      "California's 11th State Senate District. State Senators serve 4-year terms and shape California law on housing, education, transportation, and criminal justice.",
    whyItMatters:
      "State Senators write the laws that govern your daily life — from rent control to highway funding to school curriculum.",
    impactStatement:
      "This State Senator shapes a $300+ billion state budget that funds your schools, roads, parks, and public services.",
    candidateIds: ["state-senate-torres", "state-senate-obrien"],
  },
  {
    id: "sf-mayor",
    name: "Mayor of San Francisco",
    category: "local",
    description:
      "The chief executive of the City and County of San Francisco, managing a $14 billion annual budget and overseeing all city departments.",
    whyItMatters:
      "The Mayor makes the decisions that affect your daily life most directly — from housing policy to policing to whether your streets are clean.",
    impactStatement:
      "The Mayor oversees a $14 billion budget, 30,000+ city employees, and sets policy on housing, homelessness, transit, and public safety for 870,000 residents.",
    candidateIds: ["mayor-kim", "mayor-patel", "mayor-martinez"],
  },
  {
    id: "sf-da",
    name: "District Attorney",
    category: "local",
    description:
      "San Francisco's chief prosecutor, responsible for all criminal cases in the city. Sets prosecution priorities and criminal justice policy.",
    whyItMatters:
      "The DA decides who gets prosecuted and how. This single office shapes public safety, criminal justice reform, and whether your city feels safe.",
    impactStatement:
      "The DA handles 10,000+ criminal cases per year, sets bail policies, decides which crimes to prioritize, and shapes the justice system that affects every neighborhood.",
    candidateIds: ["da-zhao", "da-collins"],
  },
];

export function getRaceById(id: string): CuratedRace | undefined {
  return curatedRaces.find((r) => r.id === id);
}
