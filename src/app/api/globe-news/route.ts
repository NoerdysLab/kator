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
      console.error('[globe-news] NEWS_API_KEY env var is missing');
      return NextResponse.json({ data: [] });
    }

    const res = await fetch(
      `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&locale=us&limit=10&language=en`,
      { next: { revalidate: 1800 } }
    );

    if (!res.ok) {
      console.error(`[globe-news] TheNewsAPI returned ${res.status}: ${await res.text()}`);
      if (cache) return NextResponse.json(cache.data);
      return NextResponse.json({ data: [] });
    }

    const json = await res.json();
    const articles = json.data || [];
    cache = { data: { data: articles }, timestamp: Date.now() };
    return NextResponse.json(cache.data);
  } catch (error) {
    console.error('[globe-news] Fetch failed:', error);
    if (cache) return NextResponse.json(cache.data);
    return NextResponse.json({ data: [] });
  }
}
