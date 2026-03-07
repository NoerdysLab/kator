"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getMeasureById } from "@/lib/curated-data/measures";

export default function MeasureDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const measure = getMeasureById(id);

  if (!measure) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-navy-900 mb-4">
          Measure Not Found
        </h1>
        <p className="text-navy-500 mb-6">
          This measure isn&apos;t in our curated database yet.
        </p>
        <Link href="/ballot" className="text-civic-600 hover:underline">
          Back to Ballot
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-navy-400 mb-6">
        <Link href="/" className="hover:text-navy-600">Home</Link>
        <span>/</span>
        <Link href="/ballot" className="hover:text-navy-600">Ballot</Link>
        <span>/</span>
        <span className="text-navy-600">{measure.code}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium mb-3">
          {measure.code}
        </span>
        <h1 className="text-3xl font-bold text-navy-900 mb-3">
          {measure.title}
        </h1>
        <p className="text-navy-600 text-lg">{measure.summary}</p>
      </div>

      {/* Why it matters */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
        <h2 className="font-semibold text-amber-800 text-sm mb-2 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Why This Matters To You
        </h2>
        <p className="text-amber-900 text-sm">{measure.whyItMatters}</p>
      </div>

      {/* What this actually means */}
      <div className="bg-civic-50 border border-civic-200 rounded-xl p-6 mb-8">
        <h2 className="font-semibold text-civic-800 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          What This Actually Means
        </h2>
        <p className="text-civic-900 leading-relaxed">{measure.plainEnglish}</p>
      </div>

      {/* Official text */}
      <div className="mb-8">
        <h2 className="font-semibold text-navy-900 mb-3">Official Ballot Language</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
          <p className="text-navy-600 text-sm leading-relaxed italic">
            &ldquo;{measure.officialText}&rdquo;
          </p>
        </div>
      </div>

      {/* Fiscal impact */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
        <h2 className="font-semibold text-amber-800 text-sm mb-2">
          Fiscal Impact
        </h2>
        <p className="text-amber-900 text-sm">{measure.fiscalImpact}</p>
        {measure.personalImpact && (
          <p className="text-amber-700 text-sm mt-2 font-medium">
            What it means for you: {measure.personalImpact}
          </p>
        )}
      </div>

      {/* Pro / Con */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Arguments For
          </h2>
          <div className="space-y-2">
            {measure.proArguments.map((arg, i) => (
              <div
                key={i}
                className="flex items-start gap-2 bg-green-50 border border-green-100 rounded-lg p-3"
              >
                <span className="text-green-500 font-bold text-sm mt-0.5">+</span>
                <p className="text-sm text-green-900">{arg}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Arguments Against
          </h2>
          <div className="space-y-2">
            {measure.conArguments.map((arg, i) => (
              <div
                key={i}
                className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg p-3"
              >
                <span className="text-red-500 font-bold text-sm mt-0.5">-</span>
                <p className="text-sm text-red-900">{arg}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supporters & Opponents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div>
          <h3 className="text-sm font-semibold text-navy-700 mb-2">
            Notable Supporters
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {measure.supporters.map((s) => (
              <span
                key={s}
                className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-navy-700 mb-2">
            Notable Opponents
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {measure.opponents.map((o) => (
              <span
                key={o}
                className="text-xs px-2 py-1 rounded-full bg-red-50 text-red-600 border border-red-200"
              >
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-navy-400 text-center mt-8 mb-4">
        This summary is for informational purposes only. Read the full official
        text and consult trusted sources before voting.
      </p>
    </div>
  );
}
