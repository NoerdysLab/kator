"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { PoliticalProfile, IssueCategory } from "@/types/quiz";
import { quizQuestions, getScoreLabel } from "@/lib/quiz-data";

interface QuizState {
  /** Current question index (0-based) */
  currentIndex: number;
  /** Map of question id -> selected option ('a' | 'b') */
  answers: Record<string, "a" | "b">;
  /** Generated profile (null until quiz is complete) */
  profile: PoliticalProfile | null;
  /** Whether the quiz has been completed */
  isComplete: boolean;
}

interface QuizContextType extends QuizState {
  answerQuestion: (questionId: string, option: "a" | "b") => void;
  goToNext: () => void;
  goToPrev: () => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
  totalQuestions: number;
  progress: number;
}

const QuizContext = createContext<QuizContextType | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QuizState>({
    currentIndex: 0,
    answers: {},
    profile: null,
    isComplete: false,
  });

  const answerQuestion = useCallback(
    (questionId: string, option: "a" | "b") => {
      setState((prev) => ({
        ...prev,
        answers: { ...prev.answers, [questionId]: option },
      }));
    },
    []
  );

  const goToNext = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentIndex: Math.min(prev.currentIndex + 1, quizQuestions.length - 1),
    }));
  }, []);

  const goToPrev = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentIndex: Math.max(prev.currentIndex - 1, 0),
    }));
  }, []);

  const completeQuiz = useCallback(() => {
    setState((prev) => {
      // Aggregate scores by category
      const categoryScores: Record<string, number[]> = {};

      for (const question of quizQuestions) {
        const answer = prev.answers[question.id];
        if (!answer) continue;

        const score =
          answer === "a" ? question.optionA.score : question.optionB.score;

        if (!categoryScores[question.category]) {
          categoryScores[question.category] = [];
        }
        categoryScores[question.category].push(score);
      }

      // Average scores per category
      const scores: Record<IssueCategory, number> = {} as Record<
        IssueCategory,
        number
      >;
      const labels: Record<IssueCategory, string> = {} as Record<
        IssueCategory,
        string
      >;

      for (const [cat, vals] of Object.entries(categoryScores)) {
        const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
        scores[cat as IssueCategory] = avg;
        labels[cat as IssueCategory] = getScoreLabel(avg);
      }

      const profile: PoliticalProfile = {
        scores,
        labels,
        completedAt: new Date().toISOString(),
      };

      return { ...prev, profile, isComplete: true };
    });
  }, []);

  const resetQuiz = useCallback(() => {
    setState({
      currentIndex: 0,
      answers: {},
      profile: null,
      isComplete: false,
    });
  }, []);

  const totalQuestions = quizQuestions.length;
  const progress =
    (Object.keys(state.answers).length / totalQuestions) * 100;

  return (
    <QuizContext.Provider
      value={{
        ...state,
        answerQuestion,
        goToNext,
        goToPrev,
        completeQuiz,
        resetQuiz,
        totalQuestions,
        progress,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz(): QuizContextType {
  const ctx = useContext(QuizContext);
  if (!ctx) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return ctx;
}
