import React, { useEffect } from 'react';
import { Cloud, Sun, CloudRain } from 'lucide-react';

interface SplashScreenProps {
  onContinue: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 2400);
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div
      onClick={onContinue}
      className="min-h-[600px] h-full flex flex-col items-center justify-between p-8 bg-[#EEF6FA] text-[#193247] cursor-pointer select-none relative overflow-hidden"
    >
      {/* Background subtle atmospheric aura */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-[#4C9ED9]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[#DDEFE7]/50 blur-3xl pointer-events-none" />

      {/* Top subtle badge */}
      <div className="pt-8 text-center">
        <span className="text-[11px] font-semibold tracking-widest text-[#607789] uppercase">
          Smart India Hackathon 2026
        </span>
      </div>

      {/* Center Branding & Weather Animation */}
      <div className="flex flex-col items-center text-center space-y-6 my-auto">
        {/* Weather Animation Emblem */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-full bg-[#4C9ED9]/15 animate-ping duration-1000" />
          
          <div className="relative w-24 h-24 rounded-3xl bg-white border border-[#4C9ED9]/25 shadow-xl flex items-center justify-center overflow-hidden">
            <Sun className="w-10 h-10 text-[#F4C95D] absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '24s' }} />
            <Cloud className="w-13 h-13 text-[#174A70] absolute bottom-1.5 left-2 fill-[#EEF6FA]" />
            <CloudRain className="w-6 h-6 text-[#4C9ED9] absolute bottom-0.5 right-3 animate-bounce" style={{ animationDuration: '1.8s' }} />
          </div>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-widest text-[#174A70]">
            MAUSAM
          </h1>
          <div className="w-10 h-0.5 bg-[#4C9ED9] mx-auto mt-2 mb-3 rounded-full" />
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#193247]">
            Official Weather. Real Ground. For You.
          </p>
        </div>
      </div>

      {/* Bottom prompt */}
      <div className="pb-6 text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-slate-200/80 text-[11px] text-[#607789] shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Tap anywhere to begin · Auto advancing</span>
        </div>
      </div>
    </div>
  );
};
