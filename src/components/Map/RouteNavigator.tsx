import React from 'react';
import { Navigation, Clock, AlertTriangle, X, CheckCircle2, ChevronRight } from 'lucide-react';
import { LocationRecommendation } from '../../types';

interface RouteNavigatorProps {
  recommendation: LocationRecommendation;
  onClose: () => void;
}

export const RouteNavigator: React.FC<RouteNavigatorProps> = ({ recommendation, onClose }) => {
  return (
    <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:w-96 z-[400] bg-khaki-50 p-4 rounded-2xl shadow-xl border-2 border-mandi-500 animate-in fade-in slide-in-from-bottom-4 duration-300 text-stone-900">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-mandi-100 text-mandi-700 border border-mandi-300 flex items-center justify-center">
            <Navigation className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-stone-900 flex items-center gap-1.5">
              Route to {recommendation.location.name}
            </h4>
            <span className="text-[11px] text-mandi-700 font-bold">
              Handcart Walking Path
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-khaki-200 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-2 mb-3 bg-khaki-150 p-2.5 rounded-xl border border-khaki-300 text-center">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-stone-600 font-bold">Distance</span>
          <p className="text-base font-black text-stone-900">{recommendation.distanceKm} km</p>
        </div>
        <div className="border-l border-khaki-300">
          <span className="text-[10px] uppercase tracking-wider text-stone-600 font-bold">Pushcart ETA</span>
          <p className="text-base font-black text-mandi-700 flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            ~{recommendation.walkingEtaMinutes} mins
          </p>
        </div>
      </div>

      {/* Turn-by-Turn Waypoints */}
      <div className="space-y-2 text-xs mb-3">
        <div className="flex items-start gap-2 text-stone-800 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-mandi-600 shrink-0 mt-0.5" />
          <span>Start from current depot / APMC staging gate</span>
        </div>
        <div className="flex items-start gap-2 text-stone-800 font-medium">
          <ChevronRight className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
          <span>Follow 12m wide residential service road (Avoid arterial BRTS lanes)</span>
        </div>
        <div className="flex items-start gap-2 text-mandi-800 font-bold">
          <ChevronRight className="w-3.5 h-3.5 text-mandi-600 shrink-0 mt-0.5" />
          <span>Arrive at {recommendation.location.name} AMC Vending Lane before 4:30 PM</span>
        </div>
      </div>

      {/* Street Safety Tip */}
      <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-100 border border-amber-300 text-[11px] text-amber-900 font-semibold">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
        <span>Keep pushcart reflectors visible in evening twilight.</span>
      </div>
    </div>
  );
};
