"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AddressInput({
  initialAddress = "",
  compact = false,
}: {
  initialAddress?: string;
  compact?: boolean;
}) {
  const [address, setAddress] = useState(initialAddress);
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = address.trim();
    if (!trimmed) return;
    router.push(`/ballot?address=${encodeURIComponent(trimmed)}`);
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your home address..."
          className="flex-1 px-3 py-2 text-sm border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-civic-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-civic-600 rounded-lg hover:bg-civic-700 transition-colors"
        >
          Look Up
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <label
        htmlFor="address"
        className="block text-sm font-medium text-navy-700 mb-2"
      >
        Enter your home address
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="e.g. 1600 Pennsylvania Ave, Washington DC 20500"
          className="flex-1 px-4 py-3 text-navy-900 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-civic-500 focus:border-transparent text-base"
        />
        <button
          type="submit"
          className="px-8 py-3 font-semibold text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors text-base whitespace-nowrap"
        >
          Find My Ballot
        </button>
      </div>
      <p className="mt-2 text-xs text-navy-400">
        Your address is used only to look up civic information and is not stored.
      </p>
    </form>
  );
}
