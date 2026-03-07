import { NextResponse } from 'next/server';

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
let cache: { data: unknown; timestamp: number } | null = null;

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json(cache.data);
  }

  try {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ data: [] }, { status: 500 });
    }

    const res = await fetch(
      `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&locale=us&limit=10&language=en`,
      { next: { revalidate: 1800 } }
    );
    const data = await res.json();
    cache = { data, timestamp: Date.now() };
    return NextResponse.json(data);
  } catch {
    if (cache) return NextResponse.json(cache.data);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
