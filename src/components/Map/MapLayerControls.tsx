import React from 'react';
import { Layers, Flame, Users, ShieldAlert, MapPin } from 'lucide-react';

export interface MapLayerState {
  showHeatmap: boolean;
  showThelas: boolean;
  showVendingZones: boolean;
  showPois: boolean;
}

interface MapLayerControlsProps {
  layers: MapLayerState;
  onToggle: (layer: keyof MapLayerState) => void;
}

export const MapLayerControls: React.FC<MapLayerControlsProps> = ({ layers, onToggle }) => {
  return (
    <div className="absolute top-4 right-4 z-[400] glass-panel p-2 rounded-2xl shadow-xl flex flex-col gap-1.5 border border-white/10 text-xs">
      <div className="flex items-center gap-1.5 px-2 py-1 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
        <Layers className="w-3.5 h-3.5 text-mandi-400" />
        <span>Map Layers</span>
      </div>

      <button
        onClick={() => onToggle('showHeatmap')}
        className={`flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-xl font-medium transition-all ${
          layers.showHeatmap
            ? 'bg-mandi-500/20 text-mandi-300 border border-mandi-500/30'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
        }`}
      >
        <span className="flex items-center gap-2">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          Opportunity Heatmap
        </span>
        <span className={`w-2 h-2 rounded-full ${layers.showHeatmap ? 'bg-mandi-400' : 'bg-slate-600'}`} />
      </button>

      <button
        onClick={() => onToggle('showThelas')}
        className={`flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-xl font-medium transition-all ${
          layers.showThelas
            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
        }`}
      >
        <span className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-yellow-400" />
          Competing Thelas
        </span>
        <span className={`w-2 h-2 rounded-full ${layers.showThelas ? 'bg-amber-400' : 'bg-slate-600'}`} />
      </button>

      <button
        onClick={() => onToggle('showVendingZones')}
        className={`flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-xl font-medium transition-all ${
          layers.showVendingZones
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
        }`}
      >
        <span className="flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
          AMC Vending Zones
        </span>
        <span className={`w-2 h-2 rounded-full ${layers.showVendingZones ? 'bg-emerald-400' : 'bg-slate-600'}`} />
      </button>

      <button
        onClick={() => onToggle('showPois')}
        className={`flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-xl font-medium transition-all ${
          layers.showPois
            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
        }`}
      >
        <span className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-blue-400" />
          Transit & Markets
        </span>
        <span className={`w-2 h-2 rounded-full ${layers.showPois ? 'bg-blue-400' : 'bg-slate-600'}`} />
      </button>
    </div>
  );
};
