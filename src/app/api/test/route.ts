import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CIVIC_API_BASE = "https://www.googleapis.com/civicinfo/v2";
const TEST_ADDRESS = "1 Edward Circle, York, ME 03909";

async function testEndpoint(url: string, redactedUrl: string) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    const responseHeaders: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    let body: unknown;
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = await res.json();
    } else {
      body = await res.text();
    }

    return {
      requestUrl: redactedUrl,
      httpStatus: res.status,
      httpStatusText: res.statusText,
      ok: res.ok,
      responseContentType: contentType,
      responseHeaders,
      body,
    };
  } catch (err) {
    return {
      requestUrl: redactedUrl,
      fetchError: err instanceof Error ? err.message : "Unknown error",
      errorStack: err instanceof Error ? err.stack : undefined,
    };
  }
}

export async function GET() {
  const apiKey = process.env.GOOGLE_CIVIC_API_KEY;

  const envCheck = {
    GOOGLE_CIVIC_API_KEY_exists: !!apiKey,
    GOOGLE_CIVIC_API_KEY_first8: apiKey
      ? apiKey.substring(0, 8)
      : "NOT SET",
    GOOGLE_CIVIC_API_KEY_length: apiKey ? apiKey.length : 0,
  };

  if (!apiKey) {
    return NextResponse.json({
      envCheck,
      error: "GOOGLE_CIVIC_API_KEY is not set",
      testAddress: TEST_ADDRESS,
    });
  }

  const encodedAddress = encodeURIComponent(TEST_ADDRESS);
  const redactedKey = apiKey.substring(0, 8) + "...";

  // Test all three endpoints
  const endpoints = {
    voterinfo: `${CIVIC_API_BASE}/voterinfo?address=${encodedAddress}&key=`,
    representatives_DEPRECATED: `${CIVIC_API_BASE}/representatives?address=${encodedAddress}&key=`,
    divisionsByAddress: `${CIVIC_API_BASE}/divisionsByAddress?address=${encodedAddress}&key=`,
  };

  const results: Record<string, unknown> = {
    envCheck,
    testAddress: TEST_ADDRESS,
    apiBase: CIVIC_API_BASE,
    note: "The 'representatives' endpoint was shut down by Google on April 30, 2025. Use 'divisionsByAddress' instead.",
  };

  for (const [name, baseUrl] of Object.entries(endpoints)) {
    const fullUrl = baseUrl + apiKey;
    const redactedUrl = baseUrl + redactedKey;
    results[name] = await testEndpoint(fullUrl, redactedUrl);
  }

  return NextResponse.json(results, {
    headers: { "Cache-Control": "no-store" },
  });
}
