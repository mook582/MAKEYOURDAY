
import React, { useState } from 'react';
import { findTrendingTopics } from '../services/geminiService';
import Button from './ui/Button';
import Input from './ui/Input';
import Card from './ui/Card';
import Loader from './ui/Loader';
import { type GroundingChunk } from '../types';

const TrendTracker: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [resultText, setResultText] = useState<string | null>(null);
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrackTrends = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResultText(null);
    setSources([]);
    try {
      const { text, sources } = await findTrendingTopics(topic);
      setResultText(text);
      setSources(sources);
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">Trend Tracker</h1>
      <Card>
        <div className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-text-secondary mb-1">
              Topic
            </label>
            <Input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., 'gaming' or 'vegan recipes'"
            />
          </div>
          <Button onClick={handleTrackTrends} disabled={isLoading}>
            {isLoading && <Loader />}
            Find Trends
          </Button>
          {error && <p className="text-red-400">{error}</p>}
        </div>
      </Card>
      
      {isLoading && <div className="text-center p-10"><Loader /></div>}

      {resultText && (
        <Card>
          <h2 className="text-xl font-bold text-brand-primary mb-4">Trending Analysis</h2>
          <div className="prose prose-invert max-w-none text-text-secondary" dangerouslySetInnerHTML={{ __html: resultText.replace(/\n/g, '<br />') }} />
          
          {sources.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-text-primary">Sources from Google Search:</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {sources.map((source, index) => (
                  <li key={index}>
                    <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-brand-secondary hover:underline">
                      {source.web.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default TrendTracker;
