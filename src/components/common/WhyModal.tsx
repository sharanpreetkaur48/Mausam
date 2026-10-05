import React from 'react';
import { X, CheckCircle, ShieldCheck, ArrowRight, MapPin, Clock, UserCheck, CloudRain } from 'lucide-react';

interface WhyModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextType?: 'commute_rain' | 'ground_reality' | 'panipat_route' | 'general';
}

export const WhyModal: React.FC<WhyModalProps> = ({
  isOpen,
  onClose,
  contextType = 'commute_rain'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />
      <div className="relative z-10 bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full p-5 shadow-2xl border border-slate-200 text-[#193247] max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
        {/* Grab bar affordance for mobile */}
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#EEF6FA] text-[#174A70] flex items-center justify-center font-bold">
              <ShieldCheck className="w-4.5 h-4.5 text-[#174A70]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#174A70]">WHY AM I SEEING THIS?</h3>
              <p className="text-[11px] text-[#607789]">Transparent Explainability & Trust Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content based on context */}
        {contextType === 'ground_reality' ? (
          <div className="py-4 space-y-4 text-xs">
            <div className="p-3 bg-[#EEF6FA] rounded-2xl border border-[#4C9ED9]/30">
              <span className="text-[10px] font-bold text-[#174A70] uppercase tracking-wider block mb-1">
                Active Ground Reality Item
              </span>
              <p className="text-sm font-bold text-[#193247]">
                🌊 Waterlogging near Ludhiana Railway Station
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <MapPin className="w-4 h-4 text-[#174A70] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Proximity Match (1.2 km away)</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">
                    This report falls within your 3 km active neighborhood perimeter from your Ludhiana base.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Clock className="w-4 h-4 text-[#4C9ED9] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Temporal Freshness (8 min ago)</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">
                    Submitted within the last 15 minutes, qualifying as an active real-time incident.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">High Confidence Corroboration</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">
                    12 independent citizen reports + 5 timestamped photos + IMD Doppler radar shower signature match.
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-4 text-xs">
            <div className="p-3 bg-[#DDEFE7]/50 rounded-2xl border border-[#DDEFE7]">
              <span className="text-[10px] font-bold text-[#174A70] uppercase tracking-wider block mb-1">
                Personalized Recommendation
              </span>
              <p className="text-sm font-bold text-[#193247]">
                🚗 "Rain may affect your college commute at 4 PM."
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <UserCheck className="w-4 h-4 text-[#174A70] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">1. Persona: Daily Commuter</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">
                    You selected Daily Commuter during onboarding, prioritizing route surface conditions and transit delays.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <MapPin className="w-4 h-4 text-[#4C9ED9] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">2. Saved Place: 🎓 College</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">
                    Saved with purpose <span className="font-medium text-slate-900">"Daily Commute"</span> with customary departure at 4:00 PM.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <CloudRain className="w-4 h-4 text-[#174A70] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">3. Time & Forecast: 4:00 PM · 70% Rain</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">
                    IMD radar models predict a convective rain cell moving over Gill Road crossing precisely at 4:15 PM.
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#F4EBDD]/60 rounded-xl border border-[#F4EBDD] flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-600">Therefore:</div>
                  <div className="font-semibold text-[#193247]">
                    Card generated to save you from unexpected road waterlogging.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
              </div>
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Zero Black-Box Scoring · Fully Audit-Compliant</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#174A70] text-white font-semibold rounded-xl hover:bg-[#174A70]/90 transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
