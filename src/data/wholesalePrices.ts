import { ProductCategory } from '../types';

export interface ProduceItem {
  id: string;
  name: string;
  nameGu: string;
  nameHi: string;
  icon: string;
  category: ProductCategory;
  wholesaleRatePerKg: number; // ₹ at Jamalpur APMC
  retailRatePerKg: number;    // ₹ street vendor thela price
  shelfLifeDays: number;
  demandFactor: number;       // Base turnover multiplier
  recommendedShare: number;   // Suggested percentage of budget allocation
  priority: 'staple' | 'high_margin' | 'perishable_quick';
}

export const APMC_WHOLESALE_PRODUCE: ProduceItem[] = [
  {
    id: 'tomato',
    name: 'Tomato',
    nameGu: 'ટામેટા',
    nameHi: 'टमाटर',
    icon: '🍅',
    category: 'vegetables',
    wholesaleRatePerKg: 18,
    retailRatePerKg: 35,
    shelfLifeDays: 3,
    demandFactor: 1.35,
    recommendedShare: 0.20, // 20% of budget (~₹400 for ₹2000 budget)
    priority: 'staple',
  },
  {
    id: 'potato',
    name: 'Potato (Batata)',
    nameGu: 'બટાકા',
    nameHi: 'आलू',
    icon: '🥔',
    category: 'vegetables',
    wholesaleRatePerKg: 16,
    retailRatePerKg: 28,
    shelfLifeDays: 14,
    demandFactor: 1.4,
    recommendedShare: 0.175, // 17.5% (~₹350)
    priority: 'staple',
  },
  {
    id: 'onion',
    name: 'Onion (Dungri)',
    nameGu: 'ડુંગળી',
    nameHi: 'प्याज',
    icon: '🧅',
    category: 'vegetables',
    wholesaleRatePerKg: 22,
    retailRatePerKg: 38,
    shelfLifeDays: 10,
    demandFactor: 1.3,
    recommendedShare: 0.15, // 15% (~₹300)
    priority: 'staple',
  },
  {
    id: 'banana',
    name: 'Banana (Kela)',
    nameGu: 'કેળા',
    nameHi: 'केला',
    icon: '🍌',
    category: 'fruits',
    wholesaleRatePerKg: 25, // per dozen
    retailRatePerKg: 45,
    shelfLifeDays: 2,
    demandFactor: 1.25,
    recommendedShare: 0.15, // 15% (~₹300)
    priority: 'high_margin',
  },
  {
    id: 'coriander',
    name: 'Coriander (Kothmir)',
    nameGu: 'કોથમીર',
    nameHi: 'धनिया',
    icon: '🌿',
    category: 'leafy',
    wholesaleRatePerKg: 30,
    retailRatePerKg: 70,
    shelfLifeDays: 2,
    demandFactor: 1.5,
    recommendedShare: 0.075, // 7.5% (~₹150)
    priority: 'perishable_quick',
  },
  {
    id: 'green_chili',
    name: 'Green Chili (Marcha)',
    nameGu: 'લીલા મરચાં',
    nameHi: 'हरी मिर्च',
    icon: '🌶️',
    category: 'vegetables',
    wholesaleRatePerKg: 40,
    retailRatePerKg: 80,
    shelfLifeDays: 5,
    demandFactor: 1.2,
    recommendedShare: 0.05, // 5% (~₹100)
    priority: 'high_margin',
  },
  {
    id: 'bhindi',
    name: 'Okra / Bhindi',
    nameGu: 'ભીંડા',
    nameHi: 'भिंडी',
    icon: '🥬',
    category: 'vegetables',
    wholesaleRatePerKg: 28,
    retailRatePerKg: 55,
    shelfLifeDays: 3,
    demandFactor: 1.15,
    recommendedShare: 0.10, // 10% (~₹200)
    priority: 'staple',
  },
  {
    id: 'spinach',
    name: 'Spinach (Palak)',
    nameGu: 'પાલક',
    nameHi: 'पालक',
    icon: '🥗',
    category: 'leafy',
    wholesaleRatePerKg: 20,
    retailRatePerKg: 45,
    shelfLifeDays: 1.5,
    demandFactor: 1.1,
    recommendedShare: 0.05, // 5% (~₹100)
    priority: 'perishable_quick',
  },
  {
    id: 'apple',
    name: 'Apple (Safarchan)',
    nameGu: 'સફરજન',
    nameHi: 'सेब',
    icon: '🍎',
    category: 'fruits',
    wholesaleRatePerKg: 90,
    retailRatePerKg: 140,
    shelfLifeDays: 7,
    demandFactor: 1.05,
    recommendedShare: 0.15,
    priority: 'high_margin',
  },
  {
    id: 'papaya',
    name: 'Papaya (Papaiyu)',
    nameGu: 'પપૈયું',
    nameHi: 'पपीता',
    icon: '🍈',
    category: 'fruits',
    wholesaleRatePerKg: 20,
    retailRatePerKg: 45,
    shelfLifeDays: 3,
    demandFactor: 1.1,
    recommendedShare: 0.10,
    priority: 'high_margin',
  },
];
