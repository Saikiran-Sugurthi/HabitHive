import React, { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import HabitCard from '../components/HabitCard';
import CreateHabitForm from '../components/CreateHabitForm';
import { getHabits, createHabit, checkinHabit } from '../api/habitsApi';


const DashboardPage = () => {
  const [habits, setHabits] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = useMemo(() => {
    const uniqueCategories = new Set(habits.map(h => h.category));
    return ['All', ...uniqueCategories];
  }, [habits]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const data = await getHabits(activeCategory);
        setHabits(data);
      } catch (error) {
        console.error('Failed to fetch habits', error);
      }
    };
    fetchHabits();
  }, [activeCategory]);


  const handleAddHabit = async (habitData) => {
    try {
      await createHabit(habitData);
      toast.success('Habit created!');
      setActiveCategory(habitData.category || 'All');
      setIsFormVisible(false);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create habit.';
      toast.error(message);
      console.error('Failed to create habit', error);
    }
  };

  const handleCheckIn = async (habitId) => {
    try {
      await checkinHabit(habitId);
      toast.success('Great job!');
      const updatedHabits = habits.map(h => h._id === habitId ? { ...h, isCompletedToday: true, currentStreak: h.currentStreak + 1 } : h);
      setHabits(updatedHabits);
    } catch (error) {
      const message = error.response?.data?.message || 'Check-in failed.';
      toast.error(message);
      console.error('Failed to check in habit', error);
    }
  };

 
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">My Habits</h1>
        <button 
          onClick={() => setIsFormVisible(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
        >
          + Create New Habit
        </button>
      </div>

      {isFormVisible && (
        <CreateHabitForm 
          onSubmit={handleAddHabit}
          onCancel={() => setIsFormVisible(false)}
        />
      )}

      <div className="flex space-x-2 mb-6 border-b border-slate-700 pb-2">
        {categories.map(category => (
          <button 
            key={category} 
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1 text-sm font-medium rounded-full ${activeCategory === category ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5">
        {habits.length > 0 ? (
          habits.map(habit => (
            <HabitCard 
              key={habit._id} 
              habit={habit} 
              onCheckIn={handleCheckIn} 
            />
          ))
        ) : (
          <div className="bg-slate-800 rounded-lg p-5 text-center">
            <p>No habits found for this category. Create a new one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;