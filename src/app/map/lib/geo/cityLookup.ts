import { CITY_COORDS } from '../../data/cities';

interface GeoResult {
  lat: number;
  lng: number;
  city: string;
}

export function geocodeArticle(
  title: string,
  description: string | undefined,
  countryCode: string | undefined
): GeoResult | null {
  // 1. Scan title for known city names
  const titleLower = (title || '').toLowerCase();
  for (const key of Object.keys(CITY_COORDS)) {
    if (key === key.toUpperCase()) continue; // skip country codes
    if (titleLower.includes(key)) {
      const c = CITY_COORDS[key];
      return { lat: c.lat, lng: c.lng, city: c.name };
    }
  }

  // 2. Scan description for known city names
  if (description) {
    const descLower = description.toLowerCase();
    for (const key of Object.keys(CITY_COORDS)) {
      if (key === key.toUpperCase()) continue;
      if (descLower.includes(key)) {
        const c = CITY_COORDS[key];
        return { lat: c.lat, lng: c.lng, city: c.name };
      }
    }
  }

  // 3. Fall back to country capital
  if (countryCode) {
    const code = countryCode.toUpperCase();
    const c = CITY_COORDS[code];
    if (c) {
      return { lat: c.lat, lng: c.lng, city: c.name };
    }
  }

  return null;
}
