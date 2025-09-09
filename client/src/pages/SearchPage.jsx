import React, { useState, useEffect } from 'react';
import { searchUsers, followUser } from '../api/userApi';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [followed, setFollowed] = useState([]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const fetchUsers = async () => {
      try {
        const data = await searchUsers(query);
        setResults(data);
      } catch (error) {
        console.error('Failed to search users', error);
      }
    };

    const searchTimeout = setTimeout(fetchUsers, 500);
    return () => clearTimeout(searchTimeout);

  }, [query]);

  const handleFollow = async (userId) => {
    try {
      await followUser(userId);
      setFollowed([...followed, userId]);
    } catch (error) {
      console.error('Failed to follow user', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Find Friends</h1>
      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-slate-700 text-white rounded-md p-3 border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder="Search by username..."
        />
      </div>

      <div className="bg-slate-800 rounded-lg">
        <ul role="list" className="divide-y divide-slate-700">
          {results.map(user => (
            <li key={user._id} className="flex items-center justify-between p-4">
              <span className="font-medium text-white">{user.username}</span>
              <button 
                onClick={() => handleFollow(user._id)}
                disabled={followed.includes(user._id)}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-3 rounded-md text-sm"
              >
                {followed.includes(user._id) ? 'Following' : 'Follow'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;