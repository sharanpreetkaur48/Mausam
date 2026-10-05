import React from 'react';
import { PERSONAS_LIST } from '../../data/mockData';
import { Check, ArrowRight } from 'lucide-react';

interface PersonaScreenProps {
  selectedPersonas: string[];
  onTogglePersona: (id: string) => void;
  onContinue: () => void;
}

export const PersonaScreen: React.FC<PersonaScreenProps> = ({
  selectedPersonas,
  onTogglePersona,
  onContinue
}) => {
  return (
    <div className="min-h-[600px] h-full flex flex-col justify-between p-5 sm:p-6 bg-[#EEF6FA] text-[#193247]">
      {/* Header */}
      <div className="space-y-1 pt-1">
        <div className="text-[10px] font-bold text-[#4C9ED9] uppercase tracking-wider">
          Step 03 · Personalization
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[#174A70] tracking-tight">
          What matters to you?
        </h2>
        <p className="text-xs text-[#607789]">
          Choose one or more <strong className="text-[#193247] font-semibold">personas</strong> so Mausam can personalize your experience.
        </p>
      </div>

      {/* Grid of Personas */}
      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
        {PERSONAS_LIST.map((persona) => {
          const isSelected = selectedPersonas.includes(persona.id);

          return (
            <button
              key={persona.id}
              onClick={() => onTogglePersona(persona.id)}
              className={`p-3 rounded-2xl border text-left transition-all relative flex items-start gap-3 cursor-pointer ${
                isSelected
                  ? 'bg-white border-[#174A70] shadow-sm ring-1 ring-[#174A70]'
                  : 'bg-white/70 border-slate-200/90 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className="text-2xl p-1.5 rounded-xl bg-[#EEF6FA] shrink-0">
                {persona.emoji}
              </div>

              <div className="flex-1 min-w-0 pr-6">
                <div className="text-xs font-bold text-[#193247] flex items-center gap-1.5">
                  <span>{persona.name}</span>
                </div>
                <div className="text-[11px] text-[#607789] line-clamp-1 mt-0.5">
                  {persona.tagline}
                </div>
              </div>

              <div
                className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'bg-[#174A70] text-white'
                    : 'border border-slate-300 bg-white'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Demo helper hint & CTA */}
      <div className="space-y-3 pt-2">
        <div className="text-center">
          <span className="text-[11px] text-[#607789]">
            Demo preset: <span className="font-semibold text-[#174A70]">🚗 Daily Commuter</span> &amp; <span className="font-semibold text-[#174A70]">✈️ Traveller</span> selected
          </span>
        </div>

        <button
          onClick={onContinue}
          disabled={selectedPersonas.length === 0}
          className="w-full h-12 rounded-2xl bg-[#174A70] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#174A70]/10 hover:bg-[#193247] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>CONTINUE ({selectedPersonas.length} SELECTED)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
