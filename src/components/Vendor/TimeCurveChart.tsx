import React from 'react';
import { Clock, Flame, Sparkles } from 'lucide-react';
import { HourlyDemand, Language } from '../../types';
import { getTranslation } from '../../utils/i18n';

interface TimeCurveChartProps {
  hourlyCurve: HourlyDemand[];
  bestWindow: string;
  lang: Language;
}

export const TimeCurveChart: React.FC<TimeCurveChartProps> = ({
  hourlyCurve,
  bestWindow,
  lang,
}) => {
  const t = getTranslation(lang);

  return (
    <div className="glass-panel p-5 rounded-3xl border border-khaki-300 shadow-sm bg-khaki-50">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-amber-800 font-bold mb-0.5">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>Diurnal Sales Curve</span>
          </div>
          <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
            <span>{t.hourlyDemandTitle}</span>
          </h3>
        </div>

        {/* Peak Window Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold shadow-sm">
          <Flame className="w-4 h-4 text-amber-700" />
          <span>Prime Window: {bestWindow}</span>
        </div>
      </div>

      {/* Bar Chart Bars */}
      <div className="space-y-3">
        {hourlyCurve.map((point) => {
          const isPeak = point.isPeak;

          return (
            <div key={point.hour} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className={`font-bold flex items-center gap-1.5 ${isPeak ? 'text-amber-800' : 'text-stone-700'}`}>
                  {isPeak && <Sparkles className="w-3.5 h-3.5 text-amber-600" />}
                  {point.hour}
                </span>
                <span className="font-extrabold text-stone-900">
                  {point.score} <span className="text-[10px] text-stone-500 font-semibold">/ 100</span>
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-3 bg-khaki-200 rounded-full overflow-hidden p-0.5 border border-khaki-300">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isPeak
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 shadow-sm'
                      : point.score >= 75
                      ? 'bg-gradient-to-r from-mandi-500 to-mandi-600'
                      : 'bg-khaki-400'
                  }`}
                  style={{ width: `${point.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Insight footer */}
      <div className="mt-4 p-2.5 rounded-xl bg-khaki-100 border border-khaki-200 text-[11px] text-stone-700 flex items-center justify-between font-medium">
        <span>Ahmedabad households shop fresh vegetables primarily between 5:00 PM - 7:30 PM after daily work shifts.</span>
      </div>
    </div>
  );
};
