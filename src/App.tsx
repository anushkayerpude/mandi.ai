import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { AhmedabadMap } from './components/Map/AhmedabadMap';
import { VendorInputCard } from './components/Vendor/VendorInputCard';
import { RecommendationHero } from './components/Vendor/RecommendationHero';
import { TopLocationsList } from './components/Vendor/TopLocationsList';
import { InventoryRecommender } from './components/Vendor/InventoryRecommender';
import { TimeCurveChart } from './components/Vendor/TimeCurveChart';
import { StabilityDeepDiveModal } from './components/Vendor/StabilityDeepDiveModal';
import { LearningLoopModal } from './components/Vendor/LearningLoopModal';
import { MunicipalDashboard } from './components/Municipal/MunicipalDashboard';
import { AppMode, Language, VendorQuery, LocationRecommendation, DailySalesLog, WardLocation } from './types';
import { rankVendingLocations } from './engines/opportunityEngine';
import { AHMEDABAD_WARDS } from './data/ahmedabadWards';
import { Sparkles, RotateCw, ShieldCheck, Heart } from 'lucide-react';
import { getTranslation } from './utils/i18n';

export const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('vendor');
  const [lang, setLang] = useState<Language>('en');

  // Vendor Query State (Vendor depot initialized near South Ahmedabad / Maninagar)
  const [query, setQuery] = useState<VendorQuery>({
    budget: 2000,
    category: 'vegetables',
    maxDistanceKm: 5,
    durationHours: 4,
    currentLat: 22.9860,
    currentLng: 72.5960,
  });

  // Calculate ranked recommendations dynamically
  const recommendations = useMemo(() => {
    return rankVendingLocations(query, AHMEDABAD_WARDS);
  }, [query]);

  // Currently selected location (defaults to top #1 recommendation e.g. Isanpur)
  const [selectedWardId, setSelectedWardId] = useState<string>(recommendations[0]?.location.id || 'isanpur');

  const selectedRecommendation = useMemo(() => {
    return (
      recommendations.find((r) => r.location.id === selectedWardId) ||
      recommendations[0]
    );
  }, [recommendations, selectedWardId]);

  // Navigation & Modal States
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [isStabilityModalOpen, setIsStabilityModalOpen] = useState<boolean>(false);
  const [isLearningModalOpen, setIsLearningModalOpen] = useState<boolean>(false);
  const [salesLogs, setSalesLogs] = useState<DailySalesLog[]>([]);

  const t = getTranslation(lang);

  const handleSelectWard = (ward: WardLocation) => {
    setSelectedWardId(ward.id);
  };

  const handleLogSubmitted = (log: DailySalesLog) => {
    setSalesLogs((prev) => [log, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col font-sans">
      {/* Top Sticky Navigation Bar */}
      <Navbar
        mode={mode}
        onModeChange={setMode}
        lang={lang}
        onLangChange={setLang}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {mode === 'vendor' ? (
          /* ================= VENDOR EXPERIENCE ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Vendor Query & AI Intelligence Outputs */}
            <div className="lg:col-span-6 space-y-6">
              {/* 1. Vendor Input: Budget, Commodity, Distance */}
              <VendorInputCard
                query={query}
                onChange={setQuery}
                onSearch={() => {
                  if (recommendations[0]) {
                    setSelectedWardId(recommendations[0].location.id);
                  }
                }}
                lang={lang}
              />

              {/* 2. Showcase Today's Recommendation Banner */}
              {selectedRecommendation && (
                <RecommendationHero
                  recommendation={selectedRecommendation}
                  onViewRoute={() => setIsNavigating(true)}
                  onOpenStabilityAudit={() => setIsStabilityModalOpen(true)}
                  lang={lang}
                />
              )}

              {/* 3. "What Should I Sell?" Knapsack Inventory Allocation */}
              {selectedRecommendation && (
                <InventoryRecommender
                  products={selectedRecommendation.inventoryRecommendation}
                  budget={query.budget}
                  lang={lang}
                />
              )}

              {/* 4. Best Selling Time Prediction (Diurnal Curve) */}
              {selectedRecommendation && (
                <TimeCurveChart
                  hourlyCurve={selectedRecommendation.hourlyCurve}
                  bestWindow={selectedRecommendation.bestSellingWindow}
                  lang={lang}
                />
              )}

              {/* 5. Top 5 Ranked Locations List */}
              <TopLocationsList
                recommendations={recommendations}
                selectedLocation={selectedRecommendation}
                onSelect={(rec) => setSelectedWardId(rec.location.id)}
                lang={lang}
              />

              {/* 6. Vendor Learning Loop Action Banner */}
              <div className="glass-panel p-4 rounded-3xl border border-mandi-500/20 shadow-xl flex items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-mandi-950/40 to-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-mandi-500/20 text-mandi-400 border border-mandi-500/40 flex items-center justify-center">
                    <RotateCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      Finished Selling for the Day?
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Log your revenue to boost tomorrow’s AI demand accuracy.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsLearningModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-white/10 shrink-0 transition"
                >
                  Log Result
                </button>
              </div>
            </div>

            {/* Right Column: Sticky Interactive Ahmedabad Map */}
            <div className="lg:col-span-6 lg:sticky lg:top-24 h-[560px] sm:h-[640px] lg:h-[calc(100vh-7rem)]">
              <AhmedabadMap
                selectedLocation={selectedRecommendation}
                recommendations={recommendations}
                onSelectWard={handleSelectWard}
                vendorStartLat={query.currentLat}
                vendorStartLng={query.currentLng}
                isNavigating={isNavigating}
                onStopNavigation={() => setIsNavigating(false)}
              />
            </div>
          </div>
        ) : (
          /* ================= MUNICIPAL / AMC EXPERIENCE ================= */
          <div className="space-y-6">
            <MunicipalDashboard lang={lang} />

            {/* Accompanying Map in Municipal View */}
            <div className="h-[480px] w-full">
              <AhmedabadMap
                selectedLocation={selectedRecommendation}
                recommendations={recommendations}
                onSelectWard={handleSelectWard}
                vendorStartLat={query.currentLat}
                vendorStartLng={query.currentLng}
                isNavigating={false}
                onStopNavigation={() => {}}
              />
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedRecommendation && (
        <StabilityDeepDiveModal
          audit={selectedRecommendation.stabilityAudit}
          locationName={selectedRecommendation.location.name}
          isOpen={isStabilityModalOpen}
          onClose={() => setIsStabilityModalOpen(false)}
          lang={lang}
        />
      )}

      {selectedRecommendation && (
        <LearningLoopModal
          isOpen={isLearningModalOpen}
          onClose={() => setIsLearningModalOpen(false)}
          locationName={selectedRecommendation.location.name}
          budgetSpent={query.budget}
          onLogSubmitted={handleLogSubmitted}
          lang={lang}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 glass-panel mt-12 py-5 px-4 sm:px-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-semibold text-slate-300">
            <span>🥬 Mandi.ai</span>
            <span>•</span>
            <span>Empowering Ahmedabad’s Street Vendors with Geospatial AI</span>
          </div>

          <p className="text-[11px] text-slate-500">
            Compliant with Ahmedabad Municipal Corporation (AMC) Vending Regulations & National Urban Livelihoods Mission (NULM).
          </p>
        </div>
      </footer>
    </div>
  );
};
export default App;
