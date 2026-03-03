import { NextResponse } from "next/server";

const CIVIC_API_BASE = "https://www.googleapis.com/civicinfo/v2";
const TEST_ADDRESS = "1 Edward Circle York ME 03909";

export async function GET() {
  const apiKey = process.env.GOOGLE_CIVIC_API_KEY;

  const envCheck = {
    GOOGLE_CIVIC_API_KEY: apiKey
      ? `${apiKey.substring(0, 8)}...`
      : "NOT SET",
  };

  if (!apiKey) {
    return NextResponse.json({
      envCheck,
      error: "GOOGLE_CIVIC_API_KEY is not set",
      testAddress: TEST_ADDRESS,
    });
  }

  const results: Record<string, unknown> = {
    envCheck,
    testAddress: TEST_ADDRESS,
  };

  // Call both endpoints
  for (const endpoint of ["voterinfo", "representatives"]) {
    const url = `${CIVIC_API_BASE}/${endpoint}?address=${encodeURIComponent(TEST_ADDRESS)}&key=${apiKey}`;
    try {
      const res = await fetch(url, { cache: "no-store" });
      const body = await res.json();
      results[endpoint] = {
        status: res.status,
        ok: res.ok,
        data: body,
      };
    } catch (err) {
      results[endpoint] = {
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  }

  return NextResponse.json(results);
}
