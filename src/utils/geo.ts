/**
 * Geospatial utilities for Ahmedabad street vendor navigation & proximity calculations.
 */

// Calculate great-circle distance between two points on the Earth's surface (Haversine formula)
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10; // 1 decimal place
}

// Average speed of a street vendor pushing a heavy handcart (thela) is ~3.5 km/h
export function calculateThelaWalkingEta(distanceKm: number): number {
  const walkingSpeedKmH = 3.5;
  const hours = distanceKm / walkingSpeedKmH;
  return Math.max(5, Math.round(hours * 60)); // minimum 5 mins
}

// Generate intermediate route waypoints between vendor start and target location
export function generateThelaRoute(
  startLat: number,
  startLng: number,
  destLat: number,
  destLng: number
): [number, number][] {
  const points: [number, number][] = [];
  const steps = 6;
  for (let i = 0; i <= steps; i++) {
    const fraction = i / steps;
    // Add subtle organic road jitter mimicking Ahmedabad city street grid
    const jitterLat = i > 0 && i < steps ? (Math.sin(i * 1.5) * 0.0018) : 0;
    const jitterLng = i > 0 && i < steps ? (Math.cos(i * 1.5) * 0.0015) : 0;
    const lat = startLat + (destLat - startLat) * fraction + jitterLat;
    const lng = startLng + (destLng - startLng) * fraction + jitterLng;
    points.push([lat, lng]);
  }
  return points;
}
