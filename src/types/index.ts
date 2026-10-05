export type StepId =
  | '01-splash'
  | '02-welcome'
  | '03-personas'
  | '04-location-perm'
  | '05-location'
  | '06-my-places'
  | '07-personalization-complete'
  | '08-home'
  | '09-what-matters-now'
  | '10-official-weather'
  | '11-ground-reality'
  | '12-evidence-viewer'
  | '13-weather-map'
  | '14-map-interaction'
  | '15-map-time-machine'
  | '16-my-journey'
  | '17-weather-ahead'
  | '18-contextual-advisory'
  | '19-what-changed'
  | '20-alerts'
  | '21-ask-mausam'
  | '22-plan-mausam'
  | '23-why-seeing-this'
  | '24-places-management'
  | '25-final-home';

export type NavTab = 'home' | 'map' | 'alerts' | 'places' | 'ask';

export interface Persona {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  priorities: string[];
}

export interface PlacePurpose {
  id: string;
  label: string;
  description: string;
}

export interface SavedPlace {
  id: string;
  name: string;
  type: 'home' | 'college' | 'office' | 'airport' | 'farm' | 'custom';
  icon: string;
  address: string;
  city: string;
  purpose: string;
  commuteTime?: string;
  arrivalWindow?: string;
  isCustom?: boolean;
}

export interface GroundReport {
  id: string;
  category: 'waterlogging' | 'heavy_rain' | 'flooded_road' | 'lightning' | 'fog' | 'tree_fall';
  title: string;
  locationName: string;
  coordinates: { x: number; y: number }; // normalized 0-100 on map
  distanceKm: number;
  timeAgoMins: number;
  reportCount: number;
  photosCount: number;
  videosCount: number;
  systemConfidence: 'HIGH' | 'MEDIUM' | 'LOW';
  confidenceReason: string;
  description: string;
  reporterCredibilityScore: number; // e.g. 96%
  imdCrossChecked: boolean;
  waterDepthCm?: number;
  trafficStatus: 'Slow moving' | 'Diverted' | 'Passable with care';
  mediaSamples: Array<{
    type: 'photo' | 'video';
    caption: string;
    timestamp: string;
    verifiedGps: string;
  }>;
}

export interface WeatherWarning {
  id: string;
  type: 'official_imd' | 'citizen_cluster' | 'route_estimated';
  severity: 'RED' | 'ORANGE' | 'YELLOW';
  title: string;
  issuedBy: string;
  timeValidUntil: string;
  description: string;
  affectedAreas: string[];
  actionAdvice: string;
  coordinates?: { x: number; y: number };
}

export interface JourneyWaypoint {
  id: string;
  name: string;
  distanceFromStartKm: number;
  etaFromStartMins: number;
  etaFormatted: string;
  temp: number;
  condition: string;
  icon: string;
  rainProbability: number;
  hasAdvisory: boolean;
  advisoryType?: 'rain' | 'waterlogging' | 'clear';
  advisoryNote?: string;
  mapCoords: { x: number; y: number };
}

export interface MapTimeStep {
  id: string;
  label: string;
  timeOffsetMins: number;
  headline: string;
  rainFrontPosition: number; // 0 to 100
  intensity: 'light' | 'moderate' | 'peak' | 'clearing';
  radarCellRadius: number;
}
