import { calculateHaversineDistance } from '../utils/geo';
import { ActiveThela, WardLocation, ProductCategory } from '../types';
import { SAMPLE_ACTIVE_THELAS } from '../data/sampleVendors';

export interface CompetitionAnalysis {
  nearbyVendorsCount: number;
  vegetableVendorsCount: number;
  fruitVendorsCount: number;
  leafyVendorsCount: number;
  competitionScore: number; // 0-100 (0 = zero competition, 100 = intensely overcrowded)
  competitionLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  crowdingStatus: 'Optimal' | 'Balanced' | 'Overcrowded';
}

/**
 * Competition Engine checks for active vendor thelas within 800m
 * and calculates direct commodity overlap risk.
 */
export function analyzeCompetition(
  location: WardLocation,
  vendorCategory: ProductCategory,
  customThelas: ActiveThela[] = SAMPLE_ACTIVE_THELAS
): CompetitionAnalysis {
  const radiusKm = 1.0; // 1 km catchment area
  const nearby = customThelas.filter((thela) => {
    const dist = calculateHaversineDistance(location.lat, location.lng, thela.lat, thela.lng);
    return dist <= radiusKm;
  });

  const vegCount = nearby.filter((t) => t.category === 'vegetables' || t.category === 'mixed').length;
  const fruitCount = nearby.filter((t) => t.category === 'fruits' || t.category === 'mixed').length;
  const leafyCount = nearby.filter((t) => t.category === 'leafy').length;

  // Direct category overlap has 1.5x penalty compared to complementary commodities
  let overlapWeight = 0;
  if (vendorCategory === 'vegetables') {
    overlapWeight = vegCount * 12 + fruitCount * 4 + leafyCount * 5;
  } else if (vendorCategory === 'fruits') {
    overlapWeight = fruitCount * 14 + vegCount * 3 + leafyCount * 3;
  } else if (vendorCategory === 'leafy') {
    overlapWeight = leafyCount * 15 + vegCount * 5 + fruitCount * 2;
  } else {
    overlapWeight = (vegCount + fruitCount + leafyCount) * 7;
  }

  // Normalize score between 10 and 95
  const competitionScore = Math.min(95, Math.max(12, Math.round(overlapWeight + nearby.length * 2.5)));

  let competitionLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  let crowdingStatus: 'Optimal' | 'Balanced' | 'Overcrowded' = 'Optimal';

  if (competitionScore > 65 || nearby.length >= 7) {
    competitionLevel = 'HIGH';
    crowdingStatus = 'Overcrowded';
  } else if (competitionScore >= 35 || nearby.length >= 4) {
    competitionLevel = 'MEDIUM';
    crowdingStatus = 'Balanced';
  } else {
    competitionLevel = 'LOW';
    crowdingStatus = 'Optimal';
  }

  return {
    nearbyVendorsCount: nearby.length,
    vegetableVendorsCount: vegCount,
    fruitVendorsCount: fruitCount,
    leafyVendorsCount: leafyCount,
    competitionScore,
    competitionLevel,
    crowdingStatus,
  };
}
