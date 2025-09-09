import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const API_URL = `${API_BASE_URL}/api/habits`;

const getConfig = () => {
  const userString = localStorage.getItem('user');
  if (!userString) return {};
  const user = JSON.parse(userString);
  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
};

export const getHabits = async (category) => {
  const config = getConfig();
  let url = API_URL;
  if (category && category !== 'All') {
    url += `?category=${category}`;
  }
  const response = await axios.get(url, config);
  return response.data;
};

export const createHabit = async (habitData) => {
  const config = getConfig();
  const response = await axios.post(API_URL, habitData, config);
  return response.data;
};

export const checkinHabit = async (habitId) => {
  const config = getConfig();
  const response = await axios.post(`${API_URL}/${habitId}/checkin`, {}, config);
  return response.data;
};