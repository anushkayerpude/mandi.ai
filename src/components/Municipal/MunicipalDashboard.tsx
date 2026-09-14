import React, { useState } from 'react';
import {
  Landmark,
  ShieldPlus,
  FileCheck,
} from 'lucide-react';
import { MunicipalStats, Language } from '../../types';
import { ZonePlannerModal } from './ZonePlannerModal';

interface MunicipalDashboardProps {
  lang: Language;
}

export const MunicipalDashboard: React.FC<MunicipalDashboardProps> = ({ lang }) => {
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [createdNotification, setCreatedNotification] = useState<string | null>(null);

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
      <div className="glass-panel p-6 rounded-3xl border border-khaki-300 shadow-sm flex flex-wrap items-center justify-between gap-4 bg-khaki-50 text-stone-900">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-800 mb-1">
            <Landmark className="w-4 h-4" />
            <span>Ahmedabad Municipal Corporation (AMC) • Urban Vending Intelligence</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            Evidence-Based Street Vending Planning & Decongestion
          </h2>
          <p className="text-xs text-stone-600 mt-1 max-w-2xl font-medium">
            Leveraging live geospatial proxies, footfall density, and vendor thela concentration to resolve urban spatial conflicts under the Street Vendors Act.
          </p>
        </div>

        <button
          onClick={() => setIsPlannerOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition transform active:scale-95"
        >
          <ShieldPlus className="w-4 h-4" />
          <span>Propose Vending Zone</span>
        </button>
      </div>

      {createdNotification && (
        <div className="p-3 rounded-2xl bg-mandi-100 border border-mandi-300 text-xs text-mandi-800 font-bold flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-mandi-600" />
          <span>{createdNotification}</span>
        </div>
      )}

      {/* 6 Key Indicators Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-khaki-50 p-3.5 rounded-2xl border border-khaki-300 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-stone-600">Total Vendors</span>
          <p className="text-xl font-black text-stone-900 mt-0.5">{stats.totalVendors.toLocaleString('en-IN')}</p>
          <span className="text-[10px] text-stone-500 font-semibold">AMC Ward Survey</span>
        </div>

        <div className="bg-khaki-50 p-3.5 rounded-2xl border border-khaki-300 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-stone-600">Mapped Thelas</span>
          <p className="text-xl font-black text-blue-800 mt-0.5">{stats.mappedThelas.toLocaleString('en-IN')}</p>
          <span className="text-[10px] text-mandi-700 font-bold">80.9% Digitalized</span>
        </div>

        <div className="bg-khaki-50 p-3.5 rounded-2xl border border-khaki-300 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-stone-600">High Demand Spots</span>
          <p className="text-xl font-black text-mandi-700 mt-0.5">{stats.highDemandAreas}</p>
          <span className="text-[10px] text-stone-500 font-semibold">Consumer Hotspots</span>
        </div>

        <div className="bg-khaki-50 p-3.5 rounded-2xl border border-khaki-300 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-stone-600">Overcrowded Spots</span>
          <p className="text-xl font-black text-chilli-600 mt-0.5">{stats.overcrowdedAreas}</p>
          <span className="text-[10px] text-chilli-600 font-bold">Traffic Friction</span>
        </div>

        <div className="bg-khaki-50 p-3.5 rounded-2xl border border-khaki-300 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-stone-600">Underserved Areas</span>
          <p className="text-xl font-black text-amber-700 mt-0.5">{stats.underservedAreas}</p>
          <span className="text-[10px] text-amber-700 font-bold">Food Deserts</span>
        </div>

        <div className="bg-khaki-50 p-3.5 rounded-2xl border border-khaki-300 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-stone-600">Potential Zones</span>
          <p className="text-xl font-black text-indigo-700 mt-0.5">{stats.potentialVendingZones}</p>
          <span className="text-[10px] text-indigo-700 font-bold">Ready for Gazette</span>
        </div>
      </div>

      {/* Spatial Conflict & Decongestion Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Overcrowded Bottlenecks */}
        <div className="bg-khaki-50 p-5 rounded-3xl border border-rose-300 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-rose-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-chilli-500" />
              <h3 className="text-sm font-extrabold text-stone-900">Critical Overcrowded Corridors</h3>
            </div>
            <span className="text-[11px] font-bold text-chilli-600">Encroachment Risk</span>
          </div>

          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs">
              <div className="flex items-center justify-between font-bold text-stone-900 mb-1">
                <span>🔴 Jamalpur Sardar Bridge Corridor</span>
                <span className="text-chilli-600 font-bold">62 Thelas (+24% over cap)</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
                Spillover from wholesale APMC obstructs morning city bus transit. Recommendation: Disperse 20 thelas to eastern Lambha and Isanpur markets.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs">
              <div className="flex items-center justify-between font-bold text-stone-900 mb-1">
                <span>🔴 Kalupur Railway Station Circle</span>
                <span className="text-chilli-600 font-bold">45 Thelas (No-Vending violation)</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
                Severe BRTS corridor blockage. Strict traffic enforcement zone active. Relocation recommended to Sarangpur designated market.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Underserved Food Deserts */}
        <div className="bg-khaki-50 p-5 rounded-3xl border border-mandi-300 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-mandi-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-mandi-600" />
              <h3 className="text-sm font-extrabold text-stone-900">Underserved Residential Food Deserts</h3>
            </div>
            <span className="text-[11px] font-bold text-mandi-700">Expansion Opportunity</span>
          </div>

          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-mandi-50 border border-mandi-200 text-xs">
              <div className="flex items-center justify-between font-bold text-stone-900 mb-1">
                <span>🟢 Lambha & GIDC Housing Belt</span>
                <span className="text-mandi-700 font-bold">Only 12 Thelas (High Demand)</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
                16,800 residents with zero organized modern supermarkets. Capable of supporting 35 additional pushcarts with zero traffic friction.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-mandi-50 border border-mandi-200 text-xs">
              <div className="flex items-center justify-between font-bold text-stone-900 mb-1">
                <span>🟢 South Bopal Ring Road Extension</span>
                <span className="text-mandi-700 font-bold">16 Thelas (Capacity: 50+)</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed font-medium">
                High-density high-rise townships with high willingness to pay for fresh produce. Excellent designated service lane infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ward Vending Intelligence Registry Table */}
      <div className="bg-khaki-50 p-5 rounded-3xl border border-khaki-300 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
            <span>📋</span>
            <span>Ahmedabad Ward Vending Registry</span>
          </h3>
          <span className="text-xs text-stone-500 font-semibold">Updated: Today, 5:00 AM IST</span>
        </div>

        <table className="w-full text-xs text-left">
          <thead className="text-stone-600 border-b border-khaki-300 font-bold uppercase tracking-wider text-[10px]">
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
          <tbody className="divide-y divide-khaki-200 font-semibold text-stone-800">
            {stats.wardSummaries.map((w) => {
              let statusBadge = (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-mandi-100 text-mandi-700 border border-mandi-300">
                  BALANCED
                </span>
              );
              let recText = 'Maintain steady operations.';

              if (w.status === 'overcrowded') {
                statusBadge = (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-chilli-600 border border-rose-300">
                    OVERCROWDED
                  </span>
                );
                recText = 'Implement decongestion shift.';
              } else if (w.status === 'underserved') {
                statusBadge = (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    UNDERSERVED
                  </span>
                );
                recText = 'Direct incoming vendors here.';
              } else if (w.status === 'potential') {
                statusBadge = (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
                    POTENTIAL ZONE
                  </span>
                );
                recText = 'Gazette new legal vending corridor.';
              }

              return (
                <tr key={w.wardId} className="hover:bg-khaki-100 transition">
                  <td className="py-3 px-3 font-bold text-stone-900">{w.wardName}</td>
                  <td className="py-3 px-3">{w.vendorCount} pushcarts</td>
                  <td className="py-3 px-3">{statusBadge}</td>
                  <td className="py-3 px-3 text-mandi-700 font-extrabold">{w.demandIndex}/100</td>
                  <td className="py-3 px-3 text-blue-800 font-extrabold">{w.stabilityIndex}/100</td>
                  <td className="py-3 px-3 text-stone-900 font-black">{w.opportunityIndex}/100</td>
                  <td className="py-3 px-3 text-stone-600 text-[11px] font-normal">{recText}</td>
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
