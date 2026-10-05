import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, MapPin, Users, Bookmark } from 'lucide-react';
import { SavedPlace } from '../../types';

interface PersonalizationCompleteScreenProps {
  locationName: string;
  selectedPersonas: string[];
  savedPlaces: SavedPlace[];
  onOpenMausam: () => void;
}

export const PersonalizationCompleteScreen: React.FC<PersonalizationCompleteScreenProps> = ({
  locationName,
  selectedPersonas,
  savedPlaces,
  onOpenMausam
}) => {
  return (
    <div className="min-h-[600px] h-full flex flex-col justify-between p-6 bg-[#EEF6FA] text-[#193247]">
      {/* Top Header */}
      <div className="pt-2 text-center">
        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-[#DDEFE7] px-2.5 py-1 rounded-full">
          Step 07 · Setup Complete
        </span>
      </div>

      {/* Center Card */}
      <div className="my-auto py-4 space-y-6 max-w-sm mx-auto text-center">
        <div className="w-16 h-16 rounded-3xl bg-white text-[#174A70] mx-auto flex items-center justify-center shadow-lg border border-slate-200">
          <Sparkles className="w-8 h-8 text-[#F4C95D]" />
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#174A70] tracking-tight">
            YOUR MAUSAM
          </h2>
          <p className="text-xs text-[#607789]">
            Your weather experience is ready.
          </p>
        </div>

        {/* Summary Card */}
        <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-sm text-left space-y-3.5">
          {/* Location */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#EEF6FA] flex items-center justify-center text-[#174A70] shrink-0 border border-slate-100">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Base Anchor</div>
              <div className="text-xs font-bold text-[#193247]">{locationName}, Punjab</div>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Personas */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#EEF6FA] flex items-center justify-center text-[#174A70] shrink-0 border border-slate-100">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Active Personas</div>
              <div className="text-xs font-bold text-[#193247] flex flex-wrap gap-1 mt-0.5">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">🚗 Commuter</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">✈️ Traveller</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Places with Purpose */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#EEF6FA] flex items-center justify-center text-[#174A70] shrink-0 border border-slate-100">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Saved Places & Purpose</div>
              <div className="text-xs font-bold text-[#193247] space-y-1 mt-0.5">
                <div className="text-[11px] text-slate-700">
                  🎓 College <span className="text-[#607789] font-normal">(Daily Commute · 4 PM)</span>
                </div>
                <div className="text-[11px] text-slate-700">
                  ✈️ Delhi Airport <span className="text-[#607789] font-normal">(Highway Travel · NH44)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-800 font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>IMD radar stream connected &amp; citizen network live</span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-2">
        <button
          onClick={onOpenMausam}
          className="w-full h-13 rounded-2xl bg-[#174A70] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#174A70]/15 hover:bg-[#193247] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>OPEN MAUSAM</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
