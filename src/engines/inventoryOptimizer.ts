import { RecommendedProduct, ProductCategory, WardLocation } from '../types';
import { APMC_WHOLESALE_PRODUCE, ProduceItem } from '../data/wholesalePrices';

/**
 * Inventory Optimizer uses dynamic knapsack budget allocation:
 * Divides the vendor's working capital across staple vs high-margin produce,
 * factoring in locality profile, perishability, wholesale mandi rates, and expected retail profit.
 */
export function optimizeInventory(
  budget: number,
  category: ProductCategory,
  targetLocation: WardLocation
): RecommendedProduct[] {
  // Filter relevant produce items
  let pool: ProduceItem[] = [];
  if (category === 'mixed') {
    pool = [...APMC_WHOLESALE_PRODUCE];
  } else {
    pool = APMC_WHOLESALE_PRODUCE.filter(
      (item) => item.category === category || (category === 'vegetables' && item.category === 'leafy')
    );
  }

  // Adjust recommended shares based on locality characteristics
  // E.g., Vastrapur/Satellite buy more fruits & leafy, Isanpur/Lambha buy more staple potatoes/onions/tomatoes
  const isAffluent = targetLocation.id === 'vastrapur' || targetLocation.id === 'satellite' || targetLocation.id === 'bopal';
  const isStapleZone = targetLocation.id === 'isanpur' || targetLocation.id === 'lambha' || targetLocation.id === 'ramol';

  let remainingBudget = budget;
  const recommendations: RecommendedProduct[] = [];

  // Sort pool: staples first for baseline sales stability, then high margin
  const sortedPool = [...pool].sort((a, b) => {
    if (a.priority === 'staple' && b.priority !== 'staple') return -1;
    if (b.priority === 'staple' && a.priority !== 'staple') return 1;
    return b.demandFactor - a.demandFactor;
  });

  // Target up to 5-6 top items so the pushcart remains manageable for the vendor
  const selectedItems = sortedPool.slice(0, 5);
  const totalBaseShare = selectedItems.reduce((sum, item) => sum + item.recommendedShare, 0);

  selectedItems.forEach((item, index) => {
    let rawShare = item.recommendedShare / totalBaseShare;
    if (isAffluent && (item.category === 'fruits' || item.category === 'leafy')) {
      rawShare *= 1.25;
    }
    if (isStapleZone && item.priority === 'staple') {
      rawShare *= 1.15;
    }

    // Allocate round amounts (multiples of ₹50)
    let allocated = Math.round((budget * rawShare) / 50) * 50;
    if (index === selectedItems.length - 1) {
      allocated = remainingBudget; // Close out remainder
    } else {
      allocated = Math.min(remainingBudget - (selectedItems.length - 1 - index) * 50, allocated);
    }
    allocated = Math.max(50, allocated);
    remainingBudget -= allocated;

    const estimatedKg = Math.round((allocated / item.wholesaleRatePerKg) * 10) / 10;
    const potentialGrossRevenue = estimatedKg * item.retailRatePerKg;
    const expectedProfit = Math.round(potentialGrossRevenue - allocated);

    recommendations.push({
      id: item.id,
      name: item.name,
      nameGu: item.nameGu,
      nameHi: item.nameHi,
      icon: item.icon,
      category: item.category,
      allocatedAmount: allocated,
      estimatedKg,
      wholesalePricePerKg: item.wholesaleRatePerKg,
      retailPricePerKg: item.retailRatePerKg,
      expectedProfit,
      demandLevel: item.demandFactor > 1.3 ? 'VERY_HIGH' : item.demandFactor > 1.15 ? 'HIGH' : 'MEDIUM',
      shelfLifeDays: item.shelfLifeDays,
    });
  });

  return recommendations;
}
