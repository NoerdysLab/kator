import { GlobeEvent } from '../types';
import { geocodeArticle } from '../geo/cityLookup';

export async function fetchNews(): Promise<GlobeEvent[]> {
  const res = await fetch('/api/globe-news');
  if (!res.ok) return [];

  const json = await res.json();
  const articles = json.data || [];

  const events: GlobeEvent[] = [];
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const geo = geocodeArticle(
      article.title || '',
      article.description || article.snippet || undefined,
      article.locale || article.country || undefined
    );
    if (!geo) continue;

    events.push({
      id: `news-${article.uuid || article.url || Math.random()}`,
      source: 'news',
      type: 'news',
      title: article.title || 'News',
      description: article.description || article.snippet || undefined,
      lat: geo.lat,
      lng: geo.lng,
      city: geo.city,
      country: article.locale || article.country,
      timestamp: article.published_at ? new Date(article.published_at).getTime() : Date.now(),
      intensity: 0.6,
      url: article.url || undefined,
      meta: {
        imageUrl: article.image_url || undefined,
      },
    });
  }

  return events;
}
