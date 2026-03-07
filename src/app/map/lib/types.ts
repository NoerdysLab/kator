export interface GlobeEvent {
  id: string;
  source: 'news' | 'earthquake' | 'gdelt';
  type: 'news' | 'earthquake' | 'conflict' | 'protest' | 'disaster' | 'politics' | 'general';
  title: string;
  description?: string;
  lat: number;
  lng: number;
  city?: string;
  country?: string;
  timestamp: number;
  intensity: number;
  url?: string;
  meta?: {
    magnitude?: number;
    significance?: number;
    tone?: number;
    imageUrl?: string;
  };
}

export const MARKER_COLORS: Record<string, number> = {
  news:       0x00d4ff,
  earthquake: 0xff4444,
  conflict:   0xff0044,
  protest:    0xffaa00,
  disaster:   0xff6600,
  politics:   0x9966ff,
  general:    0x00ff88,
};
