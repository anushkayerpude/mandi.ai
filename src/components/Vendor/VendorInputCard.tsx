import React from 'react';
import { Sparkles, IndianRupee, MapPin, Clock, Search, Sliders } from 'lucide-react';
import { VendorQuery, ProductCategory, Language } from '../../types';
import { getTranslation } from '../../utils/i18n';

interface VendorInputCardProps {
  query: VendorQuery;
  onChange: (query: VendorQuery) => void;
  onSearch: () => void;
  lang: Language;
  isLoading?: boolean;
}

export const VendorInputCard: React.FC<VendorInputCardProps> = ({
  query,
  onChange,
  onSearch,
  lang,
  isLoading = false,
}) => {
  const t = getTranslation(lang);

  const budgetOptions = [1000, 2000, 3000, 5000];
  const categoryOptions: { key: ProductCategory; label: string; icon: string }[] = [
    { key: 'vegetables', label: t.vegetables, icon: '🥕' },
    { key: 'fruits', label: t.fruits, icon: '🍎' },
    { key: 'leafy', label: t.leafy, icon: '🥬' },
    { key: 'mixed', label: t.mixed, icon: '🧺' },
  ];

  return (
    <div className="glass-panel p-5 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-mandi-500/15 rounded-full blur-2xl pointer-events-none" />

      {/* Header Greeting */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold text-mandi-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {t.goodMorning}
          </span>
          <h2 className="text-lg font-bold text-white tracking-tight">
            {t.whereToSellPrompt}
          </h2>
        </div>

        <button
          onClick={onSearch}
          disabled={isLoading}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-mandi-500 to-emerald-600 hover:from-mandi-400 hover:to-emerald-500 text-white font-bold text-xs shadow-lg shadow-mandi-500/25 transition-all transform active:scale-95 disabled:opacity-50"
        >
          <Search className="w-3.5 h-3.5" />
          <span>{t.findBestLocation}</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* 1. Working Capital / Budget */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <label className="text-slate-300 font-medium flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-mandi-400" />
              <span>{t.budgetLabel}</span>
            </label>
            <span className="text-base font-extrabold text-emerald-400">
              ₹{query.budget.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {budgetOptions.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => onChange({ ...query, budget: amount })}
                className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                  query.budget === amount
                    ? 'bg-mandi-500 text-slate-950 shadow-md shadow-mandi-500/30'
                    : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 border border-white/5'
                }`}
              >
                ₹{amount}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Commodity Categories */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            {t.whatDoYouSell}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {categoryOptions.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => onChange({ ...query, category: cat.key })}
                className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold transition-all border ${
                  query.category === cat.key
                    ? 'bg-gradient-to-br from-mandi-500/20 to-emerald-500/10 border-mandi-500/50 text-emerald-300 shadow-sm'
                    : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span className="truncate">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Distance and Selling Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Max Distance Slider */}
          <div className="bg-slate-900/60 p-2.5 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                {t.maxDistance}
              </span>
              <span className="font-bold text-blue-400">{query.maxDistanceKm} km</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={query.maxDistanceKm}
              onChange={(e) => onChange({ ...query, maxDistanceKm: Number(e.target.value) })}
              className="w-full accent-blue-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          {/* Selling Duration */}
          <div className="bg-slate-900/60 p-2.5 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Duration
              </span>
              <span className="font-bold text-amber-400">{query.durationHours} hours</span>
            </div>
            <input
              type="range"
              min="2"
              max="8"
              step="1"
              value={query.durationHours}
              onChange={(e) => onChange({ ...query, durationHours: Number(e.target.value) })}
              className="w-full accent-amber-500 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Mobile Primary Action Button */}
        <button
          onClick={onSearch}
          disabled={isLoading}
          className="w-full sm:hidden flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-mandi-500 to-emerald-600 hover:from-mandi-400 hover:to-emerald-500 text-slate-950 font-black text-sm shadow-xl shadow-mandi-500/30 transition-all transform active:scale-98 disabled:opacity-50"
        >
          <Search className="w-4 h-4" />
          <span>{t.findBestLocation}</span>
        </button>
      </div>
    </div>
  );
};
