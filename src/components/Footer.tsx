import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-amber-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            <span className="font-semibold text-white">Kator</span>
            <span className="text-sm">
              &mdash; Know your ballot before you vote
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <span className="text-navy-600">|</span>
            <span className="text-navy-400">Nonpartisan civic information</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-navy-800 text-center text-xs text-navy-500">
          Data provided by the{" "}
          <a
            href="https://developers.google.com/civic-information"
            target="_blank"
            rel="noopener noreferrer"
            className="text-civic-400 hover:text-civic-300"
          >
            Google Civic Information API
          </a>
          . Kator is not affiliated with any political party or candidate.
        </div>
      </div>
    </footer>
  );
}
