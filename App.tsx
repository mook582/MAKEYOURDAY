
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ContentGenerator from './components/ContentGenerator';
import TrendTracker from './components/TrendTracker';
import RevenueEstimator from './components/RevenueEstimator';
import ContentPlanner from './components/ContentPlanner';
import { type ScheduledPost } from './types';
import { type View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>(() => {
    const savedPosts = localStorage.getItem('scheduledPosts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  const addScheduledPost = (post: Omit<ScheduledPost, 'id' | 'status'>) => {
    const newPost: ScheduledPost = {
      ...post,
      id: Date.now(),
      status: 'scheduled'
    };
    const updatedPosts = [...scheduledPosts, newPost];
    setScheduledPosts(updatedPosts);
    localStorage.setItem('scheduledPosts', JSON.stringify(updatedPosts));
    setCurrentView('planner');
  };

  const updateScheduledPosts = (posts: ScheduledPost[]) => {
    setScheduledPosts(posts);
    localStorage.setItem('scheduledPosts', JSON.stringify(posts));
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'generator':
        return <ContentGenerator addScheduledPost={addScheduledPost} />;
      case 'trends':
        return <TrendTracker />;
      case 'revenue':
        return <RevenueEstimator />;
      case 'planner':
        return <ContentPlanner posts={scheduledPosts} setPosts={updateScheduledPosts} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-bg-primary text-text-primary">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
