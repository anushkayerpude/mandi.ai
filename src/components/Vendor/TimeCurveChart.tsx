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
    <div className="glass-panel p-5 rounded-3xl border border-white/10 shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-0.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Diurnal Sales Curve</span>
          </div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>{t.hourlyDemandTitle}</span>
          </h3>
        </div>

        {/* Peak Window Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold animate-pulse">
          <Flame className="w-4 h-4 text-amber-400" />
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
                <span className={`font-semibold flex items-center gap-1.5 ${isPeak ? 'text-amber-300' : 'text-slate-300'}`}>
                  {isPeak && <Sparkles className="w-3 h-3 text-amber-400" />}
                  {point.hour}
                </span>
                <span className="font-bold text-slate-200">
                  {point.score} <span className="text-[10px] text-slate-500">/ 100</span>
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isPeak
                      ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 shadow-lg shadow-amber-500/40'
                      : point.score >= 75
                      ? 'bg-gradient-to-r from-mandi-600 to-mandi-400'
                      : 'bg-slate-700'
                  }`}
                  style={{ width: `${point.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Insight footer */}
      <div className="mt-4 p-2.5 rounded-xl bg-slate-900/50 border border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Ahmedabad households shop fresh vegetables primarily between 5:00 PM - 7:30 PM after daily work shifts.</span>
      </div>
    </div>
  );
};
