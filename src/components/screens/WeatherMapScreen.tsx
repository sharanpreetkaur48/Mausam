import React, { useState, useRef, useEffect } from 'react';
import { GroundReport, WeatherWarning, MapTimeStep } from '../../types';
import { GROUND_REPORTS, OFFICIAL_WARNINGS, MAP_TIME_STEPS, JOURNEY_WAYPOINTS } from '../../data/mockData';
import { 
  Layers, 
  Clock, 
  MapPin, 
  Navigation, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  Wind, 
  Zap, 
  Play, 
  Pause,
  ChevronRight,
  X,
  ArrowRight,
  ShieldCheck,
  Compass,
  Car,
  Plane,
  Heart,
  Users,
  Camera,
  Droplets,
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface WeatherMapScreenProps {
  onOpenEvidence: (report: GroundReport) => void;
  onOpenJourney: () => void;
  initialMode?: 'area' | 'journey';
  initialTimeStep?: string;
  activePersona?: string;
}

interface WeatherStory {
  id: string;
  category: 'waterlogging' | 'heavy_rain' | 'lightning' | 'warning' | 'fog';
  title: string;
  locationName: string;
  coordinates: { x: number; y: number };
  distanceFromUser: string;
  timeAgo: string;
  severity: 'low' | 'moderate' | 'high' | 'severe';
  icon: string;
  reportCount: number;
  photosCount: number;
  videosCount: number;
  summary: string;
  intensityBar: number; // 0 to 100
  confidence: 'High' | 'Medium';
  reportRef?: GroundReport;
}

export const WeatherMapScreen: React.FC<WeatherMapScreenProps> = ({
  onOpenEvidence,
  onOpenJourney,
  initialMode = 'area',
  initialTimeStep = 't-now',
  activePersona = 'commuter'
}) => {
  const [mapMode, setMapMode] = useState<'area' | 'journey'>(initialMode);
  const [selectedTimeId, setSelectedTimeId] = useState<string>(initialTimeStep);
  const [activeStory, setActiveStory] = useState<WeatherStory | null>(null);
  const [selectedSavedPlace, setSelectedSavedPlace] = useState<{ id: string; name: string; icon: string; condition: string; note: string; coords: { x: number; y: number } } | null>(null);
  const [selectedJourneyStop, setSelectedJourneyStop] = useState<typeof JOURNEY_WAYPOINTS[0] | null>(null);
  const [showLayerPanel, setShowLayerPanel] = useState<boolean>(false);
  const [currentPersona, setCurrentPersona] = useState<string>(activePersona);
  const [isPlayingTimeline, setIsPlayingTimeline] = useState<boolean>(false);
  const [evidenceStoryModal, setEvidenceStoryModal] = useState<WeatherStory | null>(null);

  // Map viewport transform (smooth pan & zoom)
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const isDragging = useRef<boolean>(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Layer toggles
  const [layers, setLayers] = useState({
    rain: true,
    ground: true,
    warnings: true,
    lightning: true,
    wind: false,
    visibility: false
  });

  // Weather Stories Collection (Designed as modern interactive stories)
  const WEATHER_STORIES: WeatherStory[] = [
    {
      id: 'story-waterlogging',
      category: 'waterlogging',
      title: 'Waterlogging at Station Road Underpass',
      locationName: 'Railway Station Underpass',
      coordinates: { x: 470, y: 440 },
      distanceFromUser: '1.2 km from you',
      timeAgo: '8 min ago',
      severity: 'high',
      icon: '💧',
      reportCount: 12,
      photosCount: 5,
      videosCount: 2,
      summary: 'Water accumulation reached ~20 cm. Two-wheelers taking pedestrian flyover; sedans slow moving.',
      intensityBar: 78,
      confidence: 'High',
      reportRef: GROUND_REPORTS[0]
    },
    {
      id: 'story-rain',
      category: 'heavy_rain',
      title: 'Intense Downpour near College Corridor',
      locationName: 'Gill Canal Crossing',
      coordinates: { x: 530, y: 550 },
      distanceFromUser: '2.4 km from you',
      timeAgo: '12 min ago',
      severity: 'moderate',
      icon: '🌧',
      reportCount: 7,
      photosCount: 3,
      videosCount: 1,
      summary: 'Sudden rain shower with strong wind gusts. Low visibility under 200m near GNDEC gate.',
      intensityBar: 65,
      confidence: 'High',
      reportRef: GROUND_REPORTS[2]
    },
    {
      id: 'story-lightning',
      category: 'lightning',
      title: 'Active Lightning Cluster on North Horizon',
      locationName: 'Jalandhar Bypass Anvil',
      coordinates: { x: 370, y: 320 },
      distanceFromUser: '4.1 km from you',
      timeAgo: '20 min ago',
      severity: 'moderate',
      icon: '⚡',
      reportCount: 4,
      photosCount: 2,
      videosCount: 0,
      summary: 'Multiple cloud-to-ground strikes observed towards north-west horizon. Surface gusts 42 km/h.',
      intensityBar: 55,
      confidence: 'Medium',
      reportRef: GROUND_REPORTS[3]
    },
    {
      id: 'story-warning',
      category: 'warning',
      title: 'Official IMD Thunderstorm & Squall Warning',
      locationName: 'Ludhiana Met Sector',
      coordinates: { x: 510, y: 400 },
      distanceFromUser: 'Valid until 11:30 AM',
      timeAgo: 'Updated 10m ago',
      severity: 'severe',
      icon: '🚨',
      reportCount: 1,
      photosCount: 0,
      videosCount: 0,
      summary: 'Moderate to intense thunderstorm accompanied by lightning and surface winds reaching 45–55 km/h.',
      intensityBar: 90,
      confidence: 'High'
    }
  ];

  // Saved Places Data
  const SAVED_PLACES_MAP = [
    {
      id: 'place-home',
      name: 'Home',
      icon: '🏠',
      condition: '28°C · Overcast',
      note: 'Rain expected around 4:30 PM',
      coords: { x: 420, y: 470 }
    },
    {
      id: 'place-college',
      name: 'College',
      icon: '🎓',
      condition: '27°C · Rain Expected',
      note: 'Light rain in 35m · 2 nearby reports',
      coords: { x: 530, y: 550 }
    },
    {
      id: 'place-office',
      name: 'Office',
      icon: '💼',
      condition: '28°C · Breezy',
      note: 'Dry road corridor currently',
      coords: { x: 340, y: 490 }
    }
  ];

  const currentTimeObj = MAP_TIME_STEPS.find(t => t.id === selectedTimeId) || MAP_TIME_STEPS[0];

  // Auto-play timeline loop
  useEffect(() => {
    let interval: any = null;
    if (isPlayingTimeline) {
      interval = setInterval(() => {
        setSelectedTimeId((prevId) => {
          const currentIndex = MAP_TIME_STEPS.findIndex(t => t.id === prevId);
          const nextIndex = (currentIndex + 1) % MAP_TIME_STEPS.length;
          return MAP_TIME_STEPS[nextIndex].id;
        });
      }, 2600);
    }
    return () => clearInterval(interval);
  }, [isPlayingTimeline]);

  // Zoom / Recenter / Pan Handlers
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.3, 2.6));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.3, 0.75));
  const handleRecenter = () => {
    setPan({ x: 0, y: 0 });
    setZoom(1);
    setActiveStory(null);
    setSelectedSavedPlace(null);
    setSelectedJourneyStop(null);
  };

  // Smoothly center onto a specific target coordinate
  const panToCoordinate = (x: number, y: number, targetZoom = 1.35) => {
    // Canvas is 1000x1000; center is (500, 500)
    const offsetX = (500 - x) * 0.45;
    const offsetY = (500 - y) * 0.45;
    setPan({ x: offsetX, y: offsetY });
    setZoom(targetZoom);
  };

  const handleSelectStory = (story: WeatherStory) => {
    setActiveStory(story);
    setSelectedSavedPlace(null);
    setSelectedJourneyStop(null);
    panToCoordinate(story.coordinates.x, story.coordinates.y);
  };

  const handleSelectSavedPlace = (place: typeof SAVED_PLACES_MAP[0]) => {
    setSelectedSavedPlace(place);
    setActiveStory(null);
    setSelectedJourneyStop(null);
    panToCoordinate(place.coords.x, place.coords.y);
  };

  const handleSelectJourneyStop = (stop: typeof JOURNEY_WAYPOINTS[0]) => {
    setSelectedJourneyStop(stop);
    setActiveStory(null);
    setSelectedSavedPlace(null);
    panToCoordinate(stop.mapCoords.x * 10, stop.mapCoords.y * 10, 1.25);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      dragStart.current = { x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.current.x,
      y: e.touches[0].clientY - dragStart.current.y
    });
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // Weather state calculation from time machine
  const timeOffset = currentTimeObj.timeOffsetMins;
  // Rain blob shifts horizontally as time progresses
  const rainShiftX = timeOffset * 2.8;
  const isPeakRain = selectedTimeId === 't-1h';
  const isModerateRain = selectedTimeId === 't-30m';

  return (
    <div className="relative w-full h-[620px] sm:h-[700px] bg-[#F5F7F4] overflow-hidden select-none flex flex-col justify-between font-['Manrope',sans-serif]">
      {/* 1. TOP BAR: MINIMAL CONTROLS (Back / Mausam / Recenter / Layers) */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-30 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-200/80 shadow-xs">
          {/* Mode Switcher: My Area / My Journey */}
          <div className="flex items-center gap-1 bg-[#EEF6FA] p-0.5 rounded-xl border border-slate-200/80">
            <button
              onClick={() => { setMapMode('area'); handleRecenter(); }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                mapMode === 'area'
                  ? 'bg-[#174A70] text-white shadow-xs'
                  : 'text-[#607789] hover:text-[#193247]'
              }`}
            >
              My Area
            </button>
            <button
              onClick={() => { setMapMode('journey'); handleRecenter(); }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                mapMode === 'journey'
                  ? 'bg-[#174A70] text-white shadow-xs'
                  : 'text-[#607789] hover:text-[#193247]'
              }`}
            >
              <span>My Journey</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4C95D] animate-ping" />
            </button>
          </div>

          {/* Persona Tuning Tag */}
          <div className="hidden xs:flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <Sparkles className="w-3 h-3 text-[#F4C95D]" />
            <span className="font-semibold text-[#174A70]">
              {currentPersona === 'commuter' ? '🚗 Commuter Focus' : currentPersona === 'traveller' ? '✈️ Highway Focus' : '🌿 Health Focus'}
            </span>
          </div>

          {/* Floating Actions: Layers & Recenter */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowLayerPanel(!showLayerPanel)}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 border transition-all ${
                showLayerPanel
                  ? 'bg-[#174A70] text-white border-[#174A70]'
                  : 'bg-white text-[#174A70] border-slate-200 hover:bg-slate-50'
              }`}
              title="Toggle Weather Layers"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Layers</span>
            </button>

            <button
              onClick={handleRecenter}
              className="p-1.5 rounded-xl bg-white border border-slate-200 text-[#174A70] hover:bg-slate-50 transition-colors shadow-xs"
              title="Recenter to You"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. WEATHER STORY CAROUSEL STRIP (Quick Tap to Discover Events Around Me) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 px-0.5">
          {WEATHER_STORIES.map((story) => {
            const isSelected = activeStory?.id === story.id;
            return (
              <button
                key={story.id}
                onClick={() => handleSelectStory(story)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap shadow-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#174A70] text-white border-[#174A70] scale-105 shadow-md'
                    : 'bg-white/95 text-slate-800 border-slate-200/90 hover:border-[#4C9ED9] hover:bg-white'
                }`}
              >
                <span>{story.icon}</span>
                <span className="font-bold">{story.locationName.split(' ')[0]}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {story.timeAgo}
                </span>
              </button>
            );
          })}
        </div>

        {/* Layer Controls Dropdown */}
        {showLayerPanel && (
          <div className="self-end bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-slate-200 shadow-xl max-w-xs w-full text-xs space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Mausam Map Overlays
              </span>
              <button
                onClick={() => setShowLayerPanel(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={layers.rain}
                  onChange={(e) => setLayers(prev => ({ ...prev, rain: e.target.checked }))}
                  className="rounded text-[#174A70]"
                />
                <span className="font-semibold text-slate-800">☔ Rain Cells</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={layers.ground}
                  onChange={(e) => setLayers(prev => ({ ...prev, ground: e.target.checked }))}
                  className="rounded text-[#174A70]"
                />
                <span className="font-semibold text-slate-800">📷 Ground Stories</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={layers.warnings}
                  onChange={(e) => setLayers(prev => ({ ...prev, warnings: e.target.checked }))}
                  className="rounded text-[#174A70]"
                />
                <span className="font-semibold text-slate-800">🚨 Official Warnings</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={layers.lightning}
                  onChange={(e) => setLayers(prev => ({ ...prev, lightning: e.target.checked }))}
                  className="rounded text-[#174A70]"
                />
                <span className="font-semibold text-slate-800">⚡ Lightning</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={layers.wind}
                  onChange={(e) => setLayers(prev => ({ ...prev, wind: e.target.checked }))}
                  className="rounded text-[#174A70]"
                />
                <span className="font-semibold text-slate-800">🌬 Wind Vectors</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={layers.visibility}
                  onChange={(e) => setLayers(prev => ({ ...prev, visibility: e.target.checked }))}
                  className="rounded text-[#174A70]"
                />
                <span className="font-semibold text-slate-800">🌫 Road Mist</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* 3. ZOOM FLOATING CONTROLS (Right) */}
      <div className="absolute right-3 top-28 z-20 flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-xs text-[#174A70] border border-slate-200/90 shadow-sm flex items-center justify-center hover:bg-white active:scale-95 transition-all"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-xs text-[#174A70] border border-slate-200/90 shadow-sm flex items-center justify-center hover:bg-white active:scale-95 transition-all"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* 4. HERO INTERACTIVE MAP CANVAS (Modern Cartographic Artistry) */}
      <div
        className="w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="w-full h-full transition-transform duration-200 origin-center"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
          }}
        >
          <svg
            viewBox="0 0 1000 1000"
            className="w-full h-full select-none"
            style={{ backgroundColor: '#F5F7F4' /* Very Light Neutral Land Base */ }}
          >
            <defs>
              {/* Blur Filters for Natural Organic Precipitation & Lighting */}
              <filter id="rainCellBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="24" result="blur" />
              </filter>

              <filter id="lightningGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="12" result="blur" />
              </filter>

              {/* Precipitation Gradient */}
              <radialGradient id="precipitationGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#174A70" stopOpacity="0.75" />
                <stop offset="45%" stopColor="#4C9ED9" stopOpacity="0.55" />
                <stop offset="75%" stopColor="#5BA7D9" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#D8EDF7" stopOpacity="0" />
              </radialGradient>

              {/* Rain Core Intense Squall */}
              <radialGradient id="squallCoreGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C94343" stopOpacity="0.8" />
                <stop offset="45%" stopColor="#E77C6E" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#F4C95D" stopOpacity="0" />
              </radialGradient>

              {/* Atmospheric Location Glow */}
              <radialGradient id="userHalo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4C9ED9" stopOpacity="0.6" />
                <stop offset="60%" stopColor="#4C9ED9" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#4C9ED9" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* BASE GEOGRAPHY */}
            {/* Very light neutral land background */}
            <rect width="1000" height="1000" fill="#F5F7F4" />

            {/* Natural Green Parks & Protected Canopies (Soft Organic Shapes, #78A889) */}
            <g fill="#78A889" opacity="0.35">
              {/* Punjab Agricultural University Agro-forestry Sector */}
              <path d="M 120 480 C 180 430, 260 440, 280 520 C 300 600, 220 640, 150 620 C 90 600, 80 520, 120 480 Z" />
              {/* Rakh Bagh & Rose Garden park belt */}
              <path d="M 430 490 C 470 470, 520 480, 510 530 C 500 570, 440 560, 420 530 Z" />
              {/* Outskirt agricultural woods (Samrala & Khanna fringes) */}
              <path d="M 720 180 C 800 130, 920 160, 950 240 C 960 320, 860 380, 780 340 C 710 300, 680 220, 720 180 Z" />
              <path d="M 700 760 C 820 720, 940 780, 930 890 C 850 960, 740 920, 680 840 Z" />
            </g>

            {/* Soft Blue Water Body: Satluj River Ribbon & Canals (#D8EDF7) */}
            <g fill="#D8EDF7">
              {/* Satluj River Natural Curvature */}
              <path
                d="M -20 260 C 180 230, 340 310, 580 260 C 760 220, 890 280, 1020 250 L 1020 305 C 870 335, 750 280, 580 315 C 340 355, 180 280, -20 310 Z"
                className="animate-wave"
              />
              {/* Sidhwan Canal branch */}
              <path
                d="M 280 320 Q 380 440 450 680 T 520 980"
                stroke="#D8EDF7"
                strokeWidth="16"
                fill="none"
                strokeLinecap="round"
                opacity="0.9"
              />
            </g>
            <text x="360" y="285" fill="#174A70" fontSize="13" fontWeight="800" opacity="0.45" letterSpacing="4">
              SATLUJ RIVER
            </text>

            {/* Subtle Blue-Gray Road Arterials (Delicate modern vector styling, #CBD5E1 & #E2E8F0) */}
            <g stroke="#CBD5E1" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.75">
              {/* Ferozepur Road arterial */}
              <path d="M 60 510 L 460 480 L 880 430" strokeWidth="5" />
              {/* Gill Road corridor */}
              <path d="M 460 480 L 530 550 L 620 740 L 720 920" strokeWidth="5" />
              {/* Northern Bypass */}
              <path d="M 220 340 Q 480 370 760 360" strokeWidth="4" />
              {/* Southern Bypass Ring */}
              <path d="M 240 680 Q 520 620 840 690" strokeWidth="4" />
              {/* Urban Grid Lines (Light, minimal) */}
              <line x1="380" y1="420" x2="380" y2="580" strokeWidth="2" strokeDasharray="6,6" />
              <line x1="560" y1="420" x2="560" y2="580" strokeWidth="2" strokeDasharray="6,6" />
            </g>

            {/* COMMUTER ROUTE HIGHLIGHT (When persona is commuter) */}
            {currentPersona === 'commuter' && (
              <g>
                <path
                  d="M 420 470 L 460 480 L 530 550"
                  stroke="#174A70"
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                  className="animate-pulse"
                />
                <circle cx="480" cy="505" r="4.5" fill="#F4C95D" className="animate-ping" />
              </g>
            )}

            {/* HIGHWAY NH44 CORRIDOR (Ludhiana -> Delhi) */}
            <g>
              <path
                d="M 320 380 L 500 480 L 680 640 L 840 820"
                stroke={mapMode === 'journey' || currentPersona === 'traveller' ? '#174A70' : '#CBD5E1'}
                strokeWidth={mapMode === 'journey' || currentPersona === 'traveller' ? '8' : '4'}
                fill="none"
                strokeLinecap="round"
              />
              {/* Progress animation dash */}
              {(mapMode === 'journey' || currentPersona === 'traveller') && (
                <path
                  d="M 320 380 L 500 480 L 680 640 L 840 820"
                  stroke="#F4C95D"
                  strokeWidth="3"
                  strokeDasharray="16,24"
                  fill="none"
                  strokeLinecap="round"
                  className="animate-wind"
                />
              )}
            </g>

            {/* CHECKPOINTS ON JOURNEY (Ludhiana, Ambala, Panipat, Delhi) */}
            {(mapMode === 'journey' || currentPersona === 'traveller') && (
              <g>
                {JOURNEY_WAYPOINTS.map((wp) => {
                  const isPanipat = wp.id === 'stop-panipat';
                  const isSelected = selectedJourneyStop?.id === wp.id;
                  const cx = wp.mapCoords.x * 10;
                  const cy = wp.mapCoords.y * 10;

                  return (
                    <g
                      key={wp.id}
                      transform={`translate(${cx}, ${cy})`}
                      className="cursor-pointer"
                      onClick={() => handleSelectJourneyStop(wp)}
                    >
                      {/* Highlight Ring */}
                      {isPanipat && (
                        <circle cx="0" cy="0" r="28" fill="none" stroke="#C94343" strokeWidth="2" className="animate-ping" />
                      )}

                      <circle
                        cx="0"
                        cy="0"
                        r={isSelected ? '20' : '15'}
                        fill={isPanipat ? '#C94343' : '#174A70'}
                        stroke="white"
                        strokeWidth="3"
                        className="transition-transform hover:scale-125 shadow-md"
                      />
                      <text x="0" y="4" fontSize="10" textAnchor="middle" fill="white">
                        {wp.icon}
                      </text>

                      {/* Pill Badge */}
                      <rect x="-45" y="20" width="90" height="20" rx="6" fill="white" stroke="#174A70" strokeWidth="1" className="shadow-xs" />
                      <text x="0" y="34" fontSize="9" fontWeight="bold" textAnchor="middle" fill={isPanipat ? '#C94343' : '#174A70'}>
                        {wp.name} ({wp.etaFormatted})
                      </text>
                    </g>
                  );
                })}
              </g>
            )}

            {/* ANIMATED PRECIPITATION SYSTEM (Natural Soft Blobs that slowly drift) */}
            {layers.rain && (
              <g
                transform={`translate(${rainShiftX}, 0)`}
                filter="url(#rainCellBlur)"
                className="transition-transform duration-700 ease-out"
              >
                {/* Outer Light Rain Field */}
                <path
                  d="M 320 380 C 440 320, 620 350, 720 440 C 800 520, 740 680, 580 660 C 440 640, 360 580, 300 480 Z"
                  fill="url(#precipitationGradient)"
                  opacity={currentTimeObj.intensity === 'clearing' ? '0.35' : '0.85'}
                />

                {/* Moderate Rain Core */}
                {(isModerateRain || isPeakRain) && (
                  <ellipse
                    cx="530"
                    cy="500"
                    rx="130"
                    ry="95"
                    fill="#4C9ED9"
                    opacity="0.65"
                  />
                )}

                {/* Intense Convective Core (Peak 4 PM rain near Station & College) */}
                {isPeakRain && (
                  <ellipse
                    cx="510"
                    cy="490"
                    rx="85"
                    ry="65"
                    fill="url(#squallCoreGradient)"
                    className="animate-pulse"
                  />
                )}
              </g>
            )}

            {/* FLOWING WIND STREAM PARTICLES (When Wind Layer Toggled) */}
            {layers.wind && (
              <g stroke="#174A70" strokeWidth="2.5" strokeDasharray="16,20" fill="none" opacity="0.45" className="animate-wind">
                <path d="M 80 320 Q 320 360 620 340 T 940 380" />
                <path d="M 120 480 Q 380 520 680 490 T 960 540" />
                <path d="M 90 640 Q 420 680 720 650 T 980 710" />
              </g>
            )}

            {/* OFFICIAL IMD WARNING ZONE ENVELOPE */}
            {layers.warnings && (
              <g>
                <path
                  d="M 380 360 C 560 340, 660 420, 630 570 C 580 660, 400 640, 340 540 Z"
                  fill="none"
                  stroke="#C94343"
                  strokeWidth="2.5"
                  strokeDasharray="6,5"
                  opacity="0.75"
                />
              </g>
            )}

            {/* SAVED PLACES (Home, College, Office) */}
            {SAVED_PLACES_MAP.map((place) => {
              const isSelected = selectedSavedPlace?.id === place.id;

              return (
                <g
                  key={place.id}
                  transform={`translate(${place.coords.x}, ${place.coords.y})`}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectSavedPlace(place);
                  }}
                >
                  <circle
                    cx="0"
                    cy="0"
                    r={isSelected ? '22' : '17'}
                    fill="#174A70"
                    stroke="white"
                    strokeWidth={isSelected ? '3.5' : '2'}
                    className="transition-transform group-hover:scale-115 drop-shadow-md"
                  />
                  <text x="0" y="5" fontSize="12" textAnchor="middle">
                    {place.icon}
                  </text>
                  <rect x="-35" y="21" width="70" height="18" rx="5" fill="white" stroke="#174A70" strokeWidth="1" className="shadow-xs" />
                  <text x="0" y="33" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#174A70">
                    {place.name}
                  </text>
                </g>
              );
            })}

            {/* CURRENT USER LOCATION ("YOU ARE HERE") */}
            <g transform="translate(450, 480)" className="pointer-events-none">
              {/* Expanding location pulse */}
              <circle cx="0" cy="0" r="32" fill="url(#userHalo)" className="animate-ping" style={{ animationDuration: '3s' }} />
              <circle cx="0" cy="0" r="14" fill="#174A70" stroke="white" strokeWidth="3.5" className="drop-shadow-md" />
              <circle cx="0" cy="0" r="4.5" fill="#F4C95D" />
              <rect x="-18" y="18" width="36" height="16" rx="4" fill="#174A70" />
              <text x="0" y="29" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">
                You
              </text>
            </g>

            {/* WEATHER STORY MARKERS (Hero Feature: Modern Pulsing Story Capsules) */}
            {WEATHER_STORIES.map((story) => {
              if (!layers.ground && story.category !== 'warning') return null;
              if (!layers.lightning && story.category === 'lightning') return null;
              if (!layers.warnings && story.category === 'warning') return null;

              const isSelected = activeStory?.id === story.id;
              const isWarning = story.category === 'warning';
              const isWater = story.category === 'waterlogging';
              const isLightning = story.category === 'lightning';

              const badgeColor = isWarning
                ? '#C94343'
                : isWater
                ? '#174A70'
                : isLightning
                ? '#F4C95D'
                : '#4C9ED9';

              return (
                <g
                  key={story.id}
                  transform={`translate(${story.coordinates.x}, ${story.coordinates.y})`}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectStory(story);
                  }}
                >
                  {/* Subtle Freshness Ripple */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isSelected ? '36' : '26'}
                    fill="none"
                    stroke={badgeColor}
                    strokeWidth="1.5"
                    opacity={isSelected ? '0.7' : '0.4'}
                    className="animate-ping"
                    style={{ animationDuration: isWarning ? '2s' : '3.5s' }}
                  />

                  {/* Lightning Zap Flash on Lightning Story */}
                  {isLightning && (
                    <circle cx="0" cy="0" r="32" fill="#F4C95D" opacity="0.3" className="animate-zap" />
                  )}

                  {/* Main Story Marker Capsule */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isSelected ? '24' : '19'}
                    fill={badgeColor}
                    stroke="white"
                    strokeWidth={isSelected ? '4' : '2.5'}
                    className="transition-transform group-hover:scale-120 drop-shadow-lg"
                  />

                  {/* Weather Emoji */}
                  <text x="0" y="5" fontSize={isSelected ? '15' : '13'} textAnchor="middle" fill="white">
                    {story.icon}
                  </text>

                  {/* Photo Count Micro-Indicator */}
                  {story.photosCount > 0 && (
                    <g transform="translate(13, -13)">
                      <circle cx="0" cy="0" r="8" fill="#193247" stroke="white" strokeWidth="1.2" />
                      <text x="0" y="2.5" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#F4C95D">
                        {story.photosCount}
                      </text>
                    </g>
                  )}

                  {/* Location Title Pill */}
                  <rect
                    x="-55"
                    y="24"
                    width="110"
                    height="20"
                    rx="6"
                    fill="white"
                    stroke="#D8E2DC"
                    strokeWidth="1.2"
                    className="shadow-sm"
                  />
                  <text
                    x="0"
                    y="37"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    fill="#174A70"
                  >
                    {story.locationName.split(' ')[0]} ({story.timeAgo})
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 5. WEATHER STORY BOTTOM SHEET (When Story Marker is Tapped) */}
      {activeStory && (
        <div className="absolute bottom-20 left-3 right-3 z-30 bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xl animate-in slide-in-from-bottom duration-200 max-w-lg mx-auto">
          {/* Grab Handle */}
          <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-3" />

          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF6FA] text-2xl flex items-center justify-center shrink-0 border border-[#4C9ED9]/20 shadow-xs">
                {activeStory.icon}
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#174A70] bg-[#EEF6FA] px-2 py-0.5 rounded">
                    {activeStory.category.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    {activeStory.distanceFromUser} · {activeStory.timeAgo}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-black text-[#193247] mt-1">
                  {activeStory.title}
                </h3>
                <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">
                  {activeStory.summary}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveStory(null)}
              className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Intensity Gauge Bar */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-semibold text-slate-600">
              <span>Hazard Intensity</span>
              <span className="font-bold text-[#174A70]">{activeStory.severity.toUpperCase()}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${activeStory.intensityBar}%`,
                  backgroundColor: activeStory.severity === 'severe' ? '#C94343' : activeStory.severity === 'high' ? '#E77C6E' : '#4C9ED9'
                }}
              />
            </div>
          </div>

          {/* Ground Reality Verification Metrics */}
          {activeStory.reportCount > 0 && (
            <div className="mt-2.5 flex items-center justify-between text-[11px] bg-slate-50 p-2 rounded-xl border border-slate-200/70">
              <div className="text-slate-600">
                <strong className="text-slate-900">{activeStory.reportCount} reports</strong>
                {activeStory.photosCount > 0 && ` · ${activeStory.photosCount} photos`}
                {activeStory.videosCount > 0 && ` · ${activeStory.videosCount} videos`}
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-[#DDEFE7] px-2 py-0.5 rounded-full">
                Confidence: {activeStory.confidence}
              </span>
            </div>
          )}

          {/* Action Row */}
          <div className="mt-3 flex items-center justify-between gap-2 pt-1">
            {activeStory.reportRef ? (
              <button
                onClick={() => onOpenEvidence(activeStory.reportRef!)}
                className="flex-1 py-2 bg-[#174A70] hover:bg-[#193247] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>VIEW EVIDENCE</span>
              </button>
            ) : (
              <button
                onClick={() => onOpenEvidence(GROUND_REPORTS[0])}
                className="flex-1 py-2 bg-[#174A70] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
              >
                <span>VIEW OFFICIAL DETAILS</span>
              </button>
            )}

            <button
              onClick={() => setActiveStory(null)}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all"
            >
              Explore Map
            </button>
          </div>
        </div>
      )}

      {/* 6. CONTEXTUAL SAVED PLACE CARD (When College/Home is tapped) */}
      {selectedSavedPlace && (
        <div className="absolute bottom-20 left-3 right-3 z-30 bg-white/95 backdrop-blur-md rounded-3xl p-4 border border-slate-200/90 shadow-xl max-w-sm mx-auto animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedSavedPlace.icon}</span>
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400">SAVED LOCATION</h4>
                <div className="text-sm font-black text-[#174A70]">{selectedSavedPlace.name}</div>
              </div>
            </div>
            <button onClick={() => setSelectedSavedPlace(null)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="py-2 space-y-1">
            <div className="text-xs font-bold text-slate-800">{selectedSavedPlace.condition}</div>
            <p className="text-[11px] text-slate-600">{selectedSavedPlace.note}</p>
          </div>
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                if (selectedSavedPlace.id === 'place-college') {
                  handleSelectStory(WEATHER_STORIES[1]);
                } else {
                  setSelectedSavedPlace(null);
                }
              }}
              className="px-3 py-1.5 bg-[#174A70] text-white text-xs font-bold rounded-xl"
            >
              Explore Area →
            </button>
          </div>
        </div>
      )}

      {/* 7. JOURNEY STOP CARD (When highway checkpoint is tapped) */}
      {selectedJourneyStop && (
        <div className="absolute bottom-20 left-3 right-3 z-30 bg-white/95 backdrop-blur-md rounded-3xl p-4 border border-slate-200/90 shadow-xl max-w-sm mx-auto animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedJourneyStop.icon}</span>
              <div>
                <h4 className="text-[10px] font-bold uppercase text-slate-400">WAYPOINT</h4>
                <div className="text-sm font-black text-[#174A70]">{selectedJourneyStop.name}</div>
              </div>
            </div>
            <button onClick={() => setSelectedJourneyStop(null)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="py-2 space-y-1">
            <div className="text-xs font-bold text-slate-800">
              {selectedJourneyStop.temp}°C · {selectedJourneyStop.condition} ({selectedJourneyStop.rainProbability}% rain)
            </div>
            <p className="text-[11px] text-slate-600">
              Expected around {selectedJourneyStop.etaFormatted} into your journey ({selectedJourneyStop.distanceFromStartKm} km).
            </p>
            {selectedJourneyStop.hasAdvisory && (
              <div className="text-[11px] text-[#C94343] font-bold pt-1">
                {selectedJourneyStop.advisoryNote}
              </div>
            )}
          </div>
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                if (selectedJourneyStop.id === 'stop-panipat') {
                  onOpenEvidence(GROUND_REPORTS[1]);
                } else {
                  onOpenJourney();
                }
              }}
              className="px-3 py-1.5 bg-[#174A70] text-white text-xs font-bold rounded-xl"
            >
              {selectedJourneyStop.id === 'stop-panipat' ? 'See Panipat Evidence →' : 'View Full Journey →'}
            </button>
          </div>
        </div>
      )}

      {/* 8. TIME MACHINE (Floating Weather Timeline at Bottom with Auto-Play Loop) */}
      <div className="absolute bottom-2 left-2 right-2 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-slate-200/90 shadow-lg max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlayingTimeline(!isPlayingTimeline)}
              className="w-6 h-6 rounded-lg bg-[#174A70] text-white flex items-center justify-center hover:bg-[#193247] transition-all shadow-xs cursor-pointer"
              title={isPlayingTimeline ? 'Pause timeline animation' : 'Play weather transition loop'}
            >
              {isPlayingTimeline ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-white ml-0.5" />}
            </button>

            <div className="flex items-center gap-1 text-xs text-[#174A70] font-bold">
              <Clock className="w-3.5 h-3.5 text-[#4C9ED9]" />
              <span>TIME MACHINE</span>
              {isPlayingTimeline && (
                <span className="text-[9px] font-normal text-emerald-600 animate-pulse">● Auto-cycling</span>
              )}
            </div>
          </div>

          <span className="text-[10px] text-slate-600 font-medium truncate max-w-[200px] text-right">
            {currentTimeObj.headline}
          </span>
        </div>

        {/* Timeline step buttons */}
        <div className="grid grid-cols-4 gap-1.5">
          {MAP_TIME_STEPS.map((step) => {
            const isSelected = selectedTimeId === step.id;
            return (
              <button
                key={step.id}
                onClick={() => {
                  setSelectedTimeId(step.id);
                  setIsPlayingTimeline(false);
                }}
                className={`py-1.5 px-1 rounded-xl text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#174A70] text-white font-bold shadow-xs scale-[1.02]'
                    : 'bg-[#EEF6FA] text-slate-700 hover:bg-slate-100 text-[11px] font-semibold'
                }`}
              >
                <div className="text-[10px] leading-none tracking-tight">{step.label}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
