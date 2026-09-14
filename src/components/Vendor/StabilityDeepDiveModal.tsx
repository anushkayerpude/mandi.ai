import React from 'react';
import { ShieldCheck, AlertTriangle, X, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { StabilityAudit, Language } from '../../types';
import { getTranslation } from '../../utils/i18n';

interface StabilityDeepDiveModalProps {
  audit: StabilityAudit;
  locationName: string;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const StabilityDeepDiveModal: React.FC<StabilityDeepDiveModalProps> = ({
  audit,
  locationName,
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;
  const t = getTranslation(lang);

  const getRiskBadge = (risk: 'LOW' | 'MEDIUM' | 'HIGH', inverted = false) => {
    // For risk: LOW is good (green), HIGH is bad (red)
    let isGood = risk === 'LOW';
    if (inverted) isGood = !isGood;

    if (isGood) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          LOW RISK
        </span>
      );
    }
    if (risk === 'MEDIUM') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
          MODERATE
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
        HIGH RISK
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel p-6 rounded-3xl border border-mandi-500/30 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-mandi-500/20 text-mandi-400 border border-mandi-500/40 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">
                {t.stabilityAuditTitle}
              </h3>
              <p className="text-xs text-slate-400">
                Spatial Suitability & Municipal Compliance for <strong className="text-white">{locationName}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overall Score Pill */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-white/5">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Stability Score
            </span>
            <div className="text-2xl font-black text-white flex items-center gap-2">
              <span>{audit.overallScore}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                {audit.level} STABILITY
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase text-slate-500 font-bold block">Compliance Index</span>
            <span className="text-base font-bold text-sky-400">{audit.municipalCompliancePercent}%</span>
          </div>
        </div>

        {/* 4 Risk Factors Breakdown */}
        <div className="space-y-2.5 text-xs">
          {/* Factor 1: Vending Zone Compatibility */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
            <div>
              <span className="font-semibold text-slate-200 block">{t.vendingZoneCompat}</span>
              <span className="text-[11px] text-slate-400">Status: {audit.vendingZoneStatus}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              HIGH
            </span>
          </div>

          {/* Factor 2: Road Obstruction Risk */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
            <div>
              <span className="font-semibold text-slate-200 block">{t.roadObstructionRisk}</span>
              <span className="text-[11px] text-slate-400">Traffic bottleneck & BRTS clearance</span>
            </div>
            {getRiskBadge(audit.roadObstructionRisk)}
          </div>

          {/* Factor 3: Private Property Risk */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
            <div>
              <span className="font-semibold text-slate-200 block">{t.privatePropertyRisk}</span>
              <span className="text-[11px] text-slate-400">Commercial complex encroachment risk</span>
            </div>
            {getRiskBadge(audit.privatePropertyRisk)}
          </div>

          {/* Factor 4: Vendor Competition Conflict */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5">
            <div>
              <span className="font-semibold text-slate-200 block">{t.competitionConflict}</span>
              <span className="text-[11px] text-slate-400">Territory dispute with existing thelas</span>
            </div>
            {getRiskBadge(audit.competitionConflictRisk)}
          </div>
        </div>

        {/* Local Municipal Restrictions Notice */}
        <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/20 text-xs text-sky-200 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-sky-400">
            <FileText className="w-3.5 h-3.5" />
            <span>Local AMC Note:</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-300">{audit.knownRestrictions}</p>
        </div>

        {/* Mandatory Legal Disclaimer */}
        <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-[11px] text-rose-200 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="block font-bold text-rose-300 mb-0.5">{t.disclaimerTitle}</strong>
            {audit.legalDisclaimer}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
};
