import { BallotData } from "@/types/ballot";

export const mockBallotData: BallotData = {
  election: {
    name: "San Francisco General Election (Sample)",
    date: "2024-11-05",
    pollingLocations: [
      {
        name: "City Hall - Voting Center",
        address: "1 Dr Carlton B Goodlett Pl, San Francisco, CA 94102",
        hours: "7:00 AM - 8:00 PM",
        notes: "Accessible entrance on Van Ness Ave",
      },
    ],
  },
  races: [
    {
      id: "us-senate-ca",
      name: "U.S. Senate - California",
      category: "federal",
      description:
        "Elect one senator to represent California in the U.S. Senate for a six-year term.",
      candidates: [
        {
          name: "Alex Rivera",
          party: "Democratic",
          candidateUrl: "https://example.com",
        },
        {
          name: "Jordan Chen",
          party: "Republican",
          candidateUrl: "https://example.com",
        },
        {
          name: "Morgan Ellis",
          party: "Independent",
        },
      ],
    },
    {
      id: "us-rep-ca-11",
      name: "U.S. Representative - District 11",
      category: "federal",
      description:
        "Elect one representative for California's 11th Congressional District.",
      candidates: [
        {
          name: "Sam Washington",
          party: "Democratic",
        },
        {
          name: "Pat Nakamura",
          party: "Republican",
        },
      ],
    },
    {
      id: "ca-state-senate-11",
      name: "State Senate - District 11",
      category: "state",
      description:
        "Elect one state senator for California Senate District 11.",
      candidates: [
        {
          name: "Jamie Torres",
          party: "Democratic",
        },
        {
          name: "Casey O'Brien",
          party: "Republican",
        },
      ],
    },
    {
      id: "sf-mayor",
      name: "Mayor of San Francisco",
      category: "local",
      description: "Elect the Mayor of the City and County of San Francisco.",
      candidates: [
        {
          name: "Taylor Kim",
          party: "Nonpartisan",
        },
        {
          name: "Riley Patel",
          party: "Nonpartisan",
        },
        {
          name: "Drew Martinez",
          party: "Nonpartisan",
        },
      ],
    },
    {
      id: "sf-da",
      name: "District Attorney",
      category: "local",
      description:
        "Elect the District Attorney of the City and County of San Francisco.",
      candidates: [
        {
          name: "Quinn Zhao",
          party: "Nonpartisan",
        },
        {
          name: "Avery Collins",
          party: "Nonpartisan",
        },
      ],
    },
    {
      id: "ca-supreme-court-1",
      name: "Supreme Court Justice - Seat 1",
      category: "judicial",
      description:
        "Shall Justice Robin Blackwell be confirmed for a 12-year term?",
      candidates: [
        {
          name: "Robin Blackwell",
          party: "Nonpartisan",
        },
      ],
    },
  ],
  measures: [
    {
      code: "Prop A",
      title: "Affordable Housing Bond",
      summary:
        "Authorizes $300 million in bonds to fund affordable housing construction, preservation, and down-payment assistance for first-time homebuyers.",
      proArguments: [
        "Addresses the critical housing shortage in the city",
        "Creates jobs in construction and related industries",
        "Helps low-income families afford to stay in the city",
      ],
      conArguments: [
        "Increases city debt and property taxes",
        "Government-funded housing has a mixed track record",
        "May not address root causes of high housing costs",
      ],
      fiscalImpact:
        "Estimated annual cost of $18.5 million over 30 years, funded by property tax increases.",
    },
    {
      code: "Prop B",
      title: "Public Transit Funding Measure",
      summary:
        "Allocates 0.5% sales tax increase to fund public transit improvements, including new bus routes, rail expansion, and accessibility upgrades.",
      proArguments: [
        "Improves public transit for all residents",
        "Reduces traffic congestion and carbon emissions",
        "Makes transit more accessible for people with disabilities",
      ],
      conArguments: [
        "Regressive tax that impacts lower-income residents more",
        "Transit agency has a history of cost overruns",
        "Sales tax increase may hurt local businesses",
      ],
      fiscalImpact:
        "Expected to generate $150 million annually for 25 years.",
    },
    {
      code: "Measure C",
      title: "Police Oversight Commission Reform",
      summary:
        "Expands the powers of the civilian police oversight commission, including subpoena authority and the ability to recommend disciplinary action.",
      proArguments: [
        "Increases police accountability and transparency",
        "Gives the community more voice in policing policies",
        "Follows best practices from other major cities",
      ],
      conArguments: [
        "May make it harder to recruit and retain officers",
        "Could interfere with ongoing investigations",
        "Existing oversight mechanisms may be sufficient",
      ],
    },
  ],
  officials: [
    {
      name: "Joseph R. Biden",
      office: "President of the United States",
      level: "federal",
      party: "Democratic",
      phones: ["(202) 456-1111"],
      urls: ["https://www.whitehouse.gov/"],
      emails: [],
      photoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/6/68/Joe_Biden_presidential_portrait.jpg",
    },
    {
      name: "Kamala D. Harris",
      office: "Vice President of the United States",
      level: "federal",
      party: "Democratic",
      phones: ["(202) 456-1111"],
      urls: ["https://www.whitehouse.gov/"],
      emails: [],
    },
    {
      name: "Alex Padilla",
      office: "U.S. Senator",
      level: "federal",
      party: "Democratic",
      phones: ["(202) 224-3553"],
      urls: ["https://www.padilla.senate.gov/"],
      emails: [],
    },
    {
      name: "Dianne Feinstein",
      office: "U.S. Senator",
      level: "federal",
      party: "Democratic",
      phones: ["(202) 224-3841"],
      urls: ["https://www.feinstein.senate.gov/"],
      emails: [],
    },
    {
      name: "Nancy Pelosi",
      office: "U.S. Representative - CA-11",
      level: "federal",
      party: "Democratic",
      phones: ["(202) 225-4965"],
      urls: ["https://pelosi.house.gov/"],
      emails: [],
    },
    {
      name: "Gavin Newsom",
      office: "Governor of California",
      level: "state",
      party: "Democratic",
      phones: ["(916) 445-2841"],
      urls: ["https://www.gov.ca.gov/"],
      emails: [],
    },
    {
      name: "London Breed",
      office: "Mayor of San Francisco",
      level: "local",
      party: "Nonpartisan",
      phones: ["(415) 554-6141"],
      urls: ["https://sfmayor.org/"],
      emails: ["mayorlondonbreed@sfgov.org"],
    },
  ],
  address: "1 Dr Carlton B Goodlett Pl, San Francisco, CA 94102",
  isMockData: true,
  fallbackReason: "Demo mode — showing sample San Francisco election data.",
};
