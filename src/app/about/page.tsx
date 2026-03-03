import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-navy-900 mb-6">About Kator</h1>

      <div className="prose prose-navy max-w-none space-y-6">
        <p className="text-lg text-navy-600">
          <strong className="text-navy-900">Kator</strong> means{" "}
          <em>&ldquo;Know your ballot before you vote.&rdquo;</em> We believe
          every voter deserves easy access to clear, nonpartisan information
          about what&rsquo;s on their ballot and who represents them.
        </p>

        <div className="bg-white rounded-lg border border-navy-100 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-3">
            What Kator Does
          </h2>
          <ul className="space-y-3 text-navy-600">
            <li className="flex items-start gap-3">
              <span className="text-civic-600 mt-1 flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span>
                <strong>Ballot lookup</strong> — See every race, candidate, and
                ballot measure on your upcoming ballot, personalized to your
                address.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-civic-600 mt-1 flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span>
                <strong>Representative finder</strong> — Look up your elected
                officials at every level of government — federal, state, and
                local — with contact information.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-civic-600 mt-1 flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span>
                <strong>Polling locations</strong> — Find where to vote and when
                polling places are open.
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-navy-100 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-3">
            Our Principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-navy-50 rounded-lg">
              <h3 className="font-semibold text-navy-900 mb-1">Nonpartisan</h3>
              <p className="text-sm text-navy-600">
                We present civic information without endorsements, bias, or
                political affiliation.
              </p>
            </div>
            <div className="p-4 bg-navy-50 rounded-lg">
              <h3 className="font-semibold text-navy-900 mb-1">Private</h3>
              <p className="text-sm text-navy-600">
                Your address is used only to look up your civic data. We
                don&rsquo;t store or track your information.
              </p>
            </div>
            <div className="p-4 bg-navy-50 rounded-lg">
              <h3 className="font-semibold text-navy-900 mb-1">Transparent</h3>
              <p className="text-sm text-navy-600">
                All data comes from the Google Civic Information API, a public
                data source maintained by Google.
              </p>
            </div>
            <div className="p-4 bg-navy-50 rounded-lg">
              <h3 className="font-semibold text-navy-900 mb-1">Free</h3>
              <p className="text-sm text-navy-600">
                Civic information should be accessible to everyone. Kator is
                free to use, always.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-navy-100 shadow-sm p-6">
          <h2 className="text-xl font-semibold text-navy-900 mb-3">
            Data Source
          </h2>
          <p className="text-navy-600 mb-3">
            Kator is powered by the{" "}
            <a
              href="https://developers.google.com/civic-information"
              target="_blank"
              rel="noopener noreferrer"
              className="text-civic-600 hover:text-civic-700 underline"
            >
              Google Civic Information API
            </a>
            , which provides access to U.S. election and representative data.
            When no active election is available, you&rsquo;ll still see your
            current elected officials.
          </p>
          <p className="text-sm text-navy-400">
            Data accuracy depends on the information available from official
            election authorities and the Google Civic Information API.
          </p>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors"
          >
            Look Up Your Ballot
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
