import React from 'react';
import { ArrowRight, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-[600px] h-full flex flex-col justify-between p-6 sm:p-8 bg-[#EEF6FA] text-[#193247] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#4C9ED9]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-10 w-64 h-64 bg-[#DDEFE7]/50 rounded-full blur-2xl pointer-events-none" />

      {/* Top bar branding */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-black tracking-widest text-[#174A70]">MAUSAM</span>
        <span className="text-[10px] bg-white/80 border border-slate-200 px-2 py-0.5 rounded-full text-[#607789] font-medium">
          SIH 2026 Prototype
        </span>
      </div>

      {/* Center visual hero card */}
      <div className="my-auto py-6 space-y-6">
        {/* Triad Visual Container */}
        <div className="relative mx-auto max-w-xs p-5 bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/80 shadow-lg space-y-3.5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#EEF6FA] text-[#174A70] flex items-center justify-center font-bold text-sm shrink-0 border border-[#4C9ED9]/30">
              <ShieldCheck className="w-5 h-5 text-[#174A70]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#193247]">Official Forecasts</div>
              <div className="text-[11px] text-[#607789]">India Meteorological Dept (IMD) radar & models</div>
            </div>
          </div>

          <div className="w-full h-px bg-slate-100" />

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#DDEFE7] text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
              <MapPin className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#193247]">Ground Reality</div>
              <div className="text-[11px] text-[#607789]">Verified citizen reports & local evidence</div>
            </div>
          </div>

          <div className="w-full h-px bg-slate-100" />

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#F4EBDD] text-[#174A70] flex items-center justify-center font-bold text-sm shrink-0">
              <Sparkles className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#193247]">Tailored For You</div>
              <div className="text-[11px] text-[#607789]">Aware of your commute, route & timing</div>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="text-center space-y-2 max-w-sm mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-[#174A70] leading-tight tracking-tight">
            Weather that understands your day.
          </h2>
          <p className="text-xs sm:text-sm text-[#607789] leading-relaxed">
            Official forecasts, local conditions and personalized insights — all in one place.
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-4">
        <button
          onClick={onGetStarted}
          className="w-full h-13 rounded-2xl bg-[#174A70] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#174A70]/15 hover:bg-[#193247] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>GET STARTED</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
