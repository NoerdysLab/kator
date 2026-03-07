import { GlobeEvent } from '../types';
import { fetchNews } from './newsApi';
import { fetchEarthquakes } from './earthquakeApi';
import { fetchGdeltEvents } from './gdeltApi';

export interface FetchResult {
  events: GlobeEvent[];
  counts: { news: number; earthquakes: number; gdelt: number };
  lastUpdated: number;
}

export async function fetchAllEvents(): Promise<FetchResult> {
  const [news, earthquakes, gdelt] = await Promise.allSettled([
    fetchNews(),
    fetchEarthquakes(),
    fetchGdeltEvents(),
  ]);

  const newsEvents = news.status === 'fulfilled' ? news.value : [];
  const quakeEvents = earthquakes.status === 'fulfilled' ? earthquakes.value : [];
  const gdeltEvents = gdelt.status === 'fulfilled' ? gdelt.value : [];

  const all = [...newsEvents, ...quakeEvents, ...gdeltEvents]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 100);

  return {
    events: all,
    counts: {
      news: newsEvents.length,
      earthquakes: quakeEvents.length,
      gdelt: gdeltEvents.length,
    },
    lastUpdated: Date.now(),
  };
}
