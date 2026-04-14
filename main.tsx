import React from 'react';
import { Anchor, Ship, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function MaritimeTraffic() {
  const [status, setStatus] = React.useState<'normal' | 'caution' | 'restricted'>('caution');

  return (
    <div className="flex flex-col h-full bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dataset",
          "name": "Hormuz Maritime Traffic Data",
          "description": "Live AIS tracking data for vessels transiting the Strait of Hormuz.",
          "spatialCoverage": "Strait of Hormuz",
          "variableMeasured": ["Vessel Count", "Inbound Flow", "Outbound Flow"],
          "isAccessibleForFree": true
        })}
      </script>
      <div className="p-4 border-bottom border-slate-800 flex items-center justify-between bg-slate-900">
        <div className="flex items-center gap-2">
          <Anchor className="w-5 h-5 text-blue-400" />
          <h2 className="font-sans font-semibold text-slate-100 uppercase tracking-wider text-sm">Hormuz Maritime Traffic</h2>
        </div>
        <div className={cn(
          "flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter",
          status === 'normal' && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
          status === 'caution' && "bg-amber-500/10 text-amber-400 border border-amber-500/20",
          status === 'restricted' && "bg-red-500/10 text-red-400 border border-red-500/20"
        )}>
          {status === 'normal' && <CheckCircle2 className="w-3 h-3" />}
          {status === 'caution' && <AlertTriangle className="w-3 h-3" />}
          {status === 'restricted' && <AlertTriangle className="w-3 h-3" />}
          {status} Passage
        </div>
      </div>

      <div className="flex-1 flex flex-row overflow-hidden">
        {/* Map Section (Left) */}
        <div className="flex-1 relative bg-slate-950">
          <iframe
            name="marinetraffic"
            id="marinetraffic"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src="https://www.marinetraffic.com/en/ais/embed?zoom=7&centery=26.5&centerx=56.5&maptype=4&shownames=false&mmsi=0&shipid=0&fleet=&fleet_id=&vessels=0&container=true&show_track=false&vessel_type=0"
            className="absolute inset-0 opacity-80 grayscale contrast-125 brightness-75 hover:grayscale-0 transition-all duration-500"
          >
            Browser does not support iframes.
          </iframe>
          
          {/* Overlay for "Command Center" feel */}
          <div className="absolute inset-0 pointer-events-none border-[20px] border-transparent border-t-slate-900/20 border-b-slate-900/20"></div>
          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700 p-2 rounded text-[10px] font-mono text-slate-400 space-y-1">
            <div className="flex justify-between gap-4">
              <span>LAT:</span>
              <span className="text-slate-200">26.5872° N</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>LON:</span>
              <span className="text-slate-200">56.4521° E</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>VESSELS:</span>
              <span className="text-blue-400">142 IN TRANSIT</span>
            </div>
          </div>
        </div>

        {/* Stats Section (Right) */}
        <div className="w-[300px] p-4 bg-slate-900/80 border-l border-slate-800 flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Inbound Flow</span>
              <span className="text-xs font-mono text-blue-400">65%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[65%] shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Outbound Flow</span>
              <span className="text-xs font-mono text-emerald-400">42%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[42%] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center gap-3 p-3 bg-slate-950/50 rounded border border-slate-800/50">
              <Ship className="w-5 h-5 text-slate-500" />
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Active Tankers</p>
                <p className="text-lg font-mono font-bold text-slate-200">84</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
