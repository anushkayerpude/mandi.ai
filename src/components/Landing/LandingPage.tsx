import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-[#f4efe6] text-stone-900 flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans select-none">
      {/* Subtle Top Minimal Header */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between z-20 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🥬</span>
          <span className="text-xs uppercase font-extrabold tracking-widest text-stone-700">
            Mandi.ai • અમદાવાદ
          </span>
        </div>

        <button
          onClick={onEnterApp}
          className="flex items-center gap-1.5 text-xs font-bold text-stone-800 hover:text-stone-950 py-1.5 px-3 rounded-full bg-[#eae2d2] border border-[#d8ccb8] hover:bg-[#ded1bc] transition shadow-sm"
        >
          <span>ऐप खोलें</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </header>

      {/* Main Content Area: 4 Raw Photographs Framing the Center Piece */}
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col justify-center my-auto z-10 py-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-center">
          
          {/* Left Column: 2 Raw Photographs */}
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-1 gap-3 lg:gap-4 order-2 md:order-1">
            {/* Image 1: Vendor with tomato pushcart */}
            <div className="group relative rounded-2xl overflow-hidden border border-[#d8ccb8] bg-[#eae2d2] shadow-sm aspect-[4/3] md:aspect-[3/4]">
              <img
                src="/images/vendor_1.jpg"
                alt="Local Ahmedabad vendor with fresh tomatoes"
                className="w-full h-full object-cover grayscale-[15%] contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-2 left-2 right-2 bg-[#f4efe6]/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-stone-800 border border-[#d8ccb8]/60">
                ઇસનપુર શાકભાજી લારી
              </div>
            </div>

            {/* Image 2: Vendor pushing cart on road */}
            <div className="group relative rounded-2xl overflow-hidden border border-[#d8ccb8] bg-[#eae2d2] shadow-sm aspect-[4/3] md:aspect-[3/4]">
              <img
                src="/images/vendor_2.jpg"
                alt="Street vendor pushing cart loaded with green vegetables"
                className="w-full h-full object-cover grayscale-[15%] contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-2 left-2 right-2 bg-[#f4efe6]/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-stone-800 border border-[#d8ccb8]/60">
                મણિનગર સવારનો ફેરો
              </div>
            </div>
          </div>

          {/* Center Column: Minimalist Focal Island with Hindi Title */}
          <div className="md:col-span-6 flex flex-col items-center justify-center text-center p-6 sm:p-8 lg:p-10 order-1 md:order-2">
            <div className="max-w-md w-full bg-[#faf8f5] border border-[#d8ccb8] rounded-3xl p-6 sm:p-8 shadow-md">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eae2d2] text-stone-800 text-[11px] font-bold tracking-wider uppercase mb-4 border border-[#d8ccb8]">
                <Sparkles className="w-3 h-3 text-mandi-600" />
                <span>अहमदाबाद • स्ट्रीट वेंडिंग इंटेलिजेंस</span>
              </div>

              {/* Mandi AI Written Boldly in Hindi in the Middle */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-stone-900 tracking-tight font-['Rozha_One','Noto_Serif_Devanagari',serif] leading-none mb-3">
                मंडी<span className="text-mandi-600">.एआई</span>
              </h1>

              <div className="text-xs uppercase tracking-widest text-stone-500 font-extrabold mb-4">
                Mandi.ai • Geospatial Intelligence
              </div>

              <p className="text-sm sm:text-base text-stone-700 font-medium leading-relaxed mb-6">
                “हर ठेले को बनाएँ एक डेटा-संचालित सफल व्यवसाय।”
              </p>

              {/* Minimal Primary CTA */}
              <button
                onClick={onEnterApp}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-extrabold text-sm shadow-md transition-all transform active:scale-98 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>ऐप खोलें • Launch Platform</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-stone-500 font-medium">
                <span>📍 क्या बेचें</span>
                <span>•</span>
                <span>कहाँ बेचें</span>
                <span>•</span>
                <span>कब बेचें</span>
              </div>
            </div>
          </div>

          {/* Right Column: 2 Raw Photographs */}
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-1 gap-3 lg:gap-4 order-3">
            {/* Image 3: Vintage iron scale weighing produce */}
            <div className="group relative rounded-2xl overflow-hidden border border-[#d8ccb8] bg-[#eae2d2] shadow-sm aspect-[4/3] md:aspect-[3/4]">
              <img
                src="/images/vendor_3.jpg"
                alt="Vintage tarazu balance scale weighing onions and potatoes"
                className="w-full h-full object-cover grayscale-[15%] contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-2 left-2 right-2 bg-[#f4efe6]/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-stone-800 border border-[#d8ccb8]/60">
                પરંપરાગત ત્રાજવું વજન
              </div>
            </div>

            {/* Image 4: Busy morning market street scene */}
            <div className="group relative rounded-2xl overflow-hidden border border-[#d8ccb8] bg-[#eae2d2] shadow-sm aspect-[4/3] md:aspect-[3/4]">
              <img
                src="/images/vendor_4.jpg"
                alt="Open-air street vegetable market in Ahmedabad"
                className="w-full h-full object-cover grayscale-[15%] contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-2 left-2 right-2 bg-[#f4efe6]/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-stone-800 border border-[#d8ccb8]/60">
                જમાલપુર સવારની મંડી
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Subtle Minimal Footer */}
      <footer className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-[#d8ccb8]/60 text-[11px] text-stone-500 z-20">
        <div>
          Mandi.ai — Designed for India’s 10M+ Street Vendors
        </div>
        <div>
          Ahmedabad Municipal Corporation (AMC) Geospatial Grounding
        </div>
      </footer>
    </div>
  );
};
