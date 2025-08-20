
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MOCK_ANALYTICS_DATA } from '../constants';
import Card from './ui/Card';

const Dashboard: React.FC = () => {
    const totalViews = MOCK_ANALYTICS_DATA.reduce((sum, item) => sum + item.views, 0);
    const latestFollowers = MOCK_ANALYTICS_DATA[MOCK_ANALYTICS_DATA.length - 1].followers;
    const avgEngagement = (MOCK_ANALYTICS_DATA.reduce((sum, item) => sum + item.engagement, 0) / MOCK_ANALYTICS_DATA.length).toFixed(1);

    const formatYAxis = (tickItem: number) => {
        if (tickItem >= 1000) return `${tickItem / 1000}k`;
        return tickItem;
    };
    
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <h3 className="text-text-secondary font-semibold">Total Views (6 months)</h3>
                    <p className="text-3xl font-bold text-brand-primary">{Intl.NumberFormat().format(totalViews)}</p>
                </Card>
                <Card>
                    <h3 className="text-text-secondary font-semibold">Followers</h3>
                    <p className="text-3xl font-bold text-brand-primary">{Intl.NumberFormat().format(latestFollowers)}</p>
                </Card>
                <Card>
                    <h3 className="text-text-secondary font-semibold">Avg. Engagement</h3>
                    <p className="text-3xl font-bold text-brand-primary">{avgEngagement}%</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="h-96">
                    <h3 className="text-lg font-semibold mb-4">Follower Growth</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={MOCK_ANALYTICS_DATA} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                            <XAxis dataKey="name" stroke="#B3B3B3" />
                            <YAxis stroke="#B3B3B3" tickFormatter={formatYAxis} />
                            <Tooltip contentStyle={{ backgroundColor: '#282828', border: '1px solid #404040' }}/>
                            <Legend />
                            <Line type="monotone" dataKey="followers" stroke="#14F195" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
                <Card className="h-96">
                    <h3 className="text-lg font-semibold mb-4">Monthly Views</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={MOCK_ANALYTICS_DATA} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#404040"/>
                            <XAxis dataKey="name" stroke="#B3B3B3" />
                            <YAxis stroke="#B3B3B3" tickFormatter={formatYAxis} />
                            <Tooltip contentStyle={{ backgroundColor: '#282828', border: '1px solid #404040' }}/>
                            <Legend />
                            <Bar dataKey="views" fill="#A0D2EB" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
