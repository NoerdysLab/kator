import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CIVIC_API_BASE = "https://www.googleapis.com/civicinfo/v2";
const TEST_ADDRESS = "1 Edward Circle, York, ME 03909";

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

  const endpoints = ["voterinfo", "representatives"] as const;
  const results: Record<string, unknown> = {
    envCheck,
    testAddress: TEST_ADDRESS,
    apiBase: CIVIC_API_BASE,
  };

  for (const endpoint of endpoints) {
    const fullUrl = `${CIVIC_API_BASE}/${endpoint}?address=${encodeURIComponent(TEST_ADDRESS)}&key=${apiKey}`;
    // Show URL with key redacted for debugging
    const redactedUrl = fullUrl.replace(apiKey, apiKey.substring(0, 8) + "...");

    try {
      const res = await fetch(fullUrl, { cache: "no-store" });
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

      results[endpoint] = {
        requestUrl: redactedUrl,
        httpStatus: res.status,
        httpStatusText: res.statusText,
        ok: res.ok,
        responseContentType: contentType,
        responseHeaders,
        body,
      };
    } catch (err) {
      results[endpoint] = {
        requestUrl: redactedUrl,
        fetchError: err instanceof Error ? err.message : "Unknown error",
        errorStack: err instanceof Error ? err.stack : undefined,
      };
    }
  }

  return NextResponse.json(results, {
    headers: { "Cache-Control": "no-store" },
  });
}
