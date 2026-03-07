import { CuratedMeasure } from "@/types/quiz";

export const curatedMeasures: CuratedMeasure[] = [
  {
    id: "prop-a",
    code: "Prop A",
    title: "Affordable Housing Bond",
    officialText:
      'Shall the City and County of San Francisco issue $300,000,000 in general obligation bonds to fund the acquisition, construction, renovation, and preservation of affordable housing for low- and moderate-income residents, senior citizens, veterans, persons with disabilities, and formerly homeless individuals, subject to independent citizen oversight and regular audits?',
    plainEnglish:
      "This measure borrows $300 million to build and fix affordable housing for lower-income residents, seniors, veterans, and people with disabilities. The money comes from bonds (basically city loans) that are paid back over time through property taxes. An independent committee would watch how the money is spent.",
    summary:
      "Authorizes $300 million in bonds for affordable housing construction and preservation in San Francisco.",
    proArguments: [
      "Directly funds construction of affordable homes in one of the most expensive cities in the US",
      "Includes housing for veterans, seniors, and people with disabilities",
      "Independent oversight ensures money is spent properly",
      "Bond rates are historically low, making this a cost-effective time to invest",
    ],
    conArguments: [
      "Adds to city debt — taxpayers pay interest on bonds for decades",
      "Government-built housing is slower and more expensive than private development",
      "Previous housing bonds haven't solved the affordability crisis",
      "Property tax increases hurt homeowners on fixed incomes",
    ],
    fiscalImpact:
      "Estimated cost: $18 per year per $100,000 of assessed property value for 30 years. For a home assessed at $800,000, that's approximately $144/year or $12/month.",
    personalImpact:
      "If you own a home assessed at $800K, this would add about $12/month to your property tax. Renters may see some pass-through from landlords.",
    supporters: [
      "Mayor's Office",
      "SF Housing Action Coalition",
      "Habitat for Humanity",
      "League of Women Voters",
      "AFL-CIO Labor Council",
    ],
    opponents: [
      "SF Taxpayers Association",
      "Howard Jarvis Taxpayers Association",
      "Some neighborhood associations",
    ],
    whyItMatters:
      "SF needs an estimated 82,000 more affordable housing units. This bond would fund approximately 3,000 new units — a fraction of the need, but a significant investment.",
  },
  {
    id: "prop-b",
    code: "Prop B",
    title: "Public Transit Sales Tax",
    officialText:
      'Shall the City and County of San Francisco levy a 0.5% sales tax for 25 years to fund public transit operations, maintenance, accessibility improvements, and fleet electrification, with independent oversight?',
    plainEnglish:
      "This adds a half-penny sales tax (0.5%) on purchases in SF to fund Muni buses and trains. The money would go toward keeping transit running, buying electric buses, making stations accessible, and maintaining the system. It lasts 25 years.",
    summary:
      "Levies a half-cent sales tax to fund Muni transit operations, maintenance, and electrification over 25 years.",
    proArguments: [
      "Improves public transit for all residents with dedicated, stable funding",
      "Reduces traffic congestion and carbon emissions by making transit better",
      "Makes transit more accessible for people with disabilities",
      "Electrifies the bus fleet, reducing air pollution in disadvantaged communities",
    ],
    conArguments: [
      "Regressive tax that impacts lower-income residents who spend more of their income on purchases",
      "SFMTA has a history of cost overruns and management issues",
      "Sales tax increase may hurt local businesses competing with online retailers",
      "25-year commitment with no performance benchmarks",
    ],
    fiscalImpact:
      "Expected to generate $150 million annually for 25 years ($3.75 billion total). For a typical household spending $30,000/year on taxable goods, the cost is about $150/year or $12.50/month.",
    personalImpact:
      "You'd pay an extra half-cent per dollar on purchases in SF. On a $100 purchase, that's 50 cents extra. For typical household spending, roughly $12-15/month.",
    supporters: [
      "SFMTA Board",
      "Sierra Club SF",
      "Walk SF",
      "SF Bicycle Coalition",
      "Transit Riders Union",
    ],
    opponents: [
      "SF Taxpayers Association",
      "Golden Gate Restaurant Association",
      "Some small business owners",
    ],
    whyItMatters:
      "Muni carries 700,000+ rides per day and is the lifeline for many SF residents who can't afford to drive. Without new funding, service cuts are likely.",
  },
  {
    id: "measure-c",
    code: "Measure C",
    title: "Police Oversight Commission Reform",
    officialText:
      'Shall the City Charter be amended to expand the Department of Police Accountability\'s powers to include subpoena authority over police records, independent investigative capacity, the ability to recommend disciplinary action, and public reporting requirements?',
    plainEnglish:
      "This changes the city charter to give the civilian police oversight body more power. Specifically, they could subpoena (force the release of) police records, conduct their own investigations without waiting for the police department, recommend discipline for officers, and publish their findings publicly.",
    summary:
      "Expands the civilian police oversight commission's powers including subpoena authority and independent investigations.",
    proArguments: [
      "Increases police accountability and transparency after years of complaints about internal investigations",
      "Gives the community more voice in policing policies",
      "Subpoena power closes a major gap — currently the department can refuse to share records",
      "Follows best practices from other major cities like Los Angeles and New York",
    ],
    conArguments: [
      "May make it harder to recruit and retain officers in an already understaffed department",
      "Could interfere with ongoing criminal investigations if records are released prematurely",
      "Existing oversight mechanisms may be sufficient if properly funded",
      "Political appointees on the commission may lack law enforcement expertise",
    ],
    fiscalImpact:
      "Estimated annual cost of $2-3 million for additional investigators, legal staff, and operations. No new tax — funded from the existing city budget.",
    personalImpact:
      "No direct cost to you. This changes how police misconduct is investigated and whether the public can see the results.",
    supporters: [
      "ACLU Northern California",
      "NAACP SF Branch",
      "Coalition for Police Accountability",
      "Public Defender's Office",
    ],
    opponents: [
      "SF Police Officers Association",
      "Some law enforcement advocacy groups",
    ],
    whyItMatters:
      "San Francisco's police department has 1,600+ officers. How they're held accountable affects everyone's safety and trust in the justice system.",
  },
];

export function getMeasureById(id: string): CuratedMeasure | undefined {
  return curatedMeasures.find((m) => m.id === id);
}
