import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <svg
              className="w-8 h-8 text-amber-400"
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
            <span className="text-xl font-bold tracking-tight">Kator</span>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/quiz"
              className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-semibold"
            >
              Quiz
            </Link>
            <Link
              href="/ballot"
              className="text-navy-200 hover:text-white transition-colors text-sm font-medium"
            >
              Ballot
            </Link>
            <Link
              href="/about"
              className="text-navy-200 hover:text-white transition-colors text-sm font-medium"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
