"use client";

export default function MockDataBanner({ reason }: { reason?: string }) {
  return (
    <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-400 text-white font-bold text-sm flex-shrink-0">
          !
        </span>
        <div>
          <h3 className="font-bold text-amber-800 text-sm uppercase tracking-wide">
            DEMO MODE
          </h3>
          <p className="text-amber-700 text-sm mt-1">
            {reason ||
              "Showing sample San Francisco election data. This is not real ballot information for your address."}
          </p>
        </div>
      </div>
    </div>
  );
}
