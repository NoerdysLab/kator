import { GlobeEvent } from '../types';

const ENDPOINT = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson';

export async function fetchEarthquakes(): Promise<GlobeEvent[]> {
  const res = await fetch(ENDPOINT);
  if (!res.ok) return [];

  const data = await res.json();
  const features = data.features || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return features.map((f: any) => {
    const props = f.properties;
    const [lng, lat] = f.geometry.coordinates;
    const mag = props.mag || 0;

    return {
      id: `eq-${f.id}`,
      source: 'earthquake' as const,
      type: 'earthquake' as const,
      title: props.title || `M${mag} Earthquake`,
      description: props.place || undefined,
      lat,
      lng,
      city: props.place || undefined,
      timestamp: props.time || Date.now(),
      intensity: Math.min(mag / 8, 1),
      url: props.url || undefined,
      meta: {
        magnitude: mag,
        significance: props.sig,
      },
    };
  });
}
