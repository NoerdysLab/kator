import { QuizQuestion } from "@/types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "gun-1",
    category: "gun_policy",
    scenario:
      "After a series of shootings in your city, the mayor proposes new gun legislation. Would you rather:",
    optionA: {
      text: "Require universal background checks and a 10-day waiting period for all firearm purchases",
      score: -0.8,
    },
    optionB: {
      text: "Focus on enforcing existing laws and increasing mental health funding rather than adding new restrictions",
      score: 0.6,
    },
  },
  {
    id: "abortion-1",
    category: "abortion",
    scenario:
      "Your state legislature is debating reproductive healthcare policy. Would you rather:",
    optionA: {
      text: "Protect access to abortion through the first 24 weeks and require insurance coverage for reproductive care",
      score: -0.8,
    },
    optionB: {
      text: "Restrict abortion after 12 weeks except in cases of rape, incest, or medical emergency",
      score: 0.7,
    },
  },
  {
    id: "immigration-1",
    category: "immigration",
    scenario:
      "Your city is debating how to handle a recent increase in immigrant families. Would you rather:",
    optionA: {
      text: "Expand city services, provide language assistance, and create a pathway to local ID cards for all residents",
      score: -0.7,
    },
    optionB: {
      text: "Require cooperation with federal immigration enforcement and direct resources to legal residents first",
      score: 0.8,
    },
  },
  {
    id: "taxes-1",
    category: "taxes",
    scenario:
      "Your city has a $5M budget surplus. Would you rather:",
    optionA: {
      text: "Fund a new community health clinic in an underserved neighborhood",
      score: -0.6,
    },
    optionB: {
      text: "Reduce property taxes across the board",
      score: 0.6,
    },
  },
  {
    id: "education-1",
    category: "education",
    scenario:
      "Your school district is underperforming and looking for solutions. Would you rather:",
    optionA: {
      text: "Increase funding for public schools, raise teacher pay, and reduce class sizes",
      score: -0.6,
    },
    optionB: {
      text: "Expand school choice with vouchers and charter schools so parents can pick the best fit",
      score: 0.7,
    },
  },
  {
    id: "transportation-1",
    category: "transportation",
    scenario:
      "Your city needs to address worsening traffic and transit gaps. Would you rather:",
    optionA: {
      text: "Invest in expanding bus and rail routes, add protected bike lanes, and reduce car dependency",
      score: -0.7,
    },
    optionB: {
      text: "Widen major roads, add parking, and reduce congestion for commuters who drive",
      score: 0.7,
    },
  },
  {
    id: "healthcare-1",
    category: "healthcare",
    scenario:
      "Your state is looking at healthcare reform. Would you rather:",
    optionA: {
      text: "Create a state-run public health insurance option available to all residents regardless of income",
      score: -0.8,
    },
    optionB: {
      text: "Reduce regulations on insurance markets and let competition drive down costs and increase choices",
      score: 0.7,
    },
  },
  {
    id: "housing-1",
    category: "housing",
    scenario:
      "A new apartment complex is proposed near your neighborhood. Would you rather:",
    optionA: {
      text: "Fast-track approval to address the housing shortage",
      score: -0.6,
    },
    optionB: {
      text: "Require extended community review to assess impact on traffic and schools",
      score: 0.5,
    },
  },
  {
    id: "public-safety-1",
    category: "public_safety",
    scenario:
      "Your city is debating how to address rising property crime. Would you rather:",
    optionA: {
      text: "Invest in community intervention programs, mental health responders, and social workers for non-violent calls",
      score: -0.7,
    },
    optionB: {
      text: "Hire more police officers, increase patrols, and enforce stricter penalties for repeat offenders",
      score: 0.7,
    },
  },
  {
    id: "environment-1",
    category: "environment",
    scenario:
      "Your state is setting climate policy for the next decade. Would you rather:",
    optionA: {
      text: "Ban new fossil fuel permits, mandate 100% clean energy by 2040, and subsidize electric vehicles",
      score: -0.8,
    },
    optionB: {
      text: "Set voluntary emissions targets, invest in natural gas as a transition fuel, and avoid mandates that could raise energy costs",
      score: 0.6,
    },
  },
  {
    id: "taxes-2",
    category: "taxes",
    scenario:
      "The state needs to close a budget gap of $2 billion. Would you rather:",
    optionA: {
      text: "Raise taxes on incomes over $400K and large corporations",
      score: -0.7,
    },
    optionB: {
      text: "Cut spending across state agencies by 8% and freeze new hiring",
      score: 0.8,
    },
  },
  {
    id: "housing-2",
    category: "housing",
    scenario:
      "Homelessness is increasing in your city. Would you rather:",
    optionA: {
      text: "Build government-funded permanent supportive housing and expand shelter capacity with wraparound services",
      score: -0.7,
    },
    optionB: {
      text: "Enforce camping bans, require shelter participation, and increase penalties for repeat offenses",
      score: 0.7,
    },
  },
  {
    id: "education-2",
    category: "education",
    scenario:
      "Parents in your district are debating school curriculum. Would you rather:",
    optionA: {
      text: "Include comprehensive sex education and expanded history covering systemic inequality",
      score: -0.7,
    },
    optionB: {
      text: "Give parents more say over curriculum content and focus on core academics like reading and math",
      score: 0.6,
    },
  },
  {
    id: "gun-2",
    category: "gun_policy",
    scenario:
      "A bill is proposed to address gun violence in schools. Would you rather:",
    optionA: {
      text: "Ban assault-style weapons and high-capacity magazines for civilian purchase",
      score: -0.9,
    },
    optionB: {
      text: "Allow trained school staff to carry concealed weapons and harden school security",
      score: 0.8,
    },
  },
  {
    id: "public-safety-2",
    category: "public_safety",
    scenario:
      "Your city's district attorney is setting prosecution priorities. Would you rather:",
    optionA: {
      text: "Focus on diversion programs for nonviolent offenses and reducing incarceration rates",
      score: -0.7,
    },
    optionB: {
      text: "Prosecute all offenses consistently and prioritize public order and victim protection",
      score: 0.7,
    },
  },
];

export function getScoreLabel(score: number): string {
  if (score <= -0.6) return "Strongly progressive";
  if (score <= -0.2) return "Lean progressive";
  if (score <= 0.2) return "Moderate";
  if (score <= 0.6) return "Lean conservative";
  return "Strongly conservative";
}

export function getOverallLabel(scores: Record<string, number>): string {
  const values = Object.values(scores);
  if (values.length === 0) return "Unknown";
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return getScoreLabel(avg);
}
