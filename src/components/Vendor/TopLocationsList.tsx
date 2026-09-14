import React from 'react';
import { MapPin, Navigation, TrendingUp, ShieldCheck, ChevronRight } from 'lucide-react';
import { LocationRecommendation, Language } from '../../types';
import { getTranslation } from '../../utils/i18n';

interface TopLocationsListProps {
  recommendations: LocationRecommendation[];
  selectedLocation: LocationRecommendation | null;
  onSelect: (rec: LocationRecommendation) => void;
  lang: Language;
}

export const TopLocationsList: React.FC<TopLocationsListProps> = ({
  recommendations,
  selectedLocation,
  onSelect,
  lang,
}) => {
  const t = getTranslation(lang);
  const topList = recommendations.slice(0, 5);

  return (
    <div className="glass-panel p-5 rounded-3xl border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>📍</span>
          <span>{t.topLocations}</span>
        </h3>
        <span className="text-[11px] font-semibold text-slate-400">
          Ranked by Opportunity
        </span>
      </div>

      <div className="space-y-2.5">
        {topList.map((rec, index) => {
          const isSelected = selectedLocation?.location.id === rec.location.id;
          const locName = lang === 'gu' ? rec.location.nameGu : lang === 'hi' ? rec.location.nameHi : rec.location.name;

          return (
            <div
              key={rec.location.id}
              onClick={() => onSelect(rec)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isSelected
                  ? 'bg-gradient-to-r from-mandi-500/20 to-emerald-500/10 border-mandi-500/50 shadow-md'
                  : 'bg-slate-900/60 border-white/5 hover:bg-slate-800/60 hover:border-white/10'
              }`}
            >
              {/* Left: Rank badge & Ward details */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                    index === 0
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : index === 1
                      ? 'bg-slate-300 text-slate-950'
                      : index === 2
                      ? 'bg-amber-700 text-amber-100'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  #{index + 1}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white">{locName}</h4>
                    <span className="text-[10px] text-slate-400">({rec.distanceKm} km)</span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <TrendingUp className="w-3 h-3" />
                      Demand: {rec.demandScore}
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-sky-400" />
                      Stability: {rec.stabilityScore}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Opportunity score & Chevron */}
              <div className="flex items-center gap-2 text-right shrink-0">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Score</div>
                  <div className="text-base font-black text-mandi-400 leading-none">
                    {rec.opportunityScore}
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-mandi-400 translate-x-0.5' : 'text-slate-600'}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
