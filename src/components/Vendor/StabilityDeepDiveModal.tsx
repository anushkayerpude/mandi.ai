import React from 'react';
import { ShieldCheck, AlertTriangle, X, FileText } from 'lucide-react';
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
    let isGood = risk === 'LOW';
    if (inverted) isGood = !isGood;

    if (isGood) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-mandi-100 text-mandi-700 border border-mandi-300">
          LOW RISK
        </span>
      );
    }
    if (risk === 'MEDIUM') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
          MODERATE
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-chilli-100 text-chilli-700 border border-chilli-300">
        HIGH RISK
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-khaki-50 p-6 rounded-3xl border border-khaki-300 shadow-2xl space-y-5 text-stone-900">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-khaki-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-mandi-100 text-mandi-700 border border-mandi-300 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900 leading-tight">
                {t.stabilityAuditTitle}
              </h3>
              <p className="text-xs text-stone-600">
                Spatial Suitability & Municipal Compliance for <strong className="text-stone-900">{locationName}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-khaki-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overall Score Pill */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-khaki-150 border border-khaki-300">
          <div>
            <span className="text-xs uppercase tracking-wider text-stone-600 font-bold">
              Stability Score
            </span>
            <div className="text-2xl font-black text-stone-900 flex items-center gap-2">
              <span>{audit.overallScore}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-mandi-100 text-mandi-700 border border-mandi-300">
                {audit.level} STABILITY
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase text-stone-500 font-bold block">Compliance Index</span>
            <span className="text-base font-black text-blue-800">{audit.municipalCompliancePercent}%</span>
          </div>
        </div>

        {/* 4 Risk Factors Breakdown */}
        <div className="space-y-2.5 text-xs">
          {/* Factor 1: Vending Zone Compatibility */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-khaki-100 border border-khaki-200">
            <div>
              <span className="font-bold text-stone-900 block">{t.vendingZoneCompat}</span>
              <span className="text-[11px] text-stone-600">Status: {audit.vendingZoneStatus}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-mandi-100 text-mandi-700 border border-mandi-300">
              HIGH
            </span>
          </div>

          {/* Factor 2: Road Obstruction Risk */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-khaki-100 border border-khaki-200">
            <div>
              <span className="font-bold text-stone-900 block">{t.roadObstructionRisk}</span>
              <span className="text-[11px] text-stone-600">Traffic bottleneck & BRTS clearance</span>
            </div>
            {getRiskBadge(audit.roadObstructionRisk)}
          </div>

          {/* Factor 3: Private Property Risk */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-khaki-100 border border-khaki-200">
            <div>
              <span className="font-bold text-stone-900 block">{t.privatePropertyRisk}</span>
              <span className="text-[11px] text-stone-600">Commercial complex encroachment risk</span>
            </div>
            {getRiskBadge(audit.privatePropertyRisk)}
          </div>

          {/* Factor 4: Vendor Competition Conflict */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-khaki-100 border border-khaki-200">
            <div>
              <span className="font-bold text-stone-900 block">{t.competitionConflict}</span>
              <span className="text-[11px] text-stone-600">Territory dispute with existing thelas</span>
            </div>
            {getRiskBadge(audit.competitionConflictRisk)}
          </div>
        </div>

        {/* Local Municipal Restrictions Notice */}
        <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-blue-800">
            <FileText className="w-3.5 h-3.5" />
            <span>Local AMC Note:</span>
          </div>
          <p className="text-[11px] leading-relaxed text-blue-950 font-medium">{audit.knownRestrictions}</p>
        </div>

        {/* Mandatory Legal Disclaimer */}
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-[11px] text-amber-950 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="block font-bold text-amber-900 mb-0.5">{t.disclaimerTitle}</strong>
            {audit.legalDisclaimer}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-khaki-200 hover:bg-khaki-300 text-stone-900 font-bold text-xs transition border border-khaki-300"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
};
