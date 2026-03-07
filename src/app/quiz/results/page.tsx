"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuiz } from "@/context/QuizContext";
import { ISSUE_LABELS, IssueCategory } from "@/types/quiz";
import { getScoreLabel, getOverallLabel } from "@/lib/quiz-data";
import RadarChart from "@/components/RadarChart";
import AddressInput from "@/components/AddressInput";

const positionColors: Record<string, string> = {
  "Strongly progressive": "bg-blue-500",
  "Lean progressive": "bg-blue-400",
  Moderate: "bg-purple-400",
  "Lean conservative": "bg-red-400",
  "Strongly conservative": "bg-red-500",
};

export default function QuizResultsPage() {
  const router = useRouter();
  const { profile, isComplete, resetQuiz } = useQuiz();

  useEffect(() => {
    if (!isComplete || !profile) {
      router.push("/quiz");
    }
  }, [isComplete, profile, router]);

  if (!profile) return null;

  const categories = Object.keys(profile.scores) as IssueCategory[];
  const overallLabel = getOverallLabel(profile.scores);

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-900 to-navy-800">
      {/* Header */}
      <div className="text-center pt-12 pb-8 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Your Political Profile
        </h1>
        <p className="text-white/60 text-lg">
          Overall:{" "}
          <span className="text-amber-400 font-semibold">{overallLabel}</span>
        </p>
      </div>

      {/* Radar chart */}
      <div className="max-w-lg mx-auto px-4 mb-10">
        <div className="bg-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-sm border border-white/10">
          <RadarChart profile={profile} />
        </div>
      </div>

      {/* Category breakdown */}
      <div className="max-w-2xl mx-auto px-4 mb-12">
        <h2 className="text-lg font-semibold text-white mb-4">
          Issue Breakdown
        </h2>
        <div className="space-y-3">
          {categories.map((cat) => {
            const score = profile.scores[cat];
            const label = getScoreLabel(score);
            // Map score from [-1, 1] to [0, 100] for bar width
            const barPosition = ((score + 1) / 2) * 100;

            return (
              <div
                key={cat}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium">
                    {ISSUE_LABELS[cat]}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full text-white ${positionColors[label] || "bg-gray-500"}`}
                  >
                    {label}
                  </span>
                </div>
                {/* Spectrum bar */}
                <div className="relative h-2 bg-white/10 rounded-full">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-400 to-red-500 opacity-30" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg border-2 border-civic-400 transition-all duration-500"
                    style={{ left: `calc(${barPosition}% - 6px)` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-white/30">Progressive</span>
                  <span className="text-[10px] text-white/30">Conservative</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA section */}
      <div className="max-w-2xl mx-auto px-4 pb-16">
        <div className="bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/10 text-center">
          <h2 className="text-xl font-bold text-white mb-2">
            See how candidates match your views
          </h2>
          <p className="text-white/60 text-sm mb-6">
            Enter your address to see your ballot with personalized match scores.
          </p>
          <div className="max-w-md mx-auto">
            <AddressInput />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={resetQuiz}
            className="text-white/50 hover:text-white text-sm transition-colors"
          >
            Retake Quiz
          </button>
          <span className="text-white/20">|</span>
          <Link
            href="/"
            className="text-white/50 hover:text-white text-sm transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-center pb-8 px-4">
        <p className="text-white/30 text-xs max-w-lg mx-auto">
          Your profile is based on your quiz responses and stays on your device.
          Match scores are estimates — we encourage you to research candidates
          directly.
        </p>
      </div>
    </div>
  );
}
