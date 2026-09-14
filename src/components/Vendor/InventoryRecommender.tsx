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
    <div className="glass-panel p-5 rounded-3xl border border-khaki-300 shadow-sm bg-khaki-50">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-khaki-300">
        <div>
          <div className="flex items-center gap-1 text-xs text-mandi-600 font-bold mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-mandi-500" />
            <span>AI Knapsack Allocation</span>
          </div>
          <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-1.5">
            <span>🛒</span>
            <span>{t.recommendedInventory}</span>
          </h3>
        </div>

        {/* Expected Return Pill */}
        <div className="flex items-center gap-2 bg-mandi-100 px-3 py-1.5 rounded-xl border border-mandi-300 shadow-sm">
          <ArrowUpRight className="w-4 h-4 text-mandi-600" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-stone-600">Est. Net Profit</div>
            <div className="text-sm font-black text-mandi-700">
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
              className="bg-khaki-100/90 p-3 rounded-2xl border border-khaki-300 shadow-sm hover:border-mandi-400 transition flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 leading-tight">{itemName}</h4>
                    <span className="text-[10px] font-bold text-mandi-700 uppercase tracking-wider">
                      {item.demandLevel} Demand
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-stone-900">₹{item.allocatedAmount}</span>
                  <div className="text-[10px] font-semibold text-stone-500">~{item.estimatedKg} kg</div>
                </div>
              </div>

              {/* Price & Margin details */}
              <div className="grid grid-cols-3 gap-1 pt-2 border-t border-khaki-200 text-[10px] text-stone-600 text-center">
                <div>
                  <span className="block text-stone-500">APMC Cost</span>
                  <span className="font-bold text-stone-800">₹{item.wholesalePricePerKg}/kg</span>
                </div>
                <div>
                  <span className="block text-stone-500">Street Price</span>
                  <span className="font-bold text-stone-800">₹{item.retailPricePerKg}/kg</span>
                </div>
                <div>
                  <span className="block text-stone-500">Est. Profit</span>
                  <span className="font-extrabold text-mandi-700">+₹{item.expectedProfit}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Budget Verification Footer */}
      <div className="flex items-center justify-between text-xs text-stone-700 bg-khaki-200/80 px-3 py-2 rounded-xl border border-khaki-300">
        <span className="flex items-center gap-1.5">
          <ShoppingBag className="w-3.5 h-3.5 text-mandi-600" />
          <span>Total Working Capital Allocated: <strong>₹{totalAllocated}</strong></span>
        </span>
        <span className="text-[11px] text-amber-800 font-semibold flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
          <span>Keep ₹150 for emergency cart maintenance & bags</span>
        </span>
      </div>
    </div>
  );
};
