import { NextRequest, NextResponse } from "next/server";

const CIVIC_API_BASE = "https://www.googleapis.com/civicinfo/v2";

async function fetchCivicApi(
  endpoint: string,
  address: string,
  apiKey: string
): Promise<{ data: Record<string, unknown> | null; error: string | null }> {
  const url = `${CIVIC_API_BASE}/${endpoint}?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const message =
        (body as Record<string, Record<string, string>>)?.error?.message ||
        `HTTP ${res.status}`;
      return { data: null, error: message };
    }
    const data = await res.json();
    return { data: data as Record<string, unknown>, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address");

  if (!address) {
    return NextResponse.json(
      { error: "Missing 'address' query parameter" },
      { status: 400 }
    );
  }

  const apiKey = process.env.GOOGLE_CIVIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server configuration error: missing API key" },
      { status: 500 }
    );
  }

  const [voterInfoResult, divisionsResult] = await Promise.all([
    fetchCivicApi("voterinfo", address, apiKey),
    fetchCivicApi("divisionsByAddress", address, apiKey),
  ]);

  return NextResponse.json({
    voterInfo: voterInfoResult.data,
    voterInfoError: voterInfoResult.error,
    divisions: divisionsResult.data,
    divisionsError: divisionsResult.error,
    // Keep old field names as null for backwards compat with mapper
    representatives: null,
    representativesError: divisionsResult.error
      ? `Representatives API was shut down by Google (April 2025). Divisions lookup: ${divisionsResult.error}`
      : null,
  });
}
