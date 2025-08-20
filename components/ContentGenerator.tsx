
import React, { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import Card from './ui/Card';
import Loader from './ui/Loader';
import { generateContentIdeas } from '../services/geminiService';
import { type Platform, type ContentIdea, type ScheduledPost } from '../types';

interface ContentGeneratorProps {
  addScheduledPost: (post: Omit<ScheduledPost, 'id' | 'status'>) => void;
}

const ContentGenerator: React.FC<ContentGeneratorProps> = ({ addScheduledPost }) => {
  const [niche, setNiche] = useState('');
  const [platform, setPlatform] = useState<Platform>('TikTok');
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!niche.trim()) {
      setError('Please enter a niche or topic.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setIdeas([]);
    try {
      const result = await generateContentIdeas(niche, platform);
      setIdeas(result);
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddToPlanner = (idea: ContentIdea) => {
    addScheduledPost({
      platform,
      idea,
      date: new Date().toISOString().split('T')[0], // Default to today
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">Content Generator</h1>
      <Card>
        <div className="space-y-4">
          <div>
            <label htmlFor="niche" className="block text-sm font-medium text-text-secondary mb-1">
              Niche / Topic
            </label>
            <Input
              id="niche"
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g., 'Sustainable living tips' or 'AI productivity hacks'"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Platform</label>
            <div className="flex space-x-2">
              {(['TikTok', 'YouTube', 'Facebook'] as Platform[]).map((p) => (
                <Button
                  key={p}
                  variant={platform === p ? 'primary' : 'secondary'}
                  onClick={() => setPlatform(p)}
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>
          <Button onClick={handleGenerate} disabled={isLoading}>
            {isLoading && <Loader />}
            Generate Ideas
          </Button>
          {error && <p className="text-red-400">{error}</p>}
        </div>
      </Card>
      
      {isLoading && <div className="text-center p-10"><Loader /></div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea, index) => (
          <Card key={index} className="flex flex-col">
            <h3 className="text-lg font-bold text-brand-primary mb-2">{idea.title}</h3>
            <p className="text-sm text-text-secondary mb-4 flex-grow">{idea.description}</p>
            <div className="space-y-3 mb-4">
              <div>
                <h4 className="font-semibold text-text-primary">Caption:</h4>
                <p className="text-sm text-text-secondary italic">"{idea.caption}"</p>
              </div>
              <div>
                <h4 className="font-semibold text-text-primary">Hashtags:</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {idea.hashtags.map(tag => <span key={tag} className="bg-bg-tertiary text-brand-secondary text-xs px-2 py-1 rounded">{tag}</span>)}
                </div>
              </div>
            </div>
            <Button variant="secondary" onClick={() => handleAddToPlanner(idea)}>Add to Planner</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentGenerator;
