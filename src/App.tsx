import React, { useState } from 'react';
import { StepId, NavTab, SavedPlace, GroundReport } from './types';
import { INITIAL_SAVED_PLACES, GROUND_REPORTS } from './data/mockData';

// Common Components
import { JudgeToolbar } from './components/common/JudgeToolbar';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { WhyModal } from './components/common/WhyModal';
import { WhatChangedModal } from './components/common/WhatChangedModal';

// Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { PersonaScreen } from './components/screens/PersonaScreen';
import { LocationPermissionScreen } from './components/screens/LocationPermissionScreen';
import { LocationSelectScreen } from './components/screens/LocationSelectScreen';
import { MyPlacesScreen } from './components/screens/MyPlacesScreen';
import { PersonalizationCompleteScreen } from './components/screens/PersonalizationCompleteScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { EvidenceViewerScreen } from './components/screens/EvidenceViewerScreen';
import { WeatherMapScreen } from './components/screens/WeatherMapScreen';
import { JourneyScreen } from './components/screens/JourneyScreen';
import { AlertsScreen } from './components/screens/AlertsScreen';
import { AskMausamScreen } from './components/screens/AskMausamScreen';

export default function App() {
  // Navigation & Step State
  const [currentStep, setCurrentStep] = useState<StepId>('01-splash');
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);

  // User Personalization State
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>(['commuter', 'traveller']);
  const [currentCity, setCurrentCity] = useState<string>('Ludhiana');
  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>(INITIAL_SAVED_PLACES);

  // Modals & Active Evidence
  const [isWhyModalOpen, setIsWhyModalOpen] = useState<boolean>(false);
  const [whyContext, setWhyContext] = useState<'commute_rain' | 'ground_reality' | 'panipat_route'>('commute_rain');
  const [isWhatChangedOpen, setIsWhatChangedOpen] = useState<boolean>(false);
  const [activeEvidenceReport, setActiveEvidenceReport] = useState<GroundReport>(GROUND_REPORTS[0]);

  // Persona Toggle Handler
  const handleTogglePersona = (id: string) => {
    setSelectedPersonas(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  // Step Switcher Mapping
  const handleSelectStep = (step: StepId) => {
    setCurrentStep(step);
    // Sync bottom nav tab
    if (['08-home', '09-what-matters-now', '10-official-weather', '11-ground-reality', '25-final-home'].includes(step)) {
      setActiveTab('home');
    } else if (['13-weather-map', '14-map-interaction', '15-map-time-machine'].includes(step)) {
      setActiveTab('map');
    } else if (['16-my-journey', '17-weather-ahead', '18-contextual-advisory'].includes(step)) {
      setActiveTab('map');
    } else if (step === '20-alerts') {
      setActiveTab('alerts');
    } else if (['06-my-places', '24-places-management'].includes(step)) {
      setActiveTab('places');
    } else if (['21-ask-mausam', '22-plan-mausam'].includes(step)) {
      setActiveTab('ask');
    }

    if (step === '19-what-changed') {
      setIsWhatChangedOpen(true);
    }
    if (step === '23-why-seeing-this') {
      setIsWhyModalOpen(true);
    }
  };

  // Bottom Nav Tab Switcher
  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === 'home') setCurrentStep('25-final-home');
    if (tab === 'map') setCurrentStep('13-weather-map');
    if (tab === 'alerts') setCurrentStep('20-alerts');
    if (tab === 'places') setCurrentStep('24-places-management');
    if (tab === 'ask') setCurrentStep('21-ask-mausam');
  };

  // Determine if top/bottom bars should show
  const isOnboardingStep = [
    '01-splash',
    '02-welcome',
    '03-personas',
    '04-location-perm',
    '05-location',
    '06-my-places',
    '07-personalization-complete'
  ].includes(currentStep);

  const isFullScreenEvidence = currentStep === '12-evidence-viewer';

  // Render the current screen component based on currentStep and activeTab
  const renderScreen = () => {
    switch (currentStep) {
      case '01-splash':
        return <SplashScreen onContinue={() => setCurrentStep('02-welcome')} />;

      case '02-welcome':
        return <WelcomeScreen onGetStarted={() => setCurrentStep('03-personas')} />;

      case '03-personas':
        return (
          <PersonaScreen
            selectedPersonas={selectedPersonas}
            onTogglePersona={handleTogglePersona}
            onContinue={() => setCurrentStep('04-location-perm')}
          />
        );

      case '04-location-perm':
        return (
          <LocationPermissionScreen
            onUseCurrentLocation={() => {
              setCurrentCity('Ludhiana');
              setCurrentStep('05-location');
            }}
            onChooseLocation={() => setCurrentStep('05-location')}
          />
        );

      case '05-location':
        return (
          <LocationSelectScreen
            currentCity={currentCity}
            onSelectCity={setCurrentCity}
            onContinue={() => setCurrentStep('06-my-places')}
          />
        );

      case '06-my-places':
        return (
          <MyPlacesScreen
            places={savedPlaces}
            onUpdatePlaces={setSavedPlaces}
            onContinue={() => setCurrentStep('07-personalization-complete')}
          />
        );

      case '07-personalization-complete':
        return (
          <PersonalizationCompleteScreen
            locationName={currentCity}
            selectedPersonas={selectedPersonas}
            savedPlaces={savedPlaces}
            onOpenMausam={() => {
              setCurrentStep('08-home');
              setActiveTab('home');
            }}
          />
        );

      case '08-home':
      case '09-what-matters-now':
      case '10-official-weather':
      case '11-ground-reality':
      case '25-final-home':
        return (
          <HomeScreen
            locationName={currentCity}
            selectedPersonas={selectedPersonas}
            savedPlaces={savedPlaces}
            onOpenWhy={() => {
              setWhyContext('commute_rain');
              setIsWhyModalOpen(true);
            }}
            onOpenEvidence={(report) => {
              setActiveEvidenceReport(report);
              setCurrentStep('12-evidence-viewer');
            }}
            onOpenMap={() => {
              setCurrentStep('13-weather-map');
              setActiveTab('map');
            }}
            onOpenJourney={() => {
              setCurrentStep('16-my-journey');
              setActiveTab('map');
            }}
            onOpenAlerts={() => {
              setCurrentStep('20-alerts');
              setActiveTab('alerts');
            }}
            isFinalPersonalized={currentStep === '25-final-home'}
          />
        );

      case '12-evidence-viewer':
        return (
          <EvidenceViewerScreen
            report={activeEvidenceReport}
            onBack={() => {
              setCurrentStep('11-ground-reality');
              setActiveTab('home');
            }}
            onViewOnMap={() => {
              setCurrentStep('13-weather-map');
              setActiveTab('map');
            }}
          />
        );

      case '13-weather-map':
      case '14-map-interaction':
      case '15-map-time-machine':
        return (
          <WeatherMapScreen
            initialMode="area"
            initialTimeStep={currentStep === '15-map-time-machine' ? 't-1h' : 't-now'}
            onOpenEvidence={(report) => {
              setActiveEvidenceReport(report);
              setCurrentStep('12-evidence-viewer');
            }}
            onOpenJourney={() => {
              setCurrentStep('16-my-journey');
            }}
            activePersona={selectedPersonas[0] || 'commuter'}
          />
        );

      case '16-my-journey':
      case '17-weather-ahead':
      case '18-contextual-advisory':
        return (
          <JourneyScreen
            onViewEvidence={(report) => {
              setActiveEvidenceReport(report);
              setCurrentStep('12-evidence-viewer');
            }}
            onViewOnMap={() => {
              setCurrentStep('13-weather-map');
            }}
          />
        );

      case '19-what-changed':
        return (
          <HomeScreen
            locationName={currentCity}
            selectedPersonas={selectedPersonas}
            savedPlaces={savedPlaces}
            onOpenWhy={() => setIsWhyModalOpen(true)}
            onOpenEvidence={(report) => {
              setActiveEvidenceReport(report);
              setCurrentStep('12-evidence-viewer');
            }}
            onOpenMap={() => setCurrentStep('13-weather-map')}
            onOpenJourney={() => setCurrentStep('16-my-journey')}
            onOpenAlerts={() => setCurrentStep('20-alerts')}
          />
        );

      case '20-alerts':
        return (
          <AlertsScreen
            onOpenEvidence={(report) => {
              setActiveEvidenceReport(report);
              setCurrentStep('12-evidence-viewer');
            }}
            onOpenMap={() => {
              setCurrentStep('13-weather-map');
              setActiveTab('map');
            }}
          />
        );

      case '21-ask-mausam':
      case '22-plan-mausam':
        return (
          <AskMausamScreen
            onOpenWhy={() => {
              setWhyContext('commute_rain');
              setIsWhyModalOpen(true);
            }}
          />
        );

      case '23-why-seeing-this':
        return (
          <HomeScreen
            locationName={currentCity}
            selectedPersonas={selectedPersonas}
            savedPlaces={savedPlaces}
            onOpenWhy={() => setIsWhyModalOpen(true)}
            onOpenEvidence={(report) => {
              setActiveEvidenceReport(report);
              setCurrentStep('12-evidence-viewer');
            }}
            onOpenMap={() => setCurrentStep('13-weather-map')}
            onOpenJourney={() => setCurrentStep('16-my-journey')}
            onOpenAlerts={() => setCurrentStep('20-alerts')}
          />
        );

      case '24-places-management':
        return (
          <MyPlacesScreen
            places={savedPlaces}
            onUpdatePlaces={setSavedPlaces}
            isStandaloneTab={true}
          />
        );

      default:
        return (
          <HomeScreen
            locationName={currentCity}
            selectedPersonas={selectedPersonas}
            savedPlaces={savedPlaces}
            onOpenWhy={() => setIsWhyModalOpen(true)}
            onOpenEvidence={(report) => {
              setActiveEvidenceReport(report);
              setCurrentStep('12-evidence-viewer');
            }}
            onOpenMap={() => setCurrentStep('13-weather-map')}
            onOpenJourney={() => setCurrentStep('16-my-journey')}
            onOpenAlerts={() => setCurrentStep('20-alerts')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF6FA] text-[#193247] flex flex-col font-['Manrope',sans-serif]">
      {/* 1. SIH 2026 Judge Stepper & Control Toolbar */}
      <JudgeToolbar
        currentStep={currentStep}
        onSelectStep={handleSelectStep}
        isMobileFrame={isMobileFrame}
        onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
        onOpenWhy={() => {
          setWhyContext('commute_rain');
          setIsWhyModalOpen(true);
        }}
        onOpenWhatChanged={() => setIsWhatChangedOpen(true)}
      />

      {/* 2. Main Application Frame (Mobile Container or Full Width) */}
      <main className="flex-1 flex justify-center items-start p-0 sm:py-4 md:py-6">
        <div
          className={`w-full transition-all duration-300 relative bg-[#EEF6FA] ${
            isMobileFrame
              ? 'max-w-[420px] rounded-none sm:rounded-[36px] shadow-2xl border-0 sm:border-[8px] sm:border-slate-800/90 overflow-hidden min-h-[720px] max-h-[92vh] flex flex-col'
              : 'max-w-4xl rounded-2xl shadow-md border border-slate-200 overflow-hidden flex flex-col min-h-[700px]'
          }`}
        >
          {/* Simulated Mobile Speaker/Ear Speaker Notch on phone frame */}
          {isMobileFrame && (
            <div className="hidden sm:flex items-center justify-between px-6 pt-3 pb-1 bg-[#F8FAFC] border-b border-slate-200/60 z-30 select-none">
              <span className="text-[10px] font-bold text-slate-800 font-mono">09:41</span>
              <div className="w-16 h-4 bg-slate-800 rounded-full mx-auto" />
              <div className="flex items-center gap-1 text-[10px] text-slate-700">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>
          )}

          {/* Top Mobile App Bar (Active on main screens) */}
          {!isOnboardingStep && !isFullScreenEvidence && (
            <Header
              locationName={currentCity}
              onOpenLocationSelect={() => setCurrentStep('05-location')}
              onOpenWhy={() => {
                setWhyContext('commute_rain');
                setIsWhyModalOpen(true);
              }}
              onOpenWhatChanged={() => setIsWhatChangedOpen(true)}
              activePersonaLabel={
                selectedPersonas.includes('commuter') ? 'Commuter & Route' : 'Personalized Active'
              }
            />
          )}

          {/* Screen Content Canvas */}
          <div className="flex-1 overflow-y-auto relative no-scrollbar">
            {renderScreen()}
          </div>

          {/* Fixed Bottom Navigation (Complies with 15% sticky cap) */}
          {!isOnboardingStep && !isFullScreenEvidence && (
            <BottomNav
              activeTab={activeTab}
              onTabChange={handleTabChange}
              hasActiveAlerts={true}
            />
          )}
        </div>
      </main>

      {/* Explainability Trust Modal (Why Am I Seeing This?) */}
      <WhyModal
        isOpen={isWhyModalOpen}
        onClose={() => setIsWhyModalOpen(false)}
        contextType={whyContext}
      />

      {/* What Changed Diff Modal */}
      <WhatChangedModal
        isOpen={isWhatChangedOpen}
        onClose={() => setIsWhatChangedOpen(false)}
        onViewAlerts={() => {
          setCurrentStep('20-alerts');
          setActiveTab('alerts');
        }}
        onViewGround={() => {
          setActiveEvidenceReport(GROUND_REPORTS[0]);
          setCurrentStep('12-evidence-viewer');
        }}
      />
    </div>
  );
}
