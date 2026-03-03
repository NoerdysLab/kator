"use client";

import Image from "next/image";
import { Official } from "@/types/ballot";

const levelColors: Record<string, string> = {
  federal: "bg-blue-100 text-blue-800",
  state: "bg-purple-100 text-purple-800",
  local: "bg-green-100 text-green-800",
};

export default function OfficialCard({ official }: { official: Official }) {
  const initials = official.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="bg-white rounded-lg border border-navy-100 shadow-sm p-4">
      <div className="flex items-start gap-4">
        {official.photoUrl ? (
          <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-navy-100 relative">
            <Image
              src={official.photoUrl}
              alt={official.name}
              fill
              className="object-cover"
              sizes="56px"
              unoptimized
            />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-full bg-navy-200 flex items-center justify-center text-navy-600 font-semibold text-lg flex-shrink-0">
            {initials}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${levelColors[official.level] || "bg-gray-100 text-gray-800"}`}
            >
              {official.level}
            </span>
            <span className="text-xs text-navy-400">{official.party}</span>
          </div>
          <h3 className="font-semibold text-navy-900">{official.name}</h3>
          <p className="text-sm text-navy-600">{official.office}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {official.phones.map((phone, i) => (
              <a
                key={i}
                href={`tel:${phone}`}
                className="inline-flex items-center gap-1 px-2 py-1 bg-navy-50 rounded text-xs text-navy-600 hover:bg-navy-100 transition-colors"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {phone}
              </a>
            ))}

            {official.emails.map((email, i) => (
              <a
                key={i}
                href={`mailto:${email}`}
                className="inline-flex items-center gap-1 px-2 py-1 bg-navy-50 rounded text-xs text-navy-600 hover:bg-navy-100 transition-colors"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {email}
              </a>
            ))}

            {official.urls.map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-1 bg-navy-50 rounded text-xs text-civic-600 hover:bg-navy-100 transition-colors"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Website
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
