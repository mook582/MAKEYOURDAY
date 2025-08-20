
export type Platform = 'TikTok' | 'YouTube' | 'Facebook';
export type View = 'dashboard' | 'generator' | 'trends' | 'revenue' | 'planner';

export interface AnalyticsData {
  name: string;
  followers: number;
  engagement: number;
  views: number;
}

export interface ContentIdea {
  title: string;
  description: string;
  script_outline: string[];
  caption: string;
  hashtags: string[];
}

export interface Trend {
  topic: string;
  description: string;
  hashtags: string[];
}

export interface GroundingChunk {
  web: {
    uri: string;
    title: string;
  };
}

export interface ScheduledPost {
  id: number;
  platform: Platform;
  idea: ContentIdea;
  date: string;
  status: 'scheduled' | 'posted' | 'cancelled';
}

export interface RevenuePlatformConfig {
  cpmRange: [number, number];
  name: string;
}
