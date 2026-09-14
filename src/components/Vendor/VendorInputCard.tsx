import React from 'react';
import { Sparkles, IndianRupee, MapPin, Clock, Search } from 'lucide-react';
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
    <div className="glass-panel p-5 rounded-3xl border border-khaki-300 shadow-sm relative overflow-hidden">
      {/* Header Greeting */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-mandi-600 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-mandi-500" />
            {t.goodMorning}
          </span>
          <h2 className="text-lg font-extrabold text-stone-900 tracking-tight">
            {t.whereToSellPrompt}
          </h2>
        </div>

        <button
          onClick={onSearch}
          disabled={isLoading}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-mandi-500 hover:bg-mandi-600 text-white font-bold text-xs shadow-sm transition-all transform active:scale-95 disabled:opacity-50"
        >
          <Search className="w-3.5 h-3.5" />
          <span>{t.findBestLocation}</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* 1. Working Capital / Budget */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <label className="text-stone-700 font-bold flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-mandi-600" />
              <span>{t.budgetLabel}</span>
            </label>
            <span className="text-base font-black text-mandi-600">
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
                    ? 'bg-mandi-500 text-white shadow-sm'
                    : 'bg-khaki-150 text-stone-800 hover:bg-khaki-200 border border-khaki-300'
                }`}
              >
                ₹{amount}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Commodity Categories */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1.5">
            {t.whatDoYouSell}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {categoryOptions.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => onChange({ ...query, category: cat.key })}
                className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold transition-all border ${
                  query.category === cat.key
                    ? 'bg-khaki-200 border-mandi-500 text-mandi-700 shadow-sm'
                    : 'bg-khaki-100/80 border-khaki-300 text-stone-700 hover:text-stone-900 hover:bg-khaki-150'
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
          <div className="bg-khaki-150/70 p-2.5 rounded-2xl border border-khaki-300">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-stone-700 font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-700" />
                {t.maxDistance}
              </span>
              <span className="font-extrabold text-blue-800">{query.maxDistanceKm} km</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={query.maxDistanceKm}
              onChange={(e) => onChange({ ...query, maxDistanceKm: Number(e.target.value) })}
              className="w-full accent-blue-700 h-1.5 bg-khaki-300 rounded-lg cursor-pointer"
            />
          </div>

          {/* Selling Duration */}
          <div className="bg-khaki-150/70 p-2.5 rounded-2xl border border-khaki-300">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-stone-700 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                Duration
              </span>
              <span className="font-extrabold text-amber-800">{query.durationHours} hours</span>
            </div>
            <input
              type="range"
              min="2"
              max="8"
              step="1"
              value={query.durationHours}
              onChange={(e) => onChange({ ...query, durationHours: Number(e.target.value) })}
              className="w-full accent-amber-700 h-1.5 bg-khaki-300 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Mobile Primary Action Button */}
        <button
          onClick={onSearch}
          disabled={isLoading}
          className="w-full sm:hidden flex items-center justify-center gap-2 py-3 rounded-2xl bg-mandi-500 hover:bg-mandi-600 text-white font-black text-sm shadow-md transition-all transform active:scale-98 disabled:opacity-50"
        >
          <Search className="w-4 h-4" />
          <span>{t.findBestLocation}</span>
        </button>
      </div>
    </div>
  );
};
