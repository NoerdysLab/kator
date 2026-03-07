'use client';

import { GlobeEvent, MARKER_COLORS } from '../lib/types';

interface TooltipProps {
  event: GlobeEvent | null;
  x: number;
  y: number;
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

export default function Tooltip({ event, x, y }: TooltipProps) {
  if (!event) return null;

  const offsetX = x > window.innerWidth - 300 ? -220 : 16;
  const offsetY = y > window.innerHeight - 150 ? -120 : 16;

  return (
    <div
      className="fixed z-[60] pointer-events-none transition-opacity duration-150"
      style={{
        left: x + offsetX,
        top: y + offsetY,
        opacity: 1,
      }}
    >
      <div
        className="bg-slate-900/90 backdrop-blur-sm rounded-lg px-3 py-2 max-w-[250px] border border-slate-700/50"
        style={{ borderLeftColor: colorHex(event.type), borderLeftWidth: 3 }}
      >
        <p className="text-white text-xs font-medium leading-tight line-clamp-2">
          {event.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
            style={{ backgroundColor: colorHex(event.source) + '30', color: colorHex(event.source) }}
          >
            {event.source}
          </span>
          {event.city && (
            <span className="text-slate-400 text-[10px]">{event.city}</span>
          )}
          <span className="text-slate-500 text-[10px]">{timeAgo(event.timestamp)}</span>
        </div>
        {event.meta?.magnitude && (
          <span className="inline-block mt-1 text-[10px] font-bold text-red-400 bg-red-900/30 px-1.5 py-0.5 rounded">
            M {event.meta.magnitude.toFixed(1)}
          </span>
        )}
      </div>
    </div>
  );
}
