import React from 'react';

const HabitCard = ({ habit, onCheckIn }) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-md p-5 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold text-white">{habit.name}</h3>
        <p className="text-sm text-slate-400">Current Streak: {habit.currentStreak || 0} days</p>
      </div>
      <div className="flex items-center space-x-2">
        {habit.isCompletedToday ? (
          <button 
            className="bg-green-600 text-white font-bold py-2 px-4 rounded-md cursor-not-allowed"
            disabled
          >
            Done!
          </button>
        ) : (
          <button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={() => onCheckIn(habit._id)}
          >
            Check-in
          </button>
        )}
      </div>
    </div>
  );
};

export default HabitCard;