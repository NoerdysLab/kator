"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/context/QuizContext";
import { quizQuestions } from "@/lib/quiz-data";
import { ISSUE_LABELS, ISSUE_ICONS } from "@/types/quiz";
import Link from "next/link";

const iconMap: Record<string, JSX.Element> = {
  shield: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  heart: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  globe: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  banknote: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  book: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  train: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h8m-8 4h8m-4 4v4m-4-4h8l2-6V5a2 2 0 00-2-2H8a2 2 0 00-2 2v4l2 6zm-2 4l-2 2m12-2l2 2" />
    </svg>
  ),
  stethoscope: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  home: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  lock: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  leaf: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
};

export default function QuizPage() {
  const router = useRouter();
  const {
    currentIndex,
    answers,
    answerQuestion,
    goToNext,
    goToPrev,
    completeQuiz,
    isComplete,
    totalQuestions,
    progress,
  } = useQuiz();

  const question = quizQuestions[currentIndex];
  const currentAnswer = answers[question.id];
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const answeredCount = Object.keys(answers).length;

  useEffect(() => {
    if (isComplete) {
      router.push("/quiz/results");
    }
  }, [isComplete, router]);

  const handleSelect = (option: "a" | "b") => {
    answerQuestion(question.id, option);
  };

  const handleNext = () => {
    if (isLastQuestion && answeredCount >= totalQuestions) {
      completeQuiz();
    } else {
      goToNext();
    }
  };

  const categoryLabel = ISSUE_LABELS[question.category];
  const categoryIcon = ISSUE_ICONS[question.category];

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        <Link
          href="/"
          className="text-white/70 hover:text-white text-sm flex items-center gap-2 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Exit Quiz
        </Link>
        <span className="text-white/50 text-sm">
          {currentIndex + 1} of {totalQuestions}
        </span>
      </div>

      {/* Progress bar */}
      <div className="px-4 sm:px-6">
        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-civic-400 to-amber-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-3xl">
          {/* Category badge */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-civic-400">
              {iconMap[categoryIcon] || null}
            </span>
            <span className="text-civic-300 text-sm font-medium uppercase tracking-wider">
              {categoryLabel}
            </span>
          </div>

          {/* Scenario */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-white text-center font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
            {question.scenario}
          </h2>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <button
              onClick={() => handleSelect("a")}
              className={`group relative p-6 sm:p-8 rounded-2xl border-2 text-left transition-all duration-200 ${
                currentAnswer === "a"
                  ? "border-civic-400 bg-civic-500/20 shadow-lg shadow-civic-500/10"
                  : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
              }`}
            >
              <span
                className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mb-4 ${
                  currentAnswer === "a"
                    ? "bg-civic-400 text-white"
                    : "bg-white/20 text-white/70"
                }`}
              >
                A
              </span>
              <p className="text-white text-base sm:text-lg leading-relaxed">
                {question.optionA.text}
              </p>
            </button>

            <button
              onClick={() => handleSelect("b")}
              className={`group relative p-6 sm:p-8 rounded-2xl border-2 text-left transition-all duration-200 ${
                currentAnswer === "b"
                  ? "border-amber-400 bg-amber-500/20 shadow-lg shadow-amber-500/10"
                  : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
              }`}
            >
              <span
                className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mb-4 ${
                  currentAnswer === "b"
                    ? "bg-amber-400 text-navy-900"
                    : "bg-white/20 text-white/70"
                }`}
              >
                B
              </span>
              <p className="text-white text-base sm:text-lg leading-relaxed">
                {question.optionB.text}
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 sm:px-6 py-6 flex items-center justify-between">
        <button
          onClick={goToPrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!currentAnswer}
          className={`px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
            currentAnswer
              ? "bg-amber-400 text-navy-900 hover:bg-amber-300 shadow-lg"
              : "bg-white/10 text-white/30 cursor-not-allowed"
          }`}
        >
          {isLastQuestion && answeredCount >= totalQuestions
            ? "See My Results"
            : "Next"}
        </button>
      </div>
    </div>
  );
}
