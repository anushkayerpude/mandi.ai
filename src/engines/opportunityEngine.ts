import { WardLocation, VendorQuery, LocationRecommendation } from '../types';
import { AHMEDABAD_WARDS } from '../data/ahmedabadWards';
import { calculateHyperlocalDemand } from './demandEngine';
import { evaluateLocationAccessibility } from './locationEngine';
import { analyzeCompetition } from './competitionEngine';
import { auditLocationStability } from './stabilityEngine';
import { optimizeInventory } from './inventoryOptimizer';

/**
 * Opportunity Engine combines Demand, Proximity, Competition, and Stability
 * into an explainable 0–100 composite ranking score.
 */
export function rankVendingLocations(
  query: VendorQuery,
  wards: WardLocation[] = AHMEDABAD_WARDS
): LocationRecommendation[] {
  const recommendations: LocationRecommendation[] = wards.map((ward) => {
    // 1. Demand Engine
    const demandRes = calculateHyperlocalDemand(ward, query.category);

    // 2. Location & Accessibility Engine
    const locationEval = evaluateLocationAccessibility(
      ward,
      query.currentLat,
      query.currentLng,
      query.maxDistanceKm
    );

    // 3. Competition Engine
    const compRes = analyzeCompetition(ward, query.category);

    // 4. Stability Engine
    const stabilityAudit = auditLocationStability(ward, compRes.nearbyVendorsCount);

    // 5. Composite Opportunity Score formulation:
    // Base utility: 40% Demand + 25% Accessibility + 35% Stability = 100%
    const baseUtility =
      demandRes.overallDemandScore * 0.40 +
      locationEval.accessibilityScore * 0.25 +
      stabilityAudit.overallScore * 0.35;

    // Penalty for competition saturation and exceeding maximum walking radius
    const competitionPenalty = (compRes.competitionScore / 100) * 14;
    const distancePenalty = locationEval.travelFrictionPenalty * 0.1;

    const rawOpportunity = baseUtility - competitionPenalty - distancePenalty;

    const opportunityScore = Math.min(96, Math.max(25, Math.round(rawOpportunity)));

    // 6. Inventory Knapsack Optimization for this ward
    const inventory = optimizeInventory(query.budget, query.category, ward);

    return {
      location: ward,
      opportunityScore,
      demandScore: demandRes.overallDemandScore,
      competitionLevel: compRes.competitionLevel,
      competitionVendorCount: compRes.nearbyVendorsCount,
      stabilityScore: stabilityAudit.overallScore,
      stabilityLevel: stabilityAudit.level,
      accessibilityScore: locationEval.accessibilityScore,
      distanceKm: locationEval.distanceKm,
      walkingEtaMinutes: locationEval.walkingEtaMinutes,
      bestSellingWindow: ward.bestSellingWindow,
      bestCategory: query.category === 'mixed' ? 'Vegetables + Seasonal Fruits' : query.category,
      stabilityAudit,
      inventoryRecommendation: inventory,
      hourlyCurve: demandRes.hourlyCurve,
      categoryDemands: demandRes.categoryDemands,
    };
  });

  // Sort by highest opportunity score first
  recommendations.sort((a, b) => b.opportunityScore - a.opportunityScore);

  return recommendations;
}
