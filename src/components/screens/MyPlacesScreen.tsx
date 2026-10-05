import React, { useState } from 'react';
import { SavedPlace } from '../../types';
import { Bookmark, Plus, Edit2, ArrowRight, ShieldCheck, MapPin, Check } from 'lucide-react';

interface MyPlacesScreenProps {
  places: SavedPlace[];
  onUpdatePlaces: (places: SavedPlace[]) => void;
  onContinue?: () => void;
  isStandaloneTab?: boolean;
}

export const MyPlacesScreen: React.FC<MyPlacesScreenProps> = ({
  places,
  onUpdatePlaces,
  onContinue,
  isStandaloneTab = false
}) => {
  const [editingPlaceId, setEditingPlaceId] = useState<string | null>(null);
  const [newPurposeText, setNewPurposeText] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlaceName, setNewPlaceName] = useState('');
  const [newPlaceType, setNewPlaceType] = useState<'home' | 'college' | 'office' | 'airport' | 'farm'>('college');
  const [newPlacePurpose, setNewPlacePurpose] = useState('Daily Commute');

  const PURPOSE_OPTIONS = [
    'Daily Commute',
    'Travel & Highway Transit',
    'Residence & Family',
    'Work & Meetings',
    'Agriculture & Irrigation',
    'Weekend Exercise / Outdoor'
  ];

  const handleSavePurpose = (id: string) => {
    const updated = places.map((p) => {
      if (p.id === id) {
        return { ...p, purpose: newPurposeText || p.purpose };
      }
      return p;
    });
    onUpdatePlaces(updated);
    setEditingPlaceId(null);
  };

  const handleAddNewPlace = () => {
    if (!newPlaceName.trim()) return;
    const icons: Record<string, string> = {
      home: '🏠',
      college: '🎓',
      office: '💼',
      airport: '✈️',
      farm: '🌾'
    };
    const newPlace: SavedPlace = {
      id: `place-${Date.now()}`,
      name: newPlaceName.trim(),
      type: newPlaceType,
      icon: icons[newPlaceType] || '📍',
      address: 'Ludhiana Sector, Punjab',
      city: 'Ludhiana',
      purpose: newPlacePurpose
    };
    onUpdatePlaces([...places, newPlace]);
    setNewPlaceName('');
    setShowAddModal(false);
  };

  return (
    <div className="min-h-[600px] h-full flex flex-col justify-between p-5 sm:p-6 bg-[#EEF6FA] text-[#193247]">
      {/* Header */}
      <div className="space-y-1 pt-1">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-bold text-[#4C9ED9] uppercase tracking-wider">
            {isStandaloneTab ? 'My Places' : 'Step 06 · Personalization'}
          </div>
          <span className="text-[10px] bg-[#DDEFE7] text-emerald-900 px-2 py-0.5 rounded-full font-bold">
            Driven by Purpose
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[#174A70] tracking-tight">
          Places that matter to you.
        </h2>
        <p className="text-xs text-[#607789]">
          In Mausam, <strong className="text-[#193247] font-semibold">a place has a PURPOSE</strong>. That purpose triggers commute weather advisories and transit alerts.
        </p>
      </div>

      {/* Purpose Architecture Callout */}
      <div className="my-2 p-3 bg-white rounded-2xl border border-[#4C9ED9]/30 flex items-start gap-2.5 shadow-xs">
        <ShieldCheck className="w-4 h-4 text-[#174A70] shrink-0 mt-0.5" />
        <div className="text-[11px] text-slate-600">
          <span className="font-bold text-[#174A70]">Why Purpose matters: </span>
          Setting <span className="font-semibold text-slate-800">"Daily Commute"</span> watches rain at 4 PM; setting <span className="font-semibold text-slate-800">"Travel"</span> scans weather along the 310 km highway.
        </div>
      </div>

      {/* Places List */}
      <div className="my-2 space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
        {places.map((place) => {
          const isEditing = editingPlaceId === place.id;

          return (
            <div
              key={place.id}
              className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF6FA] text-xl flex items-center justify-center shrink-0 border border-slate-100">
                    {place.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#193247] flex items-center gap-1.5">
                      <span>{place.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">· {place.city}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{place.address}</div>

                    {/* Purpose Badge with Edit Trigger */}
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold text-[#174A70] bg-[#EEF6FA] px-2 py-0.5 rounded-md border border-[#4C9ED9]/20">
                        Purpose: {place.purpose}
                      </span>
                      {place.commuteTime && (
                        <span className="text-[10px] text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                          ⏱ {place.commuteTime}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setEditingPlaceId(isEditing ? null : place.id);
                    setNewPurposeText(place.purpose);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#174A70] hover:bg-slate-100 transition-colors"
                  title="Edit Purpose"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Inline Purpose Editor */}
              {isEditing && (
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Update Place Purpose:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {PURPOSE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setNewPurposeText(opt)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-medium text-left border transition-colors ${
                          newPurposeText === opt
                            ? 'bg-[#174A70] text-white border-[#174A70]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={() => setEditingPlaceId(null)}
                      className="px-2.5 py-1 text-[11px] text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSavePurpose(place.id)}
                      className="px-3 py-1 bg-[#174A70] text-white text-[11px] font-semibold rounded-lg hover:bg-[#193247]"
                    >
                      Save Purpose
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Add New Place Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full py-2.5 rounded-2xl border border-dashed border-slate-300 text-slate-600 hover:border-[#174A70] hover:text-[#174A70] hover:bg-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Another Place</span>
        </button>
      </div>

      {/* Modal to add place */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-3 text-xs shadow-xl border border-slate-200">
            <h3 className="font-bold text-sm text-[#174A70]">Add Place with Purpose</h3>
            <div>
              <label className="text-[10px] text-slate-500 font-semibold block mb-1">Place Name</label>
              <input
                type="text"
                value={newPlaceName}
                onChange={(e) => setNewPlaceName(e.target.value)}
                placeholder="e.g. Samrala Farmhouse, West Gym"
                className="w-full h-9 px-3 rounded-xl border border-slate-200 text-xs text-[#193247] focus:outline-none focus:ring-1 focus:ring-[#174A70]"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 font-semibold block mb-1">Type</label>
              <select
                value={newPlaceType}
                onChange={(e) => setNewPlaceType(e.target.value as any)}
                className="w-full h-9 px-2 rounded-xl border border-slate-200 text-xs bg-white"
              >
                <option value="college">🎓 College / Campus</option>
                <option value="home">🏠 Home</option>
                <option value="office">💼 Office / Workplace</option>
                <option value="airport">✈️ Airport / Transit</option>
                <option value="farm">🌾 Farm / Agricultural Field</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 font-semibold block mb-1">Purpose</label>
              <select
                value={newPlacePurpose}
                onChange={(e) => setNewPlacePurpose(e.target.value)}
                className="w-full h-9 px-2 rounded-xl border border-slate-200 text-xs bg-white"
              >
                {PURPOSE_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewPlace}
                className="px-4 py-1.5 bg-[#174A70] text-white font-semibold rounded-xl"
              >
                Add Place
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA Bottom Button */}
      {onContinue && (
        <div className="pt-2">
          <button
            onClick={onContinue}
            className="w-full h-12 rounded-2xl bg-[#174A70] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#174A70]/10 hover:bg-[#193247] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{isStandaloneTab ? 'SAVED (APPLIED TO HOMEPAGE)' : 'SAVE & CONTINUE'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
