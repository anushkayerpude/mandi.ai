import React from 'react';
import { ShoppingBag, Landmark, Volume2, Globe, ShieldCheck, Sparkles } from 'lucide-react';
import { AppMode, Language } from '../types';
import { getTranslation } from '../utils/i18n';

interface NavbarProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  mode,
  onModeChange,
  lang,
  onLangChange,
}) => {
  const t = getTranslation(lang);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-4 py-2.5 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mandi-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-mandi-500/25 border border-mandi-400/40">
            <span className="text-xl select-none">🥬</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                Mandi<span className="text-mandi-400">.ai</span>
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-mandi-500/20 text-mandi-300 border border-mandi-500/30">
                Ahmedabad
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls: Mode Switch & Language Picker */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Persona Switcher (Vendor vs Municipal) */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-700/60 shadow-inner">
            <button
              onClick={() => onModeChange('vendor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                mode === 'vendor'
                  ? 'bg-gradient-to-r from-mandi-600 to-mandi-500 text-white shadow-md shadow-mandi-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t.vendorMode}</span>
            </button>
            <button
              onClick={() => onModeChange('municipal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                mode === 'municipal'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>{t.municipalMode}</span>
            </button>
          </div>

          {/* Language Selector */}
          <div className="relative flex items-center bg-slate-900/90 rounded-xl border border-slate-700/60 p-1">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
            <select
              value={lang}
              onChange={(e) => onLangChange(e.target.value as Language)}
              aria-label="Select language"
              className="bg-transparent text-xs text-slate-200 font-medium py-1 pr-2 outline-none cursor-pointer"
            >
              <option value="en" className="bg-slate-900 text-white">English</option>
              <option value="gu" className="bg-slate-900 text-white">ગુજરાતી</option>
              <option value="hi" className="bg-slate-900 text-white">हिन्दी</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
