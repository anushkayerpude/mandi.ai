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
    <div className="glass-card-glow p-5 sm:p-6 rounded-3xl border border-mandi-500/30 shadow-2xl relative overflow-hidden">
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-mandi-500/20 text-mandi-300 border border-mandi-500/30 flex items-center justify-center font-bold text-sm">
            🏆
          </span>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-mandi-400">
              {t.bestRecommendation}
            </span>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-1">
                <MapPin className="w-5 h-5 text-mandi-400" />
                {displayName}
              </h3>
              <span className="text-xs text-slate-400 font-medium">
                ({loc.zone} Zone)
              </span>
            </div>
          </div>
        </div>

        {/* Opportunity Score Pill */}
        <div className="flex items-center gap-2 bg-gradient-to-br from-mandi-500/25 to-emerald-500/10 px-3.5 py-1.5 rounded-2xl border border-mandi-500/40">
          <Award className="w-5 h-5 text-mandi-400" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-mandi-300">
              {t.opportunity}
            </div>
            <div className="text-xl sm:text-2xl font-black text-white leading-none">
              {recommendation.opportunityScore}<span className="text-xs text-slate-400">/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Signals Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
        {/* Signal 1: Best Selling Window */}
        <div className="bg-slate-900/70 p-3 rounded-2xl border border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{t.bestSellingTime}</span>
          </div>
          <p className="text-sm sm:text-base font-bold text-slate-100">
            {recommendation.bestSellingWindow}
          </p>
        </div>

        {/* Signal 2: Hyperlocal Demand */}
        <div className="bg-slate-900/70 p-3 rounded-2xl border border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{t.demand}</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-black text-white">
              {recommendation.demandScore}
            </span>
            <span className="text-[10px] uppercase font-bold text-emerald-400">HIGH</span>
          </div>
        </div>

        {/* Signal 3: Competition */}
        <div className="bg-slate-900/70 p-3 rounded-2xl border border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold mb-1">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t.competition}</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-base sm:text-lg font-black ${
              recommendation.competitionLevel === 'LOW'
                ? 'text-emerald-400'
                : recommendation.competitionLevel === 'MEDIUM'
                ? 'text-amber-400'
                : 'text-rose-400'
            }`}>
              {recommendation.competitionLevel}
            </span>
            <span className="text-[10px] text-slate-400">
              ({recommendation.competitionVendorCount} thelas)
            </span>
          </div>
        </div>

        {/* Signal 4: Mandi Stability */}
        <div
          onClick={onOpenStabilityAudit}
          className="bg-slate-900/70 p-3 rounded-2xl border border-white/5 hover:border-mandi-500/40 cursor-pointer transition group"
        >
          <div className="flex items-center justify-between text-xs text-indigo-400 font-semibold mb-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.stability}</span>
            </span>
            <Info className="w-3 h-3 text-slate-500 group-hover:text-mandi-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-black text-white">
              {recommendation.stabilityScore}
            </span>
            <span className="text-[10px] uppercase font-bold text-emerald-400">
              {recommendation.stabilityLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-white/10">
        <div className="flex items-center gap-2">
          {/* Audio Synthesizer */}
          <button
            onClick={handleSpeak}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              isSpeaking
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-white/10'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-mandi-400" />}
            <span>{isSpeaking ? 'Stop Audio' : t.listenVoice}</span>
          </button>

          {/* Stability Audit Deep Dive Trigger */}
          <button
            onClick={onOpenStabilityAudit}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900/60 hover:bg-slate-800/80 border border-white/5 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-mandi-400" />
            <span className="hidden sm:inline">Check Risk & Rules</span>
          </button>
        </div>

        {/* Primary View Route Navigation */}
        <button
          onClick={onViewRoute}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-mandi-500 to-emerald-600 hover:from-mandi-400 hover:to-emerald-500 text-slate-950 font-black text-xs shadow-lg shadow-mandi-500/30 transition transform active:scale-95"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>{t.viewRoute}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
