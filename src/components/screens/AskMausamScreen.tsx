import React, { useState } from 'react';
import { ASK_MAUSAM_PRESETS, OUTDOOR_EVENT_MATRIX } from '../../data/mockData';
import { 
  Sparkles, 
  Send, 
  HelpCircle, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  BarChart3,
  CheckCircle2
} from 'lucide-react';

interface AskMausamScreenProps {
  onOpenWhy?: () => void;
}

export const AskMausamScreen: React.FC<AskMausamScreenProps> = ({ onOpenWhy }) => {
  const [activeTab, setActiveTab] = useState<'ask' | 'plan'>('ask');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('q1');
  const [customInput, setCustomInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'mausam'; text: string; data?: any }>>([
    {
      sender: 'user',
      text: 'Will it rain when I leave college?'
    },
    {
      sender: 'mausam',
      text: '🌧️ Rain is likely during your college commute.',
      data: ASK_MAUSAM_PRESETS[0]
    }
  ]);

  const activePreset = ASK_MAUSAM_PRESETS.find(p => p.id === selectedPresetId) || ASK_MAUSAM_PRESETS[0];

  const handleSelectPreset = (preset: typeof ASK_MAUSAM_PRESETS[0]) => {
    setSelectedPresetId(preset.id);
    setChatHistory(prev => [
      ...prev,
      { sender: 'user', text: preset.question },
      { sender: 'mausam', text: preset.responseHeadline, data: preset }
    ]);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const userText = customInput;
    setCustomInput('');

    // Match or provide intelligent situational answer
    let matchedPreset = ASK_MAUSAM_PRESETS.find(p => 
      userText.toLowerCase().includes(p.question.toLowerCase().slice(0, 10))
    ) || {
      id: `custom-${Date.now()}`,
      question: userText,
      responseHeadline: `🌦️ Synthesized intelligence for Ludhiana & route query:`,
      timeline: [
        { time: 'Next 1 hr', chance: 65, intensity: 'High convective reflectivity' },
        { time: 'Next 3 hrs', chance: 40, intensity: 'Scattered light drizzle' }
      ],
      whyExplanation: 'Matched with your active Commuter persona, current base in Ludhiana, and Doppler radar rain cells moving over central Punjab.'
    };

    setChatHistory(prev => [
      ...prev,
      { sender: 'user', text: userText },
      { sender: 'mausam', text: matchedPreset.responseHeadline, data: matchedPreset }
    ]);
  };

  return (
    <div className="min-h-[640px] h-full flex flex-col justify-between p-4 sm:p-5 bg-[#EEF6FA] text-[#193247] space-y-3">
      {/* 1. Header with Mode Toggle (Ask vs Plan) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#F4C95D]" />
            <h2 className="text-base font-black text-[#174A70] tracking-tight">
              {activeTab === 'ask' ? 'ASK MAUSAM' : 'PLAN WITH MAUSAM'}
            </h2>
          </div>

          {/* Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('ask')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'ask'
                  ? 'bg-[#174A70] text-white shadow-xs'
                  : 'text-[#607789] hover:text-[#193247]'
              }`}
            >
              Ask Weather
            </button>
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'plan'
                  ? 'bg-[#174A70] text-white shadow-xs'
                  : 'text-[#607789] hover:text-[#193247]'
              }`}
            >
              Plan / What-If
            </button>
          </div>
        </div>

        <p className="text-xs text-[#607789]">
          {activeTab === 'ask'
            ? 'Personalized conversational weather intelligence grounded in official data.'
            : 'Objective risk analysis. We present data; you make the decision.'}
        </p>
      </div>

      {/* 2. TAB CONTENT */}
      {activeTab === 'ask' ? (
        <div className="flex-1 flex flex-col justify-between space-y-3 overflow-hidden">
          {/* Quick Prompts Carousel */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Suggested Questions:
            </span>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {ASK_MAUSAM_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className="px-3 py-1.5 bg-white rounded-xl border border-slate-200 hover:border-[#174A70] text-[11px] font-semibold text-[#193247] whitespace-nowrap shadow-xs hover:bg-[#EEF6FA] transition-all cursor-pointer shrink-0"
                >
                  {preset.question}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Stream Viewport */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[350px]">
            {chatHistory.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${item.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {item.sender === 'user' ? (
                  <div className="px-3.5 py-2 rounded-2xl bg-[#174A70] text-white text-xs max-w-[85%] font-medium shadow-xs">
                    {item.text}
                  </div>
                ) : (
                  <div className="p-4 rounded-3xl bg-white border border-slate-200 max-w-[92%] shadow-sm space-y-3 text-xs">
                    <div className="font-black text-sm text-[#193247]">
                      {item.text}
                    </div>

                    {/* Timeline Probability Breakdown */}
                    {item.data?.timeline && (
                      <div className="grid grid-cols-3 gap-1.5 pt-1">
                        {item.data.timeline.map((slot: any, sIdx: number) => (
                          <div key={sIdx} className="p-2 rounded-xl bg-[#EEF6FA] text-center border border-[#4C9ED9]/20">
                            <div className="text-[10px] text-slate-500 font-semibold">{slot.time}</div>
                            <div className="text-base font-black text-[#174A70] my-0.5">{slot.chance}%</div>
                            <div className="text-[9px] text-slate-600 line-clamp-1">{slot.intensity}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Step 21 / 23: WHY? Section */}
                    {item.data?.whyExplanation && (
                      <div className="p-3 bg-[#DDEFE7]/50 rounded-2xl border border-[#DDEFE7] text-[11px] space-y-1">
                        <div className="font-bold text-emerald-900 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          <span>WHY AM I SEEING THIS?</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                          {item.data.whyExplanation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendCustom} className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Ask about rain, routes or warnings..."
              className="flex-1 h-11 px-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-[#193247] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#174A70]/30 shadow-xs"
            />
            <button
              type="submit"
              className="w-11 h-11 rounded-2xl bg-[#174A70] hover:bg-[#193247] text-white flex items-center justify-center shrink-0 shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        /* STEP 22: PLAN WITH MAUSAM */
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {/* Outdoor Event Matrix */}
          <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#4C9ED9] uppercase tracking-wider">
                  Scenario 1 · Outdoor Activity
                </span>
                <h3 className="text-xs font-black text-[#174A70]">
                  "I have an outdoor gathering at 4 PM"
                </h3>
              </div>
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-semibold">
                Risk Matrix
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-1">
              {OUTDOOR_EVENT_MATRIX.map((item) => (
                <div
                  key={item.hour}
                  className={`p-2.5 rounded-2xl border text-center ${item.color} shadow-xs`}
                >
                  <div className="text-[10px] font-bold opacity-80">{item.hour}</div>
                  <div className="text-sm font-black my-0.5">{item.risk}</div>
                  <div className="text-[10px] font-semibold">{item.probability}% Rain</div>
                  <div className="text-[9px] opacity-75 mt-1 line-clamp-1">{item.condition}</div>
                </div>
              ))}
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-600 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                3 PM window presents the lowest atmospheric disturbance before squall front approaches.
              </span>
            </div>
          </div>

          {/* WHAT IF? Departure Comparison */}
          <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                  Scenario 2 · WHAT IF? COMPARISON
                </span>
                <h3 className="text-xs font-black text-[#174A70]">
                  Compare 8:00 AM vs 9:00 AM Departure
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
              {/* 8 AM */}
              <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-emerald-900 font-black">Option A: 8:00 AM</strong>
                  <span className="text-[10px] font-bold bg-white text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">
                    20% Rain Risk
                  </span>
                </div>
                <p className="text-[11px] text-slate-700">
                  Dry highway tarmac, visibility above 6 km. Squall front still over Himachal foothills.
                </p>
              </div>

              {/* 9 AM */}
              <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-amber-900 font-black">Option B: 9:00 AM</strong>
                  <span className="text-[10px] font-bold bg-white text-amber-800 px-2 py-0.5 rounded-md border border-amber-200">
                    65% Rain Risk
                  </span>
                </div>
                <p className="text-[11px] text-slate-700">
                  Cloudburst arrives at Ambala bypass. Wet highway driving conditions, visibility down to 800m.
                </p>
              </div>
            </div>

            {/* Crucial Ethical Disclaimer */}
            <div className="p-3 bg-[#EEF6FA] rounded-2xl border border-[#4C9ED9]/20 text-[11px] text-slate-600 space-y-1">
              <span className="font-bold text-[#174A70] block">Ethical Advisory Principle:</span>
              <p>
                The Mausam system only presents verifiable atmospheric information. It will never tell you what decision to make.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
