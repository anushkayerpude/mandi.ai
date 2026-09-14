import { WardLocation, HourlyDemand, ProductCategory } from '../types';

export interface DemandPredictionResult {
  overallDemandScore: number;
  categoryDemands: {
    vegetables: number;
    fruits: number;
    leafy: number;
  };
  hourlyCurve: HourlyDemand[];
  peakSellingWindow: string;
}

/**
 * Demand Engine calculates hyperlocal consumer demand for fresh produce
 * based on population density, residential profile, POIs, day-of-week, and diurnality.
 */
export function calculateHyperlocalDemand(
  location: WardLocation,
  category: ProductCategory,
  currentHour: number = 17 // Default to 5 PM
): DemandPredictionResult {
  // 1. Demographic & Spatial Base
  const popNorm = Math.min(100, (location.populationDensity / 35000) * 100);
  const resWeight = location.residentialDensity * 0.35;
  const popWeight = popNorm * 0.25;

  // 2. POI Footfall Multipliers
  // Schools & transit boost morning/evening, markets boost ambient footfall
  const poiScore = Math.min(
    100,
    location.poiCount.schools * 2.5 +
      location.poiCount.brtsStops * 4.0 +
      location.poiCount.metroStops * 6.0 +
      location.poiCount.markets * 3.0 +
      location.poiCount.temples * 2.0
  );
  const poiWeight = poiScore * 0.25;
  const footfallWeight = location.footfallIndex * 0.15;

  const rawSpatialDemand = resWeight + popWeight + poiWeight + footfallWeight;

  // 3. Category Modifiers
  let catMod = 1.0;
  if (category === 'vegetables') {
    // Vegetables are highest in dense residential suburbs (Isanpur, Lambha, Ramol)
    catMod = location.residentialDensity > 88 ? 1.08 : 0.98;
  } else if (category === 'fruits') {
    // Fruits are highest near transit hubs, hospitals, and temples (Maninagar, Kalupur, Vastrapur)
    const fruitPois = location.poiCount.temples + location.poiCount.hospitals + location.poiCount.metroStops;
    catMod = fruitPois > 12 ? 1.12 : 0.95;
  } else if (category === 'leafy') {
    // Leafy vegetables sell well in early morning and late afternoon residential pockets
    catMod = location.residentialDensity > 85 ? 1.05 : 0.92;
  }

  const overallDemandScore = Math.min(99, Math.max(40, Math.round(rawSpatialDemand * catMod)));

  // 4. Diurnal 24-hour demand curve for Ahmedabad
  // Typical Ahmedabad grocery shopping peaks: 7-10 AM (morning cooking) and 4:30-8 PM (evening homecoming)
  const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;
  const eveningBoost = isWeekend ? 1.1 : 1.0;

  const hourlyCurve: HourlyDemand[] = [
    {
      hour: '7:00 AM – 10:00 AM',
      score: Math.round(overallDemandScore * 0.78),
      isPeak: false,
    },
    {
      hour: '10:00 AM – 1:00 PM',
      score: Math.round(overallDemandScore * 0.58),
      isPeak: false,
    },
    {
      hour: '1:00 PM – 4:00 PM',
      score: Math.round(overallDemandScore * 0.44),
      isPeak: false,
    },
    {
      hour: '4:30 PM – 7:30 PM',
      score: Math.min(98, Math.round(overallDemandScore * 1.05 * eveningBoost)),
      isPeak: true, // Ahmedabad evening market peak
    },
    {
      hour: '7:30 PM – 9:30 PM',
      score: Math.round(overallDemandScore * 0.86),
      isPeak: false,
    },
  ];

  // Specific category splits
  const vegScore = Math.min(98, Math.round(overallDemandScore * (location.residentialDensity > 90 ? 1.04 : 0.96)));
  const fruitScore = Math.min(96, Math.round(overallDemandScore * (location.poiCount.temples > 8 ? 1.08 : 0.88)));
  const leafyScore = Math.min(95, Math.round(overallDemandScore * (location.residentialDensity > 88 ? 0.98 : 0.85)));

  return {
    overallDemandScore,
    categoryDemands: {
      vegetables: vegScore,
      fruits: fruitScore,
      leafy: leafyScore,
    },
    hourlyCurve,
    peakSellingWindow: '4:30 PM – 7:30 PM',
  };
}
