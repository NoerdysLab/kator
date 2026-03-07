import Link from "next/link";
import AddressInput from "@/components/AddressInput";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-civic-500 blur-3xl" />
          <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-amber-500 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Know your ballot
              <br />
              <span className="text-amber-400">before you vote</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
              Kator uses your preferences to match you with candidates, explain
              ballot measures in plain English, and show you why every race
              matters.
            </p>
          </div>

          {/* Two paths */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Path 1: Quiz */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 text-center hover:bg-white/15 transition-colors">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-400/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Find Your Match</h2>
              <p className="text-white/60 text-sm mb-5">
                Take a 3-minute quiz to discover which candidates align with
                your values — then see your ballot with match scores.
              </p>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-navy-900 rounded-full font-semibold hover:bg-amber-300 transition-colors shadow-lg"
              >
                Take the Quiz
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Path 2: Address lookup */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-civic-400/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-civic-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Look Up Your Ballot</h2>
              <p className="text-white/60 text-sm mb-5">
                Enter your address to see races, candidates, and ballot measures
                on your upcoming ballot.
              </p>
              <AddressInput />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 text-center mb-4">
            How Kator Works
          </h2>
          <p className="text-navy-500 text-center mb-12 max-w-2xl mx-auto">
            Three steps to an informed vote. No account required, no data stored.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-50 flex items-center justify-center">
                <span className="text-2xl font-bold text-amber-500">1</span>
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">
                Take the Quiz
              </h3>
              <p className="text-sm text-navy-500">
                Answer 15 scenario-based questions to build your political
                preference profile across 10 issue areas.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-civic-50 flex items-center justify-center">
                <span className="text-2xl font-bold text-civic-500">2</span>
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">
                Enter Your Address
              </h3>
              <p className="text-sm text-navy-500">
                We look up the exact races and measures on your ballot based on
                your home address.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-green-50 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-500">3</span>
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">
                See Your Matches
              </h3>
              <p className="text-sm text-navy-500">
                Get match scores for every candidate, plain-English explainers
                for measures, and context on why each race matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why local elections matter */}
      <section className="py-16 sm:py-20 bg-navy-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 text-center mb-12">
            Why Local Elections Matter
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                stat: "73%",
                label: "of government decisions",
                detail: "that affect your daily life are made at the local level",
              },
              {
                stat: "21%",
                label: "average turnout",
                detail: "in local elections — your vote has outsized impact",
              },
              {
                stat: "$3.8T",
                label: "in local budgets",
                detail:
                  "State and local governments spend more than the federal government",
              },
              {
                stat: "500K+",
                label: "elected offices",
                detail:
                  "in the U.S., and most voters can't name their local officials",
              },
            ].map((item) => (
              <div
                key={item.stat}
                className="bg-white rounded-xl border border-navy-100 p-6 text-center shadow-sm"
              >
                <div className="text-3xl font-bold text-civic-600 mb-1">
                  {item.stat}
                </div>
                <div className="text-sm font-medium text-navy-800 mb-1">
                  {item.label}
                </div>
                <p className="text-xs text-navy-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-civic-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-civic-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="font-semibold text-navy-900 mb-1">Nonpartisan</h3>
              <p className="text-sm text-navy-500">
                We show how candidates compare to your priorities. We never tell
                you who to vote for.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-navy-900 mb-1">Private</h3>
              <p className="text-sm text-navy-500">
                Your data stays on your device. We don&apos;t track how you vote
                or sell your information.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-navy-900 mb-1">
                No Endorsements
              </h3>
              <p className="text-sm text-navy-500">
                Match scores are based on publicly available data. We don&apos;t
                endorse or oppose any candidate.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
