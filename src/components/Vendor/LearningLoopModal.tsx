import React, { useState } from 'react';
import { Sparkles, IndianRupee, Users, CheckCircle2, RotateCw, X, TrendingUp, Award } from 'lucide-react';
import { DailySalesLog, Language } from '../../types';
import { getTranslation } from '../../utils/i18n';

interface LearningLoopModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationName: string;
  budgetSpent: number;
  onLogSubmitted: (log: DailySalesLog) => void;
  lang: Language;
}

export const LearningLoopModal: React.FC<LearningLoopModalProps> = ({
  isOpen,
  onClose,
  locationName,
  budgetSpent,
  onLogSubmitted,
  lang,
}) => {
  if (!isOpen) return null;
  const t = getTranslation(lang);

  const [revenue, setRevenue] = useState<number>(3450);
  const [unsoldTomato, setUnsoldTomato] = useState<number>(2);
  const [unsoldPotato, setUnsoldPotato] = useState<number>(1);
  const [customerCount, setCustomerCount] = useState<number>(70);
  const [spotFeedback, setSpotFeedback] = useState<'peaceful' | 'crowded' | 'police_warning' | 'moved_spot'>('peaceful');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const netProfit = revenue - budgetSpent;

    const log: DailySalesLog = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString('en-IN'),
      locationName,
      budgetSpent,
      actualRevenue: revenue,
      profit: netProfit,
      customerCount,
      unsoldProduce: [
        { item: 'Tomato', kg: unsoldTomato },
        { item: 'Potato', kg: unsoldPotato },
      ],
      spotFeedback,
      learningImpact: {
        accuracyBoostPercent: 4.2,
        demandConfidenceDelta: 0.08,
      },
    };

    setIsSubmitted(true);
    setTimeout(() => {
      onLogSubmitted(log);
      setIsSubmitted(false);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel p-6 rounded-3xl border border-mandi-500/40 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-mandi-500 to-emerald-700 text-white flex items-center justify-center shadow-lg shadow-mandi-500/30">
              <RotateCw className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-mandi-400">
                {t.learningFlywheel}
              </span>
              <h3 className="text-lg font-bold text-white leading-tight">
                {t.logTodayResult}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Submission Celebration & Flywheel Animation */
          <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9 animate-bounce" />
            </div>
            <h4 className="text-xl font-black text-white">
              Data Ingested Successfully! 🎉
            </h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Your results from <strong className="text-emerald-400">{locationName}</strong> have retrained tomorrow’s demand priors.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 border border-mandi-500/30 text-xs font-bold text-mandi-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Model Accuracy Boost: +4.2%</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Context Badge */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-white/5 text-xs">
              <span className="text-slate-400">Trading Location:</span>
              <strong className="text-white font-bold">{locationName}</strong>
              <span className="text-slate-400">Initial Inventory:</span>
              <strong className="text-emerald-400 font-bold">₹{budgetSpent}</strong>
            </div>

            {/* Actual Revenue Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-mandi-400" />
                <span>{t.revenue}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  required
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl py-2.5 pl-8 pr-4 text-base font-bold text-white focus:border-mandi-500 outline-none"
                />
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                Estimated Net Margin: +₹{revenue - budgetSpent}
              </div>
            </div>

            {/* Unsold Inventory Breakdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t.unsoldProduce}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-900 p-2.5 rounded-xl border border-white/5">
                  <span className="text-xs text-slate-400 block mb-1">🍅 Tomato Left (kg)</span>
                  <input
                    type="number"
                    step="0.5"
                    value={unsoldTomato}
                    onChange={(e) => setUnsoldTomato(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-white/10 rounded-lg p-1.5 text-sm font-bold text-white text-center"
                  />
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-white/5">
                  <span className="text-xs text-slate-400 block mb-1">🥔 Potato Left (kg)</span>
                  <input
                    type="number"
                    step="0.5"
                    value={unsoldPotato}
                    onChange={(e) => setUnsoldPotato(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-white/10 rounded-lg p-1.5 text-sm font-bold text-white text-center"
                  />
                </div>
              </div>
            </div>

            {/* Customers Served & Spot Condition */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.customerCount}
                </label>
                <div className="relative">
                  <Users className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    value={customerCount}
                    onChange={(e) => setCustomerCount(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl py-2 pl-8 pr-3 text-xs font-bold text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Spot Stability
                </label>
                <select
                  value={spotFeedback}
                  onChange={(e) => setSpotFeedback(e.target.value as any)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl py-2 px-3 text-xs font-semibold text-white cursor-pointer outline-none"
                >
                  <option value="peaceful">🟢 Peaceful / No Disturbance</option>
                  <option value="crowded">🟡 Overcrowded</option>
                  <option value="moved_spot">🟠 Had to shift cart</option>
                  <option value="police_warning">🔴 AMC Police Warning</option>
                </select>
              </div>
            </div>

            {/* Flywheel Explanation Note */}
            <div className="p-3 rounded-2xl bg-mandi-950/30 border border-mandi-500/20 text-[11px] text-mandi-200/80 leading-relaxed flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-mandi-400 shrink-0 mt-0.5" />
              <span>{t.flywheelSub}</span>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-mandi-500 to-emerald-600 hover:from-mandi-400 hover:to-emerald-500 text-slate-950 font-black text-xs shadow-lg shadow-mandi-500/30 transition transform active:scale-98"
            >
              {t.submitResult}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
