import React from 'react';
import { MapPin, ShieldCheck, HelpCircle, History } from 'lucide-react';

interface HeaderProps {
  locationName: string;
  onOpenLocationSelect?: () => void;
  onOpenWhy?: () => void;
  onOpenWhatChanged?: () => void;
  activePersonaLabel?: string;
}

export const Header: React.FC<HeaderProps> = ({
  locationName,
  onOpenLocationSelect,
  onOpenWhy,
  onOpenWhatChanged,
  activePersonaLabel = 'Commuter & Traveller'
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#F8FAFC]/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5 transition-all">
      <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
        {/* Zone 1: Location & Context selector */}
        <button
          onClick={onOpenLocationSelect}
          className="flex items-center gap-1.5 text-left group hover:opacity-90 transition-opacity min-h-[36px]"
          title="Change location"
        >
          <div className="w-7 h-7 rounded-full bg-[#EEF6FA] text-[#174A70] flex items-center justify-center border border-[#4C9ED9]/30 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-[#174A70]" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-[#193247] tracking-tight">{locationName}</span>
              <span className="text-[10px] text-slate-400 group-hover:text-slate-600">▾</span>
            </div>
            <div className="text-[10px] text-[#607789] truncate max-w-[120px] sm:max-w-[150px]">
              {activePersonaLabel}
            </div>
          </div>
        </button>

        {/* Zone 2: Mausam Clean Wordmark */}
        <div className="text-center">
          <span className="text-sm font-black tracking-widest text-[#174A70]">MAUSAM</span>
          <div className="flex items-center justify-center gap-1 text-[9px] text-emerald-700 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>IMD Sync</span>
          </div>
        </div>

        {/* Zone 3: Actions (What Changed & Why) */}
        <div className="flex items-center gap-1">
          {onOpenWhatChanged && (
            <button
              onClick={onOpenWhatChanged}
              className="p-1.5 rounded-lg text-[#607789] hover:text-[#174A70] hover:bg-slate-100 transition-colors relative"
              title="What Changed since last check"
            >
              <History className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#E77C6E] rounded-full"></span>
            </button>
          )}

          {onOpenWhy && (
            <button
              onClick={onOpenWhy}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#EEF6FA] text-[#174A70] border border-[#4C9ED9]/30 text-[11px] font-semibold hover:bg-[#DDEFE7]/50 transition-colors"
              title="Why am I seeing this?"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#4C9ED9]" />
              <span className="hidden xs:inline">Why?</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
