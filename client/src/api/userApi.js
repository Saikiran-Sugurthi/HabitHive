import axios from 'axios';

const API_URL = 'http://localhost:5001/api/users';

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

export const searchUsers = async (query) => {
  const config = getConfig();
  const response = await axios.get(`${API_URL}?search=${query}`, config);
  return response.data;
};

export const followUser = async (userId) => {
  const config = getConfig();
  const response = await axios.put(`${API_URL}/${userId}/follow`, {}, config);
  return response.data;
};

export const getFeed = async () => {
  const config = getConfig();
  const response = await axios.get(`${API_URL}/feed`, config);
  return response.data;
};