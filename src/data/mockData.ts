import { Persona, SavedPlace, GroundReport, WeatherWarning, JourneyWaypoint, MapTimeStep } from '../types';

export const PERSONAS_LIST: Persona[] = [
  {
    id: 'commuter',
    name: 'Daily Commuter',
    emoji: '🚗',
    tagline: 'Route conditions, rain timing & road passability',
    priorities: ['Route rain alerts', 'Waterlogged underpasses', 'Visibility & delays', 'Peak hour commute advisory']
  },
  {
    id: 'traveller',
    name: 'Traveller',
    emoji: '✈️',
    tagline: 'Inter-city highways, flight weather & weather ahead',
    priorities: ['En-route weather ahead', 'Severe warnings', 'Airport terminal fog/wind', 'Highway slowdowns']
  },
  {
    id: 'health',
    name: 'Health Conscious',
    emoji: '🌿',
    tagline: 'AQI particulate levels, humidity & heat stress',
    priorities: ['PM2.5 / PM10 index', 'Heat index & wet-bulb', 'UV radiation', 'Pollen & respiratory comfort']
  },
  {
    id: 'fitness',
    name: 'Fitness & Outdoor',
    emoji: '🏃',
    tagline: 'Morning run windows, park conditions & hydration',
    priorities: ['Best running hour', 'Wind gusts & humidity', 'Surface wetness', 'UV peak windows']
  },
  {
    id: 'family',
    name: 'Family',
    emoji: '👨👩👧',
    tagline: 'School transit, sudden storms & weekend outings',
    priorities: ['School pickup rain forecast', 'Lightning proximity', 'Weekend outdoor safety', 'Sudden temperature drops']
  },
  {
    id: 'farmer',
    name: 'Farmer / Gardener',
    emoji: '🌾',
    tagline: 'Rainfall accumulation, soil moisture & spray windows',
    priorities: ['Millimeter rainfall forecast', 'Wind speed for pesticides', 'Frost & heatwaves', '72-hr rain probability']
  },
  {
    id: 'event',
    name: 'Event Planner',
    emoji: '🎉',
    tagline: 'Outdoor marquee safety, precipitation probability',
    priorities: ['Hourly rain risk matrix', 'Wind gust thresholds', 'Drying periods', 'Backup timing options']
  },
  {
    id: 'marine',
    name: 'Marine / Beach',
    emoji: '🌊',
    tagline: 'Coastal tide, swell height & sea breeze gusts',
    priorities: ['Wave height & swells', 'Tidal timings', 'Offshore squalls', 'Fisherman advisories']
  }
];

export const INITIAL_SAVED_PLACES: SavedPlace[] = [
  {
    id: 'place-college',
    name: 'College (GNDEC Campus)',
    type: 'college',
    icon: '🎓',
    address: 'Gill Road, Ludhiana',
    city: 'Ludhiana',
    purpose: 'Daily Commute',
    commuteTime: '08:30 AM & 04:00 PM',
    arrivalWindow: '4:00 PM return journey'
  },
  {
    id: 'place-airport',
    name: 'Delhi Airport (IGI T3)',
    type: 'airport',
    icon: '✈️',
    address: 'Terminal 3, New Delhi',
    city: 'Delhi',
    purpose: 'Travel',
    commuteTime: 'Scheduled Departure 06:45 PM',
    arrivalWindow: 'Highway transit via NH44'
  },
  {
    id: 'place-home',
    name: 'Home',
    type: 'home',
    icon: '🏠',
    address: 'Model Town Ext., Ludhiana',
    city: 'Ludhiana',
    purpose: 'Residence & Family',
    commuteTime: 'Base Location'
  },
  {
    id: 'place-office',
    name: 'Tech Park Office',
    type: 'office',
    icon: '💼',
    address: 'Ferozepur Road, Ludhiana',
    city: 'Ludhiana',
    purpose: 'Work / Meetings'
  }
];

export const GROUND_REPORTS: GroundReport[] = [
  {
    id: 'rep-railway-stn',
    category: 'waterlogging',
    title: 'Waterlogging near Railway Station Underpass',
    locationName: 'Ludhiana Railway Station (Old GT Road)',
    coordinates: { x: 48, y: 44 }, // Center-left of Ludhiana core
    distanceKm: 1.2,
    timeAgoMins: 8,
    reportCount: 12,
    photosCount: 5,
    videosCount: 2,
    systemConfidence: 'HIGH',
    confidenceReason: 'Consistent reports from 12 distinct geolocated users within 15 mins. Cross-verified with IMD automated Doppler echo detecting 28 mm/hr localized shower.',
    description: 'Underpass water accumulation reached 18–22 cm. Two-wheelers taking pedestrian flyover; cars moving at 10 km/h. Traffic police deployed.',
    reporterCredibilityScore: 94,
    imdCrossChecked: true,
    waterDepthCm: 20,
    trafficStatus: 'Slow moving',
    mediaSamples: [
      {
        type: 'photo',
        caption: 'Railway Station approach road with standing rainwater at 09:34 AM',
        timestamp: '8 min ago',
        verifiedGps: '30.9082° N, 75.8573° E'
      },
      {
        type: 'photo',
        caption: 'Auto-rickshaw navigating flooded curb near ticket counter gate',
        timestamp: '11 min ago',
        verifiedGps: '30.9080° N, 75.8576° E'
      },
      {
        type: 'video',
        caption: '14-second clip of vehicle wave action at underpass entry point',
        timestamp: '14 min ago',
        verifiedGps: '30.9079° N, 75.8570° E'
      }
    ]
  },
  {
    id: 'rep-panipat-toll',
    category: 'flooded_road',
    title: 'Water Accumulation near Panipat Toll Plaza',
    locationName: 'Panipat NH44 Corridor (KM 88)',
    coordinates: { x: 74, y: 72 }, // On the Highway route
    distanceKm: 215,
    timeAgoMins: 18,
    reportCount: 18,
    photosCount: 6,
    videosCount: 3,
    systemConfidence: 'HIGH',
    confidenceReason: 'Verified by highway commuters and corroborated by IMD Karnal-Panipat radar sweep showing high reflectivity convective cell.',
    description: 'Left two lanes submerged under 15 cm water after cloudburst. Traffic slowed to 30 km/h before the toll plaza.',
    reporterCredibilityScore: 97,
    imdCrossChecked: true,
    waterDepthCm: 16,
    trafficStatus: 'Slow moving',
    mediaSamples: [
      {
        type: 'photo',
        caption: 'NH44 southbound bottleneck near Panipat refinery flyover exit',
        timestamp: '18 min ago',
        verifiedGps: '29.3909° N, 76.9635° E'
      }
    ]
  },
  {
    id: 'rep-gill-road',
    category: 'heavy_rain',
    title: 'Intense Downpour near Gill Road Overbridge',
    locationName: 'Gill Canal Crossing',
    coordinates: { x: 52, y: 55 },
    distanceKm: 2.4,
    timeAgoMins: 12,
    reportCount: 7,
    photosCount: 3,
    videosCount: 1,
    systemConfidence: 'HIGH',
    confidenceReason: 'Clustered verified reports from commuters near college corridor.',
    description: 'Sudden rain shower with strong wind gusts. Low visibility under 200 meters. Drain overflowing onto shoulder.',
    reporterCredibilityScore: 89,
    imdCrossChecked: true,
    trafficStatus: 'Passable with care',
    mediaSamples: [
      {
        type: 'photo',
        caption: 'Heavy rain squall over canal road near GNDEC gate',
        timestamp: '12 min ago',
        verifiedGps: '30.8601° N, 75.8596° E'
      }
    ]
  },
  {
    id: 'rep-lightning-bypass',
    category: 'lightning',
    title: 'Lightning Activity & Sudden Wind Shift',
    locationName: 'Jalandhar Bypass Overpass',
    coordinates: { x: 38, y: 32 },
    distanceKm: 4.1,
    timeAgoMins: 22,
    reportCount: 4,
    photosCount: 2,
    videosCount: 0,
    systemConfidence: 'MEDIUM',
    confidenceReason: '4 citizen confirmations with matching acoustic signature on lightning sensor array.',
    description: 'Multiple cloud-to-ground strikes observed towards north-west horizon. Wind gusts 42 km/h.',
    reporterCredibilityScore: 84,
    imdCrossChecked: true,
    trafficStatus: 'Passable with care',
    mediaSamples: [
      {
        type: 'photo',
        caption: 'Dark anvil cloud front approaching northern bypass',
        timestamp: '22 min ago',
        verifiedGps: '30.9421° N, 75.8241° E'
      }
    ]
  }
];

export const OFFICIAL_WARNINGS: WeatherWarning[] = [
  {
    id: 'warn-imd-thunderstorm',
    type: 'official_imd',
    severity: 'ORANGE',
    title: 'Official IMD Thunderstorm & Squall Alert',
    issuedBy: 'India Meteorological Department (IMD Chandigarh)',
    timeValidUntil: 'Valid until 11:30 AM IST (Updated 10 min ago)',
    description: 'Moderate to intense thunderstorm accompanied by lightning, surface winds reaching 45–55 km/h, and spells of heavy rainfall likely over Ludhiana, Fatehgarh Sahib and adjoining areas.',
    affectedAreas: ['Ludhiana Urban', 'Khanna', 'Samrala', 'Jagraon'],
    actionAdvice: 'Stay indoors during lightning strikes. Avoid parking under old trees or unstable billboards. Expect water accumulation in low-lying underpasses.'
  },
  {
    id: 'warn-imd-heavy-rain-panipat',
    type: 'official_imd',
    severity: 'YELLOW',
    title: 'IMD Rain Warning: Haryana NH44 Belt',
    issuedBy: 'India Meteorological Department (IMD New Delhi / Karnal)',
    timeValidUntil: 'Valid until 03:00 PM IST',
    description: 'Scattered moderate rainfall with isolated heavy spells over Ambala, Kurukshetra, Karnal and Panipat along the Grand Trunk corridor.',
    affectedAreas: ['Panipat NH44', 'Karnal Bypass', 'Ambala Cantt'],
    actionAdvice: 'Reduce highway speeds, maintain 4x braking distance on wet tarmac, watch for water logging at flyover descents.'
  }
];

export const JOURNEY_WAYPOINTS: JourneyWaypoint[] = [
  {
    id: 'stop-ludhiana',
    name: 'Ludhiana',
    distanceFromStartKm: 0,
    etaFromStartMins: 0,
    etaFormatted: 'NOW',
    temp: 28,
    condition: 'Partly Cloudy',
    icon: '☀️',
    rainProbability: 25,
    hasAdvisory: false,
    mapCoords: { x: 32, y: 38 }
  },
  {
    id: 'stop-ambala',
    name: 'Ambala Cantt',
    distanceFromStartKm: 110,
    etaFromStartMins: 35,
    etaFormatted: '+35 min',
    temp: 26,
    condition: 'Cloudy',
    icon: '☁️',
    rainProbability: 40,
    hasAdvisory: false,
    mapCoords: { x: 50, y: 48 }
  },
  {
    id: 'stop-panipat',
    name: 'Panipat',
    distanceFromStartKm: 215,
    etaFromStartMins: 40, // Match exact prompt statement: "approximately 40 minutes into your journey"
    etaFormatted: '+40 min',
    temp: 24,
    condition: 'Heavy Rain',
    icon: '🌧️',
    rainProbability: 85,
    hasAdvisory: true,
    advisoryType: 'waterlogging',
    advisoryNote: '⚠️ Rain expected & 🌊 Recent waterlogging reports on NH44',
    mapCoords: { x: 68, y: 64 }
  },
  {
    id: 'stop-delhi',
    name: 'Delhi (IGI T3)',
    distanceFromStartKm: 310,
    etaFromStartMins: 270,
    etaFormatted: '+4h 30m',
    temp: 27,
    condition: 'Overcast',
    icon: '☁️',
    rainProbability: 35,
    hasAdvisory: false,
    mapCoords: { x: 84, y: 82 }
  }
];

export const MAP_TIME_STEPS: MapTimeStep[] = [
  {
    id: 't-now',
    label: 'NOW',
    timeOffsetMins: 0,
    headline: 'Scattered light rain in eastern sector',
    rainFrontPosition: 35,
    intensity: 'light',
    radarCellRadius: 45
  },
  {
    id: 't-30m',
    label: '+30 MIN',
    timeOffsetMins: 30,
    headline: 'Convective cell intensifying over College corridor',
    rainFrontPosition: 52,
    intensity: 'moderate',
    radarCellRadius: 75
  },
  {
    id: 't-1h',
    label: '+1 HOUR',
    timeOffsetMins: 60,
    headline: 'Peak rainfall across central city & railway underpass',
    rainFrontPosition: 68,
    intensity: 'peak',
    radarCellRadius: 110
  },
  {
    id: 't-2h',
    label: '+2 HOURS',
    timeOffsetMins: 120,
    headline: 'Rain front moving south-east towards Khanna',
    rainFrontPosition: 88,
    intensity: 'clearing',
    radarCellRadius: 50
  }
];

export const HOURLY_TODAY = [
  { time: 'Morning', label: '08:00 AM', temp: 26, icon: '☀️', rain: '10%' },
  { time: 'Afternoon', label: '01:00 PM', temp: 31, icon: '🌤️', rain: '25%' },
  { time: 'Evening', label: '04:00 PM', temp: 27, icon: '🌧️', rain: '75%', alert: true },
  { time: 'Night', label: '09:00 PM', temp: 24, icon: '☁️', rain: '20%' }
];

export const WHAT_CHANGED_DATA = {
  lastChecked: '35 minutes ago',
  diffs: [
    {
      metric: 'Rain probability for 4 PM commute',
      before: '30%',
      after: '70%',
      type: 'increase',
      badge: 'High Impact',
      note: 'Monsoon cloud band merged over southern bypass'
    },
    {
      metric: 'Ground reality reports',
      before: '5 verified',
      after: '22 verified',
      type: 'increase',
      badge: 'Cluster Formed',
      note: '12 new reports near Railway Station & Gill Road'
    },
    {
      metric: 'Official IMD advisory',
      before: 'Green (Normal)',
      after: '⚡ Orange (Thunderstorm)',
      type: 'warning',
      badge: 'Official Alert',
      note: 'IMD upgraded squall bulletin valid until 11:30 AM'
    }
  ]
};

export const ASK_MAUSAM_PRESETS = [
  {
    id: 'q1',
    question: 'Will it rain when I leave college?',
    responseHeadline: '🌧️ Rain is likely during your college commute.',
    timeline: [
      { time: '4 PM', chance: 60, intensity: 'Moderate rain starts' },
      { time: '5 PM', chance: 75, intensity: 'Peak thunderstorm shower' },
      { time: '6 PM', chance: 20, intensity: 'Drizzles, clearing' }
    ],
    whyExplanation: 'Your College (GNDEC) is saved as a daily commute location with a 4:00 PM return window. IMD Doppler radar and 7 verified ground reports indicate a heavy cell traversing Gill Road between 4:10 PM and 5:30 PM.'
  },
  {
    id: 'q2',
    question: 'What will I encounter on my Delhi trip?',
    responseHeadline: '⚠️ Clear in Punjab, but heavy rain & waterlogging near Panipat.',
    timeline: [
      { time: 'Ludhiana (Start)', chance: 25, intensity: 'Dry road, 28°C' },
      { time: '+40 min (Panipat)', chance: 85, intensity: 'Heavy rain, waterlogged toll road' },
      { time: '+4.5h (Delhi T3)', chance: 35, intensity: 'Overcast, manageable traffic' }
    ],
    whyExplanation: 'Synthesized from your saved Delhi Airport destination, route distance of 310 km on NH44, and active ground reports at KM 88 Panipat toll plaza.'
  },
  {
    id: 'q3',
    question: 'Why is this warning showing?',
    responseHeadline: '⚡ Official IMD Orange Thunderstorm Warning Active.',
    timeline: [
      { time: 'Issued', chance: 100, intensity: 'IMD Chandigarh 09:15 AM bulletin' },
      { time: 'Valid Until', chance: 100, intensity: '11:30 AM IST' }
    ],
    whyExplanation: 'You selected the Daily Commuter persona in Ludhiana. Orange warnings signify high impact on open road transit, tree-fall risk, and sudden squalls up to 55 km/h.'
  },
  {
    id: 'q4',
    question: 'Compare 8 AM vs 9 AM departure.',
    responseHeadline: '📊 8:00 AM departure has 25% lower weather risk than 9:00 AM.',
    timeline: [
      { time: '8:00 AM Departure', chance: 20, intensity: 'Dry road, clear visibility 6 km' },
      { time: '9:00 AM Departure', chance: 65, intensity: 'Squall front arrives, visibility down to 800m' }
    ],
    whyExplanation: 'Radar front propagation models show rain clouds consolidating over the western bypass after 08:45 AM. (Information presented for situational awareness; decision remains yours).'
  }
];

export const OUTDOOR_EVENT_MATRIX = [
  { hour: '3 PM', risk: 'Low', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', probability: 20, condition: 'Partly sunny' },
  { hour: '4 PM', risk: 'Moderate', color: 'text-amber-700 bg-amber-50 border-amber-200', probability: 55, condition: 'Approaching showers' },
  { hour: '5 PM', risk: 'High', color: 'text-rose-700 bg-rose-50 border-rose-200', probability: 85, condition: 'Thunderstorm squall' },
  { hour: '6 PM', risk: 'High', color: 'text-rose-700 bg-rose-50 border-rose-200', probability: 70, condition: 'Steady heavy rain' }
];
