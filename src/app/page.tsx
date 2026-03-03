import AddressInput from "@/components/AddressInput";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-4">
          Know your ballot
          <br />
          <span className="text-civic-600">before you vote</span>
        </h1>
        <p className="text-lg text-navy-500 max-w-lg mx-auto">
          Enter your address to see upcoming elections, candidates, ballot
          measures, and your current elected officials.
        </p>
      </div>

      {/* Address Input */}
      <div className="w-full max-w-xl mx-auto mb-16">
        <AddressInput />
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="text-center p-6">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-civic-100 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-civic-600"
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
          </div>
          <h3 className="font-semibold text-navy-900 mb-2">Your Ballot</h3>
          <p className="text-sm text-navy-500">
            See every race and ballot measure on your upcoming ballot, tailored
            to your address.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-civic-100 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-civic-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-navy-900 mb-2">
            Your Representatives
          </h3>
          <p className="text-sm text-navy-500">
            Find your elected officials at every level — federal, state, and
            local — with contact info.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-civic-100 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-civic-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-navy-900 mb-2">Nonpartisan</h3>
          <p className="text-sm text-navy-500">
            Just the facts. No endorsements, no bias — civic information
            presented clearly and fairly.
          </p>
        </div>
      </div>
    </div>
  );
}
