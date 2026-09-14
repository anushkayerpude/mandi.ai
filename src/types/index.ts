export type ProductCategory = 'vegetables' | 'fruits' | 'leafy' | 'mixed';
export type Language = 'en' | 'gu' | 'hi';
export type AppMode = 'vendor' | 'municipal';

export interface WardLocation {
  id: string;
  name: string;
  nameGu: string;
  nameHi: string;
  zone: 'South' | 'South-West' | 'West' | 'North' | 'East' | 'Central';
  lat: number;
  lng: number;
  populationDensity: number; // people per sq km
  residentialDensity: number; // 0-100 index
  poiCount: {
    schools: number;
    markets: number;
    brtsStops: number;
    metroStops: number;
    hospitals: number;
    temples: number;
  };
  footfallIndex: number; // 0-100
  baseDemand: number; // 0-100
  bestSellingWindow: string; // e.g. "5:00 PM – 8:00 PM"
  description: string;
  landmarks: string[];
  bounds: [number, number][]; // Polygon coordinates
}

export interface VendorQuery {
  budget: number; // in INR (e.g. 2000)
  category: ProductCategory;
  maxDistanceKm: number; // (e.g. 5)
  durationHours: number; // (e.g. 4)
  currentLat: number;
  currentLng: number;
  timeSlot?: string;
}

export interface StabilityAudit {
  overallScore: number; // 0-100
  level: 'HIGH' | 'MEDIUM' | 'LOW';
  vendingZoneStatus: 'DESIGNATED_VENDING' | 'TIME_RESTRICTED' | 'NO_VENDING' | 'UNREGULATED';
  roadObstructionRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  privatePropertyRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  competitionConflictRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  knownRestrictions: string;
  municipalCompliancePercent: number;
  legalDisclaimer: string;
}

export interface RecommendedProduct {
  id: string;
  name: string;
  nameGu: string;
  nameHi: string;
  icon: string;
  category: ProductCategory;
  allocatedAmount: number; // ₹ allocated from budget
  estimatedKg: number;
  wholesalePricePerKg: number;
  retailPricePerKg: number;
  expectedProfit: number;
  demandLevel: 'HIGH' | 'VERY_HIGH' | 'MEDIUM';
  shelfLifeDays: number;
}

export interface HourlyDemand {
  hour: string;
  score: number;
  isPeak?: boolean;
}

export interface LocationRecommendation {
  location: WardLocation;
  opportunityScore: number; // 0-100
  demandScore: number; // 0-100
  competitionLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  competitionVendorCount: number;
  stabilityScore: number; // 0-100
  stabilityLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  accessibilityScore: number; // 0-100
  distanceKm: number;
  walkingEtaMinutes: number;
  bestSellingWindow: string;
  bestCategory: string;
  stabilityAudit: StabilityAudit;
  inventoryRecommendation: RecommendedProduct[];
  hourlyCurve: HourlyDemand[];
  categoryDemands: {
    vegetables: number;
    fruits: number;
    leafy: number;
  };
}

export interface VendingZone {
  id: string;
  name: string;
  wardId: string;
  type: 'VENDING_ZONE' | 'RESTRICTED_AMBER' | 'NO_VENDING';
  capacityThelas: number;
  currentOccupancy: number;
  coordinates: [number, number][];
  rules: string;
}

export interface ActiveThela {
  id: string;
  vendorName: string;
  category: ProductCategory;
  lat: number;
  lng: number;
  wardId: string;
  activeSince: string;
  products: string[];
}

export interface DailySalesLog {
  id: string;
  timestamp: string;
  date: string;
  locationName: string;
  budgetSpent: number;
  actualRevenue: number;
  profit: number;
  customerCount: number;
  unsoldProduce: Array<{ item: string; kg: number }>;
  spotFeedback: 'peaceful' | 'crowded' | 'police_warning' | 'moved_spot';
  learningImpact: {
    accuracyBoostPercent: number;
    demandConfidenceDelta: number;
  };
}

export interface MunicipalStats {
  totalVendors: number;
  mappedThelas: number;
  highDemandAreas: number;
  overcrowdedAreas: number;
  underservedAreas: number;
  potentialVendingZones: number;
  wardSummaries: Array<{
    wardId: string;
    wardName: string;
    vendorCount: number;
    status: 'overcrowded' | 'underserved' | 'balanced' | 'potential';
    demandIndex: number;
    opportunityIndex: number;
    stabilityIndex: number;
  }>;
}
