import { GlobeEvent } from '../types';

const ENDPOINT =
  'https://api.gdeltproject.org/api/v2/geo/geo?query=conflict OR disaster OR protest OR crisis&mode=pointdata&format=geojson&timespan=15min';

function classifyGdeltEvent(name: string): GlobeEvent['type'] {
  const lower = (name || '').toLowerCase();
  if (lower.includes('protest') || lower.includes('rally') || lower.includes('demonstration'))
    return 'protest';
  if (lower.includes('conflict') || lower.includes('attack') || lower.includes('military') || lower.includes('war'))
    return 'conflict';
  if (lower.includes('disaster') || lower.includes('flood') || lower.includes('fire') || lower.includes('storm'))
    return 'disaster';
  if (lower.includes('election') || lower.includes('politic') || lower.includes('government') || lower.includes('vote'))
    return 'politics';
  return 'general';
}

export async function fetchGdeltEvents(): Promise<GlobeEvent[]> {
  const res = await fetch(ENDPOINT);
  if (!res.ok) return [];

  const data = await res.json();
  const features = (data.features || []).slice(0, 50);

  // Deduplicate: cluster within 0.5 degrees
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clustered: any[] = [];
  for (let fi = 0; fi < features.length; fi++) {
    const f = features[fi];
    const [lng, lat] = f.geometry.coordinates;
    const nearby = clustered.find(
      (c) => Math.abs(c.geometry.coordinates[1] - lat) < 0.5 && Math.abs(c.geometry.coordinates[0] - lng) < 0.5
    );
    if (!nearby) {
      clustered.push(f);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return clustered.map((f: any, i: number) => {
    const props = f.properties || {};
    const [lng, lat] = f.geometry.coordinates;
    const name = props.name || props.html || props.title || 'GDELT Event';
    const tone = props.tone ?? props.goldsteintone ?? 0;

    return {
      id: `gdelt-${props.urlsourceurlfull || i}-${lat.toFixed(2)}`,
      source: 'gdelt' as const,
      type: classifyGdeltEvent(name),
      title: typeof name === 'string' ? name.slice(0, 200) : 'GDELT Event',
      lat,
      lng,
      timestamp: Date.now(),
      intensity: Math.min(Math.abs(tone) / 10 + 0.3, 1),
      url: props.url || props.shareimage || undefined,
      meta: { tone },
    };
  });
}
