'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Globe from './components/Globe';
import EventPanel from './components/EventPanel';
import StatusBar from './components/StatusBar';
import Tooltip from './components/Tooltip';
import { GlobeEvent } from './lib/types';
import { fetchAllEvents, FetchResult } from './lib/data/eventNormalizer';

const NEWS_INTERVAL = 30 * 60 * 1000;     // 30 min
const REALTIME_INTERVAL = 15 * 60 * 1000; // 15 min

export default function MapPage() {
  const [events, setEvents] = useState<GlobeEvent[]>([]);
  const [counts, setCounts] = useState({ news: 0, earthquakes: 0, gdelt: 0 });
  const [lastUpdated, setLastUpdated] = useState(0);
  const [tooltip, setTooltip] = useState<{ event: GlobeEvent | null; x: number; y: number }>({
    event: null,
    x: 0,
    y: 0,
  });
  const [loading, setLoading] = useState(true);
  const lastNewsFetch = useRef(0);

  const loadData = useCallback(async (includeNews: boolean) => {
    try {
      const result: FetchResult = await fetchAllEvents();
      setEvents(result.events);
      setCounts(result.counts);
      setLastUpdated(result.lastUpdated);
      if (includeNews) lastNewsFetch.current = Date.now();
    } catch {
      // silently fail, keep existing data
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(true);

    const interval = setInterval(() => {
      const needsNews = Date.now() - lastNewsFetch.current >= NEWS_INTERVAL;
      loadData(needsNews);
    }, REALTIME_INTERVAL);

    return () => clearInterval(interval);
  }, [loadData]);

  const handleHover = useCallback((event: GlobeEvent | null, x: number, y: number) => {
    setTooltip({ event, x, y });
  }, []);

  // Force re-render of time displays every minute
  const [, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {loading && (
        <div className="fixed inset-0 z-[50] flex items-center justify-center bg-slate-950">
          <div className="text-cyan-400 text-sm animate-pulse tracking-widest uppercase">
            Loading Global Events...
          </div>
        </div>
      )}
      <Globe events={events} onHover={handleHover} />
      <StatusBar counts={counts} lastUpdated={lastUpdated} />
      <EventPanel events={events} />
      <Tooltip event={tooltip.event} x={tooltip.x} y={tooltip.y} />
    </div>
  );
}
