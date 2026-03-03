"use client";

import { useState, ReactNode } from "react";

interface BallotSectionProps {
  icon: ReactNode;
  title: string;
  count: number;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function BallotSection({
  icon,
  title,
  count,
  children,
  defaultOpen = true,
}: BallotSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 w-full text-left group"
      >
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-bold text-navy-900 group-hover:text-civic-600 transition-colors">
          {title}
        </h2>
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-civic-100 text-civic-700 text-sm font-semibold">
          {count}
        </span>
        <svg
          className={`w-5 h-5 text-navy-400 ml-auto transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && <div className="mt-4 space-y-4">{children}</div>}
    </section>
  );
}
