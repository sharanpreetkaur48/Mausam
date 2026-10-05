import React from 'react';
import { MapPin, Search, ShieldCheck, Navigation } from 'lucide-react';

interface LocationPermissionScreenProps {
  onUseCurrentLocation: () => void;
  onChooseLocation: () => void;
}

export const LocationPermissionScreen: React.FC<LocationPermissionScreenProps> = ({
  onUseCurrentLocation,
  onChooseLocation
}) => {
  return (
    <div className="min-h-[600px] h-full flex flex-col justify-between p-6 bg-[#EEF6FA] text-[#193247]">
      {/* Top step */}
      <div className="pt-2 text-center">
        <span className="text-[10px] font-bold text-[#4C9ED9] uppercase tracking-wider">
          Step 04 · Location
        </span>
      </div>

      {/* Center illustration & copy */}
      <div className="my-auto py-4 text-center space-y-6 max-w-sm mx-auto">
        {/* Location Radar Graphic */}
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
          {/* Outer ripples */}
          <div className="absolute inset-0 rounded-full border border-[#4C9ED9]/20 animate-ping duration-1000" />
          <div className="absolute w-28 h-28 rounded-full bg-[#4C9ED9]/10 border border-[#4C9ED9]/30" />
          <div className="absolute w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-[#174A70] text-white flex items-center justify-center shadow-sm">
              <Navigation className="w-6 h-6 text-[#F4C95D]" />
            </div>
          </div>
          {/* Floating location pins */}
          <div className="absolute top-2 right-4 w-6 h-6 rounded-full bg-[#DDEFE7] text-emerald-800 flex items-center justify-center shadow-xs border border-white text-xs">
            📍
          </div>
          <div className="absolute bottom-3 left-4 w-6 h-6 rounded-full bg-[#F4EBDD] text-amber-800 flex items-center justify-center shadow-xs border border-white text-xs">
            🎓
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-[#174A70] tracking-tight">
            Where should Mausam start?
          </h2>
          <p className="text-xs text-[#607789] leading-relaxed px-4">
            Your location helps us personalize weather.
            <br />
            <strong className="text-[#193247] font-semibold">You stay in control.</strong>
          </p>
        </div>

        {/* Privacy assurance banner */}
        <div className="p-3 bg-white/80 rounded-2xl border border-slate-200/80 flex items-center gap-2.5 text-left text-[11px] text-[#607789]">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            No continuous background tracking. Weather is computed for designated zones only.
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2.5 pt-2">
        <button
          onClick={onUseCurrentLocation}
          className="w-full h-12 rounded-2xl bg-[#174A70] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#174A70]/10 hover:bg-[#193247] active:scale-[0.98] transition-all cursor-pointer"
        >
          <MapPin className="w-4 h-4 text-[#F4C95D]" />
          <span>Use Current Location (Ludhiana)</span>
        </button>

        <button
          onClick={onChooseLocation}
          className="w-full h-12 rounded-2xl bg-white border border-slate-200 text-[#174A70] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Search className="w-4 h-4 text-[#607789]" />
          <span>Choose Location Manually</span>
        </button>
      </div>
    </div>
  );
};
