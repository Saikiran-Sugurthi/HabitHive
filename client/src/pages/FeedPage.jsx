import React, { useState, useEffect } from 'react';
import { getFeed } from '../api/userApi';
import ActivityItem from '../components/ActivityItem';

const FeedPage = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const data = await getFeed();
        setFeed(data);
      } catch (error) {
        console.error('Failed to fetch feed', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading feed...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Friends' Activity</h1>
      {feed.length > 0 ? (
        <div className="space-y-4">
          {feed.map(item => (
            <ActivityItem key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-800 rounded-lg p-5 text-center">
            <p>Your friends haven't completed any habits recently, or you're not following anyone yet.</p>
        </div>
      )}
    </div>
  );
};

export default FeedPage;