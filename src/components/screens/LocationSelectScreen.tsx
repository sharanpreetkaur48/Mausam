import React, { useState } from 'react';
import { MapPin, Search, CloudSun, Check, ArrowRight } from 'lucide-react';

interface LocationSelectScreenProps {
  currentCity: string;
  onSelectCity: (city: string) => void;
  onContinue: () => void;
}

export const LocationSelectScreen: React.FC<LocationSelectScreenProps> = ({
  currentCity,
  onSelectCity,
  onContinue
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const cityOptions = [
    { name: 'Ludhiana', state: 'Punjab', temp: 28, condition: 'Partly Cloudy', isDemo: true },
    { name: 'Delhi NCR', state: 'Delhi', temp: 29, condition: 'Hazy Overcast', isDemo: false },
    { name: 'Chandigarh', state: 'UT', temp: 27, condition: 'Thunderstorm Approaching', isDemo: false },
    { name: 'Amritsar', state: 'Punjab', temp: 28, condition: 'Scattered Clouds', isDemo: false }
  ];

  const filtered = cityOptions.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[600px] h-full flex flex-col justify-between p-6 bg-[#EEF6FA] text-[#193247]">
      {/* Header */}
      <div className="space-y-1 pt-1">
        <div className="text-[10px] font-bold text-[#4C9ED9] uppercase tracking-wider">
          Step 05 · Location
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[#174A70] tracking-tight">
          Select Base Location
        </h2>
        <p className="text-xs text-[#607789]">
          Mausam anchors real-time radar, alerts and local ground reports here.
        </p>
      </div>

      {/* Search Input */}
      <div className="my-3 relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search city, district or pin code..."
          className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-slate-200 text-xs text-[#193247] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#174A70]/30 transition-all"
        />
      </div>

      {/* Selected Location Hero Preview Card */}
      <div className="my-2 p-5 bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4C9ED9]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#EEF6FA] text-[#174A70] flex items-center justify-center border border-[#4C9ED9]/30">
              <MapPin className="w-4 h-4 text-[#174A70]" />
            </div>
            <div>
              <div className="text-sm font-black text-[#193247]">📍 Ludhiana, Punjab</div>
              <div className="text-[11px] text-[#607789]">Demo Location (Punjab Industrial Hub)</div>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#DDEFE7] text-emerald-800 px-2 py-0.5 rounded-full">
            Active
          </span>
        </div>

        {/* Current Weather Preview */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div>
            <div className="text-3xl font-black text-[#174A70]">28°C</div>
            <div className="text-xs font-semibold text-slate-700 flex items-center gap-1 mt-0.5">
              <span>Partly Cloudy</span>
              <span className="text-slate-300">·</span>
              <span className="text-[11px] text-slate-500">Feels 30°</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#EEF6FA] flex items-center justify-center text-3xl">
            🌤️
          </div>
        </div>
      </div>

      {/* Other cities list */}
      <div className="space-y-1.5 my-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-1">
          Other Stations
        </span>
        {filtered.map((city) => {
          const isSelected = currentCity === city.name;
          return (
            <button
              key={city.name}
              onClick={() => onSelectCity(city.name)}
              className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
                isSelected
                  ? 'bg-white border-[#174A70] shadow-xs'
                  : 'bg-white/60 border-slate-200 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#193247]">{city.name}</span>
                <span className="text-[11px] text-slate-400">· {city.state}</span>
                {city.isDemo && (
                  <span className="text-[9px] bg-slate-100 text-slate-600 px-1 rounded font-medium">Demo</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">{city.temp}°C</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#174A70]" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA Button */}
      <div className="pt-2">
        <button
          onClick={onContinue}
          className="w-full h-12 rounded-2xl bg-[#174A70] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#174A70]/10 hover:bg-[#193247] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>USE THIS LOCATION</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
