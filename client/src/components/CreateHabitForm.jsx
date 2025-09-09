import React, { useState } from 'react';

const CreateHabitForm = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [category, setCategory] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name, frequency, category });
    setName('');
    setFrequency('daily');
    setCategory('');
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-md p-5 mb-5">
      <h2 className="text-xl font-bold text-white mb-4">Create a New Habit</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="habitName" className="block text-sm font-medium text-slate-300 mb-1">Habit Name</label>
          <input
            type="text"
            id="habitName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-700 text-white rounded-md p-2 border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="e.g., Read for 15 minutes"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="habitCategory" className="block text-sm font-medium text-slate-300 mb-1">Category (Optional)</label>
          <input
            type="text"
            id="habitCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-700 text-white rounded-md p-2 border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="e.g., Health, Work, Learning"
          />
        </div>
        <div className="flex items-center justify-end space-x-3">
          <button type="button" onClick={onCancel} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-md text-sm">Cancel</button>
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md text-sm">Save Habit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateHabitForm;