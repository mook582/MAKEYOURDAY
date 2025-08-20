
import React from 'react';
import Card from './ui/Card';
import { type ScheduledPost } from '../types';

interface ContentPlannerProps {
  posts: ScheduledPost[];
  setPosts: (posts: ScheduledPost[]) => void;
}

const statusColors = {
  scheduled: 'bg-blue-500/20 text-blue-300',
  posted: 'bg-green-500/20 text-green-300',
  cancelled: 'bg-red-500/20 text-red-300',
};

const ContentPlanner: React.FC<ContentPlannerProps> = ({ posts, setPosts }) => {
  const updatePostStatus = (id: number, status: ScheduledPost['status']) => {
    const updatedPosts = posts.map(p => p.id === id ? { ...p, status } : p);
    setPosts(updatedPosts);
  };
  
  const deletePost = (id: number) => {
    const updatedPosts = posts.filter(p => p.id !== id);
    setPosts(updatedPosts);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">Content Planner</h1>
      {posts.length === 0 ? (
        <Card>
          <p className="text-center text-text-secondary">Your content planner is empty. Generate some ideas and add them here!</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <Card key={post.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                   <span className="font-bold text-brand-secondary">{post.platform}</span>
                   <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[post.status]}`}>{post.status}</span>
                </div>
                <h3 className="font-semibold text-text-primary">{post.idea.title}</h3>
                <p className="text-sm text-text-secondary">{post.idea.caption}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <select 
                  value={post.status} 
                  onChange={(e) => updatePostStatus(post.id, e.target.value as ScheduledPost['status'])}
                  className="bg-bg-tertiary text-text-primary text-sm px-2 py-1 rounded-md border border-border-color focus:outline-none focus:ring-1 focus:ring-brand-primary"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="posted">Posted</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button onClick={() => deletePost(post.id)} className="p-2 rounded-md hover:bg-red-500/20 text-red-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentPlanner;
