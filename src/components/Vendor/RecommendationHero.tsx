import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  TrendingUp,
  ShieldCheck,
  ShoppingBag,
  Navigation,
  Volume2,
  VolumeX,
  Info,
  Award,
  ChevronRight,
} from 'lucide-react';
import { LocationRecommendation, Language } from '../../types';
import { getTranslation } from '../../utils/i18n';
import { speakRecommendation, stopSpeaking } from '../../utils/speech';

interface RecommendationHeroProps {
  recommendation: LocationRecommendation;
  onViewRoute: () => void;
  onOpenStabilityAudit: () => void;
  lang: Language;
}

export const RecommendationHero: React.FC<RecommendationHeroProps> = ({
  recommendation,
  onViewRoute,
  onOpenStabilityAudit,
  lang,
}) => {
  const t = getTranslation(lang);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const loc = recommendation.location;
  const displayName = lang === 'gu' ? loc.nameGu : lang === 'hi' ? loc.nameHi : loc.name;

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakRecommendation(recommendation, lang, () => setIsSpeaking(false));
    }
  };

  return (
    <div className="glass-card-glow p-5 sm:p-6 rounded-3xl border-2 border-mandi-500 shadow-md relative overflow-hidden bg-khaki-50">
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-khaki-300">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-mandi-100 text-mandi-700 border border-mandi-300 flex items-center justify-center font-bold text-sm">
            🏆
          </span>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-mandi-700">
              {t.bestRecommendation}
            </span>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight flex items-center gap-1">
                <MapPin className="w-5 h-5 text-mandi-600" />
                {displayName}
              </h3>
              <span className="text-xs text-stone-600 font-semibold">
                ({loc.zone} Zone)
              </span>
            </div>
          </div>
        </div>

        {/* Opportunity Score Pill */}
        <div className="flex items-center gap-2.5 bg-khaki-200 px-3.5 py-1.5 rounded-2xl border border-khaki-400 shadow-sm">
          <Award className="w-5 h-5 text-mandi-600" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-stone-700">
              {t.opportunity}
            </div>
            <div className="text-xl sm:text-2xl font-black text-stone-900 leading-none">
              {recommendation.opportunityScore}<span className="text-xs text-stone-500">/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Signals Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
        {/* Signal 1: Best Selling Window */}
        <div className="bg-khaki-100/90 p-3 rounded-2xl border border-khaki-300 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs text-amber-800 font-bold mb-1">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.bestSellingTime}</span>
          </div>
          <p className="text-sm sm:text-base font-extrabold text-stone-900">
            {recommendation.bestSellingWindow}
          </p>
        </div>

        {/* Signal 2: Hyperlocal Demand */}
        <div className="bg-khaki-100/90 p-3 rounded-2xl border border-khaki-300 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs text-mandi-700 font-bold mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-mandi-600" />
            <span>{t.demand}</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-black text-stone-900">
              {recommendation.demandScore}
            </span>
            <span className="text-[10px] uppercase font-extrabold text-mandi-700">HIGH</span>
          </div>
        </div>

        {/* Signal 3: Competition */}
        <div className="bg-khaki-100/90 p-3 rounded-2xl border border-khaki-300 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs text-blue-800 font-bold mb-1">
            <ShoppingBag className="w-3.5 h-3.5 text-blue-700" />
            <span>{t.competition}</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-base sm:text-lg font-black ${
              recommendation.competitionLevel === 'LOW'
                ? 'text-mandi-700'
                : recommendation.competitionLevel === 'MEDIUM'
                ? 'text-amber-700'
                : 'text-chilli-600'
            }`}>
              {recommendation.competitionLevel}
            </span>
            <span className="text-[10px] font-medium text-stone-600">
              ({recommendation.competitionVendorCount} thelas)
            </span>
          </div>
        </div>

        {/* Signal 4: Mandi Stability */}
        <div
          onClick={onOpenStabilityAudit}
          className="bg-khaki-100/90 p-3 rounded-2xl border border-khaki-300 hover:border-mandi-500 cursor-pointer transition group shadow-sm"
        >
          <div className="flex items-center justify-between text-xs text-stone-700 font-bold mb-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-mandi-600" />
              <span>{t.stability}</span>
            </span>
            <Info className="w-3 h-3 text-stone-400 group-hover:text-mandi-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-black text-stone-900">
              {recommendation.stabilityScore}
            </span>
            <span className="text-[10px] uppercase font-extrabold text-mandi-700">
              {recommendation.stabilityLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-khaki-300">
        <div className="flex items-center gap-2">
          {/* Audio Synthesizer */}
          <button
            onClick={handleSpeak}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              isSpeaking
                ? 'bg-chilli-100 text-chilli-700 border border-chilli-400 animate-pulse'
                : 'bg-khaki-200 hover:bg-khaki-300 text-stone-800 border border-khaki-300'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-chilli-600" /> : <Volume2 className="w-4 h-4 text-mandi-600" />}
            <span>{isSpeaking ? 'Stop Audio' : t.listenVoice}</span>
          </button>

          {/* Stability Audit Deep Dive Trigger */}
          <button
            onClick={onOpenStabilityAudit}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-stone-800 bg-khaki-200/80 hover:bg-khaki-300 border border-khaki-300 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-mandi-600" />
            <span className="hidden sm:inline">Check Risk & Rules</span>
          </button>
        </div>

        {/* Primary View Route Navigation */}
        <button
          onClick={onViewRoute}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-mandi-500 hover:bg-mandi-600 text-white font-black text-xs shadow-md transition transform active:scale-95"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>{t.viewRoute}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
