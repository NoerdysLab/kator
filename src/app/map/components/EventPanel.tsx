'use client';

import { useState } from 'react';
import { GlobeEvent, MARKER_COLORS } from '../lib/types';

interface EventPanelProps {
  events: GlobeEvent[];
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function colorHex(type: string): string {
  const c = MARKER_COLORS[type] ?? MARKER_COLORS.general;
  return '#' + c.toString(16).padStart(6, '0');
}

function sourceBadge(source: string) {
  const labels: Record<string, string> = {
    news: 'NEWS',
    earthquake: 'QUAKE',
    gdelt: 'GDELT',
  };
  return labels[source] || source.toUpperCase();
}

export default function EventPanel({ events }: EventPanelProps) {
  const [collapsed, setCollapsed] = useState(false);
  const displayed = events.slice(0, 50);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="md:hidden fixed bottom-4 right-4 z-[50] bg-slate-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs border border-slate-700/50"
      >
        {collapsed ? 'Show Feed' : 'Hide Feed'}
      </button>

      <div
        className={`fixed right-0 top-12 bottom-0 w-[380px] bg-slate-950/85 backdrop-blur-md z-[40] border-l border-slate-800/50 flex flex-col transition-transform duration-300 ${
          collapsed ? 'translate-x-full' : 'translate-x-0'
        } max-md:w-full`}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/50">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-xs font-semibold tracking-widest uppercase text-slate-300">
            Live Feed
          </span>
        </div>

        {/* Event list */}
        <div className="flex-1 overflow-y-auto">
          {displayed.map((event) => (
            <div
              key={event.id}
              className="px-4 py-3 border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors cursor-default"
              style={{ borderLeftWidth: 3, borderLeftColor: colorHex(event.type) }}
            >
              <div className="flex items-start gap-2">
                <span
                  className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: colorHex(event.type) }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs leading-tight line-clamp-2">
                    {event.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span
                      className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: colorHex(event.source) + '20',
                        color: colorHex(event.source),
                      }}
                    >
                      {sourceBadge(event.source)}
                    </span>
                    {(event.city || event.country) && (
                      <span className="text-slate-400 text-[10px]">
                        {[event.city, event.country].filter(Boolean).join(', ')}
                      </span>
                    )}
                    <span className="text-slate-500 text-[10px]">
                      {timeAgo(event.timestamp)}
                    </span>
                    {event.meta?.magnitude && (
                      <span className="text-[10px] font-bold text-red-400 bg-red-900/30 px-1.5 py-0.5 rounded">
                        M {event.meta.magnitude.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
                {event.url && (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-cyan-400 transition-colors flex-shrink-0 mt-1"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
          {displayed.length === 0 && (
            <div className="px-4 py-8 text-center text-slate-500 text-xs">
              Loading events...
            </div>
          )}
        </div>
      </div>
    </>
  );
}
