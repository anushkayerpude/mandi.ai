import React from 'react';
import { ShoppingBag, Landmark, Globe } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-khaki-100/95 backdrop-blur-md border-b border-khaki-300/80 px-4 py-2.5 sm:px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mandi-500 to-mandi-700 flex items-center justify-center shadow-md shadow-mandi-500/20 border border-mandi-400/30">
            <span className="text-xl select-none">🥬</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 flex items-center gap-1.5">
                Mandi<span className="text-mandi-500">.ai</span>
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-khaki-200 text-stone-800 border border-khaki-300">
                Ahmedabad
              </span>
            </div>
            <p className="text-xs text-stone-600 hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls: Mode Switch & Language Picker */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Persona Switcher (Vendor vs Municipal) */}
          <div className="flex items-center bg-khaki-200/90 p-1 rounded-xl border border-khaki-300 shadow-inner">
            <button
              onClick={() => onModeChange('vendor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                mode === 'vendor'
                  ? 'bg-mandi-500 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t.vendorMode}</span>
            </button>
            <button
              onClick={() => onModeChange('municipal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                mode === 'municipal'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>{t.municipalMode}</span>
            </button>
          </div>

          {/* Language Selector */}
          <div className="relative flex items-center bg-khaki-200/90 rounded-xl border border-khaki-300 p-1">
            <Globe className="w-3.5 h-3.5 text-stone-600 ml-1.5 mr-1" />
            <select
              value={lang}
              onChange={(e) => onLangChange(e.target.value as Language)}
              aria-label="Select language"
              className="bg-transparent text-xs text-stone-800 font-bold py-1 pr-2 outline-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="gu">ગુજરાતી</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
