import React, { useState } from 'react';
import { GroundReport } from '../../types';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Camera, 
  Video, 
  Map, 
  Info, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Play,
  Share2
} from 'lucide-react';

interface EvidenceViewerScreenProps {
  report: GroundReport;
  onBack: () => void;
  onViewOnMap: () => void;
}

export const EvidenceViewerScreen: React.FC<EvidenceViewerScreenProps> = ({
  report,
  onBack,
  onViewOnMap
}) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const currentMedia = report.mediaSamples[activeMediaIndex] || report.mediaSamples[0];

  return (
    <div className="min-h-[640px] h-full flex flex-col justify-between bg-[#193247] text-white">
      {/* Top Header Bar */}
      <div className="p-4 flex items-center justify-between border-b border-white/10 bg-black/20">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Feed</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Verified Citizen Evidence
          </span>
        </div>
      </div>

      {/* Main Evidence Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {/* Title & Metadata */}
        <div>
          <div className="flex items-center gap-2 text-xs text-[#4C9ED9] font-bold">
            <span>🌊 WATERLOGGING</span>
            <span className="text-white/40">·</span>
            <span>{report.locationName}</span>
          </div>

          <h2 className="text-lg sm:text-xl font-black text-white mt-1">
            {report.title}
          </h2>

          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-white/70">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#F4C95D]" />
              {report.distanceKm} km away
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#4C9ED9]" />
              {report.timeAgoMins} min ago
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-white/80" />
              {report.reportCount} reports · {report.photosCount} photos · {report.videosCount} videos
            </span>
          </div>
        </div>

        {/* High-Fidelity Media Canvas Container */}
        <div className="relative rounded-2xl overflow-hidden bg-black/60 border border-white/15 aspect-4/3 flex flex-col justify-between shadow-2xl">
          {/* Simulated Street-Level Monsoon Road Footage with Canvas/SVG realism */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#174A70]/60 via-[#193247]/80 to-black/90 flex items-center justify-center overflow-hidden">
            {/* Ambient water reflection grid */}
            <svg className="w-full h-full opacity-40 absolute inset-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="roadGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                </pattern>
                <linearGradient id="waterSheen" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4C9ED9" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#174A70" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0B1E2D" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#roadGrid)" />
              {/* Water surface ripples */}
              <circle cx="50%" cy="60%" r="60" fill="none" stroke="#4C9ED9" strokeWidth="1.5" opacity="0.3" className="animate-ping" style={{ animationDuration: '3s' }} />
              <circle cx="50%" cy="60%" r="110" fill="none" stroke="#4C9ED9" strokeWidth="1" opacity="0.2" className="animate-ping" style={{ animationDuration: '4.5s' }} />
              <path d="M 0 160 Q 150 140 300 170 T 600 150 L 600 300 L 0 300 Z" fill="url(#waterSheen)" opacity="0.6" />
            </svg>

            {/* Visual Subject Graphic Representation */}
            <div className="relative z-10 text-center px-4 space-y-2">
              <div className="text-4xl sm:text-5xl">🛺 🚗 🌊</div>
              <div className="text-xs font-mono bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 inline-block text-white">
                STREET CAM: RAILWAY UNDERPASS APPROACH
              </div>
              <div className="text-[11px] text-white/80 max-w-xs mx-auto">
                Standing water accumulation across both carriageways. Traffic moving in single file.
              </div>
            </div>

            {/* Water Depth Ruler Overlay */}
            <div className="absolute right-3 bottom-12 bg-black/75 backdrop-blur-md border border-white/20 rounded-lg p-2 text-right">
              <div className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">Water Depth</div>
              <div className="text-base font-black text-[#F4C95D] font-mono">
                ~{report.waterDepthCm || 20} cm
              </div>
              <div className="text-[9px] text-rose-300">Tire-axle height</div>
            </div>
          </div>

          {/* Top Video Overlay Bar */}
          <div className="relative z-20 p-3 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
            <span className="text-[10px] font-mono bg-rose-600/90 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              Verified GPS Stamp
            </span>
            <span className="text-[10px] font-mono text-white/80">
              {currentMedia.verifiedGps}
            </span>
          </div>

          {/* Bottom Video Caption & Media Switcher */}
          <div className="relative z-20 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent space-y-2">
            <div className="text-xs text-white/90">
              {currentMedia.caption}
            </div>

            {/* Media Selector Tabs */}
            <div className="flex items-center gap-2 pt-1">
              {report.mediaSamples.map((media, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-colors ${
                    activeMediaIndex === idx
                      ? 'bg-white text-[#193247] shadow-sm'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {media.type === 'video' ? <Video className="w-3 h-3" /> : <Camera className="w-3 h-3" />}
                  <span>{media.type === 'video' ? `Video clip` : `Photo ${idx + 1}`}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SYSTEM CONFIDENCE CARD */}
        <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">
              System Confidence Score
            </span>
            <span className="text-xs font-black text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              HIGH CONFIDENCE
            </span>
          </div>

          <p className="text-xs text-white/90 leading-relaxed">
            "Based on recent reports, location consistency, independent sources and available weather observations."
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-white/80">
            <div className="p-2 rounded-xl bg-black/20 border border-white/5">
              <span className="text-white/50 block text-[10px]">Independent Reports</span>
              <strong className="text-white">12 verified users</strong>
            </div>
            <div className="p-2 rounded-xl bg-black/20 border border-white/5">
              <span className="text-white/50 block text-[10px]">IMD Radar Corroboration</span>
              <strong className="text-emerald-300">28 mm/hr shower match</strong>
            </div>
          </div>
        </div>

        {/* Traffic Advisory Box */}
        <div className="p-3 rounded-xl bg-[#F4EBDD]/15 border border-[#F4EBDD]/30 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] text-[#F4C95D] uppercase font-bold block">Current Traffic Impact</span>
            <span className="text-white font-semibold">{report.trafficStatus} · Underpass avoided by sedans</span>
          </div>
          <span className="text-[11px] bg-[#174A70] px-2 py-1 rounded text-white font-mono">
            -18 min delay
          </span>
        </div>
      </div>

      {/* Bottom Sticky Action Buttons */}
      <div className="p-4 bg-black/30 border-t border-white/10 flex items-center gap-2.5">
        <button
          onClick={onViewOnMap}
          className="flex-1 h-12 rounded-2xl bg-[#4C9ED9] hover:bg-[#4C9ED9]/90 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#4C9ED9]/20 transition-all cursor-pointer"
        >
          <Map className="w-4 h-4" />
          <span>VIEW ON MAP</span>
        </button>

        <button
          onClick={() => setShowAuditModal(true)}
          className="px-4 h-12 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1.5 border border-white/15 transition-all cursor-pointer"
        >
          <Info className="w-4 h-4 text-[#F4C95D]" />
          <span>EVIDENCE DETAILS</span>
        </button>
      </div>

      {/* Evidence Details Audit Modal */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-3.5 text-xs text-[#193247] shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-[#174A70] flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#174A70]" />
                Evidence Verification Audit Log
              </h3>
              <button
                onClick={() => setShowAuditModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-slate-600">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="font-bold text-slate-900">Cluster Geo-Radius: 280m</div>
                <div className="text-[11px]">All 12 reports submitted within 280 meters of Ludhiana Railway Station underpass.</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="font-bold text-slate-900">Media Hash & Metadata Check</div>
                <div className="text-[11px]">EXIF timestamps and GPS hardware tags verified intact. No synthetic or recycled media detected.</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="font-bold text-slate-900">Official IMD Radar Cross-Check</div>
                <div className="text-[11px]">IMD Chandigarh radar station flagged 45 dBZ convective cloud cell directly above 30.9082° N at 09:28 AM.</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowAuditModal(false)}
                className="px-4 py-2 bg-[#174A70] text-white font-bold rounded-xl text-xs"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
