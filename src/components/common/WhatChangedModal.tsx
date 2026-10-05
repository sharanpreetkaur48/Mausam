import React from 'react';
import { X, TrendingUp, AlertTriangle, Users, ArrowRight, Clock, ShieldAlert } from 'lucide-react';
import { WHAT_CHANGED_DATA } from '../../data/mockData';

interface WhatChangedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewAlerts?: () => void;
  onViewGround?: () => void;
}

export const WhatChangedModal: React.FC<WhatChangedModalProps> = ({
  isOpen,
  onClose,
  onViewAlerts,
  onViewGround
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />
      <div className="relative z-10 bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full p-5 shadow-2xl border border-slate-200 text-[#193247] max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#EEF6FA] text-[#174A70] flex items-center justify-center font-bold">
              <TrendingUp className="w-4.5 h-4.5 text-[#174A70]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#174A70]">WHAT CHANGED</h3>
              <p className="text-[11px] text-[#607789]">Since your last check ({WHAT_CHANGED_DATA.lastChecked})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-3">
          {/* Card 1: Rain Probability */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#4C9ED9] transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Commute Rain Forecast
              </span>
              <span className="text-[10px] font-bold text-[#C94343] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                +40% Jump
              </span>
            </div>
            <div className="flex items-center gap-3 my-2">
              <div className="text-center px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">35m ago</span>
                <span className="text-lg font-bold text-slate-600 line-through">30%</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <div className="text-center px-4 py-1.5 bg-[#EEF6FA] rounded-xl border border-[#4C9ED9]/40">
                <span className="text-[10px] text-[#174A70] font-semibold block">Now</span>
                <span className="text-xl font-black text-[#174A70]">70%</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 mt-2">
              Rain probability for your 4:00 PM college commute increased significantly due to sudden cloud merger.
            </p>
          </div>

          {/* Card 2: Ground Reality Reports */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#4C9ED9] transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#174A70]" />
                Ground Reality Cluster
              </span>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                +17 Reports
              </span>
            </div>
            <div className="flex items-center gap-3 my-2">
              <div className="text-center px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">35m ago</span>
                <span className="text-lg font-bold text-slate-600">5</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <div className="text-center px-4 py-1.5 bg-[#DDEFE7]/50 rounded-xl border border-[#DDEFE7]">
                <span className="text-[10px] text-emerald-800 font-semibold block">Verified</span>
                <span className="text-xl font-black text-emerald-900">22</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 mt-2">
              12 new reports flagged standing water near Ludhiana Railway Station underpass and Gill Canal.
            </p>
          </div>

          {/* Card 3: New Warning */}
          <div className="p-3.5 rounded-2xl bg-[#F4EBDD]/40 border border-[#F4EBDD] shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-[#174A70] flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-[#C94343]" />
                New Official Warning
              </span>
              <span className="text-[10px] font-bold text-[#C94343] bg-white px-2 py-0.5 rounded border border-rose-200">
                IMD Alert
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl">⚡</span>
              <div>
                <div className="font-bold text-slate-900 text-xs">Orange Thunderstorm & Squall Warning</div>
                <div className="text-[11px] text-slate-600">Valid until 11:30 AM · Surface gusts 45–55 km/h</div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {onViewGround && (
            <button
              onClick={() => {
                onClose();
                onViewGround();
              }}
              className="w-1/2 py-2 text-xs font-semibold text-[#174A70] bg-[#EEF6FA] rounded-xl hover:bg-[#EEF6FA]/80 transition-colors text-center"
            >
              See Ground Reports
            </button>
          )}
          {onViewAlerts ? (
            <button
              onClick={() => {
                onClose();
                onViewAlerts();
              }}
              className="w-1/2 py-2 text-xs font-semibold text-white bg-[#174A70] rounded-xl hover:bg-[#174A70]/90 transition-colors text-center"
            >
              Review Warnings
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2 text-xs font-semibold text-white bg-[#174A70] rounded-xl hover:bg-[#174A70]/90 transition-colors"
            >
              Got It
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
