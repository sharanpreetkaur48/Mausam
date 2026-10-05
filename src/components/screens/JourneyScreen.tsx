import React, { useState } from 'react';
import { JOURNEY_WAYPOINTS, GROUND_REPORTS } from '../../data/mockData';
import { JourneyWaypoint, GroundReport } from '../../types';
import { 
  Navigation, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight, 
  BellRing, 
  Map, 
  Layers,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface JourneyScreenProps {
  onViewEvidence: (report: GroundReport) => void;
  onViewOnMap: () => void;
}

export const JourneyScreen: React.FC<JourneyScreenProps> = ({
  onViewEvidence,
  onViewOnMap
}) => {
  const [alertSet, setAlertSet] = useState(false);
  const [selectedWaypoint, setSelectedWaypoint] = useState<string>('stop-panipat');

  const panipatReport = GROUND_REPORTS[1] || GROUND_REPORTS[0];

  return (
    <div className="min-h-[640px] h-full flex flex-col justify-between p-4 sm:p-5 bg-[#EEF6FA] text-[#193247] space-y-4">
      {/* 1. Header with Journey Summary */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#174A70] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              🛣️
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Route</div>
              <h2 className="text-sm font-black text-[#174A70]">Ludhiana → Delhi (IGI T3)</h2>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-black text-[#193247] block">310 km</span>
            <span className="text-[10px] text-[#607789] flex items-center gap-0.5 justify-end">
              <Clock className="w-3 h-3 text-[#4C9ED9]" />
              ETA 4h 30m
            </span>
          </div>
        </div>

        {/* 2. CONTEXTUAL ADVISORY CARD (Step 18 Hero Banner) */}
        <div className="mt-3.5 p-3.5 bg-[#F4EBDD]/60 rounded-2xl border border-[#F4EBDD] space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-black text-[#C94343]">
              <AlertTriangle className="w-4 h-4 text-[#C94343] shrink-0" />
              <span>⚠️ CONTEXTUAL ADVISORY: WEATHER AHEAD</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider bg-rose-100 text-[#C94343] px-2 py-0.5 rounded-full">
              High Impact
            </span>
          </div>

          <p className="text-xs font-semibold text-slate-900 leading-snug">
            "Heavy rain is forecast near Panipat and recent local reports indicate possible waterlogging."
          </p>

          <p className="text-[11px] text-slate-600 italic">
            Key prediction: <span className="font-bold text-[#174A70]">Rain may occur near Panipat approximately 40 minutes into your journey.</span>
          </p>

          {/* Evidence Triad Badges */}
          <div className="pt-2 border-t border-amber-200/60 grid grid-cols-3 gap-1.5 text-center text-[10px]">
            <div className="p-1.5 rounded-lg bg-white/80 border border-slate-200">
              <span className="text-slate-400 block font-mono text-[9px] uppercase">Official</span>
              <strong className="text-[#174A70]">IMD Forecast</strong>
            </div>
            <div className="p-1.5 rounded-lg bg-white/80 border border-slate-200">
              <span className="text-slate-400 block font-mono text-[9px] uppercase">Ground</span>
              <strong className="text-emerald-800">18 Reports</strong>
            </div>
            <div className="p-1.5 rounded-lg bg-white/80 border border-slate-200">
              <span className="text-slate-400 block font-mono text-[9px] uppercase">Route</span>
              <strong className="text-[#C94343]">+40 min ETA</strong>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-1 flex items-center justify-between gap-2">
            <button
              onClick={() => onViewEvidence(panipatReport)}
              className="flex-1 py-1.5 px-2 bg-white text-[#174A70] rounded-xl text-[11px] font-bold border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1 shadow-xs"
            >
              <span>VIEW EVIDENCE</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button
              onClick={onViewOnMap}
              className="py-1.5 px-3 bg-[#174A70] text-white rounded-xl text-[11px] font-bold hover:bg-[#193247] transition-colors flex items-center gap-1 shadow-xs"
            >
              <Map className="w-3 h-3" />
              <span>MAP</span>
            </button>

            <button
              onClick={() => setAlertSet(!alertSet)}
              className={`py-1.5 px-2.5 rounded-xl text-[11px] font-bold border transition-colors flex items-center gap-1 ${
                alertSet
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <BellRing className={`w-3 h-3 ${alertSet ? 'text-emerald-600 fill-emerald-600' : ''}`} />
              <span>{alertSet ? 'Alert Active' : 'Set Alert'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. WEATHER AHEAD TIMELINE (Step 17) */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-[10px] font-bold text-[#4C9ED9] uppercase tracking-wider">
              Step 17 · Weather Ahead
            </div>
            <h3 className="text-xs font-black text-[#174A70]">
              ARRIVAL TIME-MATCHED WEATHER
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border">
            Auto-synced to driving speed
          </span>
        </div>

        {/* Waypoints progression */}
        <div className="relative pl-6 space-y-4 pt-1">
          {/* Vertical connecting line */}
          <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-slate-200" />

          {JOURNEY_WAYPOINTS.map((wp, index) => {
            const isPanipat = wp.id === 'stop-panipat';

            return (
              <div
                key={wp.id}
                onClick={() => setSelectedWaypoint(wp.id)}
                className={`relative p-3 rounded-2xl border transition-all cursor-pointer ${
                  isPanipat
                    ? 'bg-rose-50/70 border-rose-300 ring-1 ring-rose-200 shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-white'
                }`}
              >
                {/* Node marker on the vertical line */}
                <div
                  className={`absolute -left-6 top-4 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center ${
                    isPanipat ? 'bg-[#C94343] ring-2 ring-rose-200 animate-ping' : 'bg-[#174A70]'
                  }`}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{wp.icon}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#193247]">{wp.name}</span>
                        {isPanipat && (
                          <span className="text-[9px] font-bold bg-[#C94343] text-white px-1.5 py-0.2 rounded">
                            Action Required
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {wp.distanceFromStartKm} km · Arrival: <strong className="text-slate-800">{wp.etaFormatted}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-black text-[#174A70]">{wp.temp}°C</span>
                    <span className="text-[10px] text-slate-500 block">{wp.condition}</span>
                  </div>
                </div>

                {/* Specific Advisory Callout for Panipat */}
                {wp.hasAdvisory && (
                  <div className="mt-2 pt-2 border-t border-rose-200 text-[11px] text-[#C94343] font-semibold flex items-center justify-between">
                    <span>{wp.advisoryNote}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewEvidence(panipatReport);
                      }}
                      className="text-[10px] underline font-bold"
                    >
                      See Evidence
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Switcher */}
      <div className="flex justify-between items-center text-xs pt-1">
        <button
          onClick={onViewOnMap}
          className="w-full py-3 bg-[#174A70] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#193247] transition-all cursor-pointer"
        >
          <Map className="w-4 h-4" />
          <span>INSPECT JOURNEY ON WEATHER MAP</span>
        </button>
      </div>
    </div>
  );
};
