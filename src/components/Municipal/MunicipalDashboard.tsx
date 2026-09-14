import React, { useState } from 'react';
import {
  Landmark,
  Users,
  AlertTriangle,
  TrendingUp,
  MapPin,
  ShieldPlus,
  Compass,
  ArrowUpRight,
  Sparkles,
  FileCheck,
} from 'lucide-react';
import { MunicipalStats, Language } from '../../types';
import { AHMEDABAD_WARDS } from '../../data/ahmedabadWards';
import { ZonePlannerModal } from './ZonePlannerModal';

interface MunicipalDashboardProps {
  lang: Language;
}

export const MunicipalDashboard: React.FC<MunicipalDashboardProps> = ({ lang }) => {
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [createdNotification, setCreatedNotification] = useState<string | null>(null);

  // Municipal benchmark numbers from PRD Section 20
  const stats: MunicipalStats = {
    totalVendors: 8420,
    mappedThelas: 6812,
    highDemandAreas: 42,
    overcrowdedAreas: 17,
    underservedAreas: 31,
    potentialVendingZones: 24,
    wardSummaries: [
      {
        wardId: 'jamalpur',
        wardName: 'Jamalpur (APMC)',
        vendorCount: 62,
        status: 'overcrowded',
        demandIndex: 93,
        opportunityIndex: 58,
        stabilityIndex: 48,
      },
      {
        wardId: 'kalupur',
        wardName: 'Kalupur Station',
        vendorCount: 45,
        status: 'overcrowded',
        demandIndex: 86,
        opportunityIndex: 61,
        stabilityIndex: 35,
      },
      {
        wardId: 'maninagar',
        wardName: 'Maninagar',
        vendorCount: 38,
        status: 'balanced',
        demandIndex: 95,
        opportunityIndex: 88,
        stabilityIndex: 82,
      },
      {
        wardId: 'isanpur',
        wardName: 'Isanpur',
        vendorCount: 22,
        status: 'balanced',
        demandIndex: 91,
        opportunityIndex: 91,
        stabilityIndex: 88,
      },
      {
        wardId: 'lambha',
        wardName: 'Lambha',
        vendorCount: 12,
        status: 'underserved',
        demandIndex: 84,
        opportunityIndex: 84,
        stabilityIndex: 85,
      },
      {
        wardId: 'ramol',
        wardName: 'Ramol',
        vendorCount: 14,
        status: 'underserved',
        demandIndex: 78,
        opportunityIndex: 78,
        stabilityIndex: 76,
      },
      {
        wardId: 'chandkheda',
        wardName: 'Chandkheda',
        vendorCount: 18,
        status: 'potential',
        demandIndex: 83,
        opportunityIndex: 85,
        stabilityIndex: 90,
      },
      {
        wardId: 'bopal',
        wardName: 'South Bopal',
        vendorCount: 16,
        status: 'potential',
        demandIndex: 86,
        opportunityIndex: 87,
        stabilityIndex: 89,
      },
    ],
  };

  const handleZoneCreated = (zoneName: string, wardName: string, capacity: number) => {
    setCreatedNotification(`Zone "${zoneName}" successfully approved in ${wardName} with ${capacity} thelas!`);
    setTimeout(() => setCreatedNotification(null), 5000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Executive Header */}
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/30 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-1">
            <Landmark className="w-4 h-4" />
            <span>Ahmedabad Municipal Corporation (AMC) • Urban Vending Intelligence</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Evidence-Based Street Vending Planning & Decongestion
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Leveraging live geospatial proxies, footfall density, and vendor thela concentration to resolve urban spatial conflicts under the Street Vendors Act.
          </p>
        </div>

        <button
          onClick={() => setIsPlannerOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-blue-600/30 transition transform active:scale-95"
        >
          <ShieldPlus className="w-4 h-4" />
          <span>Propose Vending Zone</span>
        </button>
      </div>

      {createdNotification && (
        <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-emerald-400" />
          <span>{createdNotification}</span>
        </div>
      )}

      {/* 6 Key Indicators Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-white/5">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Vendors</span>
          <p className="text-xl font-black text-white mt-0.5">{stats.totalVendors.toLocaleString('en-IN')}</p>
          <span className="text-[10px] text-slate-500">AMC Ward Survey</span>
        </div>

        <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-white/5">
          <span className="text-[10px] uppercase font-bold text-slate-400">Mapped Thelas</span>
          <p className="text-xl font-black text-blue-400 mt-0.5">{stats.mappedThelas.toLocaleString('en-IN')}</p>
          <span className="text-[10px] text-emerald-400">80.9% Digitalized</span>
        </div>

        <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-white/5">
          <span className="text-[10px] uppercase font-bold text-slate-400">High Demand Spots</span>
          <p className="text-xl font-black text-emerald-400 mt-0.5">{stats.highDemandAreas}</p>
          <span className="text-[10px] text-slate-500">Consumer Hotspots</span>
        </div>

        <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-white/5">
          <span className="text-[10px] uppercase font-bold text-slate-400">Overcrowded Spots</span>
          <p className="text-xl font-black text-rose-400 mt-0.5">{stats.overcrowdedAreas}</p>
          <span className="text-[10px] text-rose-400/80">Traffic Friction</span>
        </div>

        <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-white/5">
          <span className="text-[10px] uppercase font-bold text-slate-400">Underserved Areas</span>
          <p className="text-xl font-black text-amber-400 mt-0.5">{stats.underservedAreas}</p>
          <span className="text-[10px] text-amber-400/80">Food Deserts</span>
        </div>

        <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-white/5">
          <span className="text-[10px] uppercase font-bold text-slate-400">Potential Zones</span>
          <p className="text-xl font-black text-indigo-400 mt-0.5">{stats.potentialVendingZones}</p>
          <span className="text-[10px] text-indigo-400/80">Ready for Gazette</span>
        </div>
      </div>

      {/* Spatial Conflict & Decongestion Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Overcrowded Bottlenecks (Action Needed) */}
        <div className="glass-panel p-5 rounded-3xl border border-rose-500/20 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <h3 className="text-sm font-bold text-white">Critical Overcrowded Corridors</h3>
            </div>
            <span className="text-[11px] font-bold text-rose-400">Encroachment Risk</span>
          </div>

          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-rose-950/20 border border-rose-500/20 text-xs">
              <div className="flex items-center justify-between font-bold text-rose-200 mb-1">
                <span>🔴 Jamalpur Sardar Bridge Corridor</span>
                <span className="text-rose-400">62 Thelas (+24% over cap)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Spillover from wholesale APMC obstructs morning city bus transit. Recommendation: Disperse 20 thelas to eastern Lambha and Isanpur markets.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-rose-950/20 border border-rose-500/20 text-xs">
              <div className="flex items-center justify-between font-bold text-rose-200 mb-1">
                <span>🔴 Kalupur Railway Station Circle</span>
                <span className="text-rose-400">45 Thelas (No-Vending violation)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Severe BRTS corridor blockage. Strict traffic enforcement zone active. Relocation recommended to Sarangpur designated market.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Underserved Food Deserts (High Opportunity for Legal Zones) */}
        <div className="glass-panel p-5 rounded-3xl border border-emerald-500/20 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm font-bold text-white">Underserved Residential Food Deserts</h3>
            </div>
            <span className="text-[11px] font-bold text-emerald-400">Expansion Opportunity</span>
          </div>

          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-xs">
              <div className="flex items-center justify-between font-bold text-emerald-200 mb-1">
                <span>🟢 Lambha & GIDC Housing Belt</span>
                <span className="text-emerald-400">Only 12 Thelas (High Demand)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                16,800 residents with zero organized modern supermarkets. Capable of supporting 35 additional pushcarts with zero traffic friction.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-xs">
              <div className="flex items-center justify-between font-bold text-emerald-200 mb-1">
                <span>🟢 South Bopal Ring Road Extension</span>
                <span className="text-emerald-400">16 Thelas (Capacity: 50+)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                High-density high-rise townships with high willingness to pay for fresh produce. Excellent designated service lane infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ward Vending Intelligence Registry Table */}
      <div className="glass-panel p-5 rounded-3xl border border-white/10 shadow-2xl overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>📋</span>
            <span>Ahmedabad Ward Vending Registry</span>
          </h3>
          <span className="text-xs text-slate-400">Updated: Today, 5:00 AM IST</span>
        </div>

        <table className="w-full text-xs text-left">
          <thead className="text-slate-400 border-b border-white/10 font-bold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-2.5 px-3">Ward Name</th>
              <th className="py-2.5 px-3">Active Thelas</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Demand Index</th>
              <th className="py-2.5 px-3">Stability Index</th>
              <th className="py-2.5 px-3">Opportunity Index</th>
              <th className="py-2.5 px-3">AMC Recommendation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium text-slate-200">
            {stats.wardSummaries.map((w) => {
              let statusBadge = (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  BALANCED
                </span>
              );
              let recText = 'Maintain steady operations.';

              if (w.status === 'overcrowded') {
                statusBadge = (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    OVERCROWDED
                  </span>
                );
                recText = 'Implement decongestion shift.';
              } else if (w.status === 'underserved') {
                statusBadge = (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    UNDERSERVED
                  </span>
                );
                recText = 'Direct incoming vendors here.';
              } else if (w.status === 'potential') {
                statusBadge = (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    POTENTIAL ZONE
                  </span>
                );
                recText = 'Gazette new legal vending corridor.';
              }

              return (
                <tr key={w.wardId} className="hover:bg-slate-900/60 transition">
                  <td className="py-3 px-3 font-bold text-white">{w.wardName}</td>
                  <td className="py-3 px-3">{w.vendorCount} pushcarts</td>
                  <td className="py-3 px-3">{statusBadge}</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">{w.demandIndex}/100</td>
                  <td className="py-3 px-3 text-sky-400 font-bold">{w.stabilityIndex}/100</td>
                  <td className="py-3 px-3 text-mandi-400 font-bold">{w.opportunityIndex}/100</td>
                  <td className="py-3 px-3 text-slate-400 text-[11px]">{recText}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Zone Planner Modal */}
      <ZonePlannerModal
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        onZoneCreated={handleZoneCreated}
      />
    </div>
  );
};
