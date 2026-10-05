import React from 'react';
import { NavTab } from '../../types';
import { Home, Map, AlertTriangle, Bookmark, MessageSquareCode } from 'lucide-react';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  hasActiveAlerts?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  hasActiveAlerts = true
}) => {
  const tabs: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Weather Map', icon: Map },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'places', label: 'Places', icon: Bookmark },
    { id: 'ask', label: 'Ask', icon: MessageSquareCode }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      <div className="max-w-lg mx-auto grid grid-cols-5 h-15 px-1 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isMap = tab.id === 'map';

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] py-1 transition-all relative group ${
                isActive ? 'text-[#174A70]' : 'text-[#607789] hover:text-[#193247]'
              }`}
            >
              <div
                className={`relative p-1 rounded-xl transition-all duration-200 ${
                  isActive
                    ? isMap
                      ? 'bg-[#174A70] text-white shadow-xs'
                      : 'bg-[#EEF6FA] text-[#174A70]'
                    : 'group-hover:bg-slate-100/60'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 transition-transform ${isActive ? 'scale-105 stroke-[2.2]' : 'stroke-[1.8]'}`} />
                {tab.id === 'alerts' && hasActiveAlerts && (
                  <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#C94343] rounded-full ring-2 ring-white"></span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight mt-0.5 ${
                  isActive ? 'font-bold text-[#174A70]' : 'text-[#607789]'
                }`}
              >
                {tab.label}
              </span>
              {isActive && !isMap && (
                <span className="absolute bottom-1 w-3.5 h-0.5 bg-[#174A70] rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
