
import { type AnalyticsData, type RevenuePlatformConfig } from './types';

export const MOCK_ANALYTICS_DATA: AnalyticsData[] = [
  { name: 'Jan', followers: 4000, engagement: 2.4, views: 240000 },
  { name: 'Feb', followers: 4300, engagement: 2.6, views: 280000 },
  { name: 'Mar', followers: 5000, engagement: 3.1, views: 350000 },
  { name: 'Apr', followers: 4800, engagement: 2.9, views: 320000 },
  { name: 'May', followers: 5500, engagement: 3.4, views: 410000 },
  { name: 'Jun', followers: 6100, engagement: 3.8, views: 490000 },
];

export const PLATFORM_CONFIG: Record<string, RevenuePlatformConfig> = {
  YouTube: {
    cpmRange: [3, 10], // Cost Per Mille (1000 views)
    name: "YouTube",
  },
  TikTok: {
    cpmRange: [0.02, 0.04], // Creator Fund is lower
    name: "TikTok",
  },
  Facebook: {
    cpmRange: [0.5, 1.5],
    name: "Facebook Reels",
  },
};
