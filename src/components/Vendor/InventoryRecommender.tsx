import React from 'react';
import { IndianRupee, Sparkles, AlertCircle, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { RecommendedProduct, Language } from '../../types';
import { getTranslation } from '../../utils/i18n';

interface InventoryRecommenderProps {
  products: RecommendedProduct[];
  budget: number;
  lang: Language;
}

export const InventoryRecommender: React.FC<InventoryRecommenderProps> = ({
  products,
  budget,
  lang,
}) => {
  const t = getTranslation(lang);

  const totalExpectedProfit = products.reduce((acc, p) => acc + p.expectedProfit, 0);
  const totalAllocated = products.reduce((acc, p) => acc + p.allocatedAmount, 0);

  return (
    <div className="glass-panel p-5 rounded-3xl border border-white/10 shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-1 text-xs text-mandi-400 font-semibold mb-0.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Knapsack Allocation</span>
          </div>
          <h3 className="text-base font-bold text-white flex items-center gap-1.5">
            <span>🛒</span>
            <span>{t.recommendedInventory}</span>
          </h3>
        </div>

        {/* Expected Return Pill */}
        <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
          <ArrowUpRight className="w-4 h-4 text-emerald-400" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">Est. Net Profit</div>
            <div className="text-sm font-black text-emerald-400">
              +₹{totalExpectedProfit.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Produce Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-3">
        {products.map((item) => {
          const itemName = lang === 'gu' ? item.nameGu : lang === 'hi' ? item.nameHi : item.name;

          return (
            <div
              key={item.id}
              className="bg-slate-900/70 p-3 rounded-2xl border border-white/5 hover:border-mandi-500/30 transition flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">{itemName}</h4>
                    <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                      {item.demandLevel} Demand
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-white">₹{item.allocatedAmount}</span>
                  <div className="text-[10px] text-slate-400">~{item.estimatedKg} kg</div>
                </div>
              </div>

              {/* Price & Margin details */}
              <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/5 text-[10px] text-slate-400 text-center">
                <div>
                  <span className="block text-slate-500">APMC Cost</span>
                  <span className="font-semibold text-slate-300">₹{item.wholesalePricePerKg}/kg</span>
                </div>
                <div>
                  <span className="block text-slate-500">Street Price</span>
                  <span className="font-semibold text-slate-200">₹{item.retailPricePerKg}/kg</span>
                </div>
                <div>
                  <span className="block text-slate-500">Est. Profit</span>
                  <span className="font-bold text-emerald-400">+₹{item.expectedProfit}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Budget Verification Footer */}
      <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/40 px-3 py-2 rounded-xl">
        <span className="flex items-center gap-1.5">
          <ShoppingBag className="w-3.5 h-3.5 text-mandi-400" />
          <span>Total Working Capital Allocated: <strong>₹{totalAllocated}</strong></span>
        </span>
        <span className="text-[11px] text-amber-300 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          <span>Keep ₹150 for emergency cart maintenance & bags</span>
        </span>
      </div>
    </div>
  );
};
