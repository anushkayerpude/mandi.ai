import React from 'react';
import { Navigation, Clock, AlertTriangle, X, CheckCircle2, ChevronRight } from 'lucide-react';
import { LocationRecommendation } from '../../types';

interface RouteNavigatorProps {
  recommendation: LocationRecommendation;
  onClose: () => void;
}

export const RouteNavigator: React.FC<RouteNavigatorProps> = ({ recommendation, onClose }) => {
  return (
    <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:w-96 z-[400] glass-panel-subtle p-4 rounded-2xl shadow-2xl border border-mandi-500/40 bg-slate-950/90 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-mandi-500/20 text-mandi-400 border border-mandi-500/40 flex items-center justify-center">
            <Navigation className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              Route to {recommendation.location.name}
            </h4>
            <span className="text-[11px] text-mandi-300 font-medium">
              Handcart Walking Path
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-2 mb-3 bg-slate-900/60 p-2.5 rounded-xl border border-white/5 text-center">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-400">Distance</span>
          <p className="text-base font-bold text-slate-100">{recommendation.distanceKm} km</p>
        </div>
        <div className="border-l border-white/10">
          <span className="text-[10px] uppercase tracking-wider text-slate-400">Pushcart ETA</span>
          <p className="text-base font-bold text-emerald-400 flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            ~{recommendation.walkingEtaMinutes} mins
          </p>
        </div>
      </div>

      {/* Turn-by-Turn Waypoints */}
      <div className="space-y-2 text-xs mb-3">
        <div className="flex items-start gap-2 text-slate-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-mandi-400 shrink-0 mt-0.5" />
          <span>Start from current depot / APMC staging gate</span>
        </div>
        <div className="flex items-start gap-2 text-slate-300">
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span>Follow 12m wide residential service road (Avoid arterial BRTS lanes)</span>
        </div>
        <div className="flex items-start gap-2 text-emerald-300 font-medium">
          <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <span>Arrive at {recommendation.location.name} AMC Vending Lane before 4:30 PM</span>
        </div>
      </div>

      {/* Street Safety Tip */}
      <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        <span>Keep pushcart reflectors visible in evening twilight.</span>
      </div>
    </div>
  );
};
