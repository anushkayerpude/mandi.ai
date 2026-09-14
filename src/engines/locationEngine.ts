import { calculateHaversineDistance, calculateThelaWalkingEta } from '../utils/geo';
import { WardLocation } from '../types';

export interface LocationEvaluation {
  distanceKm: number;
  walkingEtaMinutes: number;
  accessibilityScore: number; // 0-100 (high is easily reachable by pushcart)
  travelFrictionPenalty: number;
}

/**
 * Location Engine computes pushcart accessibility and transit friction
 * for a street vendor traveling with a loaded handcart.
 */
export function evaluateLocationAccessibility(
  location: WardLocation,
  vendorLat: number,
  vendorLng: number,
  maxDistanceKm: number
): LocationEvaluation {
  const distanceKm = calculateHaversineDistance(vendorLat, vendorLng, location.lat, location.lng);
  const walkingEtaMinutes = calculateThelaWalkingEta(distanceKm);

  // Distance decay function: pushing a thela > 4km causes severe physical fatigue
  // and risk of produce damage under the hot Ahmedabad sun
  let accessibilityScore = 100;
  if (distanceKm <= 1.0) {
    accessibilityScore = 96;
  } else if (distanceKm <= 2.5) {
    accessibilityScore = 88;
  } else if (distanceKm <= 4.0) {
    accessibilityScore = 76;
  } else if (distanceKm <= 6.0) {
    accessibilityScore = 62;
  } else {
    accessibilityScore = Math.max(30, 100 - distanceKm * 10);
  }

  // Penalty if exceeding preferred max radius
  const travelFrictionPenalty = distanceKm > maxDistanceKm ? (distanceKm - maxDistanceKm) * 15 : 0;

  return {
    distanceKm,
    walkingEtaMinutes,
    accessibilityScore: Math.round(Math.max(15, accessibilityScore - travelFrictionPenalty)),
    travelFrictionPenalty,
  };
}
