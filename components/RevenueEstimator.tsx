
import React, { useState, useMemo } from 'react';
import Card from './ui/Card';
import Input from './ui/Input';
import { PLATFORM_CONFIG } from '../constants';
import { type Platform } from '../types';

const RevenueEstimator: React.FC = () => {
  const [views, setViews] = useState<number>(1000000);
  const [platform, setPlatform] = useState<Platform>('YouTube');

  const estimatedRevenue = useMemo(() => {
    const config = PLATFORM_CONFIG[platform];
    if (!config || isNaN(views)) {
      return { low: 0, high: 0 };
    }
    const low = (views / 1000) * config.cpmRange[0];
    const high = (views / 1000) * config.cpmRange[1];
    return { low, high };
  }, [views, platform]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">Revenue Estimator</h1>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label htmlFor="views" className="block text-sm font-medium text-text-secondary mb-1">
                Monthly Views
              </label>
              <Input
                id="views"
                type="number"
                value={views}
                onChange={(e) => setViews(parseInt(e.target.value, 10) || 0)}
                placeholder="e.g., 1000000"
              />
            </div>
            <div>
              <label htmlFor="platform" className="block text-sm font-medium text-text-secondary mb-1">
                Platform
              </label>
              <select
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value as Platform)}
                className="w-full bg-bg-tertiary text-text-primary px-4 py-2 rounded-lg border border-border-color focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
              >
                {Object.keys(PLATFORM_CONFIG).map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="text-xs text-text-secondary">
              <p>Note: This is a rough estimate based on typical ad revenue (CPM). Actual earnings can vary based on niche, audience demographics, sponsorships, and affiliate marketing.</p>
            </div>
          </div>
          
          {/* Results */}
          <div className="bg-bg-tertiary p-6 rounded-lg flex flex-col justify-center items-center text-center">
            <h3 className="text-text-secondary font-semibold mb-2">Estimated Monthly Revenue</h3>
            <p className="text-4xl font-bold text-brand-primary">
              {formatCurrency(estimatedRevenue.low)} - {formatCurrency(estimatedRevenue.high)}
            </p>
            <p className="text-sm text-text-secondary mt-2">from {PLATFORM_CONFIG[platform].name} Ads</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RevenueEstimator;
