import { WardLocation, StabilityAudit } from '../types';
import { AMC_VENDING_ZONES } from '../data/vendingZones';

/**
 * Stability Engine evaluates regulatory and physical suitability of a location.
 * Assesses municipal zoning, road obstruction, private encroachment, and historical disturbance risk.
 */
export function auditLocationStability(
  location: WardLocation,
  nearbyVendorCount: number
): StabilityAudit {
  // 1. Check AMC Vending Zone designation
  const matchingZone = AMC_VENDING_ZONES.find((z) => z.wardId === location.id);

  let vendingZoneStatus: 'DESIGNATED_VENDING' | 'TIME_RESTRICTED' | 'NO_VENDING' | 'UNREGULATED' = 'UNREGULATED';
  let zoningScore = 65; // baseline unregulated
  let knownRestrictions = 'Standard municipal pushcart bye-laws apply. Maintain clean spot.';

  if (matchingZone) {
    if (matchingZone.type === 'VENDING_ZONE') {
      vendingZoneStatus = 'DESIGNATED_VENDING';
      zoningScore = 95;
      knownRestrictions = `Official AMC Vending Zone (${matchingZone.name}). Permitted trading.`;
    } else if (matchingZone.type === 'RESTRICTED_AMBER') {
      vendingZoneStatus = 'TIME_RESTRICTED';
      zoningScore = 70;
      knownRestrictions = matchingZone.rules;
    } else if (matchingZone.type === 'NO_VENDING') {
      vendingZoneStatus = 'NO_VENDING';
      zoningScore = 15;
      knownRestrictions = `HIGH RISK: Strict No-Vending Corridor (${matchingZone.name}). Daily clearing drives.`;
    }
  } else {
    // Infer based on ward characteristics
    if (location.id === 'isanpur' || location.id === 'lambha' || location.id === 'bopal') {
      vendingZoneStatus = 'DESIGNATED_VENDING';
      zoningScore = 88;
      knownRestrictions = 'Wide pedestrian corridor with designated weekly market allowances.';
    } else if (location.id === 'kalupur' || location.id === 'jamalpur') {
      vendingZoneStatus = 'TIME_RESTRICTED';
      zoningScore = 48;
      knownRestrictions = 'Heavy traffic arterial. High probability of municipal enforcement between 11 AM - 4 PM.';
    }
  }

  // 2. Road Obstruction Risk (based on transit stops and road density)
  let roadObstructionRisk: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  let roadObstructionScore = 90;
  if (location.poiCount.brtsStops >= 5 || location.id === 'kalupur') {
    roadObstructionRisk = 'HIGH';
    roadObstructionScore = 35;
  } else if (location.poiCount.brtsStops >= 3) {
    roadObstructionRisk = 'MEDIUM';
    roadObstructionScore = 65;
  }

  // 3. Private Property / Encroachment Risk
  let privatePropertyRisk: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  let privatePropertyScore = 88;
  if (location.id === 'vastrapur' || location.id === 'satellite') {
    // Upscale retail malls and corporate complexes have security guards who discourage thelas
    privatePropertyRisk = 'MEDIUM';
    privatePropertyScore = 62;
  }

  // 4. Vendor Overcrowding Conflict Risk
  let competitionConflictRisk: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  let conflictScore = 90;
  if (nearbyVendorCount >= 8) {
    competitionConflictRisk = 'HIGH';
    conflictScore = 30;
  } else if (nearbyVendorCount >= 4) {
    competitionConflictRisk = 'MEDIUM';
    conflictScore = 65;
  }

  // Weighted composite stability score
  const rawStability =
    zoningScore * 0.40 +
    roadObstructionScore * 0.25 +
    privatePropertyScore * 0.20 +
    conflictScore * 0.15;

  const overallScore = Math.min(96, Math.max(18, Math.round(rawStability)));

  let level: 'HIGH' | 'MEDIUM' | 'LOW' = 'HIGH';
  if (overallScore < 50 || vendingZoneStatus === 'NO_VENDING') {
    level = 'LOW';
  } else if (overallScore < 75) {
    level = 'MEDIUM';
  }

  const legalDisclaimer =
    'Important Legal Notice: This is an AI/geospatial risk estimate based on municipal data and spatial proxies. It does not constitute a municipal vending license or legal guarantee of protection from eviction, enforcement, or private disputes.';

  return {
    overallScore,
    level,
    vendingZoneStatus,
    roadObstructionRisk,
    privatePropertyRisk,
    competitionConflictRisk,
    knownRestrictions,
    municipalCompliancePercent: Math.min(100, Math.round(zoningScore * 0.9 + roadObstructionScore * 0.1)),
    legalDisclaimer,
  };
}
