import React from 'react';
import { TrendingUp, ShieldCheck, ChevronRight } from 'lucide-react';
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
    <div className="glass-panel p-5 rounded-3xl border border-khaki-300 shadow-sm bg-khaki-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
          <span>📍</span>
          <span>{t.topLocations}</span>
        </h3>
        <span className="text-[11px] font-bold text-stone-600">
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
                  ? 'bg-khaki-200 border-mandi-500 shadow-sm'
                  : 'bg-khaki-100/90 border-khaki-300 hover:bg-khaki-150'
              }`}
            >
              {/* Left: Rank badge & Ward details */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                    index === 0
                      ? 'bg-amber-400 text-stone-950 shadow-sm'
                      : index === 1
                      ? 'bg-stone-300 text-stone-900'
                      : index === 2
                      ? 'bg-khaki-400 text-stone-900'
                      : 'bg-khaki-300 text-stone-800'
                  }`}
                >
                  #{index + 1}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-extrabold text-stone-900">{locName}</h4>
                    <span className="text-[10px] text-stone-600 font-semibold">({rec.distanceKm} km)</span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-stone-600 mt-0.5 font-semibold">
                    <span className="flex items-center gap-1 text-mandi-700">
                      <TrendingUp className="w-3 h-3" />
                      Demand: {rec.demandScore}
                    </span>
                    <span className="flex items-center gap-1 text-blue-800">
                      <ShieldCheck className="w-3 h-3" />
                      Stability: {rec.stabilityScore}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Opportunity score & Chevron */}
              <div className="flex items-center gap-2 text-right shrink-0">
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-600">Score</div>
                  <div className="text-base font-black text-mandi-700 leading-none">
                    {rec.opportunityScore}
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-mandi-600 translate-x-0.5' : 'text-stone-400'}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
