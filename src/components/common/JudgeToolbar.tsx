import React, { useState } from 'react';
import { StepId } from '../../types';
import { 
  Compass, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Smartphone, 
  Monitor, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles,
  X
} from 'lucide-react';

interface JudgeToolbarProps {
  currentStep: StepId;
  onSelectStep: (step: StepId) => void;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
  onOpenWhy: () => void;
  onOpenWhatChanged: () => void;
}

const STEPS_CONFIG: { id: StepId; number: string; title: string; category: string }[] = [
  { id: '01-splash', number: '01', title: 'Splash Screen', category: 'Onboarding' },
  { id: '02-welcome', number: '02', title: 'Welcome & Value Prop', category: 'Onboarding' },
  { id: '03-personas', number: '03', title: 'Persona Selection', category: 'Onboarding' },
  { id: '04-location-perm', number: '04', title: 'Location Permission', category: 'Onboarding' },
  { id: '05-location', number: '05', title: 'Demo Location (Ludhiana)', category: 'Onboarding' },
  { id: '06-my-places', number: '06', title: 'My Places & Purpose', category: 'Personalization' },
  { id: '07-personalization-complete', number: '07', title: 'Personalization Complete', category: 'Personalization' },
  { id: '08-home', number: '08', title: 'Home Overview', category: 'Home' },
  { id: '09-what-matters-now', number: '09', title: 'What Matters Now (Hero Card)', category: 'Home' },
  { id: '10-official-weather', number: '10', title: 'Official IMD Forecast', category: 'Official' },
  { id: '11-ground-reality', number: '11', title: 'Ground Reality Reports', category: 'Ground Reality' },
  { id: '12-evidence-viewer', number: '12', title: 'Evidence Viewer', category: 'Ground Reality' },
  { id: '13-weather-map', number: '13', title: 'Weather Evidence Map (Hero)', category: 'Hero Map' },
  { id: '14-map-interaction', number: '14', title: 'Map Marker Bottom Sheet', category: 'Hero Map' },
  { id: '15-map-time-machine', number: '15', title: 'Map Time Machine (+30m to +2h)', category: 'Hero Map' },
  { id: '16-my-journey', number: '16', title: 'My Journey (Ludhiana → Delhi)', category: 'Journey' },
  { id: '17-weather-ahead', number: '17', title: 'Weather Ahead (Panipat ETA)', category: 'Journey' },
  { id: '18-contextual-advisory', number: '18', title: 'Contextual Advisory Triad', category: 'Journey' },
  { id: '19-what-changed', number: '19', title: 'What Changed (Diff Engine)', category: 'Intelligence' },
  { id: '20-alerts', number: '20', title: 'Prioritized Alerts (IMD First)', category: 'Alerts' },
  { id: '21-ask-mausam', number: '21', title: 'Ask Mausam Intelligence', category: 'Ask & Plan' },
  { id: '22-plan-mausam', number: '22', title: 'Plan With Mausam (Risk Matrix)', category: 'Ask & Plan' },
  { id: '23-why-seeing-this', number: '23', title: 'Why Am I Seeing This? (Trust)', category: 'Explainability' },
  { id: '24-places-management', number: '24', title: 'Places & Purpose Manager', category: 'Personalization' },
  { id: '25-final-home', number: '25', title: 'Final Personalized Home', category: 'Home' }
];

export const JudgeToolbar: React.FC<JudgeToolbarProps> = ({
  currentStep,
  onSelectStep,
  isMobileFrame,
  onToggleFrame,
  onOpenWhy,
  onOpenWhatChanged
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showFormulaModal, setShowFormulaModal] = useState(false);

  const currentIndex = STEPS_CONFIG.findIndex((s) => s.id === currentStep);
  const currentStepObj = STEPS_CONFIG[currentIndex] || STEPS_CONFIG[0];

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectStep(STEPS_CONFIG[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < STEPS_CONFIG.length - 1) {
      onSelectStep(STEPS_CONFIG[currentIndex + 1].id);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#174A70] text-white border-b border-[#4C9ED9]/30 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Left Brand & SIH Badge */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#4C9ED9]/20 px-2 py-1 rounded-md border border-[#4C9ED9]/40">
              <Compass className="w-3.5 h-3.5 text-[#F4C95D] animate-spin" style={{ animationDuration: '14s' }} />
              <span className="font-bold tracking-wider text-[11px] text-white">MAUSAM</span>
              <span className="text-[10px] text-[#EEF6FA]/80">· SIH 2026</span>
            </div>
            
            <span className="hidden md:inline-block text-[#EEF6FA]/70 text-[11px]">
              PS 26076: Personalized Weather Homepage
            </span>
          </div>

          {/* Center: Step Navigation & Stepper */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-1.5 rounded bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
              title="Previous Step"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Quick Step Selector Button */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-white/15 hover:bg-white/25 rounded-md border border-white/20 transition-colors max-w-[200px] sm:max-w-[260px] truncate"
              >
                <span className="font-mono text-[#F4C95D] font-bold">{currentStepObj.number}</span>
                <span className="truncate text-white font-medium">{currentStepObj.title}</span>
                <span className="text-[10px] text-white/60">▾</span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40 bg-black/20" 
                    onClick={() => setIsDropdownOpen(false)} 
                  />
                  <div className="absolute left-0 mt-1 w-72 sm:w-80 max-h-[70vh] overflow-y-auto bg-white text-[#193247] rounded-xl shadow-2xl border border-slate-200 z-50 p-2 text-left">
                    <div className="px-2 py-1.5 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        SIH 2026 Step Navigator (01 - 25)
                      </span>
                      <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                        {STEPS_CONFIG.length} Steps
                      </span>
                    </div>
                    <div className="py-1 space-y-0.5">
                      {STEPS_CONFIG.map((step, idx) => {
                        const isCurrent = step.id === currentStep;
                        return (
                          <button
                            key={step.id}
                            onClick={() => {
                              onSelectStep(step.id);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between gap-2 text-xs transition-colors ${
                              isCurrent
                                ? 'bg-[#EEF6FA] text-[#174A70] font-semibold'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="font-mono text-[11px] text-slate-400 w-5">
                                {step.number}
                              </span>
                              <span className="truncate">{step.title}</span>
                            </div>
                            <span className="text-[9px] uppercase tracking-wider text-slate-400 shrink-0">
                              {step.category}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === STEPS_CONFIG.length - 1}
              className={`p-1.5 rounded bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
              title="Next Step"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Tools: Formula Inspector, What Changed, Mobile Toggle */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowFormulaModal(true)}
              className="flex items-center gap-1 px-2 py-1 rounded bg-[#F4C95D]/20 hover:bg-[#F4C95D]/30 text-[#F4C95D] font-medium border border-[#F4C95D]/40 transition-colors"
              title="View Core Personalization Formula"
            >
              <Sparkles className="w-3 h-3" />
              <span className="hidden sm:inline">Engine Formula</span>
            </button>

            <button
              onClick={onOpenWhy}
              className="flex items-center gap-1 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Why am I seeing this explanation"
            >
              <HelpCircle className="w-3 h-3 text-[#4C9ED9]" />
              <span className="hidden sm:inline">Why?</span>
            </button>

            <button
              onClick={onOpenWhatChanged}
              className="flex items-center gap-1 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="View what changed since last check"
            >
              <Layers className="w-3 h-3 text-[#DDEFE7]" />
              <span className="hidden md:inline">Diff</span>
            </button>

            <button
              onClick={onToggleFrame}
              className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors ml-1"
              title={isMobileFrame ? 'Expand to Full Width' : 'Constrain to Phone Frame (390px)'}
            >
              {isMobileFrame ? (
                <Smartphone className="w-3.5 h-3.5 text-[#F4C95D]" />
              ) : (
                <Monitor className="w-3.5 h-3.5 text-white/80" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Core Personalization Engine Formula Modal */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 text-[#193247] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#174A70] text-white flex items-center justify-center font-bold text-xs">
                  M
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#174A70]">Mausam Personalization Architecture</h3>
                  <p className="text-[11px] text-slate-500">Problem Statement 26076 Core Solution</p>
                </div>
              </div>
              <button
                onClick={() => setShowFormulaModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="p-3 bg-[#EEF6FA] rounded-xl border border-[#4C9ED9]/20 font-mono text-[11px] leading-relaxed text-[#174A70]">
                <div className="text-slate-500 text-[10px] mb-1 uppercase font-semibold">The Core Synthesis Equation:</div>
                <div className="flex flex-wrap items-center gap-1.5 font-bold">
                  <span className="bg-white px-2 py-0.5 rounded shadow-xs">OFFICIAL IMD</span>
                  <span>+</span>
                  <span className="bg-white px-2 py-0.5 rounded shadow-xs">GROUND REALITY</span>
                  <span>+</span>
                  <span className="bg-white px-2 py-0.5 rounded shadow-xs">USER PERSONA</span>
                  <span>+</span>
                  <span className="bg-white px-2 py-0.5 rounded shadow-xs">SAVED PLACES</span>
                  <span>+</span>
                  <span className="bg-white px-2 py-0.5 rounded shadow-xs">ROUTE & ETA</span>
                  <span>=</span>
                  <span className="bg-[#174A70] text-white px-2.5 py-0.5 rounded shadow-xs">ACTIONABLE ADVISORY</span>
                </div>
              </div>

              <div className="space-y-2 text-slate-600">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Places have a Purpose:</strong> A saved location isn't just a pin—it carries intent (e.g. College = 4 PM Daily Commute; Airport = 310 km Highway Transit).
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Strict Source Labeling:</strong> Official IMD alerts are NEVER mixed with citizen ground reports. Official warnings maintain absolute visual hierarchy.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Time-Matched Route Intelligence:</strong> On the Ludhiana → Delhi route, weather at Panipat is matched precisely to the user's estimated arrival (+40 min), not static local time.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Total Explainability:</strong> Every notification has a "Why am I seeing this?" breakdown, establishing citizen trust without black-box AI claims.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowFormulaModal(false)}
                className="px-4 py-1.5 bg-[#174A70] text-white text-xs font-semibold rounded-lg hover:bg-[#174A70]/90 transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
