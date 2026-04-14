import React from 'react';
import { Target, ShieldAlert, Zap, MapPin, Info, AlertTriangle, Crosshair, Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw, Clock, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";

// TopoJSON for Middle East region
const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

interface KineticEvent {
  id: string;
  timestamp: string;
  location: string;
  coordinates: [number, number]; // [longitude, latitude]
  assetType: string;
  status: 'confirmed' | 'unconfirmed';
  description: string;
  narrative: string;
  intensity: 'low' | 'medium' | 'high';
}

const INITIAL_EVENTS: KineticEvent[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    location: 'Jask, Iran',
    coordinates: [57.77, 25.64],
    assetType: 'UAV / Shahed-136',
    status: 'confirmed',
    description: 'Low-altitude drone transit detected by regional radar.',
    narrative: 'A single Shahed-136 loitering munition was tracked transiting south from the Jask launch facility. Radar signatures suggest a pre-programmed flight path avoiding established commercial corridors. Regional air defense units have been placed on heightened alert.',
    intensity: 'medium'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    location: 'Strait of Hormuz',
    coordinates: [56.33, 26.56],
    assetType: 'IRGC Fast Attack Craft',
    status: 'confirmed',
    description: 'Harassment maneuver against commercial tanker reported.',
    narrative: 'Three IRGC-N fast attack craft performed high-speed close-quarters maneuvers around the MT "Global Star" (Liberian flag). The incident lasted 12 minutes before the craft withdrew toward Qeshm Island. No boarding attempt was made.',
    intensity: 'high'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    location: 'Al-Hudaydah, Yemen',
    coordinates: [42.95, 14.80],
    assetType: 'Anti-Ship Ballistic Missile',
    status: 'unconfirmed',
    description: 'Thermal signature detected; impact point unknown.',
    narrative: 'Satellite infrared sensors detected a high-energy thermal bloom consistent with a ballistic missile launch from Houthi-controlled territory near Al-Hudaydah. No impact has been reported by vessels in the Red Sea. Possible launch failure or test.',
    intensity: 'high'
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    location: 'Gulf of Oman',
    coordinates: [58.50, 24.50],
    assetType: 'Electronic Warfare / Jamming',
    status: 'confirmed',
    description: 'GPS spoofing reported by multiple vessels in sector 4.',
    narrative: 'Widespread GPS signal degradation and "spoofing" (false location reporting) confirmed by four independent commercial vessels. Interference appears to originate from a mobile platform. Navigation safety advisory issued for the sector.',
    intensity: 'low'
  }
];

export default function KineticEvents() {
  const [events, setEvents] = React.useState<KineticEvent[]>(INITIAL_EVENTS);
  const [isLive, setIsLive] = React.useState(true);
  const [selectedEvent, setSelectedEvent] = React.useState<string | null>(null);
  const [hoveredEventId, setHoveredEventId] = React.useState<string | null>(null);
  const [isEnlarged, setIsEnlarged] = React.useState(false);
  const [position, setPosition] = React.useState({ coordinates: [50, 20], zoom: 1 });
  const [countdown, setCountdown] = React.useState(300); // 5 minutes in seconds

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleReset = () => {
    setPosition({ coordinates: [50, 20], zoom: 1 });
  };

  const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position);
  };

  const countryLabels: { name: string; coordinates: [number, number] }[] = [
    { name: "IRAN", coordinates: [54, 32] },
    { name: "OMAN", coordinates: [57, 21] },
    { name: "UAE", coordinates: [54, 24] },
    { name: "SAUDI ARABIA", coordinates: [45, 24] },
    { name: "YEMEN", coordinates: [47, 15] },
    { name: "QATAR", coordinates: [51.2, 25.3] },
    { name: "KUWAIT", coordinates: [47.5, 29.3] },
    { name: "IRAQ", coordinates: [44, 33] },
  ];

  const generateNewEvent = () => {
    const locations: [string, [number, number]][] = [
      ['Bab el-Mandeb', [43.33, 12.58]],
      ['Strait of Hormuz', [56.33, 26.56]],
      ['Gulf of Aden', [48.00, 12.00]],
      ['Red Sea', [38.00, 20.00]],
      ['Bandar Abbas', [56.28, 27.18]]
    ];
    const loc = locations[Math.floor(Math.random() * locations.length)];
    
    const newEvent: KineticEvent = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      location: loc[0],
      coordinates: loc[1],
      assetType: ['Loitering Munition', 'Surface-to-Air Missile', 'Naval Mine', 'USV (Unmanned Surface Vessel)'][Math.floor(Math.random() * 4)],
      status: Math.random() > 0.3 ? 'confirmed' : 'unconfirmed',
      description: 'Automated detection system triggered by anomalous signature.',
      narrative: 'Automated SIGINT sensors have flagged a high-priority anomalous signature in the sector. Preliminary analysis suggests a non-standard deployment pattern. Intelligence teams are currently cross-referencing with satellite imagery.',
      intensity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any
    };

    setEvents(prev => [newEvent, ...prev].slice(0, 10));
    setCountdown(300); // Reset countdown
  };

  // Simulate live updates
  React.useEffect(() => {
    if (!isLive) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          generateNewEvent();
          return 300;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLive]);

  return (
    <div className="flex flex-col h-full bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
      <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-900">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-red-500 animate-pulse" />
          <h2 className="font-sans font-semibold text-slate-100 uppercase tracking-wider text-xs">Kinetic Activity Map & Feed</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-slate-500" />
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Next Scan: {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}</span>
          </div>
          <div className="h-4 w-px bg-slate-800"></div>
          <div className="flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
            </span>
            <span className="text-[9px] font-mono text-red-500 font-bold uppercase tracking-widest">Live Strikes</span>
          </div>
          <div className="h-4 w-px bg-slate-800"></div>
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Region: Hormuz / Red Sea</span>
        </div>
      </div>

      <div className="flex-1 flex flex-row overflow-hidden relative">
        {/* Map Section (Left) */}
        <div className={cn(
          "bg-slate-950/50 relative overflow-hidden border-r border-slate-800 shrink-0 transition-all duration-500",
          isEnlarged ? "fixed inset-0 z-[100] h-full bg-slate-950" : "flex-1"
        )}>
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0)_0%,rgba(2,6,23,0.8)_100%)]"></div>
          
          {/* Map Controls */}
          <div className="absolute top-2 right-2 z-20 flex flex-col gap-1">
            <button 
              onClick={() => setIsEnlarged(!isEnlarged)}
              className="p-1.5 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded hover:bg-slate-800 transition-colors text-slate-300"
              title={isEnlarged ? "Minimize" : "Enlarge Map"}
            >
              {isEnlarged ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            {isEnlarged && (
              <>
                <button onClick={handleZoomIn} className="p-1.5 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded hover:bg-slate-800 transition-colors text-slate-300">
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button onClick={handleZoomOut} className="p-1.5 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded hover:bg-slate-800 transition-colors text-slate-300">
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button onClick={handleReset} className="p-1.5 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded hover:bg-slate-800 transition-colors text-slate-300">
                  <RotateCcw className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          <ComposableMap
            projection="geoAzimuthalEqualArea"
            projectionConfig={{
              rotate: [-50, -20, 0],
              scale: isEnlarged ? 1500 : 1200
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates as [number, number]}
              onMoveEnd={handleMoveEnd}
              maxZoom={5}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#1e293b"
                      stroke="#334155"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#334155", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Country Labels */}
              {countryLabels.map((label) => (
                <Marker key={label.name} coordinates={label.coordinates}>
                  <text
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize={isEnlarged ? 10 : 8}
                    fontWeight="bold"
                    className="pointer-events-none select-none opacity-40 font-mono tracking-tighter"
                  >
                    {label.name}
                  </text>
                </Marker>
              ))}

              {events.map((event) => (
                <Marker key={event.id} coordinates={event.coordinates}>
                  <motion.g
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onMouseEnter={() => setHoveredEventId(event.id)}
                    onMouseLeave={() => setHoveredEventId(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(event.id);
                    }}
                    className="cursor-pointer"
                  >
                    <circle 
                      r={hoveredEventId === event.id || selectedEvent === event.id ? 6 : 4} 
                      fill={event.intensity === 'high' ? "#ef4444" : "#f59e0b"} 
                      className="transition-all duration-200"
                    />
                    <circle 
                      r={hoveredEventId === event.id || selectedEvent === event.id ? 12 : 8} 
                      fill="none" 
                      stroke={event.intensity === 'high' ? "#ef4444" : "#f59e0b"} 
                      strokeWidth={1} 
                      className="animate-ping" 
                    />
                  </motion.g>
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>

          {/* Tactical Hover Tooltip */}
          <AnimatePresence>
            {hoveredEventId && !selectedEvent && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
              >
                {(() => {
                  const event = events.find(e => e.id === hoveredEventId);
                  if (!event) return null;
                  return (
                    <div className="bg-slate-900/90 backdrop-blur-md border border-amber-500/30 px-4 py-2 rounded shadow-2xl flex items-center gap-4 min-w-[300px]">
                      <div className={cn(
                        "w-2 h-2 rounded-full shrink-0",
                        event.intensity === 'high' ? "bg-red-500 animate-pulse" : "bg-amber-500"
                      )} />
                      <div className="flex-1">
                        <div className="flex justify-between items-center gap-4">
                          <span className="text-[10px] font-bold text-slate-100 uppercase tracking-tight">{event.location}</span>
                          <span className="text-[8px] font-mono text-slate-500 uppercase">{event.assetType}</span>
                        </div>
                        <p className="text-[9px] text-slate-400 line-clamp-1 italic">"{event.description}"</p>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Map Overlay Info */}
          {!selectedEvent && (
            <div className="absolute bottom-2 left-2 p-1.5 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded text-[8px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div> High
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div> Med
              </div>
            </div>
          )}

          {/* Detailed Event Overlay (On Map) */}
          <AnimatePresence>
            {selectedEvent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 p-3 bg-slate-900/95 backdrop-blur-md z-10 flex flex-col justify-center"
              >
                {(() => {
                  const event = events.find(e => e.id === selectedEvent);
                  if (!event) return null;
                  return (
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            event.intensity === 'high' ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-amber-500"
                          )} />
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Tactical Detail</span>
                        </div>
                        <button onClick={() => setSelectedEvent(null)} className="text-slate-500 hover:text-slate-300">
                          <Info className="w-4 h-4 rotate-45" />
                        </button>
                      </div>
                      <h3 className="text-lg font-bold text-slate-100 uppercase tracking-tight">{event.location}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed italic">"{event.description}"</p>
                      <div className="flex items-center gap-4 text-[9px] font-mono text-slate-500 uppercase">
                        <span className="flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> {event.intensity}</span>
                        <span className="flex items-center gap-1"><Info className="w-3 h-3" /> {event.status}</span>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feed Section (Right) */}
        <div className="w-[350px] flex flex-col bg-slate-900/30 overflow-hidden border-l border-slate-800">
          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            <AnimatePresence initial={false}>
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "p-2.5 rounded border transition-all",
                    selectedEvent === event.id 
                      ? "bg-slate-800 border-amber-500/50 ring-1 ring-amber-500/20" 
                      : "bg-slate-900/60 border-slate-800 hover:bg-slate-800/50",
                    event.intensity === 'high' && selectedEvent !== event.id ? "border-red-500/20" : ""
                  )}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-1.5">
                      <time dateTime={event.timestamp} className="text-[8px] font-mono text-slate-500">
                        [{format(new Date(event.timestamp), 'HH:mm')}]
                      </time>
                      <span className={cn(
                        "text-[7px] font-bold uppercase px-1 rounded",
                        event.status === 'confirmed' ? "text-emerald-400 bg-emerald-400/10" : "text-slate-500 bg-slate-800"
                      )}>
                        {event.status}
                      </span>
                    </div>
                    {event.intensity === 'high' && <AlertTriangle className="w-2.5 h-2.5 text-red-500" />}
                  </div>

                  <div className="grid grid-cols-1 gap-1 mb-2">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-2.5 h-2.5 text-slate-500 shrink-0" />
                      <span className="text-[10px] font-bold text-slate-200 truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Crosshair className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                      <span className="text-[9px] font-mono text-amber-400/80 truncate">{event.assetType}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedEvent(event.id)}
                    className="w-full py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-[8px] font-bold uppercase tracking-widest text-slate-300 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Info className="w-2.5 h-2.5" /> View Details
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Secondary Detail Panel (Expandable) */}
          <AnimatePresence>
            {selectedEvent && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-slate-900 border-t border-amber-500/30 overflow-hidden shrink-0"
              >
                {(() => {
                  const event = events.find(e => e.id === selectedEvent);
                  if (!event) return null;
                  return (
                    <div className="p-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest font-bold">Intelligence</span>
                        <span className={cn(
                          "text-[8px] font-bold uppercase px-1 py-0.5 rounded",
                          event.intensity === 'high' ? "bg-red-500/20 text-red-500" : "bg-amber-500/20 text-amber-500"
                        )}>
                          {event.intensity}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-300 leading-relaxed italic border-l border-amber-500/50 pl-2">
                        {event.narrative}
                      </p>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="px-3 py-2 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Source: SIGINT / OSINT</span>
            <div className="h-3 w-px bg-slate-800"></div>
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Projection: Azimuthal Equal Area</span>
          </div>
          
          <div className="h-4 w-px bg-slate-700 hidden md:block"></div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">System: Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-2.5 h-2.5 text-amber-500" />
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Latency: 14ms</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-2.5 h-2.5 text-blue-500" />
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">AES-256 ACTIVE</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
            UTC: {new Date().toISOString().slice(11, 19)}
          </div>
          <button 
            onClick={generateNewEvent}
            className="p-1 hover:bg-slate-800 rounded transition-colors group"
            title="Manual Scan"
          >
            <RefreshCw className="w-3 h-3 text-slate-500 group-hover:text-red-500 transition-colors" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Active Monitoring</span>
          </div>
        </div>
      </div>
    </div>
  );
}
