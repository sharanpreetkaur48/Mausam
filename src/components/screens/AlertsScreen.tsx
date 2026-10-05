import React, { useState } from 'react';
import { WeatherWarning, GroundReport } from '../../types';
import { OFFICIAL_WARNINGS, GROUND_REPORTS } from '../../data/mockData';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  Filter, 
  Info,
  ShieldCheck,
  Users
} from 'lucide-react';

interface AlertsScreenProps {
  onOpenEvidence: (report: GroundReport) => void;
  onOpenMap: () => void;
}

export const AlertsScreen: React.FC<AlertsScreenProps> = ({
  onOpenEvidence,
  onOpenMap
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'OFFICIAL' | 'GROUND' | 'ESTIMATED'>('ALL');
  const [expandedWarningId, setExpandedWarningId] = useState<string | null>('warn-imd-thunderstorm');

  return (
    <div className="min-h-[640px] h-full flex flex-col justify-between p-4 sm:p-5 bg-[#EEF6FA] text-[#193247] space-y-4">
      {/* 1. Header with Hierarchy Banner */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-[#4C9ED9] uppercase tracking-wider">
            Step 20 · Safety & Warnings
          </span>
          <span className="text-[10px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
            Official First Policy
          </span>
        </div>
        <h2 className="text-xl font-black text-[#174A70] tracking-tight">
          Active Weather Alerts
        </h2>
        <p className="text-xs text-[#607789]">
          Official IMD warnings take absolute legal and visual priority over citizen ground reports.
        </p>
      </div>

      {/* 2. Filter Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shadow-xs">
        {(['ALL', 'OFFICIAL', 'GROUND', 'ESTIMATED'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
              activeFilter === filter
                ? 'bg-[#174A70] text-white shadow-xs'
                : 'text-[#607789] hover:text-[#193247]'
            }`}
          >
            {filter === 'ALL' ? 'All (4)' : filter === 'OFFICIAL' ? 'Official (2)' : filter === 'GROUND' ? 'Ground (2)' : 'Model (1)'}
          </button>
        ))}
      </div>

      {/* 3. Alerts Feed */}
      <div className="space-y-3 flex-1 overflow-y-auto pr-0.5 max-h-[460px]">
        {/* SECTION 1: OFFICIAL IMD WARNINGS (ALWAYS FIRST) */}
        {(activeFilter === 'ALL' || activeFilter === 'OFFICIAL') && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C94343] flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-[#C94343]" />
                1. Official IMD Bulletins (Highest Priority)
              </span>
              <span className="text-[10px] text-slate-500">Government Source</span>
            </div>

            {OFFICIAL_WARNINGS.map((warn) => {
              const isExpanded = expandedWarningId === warn.id;

              return (
                <div
                  key={warn.id}
                  className="p-4 bg-white rounded-3xl border-2 border-rose-200 shadow-xs relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#C94343] flex items-center justify-center font-bold text-xl shrink-0 border border-rose-200">
                        ⚡
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white px-2 py-0.5 rounded">
                            OFFICIAL IMD
                          </span>
                          <span className="text-[10px] text-slate-500 font-semibold">
                            {warn.timeValidUntil}
                          </span>
                        </div>
                        <h3 className="text-xs font-black text-[#193247] mt-1">
                          {warn.title}
                        </h3>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Issued by {warn.issuedBy}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedWarningId(isExpanded ? null : warn.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                    >
                      <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                  </div>

                  {/* Body & Action Advice */}
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 text-xs">
                    <p className="text-slate-700 leading-relaxed text-[11px]">
                      {warn.description}
                    </p>

                    <div className="p-2.5 rounded-2xl bg-[#EEF6FA] border border-[#4C9ED9]/20 text-[11px]">
                      <span className="font-bold text-[#174A70] block mb-0.5">IMD Action Advisory:</span>
                      <p className="text-slate-700">{warn.actionAdvice}</p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="text-[10px] text-slate-500">
                        Affected: <strong className="text-slate-800">{warn.affectedAreas.join(', ')}</strong>
                      </div>
                      <button
                        onClick={onOpenMap}
                        className="text-[11px] font-bold text-[#174A70] hover:underline"
                      >
                        View Zone on Map →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SECTION 2: ESTIMATED / ROUTE WEATHER (MIDDLE) */}
        {(activeFilter === 'ALL' || activeFilter === 'ESTIMATED') && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#174A70] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#4C9ED9]" />
                2. Commute Forecast Alert (4 PM)
              </span>
              <span className="text-[10px] text-slate-500">IMD Radar Model</span>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌧️</span>
                <div>
                  <div className="text-xs font-bold text-[#193247]">70% Rain Expected at 4:00 PM</div>
                  <div className="text-[11px] text-slate-500">Affects your saved College commute corridor on Gill Road</div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#174A70] bg-[#EEF6FA] px-2 py-1 rounded-lg border border-[#4C9ED9]/20">
                Commute
              </span>
            </div>
          </div>
        )}

        {/* SECTION 3: CITIZEN GROUND REALITY REPORTS (BELOW OFFICIAL) */}
        {(activeFilter === 'ALL' || activeFilter === 'GROUND') && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-emerald-700" />
                3. Ground Reality (Citizen Reports)
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 rounded">Not Official IMD</span>
            </div>

            {GROUND_REPORTS.slice(0, 2).map((rep) => (
              <div
                key={rep.id}
                onClick={() => onOpenEvidence(rep)}
                className="p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs cursor-pointer transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2.5">
                    <span className="text-xl">🌊</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold bg-[#DDEFE7] text-emerald-800 px-1.5 py-0.2 rounded uppercase">
                          Citizen Report
                        </span>
                        <span className="text-[10px] text-slate-400">· {rep.timeAgoMins}m ago</span>
                      </div>
                      <div className="text-xs font-bold text-[#193247] mt-0.5">{rep.title}</div>
                      <div className="text-[11px] text-slate-500">{rep.reportCount} reports · {rep.photosCount} photos · {rep.trafficStatus}</div>
                    </div>
                  </div>
                  <span className="text-xs text-[#174A70] font-bold hover:underline">
                    Evidence →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer reassurance */}
      <div className="p-3 bg-[#EEF6FA] rounded-2xl border border-slate-200/80 text-[11px] text-slate-600 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#174A70] shrink-0" />
        <span>IMD official warnings trigger instant loud notification sirens; citizen reports remain advisory only.</span>
      </div>
    </div>
  );
};
