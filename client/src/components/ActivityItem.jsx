import React from 'react';

const ActivityItem = ({ item }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-4 flex items-center space-x-4">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white">
        {item.user.username.charAt(0)}
      </div>
      <div>
        <p className="text-sm">
          <span className="font-bold text-white">{item.user.username}</span>
          {' completed '}
        
          <span className="font-semibold text-indigo-400">"{item.habit.name}"</span>
        </p>
        <p className="text-xs text-slate-400 mt-1">{new Date(item.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ActivityItem;