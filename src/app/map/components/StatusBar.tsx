'use client';

interface StatusBarProps {
  counts: { news: number; earthquakes: number; gdelt: number };
  lastUpdated: number;
}

export default function StatusBar({ counts, lastUpdated }: StatusBarProps) {
  const minsAgo = lastUpdated
    ? Math.max(0, Math.floor((Date.now() - lastUpdated) / 60000))
    : null;

  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-slate-950/80 backdrop-blur-sm z-[40] flex items-center justify-between px-4 border-b border-slate-800/50">
      <div className="flex items-center gap-2">
        <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase">
          Global Events Monitor
        </span>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <span className="text-cyan-300">
          News: <span className="text-white font-medium">{counts.news}</span>
        </span>
        <span className="text-slate-500">|</span>
        <span className="text-red-400">
          Quakes: <span className="text-white font-medium">{counts.earthquakes}</span>
        </span>
        <span className="text-slate-500">|</span>
        <span className="text-green-400">
          GDELT: <span className="text-white font-medium">{counts.gdelt}</span>
        </span>
        {minsAgo !== null && (
          <>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">
              Updated {minsAgo === 0 ? 'just now' : `${minsAgo}m ago`}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
