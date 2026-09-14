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
    <div className="absolute top-4 right-4 z-[400] bg-khaki-50/95 backdrop-blur-md p-2 rounded-2xl shadow-md flex flex-col gap-1.5 border border-khaki-300 text-xs">
      <div className="flex items-center gap-1.5 px-2 py-1 text-stone-600 font-extrabold uppercase tracking-wider text-[10px]">
        <Layers className="w-3.5 h-3.5 text-mandi-600" />
        <span>Map Layers</span>
      </div>

      <button
        onClick={() => onToggle('showHeatmap')}
        className={`flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-xl font-bold transition-all ${
          layers.showHeatmap
            ? 'bg-khaki-200 text-stone-900 border border-khaki-400 shadow-sm'
            : 'text-stone-700 hover:text-stone-900 hover:bg-khaki-150'
        }`}
      >
        <span className="flex items-center gap-2">
          <Flame className="w-3.5 h-3.5 text-amber-700" />
          Opportunity Heatmap
        </span>
        <span className={`w-2 h-2 rounded-full ${layers.showHeatmap ? 'bg-mandi-600' : 'bg-khaki-400'}`} />
      </button>

      <button
        onClick={() => onToggle('showThelas')}
        className={`flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-xl font-bold transition-all ${
          layers.showThelas
            ? 'bg-khaki-200 text-stone-900 border border-khaki-400 shadow-sm'
            : 'text-stone-700 hover:text-stone-900 hover:bg-khaki-150'
        }`}
      >
        <span className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-amber-700" />
          Competing Thelas
        </span>
        <span className={`w-2 h-2 rounded-full ${layers.showThelas ? 'bg-amber-600' : 'bg-khaki-400'}`} />
      </button>

      <button
        onClick={() => onToggle('showVendingZones')}
        className={`flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-xl font-bold transition-all ${
          layers.showVendingZones
            ? 'bg-khaki-200 text-stone-900 border border-khaki-400 shadow-sm'
            : 'text-stone-700 hover:text-stone-900 hover:bg-khaki-150'
        }`}
      >
        <span className="flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-mandi-600" />
          AMC Vending Zones
        </span>
        <span className={`w-2 h-2 rounded-full ${layers.showVendingZones ? 'bg-mandi-600' : 'bg-khaki-400'}`} />
      </button>

      <button
        onClick={() => onToggle('showPois')}
        className={`flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-xl font-bold transition-all ${
          layers.showPois
            ? 'bg-khaki-200 text-stone-900 border border-khaki-400 shadow-sm'
            : 'text-stone-700 hover:text-stone-900 hover:bg-khaki-150'
        }`}
      >
        <span className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-blue-700" />
          Transit & Markets
        </span>
        <span className={`w-2 h-2 rounded-full ${layers.showPois ? 'bg-blue-600' : 'bg-khaki-400'}`} />
      </button>
    </div>
  );
};
