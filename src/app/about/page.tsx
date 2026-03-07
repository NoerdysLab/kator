import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-navy-900 mb-2">About Kator</h1>
      <p className="text-navy-500 text-lg mb-8">
        Utilizing AI to improve democracy in the United States.
      </p>

      <div className="space-y-6">
        {/* Mission */}
        <div className="bg-white rounded-xl border border-navy-100 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-3">
            Our Mission
          </h2>
          <p className="text-navy-600 mb-3">
            Kator is a platform with the mission of utilizing AI to improve
            democracy in the United States. We believe that informed
            self-governance is currently the most viable option for a society to
            auto-actualize.
          </p>
          <p className="text-navy-600">
            The #1 constraint in local elections is uninformed voters. Learning
            about local politicians is time-consuming and frustrating. With 3-5
            candidates per seat, voters often just pick a recognizable name, vote
            along party lines, or skip the race entirely.{" "}
            <strong className="text-navy-900">Kator fixes this.</strong>
          </p>
        </div>

        {/* What we do */}
        <div className="bg-white rounded-xl border border-navy-100 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-3">
            What Kator Does
          </h2>
          <ul className="space-y-3 text-navy-600">
            {[
              {
                title: "Political Preference Quiz",
                desc: "15 scenario-based questions that build a profile of your views across 10 issue areas.",
              },
              {
                title: "Candidate Matching",
                desc: "Match scores showing how each candidate on your ballot aligns with your stated preferences.",
              },
              {
                title: "Ballot Measure Explainer",
                desc: "Plain-English translations of ballot measure legal text, plus pro/con arguments and fiscal impact.",
              },
              {
                title: "\"Why This Matters\" Context",
                desc: "For every race and measure, tangible context on how it affects your daily life.",
              },
              {
                title: "Shareable Ballot",
                desc: "Share your ballot lookup with friends so they can research their races too.",
              },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="text-civic-600 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>
                  <strong>{item.title}</strong> — {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Methodology */}
        <div className="bg-white rounded-xl border border-navy-100 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-3">
            Methodology
          </h2>
          <p className="text-navy-600 mb-3">
            Our quiz uses <strong>vignette-based forced-choice questions</strong>
            . Research shows this format has higher validity than abstract
            agree/disagree sliders because it elicits real beliefs and attitudes
            rather than abstract opinions.
          </p>
          <p className="text-navy-600 mb-3">
            Match scores are computed by comparing your quiz responses to
            publicly available candidate positions, voting records, campaign
            statements, and endorsements. Each issue category is weighted
            equally.
          </p>
          <p className="text-navy-600">
            We show how candidates compare to <em>your</em> priorities. We
            don&apos;t tell you who to vote for. Match scores are estimates, and
            we encourage you to research candidates directly.
          </p>
        </div>

        {/* Principles */}
        <div className="bg-white rounded-xl border border-navy-100 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-3">
            Our Principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Nonpartisan",
                desc: "No endorsements, no bias. We present information clearly and let you decide.",
              },
              {
                title: "Private",
                desc: "Your data stays on your device. We don't track how you vote or sell your information.",
              },
              {
                title: "Transparent",
                desc: "All candidate data comes from public sources. Our matching algorithm is straightforward.",
              },
              {
                title: "Free",
                desc: "Civic information should be accessible to everyone. Kator is free to use, always.",
              },
            ].map((item) => (
              <div key={item.title} className="p-4 bg-navy-50 rounded-lg">
                <h3 className="font-semibold text-navy-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-navy-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data */}
        <div className="bg-white rounded-xl border border-navy-100 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-3">
            Data Sources
          </h2>
          <p className="text-navy-600 mb-3">
            District and election data comes from the{" "}
            <a
              href="https://developers.google.com/civic-information"
              target="_blank"
              rel="noopener noreferrer"
              className="text-civic-600 hover:underline"
            >
              Google Civic Information API
            </a>
            . Candidate positions and ballot measure data are curated from public
            campaign materials, voting records, endorsement lists, and official
            ballot documents.
          </p>
          <p className="text-sm text-navy-400">
            Currently featuring San Francisco as our demo city. We&apos;re
            working to expand coverage nationwide.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors"
          >
            Take the Quiz
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy-100 text-navy-700 font-semibold rounded-full hover:bg-navy-200 transition-colors"
          >
            Look Up Your Ballot
          </Link>
        </div>
      </div>
    </div>
  );
}
